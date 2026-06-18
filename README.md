# Ecommerce-Agent v0.6.2

Multi-agent e-commerce content generation pipeline for 舒特工贸.

## Platforms

| Platform | Account | Purpose |
|----------|---------|--------|
| Shopify | hpdun.com | Product storefront |
| TikTok | @hpdun3 | Short video traffic |
| Facebook | HPD | Social marketing |

## Architecture

```
skills/       — 23 skills (production/review/operations/orchestration/social)
config/       — agents.yaml, pipeline.yaml, tasks.yaml, rules.yaml
playbooks/    — multi_agent_collaboration.md (10-phase v2.0)
scripts/      — generate_images.py (Vertex AI Imagen)
catalog/      — index.html, server.js
Input/        — templates + batch prompts
Output/       — generated PPTX + PNG
```

## Quick Start

```bash
# 1. Set up environment
cp .env.example .env
# Fill in GOOGLE_CLOUD_PROJECT + Shopify/Facebook/TikTok keys

# 2. Generate product images
py scripts/generate_images.py --batch Input/prompts_batch.json

# 3. Preview catalog
cd catalog && node server.js
```

## Pipeline

10-stage pipeline: Analysis → Prompt → Image → Review → PPTX → HTML → Operations

See `playbooks/multi_agent_collaboration.md` for full workflow.
