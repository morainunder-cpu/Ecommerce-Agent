# Emergency Bugfix Playbook

> 基础结构见 `_base.md`，检查表见 `checklists/bugfix.md`

---

# Severity Assessment

- **Critical**：生产不可用/无限循环/内存泄漏/数据损坏/安全问题
- **High**：主要功能不可用/API 故障/构建失败/部署失败
- **Medium**：功能异常但可绕行/性能退化/错误处理缺失

---

## Phase 1 — Stabilize

### 目标
防止问题恶化，优先止损。

### 操作
1. 评估影响范围
2. 执行止损（降级/回滚/限流/功能禁用）
3. 记录当前状态

---

## Phase 2 — Collect Evidence

### 目标
收集证据，不猜测。

### 操作
1. 收集：错误日志/堆栈/输入/环境/配置/变更历史
2. 确定问题首次出现时间

---

## Phase 3 — Reproduce

### 目标
稳定复现问题。

### 操作
1. 建立最小复现步骤
2. 确认复现条件
3. 若无法复现 → 标记为偶发

---

## Phase 4 — Root Cause Analysis

### 目标
找到根因而非表面现象。

### 操作
1. 提出根因假设
2. 逐一验证（日志/代码检查/实验）
3. 排除无关因素 → 确认根因

---

## Phase 5 — Solution Planning

### 目标
规划最小安全的修复方案。

### 操作
1. 设计最小修复方案
2. 评估影响和风险
3. 考虑兼容性
4. 准备回滚方案

---

## Phase 6 — Implementation

### 原则
- 最小改动，不修改无关代码
- 不引入推测性优化
- 提交前移除调试代码

---

## Phase 7 — Verification

- [ ] 原 Bug 已解决
- [ ] 已有测试通过
- [ ] 手动验证完成
- [ ] 边界情况已验证
- [ ] 性能可接受

---

## Phase 8 — Incident Report

**Summary**：问题描述
**Root Cause**：根因
**Resolution**：修复内容
**Risks**：剩余风险
**Prevention**：预防措施
**Lessons Learned**：改进点

---

# Recovery Strategy

优先：回滚 → 临时绕过 → 功能禁用 → 用户确认 → 进一步调查
