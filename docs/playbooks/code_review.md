# Code Review Playbook

> 基础结构见 `_base.md`，检查表见 `checklists/code-review.md`

---

## Phase 1 — Understand Context

### 目标
理解代码目的后再评审，不脱离上下文孤立审查。

### 操作
- 收集：功能目标、业务需求、相关模块、现有架构、项目规范
- 不评审脱离上下文的代码

### 产出
- 上下文理解摘要

---

## Phase 2 — Inspect

### 目标
从高层到细节逐层审查。

### 操作
- 项目结构 → 模块设计 → 文件组织 → 类/函数设计 → 实现细节 → 错误处理 → 文档

---

## Phase 3 — Analysis

### 目标
从 7 个维度评估代码质量。

**Correctness**：逻辑正确？边界处理？错误处理合理？
**Readability**：命名清晰？函数聚焦？流程易跟随？
**Maintainability**：低重复？低耦合？风格一致？
**Consistency**：遵循现有架构/API/模式？
**Performance**：无多余循环/重复计算/资源浪费？
**Security**：无注入/秘密泄露/权限问题？
**Documentation**：必要处有文档？

---

## Phase 4 — Risk Assessment

### 目标
按严重度分类问题。

- **Critical**：数据丢失/安全问题/生产故障 → 立即处理
- **High**：功能失效/兼容性问题/重大维护负担 → 尽快修复
- **Medium**：降低可读性/可维护性/开发效率 → 建议修复
- **Low**：风格/文档/微小重构建议 → 可忽略

---

## Phase 5 — Recommendations

### 目标
给出具体、可操作、最小化的改进建议。

### 原则
- 偏好：小改进 → 增量重构 → 架构变更
- 不推荐不必要的重写

---

## Phase 6 — Verification

### 目标
确认审查结论可靠。

- [ ] 审查基于实际代码
- [ ] 无推测性结论
- [ ] 风险分类正确
- [ ] 建议切实可行
- [ ] 保留现有行为

---

# Review Output

## Summary
## Strengths
## Issues（按严重度分组）
## Risks
## Recommendations（按优先级排序）
## Verification Notes
## Next Steps
