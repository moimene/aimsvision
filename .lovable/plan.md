

## Plan: Integrar Alinia AI como partner visible en el simulador AIMS

Tres puntos de visibilidad sin backend real, usando mock data reactivo en el frontend existente.

### Cambios

**1. Nuevo archivo: `src/data/mockAlinia.ts`**
- Tipos `AliniaVerdict` y `AliniaEvent`
- Función `mockAliniaCheck(text)` que analiza keywords para devolver `allowed | flagged | blocked` con regla y regulación
- Array `mockAliniaEvents` (6-8 eventos simulados con timestamps relativos)
- Objeto `mockAliniaStats` con contadores agregados

**2. Nuevo componente: `src/components/AliniaStatusBadge.tsx`**
- Badge pill que muestra el veredicto de Alinia en cada mensaje de Harvey
- Tres estados visuales usando tokens `--g-status-*` (no Tailwind colors directos):
  - `allowed` → icono ShieldCheck + "Alinia: OK" + verde status
  - `flagged` → icono ShieldAlert + "Alinia: Revisión" + warning status
  - `blocked` → icono ShieldX + "Alinia: Bloqueado" + critical status
- Muestra regla y regulación cuando aplica

**3. Modificar: `src/components/HarveyChat.tsx`**
- Importar `mockAliniaCheck` y `AliniaStatusBadge`
- En cada mensaje del assistant, ejecutar `mockAliniaCheck(msg.content)` y renderizar el badge debajo del texto
- Si el veredicto es `blocked`, añadir disclaimer visual en el mensaje

**4. Modificar: `src/pages/Monitoring.tsx`**
- Añadir nueva sección "Alinia — Guardrail Compliance Feed" entre los KPIs y el Evidence Pack Export
- Widget con tabla high-density mostrando `mockAliniaEvents`: hora, sistema IA, consulta truncada, acción (con StatusIndicator), normativa
- KPIs resumen en fila: monitorizadas, permitidas, flaggeadas, bloqueadas
- Indicador "Activo" con dot parpadeante (CSS animation)
- Todo con tokens `--g-*`, sin Tailwind colors

**5. Modificar: `src/data/guardrails.ts`**
- Añadir nuevo guardrail al array `guardrailsData`:
  - `id: "GRL-007"`, `name: "Alinia Investment Guard"`, `category: "Compliance"`
  - `aiSystemId: "AIS-001"`, `action: "Block"`, `status: "Active"`
  - Description: interceptación en tiempo real de respuestas de Harvey (MiFID II, GDPR, EU AI Act)
  - `provider: "Alinia AI"` (campo nuevo opcional en el tipo)
  - Legal basis, justification, activation conditions coherentes con el estilo existente de los demás guardrails
  - Change history con una entrada

**6. Modificar tipo `Guardrail` en `src/data/guardrails.ts`**
- Añadir campo opcional `provider?: string` al interface
- En `OperationalControls.tsx`, mostrar el provider en el detalle del guardrail si existe

### Convenciones respetadas
- Solo tokens CSS `--g-*`, nunca colores Tailwind directos
- Status indicators combinan texto + icono (WCAG AA)
- Tablas high-density, no cards
- Tipografía Montserrat heredada del sistema

### Resultado
Alinia será visible en tres puntos del simulador: badge en cada mensaje de Harvey, feed en Monitoring, y guardrail activo en Operational Controls. Todo funciona con mock data sin backend.

