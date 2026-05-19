# Plano De Correção E Consolidação — Arkanus / Soberania Hermética

## Resumo

Objetivo: corrigir o plano técnico, alinhar documentação, remover declarações prematuras de “GDD completo”, e transformar o multiplayer atual de protótipo parcial em beta funcional client-side.

Escopo imediato:
- Atualizar `docs/plano_GDD.md` como “Plano de Execução Técnica”.
- Anexar ao GDD uma seção curta apontando para o plano técnico.
- Corrigir inconsistências reais detectadas: Firestore Rules incompatíveis com scheduler, telas multiplayer placeholder, mercado/Vis incompletos, testes insuficientes e whitespace.
- Manter execução por fases, com registros obrigatórios em `estado_agente.md`.

## Mudanças De Documento

- Renomear o título de `docs/plano_GDD.md` para:

```md
# Plano de Execução Técnica — Arkanus / Soberania Hermética

Versão: 1.0
Escopo: GDD completo + multiplayer assíncrono client-side
Arquitetura-alvo: React + Vite + Firebase + Firestore
Modo de execução: fases pequenas com gates obrigatórios de teste
```

- Adicionar no começo do plano a seção `Riscos Técnicos Principais`:
  - multiplayer client-side não é autoritativo;
  - resolução sazonal exige idempotência forte;
  - saves antigos precisam de migrations/defaults;
  - Firestore Rules reduzem abuso, mas não substituem servidor;
  - E2E depende de `npm run start` ou Playwright configurado corretamente.

- Adicionar `Fase 0.5 — Inventário Do Projeto Atual` antes da consolidação de GDD:
  - mapear pastas, telas, serviços, tipos, testes e scripts reais;
  - confirmar `src/types/multiplayer.ts`, `firestore.rules`, `playwright.config.ts`;
  - confirmar scripts `test:firebase`, `simulate`, `validate:all`;
  - registrar inventário em `estado_agente.md`.

- Adicionar no GDD uma seção final curta chamada `Plano Mestre De Execução Técnica`, apontando para `docs/plano_GDD.md` e declarando que o GDD descreve o produto, enquanto o plano descreve a implementação.

- Atualizar a ordem técnica:
  - Baseline
  - Inventário
  - GDD/backlog
  - Modelos de dados
  - Serviços Firestore/regras
  - Scheduler
  - UI multiplayer base
  - Fontes de Vis
  - Certâmen
  - Tribunal
  - Diplomacia
  - Mercado
  - Alianças
  - Intriga/moderação
  - Temporadas/ranking
  - Campanhas
  - Hardening

## Correções Técnicas Prioritárias

- Corrigir higiene do diff:
  - remover trailing whitespace em `PortalScreen.tsx` e `src/types/multiplayer.ts`;
  - remover linha em branco excedente no EOF de `estado_agente.md`;
  - repetir `git diff --check` até passar.

- Corrigir o scheduler client-side:
  - usar `SeasonTick` com ID determinístico: `${regionId}_${year}_${season}`;
  - antes de resolver, checar se o tick já existe;
  - se existir, retornar sem aplicar recompensas;
  - não depender de `multiplayer_actions.status = resolved` para idempotência;
  - resolver apenas ações da estação atual;
  - registrar `resolutionId` nos logs públicos/privados;
  - retornar `true` somente quando a resolução realmente ocorreu ou já estava resolvida, e retornar erro explícito para permissão/dados inválidos.

- Corrigir Firestore Rules para bater com a arquitetura client-side:
  - permitir que membro ativo da região crie `multiplayer_season_ticks` com ID determinístico e campos imutáveis mínimos;
  - permitir avanço controlado de `multiplayer_regions` apenas para membros ativos e apenas nos campos `season`, `year`, `turn`, `phase`, `lastResolutionAt`;
  - manter `multiplayer_actions` imutável após criação;
  - permitir `multiplayer_vis_sources` somente via ações controladas ou substituir update direto por coleção de `multiplayer_vis_claims`;
  - remover regras genéricas como `allow update: if isSignedIn()` em tribunal, alianças, mercado e leilões, substituindo por regras por participante/dono.

- Completar sistemas que hoje são stubs:
  - Mercado: transferir prata/Vis entre comprador e vendedor em transação, validar saldo, aplicar taxa e gerar log.
  - Fontes de Vis: criar reivindicação, contestação, controlador temporário, histórico e produção.
  - Certâmen: criar desafio, aceitar/recusar, escolher técnica/forma/postura, resolver fórmula e aplicar consequência.
  - Tribunal: abrir caso, votar, calcular veredito, aplicar sentença e gerar registro.
  - Ranking: recalcular prestígio regional após resolução sazonal.

- Substituir telas placeholder por telas funcionais:
  - listar dados reais do Firestore;
  - criar ações reais;
  - exibir loading/erro/vazio;
  - impedir envio duplicado;
  - mostrar logs e resultados.

## Critério Mínimo Para Multiplayer Beta

O multiplayer só pode voltar a ser marcado como “beta funcional” quando estes fluxos passarem por testes:

- Usuário entra em uma região.
- Usuário vê outros jogadores da região.
- Usuário envia uma ação sazonal.
- A ação enviada fica bloqueada.
- A região avança estação.
- A resolução não duplica recompensas.
- Dois jogadores disputam uma fonte de Vis.
- Um Certâmen é criado, aceito e resolvido.
- Um caso de Tribunal é aberto, votado e aplicado.
- Mercado transfere recurso e prata sem duplicação.
- Ranking regional é atualizado.
- Logs públicos e privados são gravados.
- Single-player continua funcionando.

## Plano De Testes

- Por fase:
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:unit`
  - testes específicos da fase
  - `npm run build`

- Gates obrigatórios quando mexer em Firebase:
  - `npm run test:firebase`
  - novos testes de rules para permitido/negado por coleção multiplayer.

- Gates obrigatórios quando mexer em UI:
  - `npm run test:integration`
  - `npm run test:e2e`
  - adicionar E2E cobrindo `/multiplayer/regions`, lobby, envio de ação, mercado, Vis, Certâmen e Tribunal.

- Gate final:
  - `npm run validate:all`
  - `git diff --check`
  - registro final em `estado_agente.md`.

## Assumptions

- A arquitetura continua sendo Firestore client-side, sem Cloud Functions.
- O objetivo é beta funcional, não segurança competitiva autoritativa final.
- `estado_agente.md` deve preservar histórico e receber novas entradas incrementais.
- As telas placeholder não contam como sistema implementado.
- Testes existentes passando não bastam; cada fluxo multiplayer novo precisa de teste próprio.
