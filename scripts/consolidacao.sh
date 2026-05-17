#!/bin/bash
# Script de simulacao de testes de consolidacao

echo "Simulando consolidação do bundle React e PWA..."
cd ..
npm run build
if [ $? -eq 0 ]; then
    echo "[OK] Build gerado com sucesso na pasta dist/"
else
    echo "[ERRO] Falha no build."
    exit 1
fi

echo "Verificando service worker do PWA..."
if [ -f "dist/sw.js" ] || [ -f "dist/registerSW.js" ]; then
    echo "[OK] Service Worker do PWA encontrado."
else
    echo "[AVISO] Service Worker padrão não gerado, verifique configuração PWA."
fi

echo "Consolidação concluída."
