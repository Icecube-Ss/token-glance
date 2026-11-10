# Host support / 宿主支持

> **一句话：实时视图（形态 A）只有 DSH 支持。其它所有宿主——WorkBuddy、Qoder、Codex、豆包、
> 通用 CLI agent——只能得到形态 B 的一屏文本报告。这是宿主能力差异，不是配置问题。**
>
> **One line: the live view (Mode A) works on DSH only. Every other host — WorkBuddy, Qoder,
> Codex, Doubao, generic CLI agents — gets the Mode B text report. This is a host capability
> limit, not a setting.**

- [中文说明](#中文说明)
- [English](#english)
- 判定逻辑 / probe logic: [`references/capability-probe.md`](references/capability-probe.md)

---

## 中文说明

### 结论表

| 宿主 | 形态 A（实时视图） | 形态 B（文本报告） | 依据 |
| --- | --- | --- | --- |
| **DSH（DeepSeek Harness）** | ✅ **可以，已实测** | ✅ | 客户端插件可注册 `conversation.view` 插槽；已装通，occupant `overview`、order 20、`active: true` |
| WorkBuddy | ❌ 不可以 | ✅ | 扩展清单（`extension.json`）只有 `ui.entry`（**整页入口**）、`artifactPreviews`、`pickers`、`settings`；没有“往会话里加页签”的贡献点 |
| Qoder（VS Code 内核） | ⚠️ 理论上可写扩展，实际拿不到数据 | ✅ | 有 VS Code 扩展宿主，可开 webview 面板；但没有公开 API 暴露 agent 的实时会话状态 |
| Codex CLI | ❌ 不可以 | ✅ | 只消费提示词 / `AGENTS.md` |
| 豆包 / Coze 智能体 | ❌ 不可以 | ✅ | 只消费粘贴的智能体指令 |
| 其它 agent | ❌ 不可以 | ✅ | 只消费 `AGENTS.md` 片段 |

### 为什么只有 DSH 行

形态 A 要同时满足两个条件，缺一不可：

1. **有会话级的 UI 扩展点**——宿主得允许外部代码往它的会话界面里注册一个页签/面板；
2. **有会话数据的读取契约**——那个扩展点得能把当前会话的实时状态（运行中/空闲、待处理提交、最近异常）交给插件读。

DSH 两样都有（`conversation.view` 插槽 + `useSession` / `SessionSnapshot`），所以能渲染出实时面板。

WorkBuddy 有扩展体系，但它的扩展是**整页入口**（像“灵感社区”那样带图标和标题的一个页面，`ui.entry.url` 指向 Module Federation 的 `remoteEntry.js`），加上若干专用预览位；它的 guest SDK 能收到 `wb:conversation:stateChange` 事件，也就是**数据够得着，但没有地方挂**。

Qoder 是 VS Code 内核，扩展能开 webview，但那只是“一个网页”，里面没有会话状态可读，除非自己去翻日志。

Codex 和豆包只吃文本，连扩展宿主都没有。

### 这个 skill 自己的定位

skill 是**指令**，不是运行时代码。它能做两件事：

- 在 DSH 上，把“怎么装那个插件”写成可执行步骤（`references/mode-a-host-plugin.md`），并给出一个能跑的示例插件（`examples/dsh-token-glance/`）；
- 在没有视图的宿主上，产出一份结构固定的报告（`references/mode-b-report.md`）。

它**不能**把自己的 UI 注入到别人的界面里——那需要宿主提供插件接口，而 WorkBuddy / Qoder / Codex / 豆包都没有提供会话级的那种接口。

### 常见误解

| 误解 | 事实 |
| --- | --- |
| “装上这个 skill 就会多一个面板” | 不会。只有 DSH 且按 `agents/dsh/README.md` 装了插件才会 |
| “WorkBuddy 也是 AI 客户端，应该一样” | 它有扩展体系，但入口是整页，不是会话内页签 |
| “换个模型就好了” | 与模型无关，是宿主 UI 架构的差异 |
| “那换个宿主测测” | 除 DSH 外，任何宿主的上限都是文本报告 |

### 各宿主里你实际会看到什么

- **DSH**：会话界面上多一个视图页签，实时刷新。
- **其它**：一段 Markdown，结构固定为 Overview / State / Measured / Done / In progress / Next /
  Blockers / Key files；需要文件时，还可以生成单文件 HTML 卡片（`assets/report-template.html`）在浏览器里看。

---

## English

### Support matrix

| Host | Mode A (live view) | Mode B (text report) | Evidence |
| --- | --- | --- | --- |
| **DSH (DeepSeek Harness)** | ✅ **yes, verified** | ✅ | Client plugins can register a `conversation.view` slot; installed with occupant `overview`, order 20, `active: true` |
| WorkBuddy | ❌ no | ✅ | `extension.json` offers `ui.entry` (a **full page** entry), `artifactPreviews`, `pickers`, `settings` — no conversation-level tab contribution |
| Qoder (VS Code core) | ⚠️ an extension is possible, the data is not | ✅ | It hosts VS Code extensions, so a webview panel can be built, but no public API exposes the agent's live session state |
| Codex CLI | ❌ no | ✅ | Consumes prompts / `AGENTS.md` only |
| Doubao / Coze agents | ❌ no | ✅ | Consumes pasted agent instructions only |
| Any other agent | ❌ no | ✅ | Consumes an `AGENTS.md` fragment only |

### Why only DSH qualifies

Mode A needs both of these at once:

1. **A session-scoped UI extension point** — the host must let outside code register a tab or
   panel inside its conversation surface.
2. **A session data contract** — that extension point must expose live state (running/idle,
   pending submissions, latest errors) to the plugin.

DSH provides both (`conversation.view` slot plus `useSession` / `SessionSnapshot`), which is
why it can render a live panel.

WorkBuddy does have an extension system, but its extensions are **full-page entries** (a page
with its own icon and title, `ui.entry.url` pointing at a Module Federation `remoteEntry.js`)
plus specialised preview slots. Its guest SDK does emit `wb:conversation:stateChange` events —
so the data is reachable, but there is nowhere to mount a conversation view.

Qoder runs a VS Code core, so an extension can open a webview — but a webview is just a web
page; the live session state is not exposed, so it would have to parse logs.

Codex and Doubao only consume text and have no extension host at all.

### Where the skill stops

A skill is **instructions**, not runtime code. It can:

- on DSH, spell out how to install the plugin (`references/mode-a-host-plugin.md`) and ship a
  working example (`examples/dsh-token-glance/`);
- everywhere else, produce a fixed-structure report (`references/mode-b-report.md`).

It **cannot** inject UI into a host that does not offer a plugin interface, and none of
WorkBuddy, Qoder, Codex, or Doubao offers a conversation-level one.

### Common misconceptions

| Misconception | Reality |
| --- | --- |
| "Installing the skill adds a panel" | It does not. Only DSH, and only after the plugin is installed per `agents/dsh/README.md` |
| "WorkBuddy is an AI client too, so it should work the same" | It has extensions, but they are full-page entries, not conversation tabs |
| "A different model would fix it" | Model-independent; this is host UI architecture |
| "Let me try another host" | Outside DSH the ceiling is a text report |

### What you actually see per host

- **DSH**: an extra view tab inside the conversation, updating live.
- **Everything else**: a Markdown report with fixed sections — Overview / State / Measured /
  Done / In progress / Next / Blockers / Key files — optionally a self-contained HTML card
  (`assets/report-template.html`) you can open in a browser.
