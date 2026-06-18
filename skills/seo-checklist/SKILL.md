---
name: seo-checklist
description: Shopify 店铺 hpdun.com 的 SEO 优化检查清单。覆盖 meta 标签、结构化数据、URL 结构、图片优化、加载速度。用于店铺上线前或内容更新后的 SEO 审计。
tools: Read, Bash
---

# SEO Checklist — Shopify 店铺 SEO 优化

## 职责

对 hpdun.com 进行系统化 SEO 审计，确保店铺在搜索引擎中的可见性和排名。

## 平台

- 主站：hpdun.com（Shopify）
- 覆盖范围：首页、产品页、类目页、博客页

## 检查维度

### 1. Meta 标签
- [ ] 首页 title: 品牌名 + 核心品类（如「HPD 工装 — 专业工作服制造商」）
- [ ] 首页 description: 150-160 字符，含核心关键词
- [ ] 每个产品页 title: 产品名 + 品牌名
- [ ] 每个产品页 description: 独特、含产品关键词
- [ ] 类目页 title 和 description 完整

### 2. 结构化数据
- [ ] Product schema（JSON-LD）：名称、价格、图片、库存
- [ ] Organization schema：品牌名、logo、社交链接
- [ ] BreadcrumbList schema：类目层级路径
- [ ] 结构化数据通过 Google Rich Results Test 验证

### 3. URL 结构
- [ ] 产品 URL: /products/产品名-slug（不含数字 ID）
- [ ] 类目 URL: /collections/类目名
- [ ] URL 简短、可读、含关键词
- [ ] 无重复内容 URL（canonical 标签设置正确）

### 4. 图片优化
- [ ] 所有产品图有描述性 alt 文本
- [ ] 图片文件名含关键词（非 IMG_001.jpg）
- [ ] 图片压缩（WebP 格式，< 200KB）
- [ ] 图片懒加载

### 5. 加载速度
- [ ] 移动端 PageSpeed Insights > 70
- [ ] 桌面端 PageSpeed Insights > 85
- [ ] 未使用的 JS/CSS 已优化
- [ ] 字体文件已优化

### 6. 内容质量
- [ ] 产品描述 > 300 字，含关键词
- [ ] 类目页有描述性引言
- [ ] 博客有至少 3 篇关联文章
- [ ] 无重复内容

## 输出

```json
{
  "overallScore": 85,
  "sections": {
    "meta": {"score": 90, "issues": []},
    "structuredData": {"score": 70, "issues": ["缺少 Organization schema"]},
    "urls": {"score": 80, "issues": []},
    "images": {"score": 75, "issues": ["3 个产品图缺少 alt 文本"]},
    "speed": {"score": 65, "issues": ["移动端 LCP > 3s"]},
    "content": {"score": 80, "issues": []}
  },
  "priorityFixes": []
}
```

## 参考
- hpdun.com — Shopify 店铺
- catalog/ — 商品目录 HTML
