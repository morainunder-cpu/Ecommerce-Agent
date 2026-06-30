---
name: debug-checklist
description: 电商流水线故障排查清单。覆盖 Prompt 生成失败、PPTX 填充错误、HTML 布局偏移、Shopify 同步问题、社媒发布失败的排查步骤。
tools: Read, Bash
---

# Debug Checklist — 故障排查

## 职责

当流水线任何阶段出现故障时，按场景快速定位问题并提供修复方案。

## 故障场景 → 排查步骤

### 场景 1：Prompt 被 review 连续驳回 3 次

1. [ ] 检查原始 Product Spec 展示部位是否准确
2. [ ] 检查 ProductRule.md 约束是否被正确读取
3. [ ] 对比 GemPrompt.md 示例格式
4. [ ] 确认驳回原因是否聚焦（非多条无关问题）
5. [ ] 如 prompt-refactor 反复失败 → 可能是 Product Spec 本身有问题，回溯 product-analyzer

### 场景 2：PPTX 生成失败或布局错乱

1. [ ] 确认 Input/图册模板.pptx 存在且未被损坏
2. [ ] 检查模板中占位符名称与填充数据字段名匹配
3. [ ] 检查 python-pptx 库可用
4. [ ] 验证 PPTX 不是只读或被其他程序占用
5. [ ] 检查 Output/ 目录存在且有写入权限

### 场景 3：HTML 目录图片加载失败（404）

1. [ ] 确认图片路径正确（绝对路径 vs 相对路径）
2. [ ] 检查 catalog/server.js 静态文件服务配置
3. [ ] 确认图片文件实际存在于 Output/ 或 catalog/ 目录
4. [ ] 检查 server.js 是否在正确目录启动
5. [ ] 防火墙/端口是否被占用

### 场景 4：HTML 布局在移动端异常

1. [ ] 检查 viewport meta 标签：<meta name="viewport" content="width=device-width, initial-scale=1">
2. [ ] 检查 CSS 媒体查询断点是否合理（375/768/1024）
3. [ ] 确认图片有 max-width: 100%
4. [ ] 检查 flexbox/grid 布局是否在小屏正确换行
5. [ ] 运行 mobile-ux-checklist 全面审计

### 场景 5：Shopify 产品数据不同步

1. [ ] 检查 Product Spec 与 Shopify 产品页数据是否一致
2. [ ] 确认 Shopify 产品 CSV 导入格式正确
3. [ ] 检查图片 URL 是否可访问
4. [ ] 确认类目/标签设置正确
5. [ ] 运行 seo-checklist 验证

### 场景 6：社媒内容无人互动

1. [ ] 检查发布时间（是否在目标客群活跃时段）
2. [ ] 检查内容类型多样性（是否全是产品帖）
3. [ ] 对比竞品互动率（运行 competitor-analysis）
4. [ ] 确认文案有行动号召
5. [ ] 检查图片/视频质量（运行 image-quality-review）

### 场景 7：上下文溢出（批量处理中断）

1. [ ] 确认 context-compress 已启用
2. [ ] 检查当前批次产品数量（> 3 个应拆分）
3. [ ] 检查中间结果是否已清理
4. [ ] 重新启动流水线，使用增量模式

## 通用排查流程

```
1. 确认故障发生在哪个 Phase
2. 对照上方对应场景排查
3. 逐项排除，记录每步结果
4. 定位根因后修复
5. 从断点恢复流水线（不要从头开始）
```

## 输出

```json
{
  "phase": "Phase 5",
  "symptom": "PPTX 生成失败",
  "rootCause": "模板文件被 PowerPoint 占用",
  "fix": "关闭 PowerPoint → 重试 catalog-generator",
  "canResume": true
}
```

## 参考
- playbooks/multi_agent_collaboration.md
- skills/ 下所有 SKILL.md
- catalog/server.js
