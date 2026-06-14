# Layout Restructure + Gmail Workspace

## Goal

1. **Connect Accounts page (`/home`)** — remove sidebar, keep top nav + cards + new sections (Connection Status, Recent Activity, Integration Health).
2. **Manage Gmail** — replace the generic Agentic sidebar with a Gmail-specific sidebar containing 8 items, each backed by a real, content-rich page.

No visual redesign. Same color palette, typography, card styling, spacing, animations.

---

## Routing

Two new layout shells, both reusing existing tokens and card patterns.

```text
src/routes/
  _connect.tsx          ← pathless layout: TopBar only (NO sidebar)
    _connect.home.tsx   ← /home  (moved from _app.home.tsx — Connect Accounts)

  _gmail.tsx            ← pathless layout: GmailShell with 8-item sidebar
    _gmail.gmail.overview.tsx     → /gmail/overview
    _gmail.gmail.inbox.tsx        → /gmail/inbox
    _gmail.gmail.priorities.tsx   → /gmail/priorities
    _gmail.gmail.actions.tsx      → /gmail/actions
    _gmail.gmail.summaries.tsx    → /gmail/summaries
    _gmail.gmail.analytics.tsx    → /gmail/analytics
    _gmail.gmail.integrations.tsx → /gmail/integrations
    _gmail.gmail.settings.tsx     → /gmail/settings
    _gmail.gmail.index.tsx        → /gmail (redirects → /gmail/overview)
```

`/integrations/gmail/manage` becomes a thin redirect to `/gmail/overview`, so the home page's "Manage Gmail" button still works and nothing else breaks.

### Files removed (replaced by new structure)
- `src/routes/_app.gmail.tsx` (old `/gmail`, conflicts with new layout)
- `src/routes/_app.gmail_.classifications.tsx` (folded into Inbox / Priorities)
- `src/routes/_app.home.tsx` (moved to `_connect.home.tsx`)

`_app.tsx` and the existing `AppShell` stay intact — other authed pages (`/conversations`, `/opportunities`, `/analytics`, `/settings`, etc.) continue to work exactly as before.

---

## Connect Accounts page (`/home`)

Reuse the existing Home content (integration cards, status, activity) but render it inside `_connect.tsx`'s sidebar-less shell. Add three new sections beneath the cards using existing card / typography styles:

1. **Connection Status** — Connected Accounts count, Last Sync timestamp, Account Health badge.
2. **Recent Activity** — recent sync + connection events (reuses existing `recentActivity` array).
3. **Integration Health Summary** — Gmail / LinkedIn / Instagram health rows.

Top bar: logo + theme toggle + notifications + avatar (lifted from `AppShell` header so it looks identical).

---

## Gmail Workspace Shell (`GmailShell`)

New `src/components/GmailShell.tsx`. Same visual treatment as `AppShell` (sidebar width, blur, active-state spring, upgrade card, profile dropdown) — only the nav list changes:

```text
Overview · Inbox · Priorities · Actions · Summaries · Analytics · Integrations · Settings
```

Top header is identical to AppShell's (search, theme, bell, avatar).

---

## The 8 pages (each is real, not placeholder)

| Page | Content |
|---|---|
| **Overview** | KPI grid (Emails Processed, New Today, Important, Pending Actions, Follow-Ups, Last Sync) + Recent Activity + Recent Important Emails + Today's Summary Preview. Reuses Gmail data from `IntegrationManagePage`'s `DATA.gmail`. |
| **Inbox** | Category pills (All / Recruiting / Finance / Meetings / Support / Marketing / Personal) + 2-pane layout: left email list w/ search & filters, right pane = selected email content + AI Summary + Priority Score + Suggested Actions. Driven by `SAMPLE_EMAILS` from `EmailIntelligenceSection`. |
| **Priorities** | 5 grouped sections (High / Urgent / Needs Response / Deadline Approaching / Overdue). Each row: subject, sender, priority badge, due date, reason. |
| **Actions** | Action cards grid: Source Email, Suggested Action, Priority, Deadline, Status. Examples: Reply to Recruiter, Pay Invoice, Schedule Meeting, Follow Up with Client, Review Contract. |
| **Summaries** | Tabs (Daily / Weekly / Monthly) → Key Conversations, Important Events, Pending Follow-Ups, Actionable Insights, Communication Trends. |
| **Analytics** | Charts: Email Volume Trend (line), Category Distribution (bars), Priority Distribution (donut), Response Time Trend (line), Top Senders (list), Weekly Activity (bar). Uses inline SVG charts in the same style as the existing `ActivityChart`. |
| **Integrations** | Gmail (Connected + last sync + Manage), LinkedIn (Coming Soon), Instagram (Coming Soon). |
| **Settings** | Profile / Notifications / Security / Connected Accounts / Preferences sections. |

All sample datasets live in a new `src/lib/gmail-data.ts` so every page imports from one source.

---

## Technical details

- All new route files use `createFileRoute("/_gmail/gmail/<slug>")` or `createFileRoute("/_connect/home")` to match generated route IDs.
- `_connect.tsx` guards auth via `useAuth` + `<Navigate to="/auth/login" />`, same as `_app.tsx`.
- `_gmail.tsx` does the same auth guard.
- `AppShell.tsx` updated: remove the now-orphan nav items that the user said belong only in the Gmail workspace? **No** — user only asked to replace the sidebar *on Manage Gmail*. AppShell stays untouched so existing routes keep working.
- `IntegrationManagePage.tsx` "View Classifications" button → repointed to `/gmail/overview`, OR the whole `/integrations/gmail/manage` route is replaced by a `<Navigate to="/gmail/overview" />` redirect (simpler — chosen).
- Home page (`_connect.home.tsx`) "Manage Gmail" button → `/gmail/overview`.
- No backend / OAuth / sync logic touched. `gmailService`, `integrationService`, `useIntegrations` untouched.

---

## Out of scope (explicitly preserved)

- AppShell sidebar contents, styling, color tokens, typography, spacing.
- Auth flow, OAuth, sync, gmailService.
- LinkedIn / Instagram setup + manage routes.
- All existing card components and shadcn UI.

After approval I'll create all files in a single batch.
