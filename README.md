# AIMS — AI Management System Console

<div align="center">

**ISO/IEC 42001 Compliant AI Governance Platform**

*Designed by **Garrigues** · Powered by **Galtea***

</div>

---

## Overview

AIMS (AI Management System) is an enterprise-grade console for managing AI systems in compliance with **ISO/IEC 42001** — the international standard for AI Management Systems. It provides organizations with a structured framework to inventory, govern, monitor, and continuously improve their AI deployments while maintaining audit-ready documentation.

### Key Value Propositions

- **Regulatory Compliance**: Full alignment with ISO/IEC 42001 clauses and requirements
- **Centralized Governance**: Single source of truth for all AI system oversight
- **Risk-Based Approach**: Systematic identification, assessment, and mitigation of AI risks
- **Audit Readiness**: Evidence collection and documentation for certification audits
- **Continuous Improvement**: Incident tracking and corrective action management (CAPA)

---

## Modules

AIMS is organized into **8 interconnected modules**, each addressing specific ISO 42001 requirements:

### 1. Overview — AIMS Status Dashboard
The executive command center providing at-a-glance visibility into organizational AI compliance posture.

| Feature | Description |
|---------|-------------|
| Compliance Metrics | Real-time status of AI systems across risk levels |
| ISO Clause Coverage | Percentage completion of 42001 requirements |
| Alert Summary | Systems at risk, open incidents, pending actions |
| Upcoming Audits | Calendar of scheduled certification activities |

### 2. AI Inventory & Scope
Comprehensive registry of all AI systems within organizational scope.

| Column | Purpose |
|--------|---------|
| System ID | Unique identifier (AIS-XXX format) |
| Name | Descriptive system name |
| Risk Level | High / Medium / Low classification |
| Compliance Status | Compliant / At Risk / Non-Compliant / Pending |
| Provider | Internal or vendor (Azure AI, AWS, OpenAI, etc.) |
| Business Unit | Owning department |
| Lifecycle State | Draft → Approved → Production → Deprecated |

**Drill-down capabilities**: Click any system to view detailed metadata, linked risks, controls, and governance records.

### 3. Governance & Accountability
RACI matrix and approval workflows ensuring clear ownership and decision authority.

| Section | Content |
|---------|---------|
| Role Assignments | Use Case Owner, Legal Owner, Risk Owner, Technical Owner, Evidence Owner |
| Approval History | Chronological log of decisions (Approved/Rejected/Deferred/Escalated) |
| Oversight Rules | Human-in-the-loop requirements, escalation thresholds, committee involvement |

**Decision Types**: Initial Approval, Risk Acceptance, Production Release, Renewal, Decommission, Change Request

### 4. AI Risk Management
Structured risk register with scoring methodology and control mapping.

| Field | Description |
|-------|-------------|
| Risk ID | Unique identifier (RSK-XXX) |
| Description | Clear articulation of the risk scenario |
| Impact / Probability | 5-point scale assessment |
| Risk Score | Calculated severity (Impact × Probability) |
| Risk Category | Bias, Privacy, Security, Safety, Reliability, Transparency, Legal |
| Mitigation Status | Open / Mitigated / Accepted / Transferred |
| Control Mapping | Linked operational controls |
| Owner | Accountable individual |

### 5. Operational Controls & Guardrails
Technical and procedural safeguards applied to AI systems.

| Control Type | Examples |
|--------------|----------|
| Input Validation | Prompt filtering, data sanitization |
| Output Controls | Content moderation, confidence thresholds |
| Access Controls | Authentication, authorization, audit logging |
| Monitoring | Performance thresholds, drift detection |
| Fallback | Human escalation, graceful degradation |

### 6. Monitoring & Evidence
Continuous observation and evidence collection for audit purposes.

| Component | Function |
|-----------|----------|
| Event Timeline | Chronological log of system events and decisions |
| KPI Metrics | Performance indicators with thresholds |
| Evidence Packs | Exportable documentation (PDF, Markdown, JSON) |
| Alert History | Triggered alerts with resolution tracking |

### 7. Incidents & Continuous Improvement
ISO-required incident handling and CAPA (Corrective and Preventive Actions) management.

| Field | Purpose |
|-------|---------|
| Incident ID | Unique identifier (INC-XXX) |
| Severity | Critical / High / Medium / Low |
| Status | Open / Investigating / Resolved / Closed |
| Root Cause | Structured root cause analysis |
| Timeline | Event-by-event incident progression |
| CAPA Register | Corrective actions with due dates and status |
| Lessons Learned | Organizational improvement documentation |

### 8. Audit & Certification
ISO 42001 clause checklist and non-conformity tracking for certification readiness.

| Section | Content |
|---------|---------|
| ISO Clause Checklist | All 42001 clauses with compliance status |
| Coverage Metrics | Percentage completion per clause category |
| Evidence Links | Associated documentation per requirement |
| Non-Conformity Register | Major/Minor NCs with CAPA tracking |
| Audit Schedule | Internal and external audit calendar |

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS + CSS Custom Properties |
| **UI Components** | shadcn/ui (Radix primitives) |
| **State Management** | TanStack Query |
| **Routing** | React Router v6 |
| **Icons** | Lucide React |
| **Charts** | Recharts |

---

## Design System — Garrigues UX Blueprint

AIMS implements the **Garrigues corporate design system**, optimized for audit-grade professional applications.

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--g-brand-primary` | `#004438` (Pantone 3308 C) | Primary brand, navigation |
| `--g-brand-secondary` | `#00382D` | Hover states, accents |
| `--g-brand-bright` | `#28A745` | Success states, positive indicators |
| `--g-surface-base` | `#F8F9FA` | Page background |
| `--g-surface-card` | `#FFFFFF` | Card backgrounds |
| `--g-text-primary` | `#1A1A1A` | Primary text |
| `--g-text-secondary` | `#6B7280` | Secondary text |

### Typography

| Element | Font | Weight |
|---------|------|--------|
| Headings | Montserrat | 600-700 |
| Body | Montserrat | 400-500 |
| Monospace | System mono | 400 |

### Accessibility

- **WCAG AA Compliant**: All text meets minimum contrast ratios
- **Status Communication**: Never color-alone — always text + icon
- **Keyboard Navigation**: Full tab order and focus management
- **ARIA Labels**: Semantic markup for screen readers

---

## Project Structure

```
src/
├── components/
│   ├── indicators/          # Status, Risk, Severity, Lifecycle indicators
│   ├── layout/              # AppLayout, AppSidebar, PageHeader
│   └── ui/                  # shadcn/ui primitives
├── data/
│   ├── aiSystems.ts         # AI Inventory mock data
│   ├── governance.ts        # RACI, approvals, oversight rules
│   ├── risks.ts             # Risk register data
│   ├── guardrails.ts        # Operational controls
│   ├── monitoring.ts        # Events, KPIs, alerts
│   ├── incidents.ts         # Incident register, CAPA
│   └── audit.ts             # ISO clauses, non-conformities
├── pages/
│   ├── Overview.tsx         # Dashboard
│   ├── AIInventory.tsx      # System registry
│   ├── Governance.tsx       # Accountability
│   ├── RiskManagement.tsx   # Risk register
│   ├── OperationalControls.tsx
│   ├── Monitoring.tsx       # Evidence & KPIs
│   ├── Incidents.tsx        # CAPA management
│   └── Audit.tsx            # Certification readiness
├── styles/
│   └── tokens.css           # Garrigues design tokens
├── hooks/                   # Custom React hooks
├── lib/                     # Utilities
└── main.tsx                 # Application entry
```

---

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd aims-console

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## Data Model

### Core Entities

```typescript
// AI System
interface AISystem {
  id: string;
  name: string;
  riskLevel: "High" | "Medium" | "Low";
  status: "Compliant" | "At Risk" | "Non-Compliant" | "Pending";
  provider: string;
  businessUnit: string;
  lifecycleState: "Draft" | "Approved" | "Production" | "Deprecated";
}

// Risk Entry
interface Risk {
  id: string;
  aiSystemId: string;
  description: string;
  category: RiskCategory;
  impact: 1 | 2 | 3 | 4 | 5;
  probability: 1 | 2 | 3 | 4 | 5;
  riskScore: number;
  status: "Open" | "Mitigated" | "Accepted" | "Transferred";
  owner: string;
}

// Incident
interface Incident {
  id: string;
  aiSystemId: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  status: "Open" | "Investigating" | "Resolved" | "Closed";
  rootCauseIdentified: boolean;
  correctiveActions: CorrectiveAction[];
}

// ISO Clause
interface ISOClause {
  id: string;
  clauseNumber: string;
  title: string;
  status: "Compliant" | "Partial" | "Non-Compliant" | "Not Assessed";
  evidenceCount: number;
}
```

---

## ISO/IEC 42001 Alignment

AIMS maps directly to ISO 42001 clause structure:

| Clause | Title | AIMS Module |
|--------|-------|-------------|
| 4 | Context of the Organization | Overview, AI Inventory |
| 5 | Leadership | Governance |
| 6 | Planning | Risk Management |
| 7 | Support | Operational Controls |
| 8 | Operation | Monitoring, Controls |
| 9 | Performance Evaluation | Monitoring, Audit |
| 10 | Improvement | Incidents |

---

## Roadmap

### Phase 1 (Current) ✅
- [x] Application shell and navigation
- [x] All 8 module implementations
- [x] Mock data structures
- [x] Garrigues design system

### Phase 2 (Planned)
- [ ] Backend integration (Supabase/Lovable Cloud)
- [ ] User authentication and RBAC
- [ ] Real-time data synchronization
- [ ] Evidence file upload and storage
- [ ] PDF report generation

### Phase 3 (Future)
- [ ] Workflow automation
- [ ] Email notifications
- [ ] API integrations (GRC platforms)
- [ ] Multi-tenant support
- [ ] Audit trail and versioning

---

## Contributing

This project follows the Garrigues UX Blueprint. All contributions must:

1. Use design tokens (`--g-*` CSS variables) exclusively
2. Maintain WCAG AA accessibility compliance
3. Follow the established component patterns
4. Include appropriate ARIA labels and keyboard navigation

---

## License

Proprietary — Garrigues / Galtea

---

<div align="center">

**AIMS Console v0.1.0**

*Building trust in AI through structured governance*

</div>
