// Skills validation test v0.6.2
// Validates all 23 SKILL.md files for required fields
import { readFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILLS_DIR = join(__dirname, '..', 'skills');

function parseFrontmatter(content) {
  const fm = {};
  let inFm = false;
  for (const line of content.split('\n')) {
    if (line.trim() === '---') {
      if (!inFm) { inFm = true; continue; }
      else break;
    }
    if (inFm) {
      const c = line.indexOf(':');
      if (c > 0) fm[line.substring(0, c).trim()] = line.substring(c + 1).trim();
    }
  }
  return fm;
}

function testAllSkills() {
  const dirs = readdirSync(SKILLS_DIR).filter(d => {
    try { return statSync(join(SKILLS_DIR, d)).isDirectory(); } catch { return false; }
  });

  let passed = 0, failed = 0;
  const results = [];

  for (const dir of dirs) {
    const skillPath = join(SKILLS_DIR, dir, 'SKILL.md');
    if (!existsSync(skillPath)) {
      console.log('  FAIL  ' + dir + ': SKILL.md not found');
      failed++;
      results.push({ skill: dir, status: 'FAIL', reason: 'SKILL.md missing' });
      continue;
    }

    const content = readFileSync(skillPath, 'utf8');
    const fm = parseFrontmatter(content);

    const checks = [];
    if (!fm.name) checks.push('missing name');
    if (!fm.description) checks.push('missing description');
    if (content.length < 500) checks.push('content too short');
    if (!content.includes('##')) checks.push('no markdown sections');

    if (checks.length > 0) {
      console.log('  FAIL  ' + dir + ': ' + checks.join(', '));
      failed++;
      results.push({ skill: dir, status: 'FAIL', reasons: checks });
    } else {
      console.log('  PASS  ' + dir);
      passed++;
      results.push({ skill: dir, status: 'PASS' });
    }
  }

  console.log('\n' + passed + ' passed, ' + failed + ' failed, ' + dirs.length + ' total');
  return { passed, failed, total: dirs.length, results };
}

const result = testAllSkills();
process.exit(result.failed > 0 ? 1 : 0);
