# ROADMAP — Ecommerce-Agent 开发计划

> **当前版本**：v0.6.2 | **最后更新**：2026-06-30

---

## 已完成 (v0.1 → v0.6.2)

| 版本 | 日期 | 里程碑 |
|------|------|--------|
| v0.1 | — | 项目初始化，基础架构 |
| v0.2 | — | 核心 Skill：product-analyzer, image-prompt-generator |
| v0.3 | — | 审查 Skill：prompt-review, prompt-refactor |
| v0.4 | — | Imagen 集成：image-generator, generate_images.py |
| v0.5 | — | 目录生成：catalog-generator, html-generator |
| v0.6.0 | 2026-06 | 审查闭环：image-quality-review, listing-review, code-review |
| v0.6.1 | 2026-06-18 | image-generator Skill + Python 批量脚本 |
| v0.6.2 | 2026-06-18 | translation-qa, workflow-optimize, reflection（23 Skill / 8 Agent） |

---

## 近期计划 (v0.7)

- [ ] 仓库结构重构（docs/ 集中文档、目录清理）
- [ ] 消除 skills/ 重复副本（mcp-server/skills/ → skills/ 统一）
- [ ] 完善 tests/ 测试覆盖
- [ ] 修复中文文件名编码问题
- [ ] CI/CD 流水线验证

---

## 中期计划 (v0.8)

- [ ] 多语言支持扩展（英语、日语）
- [ ] 视频内容生成（TikTok 短视频脚本 → 视频）
- [ ] A/B 测试框架（Prompt 变体比较）
- [ ] 性能监控与流水线耗时统计
- [ ] MCP Server 发布到 npm registry

---

## 远期愿景 (v1.0)

- [ ] 全自动电商内容工厂（零人工介入）
- [ ] 多店铺管理（支持多个 Shopify 店铺）
- [ ] 实时市场趋势感知（竞品监控自动化）
- [ ] 内容效果追踪（社媒互动数据回传）
- [ ] Web Dashboard（可视化流水线管理）

---

*本文档随版本迭代持续更新。*
