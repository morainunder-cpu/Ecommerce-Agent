# Ecommerce-Agent v0.7

> 舒特工贸 (Xinjiang Shute Industry & Trade) 多智能体电商内容生成管线
>
> 产品描述 → AI 图像 Prompt → 商品图 (Imagen) → 图册 (PPTX/HTML) → 社交媒体文案 → Shopify 店铺内容 → 社区 MCP Server 分发

---

## 平台账号

| 平台 | 账号 | 用途 |
|------|------|------|
| Shopify | [hpdun.com](https://hpdun.com) | 产品店铺 |
| TikTok | @hpdun3 | 短视频引流 |
| Facebook | HPD | 社交营销 |

---

## 项目架构

```
Ecommerce-Agent/
├── Agents.md                     # AI 开发操作系统入口
├── README.md                     # 项目概览（本文件）
├── CHANGELOG.md                  # v0.1 → v0.7 完整变更记录
├── skills-index.json             # 23 Skill 机器可读索引
├── .env.example                  # 环境变量模板
├── .gitignore
├── .pre-commit-config.yaml
├── config/                       # YAML 配置系统 (v2.0)
│   ├── agents.yaml               # 8 Agent + 23 Skill 绑定定义
│   ├── pipeline.yaml             # 10 阶段执行管线定义
│   ├── tasks.yaml                # 任务工作流定义
│   └── rules.yaml                # 规则索引与优先级
├── .cursor/rules/                # AI 工具自动加载规则
│   ├── project-overview.mdc      # 项目入口概览
│   ├── ecommerce.mdc             # 电商专项规则
│   ├── coding.mdc                # 编码规范
│   └── multi-agent.mdc           # 多智能体协作入口
├── .github/workflows/            # CI/CD
│   └── ci.yml                    # Markdown lint + 文件检查 + YAML 校验
├── rules/                        # AI 行为规则 (11 文件)
├── docs/playbooks/                    # 标准操作规程 (10 文件)
│   ├── _base.md                  # 共享模板结构
│   ├── multi_agent_collaboration.md  # 多智能体完整执行指南
│   └── checklists/               # 专项检查表 (5 文件)
├── templates/                    # 输出模板 (8 文件)
├── prompts/                      # Prompt 模板 (4 文件)
├── knowledge/                    # 项目知识库
│   ├── architecture_notes.md
│   ├── conventions.md
│   ├── glossary.md               # 术语表（人读）
│   └── glossary.yaml             # 术语表（机读）
├── skills/                       # ⭐ 23 自定义电商 Skill (SKILL.md each)
├── tools/                        # 脚本工具（图像生成、平台集成）\r\n│   ├── generate_images.py        # Vertex AI Imagen 批量生图\r\n│   ├── apply_seo_fixes.py        # SEO 修复应用\r\n│   └── integrations/             # Facebook/Shopify/TikTok 集成\r\n├── pipeline/                     # 管线执行引擎\r\n│   ├── config.json\r\n│   ├── runner.js\r\n│   └── stage-executor.js\r\n├── docs/                         # 集中文档\r\n│   ├── playbooks/                # 执行剧本\r\n│   └── examples/                 # 使用示例\r\n├── agents/                       # Agent 定义\r\n├── mcp/                   # 🚀 社区 MCP Server (npm 分发包)
│   ├── package.json
│   ├── index.js                  # 5 个社区工具
│   └── skills/                   # Skill 副本
├── Input/                        # 输入物料
│   ├── prompts_batch.json        # 批量 Prompt
│   ├── tasks.json                # 任务定义
│   └── 图册模板.pptx             # PPTX 模板
├── Output/                       # 生成产物 (PPTX + PNG)
└── catalog/                      # HTML 产品目录
    ├── index.html
    └── server.js
```

---

## Skill 体系 (23 Skill, 5 大类)

| 类别 | 数量 | Skill |
|------|------|-------|
| **Production** (生产) | 5 | product-analyzer, image-prompt-generator, image-generator, catalog-generator, html-generator |
| **Review** (审查) | 7 | prompt-review, prompt-refactor, image-quality-review, listing-review, code-review, translation-qa, reflection |
| **Operations** (运营) | 8 | competitor-analysis, ecommerce-analysis, seo-checklist, security-checklist, mobile-ux-checklist, content-calendar, architecture-review, debug-checklist |
| **Orchestration** (编排) | 2 | context-compress, workflow-optimize |
| **Social** (社交) | 1 | social-copywriter |

---

## Agent 体系 (8 Agent)

| Agent | 绑定 Skill | 职责 |
|-------|-----------|------|
| workflow_orchestrator | 8 | 编排调度、竞品分析、安全检查 |
| product_analyst | 1 | 产品描述结构化解析 |
| prompt_engineer | 3 | Prompt 生成、重构、Imagen 生图 |
| content_reviewer | 6 | 全链路内容质量审查 |
| catalog_generator | 1 | PPTX 产品图册生成 |
| html_catalog_generator | 2 | HTML 目录 + 移动端适配 |
| social_copywriter | 2 | 社交媒体文案 + 内容日历 |

---

## 执行管线 (10 阶段, v2.0)

```
Phase 1-2: orchestrator → product-analyzer → Product Spec
Phase 3-4: prompt_engineer → prompt-review → Prompt
Phase 5-6: image-generator → image-quality-review → PNG
Phase 7-8: catalog-generator → listing-review → PPTX
Phase 9-10: html-generator → ops analysis → delivery
```

详细参见 `docs/playbooks/multi_agent_collaboration.md`

---

## 管线执行器

```bash
# 通过 node_repl 加载并运行管线
runPipeline("production-4", tasks, 0)   # 单产品生产链
runPipeline("review-6",   tasks, 0)     # 全链路审查链
runPipeline("operations-3", tasks, 0)   # 运营分析链
```

---

## 快速开始

```bash
# 1. 安装 Imagen 依赖
pip install google-cloud-aiplatform

# 2. 认证 Google Cloud
gcloud auth application-default login

# 3. 批量生成商品图
python tools/generate_images.py --batch Input/prompts_batch.json

# 4. 预览 HTML 目录
cd catalog && node server.js
```

---

## MCP Server (社区分发)

```bash
cd mcp
npm install
node index.js --self-test
```

提供 5 个社区工具：generate_product_image、generate_product_catalog、analyze_product_market、create_social_content、review_ecommerce_content

---

## 参考

- `AGENTS.md` — AI 开发操作系统
- `docs/playbooks/multi_agent_collaboration.md` — 完整多智能体执行指南
- `config/agents.yaml` — Agent + Skill 绑定定义
- `config/pipeline.yaml` — 管线 v2.0 定义
- `CHANGELOG.md` — v0.1 → v0.7 完整历史
- `skills-index.json` — 23 Skill 机器可读索引
