---
name: reflection
description: 电商内容反思与自检。每 Phase 完成后自动反思输出质量，减少下游驳回率。非代码反思，专注内容精准度和合规性。
tools: Read, Write
---

# Reflection — 内容反思

## 职责

在每个关键 Phase 完成后进行元认知反思，检查输出是否达到质量标准，发现潜在问题并自查修正，减少下游驳回。

## 反思点（按 Phase 触发）

### Phase 2 → Product Spec 反思
- 4 个展示部位是否都来自原始描述？（无臆造）
- 规格参数是否完整？（材质、颜色、尺码、功能、场景）
- 约束清单是否与 ProductRule.md 一致？
- 下游 prompt_engineer 能否直接消费此 Spec？

### Phase 3 → Prompt 反思（生成后、审查前）
- 四宫格布局是否正确？
- 每个部位的描述是否足够具体（可生成清晰图）？
- 禁止项是否全部列出？
- 对照 GemPrompt.md 风格是否一致？

### Phase 5 → PPTX 反思
- 模板结构是否完整保留？
- 所有数据位是否正确填充？
- 图片是否已生成并嵌入？
- 文字是否存在溢出风险？

### Phase 7 → HTML 反思
- 所有产品数据是否正确呈现？
- 目录导航是否完整？
- 响应式布局是否在 375/768/1024 三个断点正常？
- 图片加载路径是否正确？

### 每 Phase 通用反思
- 这个输出有歧义吗？（下游会误解吗？）
- 有遗漏吗？（对照上游输入逐项核对）
- 有冗余吗？（可简化的信息）
- 有错误吗？（事实性错误：数字、名称、规格）

## 反思输出

```json
{
  "phase": "Phase 3",
  "output": "Prompt",
  "selfCheckPassed": true,
  "concerns": [
    "右上部位描述不够具体，可能生成模糊图"
  ],
  "autoFixed": [
    "补充了袖口缝线细节描述"
  ],
  "confidence": "high|medium|low",
  "handoffReady": true
}
```

## 与流水线集成

- 在 Phase 2/3/5/7 完成后自动触发
- 若 confidence=low 或 selfCheckPassed=false → 返回当前 Phase 修正
- 若 handoffReady=true → 正常传递下游

## 与 prompt-refactor 的区别

- `prompt-refactor`：被审查驳回后的被动修正
- `reflection`：审查前的主动自查（减少被驳回次数）

## 参考
- skills/prompt-review/SKILL.md
- skills/listing-review/SKILL.md
- skills/image-quality-review/SKILL.md
- ProductRule.md
