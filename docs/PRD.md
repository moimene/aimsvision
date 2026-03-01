# AIMS Console — Product Requirements Document (PRD)

**Versión 2.0** | **Fecha de actualización:** 2026-03-01 | **Estado:** Activo

---

## Tabla de Contenidos

1. [Visión General y Propósito](#1-visión-general-y-propósito)
2. [Contexto Regulatorio](#2-contexto-regulatorio)
3. [Perfiles de Usuario y Casos de Uso](#3-perfiles-de-usuario-y-casos-de-uso)
4. [Arquitectura Técnica](#4-arquitectura-técnica)
5. [Módulos Funcionales](#5-módulos-funcionales)
6. [Catálogo de Sistemas de IA (22 Sistemas)](#6-catálogo-de-sistemas-de-ia-22-sistemas)
7. [Catálogo de Guardrails Normativos (22 Controles)](#7-catálogo-de-guardrails-normativos-22-controles)
8. [Soporte al Usuario: Harvey y Tooltips](#8-soporte-al-usuario-harvey-y-tooltips)
9. [Datos Sintéticos: Inventario Completo](#9-datos-sintéticos-inventario-completo)
10. [Despliegue y Operaciones](#10-despliegue-y-operaciones)
11. [Análisis de Gaps y Roadmap](#11-análisis-de-gaps-y-roadmap)
12. [Decisiones de Diseño y Justificaciones](#12-decisiones-de-diseño-y-justificaciones)

---

## 1. Visión General y Propósito

La **AIMS Console** (AI Management System Console) es una plataforma web de gobernanza de inteligencia artificial diseñada para organizaciones del sector financiero que operan sistemas de IA en entornos regulados. Su propósito es proporcionar una visión centralizada, estructurada y auditable del ciclo de vida completo de los sistemas de IA, desde el diseño y aprobación hasta la producción, monitorización y retirada.

La plataforma está alineada con los siguientes marcos normativos:

- **ISO/IEC 42001:2023** — Sistema de Gestión de Inteligencia Artificial
- **Reglamento (UE) 2024/1689 (AI Act)** — Marco regulatorio europeo para la IA
- **RGPD (Reglamento (UE) 2016/679)** — Protección de datos personales
- **MiFID II (Directiva 2014/65/UE)** — Mercados de instrumentos financieros
- **PSD2 (Directiva (UE) 2015/2366)** — Servicios de pago
- **AMLD4/AMLD5** — Prevención del blanqueo de capitales
- **eIDAS (Reglamento (UE) 910/2014)** — Identificación electrónica y servicios de confianza

La versión actual (v2.0) es una aplicación web completamente funcional desplegada en Railway, con un backend Flask que actúa como proxy seguro para el asistente Harvey, y un frontend React nutrido con datos sintéticos detallados y realistas que simulan un entorno bancario maduro con **22 sistemas de IA en producción o en desarrollo**.

**URL de producción:** https://aimsvision-production.up.railway.app
**Repositorio:** https://github.com/moimene/aimsvision

---

## 2. Contexto Regulatorio

El marco regulatorio que sustenta los requisitos de la plataforma es el siguiente:

| Marco | Ámbito de Aplicación | Artículos Clave |
|---|---|---|
| **AI Act (UE) 2024/1689** | Clasificación de riesgo, requisitos técnicos, supervisión humana, transparencia, registro | Arts. 6, 9, 13, 14, 15, 17, 43, 49 |
| **ISO/IEC 42001:2023** | Sistema de gestión, política, objetivos, evaluación de riesgos, auditoría | Cláusulas 4–10 (23 cláusulas) |
| **RGPD (UE) 2016/679** | Minimización de datos, seguridad, decisiones automatizadas, derechos del interesado | Arts. 5, 22, 32, 35 |
| **MiFID II 2014/65/UE** | Idoneidad y conveniencia, asesoramiento, información al cliente | Arts. 24, 25 + Reg. Delegado 2017/565 |
| **PSD2 (UE) 2015/2366** | Autenticación reforzada (SCA), análisis de riesgo transaccional (TRA) | Art. 97 + RTS (UE) 2018/389 |
| **AMLD4/AMLD5** | Diligencia debida (CDD), MLRO, comunicación de operaciones sospechosas | Directivas 2015/849 y 2018/843 |
| **Directiva Test-Achats** | Prohibición de uso del género como factor actuarial en seguros | STJUE C-236/09 (2011) |
| **eIDAS (UE) 910/2014** | Sellado de tiempo cualificado (QTSP), firma electrónica, evidencia digital | Arts. 33, 34, 42 |
| **Ley 16/2011 (ES)** | Crédito al consumo, SECCI, información precontractual | Arts. 10–12 |
| **Ley 5/2019 LCCI (ES)** | Crédito hipotecario, evaluación de solvencia, FEIN | Arts. 14–15 |
| **Ley 10/2010 (ES)** | Prevención del blanqueo de capitales, SEPBLAC | Arts. 2–18 |
| **RDL 6/2012 (ES)** | Código de Buenas Prácticas Bancarias, reestructuración de deuda | Anexo |

---

## 3. Perfiles de Usuario y Casos de Uso

La plataforma está diseñada para ser utilizada por cuatro perfiles principales de usuario, cada uno con necesidades y responsabilidades distintas dentro del marco de gobernanza de IA.

| Perfil | Rol en el AIMS | Módulos Principales |
|---|---|---|
| **Compliance Officer / MLRO** | Verificar el cumplimiento normativo de los sistemas de IA, gestionar no conformidades y coordinar auditorías | Audit, Governance, Operational Controls, Incidents |
| **Risk Manager** | Mantener el registro de riesgos, evaluar el impacto de incidentes y validar la efectividad de los controles | Risk Management, Monitoring, Incidents |
| **Technical Owner / Data Scientist** | Documentar la arquitectura técnica de los sistemas, gestionar guardrails técnicos y responder a incidentes | AI Inventory, Operational Controls, Monitoring |
| **Legal Team** | Revisar la base legal de los guardrails, validar los expedientes de evidencia y asesorar en incidentes con implicaciones regulatorias | Operational Controls, Evidence Certificates, Governance |
| **Dirección / CRO / CTO** | Visión ejecutiva del estado del sistema de gestión, alertas críticas y decisiones de aprobación | Overview, Governance, Audit |

### Casos de Uso Principales

El caso de uso central de la plataforma es la **gestión del ciclo de vida de un sistema de IA** desde su concepción hasta su retirada. Este flujo atraviesa los módulos de Inventario (registro y ficha técnica), Gobernanza (aprobación y RACI), Riesgos (evaluación y tratamiento), Controles (guardrails), Monitorización (evidencia operativa), Incidentes (mejora continua) y Auditoría (certificación).

Un segundo caso de uso crítico es la **gestión de un incidente de IA**, que implica la creación del registro de incidente, el análisis de causa raíz, la definición de acciones CAPA y el cierre con evidencia. La plataforma soporta este flujo de extremo a extremo, incluyendo la generación de expedientes de evidencia sellados con QTSP para la documentación de decisiones de alto riesgo.

---

## 4. Arquitectura Técnica

### 4.1. Stack Tecnológico

| Capa | Tecnología | Versión | Propósito |
|---|---|---|---|
| **Frontend** | React | 18 | Interfaz de usuario SPA |
| **Build Tool** | Vite | 5 | Compilación y bundling del frontend |
| **Lenguaje Frontend** | TypeScript | 5 | Tipado estático |
| **Estilos** | Tailwind CSS | 3 | Sistema de diseño utilitario |
| **Componentes UI** | shadcn/ui | — | Biblioteca de componentes accesibles |
| **Routing** | React Router DOM | 6 | Navegación SPA |
| **Backend** | Flask (Python) | 3.x | Servidor API y proxy Harvey |
| **Servidor WSGI** | Gunicorn | 22.0 | Servidor de producción Python |
| **Contenerización** | Docker | — | Build multi-stage |
| **Despliegue** | Railway | — | PaaS con CI/CD desde GitHub |
| **IA Asistente** | Harvey API | v1 | Asistente jurídico especializado |

### 4.2. Estructura del Repositorio

```
aimsvision/
├── src/
│   ├── data/               # Datos sintéticos (8 archivos TypeScript)
│   │   ├── aiSystems.ts    # 22 sistemas de IA con fichas técnicas
│   │   ├── guardrails.ts   # 22 guardrails con contenido normativo
│   │   ├── risks.ts        # 24 riesgos con tratamiento y controles
│   │   ├── incidents.ts    # 7 incidentes con CAPA y postmortem
│   │   ├── monitoring.ts   # 40 logs de eventos + KPIs
│   │   ├── governance.ts   # 20 aprobaciones + RACI
│   │   ├── audit.ts        # 24 cláusulas ISO 42001
│   │   └── evidenceCertificates.ts  # 5 expedientes QTSP/RFC 3161
│   ├── pages/              # 9 páginas de módulos + NotFound
│   ├── components/
│   │   ├── ui/             # Componentes shadcn/ui
│   │   ├── layout/         # AppLayout, AppSidebar, PageHeader
│   │   ├── indicators/     # StatusIndicator, SeverityIndicator
│   │   ├── HarveyChat.tsx  # Componente del asistente Harvey
│   │   └── InfoTooltip.tsx # Componente de tooltips contextuales
│   └── App.tsx             # Router principal (9 rutas)
├── server/
│   ├── app.py              # Flask proxy + SPA fallback + system prompt Harvey
│   └── requirements.txt    # flask, flask-cors, requests, gunicorn
├── docs/
│   └── PRD.md              # Este documento
├── Dockerfile              # Build multi-stage (Node 22 → Python 3.11)
├── railway.json            # Configuración de despliegue Railway
└── DEPLOY.md               # Guía de despliegue paso a paso
```

### 4.3. Arquitectura de Despliegue

El `Dockerfile` utiliza un **build multi-stage** para optimizar la imagen final:

**Etapa 1 (build):** Imagen `node:22-alpine`. Instala dependencias con `pnpm` y ejecuta `pnpm build`, generando los artefactos estáticos en `/app/dist`.

**Etapa 2 (runtime):** Imagen `python:3.11-slim`. Copia el directorio `/app/dist` de la etapa anterior y el código del servidor Flask. Instala las dependencias Python e inicia Gunicorn en el puerto `$PORT` (inyectado por Railway).

El servidor Flask cumple dos funciones: actúa como **proxy seguro** para la API de Harvey (el token nunca se expone al navegador) y sirve la **aplicación React** como SPA con fallback a `index.html` para todas las rutas no-API.

```
Railway Container (europe-west4)
├── Stage 1 (build): Node 22 Alpine
│   └── pnpm build → /app/dist (React SPA)
└── Stage 2 (runtime): Python 3.11 Slim
    ├── gunicorn → Flask app (server/app.py)
    ├── POST /api/chat   → Proxy hacia Harvey EU API
    ├── GET  /api/health → Health check
    └── /*               → Sirve /app/dist/index.html (SPA fallback)
```

---

## 5. Módulos Funcionales

La plataforma está organizada en **9 módulos** accesibles desde la barra lateral de navegación, más el sistema de soporte al usuario.

### 5.1. Overview (`/`)

Panel de control ejecutivo con el estado actual del AIMS. Muestra métricas clave en tablas estructuradas:

- **Resumen del Sistema:** Total de sistemas en alcance (22), sistemas en producción (20), sistemas de alto riesgo AI Act (9), sistemas no conformes (1), sistemas en riesgo (3).
- **Indicadores de Conformidad:** Cobertura ISO 42001 (74%), riesgos abiertos por encima del umbral (7, de los cuales 5 críticos), incidentes activos (3, de los cuales 1 crítico), sistemas con guardrails inefectivos (2).
- **KPIs Operacionales:** 3.284.200+ interacciones mensuales totales, tasa media de escalado a humano del 8,4%, tasa media de bloqueo por guardrail del 1,2%, 100% de decisiones con explicabilidad SHAP/LIME.
- **Alertas Activas:** Tabla de alertas ordenadas por severidad con sistema afectado, tipo y fecha límite de acción.

### 5.2. AI Inventory (`/inventory`)

Catálogo completo de los 22 sistemas de IA con funcionalidad de **drill-down** para ver la ficha técnica detallada de cada sistema. La tabla principal incluye columnas de ID, nombre, unidad de negocio, clasificación AI Act, estado de conformidad, estado del ciclo de vida, tipología del modelo y número de guardrails vinculados.

Al hacer clic en un sistema, se abre un **panel lateral de detalle** (`SystemDetailPanel`) que muestra:
- Descripción del sistema y proveedor
- Tipología del modelo y arquitectura técnica
- Guardrails clave vinculados (con enlace al módulo de Controles)
- Contacto técnico responsable
- Fechas de despliegue y última revisión
- Versión actual e interacciones mensuales

### 5.3. Governance (`/governance`)

Módulo de gobernanza y rendición de cuentas con tres secciones:

- **Matriz RACI:** Tabla de responsabilidades por sistema (Use Case Owner, Legal Owner, Risk Owner, Technical Owner, Evidence Owner).
- **Registro de Aprobaciones:** Historial de 20 decisiones de aprobación con comité responsable (Comité de Ética de IA, CRO, CTO, Consejo de Administración), fecha, estado y notas.
- **Reglas de Supervisión Humana:** Configuración de los requisitos de intervención humana por sistema, incluyendo perfil requerido y SLA.

### 5.4. Risk Management (`/risks`)

Registro de riesgos con 24 entradas detalladas. La tabla incluye tooltips contextuales en las columnas de Nivel de Riesgo, Probabilidad, Impacto, Propietario y Tratamiento. El panel de detalle de cada riesgo muestra:

- Descripción del riesgo y categoría (Fairness, Accuracy, Privacy, Security, etc.)
- Matriz de impacto/probabilidad con nivel residual
- Tratamiento seleccionado (Mitigate/Accept/Transfer/Avoid) con justificación
- Controles vinculados y su efectividad evaluada
- Evidencia de tests de validación (con fecha, resultado y fuente)
- Registro de aceptación formal del riesgo residual

### 5.5. Operational Controls (`/controls`)

Catálogo de los 22 guardrails activos. La tabla incluye tooltips en las columnas de Categoría, Acción, Supervisión Humana y Versión. El panel de detalle de cada guardrail muestra las **10 secciones normativas** definidas por el equipo legal:

1. Descripción técnica del control
2. Base legal (referencia exacta al artículo)
3. Justificación legal (3–5 líneas)
4. Condición de activación (supuesto de hecho)
5. Consecuencia de incumplimiento
6. Supervisión humana (perfil + SLA + notas)
7. Frecuencia de revisión y disparadores de actualización
8. Configuración técnica (categoría, acción, estado, versión)
9. Riesgos vinculados
10. Historial de cambios (versiones anteriores)

### 5.6. Monitoring (`/monitoring`)

Visor de logs de eventos y KPIs de rendimiento. Muestra 40 eventos de monitorización que incluyen: bloqueos por guardrail con referencia al ID del guardrail activado, escalados con SLA, decisiones de crédito con valores SHAP, alertas de deriva del modelo, auditorías AML con análisis de equidad y tests adversariales.

Los KPIs por sistema incluyen: accuracy, tasa de falsos positivos, tasa de escalado, tasa de bloqueo por guardrail y estado de deriva del modelo.

### 5.7. Incidents (`/incidents`)

Registro de 7 incidentes con ciclo de vida completo. Cada incidente incluye:

- Cronología de eventos con actor, acción y timestamp
- Análisis de causa raíz (metodología 5 Whys + Fishbone)
- Postmortem con referencia (PM-2026-XXX)
- Plan CAPA (Corrective and Preventive Actions) con acciones individuales, responsable, fecha límite y estado

El incidente más crítico (INC-001) documenta un caso de discriminación por género en el motor de precios de seguros (AIS-011), con correlación r=0,68 entre código postal y género como variable proxy, que resultó en la suspensión del sistema y un plan CAPA de 5 acciones.

### 5.8. Audit (`/audit`)

Checklist interactivo de las **23 cláusulas de la norma ISO/IEC 42001:2023** con estado de conformidad (Conforme, En Progreso, No Conforme, No Aplicable), evidencia vinculada y responsable. Incluye:

- 4 no conformidades abiertas, de las cuales 1 es Mayor Crítica (cláusula 8.3 — tratamiento de riesgos)
- Cobertura global del 74%
- Próxima auditoría programada

### 5.9. Evidence Certificates (`/evidence`)

Visor de **5 expedientes de evidencia sellados** con QTSP/RFC 3161 que documentan el ciclo de vida completo de interacciones de IA críticas. Cada expediente incluye:

- Metadatos del bundle (sistema, fecha, número de eventos, estado del sello)
- Tabla de eventos con: timestamp, actor, acción, decisión de política (ALLOW/BLOCK/ESCALATE), guardrail activado, token TST (RFC 3161 simulado) y hash SHA-256 del artefacto
- Obligaciones regulatorias documentadas

Los 5 expedientes cubren: contratación de préstamo al consumo (AIS-001), ejercicio del derecho de desistimiento (AIS-001), decisión de crédito PYME con SHAP (AIS-007), alerta AML con revisión MLRO y SAR al SEPBLAC (AIS-017), e informe de idoneidad MiFID II con firma del asesor (AIS-016).

---

## 6. Catálogo de Sistemas de IA (22 Sistemas)

Los 22 sistemas de IA gestionados por la plataforma cubren las principales unidades de negocio de una entidad financiera. La clasificación de riesgo AI Act determina los requisitos de gobernanza aplicables.

| ID | Sistema | Unidad de Negocio | Clasificación AI Act | Estado | Proveedor |
|---|---|---|---|---|---|
| AIS-001 | Agente de Contratación de Préstamos al Consumo | Banca Retail | **Alto Riesgo** – Art. 6(2) Anexo III | Conforme | Salesforce Agentforce |
| AIS-002 | Motor de Detección de Fraude en Tarjetas v3 | Medios de Pago | **Alto Riesgo** – Art. 6(2) Anexo III | Conforme | Interno |
| AIS-003 | Clasificador de Documentación Hipotecaria | Crédito Hipotecario | Riesgo Limitado | Conforme | Azure AI Document Intelligence |
| AIS-004 | Copiloto para Gestores de Banca Privada | Banca Privada y Wealth | **Alto Riesgo** – Art. 6(2) Anexo III | En Riesgo | OpenAI (GPT-4.1) |
| AIS-005 | Sistema de Mantenimiento Predictivo de ATMs | Operaciones | Riesgo Mínimo | Conforme | AWS SageMaker |
| AIS-006 | Agente Informativo de Tarjetas (App Móvil) | Medios de Pago | Riesgo Limitado | Conforme | Google Cloud Vertex AI |
| AIS-007 | Modelo de Scoring de Crédito para Pymes | Banca de Empresas | **Alto Riesgo** – Art. 6(2) Anexo III | En Riesgo | Interno |
| AIS-008 | Optimizador de Colocación de Efectivo en Red | Tesorería y Operaciones | Riesgo Mínimo | Conforme | Interno |
| AIS-009 | Motor de Recomendación de Productos (Portal Web) | Marketing Digital | Riesgo Mínimo | Conforme | Interno |
| AIS-010 | Asistente de Verificación KYC/AML | Cumplimiento Normativo | **Alto Riesgo** – Art. 6(2) Anexo III | Conforme | Interno |
| AIS-011 | Motor de Optimización de Precios de Seguros | Seguros y Protección | **Alto Riesgo** – Art. 6(2) Anexo III | **No Conforme** | Interno |
| AIS-012 | Sistema OCR de Facturas para Confirming | Banca de Empresas | Riesgo Mínimo | Conforme | ABBYY FlexiCapture |
| AIS-013 | Analizador de Sentimiento en Encuestas NPS | Calidad y Experiencia de Cliente | Riesgo Mínimo | Conforme | Interno |
| AIS-014 | Asistente de Negociación de Deuda (Hardship) | Recuperaciones y Cobros | **Alto Riesgo** – Art. 6(2) Anexo III | Conforme | Salesforce Agentforce |
| AIS-015 | Validador de Documentos de Comercio Exterior | Negocio Internacional | Riesgo Limitado | Conforme | Interno |
| AIS-016 | Simulador de Idoneidad de Inversiones (MiFID II) | Asesoramiento Financiero | **Alto Riesgo** – Art. 6(2) Anexo III | En Riesgo | Interno |
| AIS-017 | Sistema de Detección de Blanqueo de Capitales (AML) | Cumplimiento Normativo | **Alto Riesgo** – Art. 6(2) Anexo III | Conforme | Interno |
| AIS-018 | Copiloto de Redacción para el Área Legal | Servicios Jurídicos | Riesgo Limitado | Conforme | OpenAI (GPT-4.1) |
| AIS-019 | Priorizador de Alertas de Ciberseguridad | Ciberseguridad | Riesgo Mínimo | Conforme | Interno |
| AIS-020 | Analizador de Disputas de Pagos con Tarjeta | Medios de Pago | Riesgo Limitado | Conforme | Interno |
| AIS-021 | Segmentador de Clientes para Campañas | Marketing Digital | Riesgo Mínimo | Conforme | Interno |
| AIS-022 | Modelo de Predicción de Fuga de Clientes | Retención de Clientes | Riesgo Limitado – En evaluación | Pendiente | Interno |

### Tipologías de Modelos

Los 22 sistemas cubren un espectro completo de tipologías de IA:

| Tipología | Sistemas | Descripción |
|---|---|---|
| **Agente Conversacional (RAG + LLM)** | AIS-001, AIS-006, AIS-014 | Agentes que combinan generación de lenguaje con recuperación de información y handoff a humano |
| **Copiloto Interno (RAG + LLM)** | AIS-004, AIS-018 | Asistentes para uso interno de empleados con acceso a datos corporativos |
| **Clasificador en Tiempo Real** | AIS-002 | Modelos de ML servidos con latencia <50ms para decisiones transaccionales |
| **Sistema de Scoring (Ensemble)** | AIS-007 | Modelos de evaluación de riesgo crediticio con explicabilidad SHAP |
| **Inteligencia Documental (OCR + NLU)** | AIS-003, AIS-012 | Extracción y clasificación automática de documentos |
| **Predicción de Series Temporales (LSTM)** | AIS-005 | Predicción de fallos y comportamientos futuros sobre series temporales |
| **Detección de Anomalías y Análisis de Grafos** | AIS-017 | Redes neuronales de grafos para detección de patrones AML |
| **Sistema de Soporte a la Decisión (DSS)** | AIS-016, AIS-020 | Herramientas de apoyo a la decisión humana con lógica normativa |
| **Motor de Recomendación** | AIS-009 | Filtrado colaborativo para personalización de productos |
| **Modelo de Precios (GLM)** | AIS-011 | Tarificación actuarial con variables de comportamiento |
| **Clasificación de Texto (BERT/NLP)** | AIS-013 | Análisis de sentimiento y clasificación de texto |
| **Optimización (VRP/RL)** | AIS-008 | Investigación operativa y aprendizaje por refuerzo |
| **Clasificador Binario (Churn)** | AIS-022 | Predicción de fuga de clientes |
| **Clasificador de Alertas (SOC)** | AIS-019 | Triaje de alertas de seguridad |

---

## 7. Catálogo de Guardrails Normativos (22 Controles)

Los guardrails son controles técnicos que se aplican en tiempo de ejecución para garantizar que los sistemas de IA operan dentro de los límites normativos y éticos establecidos. Cada guardrail tiene una ficha normativa completa definida por el equipo legal.

| ID | Nombre | Sistema | Acción | Base Legal |
|---|---|---|---|---|
| GRL-001 | Completitud Precontractual SECCI | AIS-001 | **Bloquear** | Directiva 2008/48/CE arts. 5–6; Ley 16/2011 (ES) |
| GRL-002 | Handoff Obligatorio Pre-Firma | AIS-001 | **Escalar** | AI Act art. 14; Ley 5/2019 LCCI |
| GRL-003 | Detección de Prompt Injection | AIS-001 | **Bloquear** | AI Act art. 15; RGPD arts. 5(1)(f) y 32 |
| GRL-004 | Umbral de Escalado por Importe | AIS-002 | **Escalar** | PSD2 art. 97; RTS SCA (UE) 2018/389 |
| GRL-005 | Monitorización de Deriva del Modelo | AIS-002 | **Escalar** | AI Act arts. 9 y 15 |
| GRL-006 | Umbral de Confianza con Revisión Humana | AIS-003 | **Escalar** | AI Act art. 14; Ley 5/2019 LCCI |
| GRL-007 | Advice Boundary MiFID II | AIS-004 | **Bloquear** | MiFID II arts. 24–25; Reg. Delegado (UE) 2017/565 |
| GRL-008 | Sanitización de PII en Contexto LLM | AIS-004 | **Bloquear** | RGPD arts. 5(1)(c), 5(1)(f), 32 |
| GRL-009 | Bloqueo de Decisión sin Explicación SHAP | AIS-007 | **Bloquear** | AI Act art. 13; RGPD art. 22 |
| GRL-010 | Revisión Humana de Denegaciones | AIS-007 | **Escalar** | AI Act art. 14; RGPD art. 22(3); Directiva 2014/17/UE art. 18 |
| GRL-011 | Revisión Humana de Alertas KYC/AML | AIS-010 | **Escalar** | AMLD4/AMLD5; Reglamento (UE) 2023/1113; Ley 10/2010 (ES) |
| GRL-012 | Exclusión de Variables de Género y Proxies | AIS-011 | **Bloquear** | Directiva 2004/113/CE; STJUE C-236/09 (Test-Achats); LO 3/2007 (ES) |
| GRL-013 | Guardrail de Tono Empático y No Coercitivo | AIS-014 | **Bloquear** | Directiva 2005/29/CE; guías EBA sobre clientes vulnerables |
| GRL-014 | Presentación Obligatoria de Derechos del Deudor | AIS-014 | **Bloquear** | Directiva 2008/48/CE art. 14; RDL 6/2012; Ley 5/2019 LCCI |
| GRL-015 | Handoff Humano por Vulnerabilidad | AIS-014 | **Escalar** | AI Act art. 14; guías EBA sobre clientes vulnerables |
| GRL-016 | Checklist de Completitud MiFID II | AIS-016 | **Bloquear** | MiFID II art. 25; Reg. Delegado (UE) 2017/565 arts. 54–56 |
| GRL-017 | Firma Obligatoria del Asesor Certificado | AIS-016 | **Escalar** | MiFID II art. 25(6); normativa CNMV; Reg. Delegado (UE) 2017/565 |
| GRL-018 | Filtro de Contenido y Seguridad | AIS-006 | **Bloquear** | AI Act art. 15; RGPD art. 32; DSA (UE) 2022/2065 |
| GRL-019 | Escalado por Intención de Contratación | AIS-006 | **Escalar** | AI Act art. 13; Directiva 2008/48/CE |
| GRL-020 | Revisión Humana Obligatoria de Alertas AML | AIS-017 | **Escalar** | AMLD5; Reglamento (UE) 2023/1113; guías EBA/ESAs; Ley 10/2010 (ES) |
| GRL-021 | Sanitización de Datos Confidenciales Pre-LLM | AIS-018 | **Bloquear** | RGPD arts. 5(1)(c) y 32; secreto profesional (Estatuto Abogacía art. 42) |
| GRL-022 | Advice Boundary en Recomendaciones de Productos | AIS-009 | **Bloquear** | MiFID II arts. 24–25; AI Act art. 13; normativa publicidad CNMV |

### Estructura de la Ficha Normativa de Guardrail

Cada guardrail incluye los siguientes campos, definidos en colaboración con el equipo legal:

| Campo | Descripción |
|---|---|
| `legalBasis` | Referencia exacta al artículo normativo (monospace) |
| `legalJustification` | 3–5 líneas explicando el porqué jurídico y el riesgo mitigado |
| `activationCondition` | Supuesto de hecho preciso que dispara el control |
| `nonComplianceConsequence` | Riesgo regulatorio si el control falla |
| `humanOversightSpec` | Perfil requerido, SLA de respuesta y notas de supervisión |
| `reviewFrequency` | Cadencia de revisión y disparadores de actualización |
| `updateTriggers` | Lista de eventos que obligan a revisar el guardrail |
| `changeHistory` | Versiones anteriores con fecha, autor y descripción del cambio |

---

## 8. Soporte al Usuario: Harvey y Tooltips

### 8.1. Asistente Harvey

Harvey es un asistente jurídico y regulatorio de élite especializado en gobernanza de IA, integrado como un componente flotante (`HarveyChat.tsx`) accesible desde todas las páginas de la plataforma mediante el botón **"Harvey · Asistente jurídico IA"** en la esquina inferior derecha.

**Arquitectura de la integración:**

El componente React envía las consultas del usuario a `/api/chat` (ruta relativa). El servidor Flask (`server/app.py`) recibe la petición, añade el **system prompt** con el contexto completo de la plataforma (22 sistemas, 22 guardrails, marco normativo completo) y reenvía la petición a la API de Harvey en la región EU (`https://eu.api.harvey.ai/api/v1/completion`). El token de autenticación se gestiona exclusivamente en el servidor, nunca en el frontend.

**System prompt:** El system prompt de Harvey incluye el contexto completo de los 22 sistemas de IA (ID, nombre, tipología, clasificación AI Act), los 22 guardrails con su base legal, el marco normativo aplicable (AI Act, ISO 42001, MiFID II, RGPD, AMLD, PSD2, eIDAS) y las instrucciones de comportamiento del asistente.

**Funcionalidades del componente:**
- 6 preguntas sugeridas de inicio rápido
- Historial de conversación persistente durante la sesión (últimos 6 turnos)
- Formateo Markdown en las respuestas (negritas, listas, código inline)
- Estado de carga con spinner
- Controles de minimizar y cerrar

### 8.2. Tooltips Contextuales (InfoTooltip)

El componente `InfoTooltip.tsx` proporciona más de **20 definiciones de tooltips** para los conceptos técnicos y normativos más relevantes de la plataforma. Los tooltips aparecen como iconos `?` junto a las cabeceras de las tablas en los módulos de Risk Management y Operational Controls.

| Módulo | Campos con Tooltip |
|---|---|
| **Risk Management** | Nivel de Riesgo, Probabilidad, Impacto, Propietario del Riesgo, Tratamiento |
| **Operational Controls** | Categoría del Guardrail, Acción, Supervisión Humana, Base Legal |
| **AI Inventory** | Clasificación AI Act, Estado de Conformidad, Método de Explicabilidad |
| **Evidence Certificates** | Token TST, Bundle de Evidencia, Decisión de Política |
| **Audit** | Cláusula ISO, Hallazgo de Auditoría |

---

## 9. Datos Sintéticos: Inventario Completo

Los datos sintéticos han sido diseñados para simular un entorno bancario maduro y realista, con coherencia interna entre todos los módulos. Las entidades están vinculadas entre sí mediante IDs de referencia.

| Entidad | Cantidad | Líneas de Código | Descripción |
|---|---|---|---|
| Sistemas de IA (`aiSystems.ts`) | 22 | 528 | Fichas técnicas completas con arquitectura, tipología y contacto técnico |
| Guardrails (`guardrails.ts`) | 22 | 750 | Fichas normativas completas con base legal y condiciones de activación |
| Riesgos (`risks.ts`) | 24 | 613 | Registro de riesgos con tratamiento, controles vinculados y evidencia de tests |
| Incidentes (`incidents.ts`) | 7 | 441 | Cronología, causa raíz, postmortem y planes CAPA |
| Eventos de Monitorización (`monitoring.ts`) | 40 | 752 | Logs de interacciones, decisiones, alertas y auditorías |
| Certificados de Evidencia (`evidenceCertificates.ts`) | 5 | 598 | Expedientes QTSP/RFC 3161 con tokens TST y hashes SHA-256 |
| Aprobaciones de Gobernanza (`governance.ts`) | 20 | 588 | Decisiones de comités con RACI y reglas de supervisión |
| Cláusulas de Auditoría (`audit.ts`) | 24 | 403 | Checklist ISO 42001 con estado y evidencia |
| **Total** | **~170 entidades** | **~4.673** | Datos coherentes y vinculados entre sí |

### KPIs del Entorno Simulado

| KPI | Valor |
|---|---|
| Interacciones mensuales totales | 3.284.200+ |
| Tasa media de escalado a humano | 8,4% |
| Tasa media de bloqueo por guardrail | 1,2% |
| Decisiones con explicabilidad SHAP/LIME | 100% |
| Cobertura de auditoría ISO 42001 | 74% |
| Sistemas de alto riesgo AI Act | 9 de 22 |
| Guardrails con supervisión humana requerida | 12 de 22 |

---

## 10. Despliegue y Operaciones

### 10.1. Entorno de Producción

| Parámetro | Valor |
|---|---|
| **URL** | https://aimsvision-production.up.railway.app |
| **Plataforma** | Railway (PaaS) |
| **Región** | europe-west4 (Países Bajos) |
| **Puerto** | Dinámico (`$PORT`, actualmente 8080) |
| **CI/CD** | Auto-deploy en cada push a `main` |
| **Tiempo de build** | ~3 minutos (multi-stage Docker) |

### 10.2. Variables de Entorno

| Variable | Descripción | Gestionada en |
|---|---|---|
| `HARVEY_ENDPOINT_V1` | Endpoint de la API de Harvey (región EU) | Railway Variables |
| `HARVEY_TOKEN` | Token de autenticación de Harvey | Railway Variables |
| `PORT` | Puerto de escucha (inyectado por Railway) | Railway (automático) |

> **Nota de seguridad:** El token de Harvey nunca se incluye en el código fuente ni se expone al navegador. Se gestiona exclusivamente como variable de entorno en Railway.

### 10.3. Health Check

El endpoint `/api/health` devuelve el estado del servidor y confirma si Harvey está configurado:

```json
{
  "status": "ok",
  "service": "AIMS Harvey Proxy",
  "harvey_configured": true
}
```

### 10.4. Proceso de Despliegue

El proceso de despliegue está completamente automatizado. Cada `git push` a la rama `main` desencadena un nuevo build en Railway. El proceso completo (build + deploy + healthcheck) tarda aproximadamente 3 minutos. Los detalles paso a paso se encuentran en `DEPLOY.md`.

---

## 11. Análisis de Gaps y Roadmap

### 11.1. Estado Actual de Implementación

| Capacidad | Estado | Observaciones |
|---|---|---|
| Inventario de sistemas con ficha técnica | ✅ **Implementado** | 22 sistemas con drill-down completo |
| Gobernanza y RACI | ✅ **Implementado** | 20 aprobaciones, matriz RACI completa |
| Gestión de riesgos | ✅ **Implementado** | 24 riesgos con tratamiento y controles |
| Controles operacionales (guardrails) | ✅ **Implementado** | 22 guardrails con fichas normativas legales |
| Monitorización y evidencia | ✅ **Implementado** | 40 logs de eventos + KPIs por sistema |
| Gestión de incidentes (CAPA) | ✅ **Implementado** | 7 incidentes con postmortem y CAPA |
| Auditoría ISO 42001 | ✅ **Implementado** | 24 cláusulas con estado y no conformidades |
| Certificados de evidencia QTSP | ✅ **Implementado** | 5 expedientes con tokens TST simulados |
| Asistente Harvey (IA jurídica) | ✅ **Implementado** | Proxy Flask seguro + system prompt completo |
| Tooltips contextuales | ✅ **Implementado** | 20+ definiciones en Risk y Controls |
| Despliegue permanente (Railway) | ✅ **Implementado** | URL permanente con CI/CD |
| **Backend con persistencia de datos** | ❌ **No Implementado** | Los datos son estáticos en TypeScript |
| **Autenticación y RBAC** | ❌ **No Implementado** | No hay login ni control de acceso por rol |
| **Exportación de informes (PDF/CSV)** | ❌ **No Implementado** | Los botones de exportación son decorativos |
| **Notificaciones por email** | ❌ **No Implementado** | No hay integración con servicio de email |
| **Sellado de tiempo real (QTSP)** | ❌ **No Implementado** | Los tokens TST son sintéticos/simulados |
| **Validación adversarial automatizada** | ❌ **No Implementado** | No hay módulo de red team automatizado |
| **Dominio personalizado** | 🔶 **Opcional** | Se puede añadir en Railway Settings |

### 11.2. Roadmap

**Fase 2 — Backend y Persistencia (Prioridad Alta)**

La principal limitación de la versión actual es que todos los datos son estáticos. La siguiente iteración debería migrar los datos a una base de datos relacional (PostgreSQL en Railway) y desarrollar una API REST que permita crear, editar y eliminar registros desde la interfaz. Esto habilitaría el uso real de la plataforma por parte de equipos de gobernanza.

**Fase 2 — Autenticación y RBAC (Prioridad Alta)**

La implementación de un sistema de autenticación (Auth0, Clerk o similar) con control de acceso basado en roles es un requisito previo para el uso en producción. Los roles definidos en la sección 3 (Compliance Officer, Risk Manager, Technical Owner, Legal Team, Dirección) deberían tener vistas y permisos diferenciados.

**Fase 2 — Exportación de Informes (Prioridad Media)**

La generación de informes en PDF desde los módulos de Inventario, Riesgos e Incidentes es una funcionalidad de alto valor para los flujos de auditoría. Se puede implementar con librerías como `react-pdf` o mediante un endpoint Flask que genere el PDF en el servidor.

**Fase 3 — Integración QTSP Real (Prioridad Media)**

La integración con un Proveedor de Servicios de Confianza Cualificado (QTSP) real para el sellado de tiempo de evidencias (conforme a eIDAS) elevaría significativamente el valor de auditoría de la plataforma. Requiere un contrato con un QTSP (ej. Uanataca, Firmaprofesional) y un endpoint de sellado en el backend.

**Fase 3 — Módulo de Validación Adversarial (Prioridad Baja)**

Un módulo para ejecutar pruebas de robustez predefinidas contra los guardrails (jailbreak, inyección de PII, deriva de datos) y visualizar los resultados demostraría la eficacia de los controles de forma reproducible y auditable.

---

## 12. Decisiones de Diseño y Justificaciones

| Decisión | Alternativas Consideradas | Justificación |
|---|---|---|
| **Datos estáticos en TypeScript** | Base de datos + API REST | Permite una demo completamente funcional sin infraestructura de backend, reduciendo la complejidad de despliegue inicial |
| **Backend Flask como proxy Harvey** | Llamada directa desde el frontend | Protege el token de Harvey y permite añadir lógica de negocio (system prompt, historial) sin exponer credenciales |
| **Dockerfile multi-stage** | Nixpacks (Railway nativo) | Mayor control sobre el proceso de build y la imagen final; permite combinar Node y Python en un único contenedor |
| **shadcn/ui + Tailwind CSS** | Material UI, Ant Design | Mayor flexibilidad de personalización y menor tamaño de bundle; componentes accesibles por defecto |
| **Harvey (API EU)** | OpenAI GPT-4.1, Gemini | Harvey está especializado en legislación, lo que lo hace idóneo para responder consultas sobre AI Act, MiFID II, RGPD y normativa española |
| **Railway sobre Vercel/Netlify** | Vercel (estático), Render | Railway soporta aplicaciones con backend (Flask/Python), a diferencia de Vercel que está optimizado para frontends estáticos |
| **Sin autenticación en v2.0** | Auth0, Clerk | La demo no requiere autenticación; añadirla en esta fase aumentaría la complejidad sin aportar valor demostrativo |
