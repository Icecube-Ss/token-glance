# Capability probe — can this host render a session view?

Decide in this order. Stop at the first decisive answer; do not build a view on a guess.

## 1. Look for a session-scoped view registry

A host can host the view only if it has all three:

1. A **registry of views, tabs, or panels** that plugins can add to (not only reorder).
2. A **session scope**, so one view addresses the current session rather than the whole app.
3. A way to **read session state** through a documented prop, hook, or service.

Evidence beats recollection. Prefer, in order: host inspection API → the host's own package
docs / README → an existing shipped view you can read → the host's public documentation.
Do not infer a registry from the presence of a "views" word in a UI string.

### DSH (verified on 0.2.1-rc.5)

```
cordis_inspect_list                                    # providers available
cordis_inspect_query platform=client provider=Slots method=listSubTree
cordis_inspect_query platform=client provider=Slots method=listSubTree root=conversation.view
```

`conversation.view` is a `list` slot, scope `session`, purpose "Registered Conversation
target Views, rendered one at a time", with shipped occupants `chat` (order 0) and
`trajectory` (order 10). Its catalog gives the registration options and the standard props,
including `sessionId` and the `useSession` selector hook. That is a full Mode A fit.

Other session-scoped homes exist (`conversation.composer.dock`, `conversation.input.left`,
`sidebar.session.row.hover`), but they decorate one region rather than provide a view. Use
them only when the request is a decoration, not an overview view.

### WorkBuddy

Skills and plugins ship as folders: `.../resources/plugins/<plugin>/skills/<name>/SKILL.md`,
and host plugins live beside them under `resources/plugins/`. The skill format is verified;
a session-view registry is **not** verified from this workspace. Treat WorkBuddy as Mode B
until the host documents a view registry or the user points at one.

### Codex, Qoder, Doubao, and CLI agents

No session-view registry is known: these surfaces render the host's own transcript. Mode B.
Their integration files live under `agents/`; each is a prompt or rule pack, not a runtime
extension.

### Unknown host

Ask the user one question: "Does this host let a plugin add a session-scoped view or tab,
and where is that documented?" If the answer is no or unknown, produce Mode B — it is
always deliverable.

## 2. If the probe fails, say why

Report the one check that failed (`no registry`, `no session scope`, `no state access`, or
`undocumented`) instead of a generic "not supported". That sentence is what lets the user
re-run the decision on a later host version.
