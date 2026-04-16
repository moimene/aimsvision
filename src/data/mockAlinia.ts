// Alinia AI — Mock data for guardrail compliance simulation
// Simulates real-time interception of AI responses (MiFID II, GDPR, EU AI Act)

export type AliniaAction = "allowed" | "flagged" | "blocked";

export interface AliniaVerdict {
  status: AliniaAction;
  rule?: string;
  regulation?: string;
}

export interface AliniaEvent {
  id: string;
  timestamp: Date;
  aiSystemId: string;
  aiSystemName: string;
  action: AliniaAction;
  inputText: string;
  triggeredRule: string | null;
  regulation: string | null;
  severity: "high" | "medium" | "low" | null;
}

/**
 * Mock function that simulates Alinia guardrail check on text content.
 * Analyzes keywords to determine if content should be allowed, flagged, or blocked.
 */
export function mockAliniaCheck(text: string): AliniaVerdict {
  const lower = text.toLowerCase();

  const investmentKeywords = [
    "comprar", "vender", "invertir", "recomiend", "acción", "fondo",
    "rendimiento", "rentabilidad", "cartera", "portfolio", "bono",
  ];
  const piiKeywords = [
    "dni", "iban", "contraseña", "cuenta bancaria", "nif", "pasaporte",
    "tarjeta de crédito", "número de cuenta",
  ];
  const amlKeywords = [
    "blanqueo", "lavado de dinero", "paraíso fiscal", "offshore",
    "transferencia sospechosa",
  ];

  if (piiKeywords.some(k => lower.includes(k))) {
    return { status: "blocked", rule: "gdpr.pii-exposure", regulation: "GDPR" };
  }
  if (amlKeywords.some(k => lower.includes(k))) {
    return { status: "blocked", rule: "aml.suspicious-content", regulation: "AML/6AMLD" };
  }
  if (investmentKeywords.some(k => lower.includes(k))) {
    return { status: "flagged", rule: "mifid2.investment-advice", regulation: "MiFID II" };
  }
  return { status: "allowed" };
}

export const mockAliniaEvents: AliniaEvent[] = [
  {
    id: "ALN-001",
    timestamp: new Date(Date.now() - 120_000),
    aiSystemId: "AIS-001",
    aiSystemName: "Agente de Contratación de Préstamos al Consumo",
    action: "flagged",
    inputText: "¿Debería invertir en bonos del estado a largo plazo?",
    triggeredRule: "mifid2.investment-advice",
    regulation: "MiFID II",
    severity: "medium",
  },
  {
    id: "ALN-002",
    timestamp: new Date(Date.now() - 300_000),
    aiSystemId: "AIS-001",
    aiSystemName: "Agente de Contratación de Préstamos al Consumo",
    action: "allowed",
    inputText: "¿Qué dice el Art. 22 del EU AI Act sobre transparencia?",
    triggeredRule: null,
    regulation: null,
    severity: null,
  },
  {
    id: "ALN-003",
    timestamp: new Date(Date.now() - 600_000),
    aiSystemId: "AIS-004",
    aiSystemName: "Copiloto para Gestores de Banca Privada",
    action: "blocked",
    inputText: "Mi IBAN es ES91 2100 0418 4502 0005 1332",
    triggeredRule: "gdpr.pii-exposure",
    regulation: "GDPR",
    severity: "high",
  },
  {
    id: "ALN-004",
    timestamp: new Date(Date.now() - 900_000),
    aiSystemId: "AIS-004",
    aiSystemName: "Copiloto para Gestores de Banca Privada",
    action: "flagged",
    inputText: "¿Qué rentabilidad esperada tiene el fondo Garrigues Global Equity?",
    triggeredRule: "mifid2.investment-advice",
    regulation: "MiFID II",
    severity: "medium",
  },
  {
    id: "ALN-005",
    timestamp: new Date(Date.now() - 1_200_000),
    aiSystemId: "AIS-001",
    aiSystemName: "Agente de Contratación de Préstamos al Consumo",
    action: "allowed",
    inputText: "¿Cuáles son los requisitos de la SECCI para préstamos al consumo?",
    triggeredRule: null,
    regulation: null,
    severity: null,
  },
  {
    id: "ALN-006",
    timestamp: new Date(Date.now() - 1_800_000),
    aiSystemId: "AIS-008",
    aiSystemName: "Harvey — Asistente Jurídico IA",
    action: "blocked",
    inputText: "Necesito verificar el DNI del cliente 47382910K",
    triggeredRule: "gdpr.pii-exposure",
    regulation: "GDPR",
    severity: "high",
  },
  {
    id: "ALN-007",
    timestamp: new Date(Date.now() - 2_400_000),
    aiSystemId: "AIS-008",
    aiSystemName: "Harvey — Asistente Jurídico IA",
    action: "allowed",
    inputText: "¿Qué obligaciones impone el AI Act art. 14 sobre supervisión humana?",
    triggeredRule: null,
    regulation: null,
    severity: null,
  },
  {
    id: "ALN-008",
    timestamp: new Date(Date.now() - 3_600_000),
    aiSystemId: "AIS-004",
    aiSystemName: "Copiloto para Gestores de Banca Privada",
    action: "flagged",
    inputText: "Recomiéndame una cartera de inversión diversificada para perfil conservador",
    triggeredRule: "mifid2.investment-advice",
    regulation: "MiFID II",
    severity: "medium",
  },
];

export const mockAliniaStats = {
  total: 847,
  allowed: 801,
  flagged: 38,
  blocked: 8,
  topRule: "mifid2.investment-advice",
};
