import { RiskLevel } from "@/components/indicators";
import { LifecycleState } from "@/components/indicators";

export type ComplianceStatus = "Compliant" | "At Risk" | "Non-Compliant" | "Pending";

export interface AISystem {
  id: string;
  name: string;
  riskLevel: RiskLevel;
  status: ComplianceStatus;
  provider: string;
  businessUnit: string;
  lifecycleState: LifecycleState;
  description?: string;
}

export const aiSystemsData: AISystem[] = [
  {
    id: "AIS-001",
    name: "Customer Sentiment Analyzer",
    riskLevel: "High",
    status: "At Risk",
    provider: "Internal",
    businessUnit: "Customer Service",
    lifecycleState: "Production",
    description: "NLP-based sentiment analysis for customer feedback"
  },
  {
    id: "AIS-002",
    name: "Fraud Detection Model v2",
    riskLevel: "High",
    status: "Compliant",
    provider: "Internal",
    businessUnit: "Finance",
    lifecycleState: "Production",
    description: "Real-time transaction fraud detection"
  },
  {
    id: "AIS-003",
    name: "Document Classification Engine",
    riskLevel: "Medium",
    status: "Compliant",
    provider: "Azure AI",
    businessUnit: "Legal",
    lifecycleState: "Production",
    description: "Automatic document categorization and routing"
  },
  {
    id: "AIS-004",
    name: "HR Screening Assistant",
    riskLevel: "High",
    status: "Non-Compliant",
    provider: "Internal",
    businessUnit: "Human Resources",
    lifecycleState: "Production",
    description: "CV screening and candidate ranking"
  },
  {
    id: "AIS-005",
    name: "Predictive Maintenance System",
    riskLevel: "Medium",
    status: "Compliant",
    provider: "AWS SageMaker",
    businessUnit: "Operations",
    lifecycleState: "Production",
    description: "Equipment failure prediction"
  },
  {
    id: "AIS-006",
    name: "Chatbot - Customer Support",
    riskLevel: "Low",
    status: "Compliant",
    provider: "OpenAI",
    businessUnit: "Customer Service",
    lifecycleState: "Production",
    description: "First-line customer query resolution"
  },
  {
    id: "AIS-007",
    name: "Credit Scoring Model",
    riskLevel: "High",
    status: "At Risk",
    provider: "Internal",
    businessUnit: "Finance",
    lifecycleState: "Production",
    description: "Consumer credit risk assessment"
  },
  {
    id: "AIS-008",
    name: "Supply Chain Optimizer",
    riskLevel: "Medium",
    status: "Compliant",
    provider: "Internal",
    businessUnit: "Operations",
    lifecycleState: "Production",
    description: "Inventory and logistics optimization"
  },
  {
    id: "AIS-009",
    name: "Content Recommendation Engine",
    riskLevel: "Low",
    status: "Compliant",
    provider: "Internal",
    businessUnit: "Marketing",
    lifecycleState: "Approved",
    description: "Personalized content recommendations"
  },
  {
    id: "AIS-010",
    name: "Medical Diagnosis Assistant",
    riskLevel: "High",
    status: "At Risk",
    provider: "Internal",
    businessUnit: "Healthcare",
    lifecycleState: "Draft",
    description: "Diagnostic support for physicians"
  },
  {
    id: "AIS-011",
    name: "Price Optimization Engine",
    riskLevel: "Medium",
    status: "Pending",
    provider: "AWS SageMaker",
    businessUnit: "Sales",
    lifecycleState: "Draft",
    description: "Dynamic pricing recommendations"
  },
  {
    id: "AIS-012",
    name: "Legacy OCR System",
    riskLevel: "Low",
    status: "Compliant",
    provider: "ABBYY",
    businessUnit: "Operations",
    lifecycleState: "Deprecated",
    description: "Document text extraction"
  },
];
