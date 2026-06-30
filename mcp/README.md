# ecommerce-agent-mcp v0.6.2

Community MCP Server for ecommerce content generation. Zero dependencies, JSON-RPC 2.0 over stdio.

```
舒特工贸 (Xinjiang Shute Industry & Trade)
Product → AI Prompt → Image (Imagen) → Catalog (PPTX/HTML) → Social Media → Shopify
```

---

## Platforms served

| Platform | Account |
|----------|---------|
| Shopify | [hpdun.com](https://hpdun.com) |
| TikTok | @hpdun3 |
| Facebook | HPD |

---

## Install

### Claude Desktop / Cursor / Codex

```json
{
  "mcpServers": {
    "ecommerce-agent": {
      "command": "npx",
      "args": ["ecommerce-agent-mcp"]
    }
  }
}
```

### npm global

```bash
npm install -g ecommerce-agent-mcp
ecommerce-agent-mcp --self-test
```

### From source

```bash
git clone <repo>
cd ecommerce-agent/mcp-server
npm install
npm test
```

---

## 5 Community Tools

| Tool | Description | Use Case |
|------|-------------|----------|
| `generate_product_image` | Product → Prompt → Imagen PNG | Phase 2-5 pipeline |
| `generate_product_catalog` | Product list → PPTX/HTML catalog | Phase 7-9 pipeline |
| `analyze_product_market` | Competitor + SEO + operations analysis | Market positioning |
| `create_social_content` | Product → Facebook/TikTok copy + calendar | Social marketing |
| `review_ecommerce_content` | Review prompt/image/catalog/code/translation | Quality assurance |

---

## 23 Built-in Skills

5 categories: Production (5), Review (7), Operations (8), Orchestration (2), Social (1)

Full list: `skills/` directory. Machine-readable: `skills-index.json`

---

## Requirements

| Tool | Dependency |
|------|-----------|
| generate_product_image | Vertex AI Imagen (`gcloud auth`, `GOOGLE_CLOUD_PROJECT`) |
| generate_product_catalog | `python-pptx` (for PPTX fill) |
| Others | None (JSON output, consumer-side execution) |

---

## Architecture

```
ecommerce-agent-mcp/
├── index.js               # MCP server entry (JSON-RPC stdio)
├── package.json            # npm package definition
├── README.md               # This file
├── LICENSE                 # MIT
├── skills/                 # 23 skill definitions (SKILL.md each)
└── skills-index.json       # Machine-readable index
```

## License

MIT — see LICENSE file
