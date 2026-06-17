# Release Process Playbook

> 基础结构见 `_base.md`，检查表见 `checklists/release.md`

---

## Phase 1 — Release Planning

### 操作
1. 确认发布范围（功能/修复/配置变更）
2. 确定版本号（semver）
3. 更新 Changelog

---

## Phase 2 — Verification

### 操作
1. 确认所有功能测试通过
2. 确认无已知回归
3. 确认边界情况已处理

---

## Phase 3 — Risk Assessment

- [ ] 破坏性变更？
- [ ] 数据迁移？
- [ ] 配置变更？
- [ ] 依赖兼容？

---

## Phase 4 — Documentation Review

- [ ] Changelog 最新
- [ ] API 文档已同步
- [ ] 配置说明已更新
- [ ] 发布说明已编写

---

## Phase 5 — Compatibility Check

### 操作
1. 检查：API 向后兼容/数据格式/配置/环境依赖
2. 存在不兼容 → 标记 Breaking Change 并更新文档

---

## Phase 6 — Release Readiness

### 操作
1. 确认回滚方案已就绪
2. 确认通知已发送
3. 确认发布时间窗口
4. 最终确认：所有 Checklist 已完成

---

## Phase 7 — Release

### 操作
1. 执行发布
2. 监控：错误率/响应时间/关键指标
3. 异常时立即执行回滚

---

## Phase 8 — Post Release Review

### 操作
1. 确认发布成功
2. 记录：实际效果/问题/耗时
3. 更新文档和配置

---

# Rollback Strategy

1. 代码回滚：`git revert <release-tag>` 或回退到上个稳定 tag
2. 数据回滚：执行预准备的回滚脚本
3. 配置回滚：恢复上一版配置
4. 验证回滚：确认系统恢复正常

---

# Output Format

## Release Summary
## Included Changes
## Verification Results
## Risk Assessment
## Compatibility Notes
## Rollback Plan
## Known Limitations
## Recommended Next Steps
