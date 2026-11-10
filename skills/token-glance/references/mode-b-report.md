# Mode B — overview report

For hosts without a view registry (Codex, Qoder, Doubao, CLI agents), the same information
becomes a one-screen report the user reads in the transcript or saves as a file.

## Schema

Eight fields, in this order. Omit nothing; write `unavailable` when a field has no evidence.

| Field | Content | Evidence rule |
| --- | --- | --- |
| `Overview` | one sentence: what this session is trying to achieve | the latest human request |
| `State` | `running`/`idle` + phase: exploring, implementing, verifying, wrapping up | what the transcript actually shows |
| `Done` | 3–6 bullets, each with a file, command, or decided answer | cite `path:line` or a command you ran |
| `In progress` | the single step under way right now | current turn's last action |
| `Next` | 1–3 concrete steps, imperative | derived from the objective, not invented scope |
| `Blockers` | open questions, failing checks, missing approvals | only real ones; `none` is a valid answer |
| `Key files` | up to 6 paths that matter, with line refs | files you touched or read this session |
| `Measured` | counts you can actually measure (e.g. files changed, tests run) | otherwise `unavailable` |

## Wording rules

- No adjectives that carry no evidence ("robust", "comprehensive") — state what exists.
- No invented numbers: turns, token usage, percentages, and durations are `unavailable`
  unless the host exposes them.
- No forward promises about work not requested. `Next` stays inside the current objective.
- Cap the whole report at roughly one screen (≈250 words). Detail belongs in the work itself.

## Markdown template

```markdown
## Token Glance

**Overview** — <one sentence>.
**State** — running · implementing
**Measured** — files changed 3 · tests run 1 · token usage unavailable

### Done
- `packages/client/ui-session/lib/index.js:42` — registered the view entry
- `node --check client.js` — syntax clean
- decided: new view id `overview`, order 20

### In progress
- wiring the live duration timer

### Next
1. install the bundle and read `application`
2. confirm the live slot occupant

### Blockers
- none

### Key files
- `client.js:120` — panel render
- `references/mode-a-host-plugin.md` — install checklist
```

## HTML variant

Use `assets/report-template.html` only when the user asks for HTML or a file. Keep it
self-contained: inline CSS, no CDN, no external fonts, no scripts, and system font stacks.
Fill the `{{PLACEHOLDER}}` tokens and delete the rows you cannot evidence.

## When the host has partial state

If the host exposes a session id or a running flag but no queue or error state, report only
the fields it exposes and mark the others `unavailable`. A short honest report beats a
complete-looking fabricated one.
