

## Plan: Fix build error + Harvey chat status

### 1. Fix build error (Overview.tsx line 28)

Replace `"Development"` with valid `LifecycleState` values. The closest semantic match is `"Draft"` (systems not yet in production):

```typescript
// Before
const developmentSystems = aiSystemsData.filter(s => s.lifecycleState === "Development").length;

// After  
const developmentSystems = aiSystemsData.filter(s => s.lifecycleState === "Draft").length;
```

### 2. Harvey Chat — no code change needed

The chat component is correctly implemented. It calls `/api/chat` which only works when deployed to Railway (Flask backend). In the Lovable preview there is no Python server, so the request falls through to the SPA fallback, returning HTML instead of JSON. The existing error handling in `HarveyChat.tsx` already catches this and shows "Error de conexión con Harvey."

**No changes needed** for Harvey — it will work once deployed to Railway with the `HARVEY_TOKEN` environment variable configured.

### Summary of changes
| File | Change |
|------|--------|
| `src/pages/Overview.tsx` line 28 | `"Development"` → `"Draft"` |

