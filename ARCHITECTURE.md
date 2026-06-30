# ARCHITECTURE — Ecommerce-Agent 系统架构

> **最后更新**：2026-06-30 | **版本**：v0.6.2

---

## 架构概览

Ecommerce-Agent 是一个基于**多智能体协作（Multi-Agent Collaboration）**的电商内容生成系统。它由 8 个 Agent 角色、23 个 Skill、10 阶段流水线组成，通过流水线编排实现从产品需求到多平台交付的全自动化。

```
┌─────────────────────────────────────────────────────────────┐
│                      用户提交产品需求                          │
└─────────────────────┬───────────────────────────────────────┘
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  Orchestrator (编排者)                                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────┐  │
│  │竞品分析  │ │SEO审计   │ │安全审计  │ │工作流优化     │  │
│  └──────────┘ └──────────┘ └──────────┘ └───────────────┘  │
└─────────────────────┬───────────────────────────────────────┘
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  Product Analyst → Prompt Engineer → Content Reviewer        │
│  (产品分析)       (Prompt+图像生成)    (质量审查+反思)        │
│       │                │                    │                │
│       ▼                ▼                    ▼                │
│  Product Spec    Gem Image Prompt     Review Report          │
│                          │                                    │
│                          ▼                                    │
│                    Imagen API                                │
│                          │                                    │
│                          ▼                                    │
│                     商品图 PNG                               │
└─────────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  Catalog Generator → Content Reviewer → HTML Generator       │
│  (PPTX目录生成)      (目录审查)          (HTML交互目录)       │
└─────────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    最终交付                                   │
│  Prompt + PNG + PPTX + HTML + 运营报告 + 社交媒体文案        │
└─────────────────────────────────────────────────────────────┘
```

---

## 核心设计原则

| 原则 | 说明 |
|------|------|
| **单一职责 Agent** | 每个 Agent 专注一个领域，通过 Skill 组合实现能力 |
| **Redo-Reject 质量环** | Prompt 审查和目录审查支持驳回重做（最多3次） |
| **平台无关核心** | 核心流水线与平台解耦，通过集成脚本扩展 |
| **声明式配置** | Agent、Pipeline、Skill 均通过 YAML/JSON 声明，无需改代码 |

---

## 技术栈

| 层次 | 技术 |
|------|------|
| **编排引擎** | Node.js (runner.js + stage-executor.js) |
| **AI 图像** | Google Vertex AI Imagen |
| **目录生成** | python-pptx, HTML/CSS |
| **配置** | YAML (agents.yaml, pipeline.yaml) |
| **MCP 分发** | npm package (mcp-server/) |
| **部署** | Docker + docker-compose |
| **CI/CD** | GitHub Actions |

---

## 目录职责

| 目录 | 职责 |
|------|------|
| `skills/` | 23 个独立 Skill 定义（每个含 SKILL.md） |
| `config/` | Agent 角色、流水线拓扑、规则索引 |
| `pipeline/` | 流水线执行引擎 |
| `mcp/` | 社区 MCP Server（5 工具） |
| `tools/` | 工具脚本（图像生成、平台集成） |
| `docs/` | 项目文档集中管理 |
| `prompts/` | Prompt 模板 |
| `templates/` | 输出模板 |
| `catalog/` | HTML 预览服务 |
| `rules/` | AI 行为规则（11 条） |

---

## 数据流

```
Input/                    skills/                   Output/
├── prompts_batch.json    ├── product-analyzer/     ├── *.pptx
├── tasks.json            ├── image-generator/      ├── *.md
├── shopify/              ├── catalog-generator/    ├── seo/
└── 模板.pptx             └── ...                   └── presentation-work/
```

---

*本文档由 Codex AI Agent 维护。*
