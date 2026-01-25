export interface RoleAssignment {
  aiSystemId: string;
  aiSystemName: string;
  useCaseOwner: string;
  legalOwner: string;
  riskOwner: string;
  technicalOwner: string;
  evidenceOwner: string;
}

export type DecisionOutcome = "Approved" | "Rejected" | "Deferred" | "Escalated";
export type DecisionType = "Initial Approval" | "Risk Acceptance" | "Production Release" | "Renewal" | "Decommission" | "Change Request";

export interface ApprovalRecord {
  id: string;
  aiSystemId: string;
  aiSystemName: string;
  decisionType: DecisionType;
  decisionMaker: string;
  date: string;
  outcome: DecisionOutcome;
  notes?: string;
}

export interface OversightRule {
  aiSystemId: string;
  aiSystemName: string;
  humanInTheLoop: boolean;
  escalationThreshold: string;
  committeeInvolved: string | null;
}

export const roleAssignments: RoleAssignment[] = [
  {
    aiSystemId: "AIS-001",
    aiSystemName: "Customer Sentiment Analyzer",
    useCaseOwner: "Sarah Chen",
    legalOwner: "Maria Garcia",
    riskOwner: "James Wilson",
    technicalOwner: "Tom Anderson",
    evidenceOwner: "Emma Davis",
  },
  {
    aiSystemId: "AIS-002",
    aiSystemName: "Fraud Detection Model v2",
    useCaseOwner: "James Wilson",
    legalOwner: "Maria Garcia",
    riskOwner: "Jennifer Lee",
    technicalOwner: "Robert Kim",
    evidenceOwner: "James Wilson",
  },
  {
    aiSystemId: "AIS-003",
    aiSystemName: "Document Classification Engine",
    useCaseOwner: "Maria Garcia",
    legalOwner: "Maria Garcia",
    riskOwner: "Maria Garcia",
    technicalOwner: "Chris Johnson",
    evidenceOwner: "Maria Garcia",
  },
  {
    aiSystemId: "AIS-004",
    aiSystemName: "HR Screening Assistant",
    useCaseOwner: "David Park",
    legalOwner: "Maria Garcia",
    riskOwner: "David Park",
    technicalOwner: "Lisa Thompson",
    evidenceOwner: "David Park",
  },
  {
    aiSystemId: "AIS-005",
    aiSystemName: "Predictive Maintenance System",
    useCaseOwner: "Lisa Thompson",
    legalOwner: "Maria Garcia",
    riskOwner: "Lisa Thompson",
    technicalOwner: "Robert Kim",
    evidenceOwner: "Lisa Thompson",
  },
  {
    aiSystemId: "AIS-006",
    aiSystemName: "Chatbot - Customer Support",
    useCaseOwner: "Tom Anderson",
    legalOwner: "Maria Garcia",
    riskOwner: "Sarah Chen",
    technicalOwner: "Tom Anderson",
    evidenceOwner: "Emma Davis",
  },
  {
    aiSystemId: "AIS-007",
    aiSystemName: "Credit Scoring Model",
    useCaseOwner: "Jennifer Lee",
    legalOwner: "Maria Garcia",
    riskOwner: "Jennifer Lee",
    technicalOwner: "James Wilson",
    evidenceOwner: "Jennifer Lee",
  },
  {
    aiSystemId: "AIS-008",
    aiSystemName: "Supply Chain Optimizer",
    useCaseOwner: "Robert Kim",
    legalOwner: "Maria Garcia",
    riskOwner: "Robert Kim",
    technicalOwner: "Robert Kim",
    evidenceOwner: "Lisa Thompson",
  },
  {
    aiSystemId: "AIS-009",
    aiSystemName: "Content Recommendation Engine",
    useCaseOwner: "Emma Davis",
    legalOwner: "Maria Garcia",
    riskOwner: "Emma Davis",
    technicalOwner: "Tom Anderson",
    evidenceOwner: "Emma Davis",
  },
  {
    aiSystemId: "AIS-010",
    aiSystemName: "Medical Diagnosis Assistant",
    useCaseOwner: "Dr. Michael Brown",
    legalOwner: "Maria Garcia",
    riskOwner: "Dr. Michael Brown",
    technicalOwner: "Lisa Thompson",
    evidenceOwner: "Dr. Michael Brown",
  },
  {
    aiSystemId: "AIS-011",
    aiSystemName: "Price Optimization Engine",
    useCaseOwner: "Alex Martinez",
    legalOwner: "Maria Garcia",
    riskOwner: "Alex Martinez",
    technicalOwner: "Robert Kim",
    evidenceOwner: "Alex Martinez",
  },
  {
    aiSystemId: "AIS-012",
    aiSystemName: "Legacy OCR System",
    useCaseOwner: "Chris Johnson",
    legalOwner: "Maria Garcia",
    riskOwner: "Chris Johnson",
    technicalOwner: "Chris Johnson",
    evidenceOwner: "Chris Johnson",
  },
];

export const approvalHistory: ApprovalRecord[] = [
  {
    id: "APR-001",
    aiSystemId: "AIS-001",
    aiSystemName: "Customer Sentiment Analyzer",
    decisionType: "Initial Approval",
    decisionMaker: "AI Ethics Committee",
    date: "2024-03-15",
    outcome: "Approved",
  },
  {
    id: "APR-002",
    aiSystemId: "AIS-002",
    aiSystemName: "Fraud Detection Model v2",
    decisionType: "Production Release",
    decisionMaker: "CTO Office",
    date: "2024-06-22",
    outcome: "Approved",
  },
  {
    id: "APR-003",
    aiSystemId: "AIS-004",
    aiSystemName: "HR Screening Assistant",
    decisionType: "Initial Approval",
    decisionMaker: "AI Ethics Committee",
    date: "2024-01-10",
    outcome: "Approved",
    notes: "Conditional approval pending bias audit",
  },
  {
    id: "APR-004",
    aiSystemId: "AIS-004",
    aiSystemName: "HR Screening Assistant",
    decisionType: "Risk Acceptance",
    decisionMaker: "Chief Risk Officer",
    date: "2024-08-05",
    outcome: "Deferred",
    notes: "Additional controls required before acceptance",
  },
  {
    id: "APR-005",
    aiSystemId: "AIS-007",
    aiSystemName: "Credit Scoring Model",
    decisionType: "Renewal",
    decisionMaker: "Compliance Board",
    date: "2025-01-12",
    outcome: "Approved",
  },
  {
    id: "APR-006",
    aiSystemId: "AIS-010",
    aiSystemName: "Medical Diagnosis Assistant",
    decisionType: "Initial Approval",
    decisionMaker: "AI Ethics Committee",
    date: "2025-09-20",
    outcome: "Escalated",
    notes: "Escalated to Executive Board due to patient safety implications",
  },
  {
    id: "APR-007",
    aiSystemId: "AIS-012",
    aiSystemName: "Legacy OCR System",
    decisionType: "Decommission",
    decisionMaker: "IT Governance",
    date: "2025-11-30",
    outcome: "Approved",
    notes: "Scheduled for Q2 2026 retirement",
  },
  {
    id: "APR-008",
    aiSystemId: "AIS-003",
    aiSystemName: "Document Classification Engine",
    decisionType: "Change Request",
    decisionMaker: "Legal Department",
    date: "2025-12-10",
    outcome: "Approved",
  },
  {
    id: "APR-009",
    aiSystemId: "AIS-006",
    aiSystemName: "Chatbot - Customer Support",
    decisionType: "Production Release",
    decisionMaker: "CTO Office",
    date: "2024-09-05",
    outcome: "Approved",
  },
  {
    id: "APR-010",
    aiSystemId: "AIS-011",
    aiSystemName: "Price Optimization Engine",
    decisionType: "Initial Approval",
    decisionMaker: "AI Ethics Committee",
    date: "2025-12-18",
    outcome: "Rejected",
    notes: "Concerns about potential market manipulation",
  },
];

export const oversightRules: OversightRule[] = [
  {
    aiSystemId: "AIS-001",
    aiSystemName: "Customer Sentiment Analyzer",
    humanInTheLoop: false,
    escalationThreshold: "Accuracy drops below 85%",
    committeeInvolved: null,
  },
  {
    aiSystemId: "AIS-002",
    aiSystemName: "Fraud Detection Model v2",
    humanInTheLoop: true,
    escalationThreshold: "Transactions > €50,000",
    committeeInvolved: "Fraud Review Panel",
  },
  {
    aiSystemId: "AIS-003",
    aiSystemName: "Document Classification Engine",
    humanInTheLoop: false,
    escalationThreshold: "Confidence < 70%",
    committeeInvolved: null,
  },
  {
    aiSystemId: "AIS-004",
    aiSystemName: "HR Screening Assistant",
    humanInTheLoop: true,
    escalationThreshold: "All decisions",
    committeeInvolved: "HR Review Board",
  },
  {
    aiSystemId: "AIS-005",
    aiSystemName: "Predictive Maintenance System",
    humanInTheLoop: false,
    escalationThreshold: "Critical equipment alerts",
    committeeInvolved: null,
  },
  {
    aiSystemId: "AIS-006",
    aiSystemName: "Chatbot - Customer Support",
    humanInTheLoop: true,
    escalationThreshold: "Complaint keywords detected",
    committeeInvolved: null,
  },
  {
    aiSystemId: "AIS-007",
    aiSystemName: "Credit Scoring Model",
    humanInTheLoop: true,
    escalationThreshold: "All rejections",
    committeeInvolved: "Credit Committee",
  },
  {
    aiSystemId: "AIS-008",
    aiSystemName: "Supply Chain Optimizer",
    humanInTheLoop: false,
    escalationThreshold: "Cost variance > 15%",
    committeeInvolved: null,
  },
  {
    aiSystemId: "AIS-009",
    aiSystemName: "Content Recommendation Engine",
    humanInTheLoop: false,
    escalationThreshold: "User complaints > 10/day",
    committeeInvolved: null,
  },
  {
    aiSystemId: "AIS-010",
    aiSystemName: "Medical Diagnosis Assistant",
    humanInTheLoop: true,
    escalationThreshold: "All diagnoses",
    committeeInvolved: "Clinical Oversight Board",
  },
  {
    aiSystemId: "AIS-011",
    aiSystemName: "Price Optimization Engine",
    humanInTheLoop: true,
    escalationThreshold: "Price changes > 20%",
    committeeInvolved: "Pricing Committee",
  },
  {
    aiSystemId: "AIS-012",
    aiSystemName: "Legacy OCR System",
    humanInTheLoop: false,
    escalationThreshold: "Error rate > 5%",
    committeeInvolved: null,
  },
];
