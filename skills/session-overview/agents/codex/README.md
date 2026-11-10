# Install into Codex CLI

Codex has no local skill-directory contract that this package can rely on, so it gets two
prompt-level integrations. Both are adapters, not verified runtime extensions.

## Option 1 — repository AGENTS.md

Append `agents/generic/AGENTS.snippet.md` to the repository's `AGENTS.md` (or
`~/.codex/AGENTS.md` for every session). Codex reads it as standing instructions and will
look for this skill's `SKILL.md` in the repository.

## Option 2 — custom prompt

Copy `agents/codex/prompts/session-overview.md` to `~/.codex/prompts/session-overview.md`
when your Codex build supports custom prompts, then invoke it as `/session-overview`.

The prompt is self-contained: it carries the report schema, so it works even when the
repository is not checked out next to the agent.

## Mode

Codex renders its own transcript and exposes no view registry: **Mode B only**. If a future
Codex build adds a session-view registry, switch to Mode A using
`references/mode-a-host-plugin.md` — the probe in `references/capability-probe.md` decides.

## Caveat

Custom-prompt support has changed across Codex releases. If `/session-overview` does not
appear, use Option 1 and say so in the hand-off instead of assuming the prompt loaded.
