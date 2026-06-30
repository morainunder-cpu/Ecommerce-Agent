# Architecture Notes

## 项目概述

本项目是一个电商 AI 代理操作系统框架，专为电商场景设计。核心能力包括：
- 商品图 Prompt 生成（Gem Image 提示词）
- PPTX 商品目录自动生成
- HTML 商品目录展示
- 产品文案脚本管理

---

## 目录结构

| 目录 | 职责 |
|------|------|
| `rules/` | AI 行为规则，覆盖编码、安全、规划、审查等维度 |
| `playbooks/` | 标准操作流程（代码审查、Bug 修复、功能开发、入职、发布） |
| `templates/` | 文档模板（架构分析、变更日志、调试、功能设计、事故、计划、报告、审查） |
| `prompts/` | 提示词模板（Bug 修复、功能开发、重构） |
| `knowledge/` | 项目知识库（架构说明、编码约定、术语表） |
| `Input/` | 输入文件（如 PPTX 图册模板） |
| `Output/` | 输出文件（生成的 PPTX 目录及中间文件） |
| `catalog/` | HTML 商品目录（index.html + server.js） |
| `Examples/` | 示例文件 |
| `text/` | 文案脚本文件（企业简介等） |

---

## 核心组件关系

```
AGENTS.md (顶层指令)
    |
    v
rules/  →  定义行为边界
    |
    v
playbooks/  →  标准化流程
    |
    v
templates/  →  输出格式规范
    |
    v
prompts/  →  快速启动模板
    |
    v
knowledge/  →  项目知识支撑
```

---

## 数据流

1. **商品图 Prompt 生成流**
   ProductRule.md → Prompt.md → GemPrompt.md → Gem Image API → 商品展示图

2. **PPTX 目录生成流**
   Input/图册模板.pptx → (AI 处理) → Output/*.pptx → 客户交付

3. **文案管理流**
   text/*.txt → 文案脚本库 → 抖音/视频平台输出

---

## 设计原则

- **AI 优先**：整个框架面向 AI 代理设计，而非人工开发者
- **规则驱动**：行为由 rules/ 文件明确约束，避免猜测
- **流程标准化**：通过 playbooks 确保可重复、可预期的结果
- **知识分离**：知识库独立于规则，降低维护成本
- **小范围修改**：偏好增量变更，避免大规模重写

---

## 已知限制

- `playbooks/release_process.md` 尚未填充
- `knowledge/` 目录刚建立，内容有待完善
- 缺少自动化测试和 CI/CD 配置
- 缺少与外部 AI 工具（如 Cursor、Claude Code）的集成配置
- 项目规模较小，部分规则可能过设计
