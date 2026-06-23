// MCP Server smoke test v0.6.2
// Spawns server, sends initialize + tools/list JSON-RPC calls
import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SERVER_PATH = join(__dirname, '..', 'mcp-server', 'index.js');

function sendRpc(child, method, params) {
  return new Promise((resolve, reject) => {
    const id = Date.now();
    child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n');

    const onData = (chunk) => {
      const lines = chunk.toString().split('\n').filter(Boolean);
      for (const line of lines) {
        try {
          const msg = JSON.parse(line);
          if (msg.id === id) {
            child.stdout.removeListener('data', onData);
            if (msg.error) reject(new Error(JSON.stringify(msg.error)));
            else resolve(msg.result);
          }
        } catch {}
      }
    };
    child.stdout.on('data', onData);

    setTimeout(() => {
      child.stdout.removeListener('data', onData);
      reject(new Error('RPC timeout'));
    }, 5000);
  });
}

async function run() {
  console.log('Starting MCP server...');
  const child = spawn('node', [SERVER_PATH], { stdio: ['pipe', 'pipe', 'pipe'] });
  let output = '';

  child.stderr.on('data', (d) => { output += d.toString(); });

  try {
    // Test 1: Initialize
    console.log('Test 1: initialize');
    const init = await sendRpc(child, 'initialize', {});
    console.log('  Server: ' + init.serverInfo.name + ' v' + init.serverInfo.version);
    if (init.serverInfo.name !== 'ecommerce-agent-mcp') throw new Error('Wrong server name');

    // Test 2: List tools
    console.log('Test 2: tools/list');
    const tools = await sendRpc(child, 'tools/list', {});
    console.log('  Tools: ' + tools.tools.length);
    const names = tools.tools.map(t => t.name);
    const expected = ['generate_product_image', 'generate_product_catalog', 'analyze_product_market', 'create_social_content', 'review_ecommerce_content'];
    for (const e of expected) {
      if (!names.includes(e)) throw new Error('Missing tool: ' + e);
    }
    console.log('  All expected tools present');

    // Test 3: Call a tool
    console.log('Test 3: tools/call (generate_product_image)');
    const result = await sendRpc(child, 'tools/call', { name: 'generate_product_image', arguments: { product: 'test-jacket' } });
    if (!result.content || !result.content[0]?.text) throw new Error('Bad tool response');
    console.log('  Tool call succeeded');

    console.log('\nAll MCP server tests passed!');
    child.kill();
    process.exit(0);
  } catch (e) {
    console.error('\nFAIL: ' + e.message);
    console.error(output);
    child.kill();
    process.exit(1);
  }
}

run();
