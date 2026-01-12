# Contributing to Kookie UI

Thank you for contributing to Kookie UI! This guide will help you understand our development workflow and commit conventions.

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) to automate semantic versioning and changelog generation. Every commit message must follow this format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types

The commit type determines how the version number is incremented:

#### **PATCH** Release (Bug Fixes)
- `fix:` - Bug fixes that don't add features or break compatibility
- Example: `fix(dropdown): correct z-index stacking issue`
- Version: `1.0.0` → `1.0.1`

#### **MINOR** Release (New Features)
- `feat:` - New features that are backward compatible
- Example: `feat(dropdown): add drill-down submenu behavior with animations`
- Version: `1.0.0` → `1.1.0`

#### **MAJOR** Release (Breaking Changes)
- Any commit with `!` after the type or `BREAKING CHANGE:` in the footer
- Examples:
  - `feat!: remove deprecated panelBackground prop`
  - `refactor!: rename Button size values`
  - With footer:
    ```
    feat: redesign Button API
    
    BREAKING CHANGE: size prop now uses 1-4 instead of sm/md/lg/xl
    ```
- Version: `1.0.0` → `2.0.0`

### Other Commit Types

These **do not** trigger releases but appear in the changelog:

- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, no functional changes)
- `refactor:` - Code refactoring without feature changes
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `build:` - Build system or dependency changes
- `ci:` - CI/CD configuration changes
- `chore:` - Other changes that don't modify src or test files

### Scopes

Optionally specify the component or area affected:

- `feat(dropdown): add submenu animations`
- `fix(button): resolve tooltip positioning`
- `docs(shell): update responsive props`
- `perf(table): optimize virtualization`

### Examples

```bash
# Patch release - bug fix
git commit -m "fix(dropdown): resolve menu item hover state in dark mode"

# Minor release - new feature
git commit -m "feat(button): add tooltip support with positioning options"

# Minor release with body
git commit -m "feat(dropdown): add drill-down submenu behavior

Add responsive submenu navigation that switches between cascade and drill-down
modes based on screen size. Includes smooth slide animations."

# Major release - breaking change
git commit -m "feat!: redesign Theme API

BREAKING CHANGE: The Theme component now uses material prop instead of 
panelBackground. Update all instances of panelBackground='solid' to 
material='solid'."

# Documentation change (no release)
git commit -m "docs(readme): update installation instructions"

# Chore (no release)
git commit -m "chore: update dependencies"
```

## Automated Release Process

When you push commits to `main`:

1. **semantic-release** analyzes commit messages
2. Determines version bump based on commit types:
   - `fix:` → patch (1.0.0 → 1.0.1)
   - `feat:` → minor (1.0.0 → 1.1.0)
   - `feat!:` or `BREAKING CHANGE:` → major (1.0.0 → 2.0.0)
3. Updates `package.json` version
4. Generates/updates `CHANGELOG.md`
5. Creates GitHub release with notes
6. Publishes to npm
7. Commits changes back to repo

## Development Workflow

### 1. Clone and Setup

**Requirements:**
- Node.js ≥ 22.14.0
- pnpm ≥ 10.0.0

```bash
git clone https://github.com/KushagraDhawan1997/kookie-ui.git
cd kookie-ui
pnpm install
```

### 2. Create a Feature Branch

```bash
git checkout -b feat/your-feature-name
```

### 3. Make Changes

```bash
# Start dev server
pnpm dev

# Make your changes to packages/kookie-ui/src/...
```

### 4. Commit with Conventional Format

```bash
# For a new feature
git commit -m "feat(component): add new feature"

# For a bug fix
git commit -m "fix(component): resolve issue"

# For a breaking change
git commit -m "feat!: redesign API

BREAKING CHANGE: describe what breaks and how to migrate"
```

### 5. Push and Create PR

```bash
git push origin feat/your-feature-name
```

Create a pull request on GitHub. Once merged to `main`, semantic-release will handle versioning and publishing automatically.

## Commit Message Tips

✅ **Good commits:**
- `feat(dropdown): add drill-down submenu navigation`
- `fix(button): resolve loading spinner alignment`
- `docs(shell): update responsive layout examples`
- `perf(table): optimize row rendering performance`

❌ **Bad commits:**
- `Update dropdown.tsx` (not descriptive, no type)
- `Fixed bug` (no scope, not specific)
- `WIP` (work in progress, not ready to commit)
- `Added new feature and fixed bugs` (should be separate commits)

## Questions?

If you have questions about contributing or commit conventions, please open an issue on GitHub.

## Resources

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [semantic-release Documentation](https://semantic-release.gitbook.io/)

