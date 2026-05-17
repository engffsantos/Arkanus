# Arkanus

Jogo web/PWA de estratégia hermética por turnos.

## Instalação

npm install

## Desenvolvimento

npm run dev

## Build

npm run build

## Deploy Firebase

firebase deploy

## Configuração

O arquivo `firebase-applet-config.json` inicializa o Firebase no MVP atual.
Na ausência deste, preencha as variáveis de ambiente baseadas no seu `.env.example`.

## Testes e Validação

### Rodar todos os testes
```bash
npm run validate:all
```

### Testes unitários
```bash
npm run test:unit
```

### Testes de integração
```bash
npm run test:integration
```

### Testes E2E
```bash
npm run test:e2e
```

### Simulação de campanha
```bash
npm run simulate
```

### Auditorias
```bash
npm run audit:content
npm run audit:routes
npm run audit:pwa
npm run audit:firebase
```

### Build de produção
```bash
npm run build
```
