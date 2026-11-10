<!-- Append this fragment to an AGENTS.md (repository or user-level) for hosts without a native
     skill directory: Codex, Qoder, or any agent that follows standing instructions.
     Keep this file named *.snippet.md: an AGENTS.md inside a skills tree would be loaded as
     standing instructions by any host that scans the workspace. -->

## Session overview

When the user asks for a session overview, session view, session dashboard, or a status card of
the current session (会话概览 / 会话视图 / 会话面板 / 当前会话状态), follow the `session-overview`
skill.

- Read `SKILL.md` at the root of the `session-overview` package when it is reachable, then the
  reference it points to. `references/capability-probe.md` decides the mode; `references/mode-b-report.md`
  is the report schema.
- If the package is not reachable, apply the short form: one-screen Markdown with these headings —
  Overview, State, Measured, Done, In progress, Next, Blockers, Key files.
- Only use facts from this session and from files read during it. A number that cannot be measured
  is `unavailable`; never estimate turns, tokens, or durations.
- Mode A (an installed view or tab) applies only when the host exposes a session-scoped view
  registry. Do not claim a UI change you did not install and verify.
