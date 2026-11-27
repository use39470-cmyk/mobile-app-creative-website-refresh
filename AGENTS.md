<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Architecture

- Keep the imported multi-page site and its original static assets under `public/nuuke`, with `/` embedding the supplied homepage; this preserves its page interactions and exported visual design. Keep verified original animation bundles in this static directory because the archive contains damaged compiled scripts.
- Keep service-specific pricing pages and their shared presentation alongside the imported pages under `public/nuuke`, so existing multipage navigation and interactions remain intact.
- Render confirmed packages in both the static pricing overview and service detail; inquiry links carry a package identifier resolved by an allowlist on the contact page, so selected package names and prices remain consistent.
- Keep footer badge styling in one stylesheet loaded by every imported page, so shared footer changes preserve the original compiled layouts.

- Keep support UI in TanStack routes and bridge the imported static pages through one shared support widget, so original animations and navigation stay intact.
- Protect inquiries and admin chat actions with database admin-role policies; visitor chat access uses hashed, high-entropy per-conversation capability keys checked only in server handlers.
- Resolve inquiry package amounts from the server allowlist rather than visitor-provided prices, so package quotes remain trustworthy.
- Keep admin profile attributes in owner-scoped profiles and private avatar storage; never place privileges in profile fields.
- Keep inquiry and conversation pagination/filter state in route search parameters so admin links and reloads preserve context.

- Keep mobile Services graphics initialization proximity-triggered and recover from timed-out loads by clearing the static state on success; this avoids competing with the opening scene and preserves animation on slower phones.
