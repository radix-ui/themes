#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

function run(command) {
  console.log(`> ${command}`);
  execSync(command, { stdio: 'inherit' });
}

function getCurrentVersion() {
  return packageJson.version;
}

function main() {
  const args = process.argv.slice(2);
  const versionType = args[0] || 'patch'; // patch, minor, major

  if (!['patch', 'minor', 'major'].includes(versionType)) {
    console.error('Usage: node scripts/release.js [patch|minor|major]');
    process.exit(1);
  }

  const currentVersion = getCurrentVersion();
  console.log(`Current version: ${currentVersion}`);

  try {
    // Build the package
    console.log('\n📦 Building package...');
    run('pnpm build');

    // Bump version
    console.log(`\n🔢 Bumping ${versionType} version...`);
    run(`npm version ${versionType} --no-git-tag-version`);

    // Get new version
    const newPackageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const newVersion = newPackageJson.version;
    console.log(`New version: ${newVersion}`);

    // Publish to NPM
    console.log('\n🚀 Publishing to NPM...');
    run('npm publish --access public');

    console.log(`\n✅ Successfully published @kushagradhawan/kookie-ui@${newVersion}`);
    console.log(`\n📝 Don't forget to commit and push the version change:`);
    console.log(`   git add package.json`);
    console.log(`   git commit -m "chore: bump version to ${newVersion}"`);
    console.log(`   git push`);
  } catch (error) {
    console.error('\n❌ Release failed:', error.message);
    process.exit(1);
  }
}

main();
