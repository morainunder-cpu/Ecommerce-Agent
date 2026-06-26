# 报告生成流程

## MD → DOCX 转换

使用 python-docx（bundled Python）将 Markdown 报告转为 DOCX。

### 前置条件
- Bundled Python: `C:\Users\Lenovo\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe`
- python-docx 已在 bundled Python 中可用
- 调用 python 脚本时使用 `cmd /c` 包裹，避免 PowerShell 转义问题

### 可用设计预设（来自 documents skill）

| 预设 | 适用场景 |
|------|---------|
| `google_docs_default` | 导入 Google Docs，原生 Arial 风格，无装饰 |
| `standard_business_brief` | 正式报告、决策备忘录、RFI 回复 |
| `compact_reference_guide` | 指南、清单、操作手册 |
| `narrative_proposal` | 提案、申请书，长文排版 |

### standard_business_brief 参数（推荐用于调研报告）

| 属性 | 值 |
|------|-----|
| 字体 | Calibri（中文 Microsoft YaHei） |
| 正文字号 | 11pt，行间距 1.10，段后 6pt |
| H1 | 16pt，#2E74B5，段前 16pt，段后 8pt |
| H2 | 13pt，#2E74B5，段前 12pt，段后 6pt |
| H3 | 12pt，#1F4D78，段前 8pt，段后 4pt |
| 表格 | 9360 DXA 宽，120 DXA 缩进，表头灰底 #F2F4F7 |
| 列表 | 标记 0.25in，文字 0.5in，悬挂 0.25in |
| 页边距 | 四边 1.0 英寸 |

### 目录限制
- `internal_nav.py` 生成的静态导航在部分 Word 版本中不稳定
- 如需可点击目录，用户可在 Word 中手动操作：引用 → 目录 → 自动目录
- 不建议在 headless 生成流程中依赖自动目录

### 注意事项
- Node REPL 用 `String.raw` 编写 Python 脚本，避免反斜杠转义问题
- 用 `cmd /c` 执行 Python 脚本，PowerShell 的 `&` 操作符会错误解析路径中的单引号
- 中文需同时设置 `run.font.name` 和 `w:eastAsia` 字体
- LibreOffice 未安装时无法做渲染验证，接受纯结构检查

## MD → HTML → PDF 尝试

- Chrome 浏览器可连接（需开启 Chrome 窗口，扩展已安装）
- `file://` URL 被 Chrome 安全策略拦截
- 需启动本地 HTTP 服务器（Node http 模块，端口 8888+）
- CDP `Page.printToPDF` 在 Chrome 和 in-app 浏览器中均不可用
- 推荐方案：直接生成 DOCX，不经过 HTML/PDF 中转
