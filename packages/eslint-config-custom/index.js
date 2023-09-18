module.exports = {
  extends: ['next', 'turbo', 'prettier'],
  rules: {
    // Not useful for our playground apps:
    'jsx-a11y/alt-text': 'off',
    '@next/next/no-img-element': 'off',
    '@next/next/no-html-link-for-pages': 'off',
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
};
