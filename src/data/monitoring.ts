import { StatusType } from "@/components/indicators";

export type EventType = "Decision" | "Escalation" | "Block" | "Alert" | "Audit" | "Configuration" | "Review";
export type DecisionOutcome = "Approved" | "Rejected" | "Escalated" | "Blocked" | "Processed" | "Flagged";

export interface EventLogEntry {
  id: string;
  timestamp: string;
  aiSystemId: string;
  aiSystemName: string;
  eventType: EventType;
  decision: DecisionOutcome;
  referenceId: string;
  description: string;
  actor?: string;
}

export interface KPIMetric {
  aiSystemId: string;
  aiSystemName: string;
  blockRate: number;
  escalationRate: number;
  errorRate: number;
  driftIndicator: number;
  period: string;
  lastUpdated: string;
}

export type ISOClause = 
  | "4.1 - Context of the Organization"
  | "4.2 - Needs and Expectations"
  | "5.1 - Leadership and Commitment"
  | "5.2 - AI Policy"
  | "6.1 - Risk Assessment"
  | "6.2 - AI System Objectives"
  | "7.1 - Resources"
  | "7.2 - Competence"
  | "7.3 - Awareness"
  | "7.4 - Communication"
  | "7.5 - Documented Information"
  | "8.1 - Operational Planning"
  | "8.2 - AI System Impact Assessment"
  | "8.3 - AI System Lifecycle"
  | "8.4 - Third-Party Relationships"
  | "9.1 - Monitoring and Measurement"
  | "9.2 - Internal Audit"
  | "9.3 - Management Review"
  | "10.1 - Nonconformity and Corrective Action"
  | "10.2 - Continual Improvement";

export const isoClauses: ISOClause[] = [
  "4.1 - Context of the Organization",
  "4.2 - Needs and Expectations",
  "5.1 - Leadership and Commitment",
  "5.2 - AI Policy",
  "6.1 - Risk Assessment",
  "6.2 - AI System Objectives",
  "7.1 - Resources",
  "7.2 - Competence",
  "7.3 - Awareness",
  "7.4 - Communication",
  "7.5 - Documented Information",
  "8.1 - Operational Planning",
  "8.2 - AI System Impact Assessment",
  "8.3 - AI System Lifecycle",
  "8.4 - Third-Party Relationships",
  "9.1 - Monitoring and Measurement",
  "9.2 - Internal Audit",
  "9.3 - Management Review",
  "10.1 - Nonconformity and Corrective Action",
  "10.2 - Continual Improvement",
];

export const eventTypeMapping: Record<EventType, { status: StatusType; text: string }> = {
  "Decision": { status: "neutral", text: "Decision" },
  "Escalation": { status: "warning", text: "Escalation" },
  "Block": { status: "critical", text: "Block" },
  "Alert": { status: "warning", text: "Alert" },
  "Audit": { status: "neutral", text: "Audit" },
  "Configuration": { status: "neutral", text: "Config" },
  "Review": { status: "success", text: "Review" },
};

export const decisionOutcomeMapping: Record<DecisionOutcome, { status: StatusType; text: string }> = {
  "Approved": { status: "success", text: "Approved" },
  "Rejected": { status: "critical", text: "Rejected" },
  "Escalated": { status: "warning", text: "Escalated" },
  "Blocked": { status: "critical", text: "Blocked" },
  "Processed": { status: "success", text: "Processed" },
  "Flagged": { status: "warning", text: "Flagged" },
};

export const eventLogData: EventLogEntry[] = [
  {
    id: "EVT-001",
    timestamp: "2026-01-25T09:15:23Z",
    aiSystemId: "AIS-002",
    aiSystemName: "Fraud Detection Model v2",
    eventType: "Escalation",
    decision: "Escalated",
    referenceId: "TXN-2026-0125-4521",
    description: "Transaction €85,000 exceeded threshold, escalated to Fraud Review Panel",
    actor: "System",
  },
  {
    id: "EVT-002",
    timestamp: "2026-01-25T09:12:45Z",
    aiSystemId: "AIS-004",
    aiSystemName: "HR Screening Assistant",
    eventType: "Decision",
    decision: "Approved",
    referenceId: "APP-2026-0892",
    description: "Candidate screening completed, recommended for interview",
    actor: "System",
  },
  {
    id: "EVT-003",
    timestamp: "2026-01-25T09:08:12Z",
    aiSystemId: "AIS-006",
    aiSystemName: "Chatbot - Customer Support",
    eventType: "Block",
    decision: "Blocked",
    referenceId: "CHAT-2026-15892",
    description: "Content safety filter triggered - inappropriate response prevented",
    actor: "GRL-007",
  },
  {
    id: "EVT-004",
    timestamp: "2026-01-25T08:55:00Z",
    aiSystemId: "AIS-007",
    aiSystemName: "Credit Scoring Model",
    eventType: "Escalation",
    decision: "Escalated",
    referenceId: "CRD-2026-0458",
    description: "Credit rejection routed to Credit Committee for human review",
    actor: "GRL-010",
  },
  {
    id: "EVT-005",
    timestamp: "2026-01-25T08:45:33Z",
    aiSystemId: "AIS-001",
    aiSystemName: "Customer Sentiment Analyzer",
    eventType: "Block",
    decision: "Blocked",
    referenceId: "SEN-2026-8921",
    description: "PII detected in input - processing blocked",
    actor: "GRL-001",
  },
  {
    id: "EVT-006",
    timestamp: "2026-01-25T08:30:15Z",
    aiSystemId: "AIS-003",
    aiSystemName: "Document Classification Engine",
    eventType: "Decision",
    decision: "Processed",
    referenceId: "DOC-2026-4521",
    description: "Document classified as 'Legal Contract' with 94% confidence",
    actor: "System",
  },
  {
    id: "EVT-007",
    timestamp: "2026-01-25T08:22:00Z",
    aiSystemId: "AIS-010",
    aiSystemName: "Medical Diagnosis Assistant",
    eventType: "Escalation",
    decision: "Escalated",
    referenceId: "DGN-2026-0125",
    description: "Diagnostic suggestion requires physician confirmation",
    actor: "GRL-012",
  },
  {
    id: "EVT-008",
    timestamp: "2026-01-25T08:15:45Z",
    aiSystemId: "AIS-002",
    aiSystemName: "Fraud Detection Model v2",
    eventType: "Alert",
    decision: "Flagged",
    referenceId: "DRF-2026-0125",
    description: "Drift score exceeded 20% threshold - monitoring increased",
    actor: "GRL-016",
  },
  {
    id: "EVT-009",
    timestamp: "2026-01-25T08:00:00Z",
    aiSystemId: "AIS-005",
    aiSystemName: "Predictive Maintenance System",
    eventType: "Alert",
    decision: "Escalated",
    referenceId: "MNT-2026-0892",
    description: "Critical equipment failure prediction - supervisor notified",
    actor: "GRL-006",
  },
  {
    id: "EVT-010",
    timestamp: "2026-01-24T17:45:00Z",
    aiSystemId: "AIS-007",
    aiSystemName: "Credit Scoring Model",
    eventType: "Configuration",
    decision: "Processed",
    referenceId: "CFG-2026-0124",
    description: "LIME explanation module updated to version 1.1.0",
    actor: "Jennifer Lee",
  },
  {
    id: "EVT-011",
    timestamp: "2026-01-24T16:30:00Z",
    aiSystemId: "AIS-004",
    aiSystemName: "HR Screening Assistant",
    eventType: "Review",
    decision: "Approved",
    referenceId: "REV-2026-0124",
    description: "Monthly bias audit completed - no significant issues found",
    actor: "David Park",
  },
  {
    id: "EVT-012",
    timestamp: "2026-01-24T15:00:00Z",
    aiSystemId: "AIS-006",
    aiSystemName: "Chatbot - Customer Support",
    eventType: "Escalation",
    decision: "Escalated",
    referenceId: "CHAT-2026-14521",
    description: "Complaint keywords detected - transferred to human agent",
    actor: "GRL-008",
  },
  {
    id: "EVT-013",
    timestamp: "2026-01-24T14:22:00Z",
    aiSystemId: "AIS-003",
    aiSystemName: "Document Classification Engine",
    eventType: "Escalation",
    decision: "Escalated",
    referenceId: "DOC-2026-4125",
    description: "Classification confidence 62% - routed to human review",
    actor: "GRL-003",
  },
  {
    id: "EVT-014",
    timestamp: "2026-01-24T11:15:00Z",
    aiSystemId: "AIS-001",
    aiSystemName: "Customer Sentiment Analyzer",
    eventType: "Audit",
    decision: "Processed",
    referenceId: "AUD-2026-0124",
    description: "Quarterly fairness audit initiated by Galtea",
    actor: "Galtea Platform",
  },
  {
    id: "EVT-015",
    timestamp: "2026-01-24T10:00:00Z",
    aiSystemId: "AIS-008",
    aiSystemName: "Supply Chain Optimizer",
    eventType: "Alert",
    decision: "Flagged",
    referenceId: "SCO-2026-0124",
    description: "Cost variance 18% detected - manager approval required",
    actor: "GRL-011",
  },
];

export const kpiMetrics: KPIMetric[] = [
  {
    aiSystemId: "AIS-001",
    aiSystemName: "Customer Sentiment Analyzer",
    blockRate: 2.3,
    escalationRate: 0.0,
    errorRate: 0.8,
    driftIndicator: 15,
    period: "Jan 2026",
    lastUpdated: "2026-01-25T06:00:00Z",
  },
  {
    aiSystemId: "AIS-002",
    aiSystemName: "Fraud Detection Model v2",
    blockRate: 0.0,
    escalationRate: 4.2,
    errorRate: 0.3,
    driftIndicator: 8,
    period: "Jan 2026",
    lastUpdated: "2026-01-25T06:00:00Z",
  },
  {
    aiSystemId: "AIS-003",
    aiSystemName: "Document Classification Engine",
    blockRate: 0.0,
    escalationRate: 8.5,
    errorRate: 1.2,
    driftIndicator: 5,
    period: "Jan 2026",
    lastUpdated: "2026-01-25T06:00:00Z",
  },
  {
    aiSystemId: "AIS-004",
    aiSystemName: "HR Screening Assistant",
    blockRate: 1.8,
    escalationRate: 100.0,
    errorRate: 2.1,
    driftIndicator: 12,
    period: "Jan 2026",
    lastUpdated: "2026-01-25T06:00:00Z",
  },
  {
    aiSystemId: "AIS-005",
    aiSystemName: "Predictive Maintenance System",
    blockRate: 0.0,
    escalationRate: 3.2,
    errorRate: 0.5,
    driftIndicator: 6,
    period: "Jan 2026",
    lastUpdated: "2026-01-25T06:00:00Z",
  },
  {
    aiSystemId: "AIS-006",
    aiSystemName: "Chatbot - Customer Support",
    blockRate: 0.4,
    escalationRate: 12.8,
    errorRate: 0.2,
    driftIndicator: 3,
    period: "Jan 2026",
    lastUpdated: "2026-01-25T06:00:00Z",
  },
  {
    aiSystemId: "AIS-007",
    aiSystemName: "Credit Scoring Model",
    blockRate: 0.0,
    escalationRate: 28.5,
    errorRate: 1.8,
    driftIndicator: 28,
    period: "Jan 2026",
    lastUpdated: "2026-01-25T06:00:00Z",
  },
  {
    aiSystemId: "AIS-008",
    aiSystemName: "Supply Chain Optimizer",
    blockRate: 0.0,
    escalationRate: 5.2,
    errorRate: 0.4,
    driftIndicator: 4,
    period: "Jan 2026",
    lastUpdated: "2026-01-25T06:00:00Z",
  },
  {
    aiSystemId: "AIS-010",
    aiSystemName: "Medical Diagnosis Assistant",
    blockRate: 0.0,
    escalationRate: 100.0,
    errorRate: 0.1,
    driftIndicator: 22,
    period: "Jan 2026",
    lastUpdated: "2026-01-25T06:00:00Z",
  },
];
