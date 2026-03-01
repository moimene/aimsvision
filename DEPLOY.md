# AIMS Console — Guía de Despliegue en Railway

## Requisitos previos

- Cuenta en [Railway](https://railway.com) conectada a GitHub
- Repositorio `moimene/aimsvision` en GitHub

---

## Pasos para desplegar

### 1. Crear nuevo proyecto en Railway

1. Accede a [railway.com/dashboard](https://railway.com/dashboard)
2. Haz clic en **"New Project"**
3. Selecciona **"Deploy from GitHub repo"**
4. Elige el repositorio `moimene/aimsvision`
5. Railway detectará automáticamente el `Dockerfile` y lo usará para el build

### 2. Configurar variables de entorno

En el panel de Railway, ve a tu servicio → **Variables** y añade:

| Variable | Valor |
|---|---|
| `HARVEY_ENDPOINT_V1` | `https://eu.api.harvey.ai/api/v1/completion` |
| `HARVEY_TOKEN` | `hvy_ddada12a5d2b331a173a077d23afd72227c98f1041aad603dd495a8d5173cb7ad02175670251ace1de1ebce39e94d74136d67391c714f6d3db727b2cfabccbb0` |
| `PORT` | `8080` (Railway lo inyecta automáticamente) |

> **Importante:** Nunca incluyas el token en el código fuente. Railway gestiona las variables de entorno de forma segura.

### 3. Generar dominio público

1. En tu servicio Railway → **Settings** → **Networking**
2. Haz clic en **"Generate Domain"**
3. Obtendrás una URL permanente tipo: `aimsvision-production.up.railway.app`

### 4. Redeploy automático

Cada `git push` a la rama `main` del repositorio desencadena automáticamente un nuevo build y despliegue en Railway.

---

## Verificar el despliegue

Una vez desplegado, verifica:

- **Health check:** `https://tu-dominio.up.railway.app/api/health`
  - Debe devolver: `{"status": "ok", "service": "AIMS Harvey Proxy", "harvey_configured": true}`

- **App principal:** `https://tu-dominio.up.railway.app`
  - Debe cargar el AIMS Console con el asistente Harvey disponible

---

## Arquitectura del despliegue

```
Railway Container
├── Stage 1 (build): Node 22 Alpine
│   └── pnpm build → /app/dist (React SPA)
└── Stage 2 (runtime): Python 3.11 Slim
    ├── gunicorn → Flask app (server/app.py)
    ├── /api/chat → Proxy hacia Harvey API
    ├── /api/health → Health check
    └── /* → Sirve /app/dist/index.html (SPA fallback)
```

El frontend React llama a `/api/chat` (ruta relativa), que el servidor Flask recibe y reenvía a Harvey con el token de autenticación. **El token nunca se expone al navegador.**

---

## Troubleshooting

| Síntoma | Causa probable | Solución |
|---|---|---|
| Harvey no responde | Token expirado o incorrecto | Verificar `HARVEY_TOKEN` en Railway Variables |
| Build falla en `pnpm install` | Lock file desactualizado | Ejecutar `pnpm install` localmente y hacer push |
| 404 en rutas de la SPA | Flask no sirve el fallback | Verificar que `dist/` se genera en el build |
| Timeout en Harvey | Respuesta lenta de la API | El timeout está configurado a 60s; normal en primeras consultas |
