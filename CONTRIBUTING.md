# CONTRIBUTING — Ecommerce-Agent 开发规范

> **最后更新**：2026-06-30

---

## 快速开始

```bash
# 克隆仓库
git clone <repo-url>
cd Ecommerce-Agent

# 安装依赖
cd pipeline && npm install

# 运行流水线
node pipeline/runner.js
```

---

## 目录规范

| 目录 | 用途 | 规范 |
|------|------|------|
| `skills/` | Skill 定义 | 每个 Skill 一个目录，含 SKILL.md |
| `config/` | 配置文件 | YAML 格式，禁止硬编码 |
| `pipeline/` | 流水线引擎 | Node.js，单一入口 runner.js |
| `tools/` | 工具脚本 | Python/JS，独立可运行 |
| `docs/` | 项目文档 | Markdown，中文优先 |
| `tests/` | 测试 | 与 skills/ 一一对应 |

---

## Skill 开发规范

1. 每个 Skill 必须在 `skills/<skill-name>/SKILL.md`
2. SKILL.md 必须包含：名称、目标、输入、输出、约束条件
3. 新增 Skill 后更新 `skills-index.json` 和 `config/rules.yaml`

---

## Agent 开发规范

1. Agent 定义在 `config/agents.yaml`
2. 每个 Agent 必须声明：role, goal, backstory, skills
3. Agent 间通过 `handoff_to` / `receives_from` 声明协作关系

---

## 流水线规范

1. 流水线拓扑在 `config/pipeline.yaml`
2. 每个阶段必须声明：id, name, agent, input, output, skills
3. 驳回逻辑通过 `on_reject` 配置（max_retries ≤ 3）

---

## 提交规范

- 分支命名：`codex/<feature-name>`
- 提交信息：[中文] 动词 + 对象（如 "添加 image-generator Skill"）
- PR 前运行 `npm test`（如有）

---

## 编码规范

- Python：PEP 8
- JavaScript：ESLint (config 待添加)
- YAML：2 空格缩进
- Markdown：中文文档用中文标点

---

## 环境变量

参见 `.env.example`。必需变量：
- `GOOGLE_APPLICATION_CREDENTIALS` — Vertex AI 认证
- `SHOPIFY_STORE_URL` — Shopify 店铺地址

---

*本文档由 Codex AI Agent 维护。*
