# PROMPT RECURSIVO — VALIDAÇÃO DE TELAS E CONTEÚDOS DO ARKANUS

Você é o QA Architect e Game Content Auditor do projeto Arkanus.

Sua missão é validar todas as telas, rotas, conteúdos, ações visíveis, textos, dados de gameplay e integração básica entre UI e GameState.

Nesta etapa, NÃO refatore ainda o Firebase, NÃO reestruture o dispatcher e NÃO faça hardening profundo. O foco é validar se o jogo, como está agora, possui todas as telas e conteúdos necessários para uma versão jogável e se essas telas não estão quebradas, vazias, desconectadas ou inconsistentes.

Trabalhe de forma recursiva:

AUDITAR → TESTAR → CORRIGIR → REVALIDAR → DOCUMENTAR → REPETIR

Só pare quando todas as telas e conteúdos estiverem validados.

---

# 1. Objetivo principal

Validar:

- todas as telas principais;
- todas as rotas;
- todos os links da sidebar;
- todos os conteúdos mínimos de jogo;
- todos os botões principais;
- todos os textos do Codex;
- todas as Configurações;
- todos os painéis de sistema;
- todos os dados usados por telas;
- todos os fallbacks para estado vazio;
- todos os conteúdos mínimos exigidos para beta;
- responsividade desktop/mobile;
- ausência de crash visual;
- ausência de erro de console;
- integração mínima com GameContext;
- build final da página web.

---

# 2. Comandos base

Antes de editar qualquer coisa, execute:

```bash
npm install
npm run typecheck
npm run lint
npm run build
npm run audit:routes
npm run audit:content
npm run simulate

Se E2E estiver configurado e funcional:

npm run test:e2e

Se houver erro, corrija, rode o comando que falhou novamente e só depois continue.

3. Criar relatório de validação

Crie ou atualize:

SCREEN_CONTENT_VALIDATION_REPORT.md

Com esta estrutura:

# Arkanus — Relatório de Validação de Telas e Conteúdos

## Data
## Branch
## Comandos executados
## Resultado geral

## Telas validadas
| Tela | Rota | Status | Problemas | Correções |
|---|---|---|---|---|

## Conteúdos validados
| Conteúdo | Mínimo esperado | Encontrado | Status |
|---|---:|---:|---|

## Problemas encontrados
## Correções aplicadas
## Pendências
## Riscos
## Conclusão

Não marque tela como validada se ela apenas renderiza, mas não possui conteúdo útil ou está desconectada do estado real.

4. Validar estrutura de rotas e sidebar

Verifique se todas as telas estão acessíveis por rota, sidebar ou navegação interna.

Telas obrigatórias
Login
Portal
Criação de Soberania
Dashboard
Ações da Estação
Magus / Ficha do Magus
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
Checklist por tela

Para cada tela, validar:

[ ] Arquivo existe.
[ ] Está importado corretamente.
[ ] Está acessível pela navegação.
[ ] Renderiza sem crash.
[ ] Tem título claro.
[ ] Tem conteúdo não vazio.
[ ] Usa GameContext quando aplicável.
[ ] Não depende de dados undefined.
[ ] Usa fallback para arrays vazios.
[ ] Usa fallback para objetos ausentes.
[ ] Tem pelo menos uma ação ou informação útil.
[ ] Não mostra texto placeholder indevido.
[ ] Não contém termos inconsistentes.
[ ] Não gera erro no console.
[ ] Funciona em desktop.
[ ] Funciona em mobile.

Se uma tela estiver ausente, crie uma versão funcional mínima.

Se uma tela estiver vazia, preencha com conteúdo real do sistema correspondente.

Se uma tela quebrar por undefined, adicione fallback seguro.

Exemplos:

const books = state.library?.books ?? [];
const events = state.events ?? [];
const caravans = state.commerce?.caravans ?? [];
5. Validar tela por tela
5.1. LoginScreen

Validar:

[ ] Mostra nome Arkanus.
[ ] Explica o jogo em uma frase.
[ ] Possui botão Entrar com Google.
[ ] Mostra estado de carregamento.
[ ] Mostra erro de autenticação se houver.
[ ] Não deixa acessar jogo sem autenticação, salvo modo teste.

Conteúdo esperado:

Arkanus
Jogo de estratégia hermética por estações.
Entrar com Google
5.2. PortalScreen

Validar:

[ ] Mostra usuário logado.
[ ] Mostra campanha existente.
[ ] Permite continuar campanha.
[ ] Permite criar nova campanha.
[ ] Mostra último save.
[ ] Mostra status da nuvem.
[ ] Não quebra se não houver campanha.

Fallback obrigatório:

Nenhuma campanha encontrada.
Crie uma nova Soberania para começar.
5.3. CreateSovereigntyScreen

Validar:

[ ] Campo nome da Soberania.
[ ] Campo nome do Magus.
[ ] Escolha de arquétipo.
[ ] Escolha de dificuldade, se existir.
[ ] Explicação dos bônus iniciais.
[ ] Botão criar campanha.
[ ] Validação de campos vazios.
[ ] Gera GameState inicial válido.

Arquétipos mínimos:

Enclave Arcano
Feudo Comercial
Vila Sacra
Soberania Rural
Torre Laboratorial
Domínio Político
5.4. DashboardScreen

Validar:

[ ] Mostra estação e ano.
[ ] Mostra prata.
[ ] Mostra essência/vis.
[ ] Mostra lealdade.
[ ] Mostra população.
[ ] Mostra saúde.
[ ] Mostra segurança.
[ ] Mostra auras.
[ ] Mostra ação primária atual.
[ ] Mostra últimos eventos.
[ ] Mostra botão para avançar estação.

Deve responder:

O jogador entende o estado geral da Soberania em menos de 10 segundos?
5.5. ActionsScreen

Validar:

[ ] Lista ações primárias.
[ ] Explica custo.
[ ] Explica efeito.
[ ] Explica risco.
[ ] Bloqueia múltiplas ações primárias.
[ ] Permite cancelar/substituir ação.
[ ] Mostra previsão de impacto.

Ações mínimas:

Laboratório
Estudo
Escrita
Governança
Diplomacia
Comércio
Conflito
Saúde especial
Foral especial
Guilda especial
5.6. MagusScreen

Validar:

[ ] Mostra identificação.
[ ] Nome.
[ ] Casa/Tradição.
[ ] Idade.
[ ] Warping/Distorção.
[ ] Características.
[ ] Artes.
[ ] Habilidades.
[ ] Virtudes.
[ ] Falhas.
[ ] Cálculos derivados.

Características:

Inteligência
Comunicação
Percepção
Presença
Força
Vigor
Destreza
Rapidez

Artes:

Creo
Intellego
Muto
Perdo
Rego
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

Cálculos visíveis:

Total de Laboratório
Qualidade de Escrita
Produção por Estação
Poder de Duelo
Potencial de Crise
5.7. LaboratoryScreen

Validar:

[ ] Mostra projetos ativos.
[ ] Mostra projetos concluídos.
[ ] Mostra qualidade do laboratório.
[ ] Mostra segurança do laboratório.
[ ] Mostra cálculo de laboratório.
[ ] Permite iniciar projeto.
[ ] Permite pausar/retomar.
[ ] Permite aplicar essência.
[ ] Mostra progresso por estação.
[ ] Não quebra se não houver projeto.

Projetos mínimos no conteúdo:

Pesquisa Arcana
Item Encantado
Poção
Melhoria de Laboratório
Estabilização de Aura
Investigação de Fonte
5.8. LibraryScreen

Validar:

[ ] Lista livros.
[ ] Mostra tipo.
[ ] Mostra assunto.
[ ] Mostra nível.
[ ] Mostra qualidade.
[ ] Mostra autor.
[ ] Permite leitura.
[ ] Permite transcrição.
[ ] Não quebra se books.length for 0.

Tipos mínimos:

Tomo Maior
Tratado Menor
Grimório
Texto Mundano
Crônica
Registro de Foral
5.9. WritingScreen

Validar:

[ ] Permite escrever Tomo Maior.
[ ] Permite escrever Tratado Menor.
[ ] Mostra fórmula de qualidade.
[ ] Mostra bônus de escriba.
[ ] Mostra bônus de encadernador.
[ ] Mostra bônus de iluminador.
[ ] Mostra material ressonante.
[ ] Adiciona livro à biblioteca.

Fórmulas visíveis:

Qualidade Base = Comunicação + 3
Produção por Estação = Comunicação + Idioma
5.10. GovernanceScreen

Validar:

[ ] Mostra lealdade.
[ ] Mostra população.
[ ] Mostra saúde pública.
[ ] Mostra segurança.
[ ] Mostra renda.
[ ] Mostra despesas.
[ ] Mostra instabilidade.
[ ] Possui políticas administrativas.

Políticas mínimas:

Administrar Feudo
Investir em Saúde
Reforçar Segurança
Ajustar Impostos
Distribuir Alimentos
Investir em Infraestrutura
Reduzir Despesas
Contratar Guardas
5.11. MapScreen

Validar:

[ ] Mostra locais.
[ ] Locais têm nome.
[ ] Locais têm tipo.
[ ] Locais têm risco.
[ ] Locais têm produção.
[ ] Locais têm aura.
[ ] Locais são clicáveis ou inspecionáveis.

Locais mínimos:

Castelo
Vila
Capela
Campos Agrícolas
Oficinas
Guildhall
Bosque
Ruínas
Fonte Arcana
Estrada Comercial
5.12. HealthScreen

Validar:

[ ] Mostra saúde pública.
[ ] Mostra risco epidêmico.
[ ] Mostra humor dominante.
[ ] Mostra calor.
[ ] Mostra frio.
[ ] Mostra secura.
[ ] Mostra umidade.
[ ] Mostra médicos.
[ ] Mostra apotecários.
[ ] Possui ações sanitárias.

Humores:

Primavera → Sangue → Quente e Úmido
Verão → Cólera → Quente e Seco
Outono → Melancolia → Frio e Seco
Inverno → Fleuma → Frio e Úmido

Ações mínimas:

Contratar Médico
Contratar Apotecário
Preparar Profilaxia
Isolar Doentes
Ajustar Dieta
Regular Repouso
Purificar Água
5.13. ChartersScreen

Validar:

[ ] Mostra tipo de foral.
[ ] Mostra cidadãos.
[ ] Mostra elegíveis.
[ ] Mostra conexão simpática.
[ ] Mostra aura associada.
[ ] Mostra pressão religiosa.
[ ] Mostra corrupção.
[ ] Possui ação destrutiva com confirmação.

Ações mínimas:

Conceder Cidadania
Revisar Foral
Extrair Essência do Foral
Investigar Corrupção
Mitigar Aura

Ação destrutiva:

Extrair Essência do Foral deve:
- exigir confirmação;
- dar recurso;
- destruir conexão;
- não poder repetir;
- gerar log.
5.14. GuildsScreen

Validar:

[ ] Lista guildas.
[ ] Lista artesãos.
[ ] Mostra qualidade.
[ ] Mostra produção.
[ ] Mostra estoque.
[ ] Permite produzir bens.
[ ] Permite contratar artesão.

Guildas mínimas:

Escribas
Encadernadores
Iluminadores
Ferreiros
Carpinteiros
Pedreiros
Mercadores
Apotecários
Tecelões
Armeiros
5.15. CommerceScreen

Validar:

[ ] Mostra rotas.
[ ] Mostra feiras.
[ ] Mostra caravanas.
[ ] Mostra estoque.
[ ] Mostra risco.
[ ] Mostra lucro previsto.
[ ] Permite enviar caravana.
[ ] Mostra caravanas ativas.
[ ] Mostra retorno de caravanas.

Feiras mínimas:

Feira Local
Champagne
Flandres
Inglaterra
Mercado Regional
5.16. DiplomacyScreen

Validar:

[ ] Lista facções.
[ ] Mostra relação.
[ ] Mostra confiança.
[ ] Mostra medo.
[ ] Mostra influência.
[ ] Mostra exigências.
[ ] Permite enviar emissário.
[ ] Permite oferecer prata.

Facções mínimas:

Nobre local
Igreja local
Guildas urbanas
População
Magos rivais
Mercadores
Suserano regional
5.17. ConflictsScreen

Validar:

[ ] Lista conflitos ativos.
[ ] Lista conflitos resolvidos.
[ ] Mostra tipo.
[ ] Mostra oponente.
[ ] Mostra severidade.
[ ] Mostra prazo.
[ ] Mostra preparação.
[ ] Permite preparar defesa.
[ ] Permite resolver tribunal.
[ ] Mostra Grande Tribunal se regra existir.

Tipos mínimos:

Fonte Arcana
Territorial
Intriga Nobre
Religioso
Econômico
Mágico Direto
Guerra Aberta
5.18. ReportsScreen

Validar:

[ ] Relatório econômico.
[ ] Relatório populacional.
[ ] Relatório sanitário.
[ ] Relatório arcano.
[ ] Relatório diplomático.
[ ] Relatório de conflitos.
[ ] Risco geral.
[ ] Diagnóstico do conselho.
[ ] Tendências.

O relatório deve refletir o estado real, não valores fixos.

5.19. CodexScreen

Validar conteúdo obrigatório:

[ ] Introdução.
[ ] Como jogar.
[ ] Estações.
[ ] Ações primárias.
[ ] Recursos.
[ ] Magus.
[ ] Laboratório.
[ ] Biblioteca.
[ ] Escrita.
[ ] Governança.
[ ] Saúde e Humores.
[ ] Forais e Auras.
[ ] Guildas.
[ ] Comércio.
[ ] Diplomacia.
[ ] Conflitos e Tribunais.
[ ] Vitória, Derrota e Sandbox.
[ ] Glossário.
[ ] Fórmulas.

Verificar se o Codex explica:

Uma estação = uma ação primária.
Avançar estação resolve sistemas pendentes.
Caravanas retornam depois de estações.
Laboratório usa ficha do Magus.
Escrita usa Comunicação + 3.
Saúde usa humores.
Tribunais resolvem conflitos.
5.20. SettingsScreen

Validar blocos:

[ ] Conta.
[ ] Campanha.
[ ] Save e Nuvem.
[ ] Interface.
[ ] Áudio e Feedback.
[ ] PWA.
[ ] Dados.
[ ] Diagnóstico.
[ ] Créditos.

Ações mínimas:

Logout seguro
Salvar agora
Resetar campanha
Exportar save
Importar save
Ver status da nuvem
Ver versão do app
Ver versão do save
Executar diagnóstico

Ações destrutivas devem exigir confirmação.

6. Validar conteúdo mínimo do jogo

Execute:

npm run audit:content

Se o script não verificar todos os mínimos abaixo, atualize scripts/auditContent.ts.

Conteúdo mínimo esperado:

60 eventos
20 livros
15 projetos de laboratório
10 locais de mapa
8 guildas
12 artesãos
7 facções
5 rotas comerciais
5 feiras
10 conflitos
8 políticas de governança
8 ações de saúde
6 condições de vitória/derrota

Se faltar conteúdo, adicionar em:

src/data/events.ts
src/data/books.ts
src/data/labProjects.ts
src/data/locations.ts
src/data/guilds.ts
src/data/artisans.ts
src/data/factions.ts
src/data/trade.ts
src/data/conflicts.ts
src/data/governancePolicies.ts
src/data/healthActions.ts
src/data/victoryConditions.ts
src/data/codex.ts
7. Validar rotas

Execute:

npm run audit:routes

Se o script não validar todas as telas, atualize scripts/auditRoutes.ts.

A auditoria deve falhar se:

uma tela obrigatória não existir;
uma tela obrigatória não estiver importada;
uma tela obrigatória não estiver na sidebar;
uma rota apontar para componente inexistente;
Codex ou Configurações não forem acessíveis;
Forais, Comércio ou Guildas estiverem comentadas;
MagusScreen estiver ausente.
8. Validar E2E da página web

Se Playwright estiver configurado, criar/atualizar:

tests/e2e/screens.spec.ts
tests/e2e/content.spec.ts
tests/e2e/navigation.spec.ts
tests/e2e/mobile.spec.ts
E2E: navegação

Testar:

abrir app;
entrar em modo teste ou autenticação fake;
percorrer todas as telas da sidebar;
confirmar título de cada tela;
confirmar ausência de erro no console.
E2E: conteúdo

Validar que cada tela tem pelo menos:

título;
descrição;
dados principais;
ação ou informação funcional;
nenhum texto "TODO";
nenhum texto "placeholder";
nenhum erro visual crítico.
E2E: mobile

Validar:

layout mobile abre;
navegação mobile funciona;
botões principais são acessíveis;
não existe scroll horizontal indevido;
conteúdo principal não fica cortado.
9. Validar console e erros de runtime

Durante E2E, falhar se aparecer:

Cannot read properties of undefined
undefined is not iterable
Maximum update depth exceeded
Hydration failed
Firebase permission denied sem tratamento
NaN
[object Object] visível na UI

Adicionar monitor de console no Playwright.

10. Validar fallback de estado vazio

Criar teste ou checklist manual para abrir cada tela com:

sem livros;
sem caravanas;
sem projetos;
sem conflitos;
sem eventos;
sem guildas;
sem facções;
sem locais;
sem campanha criada.

Nenhuma tela pode quebrar.

Cada tela deve mostrar empty state:

Nenhum livro registrado.
Nenhuma caravana ativa.
Nenhum conflito aberto.
Nenhum projeto em andamento.
Nenhum evento recente.
11. Validar integração básica GameState → Tela

Para cada tela, confirmar:

[ ] lê dados do GameState;
[ ] não usa apenas mock fixo;
[ ] altera GameState quando há botão mecânico;
[ ] mudança aparece no relatório ou log;
[ ] mudança persiste após reload, quando aplicável.

Se uma tela usa mock, documentar e substituir por dado real.

12. Validar simulação de conteúdo

Execute:

npm run simulate

A simulação deve confirmar:

20 estações ou mais;
campanha não quebra;
calendário avança;
eventos aparecem;
caravanas retornam;
conflitos não ficam travados;
recursos não viram NaN;
população não fica negativa;
lealdade permanece entre 0 e 100;
saúde permanece entre 0 e 100.

Se falhar, corrigir conteúdo ou regras.

13. Validar build final da página

Executar:

npm run build
npm run preview

Abrir preview e validar:

Login/Portal
Dashboard
Sidebar
Todas as telas
Codex
Configurações
PWA manifest
Sem erro de console
14. Atualizar README

Adicionar seção:

## Validação de Telas e Conteúdos

### Validar rotas

```bash
npm run audit:routes
Validar conteúdo
npm run audit:content
Rodar simulação
npm run simulate
Rodar E2E
npm run test:e2e
Validação completa
npm run validate:all

---

# 15. Critério final de aprovação

Só declarar a validação concluída se:

```txt
[ ] npm run typecheck passa.
[ ] npm run lint passa.
[ ] npm run build passa.
[ ] npm run audit:routes passa.
[ ] npm run audit:content passa.
[ ] npm run simulate passa.
[ ] npm run test:e2e passa, se configurado.
[ ] Todas as telas obrigatórias existem.
[ ] Todas as telas estão navegáveis.
[ ] Todas as telas renderizam sem crash.
[ ] Todas as telas têm conteúdo real.
[ ] Todas as telas têm fallback para estado vazio.
[ ] Todas as telas relevantes leem GameState.
[ ] Todas as telas relevantes alteram GameState.
[ ] Codex explica todas as mecânicas.
[ ] Configurações cobrem conta/save/PWA/dados.
[ ] Conteúdo mínimo existe.
[ ] Nenhum erro crítico aparece no console.
[ ] Mobile funciona.
[ ] Relatório SCREEN_CONTENT_VALIDATION_REPORT.md foi atualizado.
16. Mensagem final esperada

Ao terminar, responda:

# ARKANUS — VALIDAÇÃO DE TELAS E CONTEÚDOS

## Status
Concluído / Não concluído

## Comandos executados
...

## Telas validadas
...

## Conteúdos validados
...

## Problemas encontrados
...

## Correções aplicadas
...

## Pendências
...

## Conclusão
...

Só usar:

VALIDAÇÃO DE TELAS E CONTEÚDOS APROVADA.

se todos os critérios passarem.