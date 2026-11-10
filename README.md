# token-glance

一个仓库装多个项目，按「分类目录 → 项目目录」两级组织。加新项目就是加一个文件夹，再在下面的索引里加一行。

## 目录约定

| 目录 | 放什么 | 命名 |
| --- | --- | --- |
| `skills/` | 给 AI agent 用的 skill（`SKILL.md` + 参考资料 + 示例），一个子目录一个 skill | 小写 + 短横线，如 `token-glance` |
| `projects/` | 完整项目、小工具、练习代码，一个子目录一个项目 | 小写 + 短横线，如 `csv-cleaner` |

每个项目目录里都放一个自己的 `README.md`，写清楚「做什么 / 怎么跑 / 依赖什么」。

## 项目索引

| 项目 | 分类 | 说明 |
| --- | --- | --- |
| [token-glance](skills/token-glance/README.md) | skill | 让 agent 一屏说清「这个会话正在干什么」：能扩展 UI 的宿主装成视图标签，其余宿主输出概览报告。支持 DSH / WorkBuddy / Codex / Qoder / 豆包 |

## 加一个新项目

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

## 本地克隆

```bash
git clone https://github.com/Icecube-Ss/token-glance.git
cd token-glance
```

## License

MIT — 见 [LICENSE](LICENSE)。各项目如另有许可证，以项目目录内的 `LICENSE` 为准。
