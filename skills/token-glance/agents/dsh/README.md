# Install into DSH (DeepSeek Harness)

Native skill format — `SKILL.md` with `name` + `description` is exactly what DSH parses.

Verified against DSH `0.2.1-rc.5`.

## Filesystem install

1. Copy this repository's `SKILL.md`, `references/`, `assets/`, and `examples/` into one
   directory with a kebab-case name:

   ```
   <project>/.agents/skills/token-glance/SKILL.md
   ```

   Scanned roots, by priority: `<project>/.dsh/skills` (100), `<project>/.agents/skills`
   (200), `Config.customSkillDirs` (300), `<dshHome>/skills` (400), `<agentsHome>/skills` (500).
   The project root is the nearest ancestor containing `.git`.

2. Verify discovery from the agent: load the skill by its exact kebab-case name
   (`token-glance`). A load that returns the body proves discovery; a plain file copy
   proves nothing.

   Verified on `0.2.1-rc.5`: after the copy the skill appeared in the live catalog and loaded
   by name **with no profile toggle**. A profile that mounts neither a bundled nor a
   filesystem provider needs two rows first — `skill-filesystem` scans the roots and
   `tool-skill` exposes the catalog:

   ```
   plugin_manager set_plugin target=skill-filesystem enabled=true
   plugin_manager set_plugin target=tool-skill      enabled=true
   ```

   Check the catalog before toggling: in this profile both rows report `enabled: false` while
   discovery still worked, so the toggle is a fallback, not a prerequisite.

## Two traps

- **Nested `SKILL.md` files are not discovered.** Only `<root>/<name>/SKILL.md` or
  `<root>/<name>.md` at a scanned root counts. Copying the whole repository in and pointing a
  root at it will not register this skill.
- **A skill without a mounted provider is invisible.** If the catalog does not list
  `token-glance`, check the provider rows before debugging the frontmatter.

## Bundle alternative

To ship the skill without touching disk roots, a plugin can register it in memory from its
Host half with `ctx.skills.register(...)` — same `name`/`description`/body, `runtime`
provider. That path keeps the skill versioned with the bundle and avoids the two rows above.
See `examples/dsh-token-glance/` for the bundle shape (that example ships the view, not
the skill body; the registration call is the only difference).

## Mode

DSH exposes the `conversation.view` slot, so Mode A is available. `examples/dsh-token-glance/`
is the installed reference implementation.
