---
name: token-glance
description: Use when the user asks for a session overview, session view, session dashboard, session state panel, or a compact status card of the current session (会话概览 / 会话视图 / 会话面板 / 当前会话状态). On DSH it can install a live view tab; every other host (WorkBuddy, Qoder, Codex, Doubao) gets the one-screen report, because only DSH exposes a session-scoped view registry.
description_en: Use when the user asks for a session overview, session view, session dashboard, or a compact status card of the current session. Mode A (the live view tab) is DSH-only; every other host gets the one-screen text report. See HOST-SUPPORT.md.
license: MIT
metadata:
  version: 2.0.1
  modes: host-plugin, report
---

# Token Glance

Deliver an overview of the current agent session: a live **view** when the host lets
plugins extend its session UI, otherwise a compact **overview report**.

> [!IMPORTANT]
> **Mode A (the live view) is DSH-only.** WorkBuddy, Qoder, Codex, Doubao and every other
> host get Mode B, the text report. A skill is instructions, not runtime code: it cannot
> inject UI into a host that has no conversation-level plugin interface. See
> `HOST-SUPPORT.md` before promising a panel anywhere else.

Both modes share one contract — read only state the session already exposes, never invent
a number, and state which mode and which evidence the result rests on.

## 1. Choose the mode first

Run the probe in `references/capability-probe.md`. In short:

| Probe result | Mode |
| --- | --- |
| The host exposes a session-scoped view, tab, or panel registry **and** a session data contract (today: DSH only) | **A** — install a UI view |
| No UI extension exists, or the user only wants a status summary (Codex, Qoder, Doubao, CLI agents) | **B** — produce a report |

If the platform is ambiguous, or Mode A needs profile-level change the user has not
approved, ask once with these two options and continue with the answer.

## 2. Mode A — host view

Follow `references/mode-a-host-plugin.md`. Non-negotiables:

1. Add a **new** view id; never replace or shadow a shipped view.
2. Read session data only through documented slot props or host APIs. Do not scrape the
   DOM, another plugin's state, or session files.
3. Style with host theme tokens, and localize every visible string including the tab label.
4. Ship display metadata — title, description, icon — or explain the omission.
5. Verify what is verifiable (module loads, entry registers, manifest parses) and say
   plainly when the rendered pixels were not observed.

For DSH, `examples/dsh-token-glance/` is a working reference: a third view tab
(`overview`, order 20) beside Chat and Trajectory, installed live on DSH 0.2.1-rc.5.

## 3. Mode B — overview report

Follow `references/mode-b-report.md`. Produce Markdown by default; write a standalone HTML
card (`assets/report-template.html`) only when the user asks for HTML or a file.

- Every line must trace to this session or to files read during it.
- A number that cannot be measured is `unavailable` — never estimated, never invented.
- Keep it to one screen: objective, state, done, next, blockers, key files.
- Give paths with line refs where they matter (`src/app.ts:42`).

## 4. Verify and hand off

Use `references/verification.md`. Report the mode used, where the artifact lives, what was
verified, what stayed unobserved, and the exact command or setting the user needs next.

## References

| File | Load when |
| --- | --- |
| `references/capability-probe.md` | Choosing A or B, or documenting why a host cannot host a view |
| `references/mode-a-host-plugin.md` | Building the view: extension point, data contract, i18n, packaging, install, pitfalls |
| `references/mode-b-report.md` | Writing the report: schema, templates, wording rules |
| `references/verification.md` | Before claiming the result works |
| `agents/` | Installing this skill into a specific host |
