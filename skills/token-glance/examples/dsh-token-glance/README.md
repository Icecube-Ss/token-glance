# @local/dsh-token-glance

在 DSH Web UI 的会话页签栏中，在 Chat / Trajectory 旁新增一个「概览」（Overview）视图。

## 功能

- 会话状态胶囊：运行中 / 空闲、空白会话、等待首轮、已移除、子代理、更早分页。
- 关键指标：装载状态（`openState`）、本次运行已持续时长、待处理提交数、已载入窗口是否还有更早分页。
- 待处理提交列表：排队 / 引导 / 发送中、时间、附件数量与文本预览。
- 异常区：打开错误、提交错误、最近一次模型错误。
- 操作：复制会话 ID、复制诊断 JSON。

数据全部来自 `conversation.view` 槽位注入的标准 Hook `useSession`（`SessionSnapshot`），不读取会话事件、不写 DOM、不依赖其他插件的样式。

## 结构

| 文件 | 作用 |
| --- | --- |
| `index.js` | Host 半个插件，仅用于让 bundle 可安装、可开关。 |
| `client.js` | 浏览器模块：注册 `conversation.view` 单元格（id `overview`，order 20）并渲染视图。 |
| `cordis.patch.yml` | 插入一行 `dsh-token-glance`。 |
| `locale/en.json`、`locale/zh.json` | 插件列表里显示的标题与说明。 |
| `icon.svg` | 插件图标（原创矢量图）。 |

## 版本

- 1.0.0：首个版本，只读展示，无配置项。
