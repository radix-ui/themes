module.exports = {
  root: true,
  extends: ['custom', 'plugin:require-extensions/recommended'],
  plugins: ['require-extensions'],
  rules: {
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [['builtin', 'external'], ['parent', 'sibling', 'index'], 'type'],
      },
    ],
    'import/no-internal-modules': [
      'error',
      {
        // Importing from barrel files may lead to circular dependencies within the package.
        forbid: ['helpers/index.js', 'props/index.js'],
      },
    ],
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'import/newline-after-import': ['error', { count: 1 }],
  },
};
