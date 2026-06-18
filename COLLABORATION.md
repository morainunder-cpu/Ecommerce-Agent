# Multi-Agent Collaboration v2.0 — Human Entry

> Human-readable overview. AI agents: use `.cursor/rules/multi-agent.mdc` instead.

---

## Pipeline Overview

```
User Request
    |
    v
[workflow_orchestrator] — competitor analysis + pipeline control (8 skills)
    |
    v
[product_analyst] — structured product requirements (1 skill)
    |
    v
[prompt_engineer] — Prompt + Imagen image generation (3 skills)
    |
    v
[content_reviewer] — review + reflection + translation QA (6 skills)
    |
    v
[catalog_generator] — PPTX catalog (1 skill)
    |
    v
[html_catalog_generator] — HTML catalog + mobile UX (2 skills)
    |
    v
[workflow_orchestrator] — operations analysis + delivery
    |
    v
[social_copywriter] — Facebook/TikTok copy (2 skills, optional)
```

## Agent Cards

| Agent | Role | Skills |
|-------|------|--------|
| workflow_orchestrator | 工作流编排者 | 8 (context-compress, competitor-analysis, architecture-review, debug-checklist, ecommerce-analysis, seo-checklist, security-checklist, workflow-optimize) |
| product_analyst | 产品分析师 | 1 (product-analyzer) |
| prompt_engineer | 资深电商AI提示词工程师 | 3 (image-prompt-generator, prompt-refactor, image-generator) |
| content_reviewer | 内容审查与反思员 | 6 (prompt-review, image-quality-review, listing-review, code-review, translation-qa, reflection) |
| catalog_generator | 商品目录生成器 | 1 (catalog-generator) |
| html_catalog_generator | HTML目录生成器 | 2 (html-generator, mobile-ux-checklist) |
| social_copywriter | 社交媒体文案与内容运营 | 2 (social-copywriter, content-calendar) |

## Quick Start

1. Open `playbooks/multi_agent_collaboration.md`
2. Follow Phase 1-10
3. Use `templates/agent_handoff.md` for handoffs

## Reference

- `config/agents.yaml` — full role definitions
- `config/pipeline.yaml` — machine-readable pipeline (v2.0)
- `skills/` — 23 SKILL.md definitions
- `CHANGELOG.md` — version history
