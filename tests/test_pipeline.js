// Pipeline runner smoke test v0.6.2
// Loads pipeline config, validates stage definitions
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PIPELINE_DIR = join(__dirname, '..', 'scripts', 'pipeline');

function run() {
  const configPath = join(PIPELINE_DIR, 'config.json');
  const runnerPath = join(PIPELINE_DIR, 'runner.js');
  const executorPath = join(PIPELINE_DIR, 'stage-executor.js');

  console.log('Pipeline files check:');
  for (const [name, path] of [['config.json', configPath], ['runner.js', runnerPath], ['stage-executor.js', executorPath]]) {
    if (!existsSync(path)) {
      console.error('  FAIL  ' + name + ': not found');
      process.exit(1);
    }
    console.log('  PASS  ' + name);
  }

  // Validate config.json structure
  const config = JSON.parse(readFileSync(configPath, 'utf8'));
  console.log('  Pipeline: ' + (config.name || 'unnamed') + ' v' + (config.version || '?'));
  
  const pipelines = config.stages || config.pipelines || {};
  const pipeNames = Object.keys(pipelines);
  console.log('  Pipelines defined: ' + pipeNames.length);

  let stepCount = 0;
  for (const [name, pipeline] of Object.entries(pipelines)) {
    const steps = pipeline.steps || pipeline.stages || [];
    if (!Array.isArray(steps)) {
      console.error('  FAIL  pipeline "' + name + '": missing steps array');
      process.exit(1);
    }
    stepCount += steps.length;
    console.log('  Pipeline "' + name + '": ' + steps.length + ' steps');
  }
  console.log('  Total steps: ' + stepCount);

  console.log('\nAll pipeline tests passed!');
}

run();
