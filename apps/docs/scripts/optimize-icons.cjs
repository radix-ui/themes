#!/usr/bin/env node
/*
 * Optimize small icon PNGs used across docs pages.
 * - Resizes to ICON_SIZE (default 128) using cover fit
 * - Re-encodes PNG with palette + max compression
 * - Overwrites originals in apps/docs/public
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

// Whitelist only icon files we use in docs headers so we don't touch large assets
const iconFiles = new Set(['guidelines.png', 'code.png', 'scale.png', 'clock.png', 'people.png', 'playground.png', 'shell.png', 'button.png', 'colors.png']);

const ICON_SIZE = parseInt(process.env.ICON_SIZE || '256', 10);
const QUALITY = parseInt(process.env.ICON_QUALITY || '72', 10);

async function optimizeFile(filename) {
  const inputPath = path.join(publicDir, filename);
  const tmpPath = path.join(publicDir, `.tmp.${filename}`);

  try {
    await sharp(inputPath)
      .resize(ICON_SIZE, ICON_SIZE, { fit: 'cover' })
      .png({
        compressionLevel: 9,
        effort: 10,
        quality: QUALITY,
        palette: true,
      })
      .toFile(tmpPath);

    await fs.promises.rename(tmpPath, inputPath);
    const { size } = await fs.promises.stat(inputPath);
    console.log(`Optimized ${filename} -> ${(size / 1024).toFixed(1)} kB`);
  } catch (err) {
    // Clean up tmp file if it exists
    try {
      await fs.promises.unlink(tmpPath);
    } catch (_) {}
    console.error(`Failed optimizing ${filename}:`, err.message);
  }
}

async function main() {
  if (!fs.existsSync(publicDir)) {
    console.error('Public directory not found:', publicDir);
    process.exit(1);
  }

  const files = await fs.promises.readdir(publicDir);
  const targets = files.filter((f) => iconFiles.has(f));

  if (targets.length === 0) {
    console.log('No icon files found to optimize.');
    return;
  }

  await Promise.all(targets.map(optimizeFile));
}

main();
