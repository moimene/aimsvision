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
  "Active": { status: "success", text: "Active" },
  "Inactive": { status: "neutral", text: "Inactive" },
  "Testing": { status: "warning", text: "Testing" },
  "Deprecated": { status: "critical", text: "Deprecated" },
};

export const guardrailActionMapping: Record<GuardrailAction, { status: StatusType; text: string }> = {
  "Proceed": { status: "success", text: "Proceed" },
  "Block": { status: "critical", text: "Block" },
  "Escalate": { status: "warning", text: "Escalate" },
};

export const guardrailCategories: GuardrailCategory[] = ["Security", "Privacy", "Compliance", "Quality"];

export const guardrailsData: Guardrail[] = [
  {
    id: "GRL-001",
    name: "PII Detection Filter",
    category: "Privacy",
    aiSystemId: "AIS-001",
    aiSystemName: "Customer Sentiment Analyzer",
    action: "Block",
    humanOversightRequired: false,
    status: "Active",
    version: "2.1.0",
    description: "Scans input text for personally identifiable information (PII) patterns including SSN, credit card numbers, and email addresses. Blocks processing if PII is detected and logs the incident.",
    linkedRiskIds: ["RSK-015"],
    changeHistory: [
      { version: "2.1.0", date: "2025-12-15", changedBy: "Sarah Chen", description: "Added credit card pattern detection" },
      { version: "2.0.0", date: "2025-09-01", changedBy: "Sarah Chen", description: "Expanded SSN detection to international formats" },
      { version: "1.0.0", date: "2025-03-10", changedBy: "Tom Anderson", description: "Initial deployment" },
    ],
    lastReviewedDate: "2026-01-10",
    lastReviewedBy: "Maria Garcia",
  },
  {
    id: "GRL-002",
    name: "Transaction Value Threshold",
    category: "Compliance",
    aiSystemId: "AIS-002",
    aiSystemName: "Fraud Detection Model v2",
    action: "Escalate",
    humanOversightRequired: true,
    status: "Active",
    version: "1.3.0",
    description: "Any transaction flagged as suspicious with value exceeding €50,000 is automatically escalated to the Fraud Review Panel for human decision. Model recommendation is provided but not enforced.",
    linkedRiskIds: ["RSK-002", "RSK-013"],
    changeHistory: [
      { version: "1.3.0", date: "2025-11-20", changedBy: "James Wilson", description: "Lowered threshold from €100,000 to €50,000" },
      { version: "1.2.0", date: "2025-06-15", changedBy: "James Wilson", description: "Added automatic panel notification" },
      { version: "1.0.0", date: "2024-06-01", changedBy: "Jennifer Lee", description: "Initial deployment" },
    ],
    lastReviewedDate: "2026-01-15",
    lastReviewedBy: "James Wilson",
  },
  {
    id: "GRL-003",
    name: "Confidence Score Gate",
    category: "Quality",
    aiSystemId: "AIS-003",
    aiSystemName: "Document Classification Engine",
    action: "Escalate",
    humanOversightRequired: true,
    status: "Active",
    version: "1.1.0",
    description: "Documents classified with confidence score below 70% are routed to human review queue. Classification is not applied automatically until human confirmation.",
    linkedRiskIds: ["RSK-003"],
    changeHistory: [
      { version: "1.1.0", date: "2025-10-05", changedBy: "Maria Garcia", description: "Increased threshold from 60% to 70%" },
      { version: "1.0.0", date: "2025-01-15", changedBy: "Chris Johnson", description: "Initial deployment" },
    ],
    lastReviewedDate: "2025-12-20",
    lastReviewedBy: "Maria Garcia",
  },
  {
    id: "GRL-004",
    name: "Mandatory Human Review",
    category: "Compliance",
    aiSystemId: "AIS-004",
    aiSystemName: "HR Screening Assistant",
    action: "Escalate",
    humanOversightRequired: true,
    status: "Active",
    version: "1.0.0",
    description: "All candidate rejection decisions require human HR reviewer confirmation before notification is sent. Approvals may proceed with manager notification only.",
    linkedRiskIds: ["RSK-004", "RSK-021"],
    changeHistory: [
      { version: "1.0.0", date: "2024-02-01", changedBy: "David Park", description: "Initial deployment - regulatory requirement" },
    ],
    lastReviewedDate: "2026-01-08",
    lastReviewedBy: "David Park",
  },
  {
    id: "GRL-005",
    name: "Protected Attribute Block",
    category: "Compliance",
    aiSystemId: "AIS-004",
    aiSystemName: "HR Screening Assistant",
    action: "Block",
    humanOversightRequired: false,
    status: "Active",
    version: "2.0.0",
    description: "Prevents model from accessing or using protected attributes (age, gender, ethnicity, disability status) in scoring calculations. Blocks processing if attribute leakage is detected.",
    linkedRiskIds: ["RSK-004"],
    changeHistory: [
      { version: "2.0.0", date: "2025-08-20", changedBy: "David Park", description: "Added disability status to protected list" },
      { version: "1.0.0", date: "2024-01-20", changedBy: "Lisa Thompson", description: "Initial deployment" },
    ],
    lastReviewedDate: "2025-12-15",
    lastReviewedBy: "Maria Garcia",
  },
  {
    id: "GRL-006",
    name: "Critical Equipment Alert",
    category: "Quality",
    aiSystemId: "AIS-005",
    aiSystemName: "Predictive Maintenance System",
    action: "Escalate",
    humanOversightRequired: true,
    status: "Active",
    version: "1.2.0",
    description: "Predictions indicating imminent failure of critical equipment (Category A assets) trigger immediate escalation to on-call maintenance supervisor with 30-minute response SLA.",
    linkedRiskIds: ["RSK-005", "RSK-020"],
    changeHistory: [
      { version: "1.2.0", date: "2025-11-10", changedBy: "Lisa Thompson", description: "Added 30-minute SLA requirement" },
      { version: "1.1.0", date: "2025-07-01", changedBy: "Robert Kim", description: "Expanded to include Category A assets" },
      { version: "1.0.0", date: "2025-02-15", changedBy: "Lisa Thompson", description: "Initial deployment" },
    ],
    lastReviewedDate: "2026-01-05",
    lastReviewedBy: "Lisa Thompson",
  },
  {
    id: "GRL-007",
    name: "Content Safety Filter",
    category: "Security",
    aiSystemId: "AIS-006",
    aiSystemName: "Chatbot - Customer Support",
    action: "Block",
    humanOversightRequired: false,
    status: "Active",
    version: "3.0.0",
    description: "Multi-layer content filter that blocks harmful, offensive, or inappropriate responses before delivery to customer. Includes profanity, hate speech, and misinformation detection.",
    linkedRiskIds: ["RSK-006"],
    changeHistory: [
      { version: "3.0.0", date: "2025-12-01", changedBy: "Tom Anderson", description: "Added misinformation detection layer" },
      { version: "2.0.0", date: "2025-06-15", changedBy: "Tom Anderson", description: "Upgraded to transformer-based detection" },
      { version: "1.0.0", date: "2024-09-01", changedBy: "Emma Davis", description: "Initial deployment" },
    ],
    lastReviewedDate: "2026-01-12",
    lastReviewedBy: "Tom Anderson",
  },
  {
    id: "GRL-008",
    name: "Complaint Keyword Escalation",
    category: "Quality",
    aiSystemId: "AIS-006",
    aiSystemName: "Chatbot - Customer Support",
    action: "Escalate",
    humanOversightRequired: true,
    status: "Active",
    version: "1.4.0",
    description: "Detects complaint-related keywords and sentiment patterns. Automatically transfers conversation to human agent when frustration or complaint intent is detected above threshold.",
    linkedRiskIds: ["RSK-006"],
    changeHistory: [
      { version: "1.4.0", date: "2025-11-25", changedBy: "Emma Davis", description: "Added sentiment analysis integration" },
      { version: "1.3.0", date: "2025-08-10", changedBy: "Tom Anderson", description: "Expanded keyword dictionary" },
      { version: "1.0.0", date: "2024-10-01", changedBy: "Tom Anderson", description: "Initial deployment" },
    ],
    lastReviewedDate: "2025-12-28",
    lastReviewedBy: "Sarah Chen",
  },
  {
    id: "GRL-009",
    name: "Credit Decision Explainability",
    category: "Compliance",
    aiSystemId: "AIS-007",
    aiSystemName: "Credit Scoring Model",
    action: "Block",
    humanOversightRequired: false,
    status: "Active",
    version: "1.1.0",
    description: "Blocks any credit decision from being issued without accompanying LIME/SHAP explanation document. Required for regulatory compliance with fair lending laws.",
    linkedRiskIds: ["RSK-018"],
    changeHistory: [
      { version: "1.1.0", date: "2025-12-10", changedBy: "Jennifer Lee", description: "Added SHAP support" },
      { version: "1.0.0", date: "2025-01-05", changedBy: "Jennifer Lee", description: "Initial deployment" },
    ],
    lastReviewedDate: "2026-01-18",
    lastReviewedBy: "Jennifer Lee",
  },
  {
    id: "GRL-010",
    name: "All Rejections Human Review",
    category: "Compliance",
    aiSystemId: "AIS-007",
    aiSystemName: "Credit Scoring Model",
    action: "Escalate",
    humanOversightRequired: true,
    status: "Active",
    version: "1.0.0",
    description: "All credit application rejections are routed to Credit Committee for human review before final decision is communicated to applicant. Approvals may proceed automatically.",
    linkedRiskIds: ["RSK-007"],
    changeHistory: [
      { version: "1.0.0", date: "2025-01-15", changedBy: "Jennifer Lee", description: "Initial deployment - regulatory requirement" },
    ],
    lastReviewedDate: "2026-01-10",
    lastReviewedBy: "James Wilson",
  },
  {
    id: "GRL-011",
    name: "Cost Variance Alert",
    category: "Quality",
    aiSystemId: "AIS-008",
    aiSystemName: "Supply Chain Optimizer",
    action: "Escalate",
    humanOversightRequired: false,
    status: "Active",
    version: "1.0.0",
    description: "Recommendations that would result in cost variance exceeding 15% from baseline are flagged and require manager approval before execution.",
    linkedRiskIds: ["RSK-008"],
    changeHistory: [
      { version: "1.0.0", date: "2025-04-01", changedBy: "Robert Kim", description: "Initial deployment" },
    ],
    lastReviewedDate: "2025-11-20",
    lastReviewedBy: "Robert Kim",
  },
  {
    id: "GRL-012",
    name: "Physician Confirmation Required",
    category: "Compliance",
    aiSystemId: "AIS-010",
    aiSystemName: "Medical Diagnosis Assistant",
    action: "Escalate",
    humanOversightRequired: true,
    status: "Active",
    version: "1.0.0",
    description: "All diagnostic suggestions require physician confirmation before being recorded in patient record. AI output is clearly labeled as 'AI-Assisted Suggestion' in all displays.",
    linkedRiskIds: ["RSK-010", "RSK-022"],
    changeHistory: [
      { version: "1.0.0", date: "2025-10-01", changedBy: "Dr. Michael Brown", description: "Initial deployment - clinical safety requirement" },
    ],
    lastReviewedDate: "2026-01-15",
    lastReviewedBy: "Dr. Michael Brown",
  },
  {
    id: "GRL-013",
    name: "Low Confidence Alert",
    category: "Quality",
    aiSystemId: "AIS-010",
    aiSystemName: "Medical Diagnosis Assistant",
    action: "Escalate",
    humanOversightRequired: true,
    status: "Active",
    version: "1.1.0",
    description: "Diagnostic suggestions with confidence score below 80% display prominent warning to physician and are flagged for additional clinical review.",
    linkedRiskIds: ["RSK-010"],
    changeHistory: [
      { version: "1.1.0", date: "2025-12-05", changedBy: "Dr. Michael Brown", description: "Increased threshold from 70% to 80%" },
      { version: "1.0.0", date: "2025-10-01", changedBy: "Dr. Michael Brown", description: "Initial deployment" },
    ],
    lastReviewedDate: "2026-01-15",
    lastReviewedBy: "Dr. Michael Brown",
  },
  {
    id: "GRL-014",
    name: "Price Change Limit",
    category: "Compliance",
    aiSystemId: "AIS-011",
    aiSystemName: "Price Optimization Engine",
    action: "Block",
    humanOversightRequired: true,
    status: "Testing",
    version: "0.9.0",
    description: "Blocks any price change recommendation exceeding 20% from current price. Changes within limit require Pricing Committee approval before implementation.",
    linkedRiskIds: ["RSK-011"],
    changeHistory: [
      { version: "0.9.0", date: "2026-01-05", changedBy: "Alex Martinez", description: "Initial testing deployment" },
    ],
    lastReviewedDate: "2026-01-20",
    lastReviewedBy: "Alex Martinez",
  },
  {
    id: "GRL-015",
    name: "Log Anonymization",
    category: "Privacy",
    aiSystemId: "AIS-012",
    aiSystemName: "Legacy OCR System",
    action: "Proceed",
    humanOversightRequired: false,
    status: "Active",
    version: "1.0.0",
    description: "All OCR processing logs are automatically anonymized by removing PII patterns before storage. Original data is discarded after 24-hour processing window.",
    linkedRiskIds: ["RSK-012"],
    changeHistory: [
      { version: "1.0.0", date: "2025-08-01", changedBy: "Chris Johnson", description: "Initial deployment" },
    ],
    lastReviewedDate: "2025-11-15",
    lastReviewedBy: "Chris Johnson",
  },
  {
    id: "GRL-016",
    name: "Drift Detection Threshold",
    category: "Quality",
    aiSystemId: "AIS-002",
    aiSystemName: "Fraud Detection Model v2",
    action: "Escalate",
    humanOversightRequired: false,
    status: "Active",
    version: "1.0.0",
    description: "When model drift score exceeds 20% from baseline, automatic alert is sent to model owner and weekly retraining is triggered. Model continues operating with increased monitoring.",
    linkedRiskIds: ["RSK-002"],
    changeHistory: [
      { version: "1.0.0", date: "2025-07-01", changedBy: "James Wilson", description: "Initial deployment" },
    ],
    lastReviewedDate: "2026-01-08",
    lastReviewedBy: "James Wilson",
  },
];
