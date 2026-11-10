# Changelog

## 2.0.0 — 2026-11-10

**Breaking: the skill is renamed.** `session-overview` → `token-glance`, to match the
repository name.

- `SKILL.md` `name`, the skill folder, `skill.json` `id`, the Codex prompt
  (`/token-glance`), and the Qoder rule file all move together, because the name is the
  invocation key in DSH and the folder name in WorkBuddy.
- `displayName.en` is now **Token Glance**; `displayName.zh` stays 会话概览, which is still
  what the skill does.
- No behaviour change: same two modes, same probe, same report schema, same adapters.
- The example plugin was renamed with the product: `examples/dsh-session-overview/` →
  `examples/dsh-token-glance/`, package `@local/dsh-token-glance`, bundle id
  `dsh-token-glance`. Its view id stays `overview` (that is the tab, not the product name),
  so the verification row for occupant `overview` still holds.
- Existing installs must be re-installed under the new folder name; an already-installed
  example bundle must be reinstalled from `examples/dsh-token-glance/`.

## 1.0.0 — 2026-11-10

First release.

- `SKILL.md` in the open folder-skill format (`name`, `description`, plus `description_en`
  for hosts that keep a bilingual trigger).
- Two modes with an explicit probe: **A** installs a session-scoped view into a host that
  exposes a view registry; **B** emits a one-screen overview report for hosts that do not.
- `references/`: capability probe, Mode A recipe (DSH APIs, `SessionSnapshot` contract, i18n,
  packaging, install, pitfalls), Mode B schema and templates, verification checklist.
- `agents/`: DSH, WorkBuddy, Codex, Qoder, Doubao, and a generic `AGENTS.snippet.md`.
- `assets/`: icon and a self-contained HTML overview template.
- `examples/dsh-token-glance/`: the DSH plugin that motivated this skill — a third view
  tab (`overview`, order 20) beside Chat and Trajectory.

### Verification status at release

| Item | Status |
| --- | --- |
| Mode A on DSH 0.2.1-rc.5 | Installed and live: `conversation.view` occupant `overview`, `active: true`; bundle install returned `applied` |
| Skill discovery on DSH 0.2.1-rc.5 | Copied to `.agents/skills/token-glance/`; listed in the catalog and loaded by name |
| Mode A rendered pixels | Not observed (no browser control in the authoring session) |
| WorkBuddy skill layout | Verified against the shipped builtin skills on disk |
| Codex / Qoder / Doubao adapters | Written as prompt and rule packs; not executed on those hosts |
