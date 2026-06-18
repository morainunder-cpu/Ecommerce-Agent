---
name: mobile-ux-checklist
description: Shopify 店铺 hpdun.com + catalog HTML 在移动端的用户体验检查清单。覆盖响应式布局、触控交互、加载速度、可读性。
tools: Read, Bash
---

# Mobile UX Checklist — 移动端体验检查

## 职责

确保 hpdun.com 和商品目录 HTML 在移动端（iOS/Android）提供流畅的购物体验。

## 覆盖范围

- hpdun.com Shopify 店铺（移动端浏览）
- catalog/index.html（移动端预览）
- Facebook HPD + TikTok @hpdun3 落地页体验

## 检查维度

### 1. 响应式布局
- [ ] 视口 < 375px 时内容不溢出
- [ ] 视口 375-768px 时布局合理
- [ ] 导航菜单可折叠（汉堡菜单）
- [ ] 图片自动缩放，不超出屏幕
- [ ] 表格（如有）不下拉破坏布局

### 2. 触控交互
- [ ] 按钮最小 44x44px（符合 iOS HIG）
- [ ] 链接间距足够，不错点
- [ ] 滑动轮播流畅
- [ ] 表单输入框足够大
- [ ] 无 hover 依赖的交互（移动端无 hover）

### 3. 可读性
- [ ] 正文字号 ≥ 16px
- [ ] 行距 ≥ 1.5
- [ ] 对比度足够（WCAG AA）
- [ ] 文本不因视口缩小而截断

### 4. 加载体验
- [ ] 首屏加载 < 3s（3G 网络）
- [ ] 图片懒加载
- [ ] 无阻塞渲染的 JS
- [ ] 字体加载期间有 fallback

### 5. 购物体验
- [ ] 产品图可放大查看细节
- [ ] 「加入购物车」按钮始终可见（sticky）
- [ ] 产品变体（颜色/尺码）选择器触控友好
- [ ] 结账流程简洁（Shopify 原生结账）

## 输出

```json
{
  "overallScore": 88,
  "criticalIssues": [],
  "improvements": [
    {"page": "产品页", "issue": "变体选择器过小", "fix": "增大至 44px 高度"}
  ]
}
```

## 参考
- hpdun.com（移动端）
- catalog/index.html
- rules/coding.md — HTML/CSS 规范
