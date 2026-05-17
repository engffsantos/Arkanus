# Arkanus — Auditoria de Hardening

## Data
2026-05-17

## Branch
main

## Node/NPM
v20+ / npm v10+

## Comandos executados
`npx --yes tsx scripts/validateAll.ts`

## Resultado do lint
✓ Passou

## Resultado do build
✓ Passou (compiled to dist)

## Resultado dos testes
✓ Unitários passando
✓ Integração passando
✓ E2E passando

## Resultado da simulação
✓ Passou (100 campanhas run)

## Arquivos críticos encontrados
- src/firebase/firebase.ts (Corrigido para usar env, mas será revisto para atender completamente o padrão)
- src/services/actionDispatcher.ts (Fragmentado inicialmente, será transformado no formato modular domain-based)
- src/context/GameContext.tsx
- src/types/game.ts
- src/services/eventEngine.ts
- src/services/saveMigration.ts
- firestore.rules
- vite.config.ts
- package.json

## Problemas encontrados
1. Ainda há `any` mapeados (necessário tipar e eliminar).
2. `actionDispatcher.ts` foi parcialmente resolvido mas precisará seguir o padrão de `systems/` exigido.
3. Imutabilidade absoluta do GameState (cópia JSON rasa ainda sendo processada em algumas partes).
4. Configuração Firebase acoplada ao fallback `require("../../firebase-applet-config.json")`.
5. Faltam 60 eventos no EventEngine.

## Riscos técnicos
- Muitas mudanças em andamento. É preciso agir iterativamente para não quebrar os testes.

## Plano de correção
1. Refinar Firebase config e remover o fallback se possível ou garantir `import.meta.env`.
2. Refatorar os tipos centralizados (`src/types/actions.ts` etc).
3. Criar utilities para Imutabilidade (Deep freeze/Clone).
4. Reestruturar os diretórios na arquitetura de `systems/`.
5. Ajustar a pipeline do avanço de turnos (`seasonEngine.ts`).
6. Completar EventEngine.

## Critérios de aceite
- Todos listados no Prompt Mestre serão validados com `validateAll.ts`.
