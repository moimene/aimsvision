import { StatusType } from "@/components/indicators";

export type IncidentSeverity = "Critical" | "High" | "Medium" | "Low";
export type IncidentStatus = "Open" | "Investigating" | "Resolved" | "Closed";
export type CAPAStatus = "Pending" | "In Progress" | "Completed" | "Verified";

export interface TimelineEntry {
  timestamp: string;
  event: string;
  actor: string;
}

export interface CorrectiveAction {
  id: string;
  description: string;
  type: "Corrective" | "Preventive";
  status: CAPAStatus;
  owner: string;
  dueDate: string;
  completedDate?: string;
}

export interface Incident {
  id: string;
  aiSystemId: string;
  aiSystemName: string;
  severity: IncidentSeverity;
  description: string;
  status: IncidentStatus;
  rootCauseIdentified: boolean;
  rootCause?: string;
  linkedPostmortem?: string;
  reportedDate: string;
  resolvedDate?: string;
  owner: string;
  timeline: TimelineEntry[];
  correctiveActions: CorrectiveAction[];
  linkedRiskIds?: string[];
  impactSummary?: string;
  lessonsLearned?: string;
}

export const incidentSeverityMapping: Record<IncidentSeverity, { status: StatusType; text: string }> = {
  "Critical": { status: "critical", text: "Critical" },
  "High": { status: "critical", text: "High" },
  "Medium": { status: "warning", text: "Medium" },
  "Low": { status: "neutral", text: "Low" },
};

export const incidentStatusMapping: Record<IncidentStatus, { status: StatusType; text: string }> = {
  "Open": { status: "critical", text: "Open" },
  "Investigating": { status: "warning", text: "Investigating" },
  "Resolved": { status: "success", text: "Resolved" },
  "Closed": { status: "neutral", text: "Closed" },
};

export const capaStatusMapping: Record<CAPAStatus, { status: StatusType; text: string }> = {
  "Pending": { status: "neutral", text: "Pending" },
  "In Progress": { status: "warning", text: "In Progress" },
  "Completed": { status: "success", text: "Completed" },
  "Verified": { status: "success", text: "Verified" },
};

export const incidentsData: Incident[] = [
  {
    id: "INC-001",
    aiSystemId: "AIS-004",
    aiSystemName: "HR Screening Assistant",
    severity: "High",
    description: "Bias detected in candidate screening resulting in disproportionate rejection rates for certain demographic groups",
    status: "Investigating",
    rootCauseIdentified: true,
    rootCause: "Training data contained historical bias from previous hiring decisions. Protected attribute proxy features were inadvertently included.",
    linkedPostmortem: "PM-2026-001",
    reportedDate: "2026-01-15",
    owner: "David Park",
    impactSummary: "Approximately 150 candidates potentially affected over 3-week period. All affected applications flagged for re-review.",
    timeline: [
      { timestamp: "2026-01-15T09:00:00Z", event: "Incident reported by HR team after routine audit", actor: "HR Audit Team" },
      { timestamp: "2026-01-15T10:30:00Z", event: "Incident logged and assigned to David Park", actor: "System" },
      { timestamp: "2026-01-15T14:00:00Z", event: "Initial investigation started - pulled model logs", actor: "David Park" },
      { timestamp: "2026-01-16T11:00:00Z", event: "Bias patterns confirmed through statistical analysis", actor: "Data Science Team" },
      { timestamp: "2026-01-17T09:00:00Z", event: "Root cause identified - training data bias", actor: "David Park" },
      { timestamp: "2026-01-18T15:00:00Z", event: "Postmortem meeting conducted", actor: "AI Ethics Committee" },
      { timestamp: "2026-01-20T10:00:00Z", event: "Corrective action plan approved", actor: "CTO" },
    ],
    correctiveActions: [
      { 
        id: "CAPA-001", 
        description: "Retrain model with bias-corrected dataset", 
        type: "Corrective", 
        status: "In Progress", 
        owner: "Lisa Thompson", 
        dueDate: "2026-02-01" 
      },
      { 
        id: "CAPA-002", 
        description: "Implement pre-deployment fairness testing gate", 
        type: "Preventive", 
        status: "Pending", 
        owner: "David Park", 
        dueDate: "2026-02-15" 
      },
      { 
        id: "CAPA-003", 
        description: "Re-review all affected candidate applications", 
        type: "Corrective", 
        status: "In Progress", 
        owner: "HR Review Board", 
        dueDate: "2026-01-31" 
      },
    ],
    linkedRiskIds: ["RSK-004", "RSK-021"],
    lessonsLearned: "Proxy features for protected attributes can emerge unexpectedly. Regular fairness audits and pre-deployment testing gates are essential for high-risk AI systems.",
  },
  {
    id: "INC-002",
    aiSystemId: "AIS-002",
    aiSystemName: "Fraud Detection Model v2",
    severity: "Medium",
    description: "Model drift caused elevated false positive rate, blocking legitimate transactions",
    status: "Resolved",
    rootCauseIdentified: true,
    rootCause: "Seasonal transaction pattern shift not captured in training data. Model confidence thresholds were too aggressive.",
    linkedPostmortem: "PM-2025-012",
    reportedDate: "2025-12-20",
    resolvedDate: "2025-12-28",
    owner: "James Wilson",
    impactSummary: "312 legitimate transactions blocked over 5-day period. All affected customers contacted and compensated.",
    timeline: [
      { timestamp: "2025-12-20T08:00:00Z", event: "Elevated false positive rate detected by monitoring", actor: "GRL-016" },
      { timestamp: "2025-12-20T09:00:00Z", event: "Incident created and escalated", actor: "System" },
      { timestamp: "2025-12-20T11:00:00Z", event: "Temporary threshold adjustment applied", actor: "James Wilson" },
      { timestamp: "2025-12-21T14:00:00Z", event: "Root cause analysis completed", actor: "Data Science Team" },
      { timestamp: "2025-12-23T10:00:00Z", event: "Model retrained with seasonal adjustment", actor: "ML Engineering" },
      { timestamp: "2025-12-27T09:00:00Z", event: "New model deployed to production", actor: "James Wilson" },
      { timestamp: "2025-12-28T16:00:00Z", event: "Incident resolved - metrics normalized", actor: "James Wilson" },
    ],
    correctiveActions: [
      { 
        id: "CAPA-004", 
        description: "Implement seasonal adjustment module", 
        type: "Corrective", 
        status: "Completed", 
        owner: "James Wilson", 
        dueDate: "2025-12-27",
        completedDate: "2025-12-27"
      },
      { 
        id: "CAPA-005", 
        description: "Add seasonal drift detection to monitoring", 
        type: "Preventive", 
        status: "Completed", 
        owner: "ML Engineering", 
        dueDate: "2026-01-10",
        completedDate: "2026-01-08"
      },
    ],
    linkedRiskIds: ["RSK-002"],
    lessonsLearned: "Seasonal patterns require explicit modeling. Drift detection should include time-series analysis for transaction-based systems.",
  },
  {
    id: "INC-003",
    aiSystemId: "AIS-006",
    aiSystemName: "Chatbot - Customer Support",
    severity: "Low",
    description: "Chatbot provided incorrect product information to a small number of customers",
    status: "Closed",
    rootCauseIdentified: true,
    rootCause: "Knowledge base update propagation delay caused stale information to be served for approximately 2 hours.",
    linkedPostmortem: "PM-2025-011",
    reportedDate: "2025-11-15",
    resolvedDate: "2025-11-15",
    owner: "Tom Anderson",
    impactSummary: "23 customers received outdated pricing information. All affected customers notified and offered price match.",
    timeline: [
      { timestamp: "2025-11-15T14:00:00Z", event: "Customer complaint received about incorrect pricing", actor: "Customer Service" },
      { timestamp: "2025-11-15T14:30:00Z", event: "Issue confirmed - knowledge base sync delay identified", actor: "Tom Anderson" },
      { timestamp: "2025-11-15T15:00:00Z", event: "Manual knowledge base sync triggered", actor: "Tom Anderson" },
      { timestamp: "2025-11-15T15:30:00Z", event: "Issue resolved - correct information now served", actor: "System" },
      { timestamp: "2025-11-16T10:00:00Z", event: "Affected customers identified and contacted", actor: "Customer Service" },
      { timestamp: "2025-11-18T09:00:00Z", event: "Incident closed after customer remediation complete", actor: "Tom Anderson" },
    ],
    correctiveActions: [
      { 
        id: "CAPA-006", 
        description: "Reduce knowledge base sync interval from 4 hours to 30 minutes", 
        type: "Corrective", 
        status: "Verified", 
        owner: "Tom Anderson", 
        dueDate: "2025-11-20",
        completedDate: "2025-11-17"
      },
      { 
        id: "CAPA-007", 
        description: "Add sync status indicator to admin dashboard", 
        type: "Preventive", 
        status: "Verified", 
        owner: "Emma Davis", 
        dueDate: "2025-12-01",
        completedDate: "2025-11-28"
      },
    ],
    lessonsLearned: "Real-time information systems require near-real-time sync. Admin visibility into sync status prevents delayed detection.",
  },
  {
    id: "INC-004",
    aiSystemId: "AIS-007",
    aiSystemName: "Credit Scoring Model",
    severity: "Critical",
    description: "Explainability module failure caused credit decisions to be issued without required explanations",
    status: "Resolved",
    rootCauseIdentified: true,
    rootCause: "LIME library version conflict after dependency update caused silent failure. Guardrail GRL-009 failed to catch missing explanations.",
    linkedPostmortem: "PM-2026-002",
    reportedDate: "2026-01-10",
    resolvedDate: "2026-01-12",
    owner: "Jennifer Lee",
    impactSummary: "47 credit decisions issued without explanations over 18-hour window. Regulatory notification required. All affected decisions re-processed.",
    timeline: [
      { timestamp: "2026-01-10T06:00:00Z", event: "Routine dependency update deployed", actor: "DevOps" },
      { timestamp: "2026-01-10T22:00:00Z", event: "Compliance team noticed missing explanation documents", actor: "Compliance Audit" },
      { timestamp: "2026-01-10T22:30:00Z", event: "Critical incident created - model processing paused", actor: "Jennifer Lee" },
      { timestamp: "2026-01-11T02:00:00Z", event: "Root cause identified - LIME version conflict", actor: "ML Engineering" },
      { timestamp: "2026-01-11T08:00:00Z", event: "Library rollback applied", actor: "DevOps" },
      { timestamp: "2026-01-11T10:00:00Z", event: "Guardrail GRL-009 patched to catch silent failures", actor: "Jennifer Lee" },
      { timestamp: "2026-01-12T09:00:00Z", event: "Affected decisions reprocessed with explanations", actor: "Credit Committee" },
      { timestamp: "2026-01-12T14:00:00Z", event: "Regulatory notification submitted", actor: "Compliance" },
      { timestamp: "2026-01-12T16:00:00Z", event: "Incident resolved", actor: "Jennifer Lee" },
    ],
    correctiveActions: [
      { 
        id: "CAPA-008", 
        description: "Pin LIME library version and add to critical dependency list", 
        type: "Corrective", 
        status: "Completed", 
        owner: "DevOps", 
        dueDate: "2026-01-13",
        completedDate: "2026-01-11"
      },
      { 
        id: "CAPA-009", 
        description: "Add explanation document validation to guardrail GRL-009", 
        type: "Corrective", 
        status: "Completed", 
        owner: "Jennifer Lee", 
        dueDate: "2026-01-15",
        completedDate: "2026-01-11"
      },
      { 
        id: "CAPA-010", 
        description: "Implement pre-deployment testing for explainability module", 
        type: "Preventive", 
        status: "In Progress", 
        owner: "ML Engineering", 
        dueDate: "2026-01-30" 
      },
    ],
    linkedRiskIds: ["RSK-018"],
    lessonsLearned: "Dependency updates require explicit testing of compliance-critical features. Guardrails must validate output content, not just presence.",
  },
  {
    id: "INC-005",
    aiSystemId: "AIS-010",
    aiSystemName: "Medical Diagnosis Assistant",
    severity: "High",
    description: "Model confidence scores inflated for rare conditions due to calibration error",
    status: "Open",
    rootCauseIdentified: false,
    reportedDate: "2026-01-22",
    owner: "Dr. Michael Brown",
    impactSummary: "Under investigation. Model temporarily restricted to common conditions only. Full clinical review initiated.",
    timeline: [
      { timestamp: "2026-01-22T11:00:00Z", event: "Physician reported unexpectedly high confidence for rare condition", actor: "Clinical Staff" },
      { timestamp: "2026-01-22T13:00:00Z", event: "Incident created - clinical review initiated", actor: "Dr. Michael Brown" },
      { timestamp: "2026-01-22T15:00:00Z", event: "Model restricted to common conditions pending investigation", actor: "Clinical Oversight Board" },
      { timestamp: "2026-01-23T09:00:00Z", event: "Statistical analysis of confidence scores initiated", actor: "Data Science Team" },
      { timestamp: "2026-01-24T14:00:00Z", event: "Calibration issue suspected - investigation ongoing", actor: "ML Engineering" },
    ],
    correctiveActions: [
      { 
        id: "CAPA-011", 
        description: "Complete calibration analysis and identify root cause", 
        type: "Corrective", 
        status: "In Progress", 
        owner: "ML Engineering", 
        dueDate: "2026-01-28" 
      },
    ],
    linkedRiskIds: ["RSK-010", "RSK-022"],
  },
];
