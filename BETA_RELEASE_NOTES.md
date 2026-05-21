# Arkanus — Notas de Lançamento (v1.0.0-beta.1)

Temos o orgulho de apresentar a versão **1.0.0-beta.1** do Arkanus, marcando a transição de um protótipo técnico para um **Beta jogável e validável**. 

## O que testar prioritariamente
- **Onboarding e Tutorial**: Verifique se a introdução e as metas da primeira missão guiam você claramente nos primeiros 4 turnos.
- **Relatório de Estação**: Avalie se o novo modal de fechamento sazonal deixa evidentes seus gastos, lucros e o impacto real das suas ações (formato antes/depois).
- **Conselho de Soberania**: Siga as recomendações dinâmicas dadas pelo Conselho Arcano no painel principal e veja se elas ajudam a evitar crises financeiras ou de insurreição camponesa.
- **Persistência**: Teste salvar localmente, na nuvem (Firestore), exportar como JSON e reimportar o save em um novo navegador ou aba anônima.
- **Mobile/PWA**: Instale o Arkanus em seu dispositivo Android ou iOS a partir do navegador e verifique a usabilidade da navegação inferior simplificada.

## O que mudou em relação ao RC técnico
1. **Layout Dinâmico**: O painel esquerdo do Dashboard agora exibe a renda real, gastos, lealdade e saúde pública dinamicamente do seu estado de jogo.
2. **Defesas na Importação**: O importador de saves agora verifica a versão e os dados de integridade, prevenindo falhas de crash e gerando um backup de segurança na memória local caso precise restaurar.
3. **Novo Fluxo de Fim de Estação**: Adicionado um pergaminho visual premium consolidando todas as mudanças de recursos e previsões para a próxima temporada de forma legível.
