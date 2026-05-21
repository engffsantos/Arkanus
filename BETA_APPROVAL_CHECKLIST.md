# Critérios e Checklist de Aprovação — Arkanus Beta

Para declarar o Beta do Arkanus como oficialmente **Aprovado para Distribuição**, o projeto deve atender com êxito a todos os critérios e testes especificados abaixo.

## 1. Critérios de Produto e UX
- [ ] **Identificação Clara**: O número da versão (`1.0.0-beta.1` ou superior) e a marcação de Beta aparecem de forma elegante na tela de carregamento e no menu principal.
- [ ] **Onboarding Funcional**: Jogador novato consegue iniciar e entender a progressão estratégica inicial sem auxílio externo.
- [ ] **Relatório de Estação**: Fechamento do turno sazonal exibe o sumário visual de ganhos, perdas, estados "antes/depois" e a recomendação do Conselho.
- [ ] **Defesa no Carregamento**: Saves corrompidos não travam a renderização do Dashboard; importador valida dados defensivamente antes de sobrescrever.
- [ ] **Compatibilidade Mobile**: O jogo roda de forma fluida a partir de 360px de largura de tela, com área de toque mínima de 44px para botões interativos.

## 2. Critérios de Jogabilidade (Gameplay)
- [ ] **Sessão Completa**: Pelo menos 8 estações (2 anos inteiros de ciclo) podem ser jogadas consecutivamente sem quebras ou travamentos.
- [ ] **Sandbox de Longo Prazo**: A campanha pode ultrapassar o Ano III de forma segura e estável, entrando no modo sandbox livre.
- [ ] **Calibração de Recursos**: Nenhum recurso básico da soberania (Prata, Lealdade, Saúde) zera ou atinge valores infinitos injustamente no Ano I devido a desbalanceamento de fórmulas.

## 3. Critérios Técnicos
- [ ] **Build Livre de Erros**: O comando `npm run build` conclui o empacotamento com sucesso e gera o manifesto PWA.
- [ ] **Typecheck Limpo**: O comando `npm run typecheck` passa sem erros de tipagem TypeScript no código cliente.
- [ ] **Simulador de Campanha**: O script `npm run simulate` executa 100 turnos sem interrupções nem divergências matemáticas.
