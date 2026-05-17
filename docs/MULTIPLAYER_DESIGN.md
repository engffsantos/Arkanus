# Multiplayer Assíncrono Sazonal

O multiplayer ideal não seria em tempo real tipo batalha/arena. Para este jogo, o melhor formato seria multiplayer assíncrono por estações, porque a base do projeto já é um jogo de estratégia sazonal: cada estação funciona como turno, com escolha de atividade, alocação de recursos, resolução mecânica e atualização da soberania.

## Conceito geral

Cada jogador controlaria uma Soberania Hermética própria em uma mesma região medieval-fantástica.

Exemplo:
- Jogador A → Soberania da Torre Cinzenta
- Jogador B → Soberania do Vale Rubro
- Jogador C → Soberania do Mosteiro Oculto
- Jogador D → Soberania da Ponte de Prata

Todos disputam influência, recursos mágicos, rotas comerciais, livros, fontes de vis, territórios, reputação e poder político.

O foco continuaria sendo: Gestão, Diplomacia, Comércio, Tribunais, Intriga, Certâmen, Expansão territorial e Conflitos regulados.

Não seria um jogo de “destruir a base do outro”. O próprio conceito original já aponta que o jogo não deve depender de combate direto constante, mas de gestão, política, economia, produção de conhecimento e disputas jurídicas/mágicas.

## Modelo principal: multiplayer assíncrono sazonal

### Como funcionaria

Cada rodada global representa uma estação:
Primavera → Verão → Outono → Inverno → Primavera do Ano Seguinte

Durante cada estação, cada jogador escolhe sua ação principal. Depois que todos jogam — ou quando o prazo acaba — o servidor resolve a estação.

1. Todos escolhem suas ações
2. Todos alocam recursos
3. O servidor cruza conflitos
4. A estação é resolvida
5. Cada jogador recebe seu relatório
6. Abre a próxima estação

### Duração dos turnos

1. Liga rápida
   1 estação = 12 horas | 1 ano = 2 dias (Boa para testes e eventos curtos).
2. Liga padrão
   1 estação = 24 horas | 1 ano = 4 dias (Boa para mobile).
3. Liga lenta/narrativa
   1 estação = 48 ou 72 horas | 1 ano = 8 a 12 dias (Boa para jogadores estratégicos).

## Tipos de multiplayer

1. Mapa regional competitivo: O modo principal. Vários jogadores ocupam uma região com fontes de vis, vilas, tribunais, tentando ampliar sua influência.
2. Cooperativo na mesma soberania: Vários jogadores governam a mesma aliança, cada um com um papel (Arquimago, Senescal, Diplomata, Bibliotecário, Guardião, Mercador).
3. Tribunal multiplayer: Assembleia periódica entre jogadores para abrir acusações, defender-se, votar punições e legalizar tratados.
4. Certâmen PvP: O "duelo" controlado entre jogadores por motivos de honra, fonte de vis ou disputa legal.

## O que os jogadores disputariam

1. Fontes de vis: O recurso mais importante. Explorar, reivindicar, roubar ou levar ao tribunal.
2. Livros e conhecimento: Vender cópias, trocar, licenciar leitura, roubar manuscritos.
3. Rotas comerciais: Disputar feiras, guildas e comércio regional.
4. Influência política: Ganhar influência com Nobreza, Igreja, Guildas, Camponeses, Tribunais, etc.

## Sistema de ações multiplayer

- Diplomacia: Propor aliança, pactos de não agressão.
- Comércio: Vender vis, comprar livro.
- Política: Abrir caso no Tribunal, apoiar acusação.
- Conflito: Desafiar para Certâmen.
- Intriga: Espionar soberania rival, sabotar rotas.
- Território: Reivindicar fonte de vis.
- Religião: Denunciar magia perigosa.
- Economia: Monopólios e projetos conjuntos.

## Regras de convivência

1. Nada de destruição total fácil. Pode-se prejudicar o oponente, mas não apagá-lo.
2. Guerra aberta é rara e severamente punida pelo Tribunal/Igreja.
3. Jogador inativo entra em "Regência", tomando ações defensivas automáticas.

## Roadmap de Implementação (Fases)

- **Fase 1**: Single player sólido (Sistemas de estações, ações, recursos, etc).
- **Fase 2**: Multiplayer assíncrono simples (Login, mapa, rodadas, ações simultâneas).
- **Fase 3**: Diplomacia e comércio (Tratados, troca de vis/livros).
- **Fase 4**: Tribunal e Certâmen (Votações, duelos PvP, reputação).
- **Fase 5**: Intriga e política avançada (Espionagem, pactos secretos).