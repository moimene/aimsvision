# AIMS Console - Product Requirements Document (PRD)

**Versión 1.1** | **Fecha:** 2026-03-01

---

## 1. Visión General y Estado Actual

Este documento describe los requisitos del producto para la **AIMS (AI Management System) Console**, una plataforma de gobernanza de IA diseñada para cumplir con la normativa **ISO/IEC 42001:2023**. 

La versión actual (v1.0) implementa el frontend completo de los 8 módulos principales con un conjunto de datos sintéticos detallado y realista que simula un entorno bancario maduro con 22 sistemas de IA. La aplicación es completamente navegable y funcional en el frontend, permitiendo una demostración exhaustiva de los flujos de trabajo de gobernanza.

**El objetivo de esta revisión es alinear la implementación actual con la visión extendida del producto, documentar los gaps funcionales y planificar los siguientes pasos.**

---

## 2. Análisis de Gaps Funcionales (PRD v1.0 vs Implementación Actual)

A continuación se detallan las funcionalidades descritas en la PRD original (extraída del `README.md`) y en el documento de revisión técnica, y su estado actual de implementación.

| Capacidad | Requisito PRD | Estado Actual | Gap y Observaciones |
|---|---|---|---|
| **Registro de Activos** | Inventario completo con ciclo de vida, riesgo, proveedor, etc. | ✅ **Implementado** | La funcionalidad de drill-down para ver la ficha técnica detallada ha sido añadida en esta iteración. |
| **Gobernanza y RACI** | Matriz RACI, flujos de aprobación, historial de decisiones. | ✅ **Implementado** | Los datos sintéticos reflejan un historial de aprobaciones y una matriz RACI completa. |
| **Gestión de Riesgos** | Registro de riesgos con matriz de impacto/probabilidad. | ✅ **Implementado** | El registro de riesgos está completo, con 24 riesgos detallados y vinculados a controles. |
| **Controles Operacionales** | Catálogo de guardrails técnicos y procedimentales. | ✅ **Implementado** | Se ha implementado un catálogo de 22 guardrails con su estado y configuración. |
| **Monitorización y Evidencia** | Recolección de evidencia, KPIs, logs de eventos. | ✅ **Implementado** | El módulo de monitorización muestra 40 logs de eventos realistas y KPIs por sistema. |
| **Gestión de Incidentes** | Ciclo de vida de incidentes (CAPA), causa raíz. | ✅ **Implementado** | El registro de incidentes incluye 7 incidentes con planes CAPA y postmortems. |
| **Auditoría y Certificación** | Checklist de cláusulas ISO, tracking de no conformidades. | ✅ **Implementado** | El módulo de auditoría refleja el estado de cumplimiento de las 23 cláusulas de la ISO 42001. |
| **Integración Backend** | Conexión con backend (Lovable Cloud), API REST. | ❌ **No Implementado** | La aplicación es un frontend estático. No hay backend ni llamadas a API reales. **Este es el principal gap funcional.** |
| **Autenticación y RBAC** | Login de usuarios y control de acceso basado en roles. | ❌ **No Implementado** | Funcionalidad dependiente del backend. |
| **Generación de Evidencia** | Exportación de informes en PDF, Markdown, JSON. | 🔶 **Parcialmente Implementado** | Los botones de exportación existen en la UI pero no tienen funcionalidad. |
| **Notificaciones** | Alertas por email. | ❌ **No Implementado** | Funcionalidad dependiente del backend. |
| **Sellado de Tiempo (QTSP)** | Integración con un QTSP para sellar evidencias. | ❌ **No Implementado** | El documento técnico lo menciona como un requisito clave para la auditabilidad. Requiere integración de backend y una API de sellado. |
| **Validación Adversarial** | Pruebas reproducibles de jailbreak, inyección de PII, etc. | ❌ **No Implementado** | El documento técnico lo propone como una funcionalidad clave para demostrar la robustez de los guardrails. |

---

## 3. Funcionalidades Implementadas en esta Iteración

1.  **Enriquecimiento del Inventario de Sistemas (`aiSystems.ts`):**
    *   Se ha añadido una `technicalSheet` a cada uno de los 22 sistemas de IA.
    *   Cada ficha técnica incluye: **tipología** del modelo, **arquitectura** técnica detallada, **guardrails clave** vinculados y el **contacto técnico** responsable.
    *   Esto permite simular la conexión entre la gobernanza (AIMS) y los equipos técnicos que implementan y mantienen los modelos.

2.  **Panel de Ficha Técnica en el Inventario (`AIInventory.tsx`):**
    *   Se ha implementado una funcionalidad de **drill-down** en la tabla del inventario.
    *   Al hacer clic en un sistema, se abre un panel lateral (`SystemDetailPanel`) que muestra la ficha técnica completa de forma estructurada y legible.
    *   La tabla principal ahora incluye la columna "Tipología" y el número de guardrails vinculados para una visión más rápida.

---

## 4. Roadmap Actualizado

Basado en el análisis de gaps, el roadmap del `README.md` se actualiza de la siguiente manera:

### Fase 2 (Planificada)

- [ ] **Backend y API REST:** Desarrollar e integrar el backend para persistir los datos y servir la información a través de la API REST definida.
- [ ] **Autenticación y RBAC:** Implementar login de usuarios y control de acceso para los diferentes roles de gobernanza.
- [ ] **Generación de Evidencia (PDF):** Implementar la funcionalidad de exportación de informes en formato PDF, comenzando por el inventario y los detalles de un sistema.
- [ ] **Integración con API de Sellado (QTSP):** Diseñar e implementar el flujo para el sellado de tiempo de evidencias clave (decisiones, logs) a través de una API de un Proveedor de Servicios de Confianza Cualificado.

### Fase 3 (Futura)

- [ ] **Automatización de Workflows:** Crear flujos de trabajo guiados para la creación de nuevos sistemas, la evaluación de riesgos y la gestión de incidentes.
- [ ] **Dashboard de Validación Adversarial:** Crear una sección donde se puedan ejecutar pruebas predefinidas contra los guardrails y visualizar los resultados, demostrando su eficacia.
- [ ] **Notificaciones por Email:** Integrar un servicio de email para enviar alertas sobre incidentes críticos, riesgos elevados o tareas pendientes.
- [ ] **Integraciones Externas:** API para conectar con plataformas GRC y otros sistemas corporativos.

