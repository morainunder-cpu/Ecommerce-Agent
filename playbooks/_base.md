# Playbook Base Structure

> 所有 playbook 共享此基础结构。各个 playbook 文件只包含其特有的 Phase 内容和检查表引用。

---

## 通用指导原则

所有 Playbook 遵循 AGENTS.md 定义的 Core Principles：

- **先理解，后修改**
- **先规划，后实施**
- **先验证，后结论**
- **保留现有行为**，除非明确要求修改
- **不确定时提问**，不要猜测

各 Playbook 特有的原则见各自文件。

---

## 标准 Phase 结构

每个 Phase 按以下三部分组织：

`
## Phase N — 阶段名称

### 目标
一句话描述本阶段的目的。

### 操作
- 具体操作步骤清单

### 产出
- 预期交付物清单
`

---

## 通用停止条件

出现以下任一情况时**立即停止并报告**：

1. 相同的错误连续出现 **3 次**
2. 输出开始重复
3. 工具调用参数完全相同的重复调用
4. 上下文体积过大
5. Token 消耗异常
6. 建议的修改越来越偏离原始问题

---

## 通用成功标准

任务完成前必须确认：

- [ ] 需求已满足
- [ ] 风险已记录
- [ ] 验证已完成
- [ ] 不存在无关修改
- [ ] 结果可被他人理解和维护

---

## 文件结构

`
playbooks/
  _base.md                ← 本文（公共结构）
  checklists/             ← 各场景的专项检查表
    code-review.md
    bugfix.md
    feature.md
    onboarding.md
    release.md
  code_review.md          ← 代码审查流程（仅 Phase 内容 + 检查表引用）
  emergency_bugfix.md     ← 紧急 Bug 修复流程（仅 Phase 内容）
  full_feature.md         ← 功能开发流程（仅 Phase 内容）
  project_onboarding.md   ← 项目入职流程（仅 Phase 内容）
  release_process.md      ← 发布流程（仅 Phase 内容）
`
