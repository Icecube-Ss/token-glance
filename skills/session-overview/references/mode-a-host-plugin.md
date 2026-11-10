# Mode A — install a session overview view

A view is four decisions: extension point, data contract, presentation, packaging. Take
them in that order; each later step depends on the earlier one.

## 1. Extension point

Requirements: a list-style registry (adding a cell must not replace a shipped one), session
scope, and props that carry the session identity. Confirm the registration options
(`id`, `order`, `label`) and the injectable standard props before writing code.

DSH: `conversation.view` (list, session). Register through the slot service, not by
monkey-patching the shell:

```js
ctx.slots.inject('conversation.view', () =>
  ctx.slots.register(
    { name: 'conversation.view', id: 'overview', order: 20, label: () => t('view.label') },
    (props) => h(ViewBoundary, { message: t('crash') }, h(SessionOverview, { ...props, t })),
  ),
);
```

The `inject` callback re-runs whenever the owning declaration collapses and returns, so the
registration's lifetime follows the slot's, not the page's.

## 2. Data contract

Use only documented state. On DSH the view receives `sessionId` plus selector hooks
(`useSession`, `useChat`, `useTrajectory`, `useWorkspaces`, …). `useSession` exposes
`SessionSnapshot`:

| Field | Type | Use |
| --- | --- | --- |
| `sessionId` | id | identity, copy affordance |
| `running` | boolean | running/idle chip, live duration |
| `blank` | boolean | new-session chip |
| `awaitingFirstTurn` | boolean | waiting chip |
| `removed` | boolean | archived/deleted chip |
| `openState` | `cold \| loading \| open \| error` | loaded-window state |
| `hasMore` / `loadingOlder` | boolean | history paging |
| `pendingSubmissions` | `{ requestId, placement, time, text, attachments }[]` | queue list |
| `subagent` | `{ address, parentAvailable } \| null` | child-session chip |
| `openError` / `promptError` / `lastAgentError` | error \| null | issues block |

Rules that keep this stable:

- Select the smallest slice you need; never subscribe to the whole store per field.
- Treat every field as optional at the boundary (`x === true`, `Array.isArray(...)`), because
  a host upgrade may add or drop a field. A tolerant view degrades; a strict one blanks.
- Never fold session events yourself if the host publishes a projection or snapshot.

## 3. Presentation

- Inherit host tokens (`--dsw-alias-bg-layer-1`, `--dsw-alias-border-l1`,
  `--dsw-alias-label-primary`, `--dsw-alias-label-secondary`, `--dsw-alias-state-*`,
  `--dsw-alias-brand-primary`). Literal colors belong to artwork only.
- One screen, no nested scroll containers: a single scrolling column, sections as cards.
- Show state before detail: status chips → key metrics → queue → issues.
- Every visible string and the tab label go through the host locale service. On DSH,
  `ctx.locale.register(ns, locale, dict)` per locale and `ctx.locale.bind(ns)`; register the
  label as a thunk so it follows a locale switch without re-registration.
- Wrap the panel in a local error boundary. A shape surprise then costs one panel, not the
  slot: the console reports `slot entry crashed in '<slot>'` when it escapes.

## 4. Packaging and install

DSH bundle layout (see `examples/dsh-session-overview/`):

```
package.json          dsh.bundle.patch + dsh.client{platform:web, immediately, inject:[ui-conversation]}
cordis.patch.yml      - insert: [{ id, name }]
index.js              export function apply() {}            (Host half)
client.js             window.__ModuleLoader__.load({ id: name, factory(require) {...} })
locale/en.json        meta.title / meta.description         (store listing text)
locale/zh.json        same in the user's language
icon.svg              original artwork, ≤256 KiB
```

Checks before install: `node --check` every JS file, parse every JSON file, and make the
package name equal the client factory id. Install with `plugin_manager install_bundle` and
the absolute directory, then read `application` (and `warnings`) — logs and process lists
prove nothing.

Then confirm the live registration:

```
cordis_inspect_query platform=client provider=Slots method=listSubTree root=conversation.view
# expect your id with its order and "active": true
```

## Pitfalls collected from a real install

- **Types are stripped in shipped builds.** `lib/types/**/*.d.ts` may be absent; get contracts
  from the inspection providers and the package README instead of guessing.
- **`app.asar` is opaque to shells.** `ls`, `cat`, `grep`, `rg`, `glob`, and `node` cannot read
  inside it; only the host's own file-read path can. Copy template files into the workspace
  before checking them.
- **Do not import host client packages.** No `require('@deepseek-ai/dsh-client-ui-primitives')`;
  copy the markup/CSS you need and keep only `--dsw-alias-*` tokens.
- **A view tab bar may need two views.** DSH hides it with fewer than two, so verify with
  Trajectory (or Coding Tools) enabled before concluding the view is missing.
- **The `label` is projected, not rendered once.** Use a thunk for localized text.
- **Timer hygiene.** A live duration needs `setInterval` + cleanup in an effect, and the
  ref that stores the start must be cleared when the session stops running.
