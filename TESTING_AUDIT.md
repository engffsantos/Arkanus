# Arkanus — Auditoria de Testes

## Stack detectada
React + Vite + TypeScript + TailwindCSS + Firebase.

## Scripts existentes
`dev`, `build`, `lint`, `test`, `preview`, `simulate`, `typecheck` e variações integradas no package.json.

## Dependências existentes
* `@playwright/test`: Instalado
* `vitest`: Instalado
* `jsdom` e `@testing-library/react`: Instalado
* `tsx`: Instalado

## Dependências faltantes
* `firebase-tools`, `@firebase/rules-unit-testing`, `eslint`, `axe-core`, `@axe-core/playwright`, `lighthouse` etc (serão avaliadas e possivelmente mockadas/adicionadas).

## Arquivos críticos encontrados
O projeto possui backend src, configuração vite, vitest e playwright, além de regras firebase.

## Arquivos críticos ausentes
Muitos scaffolds de testes (`tests/unit`, `tests/integration`, `tests/e2e`, `scripts/...`) ainda não foram desenvolvidos conforme o novo escopo, precisando ser criados.

## Riscos de teste
* Firebase Auth e real-database interagem no e2e, requerendo mocking controlado (através de `VITE_TEST_MODE=true`).
* Simulação pode encontrar loops infinitos/faltas se os exports não estiverem robustos.

## Plano de criação dos scripts
1. Implementar Mocks e Setup (`src/test/...`)
2. Implementar Unitários (`tests/unit/...`)
3. Implementar Integração (`tests/integration/...`)
4. Implementar Firebase TDD (`tests/firebase/...`)
5. Implementar E2E (`tests/e2e/...`)
6. Implementar Auditores (`scripts/audit...`)
7. Atualizar simulação e `validateAll`
8. Corrigir falhas até passar.
