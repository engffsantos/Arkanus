#!/bin/bash
# Teste de conectividade do Frontend e Auth

echo "Iniciando verificação do sistema..."

# Verifica se os envs do firebase estão configurados
if [ -f "../firebase-applet-config.json" ]; then
    echo "[OK] Configurações do Firebase encontradas."
else
    echo "[ERRO] Configurações do Firebase ausentes."
fi

# Verifica regras
echo "Verificando se regras Firestore existem..."
if [ -f "../firestore.rules" ]; then
    echo "[OK] Regras encontradas."
else
    echo "[ERRO] Regras ausentes."
fi

echo "Verificação concluída."
