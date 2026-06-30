# Changelog

---


---


## v0.7

Date: 2026-06-30

### Added

- `PROJECT_CONTEXT.md` — AI 阅读入口，含完整仓库分析、组件清单、问题诊断、重构映射
- `ARCHITECTURE.md` — 系统架构图、数据流、技术栈与设计原则
- `ROADMAP.md` — v0.1→v0.7 版本历史 + v0.8/v1.0 路线图
- `CONTRIBUTING.md` — 开发规范、目录约定、Skill/Agent/Pipeline 开发指南
- `docs/` 目录 — 集中文档入口，收纳 playbooks、examples、命令模板
- `agents/` 目录 — Agent 定义占位

### Changed

- **目录重组**：
  - `mcp-server/` → `mcp/`（命名简化）
  - `scripts/` → `tools/`（语义更清晰）
  - `scripts/pipeline/` → `pipeline/`（提升到根目录）
  - `playbooks/` → `docs/playbooks/`（文档集中管理）
  - `Examples/` → `docs/examples/`（示例归入 docs）
  - `commands/` → `docs/`（命令模板归入 docs）
- **松散文档归位**：`GemPrompt.md`、`ProductRule.md` 移至 `docs/`，`Prompt.md` 移至 `prompts/`
- **路径引用更新**：`config/rules.yaml`、`.cursor/rules/multi-agent.mdc`、`.cursor/rules/project-overview.mdc`、`knowledge/architecture_notes.md` 同步更新旧路径
- **PowerShell 编码修复**：InputEncoding/OutputEncoding 统一为 UTF-8，解决中文文件名乱码
- `.gitignore` 更新：新增 `tmp/`、`Video/`、`text/` 排除

### Fixed

- 删除 3 个空目录：`playbooks/`、`Examples/`、`tools/`（占位但无内容）

## v0.6.2

Date: 2026-06-18

### Added

- skills/translation-qa/ — 中英翻译质量审查
- skills/workflow-optimize/ — 流水线优化
- skills/reflection/ — 内容反思与自检

### Changed

- content_reviewer +2skill(共6), workflow_orchestrator +1skill(共8)
- 最终：23 Skill | 8 Agent | 8 Phase完整闭环

---

## v0.6.1

Date: 2026-06-18

### Added

- skills/image-generator/ — Vertex AI Imagen商品图生成
- scripts/generate_images.py — Python批量调用Imagen
- Input/prompts_batch.json — 3款产品批处理Prompt

### Changed

- prompt_engineer 新增 image-generator，从Gem Image迁移至Imagen

---

## v0.6

Date: 2026-06-18

### Added

- 电商运营与质量Skill(8个)，针对hpdun.com+HPD+@hpdun3
  - seo-checklist, security-checklist, mobile-ux-checklist, content-calendar
  - ecommerce-analysis, code-review, architecture-review, debug-checklist

### Changed

- Skill总数升至19，所有Agent重新绑定

---

## v0.5.1

Date: 2026-06-18

### Added

- skills/competitor-analysis/ — 竞品分析Skill

### Changed

- workflow_orchestrator 新增 competitor-analysis 绑定和handoff路径

---

## v0.5

Date: 2026-06-18

### Added

- Skill系统初始化：skills/目录，10个核心Skill
  - product-analyzer, image-prompt-generator, catalog-generator, html-generator
  - image-quality-review, prompt-review, prompt-refactor
  - listing-review, social-copywriter, context-compress
- config/agents.yaml：6个Agent绑定对应Skill

### Changed

- config/agents.yaml：新增skills:字段
- config/agents.yaml：新增social_copywriter Agent

---

-

## v0.4

Date: 2026-06-17

### Added

- CI/CD 自动化：`.github/workflows/ci.yml`（3 个 Job：Markdown lint / 空文件检测 / YAML 校验）
- 提交前校验：`.pre-commit-config.yaml`（5 个 hook）
- 环境变量模板：`.env.example`
- 结构化术语表：`knowledge/glossary.yaml`（17 个术语，可被程序读取）
- 实际用例：`Examples/`（3 个文件：商品图 Prompt / PPTX 目录 / 完整工作流）

### Changed

- `Agents.md`：更新项目架构图、增加新的 Delegation 引用（project_onboarding / _base.md）
- `README.md`：全面更新目录结构、增加 CI/CD/配置/知识库描述

---

## v0.3

Date: 2026-06-16

### Added

- 配置系统：`config/agents.yaml`、`tasks.yaml`、`rules.yaml`（借鉴 CrewAI + SWE-agent 模式）
- AI 工具自动加载规则：`.cursor/rules/project-overview.mdc`、`ecommerce.mdc`、`coding.mdc`
- Playbook 公共结构模板：`playbooks/_base.md`
- 专项检查表：`playbooks/checklists/`（5 个文件）

### Changed

- 所有 playbook 精简重写：平均缩减 **48%-61%**（原 ~4000b → 现 1500-2100b）
- `rules/coding.md`：从 4 行扩充到 8 个章节
- `rules/debug.md`：从 5 行扩充到完整规则

### Fixed

- `prompts/feature.md`：删除首行空行

---

## v0.2

Date: 2026-06-16

### Added

- `.gitignore`：排除 ~30MB 大文件（Input/Output/.obsidian/）
- `README.md`：项目介绍（142 行）
- `prompts/gem-image.md`：原来的 Readme.md 迁移至 prompts/ 目录
- `knowledge/glossary.md`：电商 + AI 术语库（25 个术语）
- `knowledge/architecture_notes.md`：项目架构说明
- `knowledge/conventions.md`：开发约定

### Changed

- `rules/summarize.md` + `rules/summary.md`：合并去重，添加送查横幅

### Fixed

- BOM 编码问题：5 个文件移除 UTF-8 BOM 头
- 空文件：`Examples/example1.md`、`example2.md` 删除

---

## v0.1

Date: 2026-06-16

### Added

- 项目核心框架：`Agents.md`（AI 操作系统指令）
- 规则系统：`rules/`（11 个文件：架构/编码/上下文/调试/Git/输出/规划/审查/安全/摘要）
- 流程系统：`playbooks/`（5 个文件：代码审查/紧急 Bug/功能开发/项目入职/发布）
- 模板系统：`templates/`（8 个文件）
- 提示词系统：`prompts/`（3 个文件）
- 电商内容：`GemPrompt.md`、`ProductRule.md`、`Prompt.md`
---

## 兼容性说明

### v0.1 → v0.2

- `Readme.md` 已迁移至 `prompts/gem-image.md`，若有外部引用请更新路径
- 空文件 `Examples/example1.md` / `example2.md` 已删除

### v0.2 → v0.3

- Playbooks 已精简重写，公共结构移至 `playbooks/_base.md`，读取时需同时参考该文件
- `rules/summary.md` 现为 `rules/summarize.md` 的送查版，完整规则请查看 summarize.md

### v0.3 → v0.4

- 新增 `config/` 目录，包含 YAML 配置文件，可被程序读取
- 新增 `.cursor/rules/` 目录，用于支持的 AI 工具自动加载
- 新增 `.github/workflows/ci.yml`，需要 GitHub 仓库启用 Actions
