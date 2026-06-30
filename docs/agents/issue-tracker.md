# Issue tracker：GitHub

本仓库的 issue 和 PRD 通过 GitHub Issues 跟踪。所有相关操作默认使用 `gh` CLI。

## 约定

- **创建 issue**：使用 `gh issue create --title "..." --body "..."`
- **读取 issue**：使用 `gh issue view <number> --comments`，必要时同时读取 labels
- **列出 issue**：使用 `gh issue list --state open --json number,title,body,labels,comments`，并按需要添加 `--label`、`--state` 等过滤条件
- **评论 issue**：使用 `gh issue comment <number> --body "..."`
- **添加或移除 labels**：使用 `gh issue edit <number> --add-label "..."` 或 `--remove-label "..."`
- **关闭 issue**：使用 `gh issue close <number> --comment "..."`

在仓库 clone 内运行时，`gh` 会自动根据 `git remote -v` 推断 GitHub 仓库。

## Pull requests 是否作为 triage 请求入口

**PRs as a request surface：no。**

外部 PR 不纳入 issue triage 请求队列。也就是说，`triage` 处理请求时默认只处理 GitHub Issues，不把外部贡献者提交的 PR 当作功能请求处理。

如果将来改为 `yes`，外部 PR 会和 issue 一样进入同一套 labels 与状态流转。此时应使用 `gh pr view`、`gh pr list`、`gh pr comment`、`gh pr edit`、`gh pr close` 等对应命令，并只纳入 `authorAssociation` 为 `CONTRIBUTOR`、`FIRST_TIME_CONTRIBUTOR` 或 `NONE` 的外部 PR。

GitHub 的 issue 和 PR 共用编号空间，因此裸编号如 `#42` 可能是 issue，也可能是 PR。需要区分时，先尝试 `gh pr view 42`，失败后再尝试 `gh issue view 42`。

## 当 skill 说“publish to the issue tracker”

创建一个 GitHub Issue。

## 当 skill 说“fetch the relevant ticket”

运行 `gh issue view <number> --comments`。
