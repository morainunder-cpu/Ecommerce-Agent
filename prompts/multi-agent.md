# Multi-Agent Collaboration Prompt

## 一句话启动

```
启动多智能体协作流水线。
产品：[产品名称]
需求：[展示部位清单]
规格：[比例/画质/风格]
```

## 效果

AI 将按以下顺序执行：

1. 分析产品需求（product_analyst）
2. 生成Gem Image Prompt（prompt_engineer）
3. 审查Prompt质量（content_reviewer）
4. 通过后生成PPTX目录（catalog_generator）
5. 二次审查PPTX布局（content_reviewer）
6. 通过后生成HTML目录（html_catalog_generator）
7. 汇总交付（workflow_orchestrator）

## 参考文件

- `COLLABORATION.md` — 流水线总览
- `playbooks/multi_agent_collaboration.md` — 完整执行流程
- `config/agents.yaml` — 角色定义
- `templates/agent_handoff.md` — 交接记录模板
