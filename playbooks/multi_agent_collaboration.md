# Multi-Agent Collaboration Playbook v2.0

> 基础结构见 `playbooks/_base.md`
> Skill 体系见 `skills/` (23 skills)

---

# Collaboration Model

本流程采用**流水线协作模型**，共 8 个 Agent、22 个 Skill、10 个 Stage。

```
workflow_orchestrator (8 skills)
    │
    ├── Phase 1: competitor-analysis → 竞品报告
    │
    v
product_analyst (1 skill)
    │
    ├── Phase 2: product-analyzer → Product Spec
    │
    v
prompt_engineer (3 skills)
    │
    ├── Phase 3: image-prompt-generator → Prompt
    ├── Phase 5: image-generator → 商品图 PNG (Imagen)
    └── Phase 3-reject: prompt-refactor → 修正Prompt
    │
    v
content_reviewer (6 skills)
    │
    ├── Phase 4: prompt-review + reflection → 审查Prompt
    ├── Phase 6: image-quality-review → 图片质检
    ├── Phase 8: listing-review + code-review → 目录审查
    ├── Phase 4-reject: 驳回 → prompt_engineer (max 3次)
    └── 随时: translation-qa (英文内容审查)
    │
    v
catalog_generator (1 skill)
    │
    ├── Phase 7: catalog-generator → PPTX目录
    │
    v
html_catalog_generator (2 skills)
    │
    ├── Phase 9: html-generator + mobile-ux-checklist → HTML目录
    │
    v
workflow_orchestrator
    │
    ├── Phase 10: ecommerce-analysis + seo-checklist + security-checklist + architecture-review
    │
    v
social_copywriter (2 skills) [按需激活]
    │
    ├── social-copywriter → Facebook/TikTok文案
    └── content-calendar → 内容排期
```

---

# Agent Roles v2.0

| Agent | Skills | Phase |
|-------|--------|-------|
| workflow_orchestrator | context-compress, competitor-analysis, architecture-review, debug-checklist, ecommerce-analysis, seo-checklist, security-checklist, workflow-optimize | 1, 10 |
| product_analyst | product-analyzer | 2 |
| prompt_engineer | image-prompt-generator, prompt-refactor, image-generator | 3, 5 |
| content_reviewer | prompt-review, image-quality-review, listing-review, code-review, translation-qa, reflection | 4, 6, 8 |
| catalog_generator | catalog-generator | 7 |
| html_catalog_generator | html-generator, mobile-ux-checklist | 9 |
| social_copywriter | social-copywriter, content-calendar | 按需 |

---

## Phase 1 — 启动与竞品分析

### 操作
1. workflow_orchestrator 接收用户需求
2. 如有竞品信息 → 运行 competitor-analysis
3. 多产品 (>3) → 启用 context-compress 批次拆分
4. 竞品报告传递给 product_analyst

---

## Phase 2 — 产品分析

### 操作
1. product_analyst 接收竞品报告 + 产品描述
2. 运行 product-analyzer → 提取结构化 Product Spec
3. reflection 自查：4个展示部位是否来自描述？

---

## Phase 3 — Prompt 生成

### 操作
1. prompt_engineer 接收 Product Spec
2. 运行 image-prompt-generator → 生成四宫格 Prompt
3. reflection 自查：格式完整？禁止项齐全？

---

## Phase 4 — Prompt 审查

### 操作
1. content_reviewer 接收 Prompt
2. 运行 prompt-review → 逐项检查合规性
3. 通过 → Phase 5
4. 驳回 → prompt_engineer 运行 prompt-refactor 修正 (max 3次)

---

## Phase 5 — 图片生成

### 操作
1. prompt_engineer 接收审查通过的 Prompt
2. 运行 image-generator → 调用 Vertex AI Imagen
3. 图片输出到 Output/{product}_四宫格.png

---

## Phase 6 — 图片质检

### 操作
1. content_reviewer 接收生成的 PNG
2. 运行 image-quality-review → 检查分辨率/构图/光线/一致性
3. 通过 → Phase 7
4. 修正 → 返回 Phase 5 重新生成

---

## Phase 7 — PPTX 目录生成

### 操作
1. catalog_generator 接收 Prompt + 商品图
2. 运行 catalog-generator → 填充 Input/图册模板.pptx
3. 输出 PPTX 到 Output/

---

## Phase 8 — 目录审查

### 操作
1. content_reviewer 接收 PPTX
2. 运行 listing-review → 信息完整性检查
3. 运行 code-review → 代码质量检查 (如涉及HTML)
4. 退回修改 max 3次

---

## Phase 9 — HTML 目录生成

### 操作
1. html_catalog_generator 接收 PPTX 数据 + 商品图
2. 运行 html-generator → 构建HTML目录
3. 运行 mobile-ux-checklist → 移动端适配检查
4. 预览：cd catalog && node server.js

---

## Phase 10 — 运营分析与交付

### 操作
1. workflow_orchestrator 汇总所有交付物
2. 运行 ecommerce-analysis → 运营分析
3. 运行 seo-checklist → Shopify SEO审计
4. 运行 security-checklist → 安全检查
5. 运行 architecture-review → 架构一致性
6. 运行 workflow-optimize → 流水线优化建议
7. 输出最终报告，清理临时文件

---

# 成功标准

- [ ] 所有 Phase 按顺序完成
- [ ] 每次交接经 reflection 自检
- [ ] Prompt 驳回 <= 3 次
- [ ] 商品图 4K/463:278
- [ ] PPTX + HTML 审查通过
- [ ] 运营分析报告完整
- [ ] 临时文件已清理
