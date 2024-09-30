module.exports = {
  extends: ['next/core-web-vitals', 'next/typescript'],
  rules: {
    // Not useful for our playground apps:
    '@typescript-eslint/no-explicit-any': 'off',
    'jsx-a11y/alt-text': 'off',
    '@next/next/no-img-element': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
  },
};
