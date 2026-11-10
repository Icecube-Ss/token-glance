---
description: Token Glance (Mode B) — one-screen status report for the current session.
---

# /token-glance

Produce a session overview of the current conversation. If a `SKILL.md` with
`name: token-glance` is reachable from the repository root, read it plus
`references/mode-b-report.md` and follow them. Otherwise apply the rules below.

## Rules

- Use only facts from this session and from files read during it.
- A number you cannot measure is `unavailable`. Never estimate turns, tokens, or durations.
- Keep it to roughly one screen (≈250 words).
- Paths carry line refs where they matter (`src/app.ts:42`).

## Output

```markdown
## Token Glance

**Overview** — <one sentence>.
**State** — running · implementing
**Measured** — <measured counts, or unavailable>

### Done
- <bullet with file:line, command, or decided answer>

### In progress
- <the single step under way>

### Next
1. <concrete next step>

### Blockers
- <real blocker, or none>

### Key files
- `path:line` — why it matters
```

Do not add sections. Do not describe work that has not been requested.
