# Multi-Agent Collaboration v2.0 — Human Entry

> Human-readable overview. AI agents: use `.cursor/rules/multi-agent.mdc` instead.

---

## Pipeline Overview (10 Phases)

```
User Request: "analyze this product and generate catalog"
    │
    ▼
Phase 1-2: [workflow_orchestrator] → competitor-analysis → [product_analyst] → Product Spec
    │
    ▼
Phase 3-4: [prompt_engineer] → image-prompt-generator → prompt-review / prompt-refactor → Final Prompt
    │
    ▼
Phase 5-6: [prompt_engineer] → image-generator (Imagen) → image-quality-review → Product PNG
    │
    ▼
Phase 7-8: [catalog_generator] → catalog-generator → listing-review + code-review → PPTX Catalog
    │
    ▼
Phase 9-10: [html_catalog_generator] → html-generator + mobile-ux-checklist → HTML + ops analysis → Delivery
    │
    ▼
Optional: [social_copywriter] → social-copywriter + content-calendar → Facebook/TikTok copy
```

---

## 8 Agents

| # | Agent | Role | Skills | Phase |
|---|-------|------|--------|-------|
| 1 | workflow_orchestrator | 工作流编排 (Pipeline Master) | 8: context-compress, competitor-analysis, architecture-review, debug-checklist, ecommerce-analysis, seo-checklist, security-checklist, workflow-optimize | 1, 10 |
| 2 | product_analyst | 产品分析 | 1: product-analyzer | 2 |
| 3 | prompt_engineer | 资深电商AI提示词工程师 | 3: image-prompt-generator, prompt-refactor, image-generator | 3-5 |
| 4 | content_reviewer | 内容审查 + 反思 | 6: prompt-review, image-quality-review, listing-review, code-review, translation-qa, reflection | 4, 6, 8 |
| 5 | catalog_generator | 商品目录生成 | 1: catalog-generator | 7 |
| 6 | html_catalog_generator | HTML + 移动端 | 2: html-generator, mobile-ux-checklist | 9 |
| 7 | social_copywriter | 社交媒体文案 | 2: social-copywriter, content-calendar | 10 |
| 8 | (MCP Server) | Community MCP tools | 5 tools: generate_product_image, generate_product_catalog, analyze_product_market, create_social_content, review_ecommerce_content | — |

---

## 23 Skills (5 Categories)

| Category | Count | Skills |
|----------|-------|--------|
| **Production** | 5 | product-analyzer, image-prompt-generator, image-generator, catalog-generator, html-generator |
| **Review** | 7 | prompt-review, prompt-refactor, image-quality-review, listing-review, code-review, translation-qa, reflection |
| **Operations** | 8 | competitor-analysis, ecommerce-analysis, seo-checklist, security-checklist, mobile-ux-checklist, content-calendar, architecture-review, debug-checklist |
| **Orchestration** | 2 | context-compress, workflow-optimize |
| **Social** | 1 | social-copywriter |

---

## Platforms

| Platform | Account | Integration Script | Skills |
|----------|---------|-------------------|--------|
| Shopify | [hpdun.com](https://hpdun.com) | `scripts/integrations/shopify.js` | seo-checklist, security-checklist, mobile-ux-checklist |
| Facebook | HPD | `scripts/integrations/facebook.js` | social-copywriter, content-calendar |
| TikTok | @hpdun3 | `scripts/integrations/tiktok.js` | social-copywriter, image-quality-review |

---

## Quick Start

### Production Pipeline

```bash
# 1. Mock image generation (no Vertex AI needed)
node scripts/generate_images_mock.js --batch Input/prompts_batch.json

# 2. Run full pipeline
node scripts/pipeline/runner.js

# 3. Preview HTML catalog
cd catalog && node server.js
```

### MCP Server (Community Distribution)

```bash
cd mcp-server
node index.js --self-test
# Expected: "23 skills loaded, 5 tools"

# In Claude Desktop / Cursor / Codex config:
# { "mcpServers": { "ecommerce-agent": { "command": "npx", "args": ["ecommerce-agent-mcp"] } } }
```

### API Integration

```bash
# Shopify: upload product
node scripts/integrations/shopify.js --product Input/product.json

# Facebook: post content
node scripts/integrations/facebook.js --post "New product!" --image "url"

# TikTok: publish caption
node scripts/integrations/tiktok.js --post-caption "Check our new catalog"
```

### Docker

```bash
# Start MCP server
docker compose up mcp-server -d

# Start catalog
docker compose up catalog -d

# Run mock image generation
docker compose --profile pipeline run --rm mock-images

# Run full pipeline
docker compose --profile pipeline run --rm pipeline
```

### Tests

```bash
node tests/test_skills.js      # 23 skills validation
node tests/test_pipeline.js    # Pipeline config validation  
node tests/test_mcp_server.js  # MCP server smoke test (spawn + JSON-RPC)
```

---

## Reference

| Document | Purpose |
|----------|---------|
| `AGENTS.md` | AI Development OS (entry point) |
| `playbooks/multi_agent_collaboration.md` | Full multi-agent execution guide |
| `config/agents.yaml` | Agent + skill bindings |
| `config/pipeline.yaml` | 10-phase pipeline definition (v2.0) |
| `skills/` | 23 SKILL.md definitions |
| `skills-index.json` | Machine-readable skill index |
| `mcp-server/README.md` | Community MCP server usage |
| `CHANGELOG.md` | v0.1 → v0.6.2 history |