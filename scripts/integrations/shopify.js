#!/usr/bin/env node
// Shopify Integration v0.6.2 — hpdun.com
// Usage: node shopify.js --product product.json
//        node shopify.js --list     (list all products)
// Env:   SHOPIFY_STORE_URL, SHOPIFY_ACCESS_TOKEN

const SHOPIFY_URL = process.env.SHOPIFY_STORE_URL || "https://hpdun.com";
const ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
const API_VERSION = "2024-04";

if (!ACCESS_TOKEN) {
  console.error("Missing SHOPIFY_ACCESS_TOKEN. Set in .env or environment.");
  process.exit(1);
}

const BASE = `/admin/api/${API_VERSION}`;
const HEADERS = {
  "Content-Type": "application/json",
  "X-Shopify-Access-Token": ACCESS_TOKEN,
};

async function request(method, path, body) {
  const url = `${SHOPIFY_URL}${BASE}${path}`;
  const res = await fetch(url, {
    method,
    headers: HEADERS,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Shopify API ${res.status}: ${err}`);
  }
  return res.json();
}

async function listProducts() {
  const data = await request("GET", "/products.json?limit=50");
  console.log(`Found ${data.products.length} products:`);
  for (const p of data.products) {
    console.log(`  [${p.id}] ${p.title} — ${p.status}`);
  }
  return data.products;
}

async function createProduct(spec) {
  const body = { product: {
    title: spec.title || spec.name || "Untitled Product",
    body_html: spec.body_html || spec.description || "",
    vendor: spec.vendor || spec.brand || "舒特工贸",
    product_type: spec.product_type || spec.category || "",
    tags: spec.tags || "",
    status: spec.status || "draft",
    variants: spec.variants || [{ price: spec.price || "0.00", sku: spec.sku || "" }],
    images: spec.images ? spec.images.map(url => ({ src: url })) : [],
  }};
  const data = await request("POST", "/products.json", body);
  const p = data.product;
  console.log(`Created: [${p.id}] ${p.title} (${p.status})`);
  console.log(`URL: ${SHOPIFY_URL}/admin/products/${p.id}`);
  return p;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--list")) {
    return listProducts();
  }
  if (args.includes("--product")) {
    const idx = args.indexOf("--product");
    const file = args[idx + 1];
    if (!file) { console.error("Usage: node shopify.js --product <json-file>"); process.exit(1); }
    const fs = await import("fs");
    const spec = JSON.parse(fs.readFileSync(file, "utf8"));
    return createProduct(spec);
  }
  let input = "";
  process.stdin.setEncoding("utf8");
  for await (const chunk of process.stdin) { input += chunk; }
  if (input.trim()) return createProduct(JSON.parse(input));
  console.log("Usage: node shopify.js --list | --product <file> | pipe JSON");
}

main().then(() => process.exit(0)).catch(e => { console.error(e.message); process.exit(1); });
