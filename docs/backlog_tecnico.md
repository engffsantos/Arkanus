# Arkanus — Backlog Técnico (Fase 1)

> Gerado em: 2026-05-18  
> Fonte: `docs/GDD_v2_Soberania_Hermetica_com_Multiplayer.md` (1690 linhas)  
> Método: Leitura integral do GDD e comparação com código existente em `src/`

---

## 1. Estrutura conceitual do GDD

O documento GDD (`GDD_v2_Soberania_Hermetica_com_Multiplayer.md`) mistura três conteúdos distintos:

### 1.1 Exemplo narrativo de estação (seções 1–7, linhas 1–207)
- Seção de exemplo de jogo: Primavera Ano I com ação de Governança.
- **Contém `filecite` não resolvido** (linha 3).
- **Status**: Conteúdo de referência/exemplo — não é GDD prescritivo. Não remover; isolar mentalmente.

### 1.2 GDD principal: single-player (seções 28–36, linhas 209–718)
- Visão de produto, fantasia do jogador, gêneros, público, plataforma.
- Sessões mobile, estados principais, ações primárias detalhadas.
- Sistema de eventos, progressão, construções, personagens secundários.

### 1.3 GDD multiplayer (seções 37–49, linhas 761–1576)
- Modos multiplayer, interações, disputas, Tribunal, Certâmen.
- Economia, alianças, ranking, temporadas, balanceamento.
- Arquitetura técnica e MVP recomendado.

### 1.4 Roadmap (seção 50, linhas 1578–1658)
- Fase 1–5 do produto: do protótipo single-player ao jogo de longo prazo.

### 1.5 Resumo de produto (seção 51, linhas 1661–1690)
- Visão das três camadas: single-player, multiplayer assíncrono, temporadas.

---

## 2. Artefatos quebrados identificados

| Arquivo | Linha | Problema |
|---|---|---|
| `GDD_v2_Soberania_Hermetica_com_Multiplayer.md` | 3 | `filecite turn0file0` — referência interna de LLM, não resolúvel |
| `docs/plano_GDD.md` | — | Nenhum `filecite` detectado |

**Decisão**: A referência `filecite` está em seção de exemplo narrativo, não em seção prescritiva. Não bloqueia implementação. Manter documento intacto; anotar aqui.

---

## 3. Matriz GDD → Implementação

### Legenda
- ✅ **Implementado** — existe em código, funcional
- 🔶 **Parcial** — existe mas incompleto ou com bugs
- ❌ **Faltante** — não existe no código
- 🔵 **Adiado** — fora do escopo deste ciclo
- ⚠️ **Risco** — dependência técnica ou design não resolvido

---

### 3.1 Single-player — Core Loop

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| Avançar estação (turno) | ✅ | `GameContext.tsx`, `season/` | Funcional |
| Ações primárias (7 tipos) | ✅ | `ActionsPanel.tsx`, `actionDispatcher.ts` | Funcional |
| Recursos: prata, essência | ✅ | `types/game.ts`, `GameContext` | Completo |
| Recursos: influência, prestígio | 🔶 | `types/game.ts` | Existe no tipo mas sem uso mecânico real |
| Log de eventos da estação | ✅ | `EventLogPanel.tsx`, `events/` | Funcional |
| Salvamento local (localStorage) | ✅ | `GameContext.tsx` | Funcional |
| Salvamento Firebase/Firestore | ✅ | `gameSaveService.ts` | Funcional |
| Migração de saves antigos | ✅ | `saveMigration.ts` | 12kB de migrations |

### 3.2 Single-player — Mago

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| Nome, tradição, idade | ✅ | `MageState` | Implementado |
| Artes: Técnicas (5) | ✅ | `MageState.arts.techniques` | Completo |
| Artes: Formas (10) | ✅ | `MageState.arts.forms` | Completo |
| Características (Int, Com, etc.) | ✅ | `MageState.characteristics` | Completo |
| Habilidades (9 definidas) | ✅ | `MageState.abilities` | Completo |
| Virtudes e Defeitos | 🔶 | `MageState.virtues/flaws` | Tipo existe, sem efeito mecânico real |
| Reputações (5 tipos) | 🔶 | `MageState.reputation` | Tipo existe, sem efeito mecânico real |
| Fadiga sazonal | ❌ | — | GDD seção 30.4. Não implementado |
| Estado físico/mental | 🔶 | `MageState.status` | Tipo existe, sem impacto em resolução |
| Warping (envelhecimento arcano) | 🔶 | `MageState.warping` | Campo existe, sem mecânica |
| Histório do mago | 🔶 | `MageState.history` | Array existe, sem preenchimento automático |

### 3.3 Single-player — Soberania

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| Lealdade (0-100) | ✅ | `CovenantState.loyalty` | Funcional |
| Saúde pública (0-100) | ✅ | `CovenantState.publicHealth` | Funcional |
| Prosperidade (0-100) | ✅ | `CovenantState.prosperity` | Funcional |
| Segurança (0-100) | ✅ | `CovenantState.security` | Funcional |
| Aura Arcana | ✅ | `CovenantState.auraArcana` | Funcional |
| Aura Sacra/Encantada/Abissal | ✅ | `CovenantState` | Implementado |
| Legitimidade | ❌ | — | GDD seção 30.2. Campo não existe |
| Sigilo Hermético | ❌ | — | GDD seção 30.2. Campo não existe |
| Tensão Religiosa | ❌ | — | GDD seção 30.2. Campo não existe |
| Tensão Nobre | ❌ | — | GDD seção 30.2. Campo não existe |
| Tensão Hermética | ❌ | — | GDD seção 30.2. Campo não existe |
| Renda/Despesas por estação | ✅ | `CovenantState.incomePerSeason` | Funcional |

### 3.4 Single-player — Laboratório

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| Total de Laboratório (fórmula) | 🔶 | `LaboratoryScreen.tsx` | Simplificado, não usa todas as variáveis |
| Projetos ativos/pausados | ✅ | `LaboratoryState.activeProjects` | Funcional |
| Projetos completos | ✅ | `LaboratoryState.completedProjects` | Funcional |
| Nível/Qualidade/Segurança do lab | ✅ | `LaboratoryState` | Funcional |
| Subação: Destilar Essência | 🔶 | `LaboratoryScreen` | UI presente, efeito real não resolvido |
| Subação: Criar feitiço/item/poção | 🔶 | `LaboratoryScreen` | Tipo genérico, sem efeitos distintos |
| Subação: Experimento arriscado | ❌ | — | GDD seção 31.1. Não implementado |
| Subação: Criar poção de longevidade | ❌ | — | GDD seção 31.1. Não implementado |
| Modificadores de laboratório | ✅ | `LaboratoryState.modifiers` | Tipo existe |

### 3.5 Single-player — Biblioteca e Estudo

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| Livros: Summa, Tractatus, Grimório | ✅ | `Book`, `LibraryState` | Tipos completos |
| Ler livro (progressão Artes) | 🔶 | `LIBRARY_READ_BOOK` | Ação definida, efeito em Arts parcial |
| Escrever livro | 🔶 | `writing/` | Estrutura existe, sem UI completa |
| Transcrição de livros | 🔶 | `LibraryState.transcriptionProjects` | Tipo existe, sem mecânica |
| Escribas/Encadernadores/Iluminadores | ✅ | `LibraryState` | Campos existem |
| Estudo por fonte mágica | ❌ | — | GDD seção 31.2. Não implementado |
| Correspondência (multiplayer estudo) | ❌ | — | Fase multiplayer |

### 3.6 Single-player — Governança

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| Administrar feudo | ✅ | `GOVERNANCE_*` actions | Funcional |
| Rever impostos | 🔶 | `GOVERNANCE_ADJUST_TAXES` | Definido, efeito parcial |
| Investir em infraestrutura | ❌ | — | GDD seção 31.4. Não implementado |
| Reforçar justiça local | ❌ | — | GDD seção 31.4. Não implementado |
| Organizar estoque alimentar | ❌ | — | GDD seção 31.4. Não implementado |
| Melhorar moradia | ❌ | — | GDD seção 31.4. Não implementado |
| Tela Governança | ✅ | `GovernanceScreen.tsx` | Funcional |

### 3.7 Single-player — Saúde Pública

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| Humores climáticos (4) | ✅ | `HealthState` | Implementado |
| Médicos e Apotecários | ✅ | `HealthState` | Implementado |
| Saneamento | ✅ | `HealthState.sanitation` | Implementado |
| Risco de epidemia | ✅ | `HealthState.epidemicRisk` | Implementado |
| Ações profiláticas | ✅ | `HEALTH_*` actions | Funcional |
| `healthEngine.ts` | ✅ | `services/season/healthEngine.ts` | Funcional |
| Fadiga do mago afeta saúde | ❌ | — | Cruzamento não implementado |

### 3.8 Single-player — Guildas e Artesãos

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| Guildas (tipo, nível, qualidade) | ✅ | `GuildsState`, `GuildsScreen` | Funcional |
| Artesãos contratáveis | 🔶 | `GuildsState.artisans` | Tipo existe, UI parcial |
| Bens manufaturados | 🔶 | `GuildsState.goods` | Tipo existe, sem produção automática |
| Produção sazonal de guildas | 🔶 | `economyEngine.ts` | Simplificado |

### 3.9 Single-player — Comércio

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| Rotas comerciais | ✅ | `CommerceState.routes` | Funcional |
| Caravanas | ✅ | `CommerceState.caravans` | Funcional |
| Feiras | ✅ | `CommerceState.fairs` | Funcional |
| Enviar caravana | ✅ | `COMMERCE_SEND_CARAVAN` | Funcional |
| Tela Comércio | ✅ | `CommerceScreen.tsx` | Funcional |
| Comprar material raro | ❌ | — | GDD seção 31.6. Não implementado |
| Vender livro no mercado | ❌ | — | Conecta com multiplayer |

### 3.10 Single-player — Diplomacia

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| Facções (7 tipos) | ✅ | `DiplomacyState.factions` | Funcional |
| Tratados com facções | ✅ | `DiplomacyState.activeTreaties` | Tipo existe |
| Demandas diplomáticas | ✅ | `DiplomacyState.pendingDemands` | Tipo existe |
| Tela Diplomacia | ✅ | `DiplomaciaScreen.tsx` | Funcional |
| Espionagem de corte rival | ❌ | — | GDD seção 31.5 |
| Mediação de disputas | 🔶 | `ConflictState` | Parcial |

### 3.11 Single-player — Conflitos e Tribunal (single)

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| Conflitos ativos/resolvidos | ✅ | `ConflictState` | Funcional |
| Tipos de conflito (7) | ✅ | `Conflict.type` | Definido |
| Preparação de defesa | ✅ | `CONFLICT_PREPARE_DEFENSE` | Definido |
| Tribunal (resolução) | ✅ | `CONFLICT_RESOLVE_TRIBUNAL` | Definido (single) |
| Tela Conflitos | ✅ | `ConflictsScreen.tsx` | Funcional |
| Certâmen single-player | ❌ | — | GDD seção 42. Não implementado |

### 3.12 Single-player — Eventos

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| Pool de eventos (8 tipos) | ✅ | `eventEngine.ts`, `events/` | 60 eventos |
| Gatilhos por condição | ✅ | `eventEngine.ts` | Funcional |
| Escolhas com consequência | 🔶 | `EVENT_CHOOSE_OPTION` | Estrutura existe, nem todos têm opções reais |
| Eventos climáticos sazonais | ✅ | Incluso no pool | Funcional |
| Eventos mágicos | 🔶 | Incluso no pool | Parcial |

### 3.13 Single-player — Mapa e Território

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| Locais (10 tipos) | ✅ | `TerritoryLocation` | Funcional |
| Investigar local | ✅ | `MAP_INSPECT_LOCATION` | Funcional |
| Investir em local | ✅ | `MAP_INVEST_LOCATION` | Funcional |
| Tela Mapa | ✅ | `MapScreen.tsx` | Funcional |
| Construções (11 tipos GDD) | ❌ | — | GDD seção 34. Não implementado como sistema |
| Melhorias por nível (1-5) | ❌ | — | GDD seção 34.2. Não implementado |
| Jardim Hermético | ❌ | — | GDD seção 34.1 |

### 3.14 Single-player — Personagens Secundários

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| Artesãos (tipo, habilidade) | 🔶 | `Artisan` | Tipo existe, contratação parcial |
| Senescal | ❌ | — | GDD seção 35.1. Não implementado |
| Capitão da Guarda | ❌ | — | GDD seção 35.1 |
| Médico/Apotecário | ✅ | Via HealthState | Funcional |
| Escriba/Encadernador | ✅ | Via LibraryState | Funcional |
| Espião | ❌ | — | GDD seção 35.1 |
| Arauto | ❌ | — | GDD seção 35.1 |
| Aprendiz | ❌ | — | GDD seção 35.1 |
| Lealdade individual de NPCs | ❌ | — | GDD seção 35.3 |

### 3.15 Single-player — Sistema de IA/Facções

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| 7 facções com comportamento | 🔶 | `DiplomacyState.factions` | Dados estáticos, sem IA real |
| Relação/medo/interesse | ❌ | — | GDD seção 36.2. Não implementado |
| Memória de acordos | ❌ | — | GDD seção 36.2 |
| Gatilhos de hostilidade | ❌ | — | GDD seção 36.2 |

---

### 3.16 Multiplayer — Core

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| Regiões (20-60 jogadores) | 🔶 | `Region` em `types/multiplayer.ts` | Tipo existe, sem serviço real |
| PlayerSovereignty (covenant MP) | 🔶 | `PlayerSovereignty` | Tipo existe, sem serviço |
| Ação sazonal (SeasonAction) | 🔶 | `SeasonAction` | Tipo existe, sem serviço |
| Resolução simultânea de estação | ❌ | — | GDD seção 47.4. Não implementado |
| Scheduler client-side | ❌ | — | Fase 3 do plano de execução |

### 3.17 Multiplayer — Economia

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| Account | ❌ | — | GDD seção 47.3. Não implementado |
| MarketOrder | ❌ | — | GDD seção 47.3 |
| Auction | ❌ | — | GDD seção 47.3 |
| Preços dinâmicos | ❌ | — | GDD seção 43.2 |
| Anti-abuso de mercado | ❌ | — | GDD seção 43.4 |

### 3.18 Multiplayer — Diplomacia e Tratados

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| Treaty (MP) | 🔶 | `Treaty` em `multiplayer.ts` | Tipo básico existe |
| DiplomaticMessage | ❌ | — | GDD seção 39.2 |
| Tipos de tratado (6) | 🔶 | `Treaty.type` | Apenas 4 tipos, GDD define 6 |
| Quebra de tratado com penalidade | ❌ | — | GDD seção 39.4 |

### 3.19 Multiplayer — Fontes de Vis

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| SharedVisSource | ❌ | — | GDD seção 47.3 |
| Reivindicação de fonte | ❌ | — | GDD seção 40.2 |
| Fluxo de disputa | ❌ | — | GDD seção 40.3 |
| Resolução: acordo/Tribunal/Certâmen | ❌ | — | GDD seção 40.4 |

### 3.20 Multiplayer — Certâmen

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| CertamenChallenge | ❌ | — | GDD seção 47.3 |
| CertamenResult | ❌ | — | GDD seção 47.3 |
| CertamenDuel (tipo básico) | 🔶 | `CertamenDuel` em `multiplayer.ts` | Tipo existe, sem resolução |
| Fórmula de Certâmen | ❌ | — | GDD seção 42.4 |
| Posturas (5 tipos) | ❌ | — | GDD seção 42.3 |
| Fadiga no Certâmen | ❌ | — | GDD seção 42.4 |

### 3.21 Multiplayer — Tribunal

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| TribunalSession | ❌ | — | GDD seção 47.3 |
| TribunalCase (básico) | 🔶 | `TribunalCase` em `multiplayer.ts` | Tipo básico existe |
| Vote | 🔶 | Incluso em `TribunalCase.votes` | Parcial |
| Evidence | ❌ | — | GDD seção 47.3 |
| Poder de voto calculado | ❌ | — | GDD seção 41.4 |
| Sentenças (7 tipos) | ❌ | — | GDD seção 41.6 |

### 3.22 Multiplayer — Alianças

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| Alliance | ❌ | — | GDD seção 47.3 |
| AllianceMember | ❌ | — | GDD seção 47.3 |
| Cargos internos (7) | ❌ | — | GDD seção 44.2 |
| Tesouro compartilhado | ❌ | — | GDD seção 44.4 |
| Projetos coletivos | ❌ | — | GDD seção 44.3 |

### 3.23 Multiplayer — Ranking e Temporadas

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| LeaderboardEntry | ❌ | — | GDD seção 47.3 |
| SeasonReward | ❌ | — | GDD seção 47.3 |
| Prestígio como métrica principal | 🔶 | `PlayerSovereignty.prestige` | Campo existe, sem fórmula |
| Rankings secundários (6) | ❌ | — | GDD seção 45.2 |
| Recompensas cosméticas | ❌ | — | GDD seção 45.3 |
| Início/encerramento de temporada | ❌ | — | GDD seção 45 |

### 3.24 Multiplayer — Moderação e Notificações

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| Notification | ❌ | — | GDD seção 47.3 |
| ModerationLog | ❌ | — | GDD seção 47.3 |
| Cooldowns anti-assédio | ❌ | — | GDD seção 46.1 |
| Proteção de novatos (7 dias) | ❌ | — | GDD seção 46.2 |

### 3.25 Infra e Segurança

| Sistema GDD | Status | Onde está | Observação |
|---|---|---|---|
| Auth Firebase | ✅ | `AuthContext.tsx` | Funcional |
| Modo teste (mock auth) | ✅ | `AuthContext.tsx` | Funcional |
| Regras Firestore | 🔶 | `firestore.rules` | Existe, precisa cobrir novas coleções |
| PWA / Service Worker | ✅ | `vite-plugin-pwa` | Funcional |
| Servidor autoritativo | ⚠️ | — | Arquitetura escolhida é client-side; risco documentado no plano |

---

## 4. Resumo por fase do plano de execução

| Fase | Conteúdo GDD coberto | Dependência |
|---|---|---|
| **Fase 2** | `Account`, `Region`, `SeasonTick`, `PlayerCovenant`, `Alliance`, `AllianceMember`, `DiplomaticMessage`, `Treaty` (MP), `MarketOrder`, `Auction`, `TribunalSession`, `TribunalCase`, `Vote`, `Evidence`, `CertamenChallenge`, `CertamenResult`, `SharedVisSource`, `Notification`, `ModerationLog`, `LeaderboardEntry`, `SeasonReward` | Sem dependência — tipos puros |
| **Fase 3** | Scheduler client-side, resolução sazonal MP, idempotência, logs públicos/privados | Requer Fase 2 |
| **Fase 4** | UI multiplayer: seleção de região, lobby, painel MP, envio de ação, eventos, ranking, notificações | Requer Fases 2+3 |
| **Fase 5** | Fontes de Vis contestáveis, Certâmen (fórmula, posturas, fadiga, resolução) | Requer Fase 3 |
| **Fase 6** | Tribunal completo: sessões, provas, poder de voto, sentenças, logs auditáveis | Requer Fases 2+3 |
| **Fase 7** | Mercado regional, leilões, preços dinâmicos, anti-abuso | Requer Fases 2+3 |
| **Fase 8** | Diplomacia MP, tratados (6 tipos), quebra, mensagens pré-formatadas | Requer Fase 2 |
| **Fase 9** | Alianças, tesouro, projetos coletivos | Requer Fases 2+8 |
| **Fase 10** | Espionagem, sabotagem, cooldowns, moderação | Requer Fases 2+6 |
| **Fase 11** | Temporadas, ranking completo, recompensas cosméticas | Requer Fases 2+3+todos |
| **Fase 12** | Campanhas regionais, conteúdo adicional (NPCs, fontes, itens) | Requer todas |
| **Fase 13** | Hardening, segurança Firestore, documentação final | Gate final |

---

## 5. Itens single-player pendentes (não cobertos por nenhuma fase MP)

Estes itens do GDD single-player ainda não foram endereçados pelo plano de execução.  
**Devem ser integrados nas fases relevantes ou tratados em sub-tarefas paralelas:**

| Item | GDD | Prioridade |
|---|---|---|
| Fadiga sazonal do mago | Seção 30.4 | Alta — afeta lab, Certâmen, saúde |
| Legitimidade, Sigilo, Tensões | Seção 30.2 | Média — afeta eventos e facções |
| Construções e melhorias (nível 1-5) | Seção 34 | Média — afeta progressão |
| Personagens secundários faltantes | Seção 35 | Baixa — conteúdo expandível |
| IA de facções com comportamento real | Seção 36 | Média — afeta single-player profundo |
| Fórmula de Laboratório completa | Seção 31.1 | Alta — afeta progressão mágica |
| Subações de Governança faltantes | Seção 31.4 | Baixa — expansão de UI |

---

## 6. Ordem de implementação recomendada

```
Fase 2 → Tipos MP completos + Firestore
Fase 3 → Scheduler + Resolução sazonal
Fase 4 → UI multiplayer base
Fase 5 → Vis + Certâmen
Fase 6 → Tribunal
Fase 7 → Mercado
Fase 8 → Diplomacia MP
Fase 9 → Alianças
Fase 10 → Intriga
Fase 11 → Temporadas
Fase 12 → Campanhas
Fase 13 → Hardening
```

Itens single-player pendentes devem ser incluídos **nas fases mais próximas do sistema que os usa**:
- Fadiga → junto com Certâmen (Fase 5)
- Construções → junto com UI multiplayer (Fase 4)
- IA de facções → Fase 12 (campanhas regionais)

---

*Documento gerado na Fase 1 do plano de execução. Atualizar conforme cada fase avança.*
