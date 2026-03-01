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
  "Critical": { status: "critical", text: "Crítico" },
  "High": { status: "critical", text: "Alto" },
  "Medium": { status: "warning", text: "Medio" },
  "Low": { status: "neutral", text: "Bajo" },
};

export const incidentStatusMapping: Record<IncidentStatus, { status: StatusType; text: string }> = {
  "Open": { status: "critical", text: "Abierto" },
  "Investigating": { status: "warning", text: "En investigación" },
  "Resolved": { status: "success", text: "Resuelto" },
  "Closed": { status: "neutral", text: "Cerrado" },
};

export const capaStatusMapping: Record<CAPAStatus, { status: StatusType; text: string }> = {
  "Pending": { status: "neutral", text: "Pendiente" },
  "In Progress": { status: "warning", text: "En curso" },
  "Completed": { status: "success", text: "Completado" },
  "Verified": { status: "success", text: "Verificado" },
};

export const incidentsData: Incident[] = [
  {
    id: "INC-001",
    aiSystemId: "AIS-011",
    aiSystemName: "Motor de Optimización de Precios de Seguros",
    severity: "Critical",
    description: "Auditoría actuarial independiente detecta correlación estadísticamente significativa (r=0.68) entre la variable 'código postal' utilizada por el modelo y el género del asegurado, infringiendo la Directiva 2004/113/CE (Test-Achats). El guardrail de exclusión de variables de género (GRL-012) resulta inefectivo.",
    status: "Investigating",
    rootCauseIdentified: true,
    rootCause: "La variable 'código postal' actúa como proxy del género en determinadas zonas geográficas con alta segregación residencial. El proceso de selección de variables del modelo no incluyó análisis de correlación con variables protegidas. El guardrail GRL-012 solo excluía la variable de género directa, no sus proxies.",
    linkedPostmortem: "PM-2026-001",
    reportedDate: "2026-02-20",
    owner: "Rosa Llopis",
    impactSummary: "Aproximadamente 45.000 pólizas de seguro de vida y hogar potencialmente afectadas. Revisión actuarial completa en curso. Notificación preventiva a la Dirección General de Seguros y Fondos de Pensiones (DGSFP) en preparación.",
    timeline: [
      { timestamp: "2026-02-20T10:00:00Z", event: "Auditoría actuarial independiente (Galtea) detecta correlación proxy-género en el modelo de precios", actor: "Galtea" },
      { timestamp: "2026-02-20T11:30:00Z", event: "Incidente creado con severidad Crítica. Escalado a Dirección de Cumplimiento y CRO", actor: "Rosa Llopis" },
      { timestamp: "2026-02-20T14:00:00Z", event: "Reunión de crisis con Comité Actuarial, Cumplimiento y Tecnología", actor: "Comité Actuarial" },
      { timestamp: "2026-02-21T09:00:00Z", event: "Análisis de impacto iniciado: identificación de pólizas potencialmente afectadas", actor: "Equipo Actuarial" },
      { timestamp: "2026-02-22T11:00:00Z", event: "Causa raíz confirmada: variable código postal como proxy de género", actor: "David Navarro" },
      { timestamp: "2026-02-23T09:00:00Z", event: "Plan de acción correctiva aprobado por CRO y CEO", actor: "Consejo de Administración" },
      { timestamp: "2026-02-25T10:00:00Z", event: "Borrador de notificación a DGSFP preparado por el Área Legal", actor: "Alejandro Vidal" },
      { timestamp: "2026-02-28T09:00:00Z", event: "Investigación en curso. Modelo en revisión. Nuevas pólizas procesadas manualmente", actor: "Rosa Llopis" },
    ],
    correctiveActions: [
      {
        id: "CAPA-001",
        description: "Reentrenar el modelo eliminando la variable 'código postal' y realizando análisis exhaustivo de correlación de todas las variables con atributos protegidos (género, edad, origen étnico)",
        type: "Corrective",
        status: "In Progress",
        owner: "David Navarro",
        dueDate: "2026-03-15",
      },
      {
        id: "CAPA-002",
        description: "Actualizar el guardrail GRL-012 para incluir detección de variables proxy mediante análisis de correlación automático en cada ciclo de entrenamiento",
        type: "Corrective",
        status: "In Progress",
        owner: "Jordi Puig",
        dueDate: "2026-03-10",
      },
      {
        id: "CAPA-003",
        description: "Revisar manualmente las 45.000 pólizas potencialmente afectadas y recalcular primas con el modelo corregido. Emitir devoluciones si procede",
        type: "Corrective",
        status: "In Progress",
        owner: "Equipo Actuarial",
        dueDate: "2026-04-30",
      },
      {
        id: "CAPA-004",
        description: "Implementar proceso de validación de equidad actuarial obligatorio antes de cualquier despliegue de modelo de precios, incluyendo análisis de disparidad por todos los atributos protegidos",
        type: "Preventive",
        status: "Pending",
        owner: "Rosa Llopis",
        dueDate: "2026-04-01",
      },
      {
        id: "CAPA-005",
        description: "Notificación formal a la DGSFP conforme al procedimiento de comunicación de incidentes de IA de alto riesgo",
        type: "Corrective",
        status: "In Progress",
        owner: "Alejandro Vidal",
        dueDate: "2026-03-05",
      },
    ],
    linkedRiskIds: ["RSK-012", "RSK-013"],
    lessonsLearned: "Los proxies de variables protegidas pueden ser tan discriminatorios como las variables directas. El proceso de selección de variables debe incluir análisis de correlación con todos los atributos protegidos. Los guardrails de equidad deben ser dinámicos y actualizarse con cada ciclo de entrenamiento.",
  },
  {
    id: "INC-002",
    aiSystemId: "AIS-007",
    aiSystemName: "Modelo de Scoring de Crédito para Pymes",
    severity: "High",
    description: "Deriva sectorial detectada en el modelo de scoring: las empresas del sector hostelería y turismo (CNAE 5610-5630) reciben scores un 15% inferiores a los del trimestre anterior sin cambios en sus datos financieros reales, generando denegaciones potencialmente injustificadas.",
    status: "Investigating",
    rootCauseIdentified: false,
    reportedDate: "2026-02-15",
    owner: "Francesc Bosch",
    impactSummary: "Estimadas 85 denegaciones de crédito potencialmente afectadas en los últimos 30 días para empresas del sector hostelería. Todas las denegaciones están siendo revisadas manualmente por el Comité de Crédito. Impacto económico en revisión.",
    timeline: [
      { timestamp: "2026-02-15T09:00:00Z", event: "Alerta de deriva sectorial detectada por el sistema de monitorización (EVT-015)", actor: "Sistema de Monitorización" },
      { timestamp: "2026-02-15T10:30:00Z", event: "Incidente creado y asignado a Francesc Bosch", actor: "Sistema" },
      { timestamp: "2026-02-15T14:00:00Z", event: "Análisis inicial: caída del 15% en scores medios del sector CNAE 5610-5630", actor: "Francesc Bosch" },
      { timestamp: "2026-02-16T11:00:00Z", event: "Revisión manual activada para todas las denegaciones del sector en los últimos 30 días", actor: "Comité de Crédito de Empresas" },
      { timestamp: "2026-02-18T09:00:00Z", event: "Hipótesis de causa raíz: posible cambio en la distribución de datos macroeconómicos sectoriales", actor: "David Navarro" },
      { timestamp: "2026-02-20T14:00:00Z", event: "Análisis de datos de entrenamiento y variables macroeconómicas en curso", actor: "Equipo de Data Science" },
      { timestamp: "2026-02-28T09:00:00Z", event: "Investigación en curso. Causa raíz no confirmada. Monitorización intensificada", actor: "Francesc Bosch" },
    ],
    correctiveActions: [
      {
        id: "CAPA-006",
        description: "Completar el análisis de causa raíz de la deriva sectorial identificando las variables responsables del cambio",
        type: "Corrective",
        status: "In Progress",
        owner: "David Navarro",
        dueDate: "2026-03-05",
      },
      {
        id: "CAPA-007",
        description: "Revisar manualmente todas las denegaciones del sector hostelería en los últimos 30 días y revertir las que no estén justificadas por datos financieros",
        type: "Corrective",
        status: "In Progress",
        owner: "Comité de Crédito de Empresas",
        dueDate: "2026-03-10",
      },
      {
        id: "CAPA-008",
        description: "Implementar monitorización específica de deriva por sector CNAE con alertas automáticas cuando la variación supere el 10%",
        type: "Preventive",
        status: "Pending",
        owner: "David Navarro",
        dueDate: "2026-03-20",
      },
    ],
    linkedRiskIds: ["RSK-008"],
  },
  {
    id: "INC-003",
    aiSystemId: "AIS-004",
    aiSystemName: "Copiloto para Gestores de Banca Privada",
    severity: "High",
    description: "El Copiloto de Banca Privada generó una recomendación de inversión personalizada en un fondo de renta variable de alta volatilidad para un cliente con perfil conservador, sin que se hubiera completado el test de idoneidad MiFID II actualizado. El guardrail de Advice Boundary (GRL-007) no detectó la infracción.",
    status: "Resolved",
    rootCauseIdentified: true,
    rootCause: "El guardrail de Advice Boundary no cubría el caso en que el gestor formulaba la recomendación de forma implícita ('para un cliente con este perfil, el fondo X sería adecuado'). El clasificador de detección de recomendaciones personalizadas solo detectaba formulaciones explícitas.",
    linkedPostmortem: "PM-2026-002",
    reportedDate: "2026-02-05",
    resolvedDate: "2026-02-18",
    owner: "Enrique Palau",
    impactSummary: "1 cliente afectado. La recomendación fue identificada por el gestor antes de ser comunicada al cliente. No se produjo daño directo. Revisión del historial de conversaciones del copiloto en curso para identificar casos similares.",
    timeline: [
      { timestamp: "2026-02-05T15:30:00Z", event: "Gestor detecta que el copiloto generó una recomendación personalizada implícita sin test de idoneidad", actor: "Enrique Palau" },
      { timestamp: "2026-02-05T16:00:00Z", event: "Incidente creado y escalado al Área de Cumplimiento de Mercados", actor: "Enrique Palau" },
      { timestamp: "2026-02-06T09:00:00Z", event: "Análisis del log de conversación. Confirmada la infracción del advice boundary", actor: "Alejandro Vidal" },
      { timestamp: "2026-02-07T11:00:00Z", event: "Causa raíz identificada: el clasificador no detecta recomendaciones implícitas", actor: "Jordi Puig" },
      { timestamp: "2026-02-10T09:00:00Z", event: "Parche del guardrail GRL-007 desarrollado y testeado", actor: "Jordi Puig" },
      { timestamp: "2026-02-12T14:00:00Z", event: "Revisión del historial de conversaciones: 3 casos similares identificados en los últimos 30 días", actor: "Equipo de Cumplimiento" },
      { timestamp: "2026-02-15T10:00:00Z", event: "Parche del guardrail desplegado en producción", actor: "David Navarro" },
      { timestamp: "2026-02-18T09:00:00Z", event: "Incidente resuelto. Revisión de los 3 casos adicionales completada sin impacto en clientes", actor: "Enrique Palau" },
    ],
    correctiveActions: [
      {
        id: "CAPA-009",
        description: "Actualizar el clasificador del guardrail GRL-007 para detectar recomendaciones personalizadas implícitas, incluyendo formulaciones condicionales y contextuales",
        type: "Corrective",
        status: "Completed",
        owner: "Jordi Puig",
        dueDate: "2026-02-15",
        completedDate: "2026-02-15",
      },
      {
        id: "CAPA-010",
        description: "Revisar el historial completo de conversaciones del copiloto (últimos 90 días) para identificar y documentar todos los casos de posible infracción del advice boundary",
        type: "Corrective",
        status: "Completed",
        owner: "Equipo de Cumplimiento",
        dueDate: "2026-02-20",
        completedDate: "2026-02-18",
      },
      {
        id: "CAPA-011",
        description: "Implementar test de regresión específico para el advice boundary MiFID II en el pipeline CI/CD del copiloto, con al menos 50 escenarios de prueba incluyendo formulaciones implícitas",
        type: "Preventive",
        status: "In Progress",
        owner: "Jordi Puig",
        dueDate: "2026-03-01",
      },
      {
        id: "CAPA-012",
        description: "Sesión de formación obligatoria para todos los gestores de banca privada sobre los límites del copiloto y el proceso de escalado cuando se detecta una posible infracción",
        type: "Preventive",
        status: "Completed",
        owner: "Enrique Palau",
        dueDate: "2026-02-28",
        completedDate: "2026-02-25",
      },
    ],
    linkedRiskIds: ["RSK-006"],
    lessonsLearned: "Los guardrails de compliance deben cubrir tanto formulaciones explícitas como implícitas. La revisión periódica de logs de conversación es esencial para detectar patrones de infracción no capturados por los guardrails. La formación de los usuarios del sistema es tan importante como los controles técnicos.",
  },
  {
    id: "INC-004",
    aiSystemId: "AIS-001",
    aiSystemName: "Agente de Contratación de Préstamos al Consumo",
    severity: "Medium",
    description: "Durante el despliegue inicial del agente (23-25 febrero 2026), se detectó que el guardrail de completitud SECCI no activaba el recordatorio de desistimiento cuando la SECCI se entregaba con menos de 24 horas de antelación a la firma, incumpliendo el requisito de la Directiva (UE) 2023/2225.",
    status: "Resolved",
    rootCauseIdentified: true,
    rootCause: "El guardrail GRL-001 versión 1.1.0 no implementaba la lógica de verificación del intervalo temporal entre la entrega de la SECCI y la firma del contrato. La condición de 'menos de 24 horas' no estaba codificada en la versión inicial.",
    linkedPostmortem: "PM-2026-003",
    reportedDate: "2026-02-25",
    resolvedDate: "2026-02-27",
    owner: "Carmen Rodríguez",
    impactSummary: "Estimadas 42 contrataciones realizadas durante la ventana de 48 horas sin el recordatorio de desistimiento. Todos los clientes afectados han sido contactados y se les ha informado de su derecho de desistimiento de 14 días.",
    timeline: [
      { timestamp: "2026-02-25T14:00:00Z", event: "Revisión de calidad post-despliegue detecta ausencia del recordatorio de desistimiento en contratos firmados el mismo día de la SECCI", actor: "Alejandro Vidal" },
      { timestamp: "2026-02-25T15:30:00Z", event: "Incidente creado. Análisis del código del guardrail GRL-001 iniciado", actor: "Carmen Rodríguez" },
      { timestamp: "2026-02-25T17:00:00Z", event: "Causa raíz confirmada: lógica de intervalo temporal no implementada en GRL-001 v1.1.0", actor: "Jordi Puig" },
      { timestamp: "2026-02-26T09:00:00Z", event: "Hotfix del guardrail desarrollado y testeado (GRL-001 v1.2.0)", actor: "Jordi Puig" },
      { timestamp: "2026-02-26T14:00:00Z", event: "Hotfix desplegado en producción. Verificación de funcionamiento correcto", actor: "David Navarro" },
      { timestamp: "2026-02-26T16:00:00Z", event: "Identificación de los 42 clientes afectados. Comunicación iniciada", actor: "Carmen Rodríguez" },
      { timestamp: "2026-02-27T12:00:00Z", event: "Todos los clientes afectados contactados y notificados de su derecho de desistimiento", actor: "Equipo de Atención al Cliente" },
      { timestamp: "2026-02-27T16:00:00Z", event: "Incidente resuelto", actor: "Carmen Rodríguez" },
    ],
    correctiveActions: [
      {
        id: "CAPA-013",
        description: "Despliegue del hotfix GRL-001 v1.2.0 con la lógica de verificación del intervalo temporal de 24 horas",
        type: "Corrective",
        status: "Verified",
        owner: "Jordi Puig",
        dueDate: "2026-02-26",
        completedDate: "2026-02-26",
      },
      {
        id: "CAPA-014",
        description: "Contactar a todos los clientes afectados e informarles de su derecho de desistimiento de 14 días conforme a la Directiva (UE) 2023/2225",
        type: "Corrective",
        status: "Verified",
        owner: "Equipo de Atención al Cliente",
        dueDate: "2026-02-27",
        completedDate: "2026-02-27",
      },
      {
        id: "CAPA-015",
        description: "Añadir test de regresión específico para la condición de 24 horas en el pipeline CI/CD del agente de contratación",
        type: "Preventive",
        status: "Completed",
        owner: "Jordi Puig",
        dueDate: "2026-03-01",
        completedDate: "2026-02-28",
      },
    ],
    linkedRiskIds: ["RSK-001"],
    lessonsLearned: "Las condiciones temporales en los guardrails de compliance requieren tests específicos que simulen diferentes escenarios de timing. Los despliegues de sistemas de alto riesgo deben incluir una revisión de calidad post-despliegue en las primeras 48 horas.",
  },
  {
    id: "INC-005",
    aiSystemId: "AIS-010",
    aiSystemName: "Asistente de Verificación KYC/AML",
    severity: "Medium",
    description: "Análisis de equidad en alertas AML detecta una tasa de alertas un 23% superior para clientes de determinadas nacionalidades (Marruecos, Senegal, Bolivia) en comparación con el perfil de riesgo real de dichos clientes, sugiriendo un posible sesgo demográfico en el modelo.",
    status: "Investigating",
    rootCauseIdentified: false,
    reportedDate: "2026-02-10",
    owner: "Andrés Molina",
    impactSummary: "Estimadas 340 alertas potencialmente sesgadas en el último trimestre. Todas las alertas ya han sido revisadas por analistas humanos conforme al guardrail GRL-011, por lo que no se han producido acciones incorrectas sobre clientes. El riesgo es de discriminación indirecta en el proceso de onboarding.",
    timeline: [
      { timestamp: "2026-02-10T10:00:00Z", event: "Auditoría trimestral de equidad AML (Galtea) detecta disparidad estadística por nacionalidad", actor: "Galtea" },
      { timestamp: "2026-02-10T11:30:00Z", event: "Incidente creado y asignado a Andrés Molina", actor: "Sistema" },
      { timestamp: "2026-02-11T09:00:00Z", event: "Análisis estadístico de alertas por nacionalidad iniciado", actor: "Equipo de Data Science" },
      { timestamp: "2026-02-14T14:00:00Z", event: "Disparidad confirmada: tasa de alertas 23% superior para 3 grupos de nacionalidades", actor: "Andrés Molina" },
      { timestamp: "2026-02-18T09:00:00Z", event: "Hipótesis de causa raíz en análisis: posible sesgo en datos de entrenamiento históricos", actor: "David Navarro" },
      { timestamp: "2026-02-28T09:00:00Z", event: "Investigación en curso. Causa raíz no confirmada", actor: "Andrés Molina" },
    ],
    correctiveActions: [
      {
        id: "CAPA-016",
        description: "Completar el análisis de causa raíz del sesgo demográfico en las alertas AML",
        type: "Corrective",
        status: "In Progress",
        owner: "David Navarro",
        dueDate: "2026-03-10",
      },
      {
        id: "CAPA-017",
        description: "Implementar métricas de equidad demográfica en el dashboard de monitorización del sistema AML con alertas automáticas cuando la disparidad supere el 15%",
        type: "Preventive",
        status: "Pending",
        owner: "Andrés Molina",
        dueDate: "2026-03-31",
      },
    ],
    linkedRiskIds: ["RSK-011"],
  },
  {
    id: "INC-006",
    aiSystemId: "AIS-002",
    aiSystemName: "Motor de Detección de Fraude en Tarjetas v3",
    severity: "Medium",
    description: "Incremento del 28% en la tasa de falsos positivos durante el período de Navidad (23 diciembre - 6 enero), bloqueando transacciones legítimas de clientes que realizaban compras en comercios no habituales durante las fiestas.",
    status: "Closed",
    rootCauseIdentified: true,
    rootCause: "El modelo no tenía suficiente representación de patrones de gasto navideño en los datos de entrenamiento. Los umbrales de detección no se ajustaban estacionalmente. El módulo de ajuste estacional implementado tras el incidente de 2025 no cubría el período completo de fiestas.",
    linkedPostmortem: "PM-2025-015",
    reportedDate: "2025-12-26",
    resolvedDate: "2026-01-08",
    owner: "Rafael Montoya",
    impactSummary: "1.842 transacciones legítimas bloqueadas durante 14 días. 1.842 clientes contactados y compensados con 5 EUR de bonificación. Impacto en satisfacción del cliente: NPS cayó 8 puntos en enero.",
    timeline: [
      { timestamp: "2025-12-26T08:00:00Z", event: "Alerta de monitorización: tasa de falsos positivos supera el 3% (umbral habitual: 1,2%)", actor: "Sistema de Monitorización" },
      { timestamp: "2025-12-26T09:30:00Z", event: "Incidente creado. Análisis de patrones de transacciones bloqueadas", actor: "Rafael Montoya" },
      { timestamp: "2025-12-26T12:00:00Z", event: "Ajuste temporal de umbrales para reducir falsos positivos en período navideño", actor: "Rafael Montoya" },
      { timestamp: "2025-12-27T10:00:00Z", event: "Tasa de falsos positivos reducida al 1,8% tras ajuste de umbrales", actor: "Sistema" },
      { timestamp: "2025-12-28T14:00:00Z", event: "Análisis de causa raíz: falta de datos de entrenamiento navideños y ausencia de ajuste estacional completo", actor: "Equipo de Data Science" },
      { timestamp: "2026-01-03T09:00:00Z", event: "Identificación de todos los clientes afectados. Proceso de compensación iniciado", actor: "Equipo de Atención al Cliente" },
      { timestamp: "2026-01-08T16:00:00Z", event: "Todos los clientes compensados. Incidente cerrado", actor: "Rafael Montoya" },
    ],
    correctiveActions: [
      {
        id: "CAPA-018",
        description: "Ampliar el módulo de ajuste estacional para cubrir todos los períodos de alta actividad (Navidad, Semana Santa, verano) con datos de los últimos 5 años",
        type: "Corrective",
        status: "Verified",
        owner: "David Navarro",
        dueDate: "2026-02-15",
        completedDate: "2026-02-10",
      },
      {
        id: "CAPA-019",
        description: "Implementar ajuste automático de umbrales basado en el calendario de períodos de alta actividad comercial",
        type: "Preventive",
        status: "Verified",
        owner: "Rafael Montoya",
        dueDate: "2026-03-01",
        completedDate: "2026-02-20",
      },
    ],
    linkedRiskIds: ["RSK-003"],
    lessonsLearned: "Los modelos de detección de fraude deben incorporar patrones estacionales completos. Los ajustes de umbrales deben ser proactivos (antes de los períodos de alta actividad) y no reactivos. La monitorización en tiempo real es esencial para detectar rápidamente incrementos en falsos positivos.",
  },
  {
    id: "INC-007",
    aiSystemId: "AIS-016",
    aiSystemName: "Simulador de Idoneidad de Inversiones (MiFID II)",
    severity: "Low",
    description: "Auditoría trimestral MiFID II detecta que en el 8% de los informes de idoneidad generados en Q4 2025, el apartado de 'capacidad para soportar pérdidas' no estaba completado antes de la generación del informe, aunque el guardrail GRL-016 debería haberlo bloqueado.",
    status: "Resolved",
    rootCauseIdentified: true,
    rootCause: "El guardrail GRL-016 verificaba la presencia del campo 'capacidad para soportar pérdidas' pero no su contenido. Los gestores habían encontrado una forma de avanzar introduciendo el valor 'N/A' en el campo, lo que satisfacía la verificación de presencia pero no la de completitud.",
    linkedPostmortem: "PM-2026-004",
    reportedDate: "2026-02-24",
    resolvedDate: "2026-02-28",
    owner: "Enrique Palau",
    impactSummary: "127 informes de idoneidad con el campo incompleto identificados en Q4 2025. Todos han sido revisados por asesores certificados y completados retroactivamente. Ningún cliente recibió una recomendación de inversión basada en un informe incompleto sin la firma del asesor.",
    timeline: [
      { timestamp: "2026-02-24T09:00:00Z", event: "Auditoría trimestral MiFID II por Galtea detecta 8% de informes con campo incompleto", actor: "Galtea" },
      { timestamp: "2026-02-24T10:30:00Z", event: "Incidente creado y asignado a Enrique Palau", actor: "Sistema" },
      { timestamp: "2026-02-24T14:00:00Z", event: "Análisis del comportamiento del guardrail: se detecta el bypass mediante valor 'N/A'", actor: "Jordi Puig" },
      { timestamp: "2026-02-25T09:00:00Z", event: "Parche del guardrail GRL-016: validación de contenido además de presencia", actor: "Jordi Puig" },
      { timestamp: "2026-02-26T10:00:00Z", event: "Parche desplegado en producción y verificado", actor: "David Navarro" },
      { timestamp: "2026-02-27T09:00:00Z", event: "Revisión retroactiva de los 127 informes afectados completada", actor: "Equipo de Asesores Certificados" },
      { timestamp: "2026-02-28T12:00:00Z", event: "Incidente resuelto", actor: "Enrique Palau" },
    ],
    correctiveActions: [
      {
        id: "CAPA-020",
        description: "Actualizar el guardrail GRL-016 para validar el contenido de los campos obligatorios, no solo su presencia. Rechazar valores como 'N/A', 'No aplica' o campos en blanco",
        type: "Corrective",
        status: "Verified",
        owner: "Jordi Puig",
        dueDate: "2026-02-26",
        completedDate: "2026-02-26",
      },
      {
        id: "CAPA-021",
        description: "Revisar y completar retroactivamente los 127 informes de idoneidad con el campo incompleto",
        type: "Corrective",
        status: "Verified",
        owner: "Equipo de Asesores Certificados",
        dueDate: "2026-02-28",
        completedDate: "2026-02-27",
      },
      {
        id: "CAPA-022",
        description: "Comunicar a todos los gestores de banca privada el incidente y la actualización del guardrail. Reforzar la formación sobre la obligación de completar todos los campos del cuestionario MiFID II",
        type: "Preventive",
        status: "Completed",
        owner: "Enrique Palau",
        dueDate: "2026-03-05",
        completedDate: "2026-02-28",
      },
    ],
    linkedRiskIds: ["RSK-016"],
    lessonsLearned: "Los guardrails de validación de formularios deben verificar tanto la presencia como el contenido de los campos obligatorios. Los usuarios pueden encontrar formas de satisfacer validaciones superficiales. Las auditorías periódicas son esenciales para detectar estos patrones de bypass.",
  },
];
