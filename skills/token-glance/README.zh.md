# Token Glance

> [!IMPORTANT]
> **实时视图（形态 A）只有 DSH 支持。** WorkBuddy、Qoder、Codex、豆包等所有其它宿主只能得到
> 形态 B 的一屏文本报告——这是宿主能力差异，不是配置问题。逐宿主的证据与原因见
> [HOST-SUPPORT.md](HOST-SUPPORT.md)。

一个可移植的 **skill**，只做一件事：让 agent 把"这一场会话到底在干什么"讲清楚。
两种形态，靠探测决定，不靠猜。

| 形态 | 适用宿主 | 结果 |
| --- | --- | --- |
| **A · 视图** | **仅 DSH**（它同时提供会话级视图注册表和会话数据契约） | 在原有视图旁新增一个页签：实时状态、待处理提交、异常、复制操作 |
| **B · 报告** | 其余全部：WorkBuddy、Qoder、Codex、豆包、CLI agent | 一屏 Markdown 会话概览；用户要文件时产出单文件 HTML 卡片 |

两种形态共用一条铁律：只用会话已经暴露的事实；测不出来的数字写 `unavailable`，不估算。

## 目录

```
SKILL.md                     技能入口（开放目录型 skill 格式）
skill.json                   上架元数据：id、形态、各宿主支持度、权限
HOST-SUPPORT.md              中英双语：哪个宿主得到哪种形态，以及为什么
references/
  capability-probe.md        如何判定 A/B，按宿主给证据
  mode-a-host-plugin.md      扩展点、数据契约、i18n、打包、安装、坑
  mode-b-report.md           报告字段、Markdown 模板、措辞规则
  verification.md            声称"能用"之前必须核对的清单
agents/                      各宿主安装说明与适配文件
  dsh/ workbuddy/ codex/ qoder/ doubao/ generic/
assets/                      图标 + 单文件 HTML 报告模板
examples/dsh-token-glance/   形态 A 背后已装通的 DSH 插件
PUBLISHING.md                GitHub 发布与商店上架清单
```

## 安装

| 宿主 | 支持形态 | 入口 |
| --- | --- | --- |
| DSH（DeepSeek Harness） | 原生 skill（`SKILL.md`）+ **唯一能装视图的宿主** | `agents/dsh/README.md` |
| WorkBuddy | 原生 skill 目录——**只有报告** | `agents/workbuddy/README.md` |
| Codex CLI | 提示词包（`AGENTS.md` / 自定义提示）——**只有报告** | `agents/codex/README.md` |
| Qoder | 规则包 + `AGENTS.md`——**只有报告** | `agents/qoder/README.md` |
| 豆包 / Doubao | 可直接粘贴的智能体指令——**只有报告** | `agents/doubao/agent-instructions.md` |
| 其它 | `AGENTS` 片段——**只有报告** | `agents/generic/AGENTS.snippet.md` |

DSH 最短路径：把 `SKILL.md`、`references/`、`assets/`、`examples/` 复制到
`<项目>/.agents/skills/token-glance/`，再启用 `skill-filesystem` 与 `tool-skill`
两行（默认都是关闭的），否则目录扫描不到这个技能。

## 验证状态

| 结论 | 证据 |
| --- | --- |
| 形态 A 在 DSH 0.2.1-rc.5 可用 | bundle 安装返回 `application: applied`；`conversation.view` 的 occupant 出现 `overview`，order 20，`active: true` |
| 技能发现在 DSH 0.2.1-rc.5 | 复制到 `.agents/skills/token-glance/` 后出现在实时目录中，并按名字成功加载，未改动 profile 开关 |
| 形态 A 的实际画面 | **未观察**——编写会话没有浏览器控制；示例自带错误边界，形状变化只会影响面板本身 |
| WorkBuddy 技能目录规范 | 对照磁盘上随包发布的 builtin skills 核对过 |
| Codex / Qoder / 豆包 适配 | 提示词与规则包，未在这三个宿主上实际执行 |

上架文案里不要把未验证的行写成事实；发布时的同一张表在 `CHANGELOG.md` 里。

## 定制

- 页签位置：视图注册里的 `order` 与 `id`（`examples/.../client.js`）。
- 文案：同文件里的 `DICTS`，两个语种都要补齐。
- 报告结构：`references/mode-b-report.md`；HTML 卡片：`assets/report-template.html`。
- 宿主清单：`skill.json` 的 `hosts[]`——没验证过的宿主宁可删掉，也别留乐观的一行。

## 许可

MIT，见 `LICENSE`。图标为原创矢量图，随同 MIT 授权。
