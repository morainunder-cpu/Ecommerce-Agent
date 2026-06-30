---
name: workflow-optimize
description: 监控 8 Phase 电商流水线运行效率，自动检测瓶颈、重复劳动、可并行化机会，输出优化建议。
tools: Read, Bash
---

# Workflow Optimize — 流水线优化

## 职责

分析多 Phase 流水线的运行效率，识别瓶颈并提供具体优化方案。

## 监控维度

### 1. Phase 耗时分析

| Phase | 正常耗时 | 告警阈值 | 常见瓶颈 |
|-------|---------|---------|--------|
| 1-2 竞品+产品分析 | < 2 min | > 5 min | 产品描述过长未压缩 |
| 3-4 Prompt+审查 | < 3 min | > 8 min | 多轮驳回重试 |
| 5 PPTX 生成 | < 1 min | > 3 min | 模板加载慢 |
| 5b 图片质检 | < 2 min | > 5 min | 图片文件过大 |
| 6 目录审查 | < 1 min | > 3 min | 数据量大 |
| 7 HTML 生成 | < 2 min | > 5 min | 图片未预压缩 |
| 8 运营分析 | < 3 min | > 8 min | 检查项过多 |

### 2. 重复劳动检测

- [ ] 同一 Product Spec 被重复解析超过 1 次？
- [ ] 同一 Prompt 被 review 超过 3 次？（触发人工介入）
- [ ] 同一图片被多次加载/压缩？
- [ ] PPTX 模板被重复打开？（缓存机制）

### 3. 并行化机会

- [ ] 多产品时，Phase 3-4 可否按产品并行（3 款产品 = 3 并行 Prompt 生成）
- [ ] Phase 5b（图片质检）可与 Phase 6（目录审查）并行
- [ ] Phase 8 中 SEO/Security/Mobile/Content-Calendar 四检查可并行

### 4. 上下文利用率

- [ ] 当前上下文使用率
- [ ] context-compress 是否在 3+ 产品时启用
- [ ] 中间结果是否及时清理

## 优化建议输出

```json
{
  "overallHealth": "healthy|warning|critical",
  "bottlenecks": [
    {"phase": "Phase 3-4", "issue": "多轮驳回", "count": 3, "suggestion": "检查 Product Spec 准确性"}
  ],
  "parallelization": [
    {"phases": ["Phase 5b", "Phase 6"], "canParallel": true}
  ],
  "contextUsage": {"current": "45%", "threshold": "70%", "action": "normal"},
  "quickWins": [
    "启用 context-compress 将产品描述从 800 字压缩至 100 字摘要"
  ]
}
```

## 触发时机

- 流水线启动时（Phase 1 前）→ 预检查
- 流水线结束后（Phase 8 后）→ 总结优化
- 用户手动触发：「优化流水线」

## 参考
- agents.yaml — 完整 Agent 定义
- playbooks/multi_agent_collaboration.md — Phase 步骤
- skills/context-compress/SKILL.md
