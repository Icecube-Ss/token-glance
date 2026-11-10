# Changelog

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
- `examples/dsh-session-overview/`: the DSH plugin that motivated this skill — a third view
  tab (`overview`, order 20) beside Chat and Trajectory.

### Verification status at release

| Item | Status |
| --- | --- |
| Mode A on DSH 0.2.1-rc.5 | Installed and live: `conversation.view` occupant `overview`, `active: true`; bundle install returned `applied` |
| Skill discovery on DSH 0.2.1-rc.5 | Copied to `.agents/skills/session-overview/`; listed in the catalog and loaded by name |
| Mode A rendered pixels | Not observed (no browser control in the authoring session) |
| WorkBuddy skill layout | Verified against the shipped builtin skills on disk |
| Codex / Qoder / Doubao adapters | Written as prompt and rule packs; not executed on those hosts |
