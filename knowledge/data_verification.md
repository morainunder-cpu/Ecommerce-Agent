# 数据查证流程

## Chrome 浏览器使用

### 连接启动
1. 确保 Chrome 已运行 + Codex Chrome Extension 已安装启用
2. 如连接失败，先运行 `open-chrome-window.js` 打开 Chrome 窗口
3. 使用 `browser-client.mjs` + `agent.browsers.get("extension")` 初始化

### 关键 API
- `browser.tabs.new("about:blank")` 创建标签
- `tab.goto(url)` 导航（不可直接用带 URL 的 `new()`）
- `tab.playwright.evaluate(js)` 提取页面数据
- `tab.playwright.domSnapshot()` 获取 DOM 结构（替代 `innerText`，避免超限）
- `tab.screenshot()` 截图验证
- `browser.tabs.finalize({ keep: [...] })` 清理标签

### 注意事项
- `goto()` 超时默认 10s，网络慢时需在 `js` 调用中设 `timeout_ms`
- 关闭 VPN TUN 模式可能改善本地连接
- 中国网络环境下 Google/Bing/Wikipedia 可能不稳定
- `domSnapshot()` 返回结构化文本，比 `innerText` 更可靠

## 多源交叉验证流程

1. Google 搜索获取 AI Overview 概要数据
2. Wikipedia / Grokipedia 获取官方/半官方资料
3. SEC EDGAR / 公司投资者页面确认上市公司财报
4. Macrotrends / CompaniesMarketCap 获取历史趋势
5. Revelio Labs / Owler 获取员工数参考（注意区分公开职业档案和全员数据）
6. ECDB 仅反映电商渠道数据，不代表企业总营收

## 货币处理

- 保持原币种标注（$ / € / ¥），不在文中做汇率换算
- 横向对比时标注折合美元参考值
- 报告中明确标注：上市公司数据来自 SEC Filing，私营企业为多源估计值

## 已验证数据源速查

| 品牌 | 关键来源 |
|------|---------|
| Carhartt | Wikipedia, Revelio Labs, Google AI Overview, Courier Journal |
| Engelbert Strauss | Grokipedia, Fair Wear Foundation, Market Data Forecast, Owler |
| Cintas | SEC EDGAR, Cintas Investors, Macrotrends, Yahoo Finance |
| VF Corporation | SEC EDGAR, VFC News, Stock Titan, TradingView |

## 可用技能速查

| 技能 | 用途 | 触发条件 |
|------|------|---------|
| `documents:documents` | 创建/美化 DOCX | 文档生成、格式美化 |
| `presentations:Presentations` | 创建 PPTX | 演示文稿 |
| `spreadsheets:Spreadsheets` | 读写 xlsx | 数据表分析 |
| `pdf:pdf` | PDF 生成/读取 | PDF 相关任务 |
| `chrome:control-chrome` | 控制 Chrome 搜索 | 网页查证 |
| `browser:control-in-app-browser` | 内置浏览器 | 本地预览 |
