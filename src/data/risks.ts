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
  "Open": { status: "critical", text: "Open" },
  "Mitigated": { status: "success", text: "Mitigated" },
  "Accepted": { status: "warning", text: "Accepted" },
  "Transferred": { status: "neutral", text: "Transferred" },
};

export const impactLabels: Record<number, string> = {
  1: "Negligible",
  2: "Minor",
  3: "Moderate",
  4: "Major",
  5: "Catastrophic",
};

export const probabilityLabels: Record<number, string> = {
  1: "Rare",
  2: "Unlikely",
  3: "Possible",
  4: "Likely",
  5: "Almost Certain",
};

export const riskCategories: RiskCategory[] = [
  "Fairness", "Accuracy", "Transparency", "Safety", "Privacy", 
  "Accountability", "Robustness", "Security", "Ethics", "Vendor", "Operations"
];

export const riskData: RiskEntry[] = [
  {
    id: "RSK-001",
    description: "Bias in sentiment classification affecting customer demographics",
    aiSystemId: "AIS-001",
    aiSystemName: "Customer Sentiment Analyzer",
    category: "Fairness",
    impact: 4,
    probability: 3,
    score: 12,
    residualRisk: 8,
    status: "Open",
    owner: "Sarah Chen",
    reviewDate: "2026-02-15",
    linkedControls: [
      { id: "CTL-001", name: "Bias testing pipeline", effectiveness: "Partially Effective" },
      { id: "CTL-002", name: "Demographic parity monitoring", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-001", testName: "Fairness audit Q4 2025", testDate: "2025-12-10", result: "Warning", source: "Galtea" },
    ],
    galteaMetrics: { fairnessScore: 72, driftScore: 15, lastUpdated: "2026-01-20" },
  },
  {
    id: "RSK-002",
    description: "Model drift causing increased false positives in fraud detection",
    aiSystemId: "AIS-002",
    aiSystemName: "Fraud Detection Model v2",
    category: "Accuracy",
    impact: 5,
    probability: 2,
    score: 10,
    residualRisk: 4,
    status: "Mitigated",
    owner: "James Wilson",
    reviewDate: "2026-03-01",
    linkedControls: [
      { id: "CTL-003", name: "Weekly drift monitoring", effectiveness: "Effective" },
      { id: "CTL-004", name: "Automated retraining trigger", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-002", testName: "Drift analysis Jan 2026", testDate: "2026-01-15", result: "Pass", source: "Galtea" },
    ],
    galteaMetrics: { accuracyScore: 94, driftScore: 8, lastUpdated: "2026-01-22" },
  },
  {
    id: "RSK-003",
    description: "Inadequate explainability for legal document decisions",
    aiSystemId: "AIS-003",
    aiSystemName: "Document Classification Engine",
    category: "Transparency",
    impact: 3,
    probability: 3,
    score: 9,
    residualRisk: 4,
    status: "Mitigated",
    owner: "Maria Garcia",
    reviewDate: "2026-04-01",
    linkedControls: [
      { id: "CTL-005", name: "SHAP explanations module", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-003", testName: "Explainability review", testDate: "2025-11-20", result: "Pass", source: "Internal" },
    ],
  },
  {
    id: "RSK-004",
    description: "Discriminatory patterns in candidate screening outcomes",
    aiSystemId: "AIS-004",
    aiSystemName: "HR Screening Assistant",
    category: "Fairness",
    impact: 5,
    probability: 4,
    score: 20,
    residualRisk: 16,
    status: "Open",
    owner: "David Park",
    reviewDate: "2026-01-30",
    linkedControls: [
      { id: "CTL-006", name: "Protected attribute removal", effectiveness: "Ineffective" },
      { id: "CTL-007", name: "Human review for all rejections", effectiveness: "Partially Effective" },
    ],
    testEvidence: [
      { id: "TST-004", testName: "Adverse impact analysis", testDate: "2026-01-10", result: "Fail", source: "Galtea" },
    ],
    galteaMetrics: { fairnessScore: 48, accuracyScore: 82, lastUpdated: "2026-01-18" },
  },
  {
    id: "RSK-005",
    description: "Insufficient training data for rare equipment failure modes",
    aiSystemId: "AIS-005",
    aiSystemName: "Predictive Maintenance System",
    category: "Accuracy",
    impact: 4,
    probability: 2,
    score: 8,
    residualRisk: 6,
    status: "Accepted",
    owner: "Lisa Thompson",
    reviewDate: "2026-06-01",
    linkedControls: [
      { id: "CTL-008", name: "Manual inspection fallback", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-005", testName: "Edge case coverage", testDate: "2025-10-15", result: "Warning", source: "Internal" },
    ],
    acceptanceRecord: {
      acceptedBy: "Chief Operations Officer",
      acceptedDate: "2025-11-01",
      expiryDate: "2026-06-01",
      rationale: "Risk accepted due to manual backup procedures and low probability of rare failure modes.",
      conditions: "Quarterly review of prediction accuracy required.",
    },
  },
  {
    id: "RSK-006",
    description: "Potential for harmful response generation in edge cases",
    aiSystemId: "AIS-006",
    aiSystemName: "Chatbot - Customer Support",
    category: "Safety",
    impact: 3,
    probability: 2,
    score: 6,
    residualRisk: 3,
    status: "Mitigated",
    owner: "Tom Anderson",
    reviewDate: "2026-05-01",
    linkedControls: [
      { id: "CTL-009", name: "Content filter layer", effectiveness: "Effective" },
      { id: "CTL-010", name: "Escalation to human agent", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-006", testName: "Red team exercise", testDate: "2025-12-05", result: "Pass", source: "Internal" },
    ],
  },
  {
    id: "RSK-007",
    description: "Socioeconomic bias in credit risk assessment",
    aiSystemId: "AIS-007",
    aiSystemName: "Credit Scoring Model",
    category: "Fairness",
    impact: 5,
    probability: 3,
    score: 15,
    residualRisk: 12,
    status: "Open",
    owner: "Jennifer Lee",
    reviewDate: "2026-02-01",
    linkedControls: [
      { id: "CTL-011", name: "Fair lending compliance check", effectiveness: "Partially Effective" },
    ],
    testEvidence: [
      { id: "TST-007", testName: "Disparate impact test", testDate: "2026-01-05", result: "Fail", source: "Galtea" },
    ],
    galteaMetrics: { fairnessScore: 61, accuracyScore: 88, lastUpdated: "2026-01-20" },
  },
  {
    id: "RSK-008",
    description: "Over-reliance on historical data during supply disruptions",
    aiSystemId: "AIS-008",
    aiSystemName: "Supply Chain Optimizer",
    category: "Robustness",
    impact: 3,
    probability: 3,
    score: 9,
    residualRisk: 4,
    status: "Mitigated",
    owner: "Robert Kim",
    reviewDate: "2026-04-15",
    linkedControls: [
      { id: "CTL-012", name: "Scenario planning module", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-008", testName: "Stress test simulation", testDate: "2025-11-10", result: "Pass", source: "Internal" },
    ],
  },
  {
    id: "RSK-009",
    description: "Filter bubble effects reducing content diversity",
    aiSystemId: "AIS-009",
    aiSystemName: "Content Recommendation Engine",
    category: "Fairness",
    impact: 2,
    probability: 4,
    score: 8,
    residualRisk: 6,
    status: "Accepted",
    owner: "Emma Davis",
    reviewDate: "2026-07-01",
    linkedControls: [
      { id: "CTL-013", name: "Diversity injection", effectiveness: "Partially Effective" },
    ],
    testEvidence: [
      { id: "TST-009", testName: "Content diversity audit", testDate: "2025-09-20", result: "Warning", source: "Internal" },
    ],
    acceptanceRecord: {
      acceptedBy: "VP Marketing",
      acceptedDate: "2025-10-01",
      expiryDate: "2026-07-01",
      rationale: "Business impact is minor; diversity controls partially address the issue.",
    },
  },
  {
    id: "RSK-010",
    description: "Misdiagnosis risk in rare disease presentation",
    aiSystemId: "AIS-010",
    aiSystemName: "Medical Diagnosis Assistant",
    category: "Safety",
    impact: 5,
    probability: 3,
    score: 15,
    residualRisk: 12,
    status: "Open",
    owner: "Dr. Michael Brown",
    reviewDate: "2026-02-01",
    linkedControls: [
      { id: "CTL-014", name: "Physician confirmation required", effectiveness: "Effective" },
      { id: "CTL-015", name: "Confidence threshold alerts", effectiveness: "Partially Effective" },
    ],
    testEvidence: [
      { id: "TST-010", testName: "Rare disease accuracy", testDate: "2026-01-08", result: "Warning", source: "Galtea" },
    ],
    galteaMetrics: { accuracyScore: 76, driftScore: 22, lastUpdated: "2026-01-19" },
  },
  {
    id: "RSK-011",
    description: "Price manipulation concerns in dynamic pricing",
    aiSystemId: "AIS-011",
    aiSystemName: "Price Optimization Engine",
    category: "Ethics",
    impact: 4,
    probability: 2,
    score: 8,
    residualRisk: 8,
    status: "Open",
    owner: "Alex Martinez",
    reviewDate: "2026-03-15",
    linkedControls: [],
    testEvidence: [],
  },
  {
    id: "RSK-012",
    description: "Data leakage through OCR processing logs",
    aiSystemId: "AIS-012",
    aiSystemName: "Legacy OCR System",
    category: "Privacy",
    impact: 3,
    probability: 1,
    score: 3,
    residualRisk: 2,
    status: "Transferred",
    owner: "Chris Johnson",
    reviewDate: "2026-06-30",
    linkedControls: [
      { id: "CTL-016", name: "Log anonymization", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-011", testName: "PII scan", testDate: "2025-08-15", result: "Pass", source: "Internal" },
    ],
  },
  {
    id: "RSK-013",
    description: "Lack of human oversight in automated fraud blocking",
    aiSystemId: "AIS-002",
    aiSystemName: "Fraud Detection Model v2",
    category: "Accountability",
    impact: 4,
    probability: 2,
    score: 8,
    residualRisk: 3,
    status: "Mitigated",
    owner: "James Wilson",
    reviewDate: "2026-04-01",
    linkedControls: [
      { id: "CTL-017", name: "Appeal process for blocked transactions", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-012", testName: "Appeal process audit", testDate: "2025-12-01", result: "Pass", source: "Internal" },
    ],
  },
  {
    id: "RSK-014",
    description: "Incomplete audit trail for classification decisions",
    aiSystemId: "AIS-003",
    aiSystemName: "Document Classification Engine",
    category: "Transparency",
    impact: 3,
    probability: 2,
    score: 6,
    residualRisk: 2,
    status: "Mitigated",
    owner: "Maria Garcia",
    reviewDate: "2026-05-01",
    linkedControls: [
      { id: "CTL-018", name: "Decision logging system", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-013", testName: "Audit trail completeness", testDate: "2025-11-25", result: "Pass", source: "Internal" },
    ],
  },
  {
    id: "RSK-015",
    description: "Customer data used for training without explicit consent",
    aiSystemId: "AIS-001",
    aiSystemName: "Customer Sentiment Analyzer",
    category: "Privacy",
    impact: 4,
    probability: 3,
    score: 12,
    residualRisk: 9,
    status: "Open",
    owner: "Sarah Chen",
    reviewDate: "2026-02-28",
    linkedControls: [
      { id: "CTL-019", name: "Data usage consent flow", effectiveness: "Not Tested" },
    ],
    testEvidence: [],
  },
  {
    id: "RSK-016",
    description: "Third-party model dependency without SLA guarantees",
    aiSystemId: "AIS-006",
    aiSystemName: "Chatbot - Customer Support",
    category: "Vendor",
    impact: 3,
    probability: 3,
    score: 9,
    residualRisk: 6,
    status: "Accepted",
    owner: "Tom Anderson",
    reviewDate: "2026-06-01",
    linkedControls: [
      { id: "CTL-020", name: "Fallback response system", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-014", testName: "Failover test", testDate: "2025-10-20", result: "Pass", source: "Internal" },
    ],
    acceptanceRecord: {
      acceptedBy: "CTO",
      acceptedDate: "2025-11-15",
      expiryDate: "2026-06-01",
      rationale: "Fallback system provides acceptable business continuity.",
      conditions: "Re-evaluate upon contract renewal.",
    },
  },
  {
    id: "RSK-017",
    description: "Inadequate monitoring for concept drift",
    aiSystemId: "AIS-007",
    aiSystemName: "Credit Scoring Model",
    category: "Operations",
    impact: 4,
    probability: 4,
    score: 16,
    residualRisk: 12,
    status: "Open",
    owner: "Jennifer Lee",
    reviewDate: "2026-02-15",
    linkedControls: [
      { id: "CTL-021", name: "Monthly drift reporting", effectiveness: "Partially Effective" },
    ],
    testEvidence: [
      { id: "TST-015", testName: "Drift detection coverage", testDate: "2026-01-12", result: "Warning", source: "Galtea" },
    ],
    galteaMetrics: { driftScore: 28, lastUpdated: "2026-01-21" },
  },
  {
    id: "RSK-018",
    description: "Model interpretability insufficient for regulatory review",
    aiSystemId: "AIS-007",
    aiSystemName: "Credit Scoring Model",
    category: "Transparency",
    impact: 4,
    probability: 3,
    score: 12,
    residualRisk: 9,
    status: "Open",
    owner: "Jennifer Lee",
    reviewDate: "2026-02-28",
    linkedControls: [
      { id: "CTL-022", name: "LIME explanations", effectiveness: "Partially Effective" },
    ],
    testEvidence: [
      { id: "TST-016", testName: "Regulatory readiness review", testDate: "2025-12-18", result: "Fail", source: "Internal" },
    ],
  },
  {
    id: "RSK-019",
    description: "Insufficient testing for adversarial inputs",
    aiSystemId: "AIS-004",
    aiSystemName: "HR Screening Assistant",
    category: "Security",
    impact: 3,
    probability: 3,
    score: 9,
    residualRisk: 9,
    status: "Open",
    owner: "David Park",
    reviewDate: "2026-03-01",
    linkedControls: [],
    testEvidence: [],
  },
  {
    id: "RSK-020",
    description: "Lack of fallback mechanism during model unavailability",
    aiSystemId: "AIS-005",
    aiSystemName: "Predictive Maintenance System",
    category: "Robustness",
    impact: 4,
    probability: 2,
    score: 8,
    residualRisk: 3,
    status: "Mitigated",
    owner: "Lisa Thompson",
    reviewDate: "2026-05-15",
    linkedControls: [
      { id: "CTL-023", name: "Scheduled maintenance mode", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-017", testName: "Failover drill", testDate: "2025-11-05", result: "Pass", source: "Internal" },
    ],
  },
  {
    id: "RSK-021",
    description: "Automated decisions affecting employment without review",
    aiSystemId: "AIS-004",
    aiSystemName: "HR Screening Assistant",
    category: "Accountability",
    impact: 5,
    probability: 3,
    score: 15,
    residualRisk: 12,
    status: "Open",
    owner: "David Park",
    reviewDate: "2026-02-01",
    linkedControls: [
      { id: "CTL-007", name: "Human review for all rejections", effectiveness: "Partially Effective" },
    ],
    testEvidence: [
      { id: "TST-018", testName: "Review compliance check", testDate: "2026-01-14", result: "Warning", source: "Internal" },
    ],
  },
  {
    id: "RSK-022",
    description: "Patient safety concerns from incorrect diagnostic suggestions",
    aiSystemId: "AIS-010",
    aiSystemName: "Medical Diagnosis Assistant",
    category: "Safety",
    impact: 5,
    probability: 2,
    score: 10,
    residualRisk: 6,
    status: "Open",
    owner: "Dr. Michael Brown",
    reviewDate: "2026-02-15",
    linkedControls: [
      { id: "CTL-014", name: "Physician confirmation required", effectiveness: "Effective" },
    ],
    testEvidence: [
      { id: "TST-019", testName: "Clinical accuracy validation", testDate: "2026-01-10", result: "Pass", source: "Galtea" },
    ],
    galteaMetrics: { accuracyScore: 89, lastUpdated: "2026-01-22" },
  },
];
