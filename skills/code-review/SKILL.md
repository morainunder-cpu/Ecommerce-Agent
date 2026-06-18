---
name: code-review
description: 审查 catalog/ 目录下的 HTML/JS/server.js 代码质量。检查编码规范、安全漏洞、性能问题、可维护性。用于 catalog 更新后的代码审查。
tools: Read, Bash
---

# Code Review — catalog 代码审查

## 职责

对 catalog/ 目录的代码进行系统审查，确保代码质量符合 rules/coding.md 规范。

## 审查范围

- catalog/index.html — HTML 商品目录
- catalog/server.js — 本地预览服务
- catalog/文案脚本生成器.html — 脚本生成工具
- 所有新增/修改的 HTML/JS 文件

## 审查维度

### 1. 规范合规（对照 rules/coding.md）
- [ ] HTML 语义化标签（非全 div）
- [ ] CSS 写入 style 或独立文件（非行内样式）
- [ ] 2 空格缩进
- [ ] kebab-case 命名
- [ ] JS: const/let（无 var）
- [ ] JS: 单引号字符串
- [ ] JS: async/await（非裸 Promise）
- [ ] UTF-8 编码

### 2. 安全审查
- [ ] server.js 无目录遍历漏洞
- [ ] 无 eval() 或 innerHTML 直接插入用户内容
- [ ] 无硬编码密钥
- [ ] 静态文件服务范围受限（仅 catalog/）

### 3. 性能检查
- [ ] 图片懒加载
- [ ] 无阻塞渲染的同步 JS
- [ ] CSS 在 head 中
- [ ] JS 使用 defer 或 async
- [ ] 无未使用的 CSS/JS

### 4. 可维护性
- [ ] 无重复代码块
- [ ] 无死代码/注释掉的代码
- [ ] 变量/函数命名清晰
- [ ] 复杂逻辑有注释

### 5. 兼容性
- [ ] 支持主流浏览器（Chrome, Safari, Firefox）
- [ ] 响应式布局不破坏
- [ ] server.js 跨平台运行（Windows/Linux）

## 输出

```json
{
  "verdict": "pass|needs-fix|reject",
  "complianceScore": 85,
  "findings": [
    {"category": "coding_standard", "severity": "minor", "location": "index.html:42", "issue": "使用了行内样式", "fix": "提取到 <style> 块"}
  ],
  "summary": {"totalIssues": 3, "critical": 0, "major": 1, "minor": 2}
}
```

## 参考
- rules/coding.md — 编码规范
- catalog/index.html
- catalog/server.js
