# Domain Docs

此文件说明工程技能在探索代码库时应如何读取本仓库的领域文档。

## 探索代码前先读取

- 根目录的 `CONTEXT.md`
- 如果根目录存在 `CONTEXT-MAP.md`，则改为按其中说明读取相关 context 的 `CONTEXT.md`
- `docs/adr/` 中与当前工作区域相关的 ADR

如果这些文件或目录不存在，直接继续工作即可。不要因为缺少它们而报错，也不要预先建议创建它们。`domain-modeling` 相关技能会在真正需要沉淀术语或架构决策时再创建。

## 文件结构

本仓库采用 single-context 布局：

```text
/
├── CONTEXT.md
├── docs/adr/
│   ├── 0001-example-decision.md
│   └── 0002-example-decision.md
└── src/
```

如果将来仓库变成 multi-context 布局，应在根目录添加 `CONTEXT-MAP.md`，并由它指向各 context 的 `CONTEXT.md`：

```text
/
├── CONTEXT-MAP.md
├── docs/adr/
└── src/
    ├── frontend/
    │   ├── CONTEXT.md
    │   └── docs/adr/
    └── backend/
        ├── CONTEXT.md
        └── docs/adr/
```

## 使用 glossary 中的词汇

当输出中需要命名领域概念时，例如 issue 标题、重构建议、bug 假设、测试名，应优先使用 `CONTEXT.md` 中定义的术语。不要随意替换成 glossary 明确避免的同义词。

如果需要的概念还没有出现在 glossary 中，这通常表示两种可能：

- 正在创造项目里尚未使用的语言，应重新确认
- 领域文档确实有缺口，可留给 `domain-modeling` 后续补充

## 标出 ADR 冲突

如果输出与已有 ADR 冲突，应明确指出，而不是静默覆盖。

示例：

> 与 ADR-0007 冲突，但值得重新讨论，因为……
