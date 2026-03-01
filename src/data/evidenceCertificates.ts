// Evidence Certificates – QTSP / RFC 3161 Timestamping
// Synthetic data representing sealed evidence bundles for AI system interactions

export type BundleStatus = "signed" | "withdrawn" | "pending" | "amended";
export type EventType =
  | "offer_shown"
  | "precontractual_summary"
  | "simulation_run"
  | "critical_qa"
  | "offer_amended"
  | "guardrail_trigger_summary"
  | "consents_captured"
  | "accept_intent"
  | "contract_closed"
  | "withdrawal_initiated"
  | "bundle_closed"
  | "aml_alert_raised"
  | "aml_analyst_review"
  | "aml_sar_filed"
  | "kyc_document_verified"
  | "credit_decision_issued"
  | "shap_explanation_generated"
  | "human_review_completed"
  | "mifid_suitability_assessed"
  | "advisor_signature_captured"
  | "hardship_rights_presented"
  | "vulnerability_detected"
  | "specialist_handoff";

export interface PolicyDecision {
  decision: "allow" | "block" | "escalate";
  reason: string;
  guardrailId?: string;
  obligations?: Array<{ type: string; [key: string]: unknown }>;
}

export interface TimelineEvent {
  seq: number;
  eventId: string;
  eventType: EventType;
  occurredAt: string;
  description: string;
  actor: string;
  artifactType: string;
  artifactSha256: string;
  policyDecision: PolicyDecision;
  tstToken: string;
  tstValid: boolean;
}

export interface EvidenceBundle {
  id: string;
  certificateName: string;
  schemaVersion: string;
  issuedAt: string;
  evidenceBundleId: string;
  aiSystemId: string;
  aiSystemName: string;
  // Journey context
  journeyId: string;
  offerId?: string;
  customerPseudonymId: string;
  channelId: string;
  jurisdiction: string;
  productFamily: string;
  policyPackVersion: string;
  // Stack
  agentId: string;
  modelVersion: string;
  toolchainVersion: string;
  // Timeline
  timeline: TimelineEvent[];
  // Outcome
  finalStatus: BundleStatus;
  finalStatusAt: string;
  // Annexes
  tsaPolicyOid: string;
  timestampsPrecision: string;
  // Verifier hints
  hashAlgorithm: string;
  canonicalization: string;
}

export const evidenceBundles: EvidenceBundle[] = [
  // ─── EVB-001: Ciclo completo de contratación de préstamo al consumo ────────
  {
    id: "EVB-001",
    certificateName: "Certificado de Evidencia – Ciclo de Contratación Asistida (Préstamo al Consumo)",
    schemaVersion: "1.0.0",
    issuedAt: "2026-03-01T14:25:40Z",
    evidenceBundleId: "evb_f1c3a8b6a9",
    aiSystemId: "AIS-001",
    aiSystemName: "Agente de Contratación de Préstamos al Consumo",
    journeyId: "jrny_9f1a2c7e3b4d45f8",
    offerId: "off_7b29d1c2",
    customerPseudonymId: "cust_p_93a0c1",
    channelId: "web_es",
    jurisdiction: "ES/EU",
    productFamily: "retail_loan",
    policyPackVersion: "pol_v1.3.2",
    agentId: "agent_retail_v2",
    modelVersion: "gpt-4o-mini-2026-02-15",
    toolchainVersion: "tchain_0.9.5",
    timeline: [
      {
        seq: 1,
        eventId: "evt_001",
        eventType: "offer_shown",
        occurredAt: "2026-03-01T14:22:10Z",
        description: "Oferta mostrada al cliente (key facts v12): TAE 7,51%, cuota 372,45 EUR/mes, plazo 36 meses, importe 12.000 EUR.",
        actor: "agent_retail_v2",
        artifactType: "key_facts_v12",
        artifactSha256: "3f9cefd2b1a6da0e8b8e3f6a2d91cc84aa1b7e0f1b0a9f4f3ce7b1a8f4a4a1b7",
        policyDecision: { decision: "allow", reason: "GRL-001: key facts completos verificados", guardrailId: "GRL-001", obligations: [{ type: "show_key_facts", ids: ["APR/APRC", "costes_y_comisiones", "calendario_de_pagos", "advertencias_riesgo"] }] },
        tstToken: "MIAGCSqGSIb3DQEHAqCAAAABASEBASEBASEBASEBASEBASEBASEBASEBASEBASE==",
        tstValid: true,
      },
      {
        seq: 2,
        eventId: "evt_002",
        eventType: "precontractual_summary",
        occurredAt: "2026-03-01T14:22:19Z",
        description: "SECCI presentado y acuse de recibo capturado. Cliente confirma: 'He leído y comprendo el SECCI'.",
        actor: "agent_retail_v2",
        artifactType: "SECCI_pdf_flattened",
        artifactSha256: "7eb1c4f09a2d33c0d9fa1e2b7f41aa23c19ddf67a9a1e2b3d4921a0e7c4d92c0",
        policyDecision: { decision: "allow", reason: "GRL-001: SECCI presentado y acuse capturado", guardrailId: "GRL-001", obligations: [{ type: "capture_consent", id: "ack_secci" }] },
        tstToken: "MIAGCSqGSIb3DQEHAqCABBBBQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQ==",
        tstValid: true,
      },
      {
        seq: 3,
        eventId: "evt_003",
        eventType: "simulation_run",
        occurredAt: "2026-03-01T14:22:31Z",
        description: "Simulación ejecutada: importe 12.000 EUR, plazo 36 meses, tipo fijo → TAE 7,51%, cuota 372,45 EUR.",
        actor: "aprcalc_1.2.1",
        artifactType: "simulation_io",
        artifactSha256: "5a1d0e9b7c8a4f23d1e0a9b7c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1ee90",
        policyDecision: { decision: "allow", reason: "OK", obligations: [{ type: "log_event", category: "simulation" }] },
        tstToken: "MIAGCSqGSIb3DQEHAqCACCCCQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQ==",
        tstValid: true,
      },
      {
        seq: 4,
        eventId: "evt_004",
        eventType: "critical_qa",
        occurredAt: "2026-03-01T14:22:45Z",
        description: "Q&A crítica completada. Transcript redactado y hasheado. Cliente resolvió dudas sobre TAE y derecho de desistimiento.",
        actor: "agent_retail_v2",
        artifactType: "redacted_transcript",
        artifactSha256: "91de0a7b2c3e4f5a6b7c8d9e0f1a2b3c4d5e6f708192a3b4c5d6e7f80910c3f0",
        policyDecision: { decision: "allow", reason: "OK", obligations: [{ type: "show_sources", minCoverage: 0.8 }] },
        tstToken: "MIAGCSqGSIb3DQEHAqCADDDDQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQ==",
        tstValid: true,
      },
      {
        seq: 5,
        eventId: "evt_005_amend",
        eventType: "offer_amended",
        occurredAt: "2026-03-01T14:23:02Z",
        description: "Oferta modificada a petición del cliente (key facts v13): plazo ampliado a 48 meses, nueva cuota 284,12 EUR/mes.",
        actor: "agent_retail_v2",
        artifactType: "key_facts_v13",
        artifactSha256: "e1b4a9d2c3f5aa7098cc31fdc0e0bead9a228ea2b1c90e00e7f5c3aa72bbd310",
        policyDecision: { decision: "allow", reason: "GRL-001: nueva oferta con key facts actualizados", guardrailId: "GRL-001", obligations: [{ type: "capture_consent", id: "ack_amendment" }] },
        tstToken: "MIAGCSqGSIb3DQEHAqCAEEEEQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQ==",
        tstValid: true,
      },
      {
        seq: 6,
        eventId: "evt_006",
        eventType: "guardrail_trigger_summary",
        occurredAt: "2026-03-01T14:23:12Z",
        description: "Resumen de guardrails: PII_LEAKAGE=OK, PROMPT_INJECTION=OK, ADVICE_BOUNDARY=OK, PRECONTRACT_INCOMPLETE=OK. Todos los controles superados.",
        actor: "guardrail_engine_v2",
        artifactType: "guardrails_summary",
        artifactSha256: "a8b7c6d5e4f3a2b1908f7e6d5c4b3a29180f7e6d5c4b3a29180f72d11aa33bb0",
        policyDecision: { decision: "allow", reason: "Todos los guardrails OK" },
        tstToken: "MIAGCSqGSIb3DQEHAqCAFFFFQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQ==",
        tstValid: true,
      },
      {
        seq: 7,
        eventId: "evt_007",
        eventType: "consents_captured",
        occurredAt: "2026-03-01T14:23:20Z",
        description: "Consentimientos capturados: ack_secci=true (14:22:58Z), privacy_notice=true (14:23:06Z), ack_amendment=true (14:23:18Z).",
        actor: "consent_engine_v1",
        artifactType: "consents_form",
        artifactSha256: "c0d3f1a2b3c4d5e6f708192a3b4c5d6e7f80910a1b2c3d4e5f60777aa55bbcc0",
        policyDecision: { decision: "allow", reason: "OK" },
        tstToken: "MIAGCSqGSIb3DQEHAqCAGGGGQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQ==",
        tstValid: true,
      },
      {
        seq: 8,
        eventId: "evt_008",
        eventType: "accept_intent",
        occurredAt: "2026-03-01T14:23:31Z",
        description: "Intención de aceptación registrada. GRL-002 activado: handoff obligatorio a gestor certificado antes de firma.",
        actor: "agent_retail_v2",
        artifactType: "acceptance_intent",
        artifactSha256: "b4f2a1c3d5e6f708192a3b4c5d6e7f80910a2b3c4d5e6f708192a3b4114e77aa",
        policyDecision: { decision: "escalate", reason: "GRL-002: handoff obligatorio pre-firma activado", guardrailId: "GRL-002", obligations: [{ type: "human_handoff", profile: "gestor_certificado" }] },
        tstToken: "MIAGCSqGSIb3DQEHAqCAHHHHQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQ==",
        tstValid: true,
      },
      {
        seq: 9,
        eventId: "evt_009_contract",
        eventType: "contract_closed",
        occurredAt: "2026-03-01T14:23:47Z",
        description: "Contratación completada. Gestor certificado (Carmen Rodríguez) validó la operación. Expediente final generado.",
        actor: "carmen.rodriguez@bank.internal",
        artifactType: "final_bundle_manifest",
        artifactSha256: "d2aa9f3c7b8e1d0c9a8b7c6d5e4f3a29180f7e6d5c4b3a299931eeffabcc9931",
        policyDecision: { decision: "allow", reason: "Supervisión humana completada conforme a GRL-002" },
        tstToken: "MIAGCSqGSIb3DQEHAqCAIIIIQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQ==",
        tstValid: true,
      },
      {
        seq: 10,
        eventId: "evt_010_bundle_close",
        eventType: "bundle_closed",
        occurredAt: "2026-03-01T14:25:40Z",
        description: "Expediente sellado definitivamente. Hash del manifest final calculado y sellado con QTSP. Expediente inmutable.",
        actor: "qtsp_service_v1",
        artifactType: "final_bundle_manifest",
        artifactSha256: "6c5e02cd19a2f0c4b5e40f7c88aa11d29a002fbf0baae1cd7a33e09fd0bb8123",
        policyDecision: { decision: "allow", reason: "Bundle cerrado y sellado" },
        tstToken: "MIAGCSqGSIb3DQEHAqCAKKKKQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQ==",
        tstValid: true,
      },
    ],
    finalStatus: "signed",
    finalStatusAt: "2026-03-01T14:25:40Z",
    tsaPolicyOid: "1.2.3.4.5.6",
    timestampsPrecision: "±1s",
    hashAlgorithm: "SHA-256",
    canonicalization: "JSON con claves en orden lexicográfico; UTF-8 NFC; saltos LF; PDF/A-2b flattened",
  },

  // ─── EVB-002: Contratación con desistimiento posterior ────────────────────
  {
    id: "EVB-002",
    certificateName: "Certificado de Evidencia – Contratación con Desistimiento (Préstamo al Consumo)",
    schemaVersion: "1.0.0",
    issuedAt: "2026-03-03T10:30:00Z",
    evidenceBundleId: "evb_a2d4e6f8b0",
    aiSystemId: "AIS-001",
    aiSystemName: "Agente de Contratación de Préstamos al Consumo",
    journeyId: "jrny_b2c4d6e8f0a1",
    offerId: "off_9c30e2d3",
    customerPseudonymId: "cust_p_77b2d4",
    channelId: "app_ios",
    jurisdiction: "ES/EU",
    productFamily: "retail_loan",
    policyPackVersion: "pol_v1.3.2",
    agentId: "agent_retail_v2",
    modelVersion: "gpt-4o-mini-2026-02-15",
    toolchainVersion: "tchain_0.9.5",
    timeline: [
      {
        seq: 1,
        eventId: "evt_001",
        eventType: "offer_shown",
        occurredAt: "2026-03-01T09:15:00Z",
        description: "Oferta mostrada: préstamo 8.000 EUR, 24 meses, TAE 6,9%, cuota 357,22 EUR/mes.",
        actor: "agent_retail_v2",
        artifactType: "key_facts_v12",
        artifactSha256: "4a8bce3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b",
        policyDecision: { decision: "allow", reason: "GRL-001: key facts completos", guardrailId: "GRL-001" },
        tstToken: "MIAGCSqGSIb3DQEHAqCAAABBCCDDEEFFGGHHIIJJKKLLMMNNOOPPQQRRSSTTUU==",
        tstValid: true,
      },
      {
        seq: 2,
        eventId: "evt_002",
        eventType: "precontractual_summary",
        occurredAt: "2026-03-01T09:15:45Z",
        description: "SECCI presentado y aceptado. Derecho de desistimiento de 14 días informado explícitamente.",
        actor: "agent_retail_v2",
        artifactType: "SECCI_pdf_flattened",
        artifactSha256: "8b2cdf4e5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
        policyDecision: { decision: "allow", reason: "GRL-001: SECCI presentado", guardrailId: "GRL-001" },
        tstToken: "MIAGCSqGSIb3DQEHAqCAVVWWXXYYZZAABBCCDDEEFFGGHHIIJJKKLLMMNNOO==",
        tstValid: true,
      },
      {
        seq: 3,
        eventId: "evt_003",
        eventType: "contract_closed",
        occurredAt: "2026-03-01T09:22:10Z",
        description: "Contrato firmado. Gestor validó la operación. Expediente inicial cerrado.",
        actor: "nuria.camps@bank.internal",
        artifactType: "signed_contract",
        artifactSha256: "1c3e5a7b9d0f2a4c6e8b0d2f4a6c8e0b2d4f6a8c0e2b4d6f8a0c2e4b6d8f0a2c",
        policyDecision: { decision: "allow", reason: "Supervisión humana completada" },
        tstToken: "MIAGCSqGSIb3DQEHAqCAPPQQRRSSTTUUVVWWXXYYZZAABBCCDDEEFFGGHHII==",
        tstValid: true,
      },
      {
        seq: 4,
        eventId: "evt_004_withdrawal",
        eventType: "withdrawal_initiated",
        occurredAt: "2026-03-03T10:11:05Z",
        description: "Cliente ejerce derecho de desistimiento dentro del plazo de 14 días (día 2). Solicitud registrada y procesada.",
        actor: "cust_p_77b2d4",
        artifactType: "withdrawal_request",
        artifactSha256: "0a9eedc2f1b43456a8d1c0ffee11aa22cc44981b33fe9e00d77b9c444c1994c1",
        policyDecision: { decision: "allow", reason: "Desistimiento dentro del plazo legal de 14 días (Directiva 2008/48/CE art. 14)" },
        tstToken: "MIAGCSqGSIb3DQEHAqCAJJJJQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQSkQ==",
        tstValid: true,
      },
      {
        seq: 5,
        eventId: "evt_005_bundle_close",
        eventType: "bundle_closed",
        occurredAt: "2026-03-03T10:30:00Z",
        description: "Expediente sellado con estado 'withdrawn'. Desistimiento ejercido válidamente dentro del plazo legal.",
        actor: "qtsp_service_v1",
        artifactType: "final_bundle_manifest",
        artifactSha256: "9f1e3c5a7b9d0f2e4c6a8b0d2f4e6c8a0b2d4f6e8a0c2e4b6d8f0a2c4e6b8d0f",
        policyDecision: { decision: "allow", reason: "Bundle cerrado con desistimiento" },
        tstToken: "MIAGCSqGSIb3DQEHAqCAWWXXYYZZAABBCCDDEEFFGGHHIIJJKKLLMMNNOOPP==",
        tstValid: true,
      },
    ],
    finalStatus: "withdrawn",
    finalStatusAt: "2026-03-03T10:30:00Z",
    tsaPolicyOid: "1.2.3.4.5.6",
    timestampsPrecision: "±1s",
    hashAlgorithm: "SHA-256",
    canonicalization: "JSON con claves en orden lexicográfico; UTF-8 NFC; saltos LF; PDF/A-2b flattened",
  },

  // ─── EVB-003: Decisión de crédito PYME con SHAP y revisión humana ─────────
  {
    id: "EVB-003",
    certificateName: "Certificado de Evidencia – Decisión de Crédito PYME con Explicabilidad SHAP",
    schemaVersion: "1.0.0",
    issuedAt: "2026-02-18T16:45:00Z",
    evidenceBundleId: "evb_c3e5a7b9d1",
    aiSystemId: "AIS-007",
    aiSystemName: "Modelo de Scoring de Crédito para Pymes",
    journeyId: "jrny_c3d5e7f9a1b2",
    offerId: "credit_req_pyme_0042",
    customerPseudonymId: "pyme_p_4421b",
    channelId: "backoffice_es",
    jurisdiction: "ES/EU",
    productFamily: "sme_credit",
    policyPackVersion: "pol_credit_v2.1.0",
    agentId: "scoring_engine_v4",
    modelVersion: "xgboost_pyme_v4.2.1",
    toolchainVersion: "tchain_credit_1.1.0",
    timeline: [
      {
        seq: 1,
        eventId: "evt_001",
        eventType: "credit_decision_issued",
        occurredAt: "2026-02-18T15:30:00Z",
        description: "Modelo de scoring ejecutado. Score: 412/1000 (umbral de aprobación: 450). Resultado preliminar: denegación. Importe solicitado: 280.000 EUR.",
        actor: "scoring_engine_v4",
        artifactType: "credit_score_output",
        artifactSha256: "2b4d6f8a0c2e4b6d8f0a2c4e6b8d0f2a4c6e8b0d2f4a6c8e0b2d4f6a8c0e2b4d",
        policyDecision: { decision: "block", reason: "GRL-009: decisión bloqueada hasta generar explicación SHAP", guardrailId: "GRL-009" },
        tstToken: "MIAGCSqGSIb3DQEHAqCAQQRRSSTTUUVVWWXXYYZZAABBCCDDEEFFGGHHIIJJ==",
        tstValid: true,
      },
      {
        seq: 2,
        eventId: "evt_002",
        eventType: "shap_explanation_generated",
        occurredAt: "2026-02-18T15:30:08Z",
        description: "Explicación SHAP generada. Top 5 factores: (1) Ratio deuda/EBITDA: -0.18, (2) Antigüedad empresa: +0.12, (3) Historial impagos: -0.15, (4) Sector CNAE: -0.08, (5) Garantías aportadas: +0.09.",
        actor: "shap_engine_v2",
        artifactType: "shap_explanation_doc",
        artifactSha256: "3c5e7a9b1d3f5a7c9e1b3d5f7a9c1e3b5d7f9a1c3e5b7d9f1a3c5e7b9d1f3a5c",
        policyDecision: { decision: "allow", reason: "GRL-009: explicación SHAP generada y validada" },
        tstToken: "MIAGCSqGSIb3DQEHAqCARRSSTTUUVVWWXXYYZZAABBCCDDEEFFGGHHIIJJKK==",
        tstValid: true,
      },
      {
        seq: 3,
        eventId: "evt_003",
        eventType: "human_review_completed",
        occurredAt: "2026-02-18T16:20:00Z",
        description: "Revisión humana completada por Francesc Bosch (Underwriter). Decisión confirmada: denegación. Motivo adicional: insuficiencia de garantías para el importe solicitado. Comunicación al cliente con explicación SHAP adjunta.",
        actor: "francesc.bosch@bank.internal",
        artifactType: "human_review_record",
        artifactSha256: "4d6f8b0c2e4d6f8b0c2e4d6f8b0c2e4d6f8b0c2e4d6f8b0c2e4d6f8b0c2e4d6f",
        policyDecision: { decision: "allow", reason: "GRL-010: revisión humana completada conforme a AI Act art. 14" },
        tstToken: "MIAGCSqGSIb3DQEHAqCASSTTUUVVWWXXYYZZAABBCCDDEEFFGGHHIIJJKKLL==",
        tstValid: true,
      },
      {
        seq: 4,
        eventId: "evt_004_bundle_close",
        eventType: "bundle_closed",
        occurredAt: "2026-02-18T16:45:00Z",
        description: "Expediente de decisión de crédito sellado. Incluye score, explicación SHAP y decisión humana motivada.",
        actor: "qtsp_service_v1",
        artifactType: "final_bundle_manifest",
        artifactSha256: "5e7a9c1e3b5d7f9a1c3e5b7d9f1a3c5e7b9d1f3a5c7e9b1d3f5a7c9e1b3d5f7a",
        policyDecision: { decision: "allow", reason: "Bundle cerrado" },
        tstToken: "MIAGCSqGSIb3DQEHAqCATTUUVVWWXXYYZZAABBCCDDEEFFGGHHIIJJKKLLMM==",
        tstValid: true,
      },
    ],
    finalStatus: "signed",
    finalStatusAt: "2026-02-18T16:45:00Z",
    tsaPolicyOid: "1.2.3.4.5.6",
    timestampsPrecision: "±1s",
    hashAlgorithm: "SHA-256",
    canonicalization: "JSON con claves en orden lexicográfico; UTF-8 NFC; saltos LF",
  },

  // ─── EVB-004: Alerta AML con revisión MLRO y SAR ─────────────────────────
  {
    id: "EVB-004",
    certificateName: "Certificado de Evidencia – Alerta AML con Revisión MLRO y SAR al SEPBLAC",
    schemaVersion: "1.0.0",
    issuedAt: "2026-02-12T18:00:00Z",
    evidenceBundleId: "evb_d4f6b8c0e2",
    aiSystemId: "AIS-017",
    aiSystemName: "Sistema de Detección de Blanqueo de Capitales (AML)",
    journeyId: "jrny_aml_d4e6f8a0b1",
    customerPseudonymId: "cust_p_aml_9921",
    channelId: "backoffice_aml",
    jurisdiction: "ES/EU",
    productFamily: "aml_monitoring",
    policyPackVersion: "pol_aml_v3.0.1",
    agentId: "aml_detection_v5",
    modelVersion: "graph_aml_v5.1.0",
    toolchainVersion: "tchain_aml_2.0.0",
    timeline: [
      {
        seq: 1,
        eventId: "evt_001",
        eventType: "aml_alert_raised",
        occurredAt: "2026-02-10T09:45:00Z",
        description: "Alerta AML generada. Score de riesgo: 0.87/1.0 (umbral: 0.70). Patrón detectado: estructuración de pagos en efectivo por debajo de 10.000 EUR en 5 días consecutivos. Coincidencia parcial en lista PEP.",
        actor: "aml_detection_v5",
        artifactType: "aml_alert_record",
        artifactSha256: "6f8b0d2e4f6b8d0e2f4b6d8f0b2d4f6b8d0e2f4b6d8f0b2d4f6b8d0e2f4b6d8f",
        policyDecision: { decision: "escalate", reason: "GRL-020: revisión humana obligatoria de alertas AML", guardrailId: "GRL-020" },
        tstToken: "MIAGCSqGSIb3DQEHAqCAUUVVWWXXYYZZAABBCCDDEEFFGGHHIIJJKKLLMMNN==",
        tstValid: true,
      },
      {
        seq: 2,
        eventId: "evt_002",
        eventType: "aml_analyst_review",
        occurredAt: "2026-02-10T11:20:00Z",
        description: "Revisión por analista AML (Andrés Molina). Análisis de transacciones de los últimos 90 días. Confirmación de patrón sospechoso. Escalado al MLRO.",
        actor: "andres.molina@bank.internal",
        artifactType: "analyst_review_record",
        artifactSha256: "7a9c1e3b5d7a9c1e3b5d7a9c1e3b5d7a9c1e3b5d7a9c1e3b5d7a9c1e3b5d7a9c",
        policyDecision: { decision: "escalate", reason: "Patrón confirmado, escalado a MLRO" },
        tstToken: "MIAGCSqGSIb3DQEHAqCAVVWWXXYYZZAABBCCDDEEFFGGHHIIJJKKLLMMNNOO==",
        tstValid: true,
      },
      {
        seq: 3,
        eventId: "evt_003",
        eventType: "aml_sar_filed",
        occurredAt: "2026-02-12T17:45:00Z",
        description: "SAR (Suspicious Activity Report) presentado al SEPBLAC por el MLRO. Referencia SEPBLAC: SAR-2026-0892. Cuenta bloqueada preventivamente.",
        actor: "mlro@bank.internal",
        artifactType: "sar_filing_record",
        artifactSha256: "8b0d2f4b6d8b0d2f4b6d8b0d2f4b6d8b0d2f4b6d8b0d2f4b6d8b0d2f4b6d8b0d",
        policyDecision: { decision: "allow", reason: "SAR presentado conforme a Ley 10/2010 y AMLD5" },
        tstToken: "MIAGCSqGSIb3DQEHAqCAWWXXYYZZAABBCCDDEEFFGGHHIIJJKKLLMMNNOOPP==",
        tstValid: true,
      },
      {
        seq: 4,
        eventId: "evt_004_bundle_close",
        eventType: "bundle_closed",
        occurredAt: "2026-02-12T18:00:00Z",
        description: "Expediente AML sellado. Incluye alerta original, revisión del analista, decisión del MLRO y referencia SAR.",
        actor: "qtsp_service_v1",
        artifactType: "final_bundle_manifest",
        artifactSha256: "9c1e3b5d7c9e1b3d5f7a9c1e3b5d7f9a1c3e5b7d9f1a3c5e7b9d1f3a5c7e9b1d",
        policyDecision: { decision: "allow", reason: "Bundle AML cerrado y sellado" },
        tstToken: "MIAGCSqGSIb3DQEHAqCAXXYYZZAABBCCDDEEFFGGHHIIJJKKLLMMNNOOPPQQ==",
        tstValid: true,
      },
    ],
    finalStatus: "signed",
    finalStatusAt: "2026-02-12T18:00:00Z",
    tsaPolicyOid: "1.2.3.4.5.6",
    timestampsPrecision: "±1s",
    hashAlgorithm: "SHA-256",
    canonicalization: "JSON con claves en orden lexicográfico; UTF-8 NFC; saltos LF",
  },

  // ─── EVB-005: Asesoramiento MiFID II con firma del asesor ─────────────────
  {
    id: "EVB-005",
    certificateName: "Certificado de Evidencia – Informe de Idoneidad MiFID II con Firma del Asesor",
    schemaVersion: "1.0.0",
    issuedAt: "2026-02-25T17:00:00Z",
    evidenceBundleId: "evb_e5a7c9d1f3",
    aiSystemId: "AIS-016",
    aiSystemName: "Simulador de Idoneidad de Inversiones (MiFID II)",
    journeyId: "jrny_mifid_e5f7a9b1c2",
    customerPseudonymId: "cust_p_mifid_3312",
    channelId: "backoffice_wealth",
    jurisdiction: "ES/EU",
    productFamily: "investment_advisory",
    policyPackVersion: "pol_mifid_v1.4.0",
    agentId: "suitability_engine_v3",
    modelVersion: "dss_mifid_v3.0.1",
    toolchainVersion: "tchain_mifid_1.2.0",
    timeline: [
      {
        seq: 1,
        eventId: "evt_001",
        eventType: "mifid_suitability_assessed",
        occurredAt: "2026-02-25T15:30:00Z",
        description: "Evaluación de idoneidad MiFID II completada. Perfil: Moderado. Horizonte: 5-7 años. Capacidad de pérdida: 20%. Conocimientos: Intermedios. GRL-016 verificado: todos los campos completados.",
        actor: "suitability_engine_v3",
        artifactType: "suitability_assessment",
        artifactSha256: "0d2f4b6d8f0d2f4b6d8f0d2f4b6d8f0d2f4b6d8f0d2f4b6d8f0d2f4b6d8f0d2f",
        policyDecision: { decision: "allow", reason: "GRL-016: checklist MiFID II completado", guardrailId: "GRL-016" },
        tstToken: "MIAGCSqGSIb3DQEHAqCAYYZZAABBCCDDEEFFGGHHIIJJKKLLMMNNOOPPQQRR==",
        tstValid: true,
      },
      {
        seq: 2,
        eventId: "evt_002",
        eventType: "advisor_signature_captured",
        occurredAt: "2026-02-25T16:45:00Z",
        description: "Informe de idoneidad firmado digitalmente por Enrique Palau (EFPA Cert. ES-2021-4892). GRL-017 satisfecho. Informe listo para entrega al cliente.",
        actor: "enrique.palau@bank.internal",
        artifactType: "signed_suitability_report",
        artifactSha256: "1e3a5c7e9a1c3e5a7c9e1a3c5e7a9c1e3a5c7e9a1c3e5a7c9e1a3c5e7a9c1e3a",
        policyDecision: { decision: "allow", reason: "GRL-017: firma del asesor certificado capturada", guardrailId: "GRL-017" },
        tstToken: "MIAGCSqGSIb3DQEHAqCAZZAABBCCDDEEFFGGHHIIJJKKLLMMNNOOPPQQRRSS==",
        tstValid: true,
      },
      {
        seq: 3,
        eventId: "evt_003_bundle_close",
        eventType: "bundle_closed",
        occurredAt: "2026-02-25T17:00:00Z",
        description: "Expediente MiFID II sellado. Incluye evaluación de idoneidad, informe generado y firma del asesor certificado.",
        actor: "qtsp_service_v1",
        artifactType: "final_bundle_manifest",
        artifactSha256: "2f4b6d8f2f4b6d8f2f4b6d8f2f4b6d8f2f4b6d8f2f4b6d8f2f4b6d8f2f4b6d8f",
        policyDecision: { decision: "allow", reason: "Bundle MiFID II cerrado y sellado" },
        tstToken: "MIAGCSqGSIb3DQEHAqCAAAABBCCDDEEFFGGHHIIJJKKLLMMNNOOPPQQRRSSTT==",
        tstValid: true,
      },
    ],
    finalStatus: "signed",
    finalStatusAt: "2026-02-25T17:00:00Z",
    tsaPolicyOid: "1.2.3.4.5.6",
    timestampsPrecision: "±1s",
    hashAlgorithm: "SHA-256",
    canonicalization: "JSON con claves en orden lexicográfico; UTF-8 NFC; saltos LF",
  },
];

export const bundleStatusLabels: Record<BundleStatus, { label: string; color: string }> = {
  signed: { label: "Firmado y Sellado", color: "text-green-400" },
  withdrawn: { label: "Desistimiento Ejercido", color: "text-yellow-400" },
  pending: { label: "Pendiente de Cierre", color: "text-blue-400" },
  amended: { label: "Enmendado", color: "text-orange-400" },
};

export const eventTypeLabels: Record<EventType, string> = {
  offer_shown: "Oferta mostrada",
  precontractual_summary: "SECCI presentado",
  simulation_run: "Simulación ejecutada",
  critical_qa: "Q&A crítica",
  offer_amended: "Oferta modificada",
  guardrail_trigger_summary: "Resumen de guardrails",
  consents_captured: "Consentimientos capturados",
  accept_intent: "Intención de aceptación",
  contract_closed: "Contrato cerrado",
  withdrawal_initiated: "Desistimiento iniciado",
  bundle_closed: "Expediente sellado",
  aml_alert_raised: "Alerta AML generada",
  aml_analyst_review: "Revisión analista AML",
  aml_sar_filed: "SAR presentado al SEPBLAC",
  kyc_document_verified: "Documento KYC verificado",
  credit_decision_issued: "Decisión de crédito emitida",
  shap_explanation_generated: "Explicación SHAP generada",
  human_review_completed: "Revisión humana completada",
  mifid_suitability_assessed: "Idoneidad MiFID II evaluada",
  advisor_signature_captured: "Firma del asesor capturada",
  hardship_rights_presented: "Derechos del deudor presentados",
  vulnerability_detected: "Vulnerabilidad detectada",
  specialist_handoff: "Handoff a especialista",
};
