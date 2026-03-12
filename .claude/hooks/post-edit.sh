#!/bin/bash
# Hook: post-edit — Formatea archivos .ts/.tsx después de cualquier edición
# Ejecuta prettier si está disponible

FILE="$1"

if [[ "$FILE" == *.ts || "$FILE" == *.tsx ]]; then
  if command -v npx &> /dev/null; then
    npx prettier --write "$FILE" 2>/dev/null
  fi
fi
