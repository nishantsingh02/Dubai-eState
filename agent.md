# AGENT.md — PropEase (Real Estate Lead Intelligence Tool)

Instructions for AI coding agents working in this repo. Read fully before making changes.

---

## 1. What We're Building

A lead scoring and prioritization tool for **Dubai real estate agencies**. It takes their leads (new and old), tells them **which to prioritize and why**, and flags **dormant leads worth reviving**.

**Core problem:** Agents don't lack leads. They lack a reliable way to know which leads deserve their time *right now*, and they sit on thousands of old "dead" leads that were never followed up properly.

**What this is:** a lightweight scoring + prioritization layer on top of whatever leads the agency already has.

**What this is NOT:** a full CRM. Not a WhatsApp automation tool. Do not drift toward either.

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js (React) + Tailwind CSS, **adapted from an existing CRM frontend already in the repo** (see 2.1) |
| Backend | Next.js API routes / route handlers (same project, no separate server) |
| Database + Auth | Supabase (Postgres + Supabase Auth), multi-tenant |
| AI | OpenAI GPT (default, cheaper) — Anthropic Claude supported via the same interface |
| Deployment | Vercel + Supabase managed |

No DevOps, no extra servers, no queues unless clearly required.

### 2.1 Frontend approach: adapt, do not rewrite

A complete CRM frontend (UI template) is already in this repo. **Do not write the frontend from scratch.** Reshape the existing one to fit PropEase.

**Keep as-is (do not change the look):**
- Overall layout, sidebar, header, theme, colors, typography, spacing
- Existing UI components (tables, cards, buttons, forms, badges, dialogs)

**Change (files, data, and wiring only):**
- Routes and nav labels: repurpose pages into **New Leads**, **Reactivation Candidates**, **Import**, **Settings**
- Table columns: name, phone, channel, score, reason, status
- Replace all mock/static data with Supabase queries scoped by the user's org (`workspace_id`)
- Replace the template's auth (if any) with Supabase Auth, and add login, signup, and logout
- Add score/tag (hot/warm/cold) badges using the template's existing badge style

**Remove:**
- Template pages and features unrelated to V1 (e.g. finance, chat, kanban, calendar, billing, credits, invoices, outreach, email lookup, analytics demos)
- Unused components, mock data files, and dead routes/imports

**Rules:**
- Audit the template first, then list what you will keep, change, and delete before editing.
- If a dependency conflict blocks install, resolve it without altering the UI.
- After each step, report which files you changed or deleted.
- New UI (import screen, column mapping, login page) must be built from the template's existing components and style, so it looks native.

---

## 3. V1 Scope (this is everything, nothing more)

1. CSV/Excel import + manual single-lead entry
2. Phone-based deduplication (rule-based)
3. AI scoring + reasoning for new leads
4. AI reactivation flagging for old/imported leads
5. Two-tab dashboard: **New Leads** and **Reactivation Candidates**
6. Multi-tenant setup (each client company = separate workspace + login)
7. English-only UI

### Explicitly NOT in V1 — do not build, stub, or scaffold

- WhatsApp API integration
- Ad platform integrations (Meta, Google)
- Mobile app
- Automatic broker assignment/routing
- Automated messaging / follow-up sending

If a task seems to require any of the above, stop and ask.

---

## 4. Data Flow

**Org = workspace.** Every user belongs to one org, identified by a unique org id. In the database this is `workspace_id`. Use it everywhere; do not invent a second identifier.

1. **Sign up / login (first step for every user):** the user signs up or logs in with Supabase Auth. Nothing else is accessible before this.
2. **Org assignment:** on signup, a new workspace (org) with its own unique id is created, and the user is linked to it. The user record is stored in Supabase (`auth.users` plus a `profiles` row). Every piece of data the user creates from then on is assigned that org id.
3. **Data scoping:** all reads and writes are limited to the user's org id, enforced by RLS. A user only ever sees their own org's data. If the org has no data yet, show an empty state with an "Import leads" action.
4. **Import:** user uploads CSV/Excel or enters a lead manually. Imported leads are saved with the user's org id.
5. **Normalize + dedupe (rule-based, no AI):** normalize phone numbers, match against existing leads in the same workspace, drop or merge duplicates *before* anything else.
6. **Score (AI):** remaining leads are sent in **batches of 10–20 per call**. The model returns, per lead: intent score, short human-readable reason, and a `hot | warm | cold` tag.
7. **Reactivation (AI):** for old/imported leads, the model also flags whether signals justify re-engagement (budget mentioned, timeline mentioned, repeated engagement, etc.).
8. **Dashboard:** results render in two tabs. Each row shows: **name, phone, channel, score, reason, status**. Logout is available from the app shell.

---

## 5. Architecture Guidance

### 5.1 Suggested structure

```
/app
  /(auth)/login, signup
  /(dashboard)/leads          -> New Leads tab
  /(dashboard)/reactivation   -> Reactivation Candidates tab
  /(dashboard)/import         -> CSV upload + manual entry
  /api/leads/import
  /api/leads/score
/lib
  /ai            -> provider abstraction, prompts, schemas
  /phone         -> normalization + matching
  /import        -> CSV/Excel parsing + column mapping
  /supabase      -> clients (server/browser), types
/supabase/migrations
```

This structure describes where PropEase code should end up. The existing template's folders should be reshaped into it, not replaced.

### 5.2 Database (Supabase Postgres)

Minimum tables (adjust as needed, keep it small):

- `workspaces` — one per client company (the org)
- `profiles` — `id` (= `auth.users.id`), `email`, `full_name`, `created_at`
- `workspace_members` — links `auth.users` to workspaces
- `leads` — `id`, `workspace_id`, `name`, `phone_raw`, `phone_normalized`, `channel`, `notes`/raw context fields, `source_type` (`new` | `imported`), `lead_date`, `status`, `created_at`
- `lead_scores` — `lead_id`, `score` (0–100), `tag` (`hot|warm|cold`), `reason`, `reactivation_flag` (bool), `reactivation_reason`, `model`, `scored_at`

Rules:

- Every tenant-owned table has `workspace_id`.
- **On signup, a database trigger (or server action) creates the profile, the workspace, and the membership row.** A user must never exist without an org.
- **Row Level Security (RLS) on every table, from day one.** Policies scope reads/writes to workspaces the user belongs to. Never rely on app code alone for tenant isolation.
- Unique index on `(workspace_id, phone_normalized)` to enforce dedup at the DB level.
- Store the model name/version used for each score so results are auditable.

### 5.3 Phone normalization + dedup

- Use `libphonenumber-js`. Default region: **AE (UAE)**; accept international numbers.
- Normalize to E.164. Strip spaces, dashes, brackets, leading `00`.
- Handle common Dubai formats: `05x xxx xxxx`, `+971 5x ...`, `971...`, `00971...`.
- Invalid or missing phones: keep the lead, flag it, do not silently drop.
- Dedup within the uploaded file **and** against existing leads in the workspace.
- On duplicate: keep the existing record, optionally merge non-empty fields. Report counts (imported / duplicates skipped / invalid) back to the user.

### 5.4 CSV/Excel import — must be robust

This runs on **real client data in demos**. Real data is messy.

- Support `.csv`, `.xlsx`, `.xls`. Handle UTF-8 (incl. BOM), Arabic text, and mixed encodings gracefully.
- Column mapping UI: auto-detect common headers (name, phone/mobile, channel/source, notes, date), let the user correct the mapping before import.
- Tolerate: empty rows, extra columns, inconsistent date formats, trailing whitespace, merged/duplicate headers.
- Validate row by row; never fail the whole file because of one bad row. Return a per-row error report.
- Handle large files (thousands of rows) without timeouts: chunk inserts, process scoring in the background/batched flow, show progress.

### 5.5 AI layer

- **Provider abstraction:** one interface (e.g. `scoreLeads(leads[]) -> ScoredLead[]`) with OpenAI and Anthropic implementations. Provider + model chosen via env vars. **Default: OpenAI (cheap model).** Do not hardcode a provider in business logic.
- **Batching:** 10–20 leads per call. Keep batch size configurable.
- **Structured output:** require strict JSON (use JSON schema / structured outputs). Validate every response with Zod. Reject and retry on malformed output.
- **Match results to leads by ID**, never by position in the array.
- **Retries:** exponential backoff on rate limits/5xx; on persistent failure mark leads as `scoring_failed` so they can be re-run. Never lose a lead because a batch failed.
- **Cost control:** send only fields the model needs; keep prompts tight; do not re-score unchanged leads.
- **Prompt content:** include Dubai real estate context (off-plan vs. secondary, budget in AED, areas like Marina/Downtown/JVC, buyer vs. investor vs. renter signals). Score on **real intent signals** (budget, timeline, specificity, engagement, responsiveness), not on how polished the lead data looks.
- **Reasons must be short, concrete, and human-readable** (1–2 sentences an agent can act on). No vague filler like "seems interested".
- **Never invent facts.** If a lead has little data, score low-confidence and say so in the reason.
- Never log or expose full lead PII or API keys in client-side code or logs.

---

## 6. Dashboard Requirements

- Built by adapting the existing template UI (see 2.1). Do not restyle it.
- Two tabs: **New Leads** and **Reactivation Candidates**.
- Columns: name, phone, channel, score, reason, status.
- Default sort: score descending. Sortable and filterable (tag, channel, status).
- Hot/warm/cold shown with clear visual tags.
- Loading, empty, and error states for every view.
- Clean and fast over fancy. English only.

---

## 7. Coding Conventions

- TypeScript, strict mode. No `any` unless justified.
- Server-only secrets (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, Supabase service role key) never reach the client.
- Use Supabase server client in route handlers; use the service role key only where truly necessary and always re-verify workspace membership.
- Validate all API inputs with Zod.
- Keep components small; put logic in `/lib`, not in components.
- Migrations live in `/supabase/migrations`; never change schema by hand in the dashboard without a migration.
- Environment variables documented in `.env.example`.

---

## 8. Build Order

Build in this order. Do not start a later step until the earlier one works end-to-end.

1. **Frontend audit:** review the existing template, list what to keep, change, and delete (see 2.1). Remove unrelated pages and mock data.
2. **Foundation:** Supabase project, auth (login, signup, logout), workspaces, profiles, RLS policies, org assignment on signup.
3. **CSV/Excel import:** upload, column mapping, per-row validation and error report.
4. **Phone normalization + dedup:** rule-based, within file and against existing leads.
5. **AI pipeline:** provider abstraction, batched scoring, reactivation flagging, retries, Zod validation.
6. **Dashboard wiring:** connect the adapted template tables to Supabase data (two tabs, sorting/filtering, score reasons, loading/empty/error states).
7. **Polish:** only after 1-6 work on real data.

**Test data rule:** test each step early with a messy, realistic CSV (Arabic text, mixed phone formats, empty rows, duplicate numbers, inconsistent dates), not clean mock data. UI polish never comes before the pipeline is solid.

---

## 9. Design Notes

- **Hybrid scoring is preferred:** use rule-based signals (e.g. budget present, timeline present, recent activity) alongside the AI's intent judgment so scores stay consistent and explainable. Keep the rule weights configurable.
- **Show why a lead scored the way it did:** store and display a short breakdown or reason with every score, so agents can trust and act on it.
- **Large batches must not block the UI:** run scoring as a background/batched job that returns immediately, with progress the frontend can poll. Failed batches are retryable without re-scoring successful ones.
- **Take ideas, not code:** do not copy code from other open-source repos or add their features (n8n workflows, CRM boards, outreach automation, routing). The one exception is the frontend template already placed in this repo, which is the base to adapt. Stay within V1 scope.

---

## 10. Definition of Done

A change is done when:

- It stays inside V1 scope.
- The UI still looks like the original template; only files, data, and wiring changed.
- No unused template pages, components, or mock data remain.
- Login works, every user has an org id, and logout works.
- Tenant isolation holds (RLS verified; a user cannot see another workspace's leads).
- Import handles a messy real-world CSV without crashing.
- AI output is validated; failures are recoverable.
- Types compile, lint passes, no secrets in the client bundle.
- Works end-to-end on realistic data, not only mock data.

---

## 11. When Unsure

- Prefer the simplest thing that meets V1.
- If a request touches anything in the "NOT in V1" list, ask first.
- If a decision affects cost (AI calls per lead) or tenant security, flag it explicitly.