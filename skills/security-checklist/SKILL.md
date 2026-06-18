---
name: security-checklist
description: Shopify 店铺 hpdun.com + catalog/server.js 安全检查清单。覆盖认证、数据保护、文件权限、敏感信息泄露、支付安全。
tools: Read, Bash
---

# Security Checklist — 安全审查

## 职责

对 Shopify 店铺和本地 catalog 服务进行安全审查，防止数据泄露和攻击。

## 覆盖范围

- hpdun.com（Shopify 店铺）
- catalog/server.js（本地预览服务）
- 项目文件（Input/Output/ 目录）

## 检查维度

### 1. 敏感信息保护
- [ ] .env 文件中无硬编码密钥
- [ ] .env.example 不包含真实值
- [ ] .gitignore 包含 .env
- [ ] 无 API key 在代码中（grep: key, secret, token, password）
- [ ] 无 Shopify Storefront API token 泄露

### 2. 文件权限
- [ ] Input/ 目录仅含模板文件，无敏感数据
- [ ] Output/ 目录无外部可访问
- [ ] catalog/server.js 无目录遍历漏洞
- [ ] 上传功能有限制（如有）

### 3. 依赖安全
- [ ] catalog/ 下如有 package.json，依赖无已知漏洞
- [ ] 无未使用的依赖
- [ ] 第三方 CDN 链接使用 HTTPS

### 4. Shopify 店铺安全
- [ ] 店铺后台仅授权人员可访问
- [ ] 支付信息通过 Shopify Payments 处理，不自行存储
- [ ] 客户数据符合隐私政策
- [ ] SSL 证书有效

### 5. 内容安全
- [ ] catalog/index.html 无 XSS 漏洞
- [ ] 用户输入（如有搜索）经过转义
- [ ] 无 eval() 或 innerHTML 直接插入用户内容

## 输出

```json
{
  "overallRisk": "low|medium|high|critical",
  "findings": [
    {"severity": "high", "location": "catalog/server.js:12", "issue": "目录遍历可能", "fix": "添加路径校验"}
  ],
  "checkedAreas": ["env", "permissions", "dependencies", "shopify", "content"]
}
```

## 参考
- .env.example
- .gitignore
- catalog/server.js
- hpdun.com
