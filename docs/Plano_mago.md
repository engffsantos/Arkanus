# Plano De Implementação — Sistema De Criação Do Mago Fundador

## Resumo

Objetivo: transformar a criação do mago em uma mecânica própria, integrada ao GDD, à criação de campanha, ao `GameState`, à tela do mago, às fórmulas e aos testes.

O sistema deve substituir a criação simples atual em `CreateSovereigntyScreen` por um fluxo em etapas: identidade, aparência, origem, tradição, atributos, Artes, especialização, virtudes/defeitos, laboratório inicial, ambição e confirmação.

Arquitetura mantida:
- React + Vite.
- Estado principal em `GameState`.
- Criação via `createInitialGameState`.
- Migrations em `saveMigration`.
- Testes unitários, integração, build e E2E.

## Alterações No GDD E Plano Técnico

- Adicionar ao GDD uma nova seção após `30.3 Estado do mago` e antes de `30.4 Fadiga sazonal`:
  - `# Sistema de Criação do Mago`
  - incluir objetivo, fluxo de criação, tabelas de origem, tradições, atributos, Artes, especialização, virtudes, defeitos, laboratório inicial, ambição e exemplo completo.
- Atualizar `docs/plano_GDD.md` com uma fase específica:
  - `Fase X — Criação Do Mago Fundador`
  - posicionar antes de multiplayer, porque o mago afeta single-player, Certâmen, Tribunal, laboratório, economia e saúde.
- Atualizar `docs/backlog_tecnico.md`:
  - marcar “sistema de criação do mago” como faltante antes da implementação;
  - após implementação, registrar como parcial/completo conforme testes.

## Modelo De Dados

- Expandir `MageState` em `src/types/game.ts` com campos opcionais compatíveis com saves antigos:
  - `title?: string`
  - `origin?: MageOriginId`
  - `originRegion?: string`
  - `personalSymbol?: string`
  - `appearance?: MageAppearance`
  - `specialization?: MageSpecializationId`
  - `initialLaboratory?: InitialLaboratoryId`
  - `ambition?: MageAmbitionId`
  - `fatigue?: number`
  - `creationChoices?: MageCreationChoices`
- Criar tipos explícitos:
  - `MageOriginId`
  - `MageTraditionId`
  - `MageSpecializationId`
  - `InitialLaboratoryId`
  - `MageAmbitionId`
  - `MageVirtueId`
  - `MageFlawId`
  - `MageAppearance`
  - `MageCreationConfig`
- Manter campos legados:
  - `intelligence`
  - `communication`
  - `magicTheory`
  - `technique`
  - `form`
  - `language`
- Mapear campos novos para estruturas atuais:
  - `Inteligência` → `characteristics.intelligence`
  - `Comunicação` → `characteristics.communication`
  - `Presença` → `characteristics.presence`
  - `Percepção` → `characteristics.perception`
  - `Vigor` → `characteristics.stamina`
  - `Astúcia` → `abilities.intrigue` e bônus contextual de comércio/intriga
- Não remover `strength`, `dexterity` e `quickness`; manter defaults `0` para compatibilidade.

## Dados De Criação

- Criar um módulo de dados estáticos, por exemplo `src/data/mageCreation.ts`, contendo:
  - origens;
  - tradições próprias;
  - símbolos pessoais;
  - opções de aparência;
  - atributos;
  - técnicas;
  - formas;
  - especializações;
  - virtudes;
  - defeitos;
  - laboratórios iniciais;
  - ambições.
- Substituir tradições licenciadas da criação atual por tradições próprias:
  - `green_tower`: Casa da Torre Verde
  - `mirror_circle`: Círculo do Espelho
  - `red_flame_order`: Ordem da Chama Rubra
  - `oak_lineage`: Linhagem do Carvalho
  - `grey_mercury_school`: Escola do Mercúrio Cinzento
  - `veil_brotherhood`: Confraria do Véu
  - `perfect_body_brotherhood`: Irmandade do Corpo Perfeito
- Cada opção deve ter:
  - `id`
  - `name`
  - `description`
  - `bonuses`
  - `penalties`
  - `startingEvents`
  - `tags`
- Padronizar Artes internas com os nomes já existentes no código:
  - Técnicas: `creo`, `intellego`, `muto`, `rego`, `perdo`
  - Formas: `corpus`, `mentem`, `ignem`, `terram`, `aquam`, `auram`, `herbam`, `animal`, `imaginem`, `vim`
- Exibir nomes localizados na UI:
  - Criar, Perceber, Transformar, Controlar, Destruir.
  - Corpo, Mente, Fogo, Terra, Água, Ar, Planta, Animal, Imagem, Espírito.

## Fluxo De UI

- Refatorar `CreateSovereigntyScreen` para um wizard em etapas, sem criar telas soltas desnecessárias.
- Etapas obrigatórias:
  - Identidade: nome, título, idade inicial, região de origem, símbolo pessoal.
  - Aparência: retrato base, idade visual, vestimenta, cor, brasão/símbolo.
  - Origem: escolha com bônus e risco visíveis.
  - Tradição: escolha de tradição própria, evento exclusivo, rivalidade e objetivo.
  - Atributos: distribuir 10 pontos, máximo `+3`, permitir reduzir até `-1` para ganhar ponto.
  - Artes: 1 Técnica principal `5`, 1 Forma principal `5`, 2 secundárias `3`, 3 menores `1`.
  - Especialização: escolher uma.
  - Virtudes e defeitos: escolher exatamente 2 virtudes e 1 defeito.
  - Laboratório inicial: escolher um tipo.
  - Ambição: escolher objetivo de longo prazo.
  - Confirmação: resumo mecânico completo antes de fundar.
- A UI deve sempre responder:
  - o que ganho;
  - o que perco;
  - qual risco isso cria.
- Usar controles adequados:
  - stepper/tabs para etapas;
  - cards apenas para opções repetidas;
  - sliders ou botões `+/-` para atributos;
  - seleção segmentada para Artes;
  - checkboxes controlados para virtudes/defeitos;
  - botão final desabilitado até validação completa.
- Manter estética atual, mas melhorar a experiência:
  - tom de grimório administrativo;
  - interface densa, legível, mobile-first;
  - sem landing page;
  - sem texto tutorial excessivo dentro da tela.

## Regras De Validação

- Identidade:
  - `mageName` obrigatório, mínimo 2 caracteres.
  - `covenantName` obrigatório.
  - idade inicial entre 25 e 80, default 35.
- Atributos:
  - total base: 10 pontos.
  - cada atributo inicia em 0.
  - máximo inicial: +3.
  - mínimo inicial: -1.
  - cada atributo em -1 concede +1 ponto extra.
  - não permitir confirmar com pontos pendentes ou negativos.
- Artes:
  - exatamente 1 Técnica principal valor 5.
  - exatamente 1 Forma principal valor 5.
  - exatamente 2 Artes secundárias valor 3.
  - exatamente 3 Artes menores valor 1.
  - impedir duplicidade entre categorias.
- Virtudes/defeitos:
  - exatamente 2 virtudes.
  - exatamente 1 defeito.
- Confirmação:
  - bloquear criação se qualquer etapa estiver inválida.
  - mostrar resumo de modificadores finais.

## Integração Com createInitialGameState

- Expandir `CampaignCreationConfig` para receber `mage: MageCreationConfig`.
- `createInitialGameState` deve:
  - preencher `MageState` completo;
  - aplicar origem;
  - aplicar tradição;
  - aplicar atributos;
  - aplicar Artes;
  - aplicar especialização;
  - aplicar virtudes/defeitos;
  - aplicar laboratório inicial;
  - aplicar ambição;
  - gerar evento inicial narrativo;
  - preencher histórico inicial do mago.
- Garantir que modificadores afetem sistemas reais:
  - Laboratorista: bônus em `laboratory.quality` ou modificador de laboratório.
  - Erudito: bônus em biblioteca/escrita.
  - Senhor Feudal: lealdade, segurança ou renda.
  - Diplomata Hermético: influência e relação com Tribunal.
  - Mercador Arcano: prata, comércio e guildas.
  - Explorador de Auras: fonte inicial/risco menor em investigação.
  - Médico Hermético: saúde pública, médicos/apotecários.
  - Duelista: bônus futuro para Certâmen.
- Registrar efeitos como `MagusTrait.effects`, não apenas texto.

## Migrations E Compatibilidade

- Incrementar `CURRENT_SAVE_VERSION`.
- Atualizar `migrateSave`:
  - se `mage.title` não existir, default vazio;
  - se `mage.origin` não existir, default `urban_academic` ou `unknown_legacy`;
  - se `mage.appearance` não existir, criar aparência padrão;
  - se `mage.specialization` não existir, inferir por arquétipo quando possível;
  - se `mage.fatigue` não existir, default `0`;
  - se `mage.ambition` não existir, default `found_great_library` ou `legacy_ambition`;
  - garantir `virtues`, `flaws`, `history`, `arts`, `abilities` e `characteristics`.
- Saves antigos devem abrir sem tela quebrada em `MageScreen`.

## Atualização Da Tela Do Mago

- Atualizar `MageScreen` para exibir:
  - título;
  - origem;
  - tradição própria;
  - aparência/símbolo;
  - especialização;
  - laboratório inicial;
  - ambição;
  - fadiga;
  - virtudes e defeitos com efeitos;
  - histórico de criação.
- Atualizar fórmulas exibidas:
  - laboratório deve considerar virtudes e especialização;
  - escrita deve considerar Bom Professor/Escritor Prolífico;
  - crises devem considerar origem/especialização médica;
  - duelo deve preparar caminho para Certâmen.

## Subagentes

- `Docs/GDD`:
  - adiciona a seção “Sistema de Criação do Mago” ao GDD.
  - atualiza `docs/plano_GDD.md` e `docs/backlog_tecnico.md`.
- `Data Model`:
  - define tipos, dados estáticos e migrations.
  - garante compatibilidade de saves.
- `Game Systems`:
  - aplica bônus mecânicos no `createInitialGameState`.
  - ajusta fórmulas relacionadas.
- `Frontend`:
  - refatora `CreateSovereigntyScreen` em wizard.
  - atualiza `MageScreen`.
- `QA`:
  - cria testes unitários, integração e E2E.
  - valida regressão do single-player.
- `Integrador`:
  - revisa conflitos.
  - roda gates.
  - registra tudo em `estado_agente.md`.

## Testes Obrigatórios

- Unitários:
  - valida distribuição de atributos.
  - valida seleção de Artes.
  - valida 2 virtudes + 1 defeito.
  - valida aplicação de origem.
  - valida aplicação de tradição.
  - valida aplicação de laboratório inicial.
  - valida aplicação de ambição.
  - valida migration de save antigo.
- Integração:
  - criar campanha com mago completo.
  - carregar `MageScreen` sem erro.
  - confirmar que `GameState.mage` contém todos os campos novos.
  - confirmar que recursos/covenant/laboratory/library mudam conforme escolhas.
- E2E:
  - abrir criação de soberania.
  - preencher wizard completo.
  - tentar confirmar inválido e ver bloqueio.
  - confirmar válido.
  - navegar para dashboard.
  - abrir tela do mago.
  - verificar nome, tradição, Artes, virtudes, defeito e ambição.
- Gates:
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:unit`
  - `npm run test:integration`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run validate:all`
  - `git diff --check`

## Registro Em estado_agente.md

- Criar entrada:
  - `Execução Arkanus — Sistema de Criação do Mago Fundador`
- Registrar:
  - objetivo;
  - arquivos tocados;
  - decisões de design;
  - dados adicionados;
  - testes executados;
  - falhas;
  - correções;
  - pendências.
- Não substituir histórico existente.

## Critérios De Aceite

- O GDD contém a seção nova completa.
- A criação de campanha exige criação detalhada do mago.
- O mago criado altera o estado inicial da campanha.
- `MageScreen` mostra as escolhas do jogador.
- Saves antigos continuam funcionando.
- Nenhum nome dependente de licença externa permanece na criação inicial.
- Testes cobrem validações principais.
- `validate:all` passa.
- `git diff --check` passa.
