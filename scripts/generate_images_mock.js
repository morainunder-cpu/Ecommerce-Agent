#!/usr/bin/env node
// Mock Image Generator v0.6.2 — Fallback when Vertex AI Imagen unavailable
// Usage: node generate_images_mock.js --batch Input/prompts_batch.json
//        node generate_images_mock.js --product "冬装" --output Output/
// Creates colored SVG placeholders with product name overlay.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const COLORS = [
  { bg: '#1a1a2e', text: '#e94560' },
  { bg: '#16213e', text: '#0f3460' },
  { bg: '#0f3460', text: '#e94560' },
  { bg: '#533483', text: '#e94560' },
  { bg: '#2b2b2b', text: '#f5c518' },
  { bg: '#1b3a4b', text: '#4dd0e1' },
  { bg: '#2d1b69', text: '#ffd54f' },
];

function generateSVG(product, prompt, colorIdx) {
  const { bg, text } = COLORS[colorIdx % COLORS.length];
  const shortName = (product || 'Product').substring(0, 20);
  const snippet = (prompt || 'Ecommerce product image').substring(0, 80);

  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
'<svg xmlns="http://www.w3.org/2000/svg" width="926" height="556" viewBox="0 0 926 556">\n' +
'  <rect width="100%" height="100%" fill="' + bg + '"/>\n' +
'  <rect x="20" y="20" width="886" height="516" rx="12" fill="none" stroke="' + text + '" stroke-width="2" stroke-dasharray="8,4"/>\n' +
'  <rect x="40" y="60" width="400" height="220" rx="8" fill="' + text + '" opacity="0.15" stroke="' + text + '" stroke-width="1"/>\n' +
'  <rect x="460" y="60" width="400" height="220" rx="8" fill="' + text + '" opacity="0.15" stroke="' + text + '" stroke-width="1"/>\n' +
'  <rect x="40" y="300" width="400" height="220" rx="8" fill="' + text + '" opacity="0.15" stroke="' + text + '" stroke-width="1"/>\n' +
'  <rect x="460" y="300" width="400" height="220" rx="8" fill="' + text + '" opacity="0.15" stroke="' + text + '" stroke-width="1"/>\n' +
'  <text x="240" y="180" text-anchor="middle" fill="' + text + '" font-family="Arial, sans-serif" font-size="18" opacity="0.7">Front View</text>\n' +
'  <text x="660" y="180" text-anchor="middle" fill="' + text + '" font-family="Arial, sans-serif" font-size="18" opacity="0.7">Back View</text>\n' +
'  <text x="240" y="420" text-anchor="middle" fill="' + text + '" font-family="Arial, sans-serif" font-size="18" opacity="0.7">Side View</text>\n' +
'  <text x="660" y="420" text-anchor="middle" fill="' + text + '" font-family="Arial, sans-serif" font-size="18" opacity="0.7">Detail</text>\n' +
'  <text x="463" y="30" text-anchor="middle" fill="' + text + '" font-family="Arial, sans-serif" font-size="28" font-weight="bold">' + shortName + '</text>\n' +
'  <text x="463" y="545" text-anchor="middle" fill="' + text + '" font-family="Arial, sans-serif" font-size="12" opacity="0.5">' + snippet + '</text>\n' +
'  <text x="870" y="545" text-anchor="end" fill="' + text + '" font-family="Arial, sans-serif" font-size="10" opacity="0.4">MOCK</text>\n' +
'</svg>';
}

function generate(product, prompt, outputDir) {
  if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });
  const safeName = (product || 'unknown').replace(/[\\/:*?"<>| ]/g, '_');
  const colorIdx = Math.abs(hashCode(product || 'default'));
  const svg = generateSVG(product, prompt, colorIdx);
  const svgPath = join(outputDir, safeName + '_四宫格.svg');
  writeFileSync(svgPath, svg, 'utf8');
  console.log('SAVED: ' + svgPath);
  return svgPath;
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function batchGenerate(promptsFile, outputDir) {
  const data = JSON.parse(readFileSync(promptsFile, 'utf8'));
  const results = [];
  const items = Array.isArray(data) ? data : (data.prompts || []);

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const product = item.product || item.name || ('product-' + (i + 1));
    const prompt = item.prompt || item.description || '';
    console.log('Generating (mock): ' + product + ' ...');
    const path = generate(product, prompt, outputDir);
    results.push({ product, output: path, status: 'success' });
  }

  const log = { generated_at: new Date().toISOString(), mock: true, results };
  writeFileSync(join(outputDir, '_generation_log.json'), JSON.stringify(log, null, 2), 'utf8');
  console.log('Done: ' + results.length + ' mock images generated.');
}

function main() {
  const args = process.argv.slice(2);
  const batchIdx = args.indexOf('--batch');
  const productIdx = args.indexOf('--product');
  const outputIdx = args.indexOf('--output');
  const outputDir = outputIdx >= 0 ? args[outputIdx + 1] : 'Output';

  if (batchIdx >= 0) {
    return batchGenerate(args[batchIdx + 1], outputDir);
  }
  if (productIdx >= 0) {
    const promptIdx = args.indexOf('--prompt');
    const prompt = promptIdx >= 0 ? args[promptIdx + 1] : '';
    return generate(args[productIdx + 1], prompt, outputDir);
  }
  console.log('Mock Image Generator — Fallback for Vertex AI Imagen');
  console.log('Usage: node generate_images_mock.js --batch prompts.json [--output Dir]');
  console.log('       node generate_images_mock.js --product "name" --prompt "desc" [--output Dir]');
}

main();