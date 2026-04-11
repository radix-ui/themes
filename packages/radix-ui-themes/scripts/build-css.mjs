// @ts-check
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { styleText } from 'node:util';
import postcss from 'postcss';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const { plugins } = require(resolve(root, 'postcss.config.cjs'));
const processor = postcss(plugins);

// ---------------------------------------------------------------------------
// Target definitions
//
//   group              – expands to a list of other target names
//   input/output       – single file → single file
//   inputDir/outputDir – every *.css in dir → same filename in output dir
// ---------------------------------------------------------------------------

/**
 * @typedef {{ inputDir: string; outputDir: string; }} DirTarget
 * @typedef {{ input: string; output: string; }} FileTarget
 * @typedef {{ group: string[]; }} GroupTarget
 * @typedef {DirTarget | FileTarget | GroupTarget} Target
 */

/** @type {Record<string, Target>} */
const targets = {
  index: { input: 'src/styles/index.css', output: 'styles.css' },
  components: { input: 'src/components/index.css', output: 'components.css' },
  utilities: { input: 'src/styles/utilities/index.css', output: 'utilities.css' },

  tokens: { group: ['tokens/index', 'tokens/base', 'tokens/colors'] },
  'tokens/index': { input: 'src/styles/tokens/index.css', output: 'tokens.css' },
  'tokens/base': { input: 'src/styles/tokens/base.css', output: 'tokens/base.css' },
  'tokens/colors': { inputDir: 'src/styles/tokens/colors', outputDir: 'tokens/colors' },

  layout: { group: ['layout/index', 'layout/tokens', 'layout/components', 'layout/utilities'] },
  'layout/index': { input: 'src/styles/layout.css', output: 'layout.css' },
  'layout/tokens': { input: 'src/styles/tokens/layout.css', output: 'layout/tokens.css' },
  'layout/components': { input: 'src/components/layout.css', output: 'layout/components.css' },
  'layout/utilities': { input: 'src/styles/utilities/layout.css', output: 'layout/utilities.css' },
};

const defaultTargets = ['index', 'components', 'utilities', 'tokens', 'layout'];

// ---------------------------------------------------------------------------
// Build helpers
// ---------------------------------------------------------------------------

/**
 *
 * @param {string} input
 * @param {string} output
 */
async function processFile(input, output) {
  const inputPath = resolve(root, input);
  const outputPath = resolve(root, output);
  const css = await readFile(inputPath, 'utf-8');
  const result = await processor.process(css, { from: inputPath, to: outputPath });
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, result.css);
  console.log(`  ${styleText('gray', input)} → ${styleText('blue', output)}`);
}

/**
 * @param {string} inputDir
 * @param {string} outputDir
 */
async function processDir(inputDir, outputDir) {
  const absIn = resolve(root, inputDir);
  const files = (await readdir(absIn)).filter((f) => f.endsWith('.css'));
  await mkdir(resolve(root, outputDir), { recursive: true });
  for (const file of files) {
    await processFile(join(inputDir, file), join(outputDir, file));
  }
}

/**
 * @param {keyof typeof targets} name
 */
async function build(name) {
  const target = targets[name];
  if (!target) {
    console.log(styleText('red', `Unknown target: "${name}"`));
    console.log(`Available targets: ${Object.keys(targets).join(', ')}`);
    process.exit(1);
  }
  if ('group' in target) {
    for (const sub of target.group) {
      await build(sub);
    }
  } else if ('inputDir' in target) {
    await processDir(target.inputDir, target.outputDir);
  } else {
    await processFile(target.input, target.output);
  }
}

// ---------------------------------------------------------------------------
// CLI – accepts target names as positional args (with optional leading --)
//
//   node scripts/build-css.mjs                  # build everything
//   node scripts/build-css.mjs layout           # build all layout targets
//   node scripts/build-css.mjs --layout/index   # build a single target
//   node scripts/build-css.mjs tokens layout    # multiple targets
// ---------------------------------------------------------------------------
const args = process.argv.slice(2).map((a) => a.replace(/^--/, ''));
const names = args.length > 0 ? args : defaultTargets;

if (names.length === 0) {
  console.log(styleText('red', 'No targets specified'));
  console.log(styleText('gray', 'Available targets:'), Object.keys(targets).join(', '));
  process.exit(1);
}

console.log(styleText('yellow', 'Building CSS…'));
console.log(styleText('gray', '-'.repeat(80)));
for (const name of names) {
  await build(name);
}
console.log(styleText('gray', '-'.repeat(80)));
console.log(styleText('green', 'Done ✅'));
