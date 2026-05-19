# Plano de Execução Técnica — Arkanus / Soberania Hermética

Versão: 1.1
Escopo: GDD completo + multiplayer assíncrono client-side
Arquitetura-alvo: React + Vite + Firebase + Firestore
Modo de execução: fases pequenas com gates obrigatórios de teste

## Riscos Técnicos Principais

1. **Multiplayer client-side não é autoritativo.** O Firestore é o backend, mas o cliente decide quando resolver estações. Isso significa que um jogador mal-intencionado pode manipular dados se as regras do Firestore não forem suficientemente restritivas. Mitigação: regras granulares por participante/dono, IDs determinísticos para ticks, transações atômicas.
2. **Resolução sazonal exige idempotência forte.** Se dois clientes tentarem resolver a mesma estação simultaneamente, o sistema não pode duplicar recompensas. Mitigação: SeasonTick com ID determinístico `${regionId}_${year}_${season}`; checar existência antes de resolver.
3. **Saves antigos precisam de migrations/defaults.** O `saveMigration.ts` já cobre isso para single-player, mas novos campos multiplayer devem ter defaults seguros.
4. **Firestore Rules reduzem abuso, mas não substituem servidor.** A validação client-side é complementar; o objetivo é beta funcional, não segurança competitiva final.
5. **E2E depende de `npm run start` ou Playwright configurado corretamente.** O `playwright.config.ts` deve apontar para o dev server.

## Protocolo Obrigatório De Trabalho

- Antes de qualquer mudança, registrar em `estado_agente.md`:
  - data/hora;
  - branch atual;
  - `git status --short`;
  - objetivo da fase;
  - subagentes envolvidos;
  - arquivos sob responsabilidade de cada subagente;
  - comandos de teste previstos.
- `estado_agente.md` será tratado como diário incremental: preservar o conteúdo atual e adicionar novas seções abaixo.
- Nenhum subagente pode editar arquivos fora da sua área combinada.
- O agente integrador revisa conflitos, roda testes e só então libera a próxima fase.
- Após cada fase, registrar:
  - arquivos alterados;
  - decisões tomadas;
  - testes executados;
  - resultado dos testes;
  - falhas encontradas;
  - correções aplicadas;
  - pendências;
  - próximo passo.
- Se qualquer teste falhar, parar a fase, registrar a falha em `estado_agente.md`, corrigir antes de avançar.
- Não reverter mudanças de outro subagente sem análise explícita.

## Fase 0 — Baseline, Test Harness E Controle

Subagentes:
- `QA`: valida ambiente, scripts e testes.
- `Docs`: prepara o formato incremental de `estado_agente.md`.
- `Integrador`: coordena e revisa.

Tarefas:
- Confirmar estado inicial com `git status --short`.
- Registrar que `docs/GDD_v2_Soberania_Hermetica_com_Multiplayer.md` aparece como arquivo não rastreado.
- Corrigir a infraestrutura de E2E antes de depender dela:
  - adicionar script `start` em `package.json` como alias seguro para o servidor Vite usado pelo Playwright, ou ajustar `playwright.config.ts` para usar `npm run dev`;
  - default recomendado: adicionar `"start": "vite --port=3000 --host=0.0.0.0"` para preservar a configuração atual.
- Rodar baseline:
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:unit`
  - `npm run test:integration`
  - `npm run build`
  - `npm run simulate`
  - `npm run test:e2e`
  - `npm run validate:all`
- Registrar todos os resultados em `estado_agente.md`.

Critério de saída:
- Suíte baseline passando ou falhas documentadas e corrigidas.
- Diário incremental funcionando.

## Fase 0.5 — Inventário Do Projeto Atual

Subagentes:
- `Integrador`: verifica a situação real do projeto antes do código novo.

Tarefas:
- mapear pastas, telas, serviços, tipos, testes e scripts reais;
- confirmar `src/types/multiplayer.ts`, `firestore.rules`, `playwright.config.ts`;
- confirmar scripts `test:firebase`, `simulate`, `validate:all`;
- registrar inventário em `estado_agente.md`.

## Fase 1 — Consolidar GDD E Backlog Técnico

Subagentes:
- `Docs/GDD`: organiza o documento.
- `Game Design`: transforma sistemas em backlog implementável.
- `Integrador`: valida escopo.

Tarefas:
- Separar conceitualmente o GDD em:
  - exemplo narrativo de estação;
  - GDD principal;
  - multiplayer;
  - roadmap;
  - backlog técnico.
- Remover ou corrigir artefatos quebrados como citações `filecite`.
- Criar uma matriz GDD -> implementação:
  - já implementado;
  - parcial;
  - faltante;
  - adiado;
  - risco.
- Manter o GDD inteiro como alvo, mas ordenar entregas por dependência técnica.
- Registrar em `estado_agente.md` a matriz resumida e a ordem das fases.

Testes:
- `npm run audit:content`
- `npm run typecheck`
- `npm run build`

Critério de saída:
- O time sabe exatamente quais sistemas faltam e em qual ordem serão implementados.

## Fase 2 — Modelos De Dados Multiplayer E Persistência

Subagentes:
- `Data Model`: tipos TypeScript e contratos.
- `Firestore`: coleções, regras e serviços.
- `QA`: testes unitários de contrato.

Tarefas:
- Expandir `src/types/multiplayer.ts` para cobrir o GDD inteiro:
  - `Account`
  - `Region`
  - `SeasonTick`
  - `PlayerCovenant`
  - `Alliance`
  - `AllianceMember`
  - `DiplomaticMessage`
  - `Treaty`
  - `MarketOrder`
  - `Auction`
  - `TribunalSession`
  - `TribunalCase`
  - `Vote`
  - `Evidence`
  - `CertamenChallenge`
  - `CertamenResult`
  - `SharedVisSource`
  - `Notification`
  - `ModerationLog`
  - `LeaderboardEntry`
  - `SeasonReward`
- Criar defaults e migrations para saves antigos.
- Criar serviços Firestore client-side por domínio:
  - regiões;
  - ações sazonais;
  - mercado;
  - tribunal;
  - certâmen;
  - fontes de Vis;
  - alianças;
  - notificações;
  - ranking.
- Atualizar `firestore.rules` para impedir writes óbvios fora do dono/participante.
- Documentar claramente em código e `estado_agente.md` que validação client-side não é segurança total.

Testes:
- `npm run typecheck`
- `npm run test:unit`
- `npm run test:firebase`
- `npm run build`

Critério de saída:
- Tipos e serviços compilam.
- Regras Firestore cobrem as novas coleções.
- Saves antigos continuam carregando.

## Fase 3 — Scheduler Client-Side E Resolução Sazonal Multiplayer

Subagentes:
- `Season Engine`: resolução de turnos.
- `Multiplayer Core`: submissão e leitura de ações.
- `QA`: simulações.

Tarefas:
- Implementar fluxo client-side de região:
  - entrar em região;
  - listar jogadores;
  - abrir estação;
  - enviar ação;
  - bloquear ação enviada;
  - resolver quando prazo expirar ou quando todos enviarem.
- Criar resolução determinística para:
  - ações econômicas;
  - governança;
  - estudo/laboratório;
  - comércio;
  - eventos regionais;
  - disputas;
  - ranking.
- Garantir que a resolução seja idempotente:
  - executar duas vezes não deve duplicar recompensas;
  - ações resolvidas não podem ser reprocessadas.
- Registrar logs públicos e privados da estação.

Testes:
- Unitários para idempotência.
- Integração para dois jogadores simulados.
- `npm run simulate`
- `npm run validate:all`

Critério de saída:
- Uma região multiplayer consegue avançar estação sem quebrar o single-player.

## Fase 4 — UI Multiplayer Base

Subagentes:
- `Frontend Multiplayer`: telas e navegação.
- `UX QA`: responsividade e fluxo mobile.
- `Integrador`: garante consistência visual.

Tarefas:
- Adicionar telas:
  - seleção de região;
  - lobby regional;
  - painel multiplayer;
  - envio de ação sazonal;
  - eventos regionais;
  - ranking;
  - notificações.
- Manter as telas single-player existentes sem regressão.
- Reusar layout e linguagem visual atuais.
- Adicionar estados vazios, loading, erro e fallback offline.

Testes:
- `npm run test:integration`
- `npm run test:e2e`
- `npm run audit:routes`
- `npm run audit:content`
- `npm run build`

Critério de saída:
- Usuário autenticado consegue acessar fluxo multiplayer básico pela UI.

## Fase 5 — Fontes De Vis Contestáveis E Certâmen

Subagentes:
- `Vis Sources`: fontes compartilhadas.
- `Certamen`: desafio e resolução.
- `QA`: testes de disputa.

Tarefas:
- Implementar fontes de Vis regionais:
  - descoberta;
  - reivindicação;
  - contestação;
  - controlador atual;
  - produção por estação/ano;
  - histórico.
- Implementar fluxo de disputa:
  - acordo;
  - Tribunal;
  - Certâmen;
  - retirada.
- Implementar Certâmen simplificado:
  - técnica;
  - forma;
  - postura;
  - foco/item permitido;
  - fadiga;
  - aleatoriedade controlada entre -3 e +3;
  - resultado e recompensa.
- Aplicar limites anti-assédio:
  - cooldown por alvo;
  - proteção de iniciante;
  - limite de perda irreversível.

Testes:
- Unitários da fórmula.
- Integração jogador A vs jogador B.
- E2E de desafiar, aceitar e resolver.
- `npm run validate:all`

Critério de saída:
- Uma fonte pode ser disputada e resolvida sem corromper estado.

## Fase 6 — Tribunal Multiplayer Completo

Subagentes:
- `Tribunal`: sessões, casos e votos.
- `Evidence`: provas e registros.
- `QA`: cenários jurídicos.

Tarefas:
- Implementar ciclo:
  - registro de caso;
  - acusação;
  - defesa;
  - provas;
  - votação;
  - sentença;
  - aplicação de penalidade.
- Implementar poder de voto:
  - voto base;
  - reputação jurídica;
  - cargos;
  - aliados;
  - limites contra domínio permanente.
- Implementar sentenças:
  - multa em prata;
  - multa em Vis;
  - perda de reivindicação;
  - restrição temporária;
  - reparação;
  - censura pública;
  - exílio temporário.
- Gerar logs regionais auditáveis.

Testes:
- Unitários de votação e sentença.
- Integração com múltiplos jogadores.
- E2E de abrir caso, votar e aplicar resultado.
- `npm run validate:all`

Critério de saída:
- Tribunal funciona como resolução alternativa ao Certâmen.

## Fase 7 — Mercado, Leilões E Economia Multiplayer

Subagentes:
- `Market`: ordens e trocas.
- `Auction`: leilões.
- `Economy QA`: anti-abuso e balanço.

Tarefas:
- Implementar mercado regional:
  - comprar/vender prata, Vis, livros, materiais, itens e serviços;
  - taxas;
  - limites por conta nova;
  - registro de grandes transferências.
- Implementar preços dinâmicos:
  - preço base;
  - raridade;
  - demanda regional;
  - reputação do vendedor;
  - taxa do mercado.
- Implementar leilões:
  - registrar item;
  - lances;
  - encerramento;
  - entrega;
  - auditoria por Tribunal.
- Integrar reputação mercantil.

Testes:
- Unitários de preço.
- Integração de compra/venda.
- Teste de bloqueio de troca inválida.
- E2E de listar item e comprar.
- `npm run validate:all`

Critério de saída:
- Mercado assíncrono opera sem duplicação de recursos.

## Fase 8 — Diplomacia, Tratados E Mensagens Seguras

Subagentes:
- `Diplomacy`: tratados e relações.
- `Messaging`: mensagens pré-formatadas.
- `QA`: quebra de tratado.

Tarefas:
- Implementar mensagens diplomáticas pré-formatadas.
- Implementar tratados:
  - não agressão;
  - comércio preferencial;
  - defesa jurídica;
  - divisão de fonte;
  - pacto acadêmico;
  - proteção de rota.
- Implementar quebra de tratado:
  - penalidade de reputação;
  - casus belli jurídico;
  - log público;
  - direito de acusação.
- Integrar tratados com Certâmen, Tribunal, mercado e fontes.

Testes:
- Unitários de status de tratado.
- Integração de quebra e penalidade.
- E2E de propor, aceitar e quebrar tratado.
- `npm run validate:all`

Critério de saída:
- Diplomacia afeta sistemas reais, não apenas texto.

## Fase 9 — Alianças, Projetos Coletivos E Tesouro

Subagentes:
- `Alliance`: estrutura e cargos.
- `Shared Treasury`: permissões e histórico.
- `QA`: permissões.

Tarefas:
- Implementar alianças:
  - criação;
  - convite;
  - cargos;
  - expulsão;
  - reputação;
  - histórico.
- Implementar tesouro compartilhado:
  - depósitos;
  - saques por permissão;
  - log permanente;
  - sem apagar histórico.
- Implementar projetos coletivos:
  - contribuição por membro;
  - progresso sazonal;
  - efeitos coletivos;
  - risco regional.

Testes:
- Unitários de permissões.
- Integração de projeto coletivo.
- E2E de criar aliança e contribuir.
- `npm run validate:all`

Critério de saída:
- Jogadores conseguem cooperar em estrutura persistente.

## Fase 10 — Intriga, Espionagem, Sabotagem E Moderação

Subagentes:
- `Intrigue`: ações ocultas.
- `Moderation`: logs e limites.
- `QA`: abuso e cooldowns.

Tarefas:
- Completar espionagem:
  - alvo;
  - aspecto investigado;
  - chance de sucesso;
  - risco de descoberta;
  - prova gerada.
- Completar sabotagem:
  - alvo;
  - recurso afetado;
  - custo;
  - risco;
  - cooldown.
- Implementar logs de moderação.
- Impedir repetição abusiva contra o mesmo jogador.
- Integrar descoberta de espionagem com Tribunal.

Testes:
- Unitários de chance/risco.
- Integração sabotagem -> prova -> Tribunal.
- E2E de ação oculta com resultado.
- `npm run validate:all`

Critério de saída:
- Intriga existe sem permitir assédio ilimitado.

## Fase 11 — Temporadas, Ranking E Recompensas

Subagentes:
- `Seasons`: temporadas e reset controlado.
- `Leaderboard`: rankings.
- `Rewards`: cosméticos.
- `QA`: fim de temporada.

Tarefas:
- Implementar temporadas:
  - início;
  - duração;
  - encerramento;
  - snapshot final.
- Implementar ranking:
  - prestígio principal;
  - biblioteca;
  - riqueza;
  - poder hermético;
  - influência jurídica;
  - governança;
  - aliança.
- Implementar recompensas cosméticas:
  - títulos;
  - brasões;
  - molduras;
  - decoração visual.
- Não implementar pagamento real nesta fase.
- Garantir que recompensas não vendam poder competitivo.

Testes:
- Unitários de pontuação.
- Integração de encerramento de temporada.
- E2E de ranking visível.
- `npm run validate:all`

Critério de saída:
- Temporada começa, termina e concede recompensas cosméticas.

## Fase 12 — Campanhas Regionais E Conteúdo Avançado

Subagentes:
- `Campaigns`: eventos regionais.
- `Content`: dados narrativos.
- `QA`: simulação longa.

Tarefas:
- Implementar campanhas sazonais:
  - tema;
  - duração;
  - objetivo regional;
  - recompensas;
  - consequências.
- Adicionar eventos regionais multiplayer.
- Expandir conteúdo:
  - fontes;
  - crises;
  - disputas;
  - NPCs;
  - feiras;
  - livros;
  - itens.
- Simular campanhas longas com múltiplos jogadores mockados.

Testes:
- `npm run simulate`
- Teste de 100+ estações multiplayer mockadas.
- `npm run validate:all`

Critério de saída:
- O jogo suporta campanhas persistentes com consequência regional.

## Fase 13 — Hardening Final E Release Candidate

Subagentes:
- `QA Full`: validação total.
- `Security`: regras Firestore e abuso.
- `Docs`: documentação final.
- `Integrador`: fechamento.

Tarefas:
- Revisar regressões em single-player.
- Revisar rotas e telas.
- Revisar regras Firestore.
- Revisar performance de listas regionais.
- Revisar PWA/mobile.
- Atualizar:
  - README;
  - GDD;
  - `estado_agente.md`;
  - relatório final de validação.
- Rodar suíte completa:
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:unit`
  - `npm run test:integration`
  - `npm run test:firebase`
  - `npm run build`
  - `npm run audit:routes`
  - `npm run audit:content`
  - `npm run audit:pwa`
  - `npm run audit:firebase`
  - `npm run simulate`
  - `npm run test:e2e`
  - `npm run validate:all`

Critério de saída:
- Nenhuma falha bloqueante.
- `estado_agente.md` contém histórico completo.
- Projeto pronto para beta funcional do GDD inteiro em arquitetura client-side.

## Divisão Padrão De Subagentes

- `Integrador Principal`: nunca faz grandes implementações paralelas; revisa, resolve conflitos, roda testes e atualiza estado.
- `QA`: dono dos testes, simulações, auditorias e regressões.
- `Docs`: dono de GDD, README e `estado_agente.md`.
- `Data Model`: dono de tipos, contratos e migrations.
- `Frontend`: dono de telas e navegação.
- `Game Systems`: dono de regras de estação, economia, fontes, certâmen, tribunal e campanhas.
- `Firestore`: dono de serviços Firebase e regras.
- `Balance`: dono de números, custos, limites e anti-abuso.

Regra de paralelismo:
- Subagentes podem trabalhar em paralelo apenas quando os arquivos não se sobrepõem.
- Quando houver dependência de tipos compartilhados, `Data Model` trabalha primeiro, depois os demais.
- `Integrador Principal` é o único autorizado a consolidar mudanças concorrentes.

## Formato De Registro Em estado_agente.md

Adicionar ao fim do arquivo, por fase:

```md
---

# Execução Arkanus — Fase X: Nome

## Início
Data:
Branch:
Git status inicial:
Objetivo:
Subagentes:
Arquivos planejados:

## Plano da fase
- ...

## Alterações realizadas
- ...

## Testes executados
- [ ] npm run typecheck
- [ ] npm run lint
- [ ] npm run test:unit
- [ ] npm run test:integration
- [ ] npm run test:firebase
- [ ] npm run build
- [ ] npm run simulate
- [ ] npm run test:e2e
- [ ] npm run validate:all

## Resultado
Status:
Falhas:
Correções:
Pendências:
Próxima fase:
```

## Assumptions E Defaults

- Escopo escolhido: GDD inteiro.
- Backend escolhido: Firestore client-side, sem Cloud Functions neste ciclo.
- `estado_agente.md`: diário incremental, sem apagar histórico.
- Multiplayer resultante: funcional para beta/protótipo, não competitivo com segurança autoritativa total.
- Monetização: apenas cosméticos e estrutura de dados/UI; sem integração real de pagamento.
- Testes são gates obrigatórios; fase com teste quebrado não libera a próxima.
- O single-player existente deve permanecer funcional durante todo o processo.
