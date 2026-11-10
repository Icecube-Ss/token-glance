# Token Glance

> [!IMPORTANT]
> **The live view (Mode A) works on DSH only.** WorkBuddy, Qoder, Codex, Doubao and every
> other host get Mode B, a one-screen text report — a host capability limit, not a setting.
> Read [HOST-SUPPORT.md](HOST-SUPPORT.md) for the evidence per host and the reasons.

A portable **skill** that gives an agent one job: show the user what this session is actually
doing. Two delivery modes, chosen by a probe rather than a guess.

| Mode | Host | Result |
| --- | --- | --- |
| **A — view** | **DSH only** (it exposes a session-scoped view registry plus a session data contract) | A new view tab beside the shipped views: live status, pending submissions, issues, copy actions |
| **B — report** | Everything else: WorkBuddy, Qoder, Codex, Doubao, CLI agents | A one-screen Markdown overview (or a standalone HTML card on request) |

Both modes obey the same rule: only facts the session already exposes, `unavailable` instead
of an invented number.

## What is in here

```
SKILL.md                     the skill entry (open folder-skill format)
skill.json                   store metadata: id, modes, per-host support, permissions
HOST-SUPPORT.md              bilingual: which host gets which mode, and why
references/
  capability-probe.md        how the A/B decision is made, per host, with evidence
  mode-a-host-plugin.md      extension point, data contract, i18n, packaging, install, pitfalls
  mode-b-report.md           report schema, Markdown template, wording rules
  verification.md            what must be checked before claiming success
agents/                      per-host install notes and adapters
  dsh/ workbuddy/ codex/ qoder/ doubao/ generic/
assets/                      icon + self-contained HTML report template
examples/dsh-token-glance/   the working DSH plugin behind Mode A
PUBLISHING.md                GitHub release and store listing checklist
```

## Install

| Host | Support | Where to start |
| --- | --- | --- |
| DSH (DeepSeek Harness) | native skill (`SKILL.md`) + **the only host that can install the view** | `agents/dsh/README.md` |
| WorkBuddy | native skill folder — **report only** | `agents/workbuddy/README.md` |
| Codex CLI | prompt pack (`AGENTS.md` / custom prompt) — **report only** | `agents/codex/README.md` |
| Qoder | rule pack + `AGENTS.md` — **report only** | `agents/qoder/README.md` |
| Doubao / 豆包 | paste-ready agent instructions — **report only** | `agents/doubao/agent-instructions.md` |
| Anything else | `AGENTS` fragment — **report only** | `agents/generic/AGENTS.snippet.md` |

Shortest path on DSH: copy `SKILL.md`, `references/`, `assets/`, `examples/` into
`<project>/.agents/skills/token-glance/`, then enable the `skill-filesystem` and
`tool-skill` rows (both are disabled by default) so the catalog can see the folder.

## Verification status

| Claim | Evidence |
| --- | --- |
| Mode A works on DSH 0.2.1-rc.5 | Bundle installed (`application: applied`); `conversation.view` lists occupant `overview`, order 20, `active: true` |
| Skill discovery on DSH 0.2.1-rc.5 | Copied to `.agents/skills/token-glance/`; listed in the live catalog and loaded by its exact name, with no profile toggle |
| Mode A visual result | **Not observed** — the authoring session had no browser control; the example's own error boundary keeps a shape surprise inside the panel |
| WorkBuddy skill layout | Verified against the builtin skills shipped on disk |
| Codex / Qoder / Doubao adapters | Prompt and rule packs; not executed on those hosts |

Do not restate unverified rows as facts in a store listing. `CHANGELOG.md` carries the same
table at release time.

## Customize

- Tab position: the `order` and `id` in the view registration (`examples/.../client.js`).
- Wording: the `DICTS` block in the same file; keep both locales complete.
- Report shape: `references/mode-b-report.md`; the HTML card in `assets/report-template.html`.
- Host list: `skill.json` `hosts[]` — remove any host you have not verified rather than
  shipping an optimistic row.

## License

MIT — see `LICENSE`. The icon is original artwork and ships under the same license.
