export type ClauseStatus = "Compliant" | "Partially Compliant" | "Non-Compliant" | "Not Assessed";
export type NCStatus = "Open" | "In Progress" | "Closed" | "Verified";
export type NCSeverity = "Major" | "Minor" | "Observation";

export interface ISOClause {
  id: string;
  clause: string;
  title: string;
  description: string;
  status: ClauseStatus;
  evidenceCount: number;
  lastAuditDate: string | null;
  auditor: string | null;
  notes?: string;
}

export interface NonConformity {
  id: string;
  clauseId: string;
  clauseTitle: string;
  severity: NCSeverity;
  description: string;
  rootCause: string;
  status: NCStatus;
  raisedDate: string;
  dueDate: string;
  closedDate: string | null;
  owner: string;
  correctiveAction: string;
  verificationNotes?: string;
}

export interface CoverageMetric {
  label: string;
  value: number;
  total: number;
  status: "success" | "warning" | "critical";
}

export const clauseStatusMapping: Record<ClauseStatus, { text: string; status: "success" | "warning" | "critical" | "neutral" }> = {
  "Compliant": { text: "Compliant", status: "success" },
  "Partially Compliant": { text: "Partially Compliant", status: "warning" },
  "Non-Compliant": { text: "Non-Compliant", status: "critical" },
  "Not Assessed": { text: "Not Assessed", status: "neutral" },
};

export const ncStatusMapping: Record<NCStatus, { text: string; status: "success" | "warning" | "critical" | "neutral" }> = {
  "Open": { text: "Open", status: "critical" },
  "In Progress": { text: "In Progress", status: "warning" },
  "Closed": { text: "Closed", status: "success" },
  "Verified": { text: "Verified", status: "success" },
};

export const ncSeverityMapping: Record<NCSeverity, { text: string; status: "success" | "warning" | "critical" }> = {
  "Major": { text: "Major", status: "critical" },
  "Minor": { text: "Minor", status: "warning" },
  "Observation": { text: "Observation", status: "success" },
};

// ISO/IEC 42001 Clause Checklist Data
export const isoClauses: ISOClause[] = [
  // Clause 4: Context of the organization
  {
    id: "4.1",
    clause: "4.1",
    title: "Understanding the organization and its context",
    description: "Determine external and internal issues relevant to AI systems",
    status: "Compliant",
    evidenceCount: 5,
    lastAuditDate: "2025-01-10",
    auditor: "External Auditor A",
  },
  {
    id: "4.2",
    clause: "4.2",
    title: "Understanding the needs and expectations of interested parties",
    description: "Identify stakeholders and their requirements for AI systems",
    status: "Compliant",
    evidenceCount: 4,
    lastAuditDate: "2025-01-10",
    auditor: "External Auditor A",
  },
  {
    id: "4.3",
    clause: "4.3",
    title: "Determining the scope of the AI management system",
    description: "Establish boundaries and applicability of the AIMS",
    status: "Compliant",
    evidenceCount: 3,
    lastAuditDate: "2025-01-10",
    auditor: "External Auditor A",
  },
  {
    id: "4.4",
    clause: "4.4",
    title: "AI management system",
    description: "Establish, implement, maintain and continually improve the AIMS",
    status: "Partially Compliant",
    evidenceCount: 6,
    lastAuditDate: "2025-01-10",
    auditor: "External Auditor A",
    notes: "Documentation for continuous improvement processes needs enhancement",
  },
  // Clause 5: Leadership
  {
    id: "5.1",
    clause: "5.1",
    title: "Leadership and commitment",
    description: "Top management commitment to AIMS",
    status: "Compliant",
    evidenceCount: 4,
    lastAuditDate: "2025-01-08",
    auditor: "Internal Audit Team",
  },
  {
    id: "5.2",
    clause: "5.2",
    title: "AI policy",
    description: "Establish AI policy appropriate to the organization",
    status: "Compliant",
    evidenceCount: 2,
    lastAuditDate: "2025-01-08",
    auditor: "Internal Audit Team",
  },
  {
    id: "5.3",
    clause: "5.3",
    title: "Organizational roles, responsibilities and authorities",
    description: "Assign and communicate roles for AIMS",
    status: "Compliant",
    evidenceCount: 5,
    lastAuditDate: "2025-01-08",
    auditor: "Internal Audit Team",
  },
  // Clause 6: Planning
  {
    id: "6.1",
    clause: "6.1",
    title: "Actions to address risks and opportunities",
    description: "Plan actions to address AI-specific risks and opportunities",
    status: "Partially Compliant",
    evidenceCount: 7,
    lastAuditDate: "2025-01-12",
    auditor: "External Auditor A",
    notes: "Risk treatment plans for 2 high-risk systems pending approval",
  },
  {
    id: "6.2",
    clause: "6.2",
    title: "AI objectives and planning to achieve them",
    description: "Establish measurable AI objectives",
    status: "Compliant",
    evidenceCount: 3,
    lastAuditDate: "2025-01-12",
    auditor: "External Auditor A",
  },
  // Clause 7: Support
  {
    id: "7.1",
    clause: "7.1",
    title: "Resources",
    description: "Determine and provide resources for AIMS",
    status: "Compliant",
    evidenceCount: 4,
    lastAuditDate: "2025-01-15",
    auditor: "Internal Audit Team",
  },
  {
    id: "7.2",
    clause: "7.2",
    title: "Competence",
    description: "Determine necessary competence for AI roles",
    status: "Partially Compliant",
    evidenceCount: 5,
    lastAuditDate: "2025-01-15",
    auditor: "Internal Audit Team",
    notes: "Training records incomplete for 3 team members",
  },
  {
    id: "7.3",
    clause: "7.3",
    title: "Awareness",
    description: "Ensure awareness of AI policy and AIMS requirements",
    status: "Compliant",
    evidenceCount: 3,
    lastAuditDate: "2025-01-15",
    auditor: "Internal Audit Team",
  },
  {
    id: "7.4",
    clause: "7.4",
    title: "Communication",
    description: "Determine internal and external communications",
    status: "Compliant",
    evidenceCount: 2,
    lastAuditDate: "2025-01-15",
    auditor: "Internal Audit Team",
  },
  {
    id: "7.5",
    clause: "7.5",
    title: "Documented information",
    description: "Control documented information required by AIMS",
    status: "Compliant",
    evidenceCount: 6,
    lastAuditDate: "2025-01-15",
    auditor: "Internal Audit Team",
  },
  // Clause 8: Operation
  {
    id: "8.1",
    clause: "8.1",
    title: "Operational planning and control",
    description: "Plan, implement and control processes for AI systems",
    status: "Compliant",
    evidenceCount: 8,
    lastAuditDate: "2025-01-18",
    auditor: "External Auditor B",
  },
  {
    id: "8.2",
    clause: "8.2",
    title: "AI risk assessment",
    description: "Implement AI risk assessment processes",
    status: "Partially Compliant",
    evidenceCount: 6,
    lastAuditDate: "2025-01-18",
    auditor: "External Auditor B",
    notes: "Risk assessment methodology needs update for new ML models",
  },
  {
    id: "8.3",
    clause: "8.3",
    title: "AI risk treatment",
    description: "Implement AI risk treatment processes",
    status: "Non-Compliant",
    evidenceCount: 3,
    lastAuditDate: "2025-01-18",
    auditor: "External Auditor B",
    notes: "Missing treatment plans for 2 critical risks - NC-003 raised",
  },
  {
    id: "8.4",
    clause: "8.4",
    title: "AI system impact assessment",
    description: "Conduct impact assessments for AI systems",
    status: "Compliant",
    evidenceCount: 12,
    lastAuditDate: "2025-01-18",
    auditor: "External Auditor B",
  },
  // Clause 9: Performance evaluation
  {
    id: "9.1",
    clause: "9.1",
    title: "Monitoring, measurement, analysis and evaluation",
    description: "Determine what needs to be monitored and measured",
    status: "Compliant",
    evidenceCount: 9,
    lastAuditDate: "2025-01-20",
    auditor: "Internal Audit Team",
  },
  {
    id: "9.2",
    clause: "9.2",
    title: "Internal audit",
    description: "Conduct internal audits at planned intervals",
    status: "Compliant",
    evidenceCount: 4,
    lastAuditDate: "2025-01-20",
    auditor: "Internal Audit Team",
  },
  {
    id: "9.3",
    clause: "9.3",
    title: "Management review",
    description: "Review AIMS at planned intervals",
    status: "Compliant",
    evidenceCount: 3,
    lastAuditDate: "2025-01-20",
    auditor: "Internal Audit Team",
  },
  // Clause 10: Improvement
  {
    id: "10.1",
    clause: "10.1",
    title: "Continual improvement",
    description: "Continually improve the suitability and effectiveness of AIMS",
    status: "Partially Compliant",
    evidenceCount: 4,
    lastAuditDate: "2025-01-22",
    auditor: "External Auditor A",
    notes: "Improvement action tracking not fully implemented",
  },
  {
    id: "10.2",
    clause: "10.2",
    title: "Nonconformity and corrective action",
    description: "React to nonconformities and take corrective action",
    status: "Compliant",
    evidenceCount: 5,
    lastAuditDate: "2025-01-22",
    auditor: "External Auditor A",
  },
];

// Non-Conformity Register
export const nonConformities: NonConformity[] = [
  {
    id: "NC-001",
    clauseId: "7.2",
    clauseTitle: "Competence",
    severity: "Minor",
    description: "Training records for AI system operators are incomplete. Records for 3 team members are missing competency verification.",
    rootCause: "New team members onboarded without following updated training matrix procedures.",
    status: "In Progress",
    raisedDate: "2025-01-15",
    dueDate: "2025-02-15",
    closedDate: null,
    owner: "HR Manager",
    correctiveAction: "Complete training records for all team members and implement automated tracking.",
  },
  {
    id: "NC-002",
    clauseId: "6.1",
    clauseTitle: "Actions to address risks and opportunities",
    severity: "Minor",
    description: "Risk treatment plans for 2 high-risk AI systems are pending final approval beyond the 30-day target.",
    rootCause: "Committee scheduling delays and incomplete risk assessments from technical teams.",
    status: "In Progress",
    raisedDate: "2025-01-12",
    dueDate: "2025-02-01",
    closedDate: null,
    owner: "Chief Risk Officer",
    correctiveAction: "Expedite committee review and establish interim controls until formal approval.",
  },
  {
    id: "NC-003",
    clauseId: "8.3",
    clauseTitle: "AI risk treatment",
    severity: "Major",
    description: "Two critical AI risks (RSK-008, RSK-010) have no documented treatment plans. This represents a significant gap in risk management.",
    rootCause: "Risk identification process not properly integrated with treatment planning workflow.",
    status: "Open",
    raisedDate: "2025-01-18",
    dueDate: "2025-01-31",
    closedDate: null,
    owner: "AI Risk Manager",
    correctiveAction: "Immediately develop treatment plans for critical risks and integrate risk identification with treatment workflow.",
  },
  {
    id: "NC-004",
    clauseId: "8.2",
    clauseTitle: "AI risk assessment",
    severity: "Minor",
    description: "Risk assessment methodology does not adequately address risks from new machine learning model types (LLMs, generative AI).",
    rootCause: "Methodology developed before adoption of newer AI technologies.",
    status: "In Progress",
    raisedDate: "2025-01-18",
    dueDate: "2025-02-28",
    closedDate: null,
    owner: "AI Risk Manager",
    correctiveAction: "Update risk assessment methodology to include LLM and generative AI specific risk categories.",
  },
  {
    id: "NC-005",
    clauseId: "4.4",
    clauseTitle: "AI management system",
    severity: "Observation",
    description: "Continuous improvement processes are documented but evidence of regular review cycles is limited.",
    rootCause: "Informal review processes not being formally documented.",
    status: "Closed",
    raisedDate: "2025-01-10",
    dueDate: "2025-01-25",
    closedDate: "2025-01-23",
    owner: "Quality Manager",
    correctiveAction: "Implemented quarterly review schedule with documented meeting minutes.",
    verificationNotes: "Verified: Q1 2025 review completed and documented on 2025-01-23.",
  },
  {
    id: "NC-006",
    clauseId: "10.1",
    clauseTitle: "Continual improvement",
    severity: "Minor",
    description: "Improvement action tracking is manual and lacks visibility across teams.",
    rootCause: "No centralized system for tracking improvement actions.",
    status: "Verified",
    raisedDate: "2025-01-22",
    dueDate: "2025-02-10",
    closedDate: "2025-01-24",
    owner: "Quality Manager",
    correctiveAction: "Deployed improvement action module in AIMS console with automated notifications.",
    verificationNotes: "Verified: Module deployed and tested with sample improvement actions.",
  },
];

// Coverage Metrics
export const coverageMetrics: CoverageMetric[] = [
  { label: "Clauses Compliant", value: 15, total: 22, status: "success" },
  { label: "Clauses Partially Compliant", value: 5, total: 22, status: "warning" },
  { label: "Clauses Non-Compliant", value: 1, total: 22, status: "critical" },
  { label: "Clauses Not Assessed", value: 1, total: 22, status: "critical" },
];
