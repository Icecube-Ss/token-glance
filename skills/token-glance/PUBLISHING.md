# Publishing — GitHub and agent stores

Everything a listing needs is already in the repo; this file is the checklist so a release
does not ship an optimistic claim.

## 1. GitHub repository

The skill ships inside the `token-glance` repository at `skills/token-glance/`, so a release
is a normal push plus a tag:

```bash
git add skills/token-glance
git commit -m "release: token-glance 2.0.0"
git push
git tag -a token-glance-v2.0.0 -m "token-glance 2.0.0"
git push origin token-glance-v2.0.0
```

Repository: <https://github.com/Icecube-Ss/token-glance>

Repository settings:

- **Description**: "A live session view on DSH; a one-screen overview report on every other
  host (WorkBuddy, Codex, Qoder, Doubao). Mode A is DSH-only — see HOST-SUPPORT.md."
- **Topics**: `agent-skill`, `skills`, `session`, `overview`, `dashboard`, `dsh`, `workbuddy`,
  `codex`, `qoder`, `doubao`.
- **LICENSE**: MIT is already present, with the copyright holder line set.

## 2. Listing metadata

`skill.json` is the machine-readable listing; stores that accept a manifest can consume it
directly.

| Listing field | Source |
| --- | --- |
| id / slug | `skill.json` → `id` (`token-glance`; keep kebab-case, it is also the skill name) |
| name | `displayName.en` / `displayName.zh` |
| tagline | `tagline` |
| long description | `README.md` / `README.zh.md` |
| version | `version`, mirrored in `SKILL.md` `metadata.version` |
| license | `LICENSE` |
| icon | `assets/icon.svg` (original artwork, 64×64 viewBox) |
| category | `categories` |
| tags | `tags` + `keywords` (Chinese keywords included so Chinese queries match) |
| compatibility | `hosts[]` — each row states `support` and `verified`; `modes[].availableOn` marks the view as DSH-only |
| permissions | `permissions` — filesystem read, no network, install requires approval |
| entrypoint | `entrypoints.skill` (`SKILL.md`) |

Keep `hosts[].verified` honest. A store that reprints "verified" for an adapter you never ran
is worse than one that lists the adapter as `adapter only`.

**Always state that the view is DSH-only.** Any listing line that implies a panel on
WorkBuddy, Qoder, Codex, or Doubao is false: those hosts get the text report. `HOST-SUPPORT.md`
carries the bilingual wording you can copy.

## 3. Screenshots

Screenshots must come from a real host with the view installed:

1. Install `examples/dsh-token-glance/` on a DSH profile.
2. Open a session, select the **Overview** tab.
3. Capture the panel in light and dark themes, plus one Report-mode example.

No mock shells, no static compositions of the design. If you cannot capture, publish without
screenshots and say the view is unverified visually — the image is not worth a false claim.

## 4. Per-store notes

- **DSH**: ship either the skill folder (`.agents/skills/token-glance/`, needs
  `skill-filesystem` + `tool-skill`) or a bundle that registers the skill in memory through
  `ctx.skills.register`. The view itself installs with `plugin_manager install_bundle`
  (absolute directory), and verification is the live slot occupant, not the install log.
- **WorkBuddy**: the marketplace installs through `search_and_install_skills`; publish the
  folder in whatever index your marketplace searches, keeping `SKILL.md` at the folder root.
  Add `agent_created: true` only if the skill is created by `skill_manage`.
- **Codex / Qoder**: no store entry — these consume `AGENTS.md` or rule files, so the
  "listing" is the repository README plus the adapter file path.
- **Doubao / 豆包 / Coze**: paste `agents/doubao/agent-instructions.md` into the agent
  instructions field. Verify the field's length limit first; if it truncates, keep the hard
  rules and drop the output-format code block.

## 5. Release rules

- Semver. A new view id or a report-schema change is **minor**; a field rename or a skill
  rename that breaks existing consumers is **major**.
- The skill name is frozen at 2.0.0: `name` is the invocation key in DSH and the folder name
  in WorkBuddy. The 1.0.0 → 2.0.0 rename (`session-overview` → `token-glance`) was a one-time
  break, aligned with the repository name; do not repeat it.
- Update `CHANGELOG.md` and the verification table in the same commit as the change.
- Keep `hosts[]` and `agents/` in sync: adding a host without an adapter file is a broken row.

## 6. Before you publish

- [ ] `SKILL.md` frontmatter parses; `name` and `description` present.
- [ ] Every JSON file parses; `skill.json` has no unverified `verified` value.
- [ ] No `node_modules`, no absolute local paths, no profile link paths, no `.push` logs.
- [ ] `examples/dsh-token-glance/client.js` passes `node --check`.
- [ ] No `AGENTS.md` inside the skill tree (only `*.snippet.md`) — an `AGENTS.md` there would
      be auto-loaded as standing instructions by hosts scanning the workspace.
