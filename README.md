 # AIMS — AI Management System Console
 
 <div align="center">
 
 ![AIMS Version](https://img.shields.io/badge/version-0.1.0-004438)
 ![ISO 42001](https://img.shields.io/badge/ISO%2FIEC-42001%3A2023-28A745)
 ![License](https://img.shields.io/badge/license-Proprietary-6B7280)
 
 **Enterprise AI Governance & Compliance Platform**
 
 *Designed by **Garrigues** · Powered by **Galtea***
 
 [Overview](#overview) • [Modules](#modules) • [Workflows](#supported-workflows) • [Architecture](#architecture) • [Getting Started](#getting-started)
 
 </div>
 
 ---
 
 ## Table of Contents
 
 1. [Overview](#overview)
 2. [Key Capabilities](#key-capabilities)
 3. [Modules](#modules)
 4. [Supported Workflows](#supported-workflows)
 5. [Data Model](#data-model)
 6. [Architecture](#architecture)
 7. [ISO/IEC 42001 Alignment](#isoiec-42001-alignment)
 8. [Design System](#design-system--garrigues-ux-blueprint)
 9. [Getting Started](#getting-started)
 10. [API Reference](#api-reference)
 11. [Roadmap](#roadmap)
 12. [Contributing](#contributing)
 
 ---
 
 ## Overview
 
 **AIMS (AI Management System)** is an enterprise-grade governance console for managing AI systems in full compliance with **ISO/IEC 42001:2023** — the international standard for AI Management Systems.
 
 The platform provides organizations with a structured framework to:
 
 - **Inventory** all AI systems within organizational scope
 - **Govern** with clear accountability and approval workflows
 - **Assess & Mitigate** risks using structured methodologies
 - **Monitor** performance and collect audit evidence
 - **Respond** to incidents with CAPA (Corrective and Preventive Actions)
 - **Certify** readiness through ISO clause tracking
 
 ### Why AIMS?
 
 | Challenge | AIMS Solution |
 |-----------|---------------|
 | Fragmented AI oversight | Centralized registry of all AI systems |
 | Unclear accountability | RACI matrices with explicit ownership |
 | Risk blind spots | Structured risk register with scoring |
 | Audit preparation chaos | Evidence packs exportable on demand |
 | Incident response gaps | CAPA tracking with root cause analysis |
 | Certification complexity | ISO clause checklist with coverage metrics |
 
 ---
 
 ## Key Capabilities
 
 ### 🎯 Core Functions
 
 | Capability | Description |
 |------------|-------------|
 | **AI Asset Registry** | Complete inventory with lifecycle tracking |
 | **Risk Scoring** | Impact × Probability matrix with heat maps |
 | **Control Mapping** | Link risks to operational guardrails |
 | **Approval Workflows** | Multi-stage governance with decision history |
 | **Incident Management** | Full CAPA lifecycle with lessons learned |
 | **Audit Evidence** | Exportable documentation packages |
 | **ISO Compliance** | Clause-by-clause status tracking |
 
 ### 🔐 Governance Features
 
 - **Human-in-the-Loop Rules**: Configurable oversight requirements
 - **Escalation Thresholds**: Automatic routing to committees
 - **Decision Audit Trail**: Complete history of all approvals
 - **Role-Based Access**: Granular permissions (future)
 
 ### 📊 Monitoring & Analytics
 
 - **Real-time KPIs**: Performance indicators with thresholds
 - **Event Timeline**: Chronological activity log
 - **Alert Management**: Configurable notifications
 - **Drift Detection**: Model performance monitoring (future)
 
 ---

 ## Modules

 AIMS consists of **8 interconnected modules**, each addressing specific ISO 42001 requirements:

 ```
 ┌─────────────────────────────────────────────────────────────────┐
 │                        AIMS CONSOLE                             │
 ├─────────────────────────────────────────────────────────────────┤
 │                                                                 │
 │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
 │  │ Overview │  │Inventory │  │Governance│  │   Risk   │        │
 │  │Dashboard │  │ & Scope  │  │  & RACI  │  │Management│        │
 │  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘        │
 │       │             │             │             │               │
 │  ┌────▼─────┐  ┌────▼─────┐  ┌────▼─────┐  ┌────▼─────┐        │
 │  │Operational│ │Monitoring│  │Incidents │  │  Audit   │        │
 │  │ Controls │  │& Evidence│  │  & CAPA  │  │& Certif. │        │
 │  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
 │                                                                 │
 └─────────────────────────────────────────────────────────────────┘
 ```

 ### Module Overview

 | # | Module | Purpose | ISO Clause |
 |---|--------|---------|------------|
 | 1 | **Overview** | Executive dashboard with compliance metrics | 4, 9 |
 | 2 | **AI Inventory** | System registry with lifecycle tracking | 4.3, 8.1 |
 | 3 | **Governance** | RACI matrix and approval workflows | 5.1, 5.3 |
 | 4 | **Risk Management** | Risk register with scoring methodology | 6.1, 6.2 |
 | 5 | **Operational Controls** | Technical and procedural guardrails | 7.1, 8.1 |
 | 6 | **Monitoring** | Evidence collection and KPI tracking | 9.1, 9.2 |
 | 7 | **Incidents** | CAPA management and improvement | 10.1, 10.2 |
 | 8 | **Audit** | ISO clause checklist and NC tracking | 9.2, 9.3 |

 ### 1. Overview — Executive Dashboard

 The command center providing at-a-glance visibility into organizational AI compliance posture.

 **Key Metrics Displayed:**
 - Total AI systems by risk level (High/Medium/Low)
 - Compliance status distribution
 - Open incidents and pending actions
 - ISO clause coverage percentage
 - Upcoming audit schedule

 **Use Cases:**
 - Executive reporting and board presentations
 - Quick identification of systems requiring attention
 - Monitoring organizational compliance trends

 ### 2. AI Inventory & Scope

 Complete registry of all AI systems under organizational governance.

 | Field | Description | Example |
 |-------|-------------|---------|
 | System ID | Unique identifier | `AIS-001` |
 | Name | Descriptive name | Customer Sentiment Analyzer |
 | Risk Level | Classification tier | High / Medium / Low |
 | Status | Compliance state | Compliant / At Risk / Non-Compliant / Pending |
 | Provider | Source | Internal / Azure AI / AWS / OpenAI |
 | Business Unit | Owning department | Finance, HR, Operations |
 | Lifecycle | Current stage | Draft → Approved → Production → Deprecated |

 **Drill-down capabilities**: Click any system to view linked risks, controls, and governance records.

 ### 3. Governance & Accountability

 RACI matrix and approval workflows ensuring clear ownership.

 **Role Assignments (RACI):**
 | Role | Responsibility |
 |------|----------------|
 | Use Case Owner | Business sponsor accountable for outcomes |
 | Legal Owner | Regulatory and compliance oversight |
 | Risk Owner | Risk assessment and mitigation authority |
 | Technical Owner | System implementation and maintenance |
 | Evidence Owner | Documentation and audit evidence |

 **Decision Types Tracked:**
 - Initial Approval
 - Risk Acceptance
 - Production Release
 - Renewal
 - Decommission
 - Change Request

 ### 4. AI Risk Management

 Structured risk register with quantitative scoring methodology.

 **Risk Scoring Matrix:**

 ```
 PROBABILITY
      5 │  5  10  15  20  25
      4 │  4   8  12  16  20
      3 │  3   6   9  12  15
      2 │  2   4   6   8  10
      1 │  1   2   3   4   5
        └──────────────────────
           1   2   3   4   5  IMPACT
 
 Risk Score = Impact × Probability
 
 ■ Critical (20-25)  ■ High (12-19)  ■ Medium (6-11)  ■ Low (1-5)
 ```

 **Risk Categories:**
 - Bias & Fairness
 - Privacy & Data Protection
 - Security & Cybersecurity
 - Safety & Physical Harm
 - Reliability & Performance
 - Transparency & Explainability
 - Legal & Regulatory

### 5. Operational Controls & Guardrails

| Control Type | Examples |
|--------------|----------|
| Input Validation | Prompt filtering, data sanitization |
| Output Controls | Content moderation, confidence thresholds |
| Access Controls | Authentication, authorization, audit logging |
| Monitoring | Performance thresholds, drift detection |
| Fallback | Human escalation, graceful degradation |

 **Control States:**
 - ✅ Active — Operational and enforced
 - ⚠️ Degraded — Partially operational
 - ❌ Failed — Not functioning
 - ⏸️ Bypassed — Temporarily disabled
 
### 6. Monitoring & Evidence

 Continuous observation and audit evidence collection.
 
 **Event Types Tracked:**
 - System deployments and updates
 - Configuration changes
 - Policy modifications
 - Approval decisions
 - Incident occurrences
 - Audit activities
 
 **Evidence Export Formats:**
 - 📄 PDF — Formal audit documentation
 - 📝 Markdown — Technical documentation
 - 📊 JSON — Machine-readable data

### 7. Incidents & Continuous Improvement

 ISO-required incident handling with CAPA management.
 
 **Incident Lifecycle:**
 ```
 ┌──────┐    ┌─────────────┐    ┌──────────┐    ┌────────┐
 │ Open │───▶│Investigating│───▶│ Resolved │───▶│ Closed │
 └──────┘    └─────────────┘    └──────────┘    └────────┘
                   │                   │
                   └───────────────────┘
                     Root Cause Analysis
 ```
 
 **CAPA Types:**
 - **Corrective Actions**: Fix identified issues
 - **Preventive Actions**: Prevent recurrence
 - **Improvement Actions**: Enhance processes

### 8. Audit & Certification

 ISO 42001 clause checklist and non-conformity tracking.
 
 **Clause Status Legend:**
 | Status | Meaning |
 |--------|---------|
 | ✅ Compliant | Full evidence, no gaps |
 | 🔶 Partial | Some evidence, gaps identified |
 | ❌ Non-Compliant | Missing or inadequate evidence |
 | ⚪ Not Assessed | Pending initial review |
 
 **Non-Conformity Severity:**
 - **Major NC**: Significant gap requiring immediate action
 - **Minor NC**: Opportunity for improvement
 - **Observation**: Best practice recommendation

---

 ## Supported Workflows
 
 AIMS supports the following end-to-end governance workflows:
 
 ### Workflow 1: AI System Onboarding
 
 **Purpose**: Register and assess a new AI system for organizational use.
 
 ```
 ┌─────────────────────────────────────────────────────────────────────────┐
 │                    AI SYSTEM ONBOARDING WORKFLOW                        │
 └─────────────────────────────────────────────────────────────────────────┘
 
 Step 1: REGISTRATION
 ────────────────────
 ┌─────────────┐
 │ AI Inventory│ ──▶ Create new system entry
 │   Module    │     • System ID (auto-generated)
 └─────────────┘     • Name, Description
                     • Provider (Internal/External)
                     • Business Unit assignment
                     • Initial lifecycle state: DRAFT
 
 Step 2: RISK ASSESSMENT
 ───────────────────────
 ┌─────────────┐
 │    Risk     │ ──▶ Conduct risk analysis
 │ Management  │     • Identify potential risks
 └─────────────┘     • Score Impact (1-5)
                     • Score Probability (1-5)
                     • Calculate Risk Score
                     • Assign Risk Category
                     • Designate Risk Owner
 
 Step 3: CONTROL MAPPING
 ───────────────────────
 ┌─────────────┐
 │ Operational │ ──▶ Assign guardrails
 │  Controls   │     • Input validation rules
 └─────────────┘     • Output controls
                     • Access restrictions
                     • Monitoring requirements
                     • Fallback procedures
 
 Step 4: GOVERNANCE SETUP
 ────────────────────────
 ┌─────────────┐
 │ Governance  │ ──▶ Establish accountability
 │   Module    │     • Assign RACI roles
 └─────────────┘     • Define oversight rules
                     • Set escalation thresholds
                     • Configure approval requirements
 
 Step 5: APPROVAL
 ────────────────
 ┌─────────────┐
 │ Governance  │ ──▶ Submit for approval
 │   Module    │     • Decision: Approved / Rejected / Deferred
 └─────────────┘     • Lifecycle state: DRAFT → APPROVED
                     • Record decision in audit trail
 
 Step 6: DEPLOYMENT
 ──────────────────
 ┌─────────────┐
 │ AI Inventory│ ──▶ Production release
 │   Module    │     • Lifecycle state: APPROVED → PRODUCTION
 └─────────────┘     • Activate monitoring
                     • Enable guardrails
                     • Start evidence collection
 
 ═══════════════════════════════════════════════════════════════════════════
 RESULT: AI system registered, assessed, controlled, and production-ready
 ═══════════════════════════════════════════════════════════════════════════
 ```
 
 ---
 
 ### Workflow 2: Risk Assessment & Mitigation
 
 **Purpose**: Systematically identify, score, and mitigate AI-related risks.
 
 ```
 ┌─────────────────────────────────────────────────────────────────────────┐
 │                   RISK ASSESSMENT WORKFLOW                              │
 └─────────────────────────────────────────────────────────────────────────┘
 
 ┌──────────────┐
 │   IDENTIFY   │ ──▶ Document risk scenario
 │              │     • What could go wrong?
 └──────┬───────┘     • Who/what is affected?
        │             • Under what circumstances?
        ▼
 ┌──────────────┐
 │   ANALYZE    │ ──▶ Assess severity
 │              │     • Impact score (1-5)
 └──────┬───────┘     • Probability score (1-5)
        │             • Risk Score = Impact × Probability
        ▼
 ┌──────────────┐
 │  CATEGORIZE  │ ──▶ Classify risk type
 │              │     • Bias / Privacy / Security
 └──────┬───────┘     • Safety / Reliability / Transparency
        │             • Legal / Regulatory
        ▼
 ┌──────────────┐
 │    TREAT     │ ──▶ Determine response
 │              │     ┌─────────────────────────────────┐
 └──────┬───────┘     │ MITIGATE: Implement controls    │
        │             │ ACCEPT: Document risk tolerance │
        │             │ TRANSFER: Insurance/outsource   │
        │             │ AVOID: Discontinue activity     │
        │             └─────────────────────────────────┘
        ▼
 ┌──────────────┐
 │   MONITOR    │ ──▶ Track residual risk
 │              │     • Link to controls
 └──────┬───────┘     • Define KPIs
        │             • Set review frequency
        ▼
 ┌──────────────┐
 │   REVIEW     │ ──▶ Periodic reassessment
 │              │     • Quarterly review cycle
 └──────────────┘     • Update scores as needed
                      • Document changes
 ```
 
 **Risk Treatment Options:**
 
 | Treatment | Action | When to Use |
 |-----------|--------|-------------|
 | **Mitigate** | Implement controls | Risk can be reduced to acceptable level |
 | **Accept** | Document tolerance | Risk is within appetite, cost of control exceeds benefit |
 | **Transfer** | Outsource/insure | Risk can be shared with third party |
 | **Avoid** | Stop activity | Risk is unacceptable, no viable mitigation |
 
 ---
 
 ### Workflow 3: Incident Response & CAPA
 
 **Purpose**: Handle AI-related incidents with structured root cause analysis and corrective actions.
 
 ```
 ┌─────────────────────────────────────────────────────────────────────────┐
 │                    INCIDENT RESPONSE WORKFLOW                           │
 └─────────────────────────────────────────────────────────────────────────┘
 
 PHASE 1: DETECTION & TRIAGE
 ───────────────────────────
 
   ┌────────────┐    ┌────────────┐    ┌────────────┐
   │  Automated │    │   User     │    │  External  │
   │   Alert    │    │  Report    │    │  Report    │
   └─────┬──────┘    └─────┬──────┘    └─────┬──────┘
         │                 │                 │
         └────────────────┼─────────────────┘
                          ▼
                ┌──────────────────┐
                │ CREATE INCIDENT  │
                │   (Status: Open) │
                └────────┬─────────┘
                         ▼
                ┌──────────────────┐
                │ ASSIGN SEVERITY  │
                │ Critical/High/   │
                │ Medium/Low       │
                └────────┬─────────┘
                         ▼
                ┌──────────────────┐
                │  ASSIGN OWNER    │
                │  (Investigation) │
                └────────┬─────────┘
                         │
 PHASE 2: INVESTIGATION  │
 ────────────────────────│
                         ▼
                ┌──────────────────┐
                │   INVESTIGATE    │
                │(Status: Invest.) │
                └────────┬─────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
   ┌───────────┐   ┌───────────┐   ┌───────────┐
   │  Collect  │   │  Analyze  │   │ Interview │
   │   Logs    │   │   Data    │   │   Staff   │
   └─────┬─────┘   └─────┬─────┘   └─────┬─────┘
         │               │               │
         └───────────────┼───────────────┘
                         ▼
                ┌──────────────────┐
                │  ROOT CAUSE      │
                │  ANALYSIS (RCA)  │
                │  • 5 Whys        │
                │  • Fishbone      │
                │  • Fault Tree    │
                └────────┬─────────┘
                         │
 PHASE 3: RESOLUTION     │
 ────────────────────────│
                         ▼
                ┌──────────────────┐
                │  CREATE CAPA     │
                │  (Corrective &   │
                │  Preventive)     │
                └────────┬─────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
   ┌───────────┐   ┌───────────┐   ┌───────────┐
   │ Immediate │   │ Root Cause│   │ Systemic  │
   │   Fix     │   │   Fix     │   │   Fix     │
   └─────┬─────┘   └─────┬─────┘   └─────┬─────┘
         │               │               │
         └───────────────┼───────────────┘
                         ▼
                ┌──────────────────┐
                │    RESOLVE       │
                │(Status: Resolved)│
                └────────┬─────────┘
                         │
 PHASE 4: CLOSURE        │
 ────────────────────────│
                         ▼
                ┌──────────────────┐
                │ VERIFY CAPA      │
                │ EFFECTIVENESS    │
                └────────┬─────────┘
                         ▼
                ┌──────────────────┐
                │ DOCUMENT LESSONS │
                │    LEARNED       │
                └────────┬─────────┘
                         ▼
                ┌──────────────────┐
                │     CLOSE        │
                │ (Status: Closed) │
                └──────────────────┘
 ```
 
 **Severity Response Times:**
 
 | Severity | Initial Response | Resolution Target |
 |----------|------------------|-------------------|
 | Critical | 1 hour | 24 hours |
 | High | 4 hours | 72 hours |
 | Medium | 24 hours | 7 days |
 | Low | 72 hours | 30 days |
 
 ---
 
 ### Workflow 4: Approval & Decision Making
 
 **Purpose**: Structured governance for AI system decisions.
 
 ```
 ┌─────────────────────────────────────────────────────────────────────────┐
 │                    APPROVAL WORKFLOW                                    │
 └─────────────────────────────────────────────────────────────────────────┘
 
                    ┌─────────────────┐
                    │ REQUEST RAISED  │
                    │ (Any decision   │
                    │  type)          │
                    └────────┬────────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │      RISK LEVEL CHECK        │
              └──────────────┬───────────────┘
                             │
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
    ┌───────────┐      ┌───────────┐      ┌───────────┐
    │   HIGH    │      │  MEDIUM   │      │    LOW    │
    │   RISK    │      │   RISK    │      │   RISK    │
    └─────┬─────┘      └─────┬─────┘      └─────┬─────┘
          │                  │                  │
          ▼                  ▼                  ▼
    ┌───────────┐      ┌───────────┐      ┌───────────┐
    │ AI Ethics │      │   Risk    │      │  Direct   │
    │ Committee │      │  Owner    │      │  Manager  │
    │  Review   │      │  Review   │      │  Approval │
    └─────┬─────┘      └─────┬─────┘      └─────┬─────┘
          │                  │                  │
          │                  │                  │
          ▼                  ▼                  ▼
    ┌─────────────────────────────────────────────────┐
    │              DECISION RECORDED                  │
    │  ┌──────────┬──────────┬──────────┬──────────┐ │
    │  │ APPROVED │ REJECTED │ DEFERRED │ESCALATED │ │
    │  └──────────┴──────────┴──────────┴──────────┘ │
    └─────────────────────────────────────────────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │   UPDATE LIFECYCLE    │
                 │   STATE (if needed)   │
                 └───────────────────────┘
 ```
 
 **Decision Types:**
 
 | Type | Trigger | Typical Approver |
 |------|---------|------------------|
 | Initial Approval | New AI system | Risk Owner + Committee |
 | Risk Acceptance | Risk treatment decision | Risk Owner |
 | Production Release | Go-live authorization | Technical + Business Owner |
 | Renewal | Annual re-authorization | Original approvers |
 | Change Request | Significant modification | Based on change impact |
 | Decommission | System retirement | Business Owner |
 
 ---
 
 ### Workflow 5: Audit Preparation & Certification
 
 **Purpose**: Prepare for ISO 42001 certification audit.
 
 ```
 ┌─────────────────────────────────────────────────────────────────────────┐
 │                    AUDIT PREPARATION WORKFLOW                           │
 └─────────────────────────────────────────────────────────────────────────┘
 
 PHASE 1: GAP ASSESSMENT (Months 1-2)
 ─────────────────────────────────────
 
 ┌────────────────┐
 │ ISO Clause     │
 │ Checklist      │ ──▶ Review each clause status
 │ (Audit Module) │     • Compliant / Partial / Non-Compliant / Not Assessed
 └───────┬────────┘
         │
         ▼
 ┌────────────────┐
 │ Coverage       │
 │ Metrics        │ ──▶ Identify gaps by category
 └───────┬────────┘     • Context (Clause 4): __%
         │              • Leadership (Clause 5): __%
         │              • Planning (Clause 6): __%
         │              • Support (Clause 7): __%
         │              • Operation (Clause 8): __%
         │              • Performance (Clause 9): __%
         │              • Improvement (Clause 10): __%
         ▼
 ┌────────────────┐
 │ Remediation    │
 │ Plan           │ ──▶ Create CAPA for each gap
 └────────────────┘
 
 PHASE 2: EVIDENCE COLLECTION (Months 2-4)
 ──────────────────────────────────────────
 
 ┌────────────────┐
 │ Monitoring &   │
 │ Evidence       │ ──▶ Collect documentation
 │ Module         │     • Policies and procedures
 └───────┬────────┘     • Risk assessments
         │              • Control test results
         │              • Meeting minutes
         │              • Training records
         ▼
 ┌────────────────┐
 │ Link Evidence  │
 │ to Clauses     │ ──▶ Map documents to requirements
 └────────────────┘
 
 PHASE 3: INTERNAL AUDIT (Month 5)
 ──────────────────────────────────
 
 ┌────────────────┐
 │ Conduct        │
 │ Internal Audit │ ──▶ Test controls & compliance
 └───────┬────────┘
         │
         ▼
 ┌────────────────┐
 │ Log Non-       │
 │ Conformities   │ ──▶ Document findings
 │ (NC Register)  │     • Major NC: Significant gap
 └───────┬────────┘     • Minor NC: Improvement opportunity
         │
         ▼
 ┌────────────────┐
 │ CAPA for       │
 │ each NC        │ ──▶ Corrective actions with due dates
 └────────────────┘
 
 PHASE 4: CERTIFICATION AUDIT (Month 6)
 ───────────────────────────────────────
 
 ┌────────────────┐
 │ Stage 1 Audit  │
 │ (Document      │ ──▶ Auditor reviews documentation
 │ Review)        │
 └───────┬────────┘
         │
         ▼
 ┌────────────────┐
 │ Stage 2 Audit  │
 │ (On-site       │ ──▶ Auditor tests implementation
 │ Assessment)    │
 └───────┬────────┘
         │
         ▼
 ┌────────────────────────────────────────┐
 │           CERTIFICATION                │
 │  ┌──────────────────────────────────┐  │
 │  │     ISO/IEC 42001:2023           │  │
 │  │     CERTIFIED                     │  │
 │  └──────────────────────────────────┘  │
 └────────────────────────────────────────┘
 
 PHASE 5: SURVEILLANCE (Ongoing)
 ────────────────────────────────
 
 ┌────────────────┐
 │ Annual         │
 │ Surveillance   │ ──▶ Maintain certification
 │ Audits         │     • Year 1: Surveillance audit
 └───────┬────────┘     • Year 2: Surveillance audit
         │              • Year 3: Re-certification audit
         ▼
 ┌────────────────┐
 │ Continuous     │
 │ Improvement    │ ──▶ Update AIMS based on findings
 └────────────────┘
 ```
 
 ---
 
 ### Workflow 6: Continuous Monitoring
 
 **Purpose**: Ongoing oversight of AI system performance and compliance.
 
 ```
 ┌─────────────────────────────────────────────────────────────────────────┐
 │                    CONTINUOUS MONITORING WORKFLOW                       │
 └─────────────────────────────────────────────────────────────────────────┘
 
               ┌─────────────────────────────────────┐
               │         AI SYSTEM IN PRODUCTION     │
               └─────────────────┬───────────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
 ┌───────────────┐       ┌───────────────┐       ┌───────────────┐
 │  PERFORMANCE  │       │  COMPLIANCE   │       │    RISK       │
 │  MONITORING   │       │  MONITORING   │       │  MONITORING   │
 └───────┬───────┘       └───────┬───────┘       └───────┬───────┘
         │                       │                       │
         ▼                       ▼                       ▼
 • Response times        • Control status        • Risk score changes
 • Error rates           • Policy adherence      • New risk identification
 • Throughput            • Audit trail gaps      • Treatment effectiveness
 • Availability          • Evidence currency     • Residual risk levels
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 ▼
                    ┌─────────────────────────┐
                    │    THRESHOLD CHECKS     │
                    └───────────┬─────────────┘
                                │
             ┌──────────────────┼──────────────────┐
             ▼                  ▼                  ▼
       ┌──────────┐       ┌──────────┐       ┌──────────┐
       │  NORMAL  │       │ WARNING  │       │ CRITICAL │
       │  (Green) │       │ (Yellow) │       │  (Red)   │
       └────┬─────┘       └────┬─────┘       └────┬─────┘
            │                  │                  │
            ▼                  ▼                  ▼
       Continue           Generate           Create
       Monitoring         Alert              Incident
            │                  │                  │
            └──────────────────┼──────────────────┘
                               ▼
                    ┌─────────────────────────┐
                    │    DASHBOARD UPDATE     │
                    │    (Overview Module)    │
                    └─────────────────────────┘
 ```
 
 **Monitoring KPIs:**
 
 | Category | KPI | Warning Threshold | Critical Threshold |
 |----------|-----|-------------------|-------------------|
 | Performance | Response Time | >500ms | >1000ms |
 | Performance | Error Rate | >1% | >5% |
 | Compliance | Evidence Age | >30 days | >90 days |
 | Compliance | Control Failures | >0 | >3 |
 | Risk | Score Increase | >5 points | >10 points |
 | Risk | Open Risks | >5 | >10 |
 
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
 | **Date Handling** | date-fns |
 | **Form Validation** | React Hook Form + Zod |

---

 ## Architecture

 ### Component Architecture

 ```
 ┌─────────────────────────────────────────────────────────────────────────┐
 │                         APPLICATION SHELL                               │
 │  ┌──────────────────────────────────────────────────────────────────┐  │
 │  │                         AppLayout                                 │  │
 │  │  ┌────────────┐  ┌─────────────────────────────────────────────┐ │  │
 │  │  │            │  │                CONTENT AREA                 │ │  │
 │  │  │  AppSidebar│  │  ┌─────────────────────────────────────────┐│ │  │
 │  │  │            │  │  │           PageHeader                    ││ │  │
 │  │  │  • Nav     │  │  │  • Title + Subtitle                     ││ │  │
 │  │  │  • Branding│  │  │  • Actions                              ││ │  │
 │  │  │  • Version │  │  └─────────────────────────────────────────┘│ │  │
 │  │  │            │  │                                              │ │  │
 │  │  │            │  │  ┌─────────────────────────────────────────┐│ │  │
 │  │  │            │  │  │           Page Content                  ││ │  │
 │  │  │            │  │  │  • Cards, Tables, Charts                ││ │  │
 │  │  │            │  │  │  • Forms, Dialogs                       ││ │  │
 │  │  │            │  │  │  • Indicators                           ││ │  │
 │  │  │            │  │  └─────────────────────────────────────────┘│ │  │
 │  │  └────────────┘  └─────────────────────────────────────────────┘ │  │
 │  └──────────────────────────────────────────────────────────────────┘  │
 └─────────────────────────────────────────────────────────────────────────┘
 ```

### Data Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           DATA LAYER                                    │
└─────────────────────────────────────────────────────────────────────────┘

    FRONTEND (React)                    BACKEND (Flask)
    ─────────────────                    ────────────────

    ┌─────────────┐                     ┌─────────────────────────┐
    │   React SPA │────────────────────▶│   Flask Server          │
    │   (Vite)    │   /api/chat         │   (Railway)             │
    └─────────────┘                     │  ┌───────────────────┐  │
                                        │  │ Harvey Proxy      │  │
    CURRENT (Phase 1)                   │  │ • /api/chat       │  │
    ─────────────────                   │  │ • /api/health     │  │
                                        │  └───────────────────┘  │
    ┌─────────────┐                     │                         │
    │   Static    │                     │  Environment:           │
    │   Mock Data │                     │  • HARVEY_TOKEN         │
    │             │                     │  • HARVEY_ENDPOINT_V1   │
    └─────────────┘                     └─────────────────────────┘

    FUTURE (Phase 2+)
    ─────────────────

    ┌─────────────────────────────────────────┐
    │           Lovable Cloud                 │
    │  ┌─────────────────────────────────┐    │
    │  │    PostgreSQL + Auth            │    │
    │  │    (Supabase)                   │    │
    │  └─────────────────────────────────┘    │
    └─────────────────────────────────────────┘
```

### Entity Relationships
 
 ```
 ┌─────────────────────────────────────────────────────────────────────────┐
 │                        ENTITY RELATIONSHIP DIAGRAM                      │
 └─────────────────────────────────────────────────────────────────────────┘
 
                           ┌───────────────┐
                           │   AI System   │
                           │   (AIS-XXX)   │
                           └───────┬───────┘
                                   │
          ┌────────────────────────┼────────────────────────┐
          │                        │                        │
          ▼                        ▼                        ▼
   ┌─────────────┐          ┌─────────────┐          ┌─────────────┐
   │    Risk     │          │  Incident   │          │  Governance │
   │  (RSK-XXX)  │          │  (INC-XXX)  │          │    Record   │
   └──────┬──────┘          └──────┬──────┘          └──────┬──────┘
          │                        │                        │
          ▼                        ▼                        ▼
   ┌─────────────┐          ┌─────────────┐          ┌─────────────┐
   │   Control   │          │    CAPA     │          │   Approval  │
   │  (CTL-XXX)  │          │  (Action)   │          │  (Decision) │
   └─────────────┘          └─────────────┘          └─────────────┘
          │
          ▼
   ┌─────────────┐
   │  Evidence   │
   │  (Record)   │
   └─────────────┘
 ```

---

 ## Data Model

 ### Core Entities

 ```typescript
 // AI System — Central entity in the inventory
 interface AISystem {
   id: string;                    // AIS-XXX format
   name: string;                  // Descriptive name
   description?: string;          // Purpose and scope
   riskLevel: "High" | "Medium" | "Low";
   status: "Compliant" | "At Risk" | "Non-Compliant" | "Pending";
   provider: string;              // Internal or vendor name
   businessUnit: string;          // Owning department
   lifecycleState: "Draft" | "Approved" | "Production" | "Deprecated";
   createdAt: Date;
   updatedAt: Date;
 }

 // Risk — Risk register entry
 interface Risk {
   id: string;                    // RSK-XXX format
   aiSystemId: string;            // Linked AI system
   title: string;                 // Brief risk title
   description: string;           // Detailed scenario
   category: RiskCategory;        // Classification
   impact: 1 | 2 | 3 | 4 | 5;    // Severity scale
   probability: 1 | 2 | 3 | 4 | 5; // Likelihood scale
   riskScore: number;             // Impact × Probability
   status: "Open" | "Mitigated" | "Accepted" | "Transferred";
   owner: string;                 // Accountable person
   controls: string[];            // Linked control IDs
   reviewDate: Date;              // Next review
 }

 type RiskCategory = 
   | "Bias"
   | "Privacy"
   | "Security"
   | "Safety"
   | "Reliability"
   | "Transparency"
   | "Legal";

 // Incident — Incident register entry
 interface Incident {
   id: string;                    // INC-XXX format
   aiSystemId: string;            // Affected AI system
   title: string;                 // Brief description
   description: string;           // Detailed account
   severity: "Critical" | "High" | "Medium" | "Low";
   status: "Open" | "Investigating" | "Resolved" | "Closed";
   reportedAt: Date;
   resolvedAt?: Date;
   closedAt?: Date;
   rootCause?: string;            // RCA findings
   rootCauseIdentified: boolean;
   lessonsLearned?: string;
   correctiveActions: CorrectiveAction[];
   timeline: IncidentEvent[];     // Event log
 }

 interface CorrectiveAction {
   id: string;
   description: string;
   type: "Corrective" | "Preventive" | "Improvement";
   owner: string;
   dueDate: Date;
   status: "Open" | "In Progress" | "Completed" | "Overdue";
   completedAt?: Date;
 }

 // ISO Clause — Audit checklist entry
 interface ISOClause {
   id: string;
   clauseNumber: string;          // e.g., "4.1", "5.2"
   title: string;
   description: string;
   category: ClauseCategory;
   status: "Compliant" | "Partial" | "Non-Compliant" | "Not Assessed";
   evidenceCount: number;
   notes?: string;
   lastAuditDate?: Date;
   nextAuditDate?: Date;
 }

 type ClauseCategory = 
   | "Context"
   | "Leadership"
   | "Planning"
   | "Support"
   | "Operation"
   | "Performance"
   | "Improvement";

 // Non-Conformity — Audit finding
 interface NonConformity {
   id: string;                    // NC-XXX format
   clauseId: string;              // Related ISO clause
   severity: "Major" | "Minor" | "Observation";
   description: string;
   rootCause?: string;
   status: "Open" | "In Progress" | "Closed" | "Overdue";
   raisedDate: Date;
   dueDate: Date;
   closedDate?: Date;
   correctiveAction?: string;
   verificationNotes?: string;
 }
```

 ---

 ## ISO/IEC 42001 Alignment

 AIMS modules map directly to ISO 42001 clause structure:

 | Clause | Title | AIMS Module | Key Requirements |
 |--------|-------|-------------|------------------|
 | 4 | Context of the Organization | Overview, AI Inventory | Scope, stakeholders, AIMS boundary |
 | 5 | Leadership | Governance | Policy, roles, responsibilities |
 | 6 | Planning | Risk Management | Risk assessment, objectives, actions |
 | 7 | Support | Operational Controls | Resources, competence, awareness |
 | 8 | Operation | Monitoring, Controls | AI system lifecycle, third parties |
 | 9 | Performance Evaluation | Monitoring, Audit | KPIs, internal audit, management review |
 | 10 | Improvement | Incidents | NC handling, continual improvement |

 ### Clause Coverage by Module

 ```
 Module              │ Clause 4 │ Clause 5 │ Clause 6 │ Clause 7 │ Clause 8 │ Clause 9 │ Clause 10
 ────────────────────┼──────────┼──────────┼──────────┼──────────┼──────────┼──────────┼──────────
 Overview            │    ●     │    ○     │    ○     │          │          │    ●     │    ○
 AI Inventory        │    ●     │          │          │          │    ●     │          │
 Governance          │          │    ●     │          │    ○     │    ○     │          │
 Risk Management     │          │          │    ●     │          │          │          │    ○
 Operational Controls│          │          │    ○     │    ●     │    ●     │          │
 Monitoring          │          │          │          │    ○     │    ●     │    ●     │
 Incidents           │          │          │          │          │          │    ○     │    ●
 Audit               │    ○     │    ○     │    ○     │    ○     │    ○     │    ●     │    ●

 ● Primary responsibility   ○ Secondary/supporting
 ```

 ---

 ## Design System — Garrigues UX Blueprint

 AIMS implements the **Garrigues corporate design system**, optimized for audit-grade professional applications.

 ### Color System

 | Token | Value | Usage |
 |-------|-------|-------|
 | `--g-brand-primary` | `#004438` (Pantone 3308 C) | Primary brand, navigation, headers |
 | `--g-brand-secondary` | `#00382D` | Hover states, secondary accents |
 | `--g-brand-bright` | `#28A745` | Success states, positive indicators |
 | `--g-surface-base` | `#F8F9FA` | Page background |
 | `--g-surface-card` | `#FFFFFF` | Card and panel backgrounds |
 | `--g-surface-subtle` | `#F3F4F6` | Table headers, subtle backgrounds |
 | `--g-text-primary` | `#1A1A1A` | Primary text content |
 | `--g-text-secondary` | `#6B7280` | Secondary text, labels |
 | `--g-border-default` | `#E5E7EB` | Standard borders |
 | `--g-status-success` | `#28A745` | Compliant, success states |
 | `--g-status-warning` | `#F59E0B` | At Risk, warning states |
 | `--g-status-critical` | `#DC2626` | Non-Compliant, critical states |

 ### Typography

 | Element | Font | Weight | Size |
 |---------|------|--------|------|
 | H1 | Montserrat | 700 | 2rem |
 | H2 | Montserrat | 600 | 1.5rem |
 | H3 | Montserrat | 600 | 1.25rem |
 | Body | Montserrat | 400 | 1rem |
 | Small | Montserrat | 400 | 0.875rem |
 | Monospace | System mono | 400 | 0.875rem |
 
 ### Accessibility (WCAG AA)
 
 - ✅ All text meets minimum contrast ratios (4.5:1 for normal, 3:1 for large)
 - ✅ Status never communicated by color alone (always text + icon)
 - ✅ Full keyboard navigation with visible focus indicators
 - ✅ ARIA labels on all interactive elements
 - ✅ Semantic HTML structure
 - ✅ Skip links for screen readers
 
 ### Indicator Components
 
 Status is always communicated with both text and icons:
 
 ```
 ┌─────────────────────────────────────────────────────────────────────────┐
 │  STATUS INDICATORS                                                      │
 ├─────────────────────────────────────────────────────────────────────────┤
 │  ✓ Compliant      ⚠ At Risk      ✗ Non-Compliant      ○ Pending        │
 │  [green bg+text]  [amber bg+text] [red bg+text]       [gray bg+text]   │
 ├─────────────────────────────────────────────────────────────────────────┤
 │  RISK LEVEL INDICATORS                                                  │
 ├─────────────────────────────────────────────────────────────────────────┤
 │  ▲ High           ● Medium        ▼ Low                                 │
 │  [red]            [amber]         [green]                               │
 ├─────────────────────────────────────────────────────────────────────────┤
 │  LIFECYCLE INDICATORS                                                   │
 ├─────────────────────────────────────────────────────────────────────────┤
 │  ◇ Draft          ○ Approved      ● Production        ◌ Deprecated     │
 │  [gray]           [blue]          [green]             [muted]          │
 └─────────────────────────────────────────────────────────────────────────┘
 ```

---

## Roadmap

### Phase 1 (Current) ✅
 
- [x] Application shell and navigation
- [x] All 8 module implementations
- [x] Mock data structures
- [x] Garrigues design system
 - [x] Status indicators (WCAG AA compliant)
 - [x] Drill-down detail panels
 - [x] Evidence export placeholders

### Phase 2 (Planned)
 
 - [ ] Backend integration (Lovable Cloud)
- [ ] User authentication and RBAC
- [ ] Real-time data synchronization
- [ ] Evidence file upload and storage
- [ ] PDF report generation
 - [ ] Email notifications
 - [ ] Bulk import/export (CSV, Excel)

### Phase 3 (Future)
 
- [ ] Workflow automation
 - [ ] Scheduled reporting
- [ ] API integrations (GRC platforms)
- [ ] Multi-tenant support
- [ ] Audit trail and versioning
 - [ ] AI-assisted risk scoring
 - [ ] Automated evidence collection

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm o pnpm

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

La aplicación estará disponible en `http://localhost:5173`

> **Nota sobre Harvey**: El asistente jurídico requiere el backend Flask configurado. En desarrollo local con `npm run dev`, las llamadas a `/api/chat` fallarán. Para desarrollo con backend completo, usa el despliegue en Railway (ver abajo).

### Deploy en Railway (Producción)

Para desplegar AIMS con el asistente Harvey activo:

1. **Crear proyecto en Railway**
   - Conectar repositorio GitHub
   - Railway detecta automáticamente el `Dockerfile`

2. **Configurar variables de entorno**

   | Variable | Descripción |
   |----------|-------------|
   | `HARVEY_TOKEN` | Token de autenticación para la API de Harvey |
   | `HARVEY_ENDPOINT_V1` | URL del endpoint de Harvey (por defecto: `https://eu.api.harvey.ai/api/v1/completion`) |
   | `PORT` | Puerto del servidor (Railway lo inyecta automáticamente) |

3. **Verificar despliegue**
   - Health check: `https://tu-dominio.up.railway.app/api/health`
   - App: `https://tu-dominio.up.railway.app`

Ver guía completa en [`DEPLOY.md`](./DEPLOY.md)

### Build for Production
 
 ```bash
 npm run build
 npm run preview
 ```
 
 ### Project Structure
 
 ```
 src/
 ├── components/
 │   ├── indicators/          # Status, Risk, Severity, Lifecycle badges
 │   ├── layout/              # AppLayout, AppSidebar, PageHeader
 │   └── ui/                  # shadcn/ui primitive components
 ├── data/
 │   ├── aiSystems.ts         # AI Inventory mock data
 │   ├── governance.ts        # RACI, approvals, oversight rules
 │   ├── risks.ts             # Risk register entries
 │   ├── guardrails.ts        # Operational controls
 │   ├── monitoring.ts        # Events, KPIs, alerts
 │   ├── incidents.ts         # Incident register, CAPA
 │   └── audit.ts             # ISO clauses, non-conformities
 ├── pages/
 │   ├── Overview.tsx         # Executive dashboard
 │   ├── AIInventory.tsx      # System registry
 │   ├── Governance.tsx       # RACI & approvals
 │   ├── RiskManagement.tsx   # Risk register
 │   ├── OperationalControls.tsx
 │   ├── Monitoring.tsx       # Evidence & KPIs
 │   ├── Incidents.tsx        # CAPA management
 │   └── Audit.tsx            # Certification readiness
 ├── styles/
 │   └── tokens.css           # Garrigues design tokens
 ├── hooks/                   # Custom React hooks
 ├── lib/                     # Utility functions
 └── main.tsx                 # Application entry
 ```
 
 ---
 
## API Reference

### Backend Endpoints (Flask)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/chat` | Proxy para consultas a Harvey |
| GET | `/api/health` | Health check del servidor |

### Frontend API (Planeado)

*La API completa del backend estará disponible cuando se complete la integración con Lovable Cloud (Fase 2).*

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/systems` | Listar todos los sistemas de IA |
| GET | `/api/systems/:id` | Obtener detalles de un sistema |
| POST | `/api/systems` | Crear nuevo sistema |
| PUT | `/api/systems/:id` | Actualizar sistema |
| DELETE | `/api/systems/:id` | Archivar sistema |
| GET | `/api/risks` | Listar todos los riesgos |
| GET | `/api/incidents` | Listar todos los incidentes |
| GET | `/api/audit/clauses` | Listar cláusulas ISO |
| POST | `/api/evidence/export` | Generar paquete de evidencia |
 
 ---
 
## Contributing

This project follows the Garrigues UX Blueprint. All contributions must:

1. Use design tokens (`--g-*` CSS variables) exclusively
2. Maintain WCAG AA accessibility compliance
3. Follow the established component patterns
4. Include appropriate ARIA labels and keyboard navigation
 5. Test in both light and dark modes (when available)
 6. Document new components in Storybook (when available)
 
 ### Commit Convention
 
 ```
 feat: Add new feature
 fix: Bug fix
 docs: Documentation update
 style: Formatting changes
 refactor: Code refactoring
 test: Add or update tests
 chore: Maintenance tasks
 ```

---

## License

Proprietary — Garrigues / Galtea

---

<div align="center">

 **AIMS Console v0.1.0** | **ISO/IEC 42001:2023 Compliant**

 *Building trust in AI through structured governance*
 
 [Documentation](https://docs.aims.io) • [Support](mailto:support@galtea.io) • [Changelog](./CHANGELOG.md)
 
 © 2024 Garrigues / Galtea — Proprietary

</div>
