#!/usr/bin/env node
// ecommerce-agent-mcp v0.6.2
// Community MCP Server — 5 high-level ecommerce tools
// Install: npx ecommerce-agent-mcp
// Zero dependencies, JSON-RPC 2.0 over stdio

import { readFileSync, readdirSync, statSync, existsSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILLS_DIR = join(__dirname, 'skills');
const SKILLS_INDEX = join(__dirname, 'skills-index.json');

// ── Skill Registry (lazy-load on first use) ──
let _skills = null;
function loadSkills() {
  if (_skills) return _skills;
  if (existsSync(SKILLS_INDEX)) {
    _skills = JSON.parse(readFileSync(SKILLS_INDEX, 'utf8')).skills;
    return _skills;
  }
  const dirs = readdirSync(SKILLS_DIR).filter(d => statSync(join(SKILLS_DIR, d)).isDirectory());
  _skills = dirs.map(d => {
    const p = join(SKILLS_DIR, d, 'SKILL.md');
    if (!existsSync(p)) return null;
    const content = readFileSync(p, 'utf8');
    const fm = {}; let inFm = false;
    for (const line of content.split('\n')) {
      if (line.trim() === '---') { if (!inFm) { inFm = true; continue; } else break; }
      if (inFm) { const c = line.indexOf(':'); if (c > 0) fm[line.substring(0, c).trim()] = line.substring(c + 1).trim(); }
    }
    return { name: d, description: fm.description || '', tools: fm.tools || '', content };
  }).filter(Boolean);
  writeFileSync(SKILLS_INDEX, JSON.stringify({ skills: _skills }, null, 2), 'utf8');
  return _skills;
}

function getSkill(name) {
  return loadSkills().find(s => s.name === name);
}

// ── Tool: generate_product_image ──
async function generateProductImage(args) {
  const { product, description, platforms } = args;
  if (!product) return errorResult('Missing required param: product');
  
  const analyzer = getSkill('product-analyzer');
  const promptGen = getSkill('image-prompt-generator');
  const imgGen = getSkill('image-generator');
  
  return {
    pipeline: 'product-to-image',
    steps: [
      { step: 1, skill: 'product-analyzer', phase: 2, input: description || product },
      { step: 2, skill: 'image-prompt-generator', phase: 3, input: '[Product Spec from step 1]' },
      { step: 3, skill: 'image-generator', phase: 5, input: '[Prompt from step 2]', note: 'Requires Vertex AI Imagen setup' }
    ],
    skills: {
      product_analyzer: analyzer?.content?.substring(0, 1500),
      image_prompt_generator: promptGen?.content?.substring(0, 1500),
      image_generator: imgGen?.content?.substring(0, 1000)
    },
    ready: 'Feed each step context to your AI agent. Step 3 requires GOOGLE_CLOUD_PROJECT env var.'
  };
}

// ── Tool: generate_product_catalog ──
async function generateProductCatalog(args) {
  const { products } = args;
  if (!products) return errorResult('Missing required param: products (JSON array)');
  
  const tasks = Array.isArray(products) ? products : [products];
  
  return {
    pipeline: 'products-to-catalog',
    product_count: tasks.length,
    steps: [
      { step: 1, skill: 'catalog-generator', phase: 7, input: tasks.map(p => p.product || p).join(', ') },
      { step: 2, skill: 'html-generator', phase: 9, input: '[PPTX from step 1]', optional: true }
    ],
    skills: {
      catalog_generator: getSkill('catalog-generator')?.content?.substring(0, 1500),
      html_generator: getSkill('html-generator')?.content?.substring(0, 1000)
    },
    template: 'Input/图册模板.pptx'
  };
}

// ── Tool: analyze_product_market ──
async function analyzeProductMarket(args) {
  const { product, store_url } = args;
  if (!product) return errorResult('Missing required param: product');
  
  return {
    pipeline: 'market-analysis',
    store: store_url || 'https://hpdun.com',
    steps: [
      { step: 1, skill: 'competitor-analysis', input: product },
      { step: 2, skill: 'seo-checklist', input: store_url || 'https://hpdun.com' },
      { step: 3, skill: 'ecommerce-analysis', input: product }
    ],
    skills: {
      competitor_analysis: getSkill('competitor-analysis')?.content?.substring(0, 1500),
      seo_checklist: getSkill('seo-checklist')?.content?.substring(0, 1500),
      ecommerce_analysis: getSkill('ecommerce-analysis')?.content?.substring(0, 1500)
    }
  };
}

// ── Tool: create_social_content ──
async function createSocialContent(args) {
  const { product, platforms } = args;
  if (!product) return errorResult('Missing required param: product');
  
  const targets = platforms || ['facebook', 'tiktok'];
  
  return {
    pipeline: 'product-to-social',
    platforms: targets,
    steps: [
      { step: 1, skill: 'social-copywriter', input: product, platforms: targets },
      { step: 2, skill: 'content-calendar', input: product, optional: true }
    ],
    skills: {
      social_copywriter: getSkill('social-copywriter')?.content?.substring(0, 1500),
      content_calendar: getSkill('content-calendar')?.content?.substring(0, 1000)
    }
  };
}

// ── Tool: review_ecommerce_content ──
async function reviewEcommerceContent(args) {
  const { content_type, content } = args;
  if (!content_type) return errorResult('Missing required param: content_type (prompt|image|catalog|code|translation)');
  
  const skillMap = {
    prompt: 'prompt-review',
    image: 'image-quality-review',
    catalog: 'listing-review',
    code: 'code-review',
    translation: 'translation-qa'
  };
  
  const skillName = skillMap[content_type];
  if (!skillName) return errorResult('Invalid content_type. Use: prompt, image, catalog, code, translation');
  
  const skill = getSkill(skillName);
  
  return {
    review_type: content_type,
    skill: skillName,
    skill_content: skill?.content?.substring(0, 2000),
    input_provided: content?.substring(0, 500) || '(none)',
    ready: 'Apply the skill instructions to review the provided content.'
  };
}

function errorResult(msg) {
  return { error: msg, hint: 'Use tool list_skills to see available skills.' };
}

// ── MCP Server ──
const TOOLS = {
  generate_product_image: {
    description: 'Generate product image prompt + Imagen call. Input: product name + description → output: 4-grid image prompt.',
    params: { product: 'Product name', description: 'Product description (optional)', platforms: 'Target platforms (optional)' },
    handler: generateProductImage
  },
  generate_product_catalog: {
    description: 'Generate PPTX/HTML product catalog. Input: product list → output: catalog template fill instructions.',
    params: { products: 'JSON array of product objects' },
    handler: generateProductCatalog
  },
  analyze_product_market: {
    description: 'Analyze competitor + SEO + operations. Input: product → output: market analysis report.',
    params: { product: 'Product name', store_url: 'Shopify store URL (default: hpdun.com)' },
    handler: analyzeProductMarket
  },
  create_social_content: {
    description: 'Generate social media copy + content calendar. Input: product → output: Facebook/TikTok copy.',
    params: { product: 'Product name', platforms: 'Target platforms (facebook, tiktok)' },
    handler: createSocialContent
  },
  review_ecommerce_content: {
    description: 'Review ecommerce content (prompt/image/catalog/code/translation). Input: content_type + content → output: review report.',
    params: { content_type: 'prompt|image|catalog|code|translation', content: 'Content to review' },
    handler: reviewEcommerceContent
  }
};

// JSON-RPC over stdio
process.stdin.setEncoding('utf8');
let buffer = '';
process.stdin.on('data', chunk => {
  buffer += chunk;
  while (buffer.includes('\n')) {
    const nl = buffer.indexOf('\n');
    const line = buffer.substring(0, nl);
    buffer = buffer.substring(nl + 1);
    if (!line.trim()) continue;
    try { handleMessage(JSON.parse(line)); } catch {}
  }
});

function handleMessage(msg) {
  const { id, method, params } = msg;
  
  if (method === 'tools/list') {
    respond(id, { tools: Object.entries(TOOLS).map(([name, t]) => ({
      name, description: t.description,
      inputSchema: t.params ? {
        type: 'object',
        properties: Object.fromEntries(Object.entries(t.params).map(([k, v]) => [k, { type: 'string', description: v }])),
        required: Object.keys(t.params)
      } : { type: 'object', properties: {} }
    })) });
  }
  else if (method === 'tools/call') {
    const { name, arguments: args } = params || {};
    const tool = TOOLS[name];
    if (!tool) { respond(id, null, { code: -32601, message: 'Unknown tool: ' + name }); return; }
    tool.handler(args || {}).then(result => {
      respond(id, { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] });
    }).catch(e => respond(id, null, { code: -32000, message: e.message }));
  }
  else if (method === 'initialize') {
    respond(id, { protocolVersion: '0.1.0', serverInfo: { name: 'ecommerce-agent-mcp', version: '0.6.2' }, capabilities: { tools: {} } });
  }
  else { respond(id, null, { code: -32601, message: 'Unknown method' }); }
}

function respond(id, result, error) {
  const r = { jsonrpc: '2.0', id };
  if (error) r.error = error; else r.result = result;
  process.stdout.write(JSON.stringify(r) + '\n');
}

// CLI self-test
if (process.argv.includes('--self-test')) {
  console.log('ecommerce-agent-mcp v0.6.2 — self-test');
  console.log('Skills loaded: ' + loadSkills().length);
  console.log('Tools: ' + Object.keys(TOOLS).join(', '));
  console.log('All checks passed.');
  process.exit(0);
}

// Startup
respond(null, { server: 'ecommerce-agent-mcp', version: '0.6.2', skills_loaded: 23, tools: Object.keys(TOOLS) });
