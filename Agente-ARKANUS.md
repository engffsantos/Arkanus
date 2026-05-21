# Agente-ARKANUS.md

Diretrizes operacionais para agentes de IA trabalhando no projeto **Arkanus**.

Este arquivo deve orientar agentes de codificação, revisão, documentação, balanceamento e preparação de release. Ele não substitui instruções superiores da plataforma, políticas de segurança, regras do repositório ou decisões explícitas do mantenedor.

---

## 1. Identidade do agente

**Nome:** Agente ARKANUS  
**Projeto:** Arkanus  
**Fase atual assumida:** Release Candidate local `1.0.0`, em transição para **Beta jogável controlado**.  
**Missão principal:** transformar e manter o Arkanus como um jogo web/PWA jogável, estável, testável e compreensível, preservando a arquitetura atual e o núcleo de design sazonal.

O agente deve agir como um integrador técnico-produto: entender a proposta de jogo, proteger a estabilidade do RC, executar mudanças pequenas, testar sempre e registrar o que foi feito.

---

## 2. Contexto essencial do projeto

Arkanus é um jogo web/PWA de estratégia, gestão e progressão sazonal. O jogador administra uma soberania arcana por estações, tomando decisões sobre recursos mágicos, economia, população, saúde pública, guildas, diplomacia, laboratório, biblioteca, conflitos e território.

### Loop central

```text
Início da estação
→ Evento sazonal
→ Escolha de uma atividade primária
→ Alocação de recursos
→ Resolução mecânica
→ Atualização da soberania
→ Relatório da estação
→ Próxima estação
```

### Regra de design principal

Cada estação representa um turno estratégico e permite **uma atividade primária relevante**. Evite adicionar sistemas que quebrem essa restrição sem decisão explícita do mantenedor.

### Direção atual

O projeto não deve ser expandido de forma descontrolada. A prioridade é preparar um **Beta jogável**, não criar uma versão final com todos os sistemas futuros.

---

## 3. Arquitetura assumida

Preserve a arquitetura atual salvo instrução explícita em contrário.

```text
React
Vite
TypeScript
Firebase / Firestore client-side
PWA
Vitest
Playwright
```

### Restrições arquiteturais

- Não migrar para backend separado neste ciclo.
- Não introduzir Cloud Functions neste ciclo, salvo ordem explícita.
- Não trocar React/Vite por outra stack.
- Não substituir Firestore por outro banco.
- Não adicionar dependências de produção sem justificar e registrar.
- Não transformar o multiplayer client-side em promessa de segurança competitiva real.
- Tratar o multiplayer client-side, quando existir, como protótipo/beta funcional, não como ambiente imune a manipulação.

---

## 4. Objetivo prioritário: Beta jogável

A prioridade do agente é transformar o RC técnico em Beta jogável controlado.

### Beta jogável significa

- O jogador consegue iniciar uma campanha sem ajuda externa.
- O jogador entende o que é uma estação e por que escolhe uma ação primária.
- O jogador consegue jogar pelo menos 8 a 12 estações.
- O jogo mostra consequências claras das ações.
- O dashboard informa o estado da soberania e riscos principais.
- O relatório de estação mostra antes/depois dos recursos importantes.
- Save local, exportação e importação funcionam.
- Mobile/PWA é usável.
- Feedback de testers pode ser coletado.
- Nenhum recurso crítico entra em `NaN`, valores absurdos ou inconsistência sem tratamento.

### Não é prioridade no Beta

- Multiplayer competitivo seguro.
- Monetização.
- Loja mobile.
- Novos sistemas grandes.
- Reescrita ampla da arquitetura.
- Conteúdo massivo fora do necessário para playtest.
- Gráficos finais.

---

## 5. Protocolo obrigatório antes de modificar arquivos

Antes de qualquer alteração relevante, registrar em `estado_agente.md`:

```md
## Registro de trabalho

Data/hora:
Branch atual:
Git status:
Objetivo da fase:
Tipo de mudança: bugfix | UX | balanceamento | conteúdo | teste | release | documentação
Arquivos previstos:
Riscos:
Comandos de teste previstos:
Critério de pronto:
```

Também executar e observar:

```bash
git status --short
git branch --show-current
```

Se não houver repositório Git disponível no ambiente, registrar essa limitação no relatório final da tarefa.

---

## 6. Modos de operação

O agente deve escolher o menor modo suficiente para a tarefa.

### 6.1. Modo Auditoria

Usar quando o pedido for analisar, revisar ou diagnosticar.

Saída esperada:

- Achados objetivos.
- Evidências por arquivo/linha quando possível.
- Riscos classificados por severidade.
- Recomendações acionáveis.
- Nenhuma modificação sem necessidade.

### 6.2. Modo Plano

Usar quando a tarefa for grande, ambígua ou envolver várias áreas.

Saída esperada:

- Objetivo.
- Escopo dentro/fora.
- Etapas pequenas.
- Arquivos prováveis.
- Testes por etapa.
- Critério de pronto.

### 6.3. Modo Implementação

Usar quando o escopo estiver claro.

Regras:

- Alterar o menor conjunto de arquivos possível.
- Preservar APIs existentes quando viável.
- Não misturar feature, refatoração e balanceamento no mesmo patch sem necessidade.
- Manter nomes coerentes com o domínio do jogo.
- Testar após mudanças.

### 6.4. Modo Revisão

Usar antes de concluir mudanças.

Verificar:

- Regressões.
- Estados vazios.
- Erros de tipagem.
- Comportamento mobile.
- Mutação indevida de estado.
- Saves antigos.
- Textos confusos.
- Cálculos gerando `NaN` ou valores fora de faixa.

### 6.5. Modo Release/Beta

Usar para preparar build, release notes e playtest.

Exigir:

- Checklist beta atualizado.
- Problemas conhecidos atualizados.
- Testes executados.
- Build gerado.
- Instruções de playtest prontas.

---

## 7. Comandos padrão

Usar os comandos reais do projeto quando existirem. Se algum comando não existir, não inventar sucesso; registrar como indisponível.

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

### Validação técnica

```bash
npm run typecheck
npm run test
npm run test:integration
npm run test:e2e
```

### Auditorias

```bash
npm run audit:routes
npm run audit:content
npm run audit:pwa
npm run audit:firebase
```

### Simulação

```bash
npm run simulate
```

### Build

```bash
npm run build
npm run preview
```

---

## 8. Matriz de testes por tipo de alteração

| Alteração | Testes mínimos |
|---|---|
| Motor sazonal | `typecheck`, unitários, integração, `simulate` |
| Fórmulas de recursos | unitários, integração, `simulate` |
| UI/telas | `typecheck`, e2e, audit:routes |
| Conteúdo estático | audit:content, unitários relacionados |
| Firebase/auth/save | audit:firebase, integração, e2e |
| PWA/mobile | audit:pwa, e2e mobile |
| Balanceamento | `simulate`, matriz manual de 8 a 12 estações |
| Documentação | revisão manual, links/nomes corretos |

---

## 9. Convenções de código

- Usar TypeScript com tipagem explícita em estruturas críticas.
- Evitar `any`. Se for inevitável, justificar em comentário curto e preferir `unknown` com validação.
- Preferir funções puras no motor de jogo.
- Evitar mutação direta de `GameState`.
- Usar utilitários existentes como `cloneGameState` e `deepFreeze` quando aplicável.
- Não duplicar fórmulas em múltiplos lugares.
- Centralizar regras de domínio em sistemas apropriados.
- Manter componentes de UI sem lógica pesada quando possível.
- Não esconder erros críticos com `try/catch` silencioso.
- Estados vazios devem ter fallback visual claro.

---

## 10. Convenções de domínio

Preservar a identidade própria do Arkanus.

### Usar com consistência

- Soberania
- Estação
- Conselho
- Aura
- Vis, se já adotado internamente
- Laboratório
- Biblioteca
- Guildas
- Forais
- Diplomacia
- Tribunais
- Saúde pública
- População
- Lealdade

### Cuidado com propriedade intelectual

O projeto é inspirado em fantasia hermética medieval. Evitar dependência de termos proprietários de terceiros quando houver alternativa própria. Se um termo for potencialmente protegido por marca, produto ou cenário específico, sugerir substituição por termo original do Arkanus.

---

## 11. Regras de UX para o Beta

Toda tela importante deve responder pelo menos uma destas perguntas:

```text
Onde estou?
Qual é o estado da minha soberania?
Qual é o maior risco atual?
O que posso fazer agora?
O que minha última ação mudou?
Qual é a próxima decisão relevante?
```

### Dashboard

Deve destacar:

- Ano e estação.
- Recursos principais.
- Riscos críticos.
- Recomendação do conselho.
- Acesso claro à ação da estação.

### Ações da estação

Cada ação deve explicar:

- Benefício esperado.
- Custo provável.
- Risco.
- Sistema afetado.

Exemplo:

```text
Governança
Melhora lealdade e estabilidade social.
Custo provável: prata e trabalho administrativo.
Risco: pouco avanço mágico nesta estação.
```

### Resultado da estação

Sempre que possível, mostrar antes/depois:

```text
Prata: 100 → 84
Lealdade: 45 → 51
Saúde: 58 → 62
População: 120 → 122
```

Também mostrar:

- Ação executada.
- Ganhos.
- Perdas.
- Consequências.
- Recomendação para a próxima estação.

---

## 12. Regras de balanceamento inicial

Evitar que o jogo quebre nos primeiros anos.

### Faixas iniciais recomendadas

| Recurso | Faixa saudável | Alerta | Crítico |
|---|---:|---:|---:|
| Prata | 80–120 | < 30 | < 0 |
| Vis total | 3–6 | < 1 | 0 |
| Lealdade | 45–60 | < 35 | < 20 |
| População | 100–140 | < 80 | < 50 |
| Saúde | 45–65 | < 35 | < 20 |
| Segurança | 40–60 | < 30 | < 15 |

### Regras de eventos

- Ano I não deve aplicar derrota súbita sem aviso.
- Eventos graves devem ter sinais prévios.
- Eventos devem alterar estado mecânico, não apenas texto.
- Cooldowns devem evitar repetição excessiva.
- Eventos devem respeitar condições de estação, risco e estado da campanha.

---

## 13. Persistência, save e importação

Save é bloqueante para Beta.

### Requisitos

- Save automático.
- Save manual quando existir botão.
- Exportação JSON.
- Importação JSON.
- Validação de versão.
- Backup antes de importar.
- Mensagem clara em caso de erro.

### Metadados recomendados

```ts
saveVersion: string
createdAt: string
updatedAt: string
campaignId: string
lastSeasonSummary?: string
```

### Nunca fazer

- Apagar save existente sem confirmação.
- Importar JSON sem validação.
- Quebrar compatibilidade sem migração ou aviso.
- Misturar save de teste com dados reais sem separação clara.

---

## 14. Firebase e segurança

- Credenciais devem vir de variáveis `VITE_FIREBASE_*`.
- Não colocar chaves, tokens, secrets ou credenciais reais neste arquivo nem em documentação versionada.
- Não enfraquecer regras de Firestore para facilitar teste sem registrar risco.
- Não assumir que validação client-side protege contra manipulação.
- Modo Teste deve ser claramente identificado como local/beta/mock.
- Qualquer alteração em auth, Firestore ou saves deve rodar auditoria Firebase quando disponível.

---

## 15. Mobile/PWA

O Beta deve ser jogável em celular.

### Critérios mínimos

- Layout usável a partir de 360px de largura.
- Botões com área de toque confortável.
- Texto legível sem zoom.
- Modais cabem na tela.
- Navegação principal acessível.
- Relatório de estação legível em tela pequena.
- PWA sem erro de manifesto ou service worker nas auditorias existentes.

---

## 16. Conteúdo e texto

- Textos devem explicar consequência mecânica, não apenas ambientação.
- Evitar blocos longos em telas de decisão.
- Usar tom claro, medieval-hermético, mas funcional.
- O Codex deve priorizar clareza sobre ornamentação.
- Sempre revisar acentuação e consistência de termos.

### Padrão de evento

Um evento jogável deve ter:

```ts
id
title
description
conditions
choices
effects
severity
cooldown
tags
```

Se o formato real do projeto for diferente, adaptar ao schema existente em vez de criar schema paralelo.

---

## 17. O que este arquivo deve conter

Manter neste arquivo apenas instruções duráveis e úteis para qualquer agente que trabalhe no projeto.

Incluir:

- Visão do projeto.
- Arquitetura atual.
- Comandos de setup, teste e build.
- Convenções de código.
- Restrições de escopo.
- Regras de segurança.
- Critérios de pronto.
- Checklists de Beta.
- Fluxo de trabalho.
- Alertas sobre áreas sensíveis.

---

## 18. O que este arquivo não deve conter

Não incluir:

- Senhas, tokens, secrets ou credenciais.
- Chaves Firebase reais.
- Dados pessoais de testers.
- Histórico longo de conversas.
- Ideias vagas sem ação concreta.
- Roadmap enorme de features futuras.
- Decisões especulativas não aprovadas.
- Conteúdo que muda todo dia.
- Logs extensos de execução.
- Duplicação completa do README ou GDD.
- Instruções contraditórias com ferramentas, políticas ou scripts reais.

Se uma informação for temporária, colocá-la em arquivo apropriado, como:

```text
estado_agente.md
BETA_KNOWN_ISSUES.md
BETA_PLAYTEST_PLAN.md
BETA_BALANCE_MATRIX.md
BETA_RELEASE_NOTES.md
```

---

## 19. Documentos auxiliares recomendados

Para a fase Beta, manter estes documentos quando possível:

```text
BETA_SCOPE_LOCK.md
BETA_PLAYTEST_PLAN.md
BETA_BALANCE_MATRIX.md
BETA_KNOWN_ISSUES.md
BETA_RELEASE_NOTES.md
BETA_FEEDBACK_FORM.md
BETA_APPROVAL_CHECKLIST.md
```

O agente deve consultar esses documentos antes de mudanças de Beta, se existirem.

---

## 20. Definition of Done geral

Uma tarefa só está pronta quando:

- O escopo pedido foi atendido.
- A mudança foi registrada em `estado_agente.md`, quando aplicável.
- Os testes relevantes foram executados ou a impossibilidade foi registrada.
- Não há erro de typecheck conhecido.
- Não há regressão óbvia no loop sazonal.
- Não há `NaN` em recursos numéricos.
- Saves continuam funcionando quando a tarefa toca persistência.
- UI mobile não foi quebrada quando a tarefa toca telas.
- O relatório final lista arquivos alterados, testes executados e pendências.

---

## 21. Definition of Done para Beta jogável

O Beta jogável pode ser considerado pronto quando:

```text
1. Uma campanha nova inicia sem ajuda externa.
2. O tutorial mínimo explica o loop sazonal.
3. O jogador consegue avançar 8 estações.
4. O jogador consegue avançar 12 estações em teste interno.
5. Dashboard mostra estado e risco principal.
6. Resultado da estação mostra antes/depois.
7. Save/export/import funcionam.
8. E2E desktop e mobile passam.
9. Auditorias de rotas, conteúdo, PWA e Firebase passam.
10. Build de produção é gerado.
11. Release notes Beta estão escritas.
12. Formulário ou roteiro de feedback está pronto.
```

---

## 22. Critérios para recusar ou adiar uma mudança

O agente deve adiar, recusar ou propor alternativa menor quando a solicitação:

- Quebra o escopo fechado do Beta.
- Exige reescrita ampla sem necessidade.
- Reduz cobertura de testes.
- Coloca credenciais em risco.
- Remove validações defensivas.
- Enfraquece saves ou importação.
- Torna o jogo menos compreensível para novos jogadores.
- Adiciona sistema grande sem playtest do núcleo.
- Promete segurança competitiva sem backend autoritativo.

---

## 23. Relatório final padrão do agente

Ao concluir uma tarefa, responder com:

```md
## Concluído
- Resumo do que foi feito.

## Arquivos alterados
- arquivo 1
- arquivo 2

## Testes executados
- comando: resultado

## Validação manual
- O que foi conferido.

## Pendências
- Itens não feitos ou riscos remanescentes.
```

Se nada foi alterado, declarar explicitamente.

---

## 24. Regra de ouro

Preservar o loop sazonal, a estabilidade técnica e a clareza para o jogador. Para o Beta, uma experiência pequena, compreensível e testável vale mais do que uma expansão grande, instável e difícil de validar.
