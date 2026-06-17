# Multi-Agent Collaboration Playbook

> 基础结构见 `playbooks/_base.md`

---

# Collaboration Model

本流程采用**流水线协作模型**：每个 Agent 完成自己的工作后，将结果传递给下一个 Agent。

```
workflow_orchestrator
    |
    v
product_analyst → 提取产品需求
    |
    v
prompt_engineer → 生成Gem Image Prompt
    |
    v
content_reviewer → 审查质量与合规性
    |
    v
catalog_generator → 生成PPTX目录
    |
    v
html_catalog_generator → 生成HTML目录
    |
    v
workflow_orchestrator → 完成交付
```

---

# Agent Roles

| Agent | 职责 | 输入 | 输出 |
|-------|------|------|------|
| workflow_orchestrator | 启动、监控、完结流水线 | 用户需求 | 最终交付物 |
| product_analyst | 提取结构化需求 | 产品描述 | Product Spec |
| prompt_engineer | 生成Gem Image Prompt | Product Spec | 中文Prompt |
| content_reviewer | 审查质量和合规性 | Prompt / PPTX | 审查结果（通过/驳回） |
| catalog_generator | 生成PPTX目录 | 审查通过的Prompt | PPTX文件 |
| html_catalog_generator | 生成HTML目录 | PPTX数据 | HTML页面 |

---

## Phase 1 — 启动

### 操作
1. workflow_orchestrator 接收用户需求
2. 确定需要哪些 Agent 参与
3. 启动流水线

---

## Phase 2 — 产品分析

### 操作
1. product_analyst 读取产品描述
2. 提取：产品名称、展示部位、规格参数、约束条件
3. 输出 Product Spec

---

## Phase 3 — Prompt 生成

### 操作
1. prompt_engineer 接收 Product Spec
2. 遵循 ProductRule.md + Prompt.md 生成 Prompt
3. 输出中文四宫格细节图 Prompt

---

## Phase 4 — 内容审查

### 操作
1. content_reviewer 接收 Prompt
2. 按以下标准审查：
   - 产品 100% 一致
   - 无违规元素
   - 比例、画质、风格符合规格
3. 通过 → 传递给 catalog_generator
4. 驳回 → 返回 prompt_engineer 修改

---

## Phase 5 — 目录生成

### 操作
1. catalog_generator 接收审查通过的 Prompt
2. 加载 Input/图册模板.pptx
3. 填充产品数据和图片
4. 输出 PPTX 到 Output/

---

## Phase 6 — 二次审查

### 操作
1. content_reviewer 审查 PPTX 布局
2. 检查：布局无偏移、图片正确嵌入、文案正确填充
3. 通过 → 传递给 html_catalog_generator
4. 驳回 → 返回 catalog_generator 修改

---

## Phase 7 — HTML 目录生成

### 操作
1. html_catalog_generator 接收数据
2. 构建 HTML 商品目录
3. 启动本地预览

---

## Phase 8 — 完结

### 操作
1. workflow_orchestrator 汇总所有交付物
2. 输出最终报告
3. 清理临时文件

---

# Agent Handoff Protocol

每次交接包含以下信息：

```
Handoff:
  from: [源 Agent]
  to: [目标 Agent]
  artifacts:
    - [交付物列表]
  validation:
    - [目标 Agent 的验证标准]
  status: pending / in_progress / completed / rejected
```

驳回时：目标 Agent 应附加驳回原因，源 Agent 修改后重新提交。

---

# 成功标准

- [ ] 所有 Agent 按顺序完成工作
- [ ] 每次交接都经过验证
- [ ] 驳回次数不超过 3 次（否则触发人工介入）
- [ ] 最终交付物符合全部规格
- [ ] 临时文件已清理
