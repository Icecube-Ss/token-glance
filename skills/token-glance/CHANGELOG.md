# Changelog

## 2.0.2 — 2026-11-10

**Docs: one README instead of two.**

- `README.md` and `README.zh.md` are merged into a single bilingual `README.md` — 中文 first,
  English under `## English`, with one shared IMPORTANT callout at the top. The repo owner
  asked for one file, not a language split.
- `README.zh.md` is removed; `skill.json` drops the `entrypoints.readmeZh` field, and the
  `PUBLISHING.md` listing table now points at the single file.
- `skill.json` `tagline.zh` now says "DSH 上装实时视图，其余宿主出一屏会话概览" (the 2.0.1
  wording change had missed the Chinese string).
- No behaviour change.

## 2.0.1 — 2026-11-10

**Docs: the view's host scope is now stated, not implied.**

- Added `HOST-SUPPORT.md` (bilingual): which host gets which mode, why, a capability matrix
  with the evidence found on disk, and the common misconceptions.
- `README.md` opens with an IMPORTANT callout: Mode A is **DSH-only**; every other host gets
  the report. The mode table no longer implies a "WorkBuddy-class host".
- `SKILL.md` carries the same warning; its probe table now requires a session data contract in
  addition to a view registry.
- `skill.json`: `modes[].availableOn` / `notAvailableOn`, `entrypoints.hostSupport`, updated
  per-host notes; the tagline says "on DSH" instead of "hosts that accept one".
- `PUBLISHING.md`: listing metadata must say DSH-only; new rule against implying a panel
  elsewhere.
- No behaviour change; no file moved, no name changed.

## 2.0.0 — 2026-11-10

**Breaking: the skill is renamed.** `session-overview` → `token-glance`, to match the
repository name.

- `SKILL.md` `name`, the skill folder, `skill.json` `id`, the Codex prompt
  (`/token-glance`), and the Qoder rule file all move together, because the name is the
  invocation key in DSH and the folder name in WorkBuddy.
- `displayName.en` is now **Token Glance**; `displayName.zh` is **Token Glance** too; the Chinese word 会话概览 stays only as a trigger and common noun
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
