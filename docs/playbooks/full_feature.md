# Full Feature Development Playbook

> 基础结构见 `_base.md`，检查表见 `checklists/feature.md`

---

## Phase 1 — Requirement Analysis

### 目标
完全理解需求后再修改。

### 操作
1. 重述需求
2. 识别：业务目标/约束/假设/未知信息
3. 确认范围

---

## Phase 2 — Project Inspection

### 操作
- 目录结构/相关模块/现有 API/配置文件/依赖/测试

---

## Phase 3 — Planning

### 操作
1. 定义：实施步骤/修改文件/新建文件/风险/验证策略
2. 原则：最小范围/复用现有组件/避免无关重构
3. 大变更需用户确认

---

## Phase 4 — Risk Analysis

- [ ] 向后兼容
- [ ] 性能影响
- [ ] 安全影响
- [ ] 配置影响
- [ ] API 兼容

风险高 → 停止并请求确认

---

## Phase 5 — Implementation

### 原则
- 小改动/小提交/清晰命名/一致风格/最小复杂度
- 禁止：重写无关代码/推测性优化/修改无关文件

---

## Phase 6 — Self Review

- [ ] 正确性？可读性？可维护性？一致性？
- [ ] 无回归？无死代码？无重复逻辑？
- [ ] 无调试代码残留？

---

## Phase 7 — Verification

- [ ] 功能正常  已有功能无回归
- [ ] 边界情况已处理  错误处理已验证
- [ ] 构建成功  测试通过

---

## Phase 8 — Final Report

**Summary**：实现内容
**Files Changed**：文件清单
**Key Decisions**：重要决策
**Risks**：已知限制
**Verification**：验证步骤
**Next Steps**：后续建议
