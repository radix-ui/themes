import esbuild from 'esbuild';

const dir = 'dist/cjs';

const options = {
  entryPoints: ['src/**/*.ts*'],
  outdir: dir,
  format: 'cjs',
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
