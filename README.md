# Mission Control — Proyecto Canónico

**Fuente de verdad oficial:** `/home/ubuntu/susania-platform`

Desde el **2026-03-25**, este proyecto queda definido como la versión oficial y única de **Mission Control**.

## Decisión
- `susania-platform` = proyecto moderno y canónico
- `/home/ubuntu/mission-control` ahora es un **symlink** hacia este proyecto para mantener compatibilidad mental/rutas
- El proyecto legacy anterior fue archivado en:
  - `/home/ubuntu/.openclaw/workspace/archive/mission-control-legacy-2026-03-25`
  - `/home/ubuntu/.openclaw/workspace/archive/mission-control-temp-legacy-2026-03-25`

## Qué hacer a partir de ahora
Trabajar **solo aquí**:
- frontend React/Vite/TypeScript
- bridge en `vps-bridge/`
- builds en `dist/`

## Qué NO hacer
- No retomar el Mission Control legacy en HTML/CSS/JS plano
- No crear otra variante paralela del dashboard
- No dividir de nuevo el producto entre varias carpetas

## Objetivo
Consolidar un solo Mission Control potente, privado y moderno para Susan / Boss.
