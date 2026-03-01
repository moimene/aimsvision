import { StatusType } from "@/components/indicators";

export type GuardrailCategory = "Security" | "Privacy" | "Compliance" | "Quality";
export type GuardrailAction = "Proceed" | "Block" | "Escalate";
export type GuardrailStatus = "Active" | "Inactive" | "Testing" | "Deprecated";

export interface ChangeHistoryEntry {
  version: string;
  date: string;
  changedBy: string;
  description: string;
}

export interface Guardrail {
  id: string;
  name: string;
  category: GuardrailCategory;
  aiSystemId: string;
  aiSystemName: string;
  action: GuardrailAction;
  humanOversightRequired: boolean;
  status: GuardrailStatus;
  version: string;
  description: string;
  linkedRiskIds: string[];
  changeHistory: ChangeHistoryEntry[];
  lastReviewedDate: string;
  lastReviewedBy: string;
}

export const guardrailStatusMapping: Record<GuardrailStatus, { status: StatusType; text: string }> = {
  "Active": { status: "success", text: "Activo" },
  "Inactive": { status: "neutral", text: "Inactivo" },
  "Testing": { status: "warning", text: "En pruebas" },
  "Deprecated": { status: "critical", text: "Obsoleto" },
};

export const guardrailActionMapping: Record<GuardrailAction, { status: StatusType; text: string }> = {
  "Proceed": { status: "success", text: "Permitir" },
  "Block": { status: "critical", text: "Bloquear" },
  "Escalate": { status: "warning", text: "Escalar" },
};

export const guardrailCategories: GuardrailCategory[] = ["Security", "Privacy", "Compliance", "Quality"];

export const guardrailsData: Guardrail[] = [
  // AIS-001: Agente de Contratación de Préstamos al Consumo
  {
    id: "GRL-001",
    name: "Completitud Precontractual SECCI",
    category: "Compliance",
    aiSystemId: "AIS-001",
    aiSystemName: "Agente de Contratación de Préstamos al Consumo",
    action: "Block",
    humanOversightRequired: false,
    status: "Active",
    version: "1.2.0",
    description: "Bloquea el avance hacia la confirmación del contrato si no se han presentado y aceptado explícitamente todos los elementos obligatorios de la SECCI (Standard European Consumer Credit Information): TAE, coste total del crédito, calendario de pagos, advertencias de riesgo y derecho de desistimiento. Conforme a Directiva (UE) 2023/2225.",
    linkedRiskIds: ["RSK-001"],
    changeHistory: [
      { version: "1.2.0", date: "2026-02-01", changedBy: "Carmen Rodríguez", description: "Añadido control de entrega con menos de 24h: activa recordatorio de desistimiento" },
      { version: "1.1.0", date: "2025-12-15", changedBy: "Alejandro Vidal", description: "Ampliado a todos los tipos de crédito al consumo" },
      { version: "1.0.0", date: "2025-11-01", changedBy: "Jordi Puig", description: "Despliegue inicial" },
    ],
    lastReviewedDate: "2026-02-20",
    lastReviewedBy: "Alejandro Vidal",
  },
  {
    id: "GRL-002",
    name: "Handoff Obligatorio Pre-Firma",
    category: "Compliance",
    aiSystemId: "AIS-001",
    aiSystemName: "Agente de Contratación de Préstamos al Consumo",
    action: "Escalate",
    humanOversightRequired: true,
    status: "Active",
    version: "1.0.0",
    description: "Antes de que el cliente confirme la contratación, el agente deriva obligatoriamente a un especialista humano que verifica la comprensión del cliente y confirma la operación. El agente preserva todo el contexto de la conversación para el especialista. El cliente puede solicitar el handoff en cualquier momento.",
    linkedRiskIds: ["RSK-001"],
    changeHistory: [
      { version: "1.0.0", date: "2026-01-20", changedBy: "Carmen Rodríguez", description: "Despliegue inicial – requisito de diseño del sistema" },
    ],
    lastReviewedDate: "2026-02-20",
    lastReviewedBy: "Carmen Rodríguez",
  },
  {
    id: "GRL-003",
    name: "Detección de Prompt Injection",
    category: "Security",
    aiSystemId: "AIS-001",
    aiSystemName: "Agente de Contratación de Préstamos al Consumo",
    action: "Block",
    humanOversightRequired: false,
    status: "Active",
    version: "2.0.0",
    description: "Detecta y bloquea intentos de manipulación de las instrucciones del agente mediante técnicas de prompt injection o jailbreak. Analiza patrones como 'ignora las instrucciones anteriores', 'modo desarrollador', 'imprime el system prompt' y similares. Registra el intento y alerta al equipo de seguridad.",
    linkedRiskIds: ["RSK-002"],
    changeHistory: [
      { version: "2.0.0", date: "2026-01-15", changedBy: "Jordi Puig", description: "Actualización a modelo de detección basado en transformer" },
      { version: "1.0.0", date: "2025-11-01", changedBy: "Jordi Puig", description: "Despliegue inicial con detección por patrones regex" },
    ],
    lastReviewedDate: "2026-02-15",
    lastReviewedBy: "Víctor Cano",
  },
  // AIS-002: Motor de Detección de Fraude en Tarjetas v3
  {
    id: "GRL-004",
    name: "Umbral de Escalado por Importe",
    category: "Compliance",
    aiSystemId: "AIS-002",
    aiSystemName: "Motor de Detección de Fraude en Tarjetas v3",
    action: "Escalate",
    humanOversightRequired: true,
    status: "Active",
    version: "2.1.0",
    description: "Toda transacción marcada como sospechosa con importe superior a 50.000 EUR es escalada automáticamente al Panel de Revisión de Fraude para decisión humana. La recomendación del modelo se proporciona como contexto pero no se ejecuta automáticamente. SLA de respuesta: 30 minutos.",
    linkedRiskIds: ["RSK-003"],
    changeHistory: [
      { version: "2.1.0", date: "2025-11-20", changedBy: "Rafael Montoya", description: "Reducción del umbral de 100.000 EUR a 50.000 EUR" },
      { version: "2.0.0", date: "2025-06-15", changedBy: "Rafael Montoya", description: "Añadida notificación automática al panel" },
      { version: "1.0.0", date: "2024-06-01", changedBy: "Isabel Ferrer", description: "Despliegue inicial" },
    ],
    lastReviewedDate: "2026-01-15",
    lastReviewedBy: "Rafael Montoya",
  },
  {
    id: "GRL-005",
    name: "Monitorización de Deriva del Modelo",
    category: "Quality",
    aiSystemId: "AIS-002",
    aiSystemName: "Motor de Detección de Fraude en Tarjetas v3",
    action: "Escalate",
    humanOversightRequired: false,
    status: "Active",
    version: "1.3.0",
    description: "Monitorización continua de la deriva del modelo mediante métricas PSI (Population Stability Index) y CSI (Characteristic Stability Index). Si el score de deriva supera el umbral del 20%, se activa una alerta al equipo de Data Science y se inicia el proceso de reentrenamiento.",
    linkedRiskIds: ["RSK-003"],
    changeHistory: [
      { version: "1.3.0", date: "2025-12-01", changedBy: "David Navarro", description: "Añadido análisis de estacionalidad al cálculo de deriva" },
      { version: "1.0.0", date: "2024-09-01", changedBy: "David Navarro", description: "Despliegue inicial" },
    ],
    lastReviewedDate: "2026-01-20",
    lastReviewedBy: "David Navarro",
  },
  // AIS-003: Clasificador de Documentación Hipotecaria
  {
    id: "GRL-006",
    name: "Umbral de Confianza con Revisión Humana",
    category: "Quality",
    aiSystemId: "AIS-003",
    aiSystemName: "Clasificador de Documentación Hipotecaria",
    action: "Escalate",
    humanOversightRequired: true,
    status: "Active",
    version: "1.1.0",
    description: "Documentos clasificados con una puntuación de confianza inferior al 75% son enrutados a la cola de revisión humana. La clasificación no se aplica automáticamente hasta la confirmación del revisor. Se registra la decisión final del revisor para el reentrenamiento del modelo.",
    linkedRiskIds: ["RSK-005"],
    changeHistory: [
      { version: "1.1.0", date: "2025-10-05", changedBy: "Lucía Martínez", description: "Aumento del umbral del 65% al 75%" },
      { version: "1.0.0", date: "2024-09-15", changedBy: "Pau Casals", description: "Despliegue inicial" },
    ],
    lastReviewedDate: "2025-12-20",
    lastReviewedBy: "Lucía Martínez",
  },
  // AIS-004: Copiloto para Gestores de Banca Privada
  {
    id: "GRL-007",
    name: "Advice Boundary MiFID II",
    category: "Compliance",
    aiSystemId: "AIS-004",
    aiSystemName: "Copiloto para Gestores de Banca Privada",
    action: "Block",
    humanOversightRequired: true,
    status: "Active",
    version: "1.1.0",
    description: "Detecta y bloquea la generación de recomendaciones de inversión personalizadas sin que se haya completado y registrado el test de idoneidad MiFID II del cliente. Fuerza la presentación del disclaimer: 'Esta información no constituye recomendación personalizada. Para asesoramiento personalizado, es necesaria una evaluación de idoneidad conforme a MiFID II.' Activa handoff al asesor certificado.",
    linkedRiskIds: ["RSK-006"],
    changeHistory: [
      { version: "1.1.0", date: "2026-01-10", changedBy: "Alejandro Vidal", description: "Ampliado a productos de renta fija y fondos de inversión" },
      { version: "1.0.0", date: "2025-11-01", changedBy: "Enrique Palau", description: "Despliegue inicial" },
    ],
    lastReviewedDate: "2026-01-20",
    lastReviewedBy: "Alejandro Vidal",
  },
  {
    id: "GRL-008",
    name: "Sanitización de PII en Contexto LLM",
    category: "Privacy",
    aiSystemId: "AIS-004",
    aiSystemName: "Copiloto para Gestores de Banca Privada",
    action: "Block",
    humanOversightRequired: false,
    status: "Active",
    version: "2.0.0",
    description: "Detecta y enmascara información de identificación personal (PII) y datos financieros sensibles antes de enviarlos al modelo de lenguaje. Entidades detectadas: nombre completo, NIF/NIE, IBAN, número de cuenta, saldo, posiciones de cartera. Los logs del sistema nunca contienen PII en claro.",
    linkedRiskIds: ["RSK-007"],
    changeHistory: [
      { version: "2.0.0", date: "2025-12-01", changedBy: "Jordi Puig", description: "Añadida detección de posiciones de cartera y datos de inversión" },
      { version: "1.0.0", date: "2025-11-01", changedBy: "Jordi Puig", description: "Despliegue inicial" },
    ],
    lastReviewedDate: "2026-01-15",
    lastReviewedBy: "Marta Soler",
  },
  // AIS-007: Modelo de Scoring de Crédito para Pymes
  {
    id: "GRL-009",
    name: "Bloqueo de Decisión sin Explicación SHAP",
    category: "Compliance",
    aiSystemId: "AIS-007",
    aiSystemName: "Modelo de Scoring de Crédito para Pymes",
    action: "Block",
    humanOversightRequired: false,
    status: "Active",
    version: "1.2.0",
    description: "Bloquea la emisión de cualquier decisión de crédito (aprobación o denegación) sin que se haya generado y validado el documento de explicabilidad SHAP correspondiente. El documento debe incluir los 5 factores principales que determinan el score y su contribución relativa. Requerimiento del AI Act Art. 86 y normativa de crédito.",
    linkedRiskIds: ["RSK-009"],
    changeHistory: [
      { version: "1.2.0", date: "2026-01-15", changedBy: "Francesc Bosch", description: "Añadida validación de integridad del documento SHAP (no solo presencia)" },
      { version: "1.1.0", date: "2025-12-10", changedBy: "Francesc Bosch", description: "Añadido soporte para LIME como alternativa a SHAP" },
      { version: "1.0.0", date: "2024-03-01", changedBy: "David Navarro", description: "Despliegue inicial" },
    ],
    lastReviewedDate: "2026-01-25",
    lastReviewedBy: "Alejandro Vidal",
  },
  {
    id: "GRL-010",
    name: "Revisión Humana de Denegaciones",
    category: "Compliance",
    aiSystemId: "AIS-007",
    aiSystemName: "Modelo de Scoring de Crédito para Pymes",
    action: "Escalate",
    humanOversightRequired: true,
    status: "Active",
    version: "1.0.0",
    description: "Todas las denegaciones de crédito y las aprobaciones superiores a 500.000 EUR son enrutadas al Comité de Crédito de Empresas para revisión y decisión final. El modelo proporciona el score, la explicación SHAP y los factores de riesgo como contexto. La decisión final siempre es humana.",
    linkedRiskIds: ["RSK-008"],
    changeHistory: [
      { version: "1.0.0", date: "2024-03-01", changedBy: "Francesc Bosch", description: "Despliegue inicial – requisito regulatorio" },
    ],
    lastReviewedDate: "2026-01-25",
    lastReviewedBy: "Francesc Bosch",
  },
  // AIS-010: Asistente de Verificación KYC/AML
  {
    id: "GRL-011",
    name: "Revisión Humana de Alertas KYC/AML",
    category: "Compliance",
    aiSystemId: "AIS-010",
    aiSystemName: "Asistente de Verificación KYC/AML",
    action: "Escalate",
    humanOversightRequired: true,
    status: "Active",
    version: "1.1.0",
    description: "Todas las alertas generadas por el sistema KYC/AML son revisadas por un analista de Cumplimiento antes de cualquier acción (bloqueo de cuenta, reporte a autoridades, etc.). El sistema proporciona la evidencia y el razonamiento como contexto. Conforme a 6AMLD y Ley 10/2010.",
    linkedRiskIds: ["RSK-010", "RSK-011"],
    changeHistory: [
      { version: "1.1.0", date: "2025-10-01", changedBy: "Andrés Molina", description: "Añadido SLA de revisión de 4 horas para alertas de alta prioridad" },
      { version: "1.0.0", date: "2024-05-20", changedBy: "Andrés Molina", description: "Despliegue inicial" },
    ],
    lastReviewedDate: "2026-01-08",
    lastReviewedBy: "Andrés Molina",
  },
  // AIS-011: Motor de Optimización de Precios de Seguros
  {
    id: "GRL-012",
    name: "Exclusión de Variables de Género y Proxies",
    category: "Compliance",
    aiSystemId: "AIS-011",
    aiSystemName: "Motor de Optimización de Precios de Seguros",
    action: "Block",
    humanOversightRequired: false,
    status: "Active",
    version: "1.0.0",
    description: "Bloquea el uso de la variable de género y de variables proxy identificadas (nombre, código postal de alta correlación con género, etc.) en el cálculo de primas. Conforme a Directiva 2004/113/CE y jurisprudencia Test-Achats (TJUE). Estado: INEFECTIVO – pendiente de revisión del modelo.",
    linkedRiskIds: ["RSK-012"],
    changeHistory: [
      { version: "1.0.0", date: "2025-06-01", changedBy: "Rosa Llopis", description: "Despliegue inicial" },
    ],
    lastReviewedDate: "2025-12-15",
    lastReviewedBy: "Alejandro Vidal",
  },
  // AIS-014: Asistente de Negociación de Deuda (Hardship)
  {
    id: "GRL-013",
    name: "Guardrail de Tono Empático y No Coercitivo",
    category: "Quality",
    aiSystemId: "AIS-014",
    aiSystemName: "Asistente de Negociación de Deuda (Hardship)",
    action: "Block",
    humanOversightRequired: false,
    status: "Active",
    version: "1.1.0",
    description: "Analiza las respuestas generadas antes de enviarlas al cliente para detectar y bloquear lenguaje coercitivo, amenazante o que pueda causar angustia. Incluye un clasificador de tono entrenado específicamente para contextos de hardship financiero. Bloquea frases como 'si no paga', 'consecuencias legales inmediatas' sin el contexto adecuado.",
    linkedRiskIds: ["RSK-014"],
    changeHistory: [
      { version: "1.1.0", date: "2026-01-10", changedBy: "Carmen Rodríguez", description: "Ampliado el diccionario de frases bloqueadas" },
      { version: "1.0.0", date: "2025-10-15", changedBy: "Jordi Puig", description: "Despliegue inicial" },
    ],
    lastReviewedDate: "2026-01-22",
    lastReviewedBy: "Carmen Rodríguez",
  },
  {
    id: "GRL-014",
    name: "Presentación Obligatoria de Derechos del Deudor",
    category: "Compliance",
    aiSystemId: "AIS-014",
    aiSystemName: "Asistente de Negociación de Deuda (Hardship)",
    action: "Block",
    humanOversightRequired: false,
    status: "Active",
    version: "1.0.0",
    description: "Al inicio de cada conversación de hardship, el agente debe presentar obligatoriamente un resumen de los derechos del deudor: posibilidad de solicitar moratoria, opciones de reestructuración, acceso a mediación y contacto con el Defensor del Cliente. Bloquea el avance a la negociación si no se ha presentado este resumen.",
    linkedRiskIds: ["RSK-015"],
    changeHistory: [
      { version: "1.0.0", date: "2025-10-15", changedBy: "Alejandro Vidal", description: "Despliegue inicial – requisito legal" },
    ],
    lastReviewedDate: "2026-01-22",
    lastReviewedBy: "Alejandro Vidal",
  },
  {
    id: "GRL-015",
    name: "Handoff Humano por Vulnerabilidad",
    category: "Compliance",
    aiSystemId: "AIS-014",
    aiSystemName: "Asistente de Negociación de Deuda (Hardship)",
    action: "Escalate",
    humanOversightRequired: true,
    status: "Active",
    version: "1.0.0",
    description: "Detecta indicadores de vulnerabilidad del cliente (menciones a problemas de salud, desempleo reciente, situación familiar difícil, signos de angustia) y activa el handoff inmediato al Equipo de Gestión de Hardship especializado. El cliente no puede ser retenido en el flujo automático.",
    linkedRiskIds: ["RSK-014"],
    changeHistory: [
      { version: "1.0.0", date: "2025-10-15", changedBy: "Carmen Rodríguez", description: "Despliegue inicial" },
    ],
    lastReviewedDate: "2026-01-22",
    lastReviewedBy: "Carmen Rodríguez",
  },
  // AIS-016: Simulador de Idoneidad MiFID II
  {
    id: "GRL-016",
    name: "Checklist de Completitud MiFID II",
    category: "Compliance",
    aiSystemId: "AIS-016",
    aiSystemName: "Simulador de Idoneidad de Inversiones (MiFID II)",
    action: "Block",
    humanOversightRequired: false,
    status: "Active",
    version: "1.0.0",
    description: "Bloquea la generación del informe de idoneidad si no se han completado todos los apartados requeridos por MiFID II: conocimientos y experiencia, situación financiera (ingresos, activos, pasivos), objetivos de inversión (horizonte temporal, tolerancia al riesgo, finalidad) y capacidad para soportar pérdidas.",
    linkedRiskIds: ["RSK-016"],
    changeHistory: [
      { version: "1.0.0", date: "2025-01-10", changedBy: "Enrique Palau", description: "Despliegue inicial" },
    ],
    lastReviewedDate: "2026-01-18",
    lastReviewedBy: "Alejandro Vidal",
  },
  {
    id: "GRL-017",
    name: "Firma Obligatoria del Asesor Certificado",
    category: "Compliance",
    aiSystemId: "AIS-016",
    aiSystemName: "Simulador de Idoneidad de Inversiones (MiFID II)",
    action: "Escalate",
    humanOversightRequired: true,
    status: "Active",
    version: "1.0.0",
    description: "Todo informe de idoneidad generado por el sistema requiere la revisión y firma digital del asesor financiero certificado (EFPA/EFA) antes de ser entregado al cliente o utilizado como base para una recomendación. El sistema no puede emitir recomendaciones de inversión de forma autónoma.",
    linkedRiskIds: ["RSK-016"],
    changeHistory: [
      { version: "1.0.0", date: "2025-01-10", changedBy: "Enrique Palau", description: "Despliegue inicial – requisito MiFID II" },
    ],
    lastReviewedDate: "2026-01-18",
    lastReviewedBy: "Enrique Palau",
  },
  // AIS-006: Agente Informativo de Tarjetas
  {
    id: "GRL-018",
    name: "Filtro de Contenido y Seguridad",
    category: "Security",
    aiSystemId: "AIS-006",
    aiSystemName: "Agente Informativo de Tarjetas (App Móvil)",
    action: "Block",
    humanOversightRequired: false,
    status: "Active",
    version: "3.1.0",
    description: "Capa de filtrado multi-nivel que bloquea respuestas dañinas, ofensivas o inapropiadas antes de su entrega al cliente. Incluye detección de desinformación financiera, lenguaje inapropiado y respuestas que excedan el ámbito informativo del agente.",
    linkedRiskIds: [],
    changeHistory: [
      { version: "3.1.0", date: "2026-01-05", changedBy: "Jordi Puig", description: "Actualización de modelos de detección de desinformación" },
      { version: "3.0.0", date: "2025-12-01", changedBy: "Jordi Puig", description: "Migración a Google Cloud Content Safety API" },
      { version: "1.0.0", date: "2025-07-15", changedBy: "Jordi Puig", description: "Despliegue inicial" },
    ],
    lastReviewedDate: "2026-01-10",
    lastReviewedBy: "Víctor Cano",
  },
  {
    id: "GRL-019",
    name: "Escalado por Intención de Contratación",
    category: "Compliance",
    aiSystemId: "AIS-006",
    aiSystemName: "Agente Informativo de Tarjetas (App Móvil)",
    action: "Escalate",
    humanOversightRequired: true,
    status: "Active",
    version: "1.2.0",
    description: "Detecta la intención de contratación del cliente y deriva a un especialista o al flujo de contratación asistida. El agente informativo no puede iniciar ni completar procesos de contratación. Garantiza la separación entre la función informativa y la función de contratación.",
    linkedRiskIds: [],
    changeHistory: [
      { version: "1.2.0", date: "2025-12-15", changedBy: "Nuria Camps", description: "Mejorada la detección de intención de contratación" },
      { version: "1.0.0", date: "2025-07-15", changedBy: "Nuria Camps", description: "Despliegue inicial" },
    ],
    lastReviewedDate: "2026-01-10",
    lastReviewedBy: "Nuria Camps",
  },
  // AIS-017: Sistema AML
  {
    id: "GRL-020",
    name: "Revisión Humana Obligatoria de Alertas AML",
    category: "Compliance",
    aiSystemId: "AIS-017",
    aiSystemName: "Sistema de Detección de Blanqueo de Capitales (AML)",
    action: "Escalate",
    humanOversightRequired: true,
    status: "Active",
    version: "2.0.0",
    description: "Todas las alertas generadas por el sistema AML son revisadas por un analista de Cumplimiento antes de cualquier acción. Ninguna acción (bloqueo de cuenta, reporte al SEPBLAC, etc.) puede ser iniciada de forma automática por el sistema. Conforme a Ley 10/2010 y 6AMLD.",
    linkedRiskIds: ["RSK-017"],
    changeHistory: [
      { version: "2.0.0", date: "2025-10-01", changedBy: "Andrés Molina", description: "Añadido SLA diferenciado: 1h para alertas críticas, 4h para alertas altas" },
      { version: "1.0.0", date: "2023-11-01", changedBy: "Andrés Molina", description: "Despliegue inicial" },
    ],
    lastReviewedDate: "2026-01-05",
    lastReviewedBy: "Andrés Molina",
  },
  // AIS-018: Copiloto Legal
  {
    id: "GRL-021",
    name: "Sanitización de Datos Confidenciales Pre-LLM",
    category: "Privacy",
    aiSystemId: "AIS-018",
    aiSystemName: "Copiloto de Redacción para el Área Legal",
    action: "Block",
    humanOversightRequired: false,
    status: "Active",
    version: "1.1.0",
    description: "Detecta y enmascara información confidencial de clientes, datos de estrategia legal y documentos privilegiados antes de enviarlos al modelo de lenguaje externo. Incluye detección de NIF, nombres de partes en litigio, importes de reclamaciones y referencias a procedimientos judiciales en curso.",
    linkedRiskIds: ["RSK-023"],
    changeHistory: [
      { version: "1.1.0", date: "2025-11-15", changedBy: "Jordi Puig", description: "Añadida detección de referencias a procedimientos judiciales" },
      { version: "1.0.0", date: "2025-09-01", changedBy: "Jordi Puig", description: "Despliegue inicial" },
    ],
    lastReviewedDate: "2025-12-20",
    lastReviewedBy: "Alejandro Vidal",
  },
  // AIS-009: Motor de Recomendación
  {
    id: "GRL-022",
    name: "Advice Boundary en Recomendaciones de Productos",
    category: "Compliance",
    aiSystemId: "AIS-009",
    aiSystemName: "Motor de Recomendación de Productos (Portal Web)",
    action: "Block",
    humanOversightRequired: false,
    status: "Active",
    version: "1.0.0",
    description: "Garantiza que las recomendaciones del motor no constituyan asesoramiento financiero personalizado. Bloquea la presentación de recomendaciones que incluyan afirmaciones sobre rentabilidad esperada, adecuación al perfil inversor o comparaciones de riesgo sin la base de un test de idoneidad/conveniencia.",
    linkedRiskIds: ["RSK-018"],
    changeHistory: [
      { version: "1.0.0", date: "2024-01-15", changedBy: "Silvia Roca", description: "Despliegue inicial" },
    ],
    lastReviewedDate: "2025-09-10",
    lastReviewedBy: "Alejandro Vidal",
  },
];
