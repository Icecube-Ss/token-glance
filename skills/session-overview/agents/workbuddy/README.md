# Install into WorkBuddy

WorkBuddy uses the same folder-shaped skill format: `<name>/SKILL.md` with YAML frontmatter.
Verified by inspecting the shipped builtin skills on disk
(`.../resources/plugins/workbuddy-builtin/skills/<name>/SKILL.md`).

## Frontmatter compatibility

| Key | Here | Notes |
| --- | --- | --- |
| `name` | required | kebab-case, matches the folder |
| `description` | required | third person, states when to use it |
| `description_en` | provided | tolerated extra key; keeps English triggering |
| `license` | provided | tolerated extra key |
| `agent_created` | omitted | add `agent_created: true` only if you create the skill with `skill_manage`, so it can edit or delete it later |

Do not add `disable`/`allowed-tools` unless you actually restrict the skill; omit and the
host behaves as for any ordinary skill.

## Where to put it

- Workspace or plugin skill folder: `skills/session-overview/` with `SKILL.md` plus
  `references/`, `assets/`, `examples/` beside it.
- Builtin-style location, when you control a plugin package:
  `<plugin>/skills/session-overview/SKILL.md`.

## Marketplace route

WorkBuddy installs skills conversationally through `search_and_install_skills`
(see the shipped `marketplace-skill-installer` skill). Publishing therefore means exposing
the skill in a marketplace index the host can search; the folder layout above is what the
installer materializes.

## Mode

A session-view registry for WorkBuddy is **not verified** from this workspace. Treat
WorkBuddy as Mode B until the host documents a view/panel registry, then switch to Mode A
with `references/mode-a-host-plugin.md`.
