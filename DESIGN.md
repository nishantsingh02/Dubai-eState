Build the auth flow and app shell for PropEase.

REFERENCES
- Read `agent.md` (V1 scope) and `Design.md` in the project root.
- Attached screenshots are the visual reference. Match their look and layout
  closely. If a screenshot conflicts with Design.md, the screenshots win.
- Do NOT edit or add to Design.md.
- Use the screenshots for style only. Do not copy the Advorly name, logo, or
  its features (credits, billing, upgrade plan, outreach, email lookup).
  None of that is in PropEase V1.

1. AUTH (Supabase Auth via @supabase/ssr)
- `/login` is the first page. One page with a Sign in / Sign up toggle
  (email + password). Show clear error and loading states.
- Middleware: unauthenticated users are redirected to `/login`.
  Authenticated users visiting `/login` go to the dashboard.
- On signup, create a workspace and a workspace_members row for the user
  (DB trigger or server action).
- Logout: icon button at the bottom of the sidebar. It signs out and
  redirects to `/login`.

2. DATA GATING
- After login, load the user's workspace and its leads from Supabase.
- If the workspace has leads, show them in the dashboard.
- If it has none, show an empty state with a clear "Import leads" action.
- Users only ever see their own workspace's data. Enforce with RLS, not
  just app code. Verify with two test accounts.

3. APP SHELL (match the screenshots)
- Left sidebar: logo + name, nav items with icons (Dashboard/Home,
  New Leads, Reactivation Candidates, Import, Settings). The active item is
  a white pill with a soft shadow.
- Sidebar bottom: user email (truncated), theme toggle, logout icon.
- Main area: off-white background with a subtle orange grid pattern,
  large rounded container, soft shadows, DM Sans-style font.
- Primary buttons: solid orange, rounded, with an icon (like "Find Leads").
- Forms: small gray labels, light gray rounded inputs and textareas.

4. LEAD TABLE (match the screenshot)
- Header row: small uppercase gray labels.
- Columns: name, phone, channel, score, reason, status.
- Row: square initial tile, bold name, muted two-line truncated reason.
- Hot / warm / cold shown as pills with a dot, using palette-consistent
  colors. Status uses the same pill style as "ACTIVE" in the screenshot.
- Full reason opens in a small card like the "AI Generated Draft" one.
- Loading skeletons, empty and error states on every view.

OUTPUT
Build in this order: tokens/Tailwind config, login page, middleware and
logout, app shell, then the lead table. After each step, list the
assumptions you made.