# Companion — Data Overview

Conceptual overview of the types of information Companion captures. Reference when building features that read, write, or analyze session data.

---

## What Companion Does

Companion is an AI-powered observation tool. A user performs their normal work — screen-sharing, narrating what they're doing — while Companion watches, listens, and extracts structured insights about the processes being performed. It can also ingest uploaded files (e.g., screen recordings) as an alternative to live sessions.

**Core loop:** Capture → Observe → Extract → Review → Feed into Process Index

---

## What Companion Does NOT Store

Companion does **not** retain raw visual data. During a live session, screen frames are captured and converted into text descriptions — those descriptions are used in real time to power signal extraction and activity timeline generation, then **deleted within ~30 seconds**.

What survives are the structured outputs: signals, activity timelines, process observations, and chat transcripts — not the raw visual evidence that produced them.

---

## Two Data Layers

| Layer | What it contains |
|---|---|
| **Application database** | Sessions, signals, chat transcripts, process observations, AI cost records, output artifacts |
| **Analytics telemetry** | User clicks, session phase transitions, recording infrastructure health, UI interactions |

These layers don't always agree. Some actions appear only in telemetry (e.g., toggling picture-in-picture). Some data is persisted with no telemetry event (e.g., AI cost per LLM call). Where the same concept is tracked in both layers, naming and structure may differ. These gaps are intentional characteristics of the instrumentation, not errors.

---

## What Is Captured

### 1. Sessions

Each Companion interaction creates a session record.

**Session modes:**
- **Coaching** — live screen-share with AI observation
- **File Upload** — user uploads a recording or document for async analysis
- **Interview** — structured AI-guided conversation (sibling feature, shared infrastructure)

**Persisted per session:**
- Lifecycle state: `created → in-progress → processing → completed` (plus error states: `disconnected`, `failed`)
- Duration and timestamps
- Activity timeline — structured breakdown of what the user did, with time ranges and process mappings
- Workspace and user association
- Links to coaching chat, output artifacts, and processing pipeline runs

**Telemetry adds:**
- Granular lifecycle events: session initiation, onboarding steps, countdown, phase transitions (`recording ↔ paused ↔ processing ↔ completed`), session end
- How the user arrived (fresh navigation, browser back, page reload) and the session state at load time

---

### 2. In-Session Chat

**Persisted:**
- Full conversation: every user message, AI response, and tool call with timestamps
- LLM model and provider
- Token usage and conversation status (`completed`, `failed`, `in-progress`)
- Suggested prompts and follow-up questions

**Telemetry adds:**
- Message-level events (user message sent, AI response received, AI response rendered)
- Message **length only** — not message content (full content lives only in the database)

---

### 3. Signals

AI-generated insights extracted during a session. Created when Companion observes something noteworthy — a process inefficiency, a tooling gap, a documentation problem.

**Persisted per signal:**
- Title and description
- Category (see taxonomy below)
- Evidence — what was observed and the time range within the session
- Suggested action
- Conditions under which to disregard the signal

**Signal lifecycle:**
| State | Meaning |
|---|---|
| `Draft` | AI generated it; user hasn't acted yet |
| `Active` (shared) | User reviewed and shared with the team |
| `Inactive` (dismissed) | User reviewed and marked as not useful |

**Signal taxonomy:**

| Category | Description |
|---|---|
| Risk Mitigation | Risks in how work is performed |
| Collaboration: Communication | Communication gaps or friction |
| Collaboration: Handoffs | Handoff problems between people or teams |
| Collaboration: Ownership | Unclear ownership or accountability |
| Knowledge: Documentation | Missing or outdated documentation |
| Knowledge: Accessibility | Knowledge hard to find or access |
| Tooling: Configuration | Tool misconfiguration or underuse |
| Tooling: Integration | Integration gaps between tools |
| Tooling: Gap | Missing tooling entirely |
| Scaling: Best Practice | Practices that won't scale |
| Process Standardization | Inconsistent execution of the same process |
| Other | Uncategorized |

**Telemetry adds:**
- Share and dismiss actions with signal category and session duration at time of action
- Status transitions, detail views, reversals (user changes their mind), content copying

---

### 4. Process Observations

When Companion identifies a process being performed, it creates a process observation — the handoff point from Companion into the Process Index.

**Persisted per observation:**
- Sequence of steps observed with individual durations
- Process inputs and outputs
- Total duration and wait times per step
- Rework count (how many times steps were repeated)
- Positive and negative deviations from expected behavior
- Optional link to a known process in the organization's process catalog

Not all observations are mapped to a known process — the AI may observe activity it can't match to the catalog. Unmapped observations are still recorded.

---

### 5. Output Artifacts

**Artifact types:**
- **Documents** — AI-generated process documentation or summaries
- **Videos** — session recordings with audio transcription
- **Diagrams** — process flow diagrams
- **Images** — screenshots captured during the session

Each artifact tracks origin (AI-generated vs. user-uploaded), processing status, and the originating session.

---

### 6. Post-Session Feedback

**Persisted:**
- Numeric rating (star-based)
- Sentiment classification
- Optional free-text comments
- Whether the user skipped, dismissed, or actively submitted
- Feedback format variant shown (star rating, thumbs up/down, etc.)

> **Note:** Feedback is stored in the **recording subsystem**, not the main application database. It is not directly joinable to session data without cross-system linking.

---

### 7. AI / LLM Usage

Every LLM call is logged. **Database only — no telemetry equivalent.**

**Persisted per call:**
- Product feature that triggered the call
- Model used
- Input and output token counts
- Response latency
- Estimated cost in USD

---

### 8. Recording Infrastructure Telemetry

**Telemetry only — not persisted in the application database.**

Client-side and server-side events covering:
- WebRTC connection lifecycle (established, lost, reconnected)
- Screen sharing state (initiated, started, failed, stopped)
- AI bot readiness (joined, acknowledged, timed out, retried)
- Network quality (degraded, recovered)
- CPU load warnings
- Participant count and disconnect detection
- Diagnostic and error events

Server-side: session processing events (signal generation, activity timeline extraction, video processing) including counts of signals created, updated, and sent to the user.

---

### 9. Onboarding & Session Preparation

**Telemetry only — not persisted in the application database.**

- Onboarding progression through defined steps: `start → context setup → ready`
- Session preparation timing

---

## Key Data Characteristics

### What you can join across

- **Sessions** → chat conversations, signals, process observations, output artifacts, processing pipelines, users/workspaces/organizations
- **Signals** → originating session; carry the full taxonomy category
- **Process observations** → optionally link to a process definition in the Process Index

### What you can't easily join

| Gap | Reason |
|---|---|
| Telemetry ↔ database (workspace/org) | Telemetry uses string names; database uses integer IDs — requires a lookup step |
| Session IDs across layers | Strings in telemetry, integers in the database |
| Feedback ↔ session data | Feedback lives in a separate recording subsystem; requires cross-system linking |

### Notable gaps

| Gap | Detail |
|---|---|
| Signal creation has no telemetry | AI-generated signals are invisible in telemetry until the user acts (share or dismiss) |
| Process observation writes are server-side only | Telemetry captures the user clicking "submit to Process Index," not the actual data write |
| Onboarding, UI interactions, recording infrastructure | Exist only in telemetry, never persisted |
| AI cost and token usage | Exist only in the database, never in telemetry |
| Backend action log overloads signal state | Uses a single action name for both share and dismiss — telemetry has separate, clearly-named events for each |
