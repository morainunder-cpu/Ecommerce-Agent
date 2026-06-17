# Development Conventions

## 通用约定

- **语言**：优先使用中文编写文档和 Prompt，代码注释保持英文
- **编码格式**：全部使用 UTF-8 编码
- **行尾**：保持现有项目风格
- **文件命名**：小写 + 连字符（kebab-case），如 `architecture_notes.md`

---

## 文档约定

### Markdown 规范
- 标题使用 ATX 风格（# ## ###）
- 列表使用 `-` 而非 `*`
- 代码块标明语言
- 表格使用 GFM 格式

### AGENTS.md
- 遵循 AI Development OS 格式
- 包含 Mission、Core Principles、Workflow 等章节
- 使用箭头符号（→）表示流程

### Rules
- 每个 rule 文件聚焦单一主题
- 使用"必须/禁止/优先/避免"等明确指令词
- 保持文件在 50-100 行以内

### Playbooks
- 遵循 Phase 阶段结构
- 包含 Purpose、Guiding Principles、Workflow、Stop Conditions、Success Criteria
- 使用复选框（☐/☑）表示检查项

---

## 编码约定

- **最小改动原则**：只修改必要的代码
- **避免无关修改**：不混合功能和重构
- **风格一致**：跟随现有代码风格
- **可读性优先**：优于性能优化的简写

---

## Git 约定（推荐）

- **提交格式**：`type(scope): summary`
- **类型**：feat / fix / refactor / docs / chore
- **范围**：rules / templates / playbooks / prompts / knowledge
- **单次提交**：只解决一个问题
- **提交消息**：独立可理解

---

## 文件命名映射

| 实际文件名 | 功能 |
|-----------|------|
| `rules/architecture.md` | 架构规则 |
| `rules/coding.md` | 编码规则 |
| `rules/context.md` | 上下文管理规则 |
| `rules/debug.md` | 调试规则 |
| `rules/git.md` | Git 工作流规则 |
| `rules/output.md` | 输出格式规则 |
| `rules/planning.md` | 规划规则 |
| `rules/review.md` | 审查规则 |
| `rules/safety.md` | 安全规则 |
| `rules/summarize.md` | 摘要规则（合并后含 summary.md 内容） |
| `playbooks/code_review.md` | 代码审查流程 |
| `playbooks/emergency_bugfix.md` | 紧急 Bug 修复流程 |
| `playbooks/full_feature.md` | 功能开发流程 |
| `playbooks/project_onboarding.md` | 项目入职流程 |
| `playbooks/release_process.md` | 发布流程（待填充） |
| `templates/architecture.md` | 架构分析模板 |
| `templates/changelog.md` | 变更日志模板 |
| `templates/debug.md` | 调试分析模板 |
| `templates/feature.md` | 功能设计模板 |
| `templates/incident.md` | 事故报告模板 |
| `templates/plan.md` | 实施计划模板 |
| `templates/report.md` | 开发报告模板 |
| `templates/review.md` | 审查报告模板 |
| `prompts/bugfix.md` | Bug 修复提示词 |
| `prompts/feature.md` | 功能开发提示词 |
| `prompts/refactor.md` | 重构提示词 |
