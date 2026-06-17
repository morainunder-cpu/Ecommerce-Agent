# Changelog

---

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
