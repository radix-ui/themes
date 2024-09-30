import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

const dir = 'dist/esm';

const options = {
  entryPoints: ['src/**/*.ts*'],
  outdir: dir,
  format: 'esm',
  target: 'es2020',
  sourcemap: true,
  minify: true,
};

// Check if "watch=true" flag is passed
if (process.argv[2]) {
  const [key, value] = process.argv[2].split('=');
  if (key === 'watch' && value === 'true') {
    const ctx = await esbuild.context(options);
    await ctx.watch();
  }
}

esbuild.build(options).catch(() => process.exit(1));

// Create a package.json file in the dist/esm directory with "type": "module" field
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
fs.writeFileSync(
  path.join(dir, 'package.json'),
  JSON.stringify({ type: 'module' }, null, 2) + '\n',
  'utf-8'
);
