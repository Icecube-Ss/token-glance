# Install into Qoder

Qoder consumes project rules and standing agent instructions. This package ships both as
adapters; neither is a verified runtime extension.

## Option 1 — rule file

Copy `agents/qoder/rules/token-glance.md` to:

```
<project>/.qoder/rules/token-glance.md
```

Use it as an on-demand rule so it only fires when the user asks for a session overview.

## Option 2 — AGENTS.md

Append `agents/generic/AGENTS.snippet.md` to the repository `AGENTS.md`. Qoder reads standing
instructions there, and the pointer to `SKILL.md` keeps the detailed rules out of the
always-on prompt.

Keep the fragment as a `.snippet.md` file until you paste it: an `AGENTS.md` living inside a
skills tree would be loaded as standing instructions by every host that scans the workspace.

## Mode

Qoder renders its own transcript: **Mode B only**. There is no verified session-view
registry to extend, so do not plan a UI view for Qoder unless the host documents one; if it
does, re-run `references/capability-probe.md` and switch to Mode A.

## Caveat

Rule activation semantics vary by Qoder version. If the rule does not activate, verify the
file is picked up by the rule list before editing its content, and report that check in the
hand-off.
