# token-glance

> [!IMPORTANT]
> **The live view in `skills/token-glance` runs on DSH only** — WorkBuddy, Qoder, Codex and
> Doubao get a text report instead. Reasons and per-host evidence:
> [HOST-SUPPORT.md](skills/token-glance/HOST-SUPPORT.md).
>
> **`skills/token-glance` 里的实时视图只在 DSH 生效** —— WorkBuddy / Qoder / Codex / 豆包只能
> 输出概览报告，原因与逐宿主证据见
> [HOST-SUPPORT.md](skills/token-glance/HOST-SUPPORT.md)。

[中文](#中文) · [English](#english)

---

## 中文

一个仓库装多个项目，按「分类目录 → 项目目录」两级组织。加新项目就是加一个文件夹，再在下面的索引里加一行。

### 目录约定

| 目录 | 放什么 | 命名 |
| --- | --- | --- |
| `skills/` | 给 AI agent 用的 skill（`SKILL.md` + 参考资料 + 示例），一个子目录一个 skill | 小写 + 短横线，如 `token-glance` |
| `projects/` | 完整项目、小工具、练习代码，一个子目录一个项目 | 小写 + 短横线，如 `csv-cleaner` |

每个项目目录里都放一个自己的 `README.md`，写清楚「做什么 / 怎么跑 / 依赖什么」。

### 项目索引

| 项目 | 分类 | 说明 |
| --- | --- | --- |
| [token-glance](skills/token-glance/README.md) | skill | 让 agent 一屏说清「这个会话正在干什么」。**实时视图只在 DSH 可用**；WorkBuddy / Qoder / Codex / 豆包等宿主只能输出概览报告。原因与逐宿主证据见 [HOST-SUPPORT.md](skills/token-glance/HOST-SUPPORT.md) |

### 加一个新项目

1. **选目录**：可复用的 agent skill 放 `skills/`，其它放 `projects/`。
2. **建文件夹**：`projects/我的项目名/`，名字用小写字母加短横线。
3. **放代码**，并在该文件夹里写 `README.md`。
4. **更新索引**：在上面「项目索引」表里加一行。
5. **提交并推送**：

   ```bash
   git add .
   git commit -m "add: 我的项目"
   git push
   ```

### 本地克隆

```bash
git clone https://github.com/Icecube-Ss/token-glance.git
cd token-glance
```

### 许可

MIT — 见 [LICENSE](LICENSE)。各项目如另有许可证，以项目目录内的 `LICENSE` 为准。

---

## English

One repository, many categorised projects, organised two levels deep: category directory →
project directory. Adding a project means adding a folder and one row in the index below.

### Directory convention

| Directory | What goes in it | Naming |
| --- | --- | --- |
| `skills/` | agent skills (`SKILL.md` + references + examples), one subdirectory per skill | lowercase + hyphens, e.g. `token-glance` |
| `projects/` | full projects, small tools, practice code, one subdirectory per project | lowercase + hyphens, e.g. `csv-cleaner` |

Every project directory carries its own `README.md` stating what it does, how to run it, and
what it depends on.

### Project index

| Project | Category | Description |
| --- | --- | --- |
| [token-glance](skills/token-glance/README.md) | skill | Tells the agent what the current session is doing, on one screen. **The live view works on DSH only**; WorkBuddy, Qoder, Codex and Doubao get the overview report instead. Reasons and per-host evidence: [HOST-SUPPORT.md](skills/token-glance/HOST-SUPPORT.md) |

### Adding a new project

1. **Pick the directory**: reusable agent skills go in `skills/`, everything else in `projects/`.
2. **Create the folder**: `projects/my-project/`, lowercase letters and hyphens.
3. **Add the code**, and write a `README.md` inside that folder.
4. **Update the index**: add a row to the project index table above.
5. **Commit and push**:

   ```bash
   git add .
   git commit -m "add: my project"
   git push
   ```

### Cloning locally

```bash
git clone https://github.com/Icecube-Ss/token-glance.git
cd token-glance
```

### License

MIT — see [LICENSE](LICENSE). A project that ships its own `LICENSE` inside its directory
takes precedence over the root one.
