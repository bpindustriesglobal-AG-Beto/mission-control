# CLAUDE.md — Guía de Trabajo para Agentes de Código

> Lee este archivo COMPLETO antes de tocar cualquier cosa.
> Esto evita que crees carpetas duplicadas, ramas innecesarias o rompas la arquitectura existente.

---

## 🏠 Proyectos del VPS — Rutas Canónicas

### 1. Mission Control (Susania Platform) — PROYECTO PRINCIPAL
```
/home/ubuntu/susania-platform
```
- **Este es el proyecto canónico de Mission Control.**
- `/home/ubuntu/mission-control` es un symlink que apunta aquí. NO crear otra carpeta.
- Repo: `github.com/bpindustriesglobal-AG-Beto/mission-control`
- Branch: `main` (SIEMPRE trabajar en main, NO crear ramas nuevas)
- Stack: React + Vite + TypeScript + TailwindCSS + Framer Motion + Lucide
- Bridge backend: `vps-bridge/server.js` (Node.js + Express + Socket.io)

### 2. OpenGravity — Bot de Telegram / Agente IA
```
/home/ubuntu/opengravity
```
- Repo: `github.com/Ubeto24/opengravity` (cuenta personal de Carlos, NO la de agentes)
- Stack: TypeScript, grammy, Express, Firebase, Playwright
- PM2: proceso `opengravity` (id:2)
- Puerto API: 3000

### 3. Workspace de Susan / OpenClaw
```
/home/ubuntu/.openclaw/workspace
```
- Archivos de identidad, memoria, notas, skills, proyectos archivados
- NO es un proyecto de código para buildear
- NO ejecutar `npm run build` aquí
- Contiene: SOUL.md, MEMORY.md, USER.md, TOOLS.md, ideas-futuro.md, etc.

### 4. Archivos Legacy (NO TOCAR)
```
/home/ubuntu/.openclaw/workspace/archive/mission-control-legacy-2026-03-25
/home/ubuntu/.openclaw/workspace/archive/mission-control-temp-legacy-2026-03-25
```
- Versiones anteriores de Mission Control. Archivadas. No desarrollar aquí.

---

## 📁 Estructura de Mission Control (susania-platform)

```
/home/ubuntu/susania-platform/
├── public/
│   └── assets/                    # Imágenes de Susan (avatar, portraits, mockups)
├── src/
│   ├── config/
│   │   └── runtime.ts             # VITE_APP_MODE (public vs private)
│   ├── hooks/
│   │   └── useSusanBridge.ts      # Hook principal: bridge + ops + events
│   ├── components/
│   │   ├── public/
│   │   │   ├── Home.tsx           # Landing pública (bilingüe ES/EN)
│   │   │   └── Login.tsx          # Login + 2FA
│   │   └── private/
│   │       ├── Dashboard.tsx      # Shell del dashboard (sidebar + topbar + tabs)
│   │       ├── DashboardOverview.tsx  # Overview con telemetría real del VPS
│   │       ├── StrategicCanvas.tsx    # Mapa de arquitectura operativa
│   │       ├── LivePreview.tsx        # Preview embebido del frontend
│   │       ├── AINewsDashboard.tsx    # Panel de noticias IA
│   │       ├── AgentLab.tsx           # Laboratorio de agentes + bridge tester
│   │       ├── KnowledgeBaseTab.tsx   # Knowledge base con búsqueda y tags
│   │       ├── ProjectsControl.tsx    # Control de proyectos con status/prioridad
│   │       └── SettingsControl.tsx    # Ajustes operativos
│   ├── App.tsx                    # Router (público vs privado según modo)
│   ├── main.tsx                   # Entry point React
│   └── index.css                  # CSS base + clases del design system
├── vps-bridge/
│   └── server.js                  # Backend Node.js: bridge + telemetría + webhooks
├── tailwind.config.js             # Design tokens (colores, fuentes, etc.)
├── netlify.toml                   # Config deploy Netlify (modo público)
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## 🎨 Design System

### Fuentes
- **Manrope** → headlines (`font-headline`)
- **Inter** → body (`font-sans`)
- **Space Grotesk** → labels, datos técnicos (`font-label`, `font-mono`)

### Tokens de color principales (tailwind.config.js)
- `primary` → #c3f5ff (cyan eléctrico)
- `secondary` → #cdbdff (púrpura profundo)
- `danger` → #ffb4ab (rojo sobrio)
- `outline` → #849396 (gris técnico)
- `surface` → #131313 (base oscura)
- `surface-low` → #1c1b1b
- `surface-container` → #201f1f
- `surface-highest` → #353534

### Clases CSS custom (index.css)
- `.surface-panel` → fondo de sección
- `.surface-elevated` → cards/bloques elevados
- `.glass-panel` → glassmorphism
- `.ghost-border` → borde sutil
- `.primary-button` → botón CTA principal
- `.secondary-button` → botón secundario
- `.section-title` → título de sección grande
- `.label-kicker` → etiqueta pequeña tipo "kicker"
- `.grid-faint` → fondo con grid sutil

---

## 🔧 Modos de operación

### Modo público (Netlify)
```env
VITE_APP_MODE=public
```
- Solo muestra: Home, portfolio, info de Susan
- Login redirige a Home
- Dashboard privado deshabilitado
- Deploy: Netlify con `npm run build` y `dist/`

### Modo privado (VPS)
```env
VITE_APP_MODE=private
```
- Login + 2FA funcional
- Dashboard completo con todas las tabs
- Bridge conectado con telemetría real
- Uso interno directo

---

## 🌐 Landing pública

- **Bilingüe ES/EN** con selector en navbar
- Contenido definido en el objeto `copy` dentro de `Home.tsx`
- Imágenes en `public/assets/`
- NO exponer PDF del CV completo (decisión del Boss)
- Solo resumen profesional en la sección de portafolio

---

## 🔌 Bridge (vps-bridge/server.js)

### Endpoints
| Ruta | Método | Qué hace |
|------|--------|----------|
| `/status` | GET | Status + telemetría completa (ops) |
| `/ops/status` | GET | Solo snapshot operativo |
| `/health` | GET | Health check básico |
| `/webhook/susan` | POST | Emitir evento genérico al dashboard |
| `/webhook/openclaw` | POST | Emitir evento desde OpenClaw |

### Socket.io
- Auth por token: `BP_INDUSTRIES_SECURE_2026`
- Evento: `agent_event`

### Bind
- `0.0.0.0:8080` (accesible local y por Tailscale)

---

## ⚠️ Reglas ESTRICTAS

1. **NO crear ramas git.** Todo va en `main`.
2. **NO crear carpetas paralelas.** No `/home/ubuntu/mission-control-v4/` ni similar.
3. **NO mover el symlink** `/home/ubuntu/mission-control`.
4. **NO tocar** `/home/ubuntu/.openclaw/workspace/` como proyecto de build.
5. **NO exponer** PDFs, credenciales ni datos personales en `public/`.
6. **SIEMPRE** ejecutar `npm run build` después de cambios en el frontend.
7. **SIEMPRE** ejecutar `node --check vps-bridge/server.js` si tocas el bridge.
8. **SIEMPRE** commitear a main y hacer push cuando el Boss lo indique.
9. **SIEMPRE** respetar el design system existente (tokens, clases, fuentes).
10. **SIEMPRE** mantener la landing bilingüe (ES/EN) si tocas `Home.tsx`.

---

## 🧠 Contexto del proyecto

- **Dueño:** Carlos Barrios (Boss)
- **IA ejecutiva:** Susan (CEO digital, cerebro Claude)
- **Propósito:** plataforma privada de comando para un solo usuario
- **Estética:** executive cyber minimal, dark luxury, premium SaaS
- **NO es:** un SaaS público, un template genérico, un juguete sci-fi

---

## 📝 Después de trabajar

1. Verifica que el build compila sin errores
2. Verifica que el bridge no tiene errores de sintaxis
3. NO hagas push a GitHub sin que el Boss lo autorice
4. Reporta qué archivos tocaste y qué cambió
