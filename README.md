# Klarity Companion

Design prototype and React app for the **Companion Guide: Lessons From Last Time** feature — a personal process intelligence layer that surfaces relevant context from a user's own previous Companion sessions while they work.

## What it is

When a user starts a task in their CRM (e.g., onboarding a new customer), the Companion bar detects a pattern match against their own session history and surfaces:

- The matched prior process with completion time and duration
- Specific things to watch for, drawn from signals observed in that previous session
- One-click access to the full prior workflow

**Scope constraint:** This uses only the current user's own historical sessions — no cross-user data, no organizational intelligence, no productivity scoring.

---

## Repo contents

| File / folder | What it is |
|---|---|
| `companion-guide-prototype.html` | Self-contained interactive prototype — open directly in a browser, no build step |
| `src/` | React app (Vite + React 18) — the fuller component-based implementation |
| `DATA_MODEL.md` | Conceptual data model for what Companion captures and how to build against it |

---

## Prototype

The standalone prototype (`companion-guide-prototype.html`) is the fastest way to demo the feature. Open the file directly in any browser.

**Flow:**
1. Page loads showing a CRM form and the Companion bar (dark floating bar, bottom-right)
2. Type anything into the **Customer workspace** field
3. The "Similar Process Found" row slides into the companion bar with a Match badge
4. ~1 second later the guide auto-expands to show the matched session and lesson cards
5. Click **View Workflow** to open the full prior session modal
6. Click lesson card dismiss buttons to mark items as not relevant (with undo)
7. Click the chevron or collapse button to close the guide

---

## React app

```bash
npm install
npm run dev
```

Requires Node 18+. Runs at `http://localhost:5173` by default.

**Screen flow:** Home → Onboarding/Permissions → Active Session (with Companion Guide panel)

The guide panel in the React app auto-opens ~1.4s after a session starts, slides in from the right, and includes a View Session drawer, Ask Companion chat, and empty state toggle.

---

## Data model

See [`DATA_MODEL.md`](DATA_MODEL.md) for a full breakdown of what Companion captures: sessions, signals, activity timelines, process observations, artifacts, and AI cost records. Reference it when building features that read or write session data.

Key constraint documented there: raw screen frames are deleted within ~30 seconds of capture. Only structured outputs (signals, timelines, transcripts) are persisted.
