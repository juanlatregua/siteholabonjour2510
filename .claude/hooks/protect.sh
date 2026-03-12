#!/bin/bash
# Hook: protect — Advertencia antes de modificar archivos protegidos
# Requiere confirmación explícita para rutas sensibles

FILE="$1"

PROTECTED=false
REASON=""

if [[ "$FILE" == *"app/api/auth/"* ]]; then
  PROTECTED=true
  REASON="Sistema de autenticación (NextAuth). Cambios pueden romper login/sesiones."
fi

if [[ "$FILE" == *"app/api/payment"* || "$FILE" == *"app/api/webhook"* ]]; then
  PROTECTED=true
  REASON="Sistema de pagos/webhooks. Cambios pueden afectar cobros en producción."
fi

if [[ "$FILE" == *"prisma/migrations/"* ]]; then
  PROTECTED=true
  REASON="Migraciones de base de datos. NUNCA editar migraciones ya aplicadas."
fi

if [ "$PROTECTED" = true ]; then
  echo ""
  echo "=========================================="
  echo "  ARCHIVO PROTEGIDO"
  echo "=========================================="
  echo "  Archivo: $FILE"
  echo "  Razón:   $REASON"
  echo "=========================================="
  echo ""
  read -p "¿Confirmas que quieres modificar este archivo? (s/N): " CONFIRM
  if [[ "$CONFIRM" != "s" && "$CONFIRM" != "S" ]]; then
    echo "Modificación cancelada."
    exit 1
  fi
fi
