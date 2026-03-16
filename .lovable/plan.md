

## AI Management System (AIMS) Console — Implementation Plan
### ISO/IEC 42001 Compliant · Garrigues UX Blueprint

---

### Phase 0: Design Foundation

**Design Token System**
- Create `src/styles/tokens.css` with all `--g-*` variables:
  - Text: `--g-text-primary`, `--g-text-secondary`, `--g-text-inverse`, `--g-link`, `--g-link-hover`
  - Surfaces: `--g-surface-base`, `--g-surface-card`, `--g-surface-subtle`, `--g-surface-hover`
  - Borders: `--g-border-default`, `--g-border-subtle`, `--g-border-strong`
  - Status: `--g-status-success`, `--g-status-warning`, `--g-status-critical` (used only with text/icons)
  - Spacing: `--g-space-1` through `--g-space-8` (4px grid)
  - Radii: `--g-radius-sm`, `--g-radius-md`, `--g-radius-lg`

*You will replace values with your approved Garrigues tokens before implementation.*

---

### Phase 1: Application Shell & Navigation

**Layout Structure**
- Left vertical sidebar (fixed, collapsible to icon-only mode)
- Main content area with consistent header (page title + subtitle)
- Responsive: sidebar collapses on smaller screens

**Navigation Architecture** (8 modules, shallow structure)
1. **Overview** — AIMS Status
2. **AI Inventory** — AI Systems & Scope  
3. **Governance** — Accountability & Approvals
4. **Risk Management** — AI Risk Register
5. **Operational Controls** — Guardrails & Rules
6. **Monitoring** — Evidence & KPIs
7. **Incidents** — Continuous Improvement
8. **Audit** — Certification Readiness

*Active route highlighting, keyboard navigation, ARIA labels for all nav items.*

---

### Phase 2: Core UI Components (Token-Governed)

**Data Table Component**
- Density-consistent across all modules
- Header: `--g-surface-subtle` background, `--g-text-primary` text
- Cells: `--g-text-secondary` default, `--g-text-primary` for key data
- Sortable columns, pagination, filtering
- Subtle zebra/hover states
- Fully keyboard-accessible

**Status Indicators**
- Never color-alone: always text + icon
- Variants: Compliant, At Risk, Non-Compliant, Pending

**Stat Blocks / Metrics**
- For executive summary numbers
- Label + value structure, token-governed colors

**Form Components**
- Visible labels (no placeholder-as-label)
- Error states below fields
- Accessible focus rings

---

### Phase 3: Module Shells (All 8 Routes)

Each module will have:
- Page title + explanatory subtitle
- Empty state with placeholder content
- Correct layout structure ready for data

---

### Phase 4: Detailed Module Implementation (Phase 1 MVP)

**1. Overview — AIMS Status**
- Compliance summary metrics (stat blocks)
- ISO clause coverage percentage
- Systems at risk count with status indicators
- Open incidents summary
- Upcoming audits table

**2. AI Inventory & Scope**
- Asset register table with columns:
  - System Name, Risk Level, Status, Provider, Business Unit, Lifecycle State
- Filters by risk level, status, provider
- Lifecycle states: Draft → Approved → Production → Deprecated
- Row click → detail panel linking to related modules

**3. Governance & Accountability**
- RACI matrix table (Responsible, Accountable, Consulted, Informed)
- Approval history log (date, approver, action)
- Human oversight requirements display
- Escalation rules table

**4. AI Risk Management**
- Risk register table:
  - Risk ID, Description, Impact, Probability, Score, Status, Owner
- Risk-to-control mapping view
- Residual risk acceptance log with sign-off tracking
- Visual risk scoring (always with text labels)

**5. Monitoring & Evidence**
- Event timeline (chronological log)
- KPI metrics table
- Evidence pack export buttons (PDF, Markdown, JSON) — styled but non-functional for now

---

### Phase 5: Placeholder Modules (Phase 2 Scope)

**6. Operational Controls & Guardrails**
- Placeholder shell with module description
- Empty table structure for future guardrail configuration

**7. Incidents & Continuous Improvement**
- Placeholder shell with module description
- Empty incident register table structure
- CAPA (Corrective and Preventive Actions) placeholder

**8. Audit & Certification**
- Placeholder shell with module description (Read-Only mode indicator)
- ISO clause checklist placeholder
- Non-conformity tracking placeholder

---

### Mock Data Structure

Realistic JSON structures for:
- 10-15 sample AI systems with varied statuses
- 20+ risk entries with scoring
- RACI assignments per system
- Incident samples
- Evidence records

*All data structured to match future Supabase schema.*

---

### Accessibility & Compliance Checklist

- ✅ WCAG AA contrast on all text
- ✅ Focus visible on all interactive elements
- ✅ Full keyboard navigation
- ✅ ARIA labels on navigation, tables, buttons
- ✅ Modal trap-focus (when modals are added)
- ✅ Status never communicated by color alone

---

### Branding & Attribution

- Header: "Designed by **Garrigues** · Powered by **Galtea**"
- Conservative, audit-grade visual tone
- No marketing language

