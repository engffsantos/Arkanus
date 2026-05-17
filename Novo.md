
# PROMPT MESTRE — ARKANUS
## Hardening do Motor Sazonal + Conclusão Mecânica do Jogo

Você é o DevMaster responsável pelo repositório:

https://github.com/engffsantos/Arkanus.git

Atue como arquiteto TypeScript, game systems engineer, QA engineer, especialista em Firebase, especialista em React/Vite e designer de regras sistêmicas.

Sua missão é refatorar, estabilizar, testar e completar o jogo Arkanus conforme a documentação de produto já definida.

NÃO implemente novas telas cosméticas, novas expansões territoriais, novas imagens, novos temas visuais ou novas funcionalidades de interface antes de concluir o hardening do motor de regras.

O foco inicial é:

1. Remover acoplamento inseguro do Firebase.
2. Eliminar `any`.
3. Garantir imutabilidade absoluta do GameState.
4. Quebrar o monolito `actionDispatcher.ts`.
5. Modularizar o motor sazonal.
6. Criar testes objetivos que falham quando regras, rotas, ações, saves ou eventos não respeitam a documentação.
7. Expandir eventos sazonais para todas as camadas da Soberania.
8. Só depois completar as mecânicas restantes do jogo.

---

# 0. Regra absoluta de execução

Não declare sucesso parcial como sucesso final.

Não diga “concluído” enquanto existir:

- uso de `any` em estruturas centrais;
- mutação direta de GameState;
- Firebase acoplado a JSON fixo;
- dispatcher monolítico;
- action sem tipo explícito;
- action sem custo, efeito, log e persistência;
- tela que mostra dados mockados quando existe GameState real;
- evento sazonal superficial;
- teste que não falha quando a regra é quebrada;
- rota quebrada;
- save sem migração;
- build quebrado;
- lint quebrado;
- simulação quebrada;
- relatório final sem evidências.

Sempre executar em ciclo:

```txt
AUDITAR
→ REFATORAR
→ TESTAR
→ CORRIGIR
→ REVALIDAR
→ DOCUMENTAR
→ REPETIR
````

Pare apenas quando todos os critérios estiverem marcados como concluídos, testados e validados.

---

# 1. Primeira ação obrigatória — auditoria real do repositório

Antes de modificar qualquer arquivo, clone/abra o repositório e gere um diagnóstico técnico.

Execute:

```bash
npm install
npm run lint
npm run build
```

Se existirem testes:

```bash
npm test
```

Se existir simulação:

```bash
npm run simulate
```

Depois crie ou atualize:

```txt
HARDENING_AUDIT.md
```

Com:

```md
# Arkanus — Auditoria de Hardening

## Data
## Branch
## Node/NPM
## Comandos executados
## Resultado do lint
## Resultado do build
## Resultado dos testes
## Resultado da simulação

## Arquivos críticos encontrados
- src/firebase/firebase.ts
- src/services/actionDispatcher.ts
- src/context/GameContext.tsx
- src/types/game.ts
- src/services/eventEngine.ts
- src/services/saveMigration.ts
- firestore.rules
- vite.config.ts
- package.json

## Problemas encontrados
## Riscos técnicos
## Plano de correção
## Critérios de aceite
```

---

# 2. Fase 1 — Corrigir acoplamento Firebase

## Problema

O projeto não pode depender estaticamente de um JSON específico para configuração Firebase.

## Objetivo

Migrar para `import.meta.env` com variáveis `VITE_FIREBASE_*`.

## Arquivos esperados

```txt
src/firebase/firebase.ts
src/firebase/auth.ts
src/firebase/firestore.ts
.env.example
README.md
```

## Implementar

No `.env.example`:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_FIRESTORE_DATABASE_ID=
```

Em `src/firebase/firebase.ts`, usar:

```ts
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
```

Adicionar validação defensiva:

```ts
const requiredEnvVars = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
];

for (const key of requiredEnvVars) {
  if (!import.meta.env[key]) {
    throw new Error(`Firebase env ausente: ${key}`);
  }
}
```

## Critérios de aceite

* [ ] Nenhum import direto de JSON fixo para Firebase.
* [ ] `.env.example` documentado.
* [ ] README explica configuração Firebase.
* [ ] Build falha claramente se variável obrigatória faltar.
* [ ] Testes não dependem de Firebase real.
* [ ] Modo de teste não usa credenciais reais.

---

# 3. Fase 2 — Tipagem forte das ações

## Problema

Uso de `any` no motor de regras compromete a estabilidade das resoluções sazonais.

## Objetivo

Criar tipos explícitos para ações, custos, requisitos, efeitos, riscos e resultados.

## Arquivo esperado

```txt
src/types/actions.ts
```

## Criar tipos

```ts
export type ResourceKey =
  | "silver"
  | "influence"
  | "prestige"
  | "essenceTotal"
  | "essenceCreo"
  | "essenceIntellego"
  | "essenceMuto"
  | "essencePerdo"
  | "essenceRego"
  | "essenceVim";

export type GameActionDomain =
  | "governance"
  | "laboratory"
  | "library"
  | "writing"
  | "map"
  | "health"
  | "charters"
  | "guilds"
  | "commerce"
  | "diplomacy"
  | "conflicts"
  | "events"
  | "settings";

export type ActionCost = Partial<Record<ResourceKey, number>>;

export type ActionRequirement = {
  id: string;
  description: string;
  isMet: boolean;
  failureMessage: string;
};

export type GameEffectTarget =
  | "resources"
  | "covenant"
  | "mage"
  | "laboratory"
  | "library"
  | "territory"
  | "health"
  | "charters"
  | "guilds"
  | "commerce"
  | "diplomacy"
  | "conflicts"
  | "events";

export type GameEffect = {
  target: GameEffectTarget;
  path: string;
  operation: "add" | "subtract" | "set" | "push" | "remove" | "multiply";
  value: number | string | boolean | object;
  description: string;
};

export type GameRisk = {
  id: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  probability?: number;
};

export type GameActionType =
  | "GOVERNANCE_INVEST_HEALTH"
  | "GOVERNANCE_REINFORCE_SECURITY"
  | "GOVERNANCE_ADJUST_TAXES"
  | "GOVERNANCE_DISTRIBUTE_FOOD"
  | "LAB_START_PROJECT"
  | "LAB_PAUSE_PROJECT"
  | "LAB_RESUME_PROJECT"
  | "LAB_APPLY_ESSENCE"
  | "LIBRARY_READ_BOOK"
  | "WRITING_WRITE_TREATY"
  | "WRITING_WRITE_TOME"
  | "MAP_INSPECT_LOCATION"
  | "MAP_INVEST_LOCATION"
  | "MAP_COLLECT_RESOURCE"
  | "HEALTH_PREPARE_PROPHYLAXIS"
  | "HEALTH_HIRE_PHYSICIAN"
  | "HEALTH_HIRE_APOTHECARY"
  | "CHARTER_GRANT_CITIZENSHIP"
  | "CHARTER_EXTRACT_ESSENCE"
  | "GUILD_CREATE"
  | "GUILD_HIRE_ARTISAN"
  | "GUILD_PRODUCE_GOODS"
  | "COMMERCE_SEND_CARAVAN"
  | "COMMERCE_RESOLVE_CARAVAN"
  | "DIPLOMACY_SEND_ENVOY"
  | "DIPLOMACY_OFFER_SILVER"
  | "CONFLICT_OPEN"
  | "CONFLICT_PREPARE_DEFENSE"
  | "CONFLICT_RESOLVE_TRIBUNAL"
  | "EVENT_CHOOSE_OPTION";

export type GameAction<TPayload = unknown> = {
  id: string;
  type: GameActionType;
  domain: GameActionDomain;
  label: string;
  description: string;
  consumesPrimaryAction: boolean;
  confirmationRequired: boolean;
  destructive?: boolean;
  cost: ActionCost;
  requirements: ActionRequirement[];
  effects: GameEffect[];
  risks: GameRisk[];
  payload: TPayload;
};

export type ResolvedActionResult = {
  ok: boolean;
  state: GameState;
  error?: string;
  warnings?: string[];
  logs: GameEvent[];
};
```

## Proibir

* `any` no dispatcher.
* `any` no GameState.
* `any` no event engine.
* `any` no save migration.
* `any` no campaign creator.
* `any` em payloads centrais.

Quando o tipo for realmente desconhecido, usar `unknown` e validar.

## Critérios de aceite

* [ ] `GameAction` criado.
* [ ] `ActionCost` criado.
* [ ] `ResolvedActionResult` criado.
* [ ] `ActionRequirement`, `GameEffect`, `GameRisk` criados.
* [ ] Dispatcher não usa `any`.
* [ ] EventEngine não usa `any`.
* [ ] SaveMigration não usa `any`.
* [ ] `npm run typecheck` passa.
* [ ] `npm run lint` passa.

---

# 4. Fase 3 — Imutabilidade absoluta do GameState

## Problema

Mutações rasas podem corromper a progressão sazonal.

## Objetivo

Garantir que nenhuma ação altere o estado original diretamente.

## Implementar

Criar utilitários:

```txt
src/utils/immutable.ts
src/utils/clamp.ts
src/utils/deepFreeze.ts
```

Exemplo:

```ts
export function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}
```

Para testes:

```ts
export function deepFreeze<T>(obj: T): T {
  Object.freeze(obj);

  Object.getOwnPropertyNames(obj).forEach((prop) => {
    const value = (obj as Record<string, unknown>)[prop];

    if (
      value !== null &&
      typeof value === "object" &&
      !Object.isFrozen(value)
    ) {
      deepFreeze(value);
    }
  });

  return obj;
}
```

## Regras

* Nunca fazer `state.resources.silver -= 10`.
* Nunca fazer `state.events.push(...)`.
* Sempre retornar novo objeto.
* Preservar subárvores não alteradas.
* Usar funções puras.
* Testar que o estado original não muda.

## Critérios de aceite

* [ ] Teste de imutabilidade no dispatcher.
* [ ] Teste de imutabilidade no advanceSeason.
* [ ] Teste de imutabilidade no eventEngine.
* [ ] Nenhuma mutação direta encontrada.
* [ ] Estado original congelado em teste não quebra por mutação.
* [ ] Funções centrais retornam novo estado.

---

# 5. Fase 4 — Fragmentar o monolito `actionDispatcher.ts`

## Problema

Um único dispatcher acumulando todos os domínios causa colapso à medida que o jogo cresce.

## Objetivo

Transformar o dispatcher em roteador leve e mover lógica para motores específicos.

## Estrutura esperada

```txt
src/services/actionDispatcher.ts

src/systems/governance/governanceActions.ts
src/systems/laboratory/laboratoryActions.ts
src/systems/library/libraryActions.ts
src/systems/writing/writingActions.ts
src/systems/map/mapActions.ts
src/systems/health/healthActions.ts
src/systems/charters/charterActions.ts
src/systems/guilds/guildActions.ts
src/systems/commerce/commerceActions.ts
src/systems/diplomacy/diplomacyActions.ts
src/systems/conflicts/conflictActions.ts
src/systems/events/eventActions.ts
```

## Dispatcher final

`actionDispatcher.ts` deve apenas:

1. receber `GameAction`;
2. validar tipo base;
3. enviar para o sistema correto;
4. receber `ResolvedActionResult`;
5. retornar resultado;
6. nunca conter regra específica de laboratório, comércio, saúde etc.

Exemplo:

```ts
export function dispatchGameAction(
  state: GameState,
  action: GameAction
): ResolvedActionResult {
  switch (action.domain) {
    case "governance":
      return resolveGovernanceAction(state, action);
    case "laboratory":
      return resolveLaboratoryAction(state, action);
    case "commerce":
      return resolveCommerceAction(state, action);
    case "health":
      return resolveHealthAction(state, action);
    case "charters":
      return resolveCharterAction(state, action);
    case "conflicts":
      return resolveConflictAction(state, action);
    default:
      return {
        ok: false,
        state,
        error: `Domínio de ação não suportado: ${action.domain}`,
        logs: [],
      };
  }
}
```

## Critérios de aceite

* [ ] `actionDispatcher.ts` tem baixa complexidade.
* [ ] Cada domínio tem seu próprio motor.
* [ ] Testes de cada motor existem.
* [ ] Ações antigas continuam funcionando.
* [ ] UI não quebra.
* [ ] Logs continuam sendo gerados.
* [ ] Persistência continua funcionando.

---

# 6. Fase 5 — Modularizar o motor sazonal

## Problema

O avanço de estação precisa ser previsível, testável e dividido por responsabilidade.

## Objetivo

Criar uma pipeline sazonal modular.

## Estrutura esperada

```txt
src/systems/seasons/advanceSeason.ts
src/systems/seasons/advanceCalendar.ts
src/systems/seasons/resolveSelectedPrimaryAction.ts
src/systems/seasons/resolveSeasonSummary.ts

src/systems/laboratory/resolveLaboratoryProjects.ts
src/systems/writing/resolveWritingProjects.ts
src/systems/library/resolveReadingProjects.ts
src/systems/guilds/resolveGuildProduction.ts
src/systems/commerce/resolveCaravans.ts
src/systems/map/resolveTerritoryProduction.ts
src/systems/charters/resolveCharterEffects.ts
src/systems/auras/resolveAuraPressure.ts
src/systems/health/resolveHealthAndHumors.ts
src/systems/economy/resolveEconomy.ts
src/systems/diplomacy/resolveFactionPressure.ts
src/systems/conflicts/resolveConflictDeadlines.ts
src/systems/events/generateSeasonalEvents.ts
src/systems/victory/resolveVictoryDefeatConditions.ts
```

## Pipeline obrigatória

```ts
export function advanceSeason(state: GameState): GameState {
  let next = cloneGameState(state);

  next = resolveSelectedPrimaryAction(next);
  next = resolveLaboratoryProjects(next);
  next = resolveWritingProjects(next);
  next = resolveReadingProjects(next);
  next = resolveGuildProduction(next);
  next = resolveCaravans(next);
  next = resolveTerritoryProduction(next);
  next = resolveCharterEffects(next);
  next = resolveAuraPressure(next);
  next = resolveHealthAndHumors(next);
  next = resolveEconomy(next);
  next = resolveFactionPressure(next);
  next = resolveConflictDeadlines(next);
  next = generateSeasonalEvents(next);
  next = resolveVictoryDefeatConditions(next);
  next = advanceCalendar(next);
  next = resolveSeasonSummary(next);

  return next;
}
```

## Critérios de aceite

* [ ] Cada etapa tem função própria.
* [ ] Cada etapa tem teste.
* [ ] A ordem da pipeline é documentada.
* [ ] Avançar 4 estações incrementa o ano.
* [ ] Fechamento de inverno gera relatório anual.
* [ ] Grande Tribunal do Ano VII é resolvido por condição real.
* [ ] Função não muta estado original.

---

# 7. Fase 6 — Regra de ação primária por estação

## Objetivo

Garantir rigor do loop sazonal.

## Implementar no GameState

```ts
export type PrimaryActionState = {
  selected: boolean;
  actionId: string | null;
  actionType: GameActionType | null;
  domain: GameActionDomain | null;
  label: string | null;
  payload: unknown;
  locked: boolean;
  resolved: boolean;
};
```

## Regras

* Ações informativas não consomem estação.
* Ações mecânicas fortes consomem estação.
* Apenas uma ação primária pode estar ativa.
* O jogador pode cancelar antes de avançar.
* O jogador pode substituir com confirmação.
* Ao avançar a estação, a ação é resolvida.
* Depois de resolvida, `primaryAction` volta ao estado vazio.

## Critérios de aceite

* [ ] UI bloqueia múltiplas ações primárias.
* [ ] Teste comprova bloqueio.
* [ ] Teste comprova cancelamento.
* [ ] Teste comprova resolução.
* [ ] Teste comprova limpeza após estação.

---

# 8. Fase 7 — EventEngine completo

## Objetivo

Eventos sazonais devem abranger todas as camadas da Soberania.

## Estrutura esperada

```txt
src/systems/events/eventEngine.ts
src/systems/events/eventConditions.ts
src/systems/events/eventChoices.ts
src/systems/events/eventResolver.ts
src/data/events.ts
```

## Tipos de evento

Implementar eventos para:

```txt
climate
political
religious
magical
economic
health
territorial
diplomatic
laboratory
commercial
conflict
charter
guild
aura
```

## Cada evento deve ter

```ts
export type EventTemplate = {
  id: string;
  title: string;
  description: string;
  type: EventType;
  weight: number;
  cooldownTurns?: number;
  minYear?: number;
  allowedSeasons?: Season[];
  conditions: EventCondition[];
  choices: EventChoice[];
};
```

## Cada escolha deve ter

```ts
export type EventChoice = {
  id: string;
  label: string;
  description: string;
  cost?: ActionCost;
  effects: GameEffect[];
  createsConflict?: boolean;
  followUpEventId?: string;
  logMessage: string;
};
```

## Conteúdo mínimo inicial

Criar pelo menos:

```txt
5 eventos climáticos
5 eventos políticos
5 eventos religiosos
5 eventos mágicos
5 eventos econômicos
5 eventos sanitários
5 eventos territoriais
5 eventos diplomáticos
5 eventos laboratoriais
5 eventos comerciais
5 eventos de conflito
5 eventos de foral/aura/guilda
```

Total mínimo: 60 eventos.

## Critérios de aceite

* [ ] Evento só aparece se condições forem cumpridas.
* [ ] Cooldown impede repetição abusiva.
* [ ] Escolha aplica custo.
* [ ] Escolha aplica efeito.
* [ ] Escolha gera log.
* [ ] Escolha pode gerar conflito.
* [ ] Escolha pode gerar evento futuro.
* [ ] Teste cobre pelo menos um evento por tipo.

---

# 9. Fase 8 — Magus como núcleo de cálculo

## Objetivo

Implementar a ficha do magus como motor numérico da Soberania.

## Estrutura esperada

```txt
src/types/magus.ts
src/systems/magus/calculateLabTotal.ts
src/systems/magus/calculateWritingQuality.ts
src/systems/magus/calculateWritingProgress.ts
src/systems/magus/calculateDuelPower.ts
src/components/screens/MagusScreen.tsx
```

## Dados obrigatórios

```txt
Nome
Casa/Tradição
Idade
Warping/Distorção
Características
Artes
Habilidades
Virtudes
Falhas
Reputações
Histórico
```

## Características

```txt
Inteligência
Comunicação
Percepção
Presença
Força
Vigor
Destreza
Rapidez
```

## Artes

Técnicas:

```txt
Creo
Intellego
Muto
Perdo
Rego
```

Formas:

```txt
Animal
Aquam
Auram
Corpus
Herbam
Ignem
Imaginem
Mentem
Terram
Vim
```

## Habilidades mínimas

```txt
Teoria Mágica
Penetração
Finesse
Latim
Liderança
Medicina
Barganha
Direito
Intriga
```

## Fórmulas obrigatórias

```txt
Total de Laboratório =
Inteligência
+ Teoria Mágica
+ Técnica
+ Forma
+ Qualidade do Laboratório
+ Aura aplicável
+ Bônus de materiais
+ Bônus de assistentes
```

```txt
Qualidade de Escrita =
Comunicação
+ 3
+ Bom Professor
+ Escriba
+ Encadernador
+ Iluminador
+ Ressonância
```

```txt
Produção por Estação =
Comunicação + Latim
```

```txt
Poder de Duelo =
Técnica escolhida + Forma escolhida + modificadores
```

## Critérios de aceite

* [ ] MagusScreen existe.
* [ ] Cálculos aparecem em tempo real.
* [ ] Laboratório usa ficha real.
* [ ] Escrita usa ficha real.
* [ ] Conflito usa ficha real.
* [ ] Saúde pode consultar Artes relevantes.
* [ ] Testes cobrem cálculos.

---

# 10. Fase 9 — Auditorias automatizadas

## Criar scripts

```txt
scripts/auditRoutes.ts
scripts/auditContent.ts
scripts/auditPwa.ts
scripts/auditFirebaseConfig.ts
scripts/simulateCampaign.ts
scripts/validateAll.ts
```

## `auditRoutes.ts`

Deve falhar se faltar rota/tela para:

```txt
Dashboard
Ações
Magus
Laboratório
Biblioteca
Escrita
Governança
Mapa
Saúde
Forais
Guildas
Comércio
Diplomacia
Conflitos
Relatórios
Codex
Configurações
```

## `auditContent.ts`

Deve validar mínimos:

```txt
60 eventos
20 livros
15 projetos de laboratório
10 locais
8 guildas
12 artesãos
7 facções
5 rotas comerciais
5 feiras
10 conflitos
8 políticas
8 ações sanitárias
6 condições de vitória/derrota
```

## `auditPwa.ts`

Validar:

```txt
manifest
service worker
ícones
theme color
display standalone
dist
```

## `auditFirebaseConfig.ts`

Validar:

```txt
firebase.json
.firebaserc
firestore.rules
.env.example
uso de VITE_FIREBASE
ausência de allow read, write: if true
```

## `simulateCampaign.ts`

Simular:

```txt
100 campanhas
20 estações cada
```

Falhar se houver:

```txt
NaN
undefined crítico
prata infinita
população negativa
lealdade fora de 0-100
saúde fora de 0-100
caravana presa
conflito impossível
evento repetitivo abusivo
```

## `validateAll.ts`

Executar:

```txt
typecheck
lint
unit tests
integration tests
build
audit routes
audit content
audit pwa
audit firebase
simulate
e2e, se configurado
```

---

# 11. Fase 10 — Testes automatizados

## Instalar/configurar

Usar Vitest.

Criar:

```txt
vitest.config.ts
src/test/setup.ts
src/test/factories/gameStateFactory.ts
src/test/helpers/deepFreeze.ts
```

## Testes mínimos

```txt
tests/unit/actionDispatcher.test.ts
tests/unit/advanceSeason.test.ts
tests/unit/magusCalculations.test.ts
tests/unit/eventEngine.test.ts
tests/unit/saveMigration.test.ts
tests/unit/economy.test.ts
tests/unit/health.test.ts
tests/unit/commerce.test.ts
tests/unit/conflicts.test.ts

tests/integration/gameContext.test.tsx
tests/integration/primaryAction.test.tsx
tests/integration/screensNavigation.test.tsx
```

## Critérios de aceite

* [ ] Testes passam.
* [ ] Testes falham se mutar estado.
* [ ] Testes falham se ação não gerar log.
* [ ] Testes falham se ação primária duplicar.
* [ ] Testes falham se pipeline não avançar ano.
* [ ] Testes falham se evento sem efeito for resolvido.
* [ ] Testes falham se save antigo não migrar.

---

# 12. Fase 11 — Completar sistemas restantes do jogo

Somente iniciar após hardening técnico validado.

Completar ou revisar:

## Laboratório

* Projetos multiestação.
* Risco de falha.
* Pausar/retomar.
* Uso de essência.
* Uso de aura.
* Conclusão com benefício.

## Biblioteca/Escrita

* Livros reais.
* Escrita com fórmula.
* Leitura com progressão.
* Artesãos aplicam bônus.
* Transcrição.

## Governança/Economia

* Impostos.
* Infraestrutura.
* Saúde.
* Segurança.
* Despesas.
* Resultado anual.
* Dívida.

## Mapa

* Locais vivos.
* Produção.
* Risco.
* Melhorias.
* Eventos por local.

## Saúde

* Humores por estação.
* Epidemia.
* Médicos.
* Apotecários.
* Dieta.
* Repouso.
* Profilaxia.

## Forais/Auras

* Cidadania.
* Conexão simpática.
* Extração permanente.
* Aura Arcana.
* Aura Sacra.
* Aura Encantada.
* Aura Abissal.
* Corrupção.

## Guildas

* Produção.
* Artesãos.
* Qualidade.
* Integração com livros, comércio, saúde e segurança.

## Comércio

* Rotas.
* Feiras.
* Caravanas.
* Escolta.
* Risco.
* Retorno.

## Diplomacia

* Facções.
* Relação.
* Exigências.
* Tratados.
* Reações automáticas.

## Conflitos

* Litígios.
* Tribunal.
* Grande Tribunal no Ano VII.
* Duelo de Selo.
* Penalidades.
* Recompensas.

## Vitória/Derrota/Sandbox

* Vitória Arcana.
* Vitória Econômica.
* Vitória Política.
* Vitória Acadêmica.
* Vitória Territorial.
* Derrota econômica.
* Derrota social.
* Derrota sanitária.
* Derrota religiosa.
* Derrota por corrupção.
* Sandbox.

---

# 13. Fase 12 — Documentação

Atualizar:

```txt
README.md
PROJECT_COMPLETION_CHECKLIST.md
ARKANUS_FINAL_VALIDATION_REPORT.md
HARDENING_AUDIT.md
TESTING_AUDIT.md
CHANGELOG.md
```

README deve explicar:

```txt
instalação
env Firebase
dev
build
testes
simulação
auditorias
deploy
estrutura de pastas
como adicionar evento
como adicionar ação
como adicionar tela
como adicionar migração de save
```

---

# 14. Comandos finais obrigatórios

Executar:

```bash
npm ci
npm run typecheck
npm run lint
npm run test
npm run build
npm run audit:routes
npm run audit:content
npm run audit:pwa
npm run audit:firebase
npm run simulate
npm run validate:all
```

Se E2E existir:

```bash
npm run test:e2e
```

Se Firebase Emulator estiver configurado:

```bash
npm run test:firebase
```

---

# 15. Critério final de aceite

O projeto só pode ser declarado validado quando:

```txt
[ ] Firebase usa import.meta.env
[ ] Nenhum JSON fixo acoplado ao Firebase
[ ] Tipos explícitos criados
[ ] Sem any nos núcleos
[ ] Dispatcher fragmentado
[ ] Pipeline sazonal modular
[ ] Estado imutável
[ ] Testes provam imutabilidade
[ ] Eventos cobrem todas as camadas
[ ] Magus alimenta cálculos reais
[ ] Ação primária por estação é respeitada
[ ] Auditorias falham corretamente quando algo falta
[ ] Simulação de campanha passa
[ ] Build passa
[ ] Lint passa
[ ] Typecheck passa
[ ] Testes passam
[ ] Conteúdo mínimo passa
[ ] Rotas passam
[ ] PWA passa
[ ] Firebase audit passa
[ ] Documentação atualizada
```

---

# 16. Relatório final obrigatório

Gerar:

```txt
HARDENING_FINAL_REPORT.md
```

Com:

```md
# Arkanus — Relatório Final de Hardening

## Status
Concluído / Não concluído

## Resumo
## Branch
## Commits
## Arquivos alterados
## Refatorações realizadas
## Testes adicionados
## Auditorias adicionadas
## Comandos executados
## Resultados
## Pendências
## Riscos conhecidos
## Próximas recomendações
```

A conclusão só pode dizer:

```txt
ARKANUS HARDENING CONCLUÍDO, TESTADO E VALIDADO.
```

se todos os critérios estiverem verdes.

Caso contrário, listar pendências e continuar corrigindo.

---

# 17. Ordem exata de execução

Execute nesta ordem:

```txt
1. Auditoria inicial.
2. Corrigir Firebase env.
3. Criar tipos fortes.
4. Eliminar any dos núcleos.
5. Garantir imutabilidade.
6. Fragmentar dispatcher.
7. Modularizar advanceSeason.
8. Trancar regra de ação primária.
9. Expandir EventEngine.
10. Implementar Magus como núcleo de cálculo.
11. Criar auditorias automatizadas.
12. Criar testes unitários e integração.
13. Rodar simulação.
14. Completar sistemas restantes.
15. Atualizar documentação.
16. Rodar validação total.
17. Corrigir tudo que falhar.
18. Repetir até 100%.
```

Não avance para novas funcionalidades visuais antes da etapa 14.

Não declare sucesso antes da etapa 18.

```

Esse prompt deve ser entregue como comando de execução para o agente que trabalha diretamente no repositório. Ele força a sequência correta: **hardening primeiro, expansão depois, validação sempre**.
```
