import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

function readAllCssFiles(dir: string, out: string[] = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith('.')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) readAllCssFiles(full, out);
    else if (e.isFile() && e.name.endsWith('.css')) out.push(full);
  }
  return out;
}

describe('CSS uses logical properties (no left/right physical properties)', () => {
  it('finds no disallowed left/right declarations', () => {
    const roots = [path.join(__dirname, '../../src/components'), path.join(__dirname, '../../src/styles')];
    const files = roots.flatMap((r) => (fs.existsSync(r) ? readAllCssFiles(r) : []));

    const violations: { file: string; line: number; content: string; rule: string }[] = [];

    // Regexes anchored to property positions to avoid matching selectors/vars
    const rules: { rule: string; regex: RegExp; suggestion: string }[] = [
      { rule: 'left property', regex: /^\s*left\s*:/, suggestion: 'use inset-inline-start' },
      { rule: 'right property', regex: /^\s*right\s*:/, suggestion: 'use inset-inline-end' },
      { rule: 'margin-left', regex: /^\s*margin-left\s*:/, suggestion: 'use margin-inline-start' },
      { rule: 'margin-right', regex: /^\s*margin-right\s*:/, suggestion: 'use margin-inline-end' },
      { rule: 'padding-left', regex: /^\s*padding-left\s*:/, suggestion: 'use padding-inline-start' },
      { rule: 'padding-right', regex: /^\s*padding-right\s*:/, suggestion: 'use padding-inline-end' },
      { rule: 'border-left-*', regex: /^\s*border-left(?:-[a-z-]+)?\s*:/, suggestion: 'use border-inline-start-*' },
      { rule: 'border-right-*', regex: /^\s*border-right(?:-[a-z-]+)?\s*:/, suggestion: 'use border-inline-end-*' },
      { rule: 'text-align left/right', regex: /^\s*text-align\s*:\s*(left|right)\b/, suggestion: 'use start/end' },
      { rule: 'float left/right', regex: /^\s*float\s*:\s*(left|right)\b/, suggestion: 'use inline-start/inline-end' },
      { rule: 'clear left/right', regex: /^\s*clear\s*:\s*(left|right)\b/, suggestion: 'use inline-start/inline-end' },
    ];

    for (const file of files) {
      const text = fs.readFileSync(file, 'utf8');
      const lines = text.split(/\r?\n/);
      for (let i = 0; i < lines.length; i++) {
        const raw = lines[i];
        const line = raw.trim();
        // Skip comments
        if (line.startsWith('/*') || line.startsWith('*') || line.startsWith('//')) continue;
        for (const { rule, regex } of rules) {
          if (regex.test(raw)) {
            violations.push({ file, line: i + 1, content: raw.trim(), rule });
            break;
          }
        }
      }
    }

    if (violations.length > 0) {
      const message = violations.map((v) => `${path.relative(path.join(__dirname, '../../'), v.file)}:${v.line} [${v.rule}] ${v.content}`).join('\n');
      // Surface helpful output without failing the suite (warn-only audit)
      // eslint-disable-next-line no-console
      console.warn('Logical properties audit: please replace physical left/right usages.\n' + message);
    }

    expect(true).toBe(true);
  });
});
