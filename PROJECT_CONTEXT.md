# PROJECT CONTEXT — Ecommerce-Agent v0.6.2

> **AI 阅读入口** | 本文件是仓库最重要的入口文档，AI Agent 应在任务开始时优先阅读。
> **最后更新**：2026-06-30 | **维护者**：Codex AI Agent

---

## 1. 项目概览

**项目名称**：Ecommerce-Agent（电商智能体内容工厂）
**版本**：v0.6.2
**定位**：基于多智能体协作的跨境电商内容生成流水线，覆盖 Shopify + Facebook + TikTok 三大平台。
**核心能力**：产品分析 → Prompt生成 → AI图像生成 → 质量审查 → PPTX/HTML目录 → 运营分析 → 社交媒体文案

### 平台覆盖

| 平台 | 账号 | 覆盖技能 |
|------|------|----------|
| Shopify | hpdun.com | SEO、安全、移动端UX、电商运营分析 |
| Facebook | HPD | 社交媒体文案、内容日历、翻译质检 |
| TikTok | @hpdun3 | 社交媒体文案、内容日历、图片质量审查 |

---

## 2. 仓库结构分析

### 2.1 当前目录树

```
Ecommerce-Agent/                           — v0.6.2, 23 skills, 8 agents
├── Agents.md                              — AI Agent 入口指令（BOUNDING CONSTRAINTS + 核心原则）
├── README.md                              — 项目首页说明
├── CHANGELOG.md                           — v0.1 → v0.6.2 版本历史
├── COLLABORATION.md                       — 人类可读的多Agent协作流程
├── skills-index.json                      — 23 skill 机器可读索引
├── .env / .env.example                    — 环境变量配置
├── Dockerfile / docker-compose.yml        — Docker 部署
├── .pre-commit-config.yaml                — Git pre-commit hooks
│
├── skills/                                — 23 个 Agent Skill 定义（每个含 SKILL.md）
│   ├── product-analyzer/                  — [Phase 2] 产品分析
│   ├── image-prompt-generator/            — [Phase 3] Prompt 生成
│   ├── prompt-refactor/                   — [Phase 3-reject] Prompt 修复
│   ├── prompt-review/                     — [Phase 4] Prompt 审查
│   ├── image-generator/                   — [Phase 5] Imagen 图像生成
│   ├── image-quality-review/              — [Phase 6] 视觉QA
│   ├── catalog-generator/                 — [Phase 7] PPTX 目录
│   ├── listing-review/                    — [Phase 8] 目录审查
│   ├── code-review/                       — [Phase 8] 代码审查
│   ├── html-generator/                    — [Phase 9] HTML 目录
│   ├── mobile-ux-checklist/               — 移动端UX检查
│   ├── competitor-analysis/               — [Phase 1] 竞品分析
│   ├── ecommerce-analysis/                — [Phase 10] 运营分析
│   ├── seo-checklist/                     — Shopify SEO 审计
│   ├── security-checklist/                — 安全审计
│   ├── content-calendar/                  — 社交媒体排期
│   ├── social-copywriter/                 — Facebook/TikTok 文案
│   ├── translation-qa/                    — 翻译质量
│   ├── architecture-review/               — 跨平台架构审查
│   ├── debug-checklist/                   — 流水线故障排查
│   ├── context-compress/                  — 批量上下文管理
│   ├── workflow-optimize/                 — 流水线优化
│   └── reflection/                        — 元认知自检
│
├── config/                                — 配置中心
│   ├── agents.yaml                        — 8 个 Agent 角色定义
│   ├── pipeline.yaml                      — 10 阶段流水线拓扑
│   ├── rules.yaml                         — Skill 索引 + 优先级规则
│   └── tasks.yaml                         — 任务定义
│
├── scripts/                               — 脚本工具
│   ├── generate_images.py                 — Imagen 批量图像生成
│   ├── generate_images_mock.js            — Mock 图像生成
│   ├── apply_seo_fixes.py                 — SEO 修复应用
│   ├── integrations/                      — 平台集成
│   │   ├── facebook.js
│   │   ├── shopify.js
│   │   └── tiktok.js
│   └── pipeline/                          — 流水线执行引擎
│       ├── config.json
│       ├── runner.js                      — 主运行器（node_repl）
│       └── stage-executor.js              — 阶段执行引擎
│
├── mcp-server/                            — 社区 MCP Server（npm 包）
│   ├── package.json
│   ├── index.js                           — 5 个社区工具
│   ├── skills-index.json
│   └── skills/                            — Skill 副本分发（23个）
│
├── catalog/                               — HTML 预览服务
│   ├── index.html
│   └── server.js
│
├── playbooks/                             — 执行剧本
│   ├── _base.md                           — 共享模板
│   ├── multi_agent_collaboration.md       — 多Agent协作完整指南
│   └── checklists/                        — 专项检查清单
│       ├── code_review.md
│       ├── emergency_bugfix.md
│       ├── full_feature.md
│       ├── project_onboarding.md
│       └── release_process.md
│
├── rules/                                 — 11 个 AI 行为规则
│   ├── architecture.md, coding.md, context.md
│   ├── debug.md, git.md, output.md
│   ├── planning.md, review.md, safety.md, summarize.md
│   └── summary.md
│
├── templates/                             — 8 个输出模板
├── prompts/                               — 4 个 Prompt 模板
├── knowledge/                             — 项目知识库
│   ├── architecture_notes.md
│   ├── conventions.md
│   ├── data_verification.md
│   ├── glossary.md / glossary.yaml
│   ├── report_generation.md
│   └── tone_guide.md
│
├── commands/                              — 命令模板
├── Examples/                              — 使用示例
│   ├── catalog-generation-example.md
│   ├── product-prompt-example.md
│   └── workflow-example.md
│
├── tests/                                 — 测试（当前为空）
├── tmp/                                   — 临时文件
├── text/                                  — 文本库
├── Video/                                 — 视频素材
│
├── Input/                                 — 输入材料
│   ├── prompts_batch.json
│   ├── tasks.json
│   ├── shopify/                           — Shopify 图片
│   └── 资质/                              — 企业资质文件
│
├── Output/                                — 产出物
│   ├── *.pptx                             — 生成的PPTX目录
│   ├── *_diagnosis_*.md                   — 诊断报告
│   ├── *_remediation_plan_*.md            — 修复计划
│   ├── seo/                               — SEO修复
│   └── presentation-work/                 — 演示文稿工作文件
│
├── .cursor/rules/                         — AI 工具自动加载规则
│   ├── multi-agent.mdc
│   ├── project-overview.mdc
│   ├── ecommerce.mdc
│   └── coding.mdc
│
├── .github/workflows/                     — CI/CD
│   └── ci.yml
│
└── .obsidian/                             — Obsidian 笔记配置
```

### 2.2 核心组件清单

| 组件 | 数量 | 位置 | 说明 |
|------|------|------|------|
| Agent 角色定义 | 8 | config/agents.yaml | orchestrator, analyst, engineer, reviewer, cataloger, html_cataloger, copywriter (+ 1?) |
| Skill 定义 | 23 | skills/ + mcp-server/skills/ | 生产(5) + 审查(7) + 运营(8) + 编排(2) + 社交(1) |
| 流水线阶段 | 10 | config/pipeline.yaml | v2.0，含 redo-reject 循环 |
| MCP 工具 | 5 | mcp-server/index.js | 社区分发版 |
| 行为规则 | 11 | rules/ | 架构/编码/上下文/调试/Git/输出/规划/审查/安全/总结 |
| 执行剧本 | 6 | playbooks/ | 多Agent协作 + 5个专项清单 |
| 输出模板 | 8 | templates/ | — |
| Prompt模板 | 4 | prompts/ | — |
| 集成脚本 | 3 | scripts/integrations/ | Facebook, Shopify, TikTok |
| 流水线脚本 | 3 | scripts/pipeline/ | runner.js + stage-executor.js + config.json |

### 2.3 冗余与问题

| 问题 | 说明 |
|------|------|
| **skills/ 重复** | skills/ 和 mcp-server/skills/ 各有一份23个skill副本，内容相同 |
| **tools/ 为空** | tools/ 目录存在但无文件 |
| **tests/ 为空** | tests/ 目录存在但无测试 |
| **tmp/ 杂项** | tmp/ 含临时文件，不应纳入版本控制 |
| **乱码文件名** | 多个中文文件名在 Windows 终端显示为乱码（GBK编码问题） |
| **文档分散** | 知识库散落在 knowledge/, rules/, playbooks/, Examples/, commands/ 等多处 |
| **playbooks/ 结构** | playbooks/ 下直接放 playbook 文件，而实际 playbooks 在 checklists/ 子目录 |
| **根目录杂项** | .env, GemPrompt.md, ProductRule.md, Prompt.md, .pre-commit-config.yaml 等散落根目录 |
| **缺少文档** | 无 ARCHITECTURE.md、ROADMAP.md、CONTRIBUTING.md |

---

## 3. 目标重构结构

### 3.1 目标目录树

```
Ecommerce-Agent/
│
├── README.md                 ⭐ 项目首页（5分钟了解）
├── PROJECT_CONTEXT.md        ⭐ AI阅读入口（最重要）
├── ARCHITECTURE.md           ⭐ 系统架构 (NEW)
├── COLLABORATION.md          ⭐ Agent协作流程
├── CHANGELOG.md              ⭐ 更新日志
├── ROADMAP.md                ⭐ 开发计划 (NEW)
├── CONTRIBUTING.md           ⭐ 开发规范 (NEW)
│
├── docs/                     — 集中文档
│   ├── pipeline.md           → 流水线说明（从 playbooks/multi_agent_collaboration.md 提炼）
│   ├── skills.md             → Skill 索引说明
│   ├── agents.md             → Agent 角色说明（从 config/agents.yaml 提炼）
│   ├── mcp.md                → MCP Server 说明
│   ├── prompts.md            → Prompt 工程指南
│   ├── deployment.md         → Docker / 部署指南
│   ├── workflow.md           → 工作流程指南
│   ├── glossary.md           → 术语表（从 knowledge/glossary.md）
│   └── examples/             → 使用示例（从 Examples/）
│
├── skills/                   — 23 个 Skill 定义（保留，从 mcp-server/skills/ 中消除重复）
├── agents/                   — Agent 定义（NEW：单文件或目录化）
├── pipeline/                 — 流水线引擎（scripts/pipeline/ → pipeline/）
├── mcp/                      — MCP Server（mcp-server/ → mcp/）
├── prompts/                  — Prompt 模板（保留）
├── config/                   — 配置文件（保留）
├── tools/                     — 工具脚本（scripts/ → tools/）
├── knowledge/                — 知识库（保留，内容整合到 docs/ 后可选移除）
├── rules/                    — AI 行为规则（保留，或移至 docs/rules/）
├── templates/                — 输出模板（保留）
├── catalog/                  — HTML 预览（保留）
├── Input/                    — 输入材料（保留）
├── Output/                   — 产出物（保留）
├── .github/                  — CI/CD（保留）
├── .cursor/                  — AI 工具配置（保留）
│
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── .pre-commit-config.yaml
├── skills-index.json
└── .gitignore
```

### 3.2 重构映射

| 当前路径 | 目标路径 | 操作 |
|----------|----------|------|
| `mcp-server/` | `mcp/` | 重命名 |
| `scripts/pipeline/` | `pipeline/` | 移动 |
| `scripts/` | `tools/` | 重命名（清空空的 tools/ 后） |
| `mcp-server/skills/` | — | 删除（skills/ 已有一份） |
| `playbooks/` | `docs/playbooks/` | 移动 |
| `Examples/` | `docs/examples/` | 移动 |
| `commands/` | `docs/` | 合并 |
| `knowledge/glossary.md` | `docs/glossary.md` | 复制/移动 |
| `tmp/` | — | 加入 .gitignore，删除或保留 |
| `tests/` | `tests/` | 保留（待填充） |
| `Video/` | `Input/video/` 或保留 | 移动或保留 |
| `text/` | `Input/text/` 或保留 | 移动或保留 |
| `GemPrompt.md` | — | 评估后移动或删除 |
| `ProductRule.md` | `docs/` | 移动到文档 |
| `Prompt.md` | `prompts/` | 移动到 prompts 目录 |
| `tools/`（空） | — | 删除后用于 scripts/ 重命名 |
| `(新建)` | `ARCHITECTURE.md` | 新建 |
| `(新建)` | `ROADMAP.md` | 新建 |
| `(新建)` | `CONTRIBUTING.md` | 新建 |

---

## 4. 流水线拓扑（v2.0, 10阶段）

```
[Stage 1] 启动与竞品分析      → orchestrator   → 竞品分析报告
[Stage 2] 产品分析            → analyst        → Product Spec
[Stage 3] 生成Prompt          → engineer       → Gem Image Prompt
[Stage 4] 审查Prompt          → reviewer       → 审查结果（驳回→Stage3, 最多3次）
[Stage 5] 生成图片            → engineer       → 商品图PNG
[Stage 6] 图片质检            → reviewer       → 质检结果（驳回→Stage5）
[Stage 7] 生成PPTX            → cataloger      → PPTX目录
[Stage 8] 目录审查            → reviewer       → 审查结果（驳回→Stage7, 最多3次）
[Stage 9] 生成HTML            → html_cataloger → HTML目录
[Stage 10] 运营分析与交付     → orchestrator   → 最终报告 + SEO + 安全 + 内容日历
```

**触发条件**：用户提交产品需求
**最终交付物**：Prompt + 商品图PNG + PPTX目录 + HTML目录 + 运营分析 + 社交媒体文案

---

## 5. Agent 角色图谱

| Agent ID | 角色 | 技能数 | 上游 | 下游 |
|----------|------|--------|------|------|
| orchestrator | 工作流编排者 | 8 | — | analyst |
| analyst | 产品分析师 | 1 | orchestrator | engineer |
| engineer | Prompt 工程师 | 3 | analyst | reviewer |
| reviewer | 内容审查员 | 6 | engineer, cataloger | cataloger, orchestrator |
| cataloger | 目录生成器 | 1 | reviewer | html_cataloger |
| html_cataloger | HTML目录生成器 | 2 | cataloger | orchestrator |
| copywriter | 社交媒体文案 | 2 | (按需激活) | — |

---

## 6. Skill 分类索引

### 生产类（5个）
product-analyzer, image-prompt-generator, image-generator, catalog-generator, html-generator

### 审查类（7个）
prompt-review, prompt-refactor, image-quality-review, listing-review, code-review, translation-qa, reflection

### 运营类（8个）
competitor-analysis, ecommerce-analysis, seo-checklist, security-checklist, mobile-ux-checklist, content-calendar, architecture-review, debug-checklist

### 编排类（2个）
context-compress, workflow-optimize

### 社交类（1个）
social-copywriter

---

## 7. 关键配置文件

| 文件 | 路径 | 作用 |
|------|------|------|
| AI 入口指令 | Agents.md | BOUNDING CONSTRAINTS + 核心原则 + 架构导航 |
| Agent 角色 | config/agents.yaml | 8个Agent的 role/goal/backstory/skills |
| 流水线拓扑 | config/pipeline.yaml | 10阶段流水线 + redo逻辑 |
| 规则索引 | config/rules.yaml | 优先级 + 所有规则/剧本/模板/技能的索引 |
| 任务定义 | config/tasks.yaml | 任务模板定义 |
| Skill 索引 | skills-index.json | 23个skill的机器可读索引 |
| MCP Server | mcp-server/index.js | 5个社区工具（analyze_product_market, create_social_content, generate_product_catalog, generate_product_image, review_ecommerce_content）|

---

## 8. MCP 工具（5个）

| 工具 | 功能 |
|------|------|
| `analyze_product_market` | 竞品 + SEO + 运营分析 |
| `create_social_content` | Facebook/TikTok 文案 + 内容日历 |
| `generate_product_catalog` | PPTX/HTML 目录模板 |
| `generate_product_image` | 商品图 Prompt + Imagen 调用 |
| `review_ecommerce_content` | prompt/image/catalog/code/translation 审查 |

---

## 9. 重构可行性评估

### ✅ 可以立即完成
- 创建 `PROJECT_CONTEXT.md`（本文件）
- 创建 `ARCHITECTURE.md`（骨架）
- 创建 `ROADMAP.md`（骨架）
- 创建 `CONTRIBUTING.md`（骨架）
- 创建 `docs/` 目录结构
- 简单重命名操作（mcp-server → mcp）

### ⚠️ 需要谨慎处理
- skills/ 重复副本清理（mcp-server/skills/ 删除前确认无外部依赖）
- playbooks/ 移动（需更新 playbooks/checklists/ 内部引用）
- 路径引用更新（config/*.yaml, scripts/*, .cursor/rules/*）

### ❌ 不建议立即操作
- 大规模脚本路径重写（可能引入运行时bug）
- 中文乱码文件重命名（需要确认原文件名）
- .obsidian/ 配置修改（属于个人工具配置）

---

## 10. 重构执行顺序

1. 创建 `PROJECT_CONTEXT.md`（本文件）✅
2. 创建 `docs/` 目录
3. 创建 `ARCHITECTURE.md`、`ROADMAP.md`、`CONTRIBUTING.md`
4. 移动文档：`playbooks/` → `docs/playbooks/`, `Examples/` → `docs/examples/`
5. 重命名/移动：`mcp-server/` → `mcp/`, `scripts/` → `tools/`
6. 创建 `pipeline/` 目录，移动 `scripts/pipeline/` 内容
7. 清理冗余：删除 `mcp-server/skills/`（确认 skills/ 已是主副本）
8. 更新引用：config/*.yaml、.cursor/rules/*、skills-index.json
9. 更新 `.gitignore` 和 `.env.example`
10. 验证流水线可运行

---

*本文件由 Codex AI Agent 自动生成，随项目演进持续更新。*
