import { StatusType } from "@/components/indicators";

export type RiskStatus = "Open" | "Mitigated" | "Accepted" | "Transferred";
export type RiskCategory = "Fairness" | "Accuracy" | "Transparency" | "Safety" | "Privacy" | "Accountability" | "Robustness" | "Security" | "Ethics" | "Vendor" | "Operations";

export interface LinkedControl {
  id: string;
  name: string;
  effectiveness: "Effective" | "Partially Effective" | "Ineffective" | "Not Tested";
}

export interface TestEvidence {
  id: string;
  testName: string;
  testDate: string;
  result: "Pass" | "Fail" | "Warning";
  source: string;
}

export interface AcceptanceRecord {
  acceptedBy: string;
  acceptedDate: string;
  expiryDate: string;
  rationale: string;
  conditions?: string;
}

export interface RiskEntry {
  id: string;
  description: string;
  aiSystemId: string;
  aiSystemName: string;
  category: RiskCategory;
  impact: 1 | 2 | 3 | 4 | 5;
  probability: 1 | 2 | 3 | 4 | 5;
  score: number;
  residualRisk: number;
  status: RiskStatus;
  owner: string;
  reviewDate: string;
  linkedControls: LinkedControl[];
  testEvidence: TestEvidence[];
  acceptanceRecord?: AcceptanceRecord;
  galteaMetrics?: {
    driftScore?: number;
    fairnessScore?: number;
    accuracyScore?: number;
    lastUpdated?: string;
  };
}

export const riskStatusMapping: Record<RiskStatus, { status: StatusType; text: string }> = {
  "Open": { status: "critical", text: "Abierto" },
  "Mitigated": { status: "success", text: "Mitigado" },
  "Accepted": { status: "warning", text: "Aceptado" },
  "Transferred": { status: "neutral", text: "Transferido" },
};

export const impactLabels: Record<number, string> = {
  1: "Insignificante",
  2: "Menor",
  3: "Moderado",
  4: "Mayor",
  5: "Catastrófico",
};

export const probabilityLabels: Record<number, string> = {
  1: "Improbable",
  2: "Poco probable",
  3: "Posible",
  4: "Probable",
  5: "Casi seguro",
};

export const riskCategories: RiskCategory[] = [
  "Fairness", "Accuracy", "Transparency", "Safety", "Privacy",
  "Accountability", "Robustness", "Security", "Ethics", "Vendor", "Operations"
];

export const riskData: RiskEntry[] = [
  // AIS-001: Agente de Contratación de Préstamos al Consumo
  {
    id: "RSK-001",
    description: "Completitud precontractual insuficiente: el agente puede avanzar en la contratación sin haber presentado todos los elementos SECCI requeridos por la Directiva (UE) 2023/2225.",
    aiSystemId: "AIS-001",
    aiSystemName: "Agente de Contratación de Préstamos al Consumo",
    category: "Transparency",
    impact: 5,
    probability: 2,
    score: 10,
    residualRisk: 3,
    status: "Mitigated",
    owner: "Carmen Rodríguez",
    reviewDate: "2026-03-15",
    linkedControls: [
      { id: "GRL-001", name: "Guardrail de Completitud Precontractual (SECCI)", effectiveness: "Effective" },
      { id: "GRL-002", name: "Bloqueo de confirmación sin aceptación SECCI", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-001", testName: "Test de completitud SECCI – g-digital Q1 2026", testDate: "2026-02-15", result: "Pass", source: "g-digital" },
    ],
    galteaMetrics: { accuracyScore: 98, driftScore: 2, lastUpdated: "2026-02-28" },
  },
  {
    id: "RSK-002",
    description: "Riesgo de prompt injection: un usuario malintencionado podría intentar manipular las instrucciones del agente para obtener condiciones no autorizadas o información confidencial del sistema.",
    aiSystemId: "AIS-001",
    aiSystemName: "Agente de Contratación de Préstamos al Consumo",
    category: "Security",
    impact: 4,
    probability: 2,
    score: 8,
    residualRisk: 3,
    status: "Mitigated",
    owner: "Jordi Puig",
    reviewDate: "2026-04-01",
    linkedControls: [
      { id: "GRL-003", name: "Guardrail de Detección de Prompt Injection", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-002", testName: "Red team exercise – Prompt Injection", testDate: "2026-02-10", result: "Pass", source: "g-digital" },
    ],
  },
  // AIS-002: Motor de Detección de Fraude en Tarjetas v3
  {
    id: "RSK-003",
    description: "Deriva del modelo (model drift) por cambios en patrones de gasto estacionales o nuevas tipologías de fraude no representadas en el entrenamiento, que incrementan la tasa de falsos positivos.",
    aiSystemId: "AIS-002",
    aiSystemName: "Motor de Detección de Fraude en Tarjetas v3",
    category: "Accuracy",
    impact: 5,
    probability: 3,
    score: 15,
    residualRisk: 5,
    status: "Mitigated",
    owner: "Rafael Montoya",
    reviewDate: "2026-03-01",
    linkedControls: [
      { id: "GRL-004", name: "Monitorización semanal de deriva del modelo", effectiveness: "Effective" },
      { id: "GRL-005", name: "Reentrenamiento automático por umbral de drift", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-003", testName: "Análisis de deriva – Enero 2026", testDate: "2026-01-20", result: "Pass", source: "g-digital" },
    ],
    galteaMetrics: { accuracyScore: 97, driftScore: 6, lastUpdated: "2026-02-25" },
  },
  {
    id: "RSK-004",
    description: "Sesgo geográfico en la detección de fraude: el modelo puede mostrar tasas de falsos positivos desproporcionadas para transacciones en determinadas regiones o países, afectando la experiencia de clientes que viajan.",
    aiSystemId: "AIS-002",
    aiSystemName: "Motor de Detección de Fraude en Tarjetas v3",
    category: "Fairness",
    impact: 3,
    probability: 3,
    score: 9,
    residualRisk: 4,
    status: "Mitigated",
    owner: "Isabel Ferrer",
    reviewDate: "2026-04-15",
    linkedControls: [
      { id: "GRL-006", name: "Auditoría de equidad geográfica trimestral", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-004", testName: "Análisis de disparidad geográfica Q4 2025", testDate: "2025-12-10", result: "Pass", source: "g-digital" },
    ],
    galteaMetrics: { fairnessScore: 88, lastUpdated: "2026-02-25" },
  },
  // AIS-003: Clasificador de Documentación Hipotecaria
  {
    id: "RSK-005",
    description: "Clasificación incorrecta de documentos hipotecarios críticos (ej. tasaciones, escrituras) que podría retrasar la aprobación o generar errores en la evaluación del riesgo.",
    aiSystemId: "AIS-003",
    aiSystemName: "Clasificador de Documentación Hipotecaria",
    category: "Accuracy",
    impact: 4,
    probability: 2,
    score: 8,
    residualRisk: 3,
    status: "Mitigated",
    owner: "Lucía Martínez",
    reviewDate: "2026-05-01",
    linkedControls: [
      { id: "GRL-007", name: "Umbral de confianza del 75% con revisión humana", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-005", testName: "Test de precisión por categoría documental", testDate: "2025-12-05", result: "Pass", source: "Internal" },
    ],
    galteaMetrics: { accuracyScore: 94, driftScore: 4, lastUpdated: "2026-01-15" },
  },
  // AIS-004: Copiloto para Gestores de Banca Privada
  {
    id: "RSK-006",
    description: "Transgresión del advice boundary MiFID II: el copiloto podría generar recomendaciones de inversión personalizadas sin que se haya completado el test de idoneidad, incurriendo en infracción regulatoria.",
    aiSystemId: "AIS-004",
    aiSystemName: "Copiloto para Gestores de Banca Privada",
    category: "Transparency",
    impact: 5,
    probability: 3,
    score: 15,
    residualRisk: 8,
    status: "Open",
    owner: "Enrique Palau",
    reviewDate: "2026-03-01",
    linkedControls: [
      { id: "GRL-008", name: "Guardrail de Advice Boundary MiFID II", effectiveness: "Partially Effective" },
      { id: "GRL-009", name: "Disclaimer obligatorio en toda salida de inversión", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-006", testName: "Test de advice boundary – Escenarios MiFID II", testDate: "2026-01-18", result: "Warning", source: "g-digital" },
    ],
    galteaMetrics: { accuracyScore: 85, driftScore: 12, lastUpdated: "2026-02-20" },
  },
  {
    id: "RSK-007",
    description: "Fuga de información confidencial de clientes de banca privada a través del contexto del LLM o de los logs del sistema.",
    aiSystemId: "AIS-004",
    aiSystemName: "Copiloto para Gestores de Banca Privada",
    category: "Privacy",
    impact: 5,
    probability: 2,
    score: 10,
    residualRisk: 4,
    status: "Mitigated",
    owner: "Jordi Puig",
    reviewDate: "2026-04-01",
    linkedControls: [
      { id: "GRL-010", name: "Sanitización de PII en logs y contexto", effectiveness: "Effective" },
      { id: "GRL-011", name: "Aislamiento de contexto por sesión", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-007", testName: "Auditoría de privacidad – Copiloto BP", testDate: "2026-01-10", result: "Pass", source: "Internal" },
    ],
  },
  // AIS-007: Modelo de Scoring de Crédito para Pymes
  {
    id: "RSK-008",
    description: "Sesgo sectorial en el modelo de scoring: empresas de sectores con alta variabilidad estacional (hostelería, turismo) pueden recibir scores sistemáticamente inferiores no justificados por su riesgo real.",
    aiSystemId: "AIS-007",
    aiSystemName: "Modelo de Scoring de Crédito para Pymes",
    category: "Fairness",
    impact: 5,
    probability: 3,
    score: 15,
    residualRisk: 10,
    status: "Open",
    owner: "Francesc Bosch",
    reviewDate: "2026-03-15",
    linkedControls: [
      { id: "GRL-012", name: "Ajuste de estacionalidad por sector CNAE", effectiveness: "Partially Effective" },
      { id: "GRL-013", name: "Revisión humana de todas las denegaciones", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-008", testName: "Análisis de disparidad por sector CNAE", testDate: "2026-01-20", result: "Warning", source: "g-digital" },
    ],
    galteaMetrics: { fairnessScore: 72, accuracyScore: 89, driftScore: 14, lastUpdated: "2026-02-20" },
  },
  {
    id: "RSK-009",
    description: "Fallo del módulo de explicabilidad SHAP: si el módulo falla silenciosamente, se podrían emitir denegaciones de crédito sin la explicación requerida por el AI Act (Art. 86) y la normativa de crédito.",
    aiSystemId: "AIS-007",
    aiSystemName: "Modelo de Scoring de Crédito para Pymes",
    category: "Transparency",
    impact: 5,
    probability: 2,
    score: 10,
    residualRisk: 3,
    status: "Mitigated",
    owner: "Francesc Bosch",
    reviewDate: "2026-04-01",
    linkedControls: [
      { id: "GRL-014", name: "Bloqueo de decisión sin documento SHAP validado", effectiveness: "Effective" },
      { id: "GRL-015", name: "Test de integración de SHAP en pipeline CI/CD", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-009", testName: "Test de integridad del módulo SHAP", testDate: "2026-01-15", result: "Pass", source: "Internal" },
    ],
  },
  // AIS-010: Asistente de Verificación KYC/AML
  {
    id: "RSK-010",
    description: "Falsos negativos en la verificación KYC: el sistema podría no detectar documentos de identidad falsificados con técnicas avanzadas (deepfake de documentos), permitiendo el onboarding de clientes fraudulentos.",
    aiSystemId: "AIS-010",
    aiSystemName: "Asistente de Verificación KYC/AML",
    category: "Accuracy",
    impact: 5,
    probability: 2,
    score: 10,
    residualRisk: 5,
    status: "Mitigated",
    owner: "Andrés Molina",
    reviewDate: "2026-03-01",
    linkedControls: [
      { id: "GRL-016", name: "Revisión humana de todos los casos de riesgo alto", effectiveness: "Effective" },
      { id: "GRL-017", name: "Actualización mensual de base de datos de fraude documental", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-010", testName: "Test de robustez ante documentos falsificados", testDate: "2026-01-08", result: "Warning", source: "g-digital" },
    ],
    galteaMetrics: { accuracyScore: 91, driftScore: 8, lastUpdated: "2026-02-15" },
  },
  {
    id: "RSK-011",
    description: "Sesgo en la detección de AML por perfil de cliente: el sistema podría generar tasas de alerta desproporcionadas para determinados perfiles demográficos o nacionales, generando discriminación indirecta.",
    aiSystemId: "AIS-010",
    aiSystemName: "Asistente de Verificación KYC/AML",
    category: "Fairness",
    impact: 4,
    probability: 3,
    score: 12,
    residualRisk: 6,
    status: "Open",
    owner: "Isabel Ferrer",
    reviewDate: "2026-04-01",
    linkedControls: [
      { id: "GRL-018", name: "Auditoría de equidad por perfil demográfico semestral", effectiveness: "Partially Effective" },
    ],
    testEvidence: [
      { id: "TST-011", testName: "Análisis de disparidad demográfica en alertas AML", testDate: "2025-12-20", result: "Warning", source: "g-digital" },
    ],
    galteaMetrics: { fairnessScore: 78, lastUpdated: "2026-01-20" },
  },
  // AIS-011: Motor de Optimización de Precios de Seguros
  {
    id: "RSK-012",
    description: "Discriminación por género en la tarificación de seguros: el modelo podría utilizar variables proxy que correlacionen con el género, infringiendo la Directiva 2004/113/CE y jurisprudencia del TJUE (Test-Achats).",
    aiSystemId: "AIS-011",
    aiSystemName: "Motor de Optimización de Precios de Seguros",
    category: "Fairness",
    impact: 5,
    probability: 4,
    score: 20,
    residualRisk: 18,
    status: "Open",
    owner: "Rosa Llopis",
    reviewDate: "2026-03-01",
    linkedControls: [
      { id: "GRL-019", name: "Exclusión de variables de género y proxies", effectiveness: "Ineffective" },
    ],
    testEvidence: [
      { id: "TST-012", testName: "Auditoría actuarial de equidad de género", testDate: "2025-12-15", result: "Fail", source: "g-digital" },
    ],
    galteaMetrics: { fairnessScore: 52, accuracyScore: 84, lastUpdated: "2026-01-10" },
  },
  {
    id: "RSK-013",
    description: "Falta de transparencia en la determinación de primas: los clientes no reciben una explicación comprensible de los factores que determinan su prima, incumpliendo los requisitos de transparencia del AI Act.",
    aiSystemId: "AIS-011",
    aiSystemName: "Motor de Optimización de Precios de Seguros",
    category: "Transparency",
    impact: 4,
    probability: 4,
    score: 16,
    residualRisk: 14,
    status: "Open",
    owner: "Rosa Llopis",
    reviewDate: "2026-03-01",
    linkedControls: [
      { id: "GRL-020", name: "Generación de explicación de prima para el cliente", effectiveness: "Ineffective" },
    ],
    testEvidence: [
      { id: "TST-013", testName: "Test de comprensibilidad de explicaciones de prima", testDate: "2025-11-20", result: "Fail", source: "Internal" },
    ],
  },
  // AIS-014: Asistente de Negociación de Deuda (Hardship)
  {
    id: "RSK-014",
    description: "Uso de lenguaje coercitivo o inadecuado con clientes en situación de vulnerabilidad financiera, que podría causar daño psicológico o inducir a decisiones perjudiciales para el cliente.",
    aiSystemId: "AIS-014",
    aiSystemName: "Asistente de Negociación de Deuda (Hardship)",
    category: "Safety",
    impact: 4,
    probability: 2,
    score: 8,
    residualRisk: 3,
    status: "Mitigated",
    owner: "Carmen Rodríguez",
    reviewDate: "2026-04-15",
    linkedControls: [
      { id: "GRL-021", name: "Guardrail de tono empático y lenguaje no coercitivo", effectiveness: "Effective" },
      { id: "GRL-022", name: "Handoff humano ante detección de vulnerabilidad", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-014", testName: "Test de tono y lenguaje – Escenarios de hardship", testDate: "2026-01-20", result: "Pass", source: "g-digital" },
    ],
  },
  {
    id: "RSK-015",
    description: "Incumplimiento de la obligación de informar sobre derechos del deudor (moratoria, reestructuración, mediación) antes de proponer acuerdos de pago.",
    aiSystemId: "AIS-014",
    aiSystemName: "Asistente de Negociación de Deuda (Hardship)",
    category: "Transparency",
    impact: 4,
    probability: 2,
    score: 8,
    residualRisk: 2,
    status: "Mitigated",
    owner: "Carmen Rodríguez",
    reviewDate: "2026-04-15",
    linkedControls: [
      { id: "GRL-023", name: "Presentación obligatoria de derechos del deudor al inicio", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-015", testName: "Test de completitud de información de derechos", testDate: "2026-01-22", result: "Pass", source: "Internal" },
    ],
  },
  // AIS-016: Simulador de Idoneidad de Inversiones (MiFID II)
  {
    id: "RSK-016",
    description: "Evaluación de idoneidad incompleta: el sistema podría generar informes de idoneidad sin haber recabado toda la información requerida por MiFID II (conocimientos, experiencia, situación financiera, objetivos).",
    aiSystemId: "AIS-016",
    aiSystemName: "Simulador de Idoneidad de Inversiones (MiFID II)",
    category: "Transparency",
    impact: 5,
    probability: 3,
    score: 15,
    residualRisk: 8,
    status: "Open",
    owner: "Enrique Palau",
    reviewDate: "2026-03-15",
    linkedControls: [
      { id: "GRL-024", name: "Checklist de completitud MiFID II antes de generar informe", effectiveness: "Partially Effective" },
      { id: "GRL-025", name: "Firma obligatoria del asesor certificado", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-016", testName: "Auditoría de conformidad MiFID II – Q4 2025", testDate: "2025-12-20", result: "Warning", source: "g-digital" },
    ],
    galteaMetrics: { accuracyScore: 87, driftScore: 11, lastUpdated: "2026-02-10" },
  },
  // AIS-017: Sistema de Detección de Blanqueo de Capitales (AML)
  {
    id: "RSK-017",
    description: "Alta tasa de falsos positivos en la detección de AML que genera una carga operativa excesiva para el equipo de Cumplimiento y puede llevar a la desensibilización ante alertas reales.",
    aiSystemId: "AIS-017",
    aiSystemName: "Sistema de Detección de Blanqueo de Capitales (AML)",
    category: "Accuracy",
    impact: 4,
    probability: 3,
    score: 12,
    residualRisk: 6,
    status: "Mitigated",
    owner: "Andrés Molina",
    reviewDate: "2026-04-01",
    linkedControls: [
      { id: "GRL-026", name: "Calibración mensual de umbrales de alerta", effectiveness: "Effective" },
      { id: "GRL-027", name: "Métricas de precisión/recall en dashboard de Cumplimiento", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-017", testName: "Análisis de calidad de alertas AML – Enero 2026", testDate: "2026-01-25", result: "Pass", source: "Internal" },
    ],
    galteaMetrics: { accuracyScore: 82, driftScore: 9, lastUpdated: "2026-02-15" },
  },
  // AIS-009: Motor de Recomendación de Productos
  {
    id: "RSK-018",
    description: "Efecto de cámara de eco (filter bubble): el motor de recomendación podría limitar la exposición de clientes a productos que no encajan en su perfil histórico, reduciendo la diversidad de la oferta percibida.",
    aiSystemId: "AIS-009",
    aiSystemName: "Motor de Recomendación de Productos (Portal Web)",
    category: "Fairness",
    impact: 2,
    probability: 4,
    score: 8,
    residualRisk: 5,
    status: "Accepted",
    owner: "Silvia Roca",
    reviewDate: "2026-07-01",
    linkedControls: [
      { id: "GRL-028", name: "Inyección de diversidad en recomendaciones (20%)", effectiveness: "Partially Effective" },
    ],
    testEvidence: [
      { id: "TST-018", testName: "Auditoría de diversidad de recomendaciones", testDate: "2025-10-15", result: "Warning", source: "Internal" },
    ],
    acceptanceRecord: {
      acceptedBy: "Director de Marketing Digital",
      acceptedDate: "2025-11-01",
      expiryDate: "2026-07-01",
      rationale: "El impacto en el negocio es menor y los controles de diversidad mitigan parcialmente el riesgo. Se revisará en el próximo ciclo.",
    },
  },
  // AIS-019: Priorizador de Alertas de Ciberseguridad
  {
    id: "RSK-019",
    description: "Supresión de alertas legítimas de seguridad por el modelo de priorización, que podría retrasar la respuesta ante incidentes de seguridad reales.",
    aiSystemId: "AIS-019",
    aiSystemName: "Priorizador de Alertas de Ciberseguridad",
    category: "Safety",
    impact: 5,
    probability: 2,
    score: 10,
    residualRisk: 4,
    status: "Mitigated",
    owner: "Víctor Cano",
    reviewDate: "2026-05-01",
    linkedControls: [
      { id: "GRL-029", name: "Revisión humana obligatoria de alertas críticas y altas", effectiveness: "Effective" },
      { id: "GRL-030", name: "Monitorización de tasa de falsos negativos del priorizador", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-019", testName: "Test de cobertura de alertas críticas", testDate: "2025-11-10", result: "Pass", source: "Internal" },
    ],
    galteaMetrics: { accuracyScore: 95, driftScore: 5, lastUpdated: "2026-01-20" },
  },
  // AIS-022: Modelo de Predicción de Fuga de Clientes
  {
    id: "RSK-020",
    description: "Uso de datos personales sensibles sin base legal adecuada para el entrenamiento del modelo de predicción de fuga, incumpliendo el RGPD.",
    aiSystemId: "AIS-022",
    aiSystemName: "Modelo de Predicción de Fuga de Clientes",
    category: "Privacy",
    impact: 4,
    probability: 3,
    score: 12,
    residualRisk: 12,
    status: "Open",
    owner: "Marta Soler",
    reviewDate: "2026-03-15",
    linkedControls: [],
    testEvidence: [],
  },
  // AIS-005: Mantenimiento Predictivo ATMs
  {
    id: "RSK-021",
    description: "Datos de entrenamiento insuficientes para modos de fallo poco frecuentes en modelos de ATM de nueva generación, reduciendo la precisión predictiva.",
    aiSystemId: "AIS-005",
    aiSystemName: "Sistema de Mantenimiento Predictivo de ATMs",
    category: "Accuracy",
    impact: 3,
    probability: 2,
    score: 6,
    residualRisk: 4,
    status: "Accepted",
    owner: "Tomàs Girona",
    reviewDate: "2026-06-01",
    linkedControls: [
      { id: "GRL-031", name: "Inspección manual de fallback para ATMs categoría A", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-020", testName: "Test de cobertura de modos de fallo raros", testDate: "2025-10-20", result: "Warning", source: "Internal" },
    ],
    acceptanceRecord: {
      acceptedBy: "Director de Operaciones",
      acceptedDate: "2025-11-15",
      expiryDate: "2026-06-01",
      rationale: "El riesgo residual es aceptable dado el procedimiento de inspección manual de respaldo y la baja probabilidad de los modos de fallo raros.",
      conditions: "Revisión trimestral de la precisión predictiva obligatoria.",
    },
  },
  // AIS-015: Validador de Comercio Exterior
  {
    id: "RSK-022",
    description: "Interpretación errónea de cláusulas de Incoterms o UCP 600 en documentos de comercio exterior, generando discrepancias no detectadas que podrían resultar en pérdidas financieras.",
    aiSystemId: "AIS-015",
    aiSystemName: "Validador de Documentos de Comercio Exterior",
    category: "Accuracy",
    impact: 4,
    probability: 2,
    score: 8,
    residualRisk: 3,
    status: "Mitigated",
    owner: "Miquel Serra",
    reviewDate: "2026-05-01",
    linkedControls: [
      { id: "GRL-032", name: "Revisión humana de especialista para operaciones > 500.000 EUR", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-021", testName: "Test de precisión en validación de Incoterms", testDate: "2025-12-01", result: "Pass", source: "Internal" },
    ],
  },
  // AIS-018: Copiloto Legal
  {
    id: "RSK-023",
    description: "Fuga de información confidencial de clientes o de estrategia legal a través del proveedor de LLM externo (OpenAI), con riesgo de violación del secreto profesional.",
    aiSystemId: "AIS-018",
    aiSystemName: "Copiloto de Redacción para el Área Legal",
    category: "Privacy",
    impact: 5,
    probability: 2,
    score: 10,
    residualRisk: 3,
    status: "Mitigated",
    owner: "Alejandro Vidal",
    reviewDate: "2026-04-01",
    linkedControls: [
      { id: "GRL-033", name: "Sanitización de PII y datos confidenciales antes de envío al LLM", effectiveness: "Effective" },
      { id: "GRL-034", name: "Acuerdo de procesamiento de datos (DPA) con OpenAI", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-022", testName: "Auditoría de privacidad del Copiloto Legal", testDate: "2025-12-10", result: "Pass", source: "Internal" },
    ],
  },
  // AIS-020: Analizador de Disputas
  {
    id: "RSK-024",
    description: "Sesgo en las recomendaciones de resolución de disputas que favorezca sistemáticamente a la entidad sobre el cliente, generando resoluciones injustas y reclamaciones ante el Banco de España.",
    aiSystemId: "AIS-020",
    aiSystemName: "Analizador de Disputas de Pagos con Tarjeta",
    category: "Fairness",
    impact: 3,
    probability: 3,
    score: 9,
    residualRisk: 4,
    status: "Mitigated",
    owner: "Rafael Montoya",
    reviewDate: "2026-05-15",
    linkedControls: [
      { id: "GRL-035", name: "Auditoría de equidad en resoluciones trimestralmente", effectiveness: "Effective" },
      { id: "GRL-036", name: "El agente proporciona recomendación; el humano decide siempre", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-023", testName: "Análisis de equidad en resoluciones de disputas", testDate: "2025-12-15", result: "Pass", source: "g-digital" },
    ],
    galteaMetrics: { fairnessScore: 91, lastUpdated: "2026-01-15" },
  },
];
