module.exports = {
  extends: ['next', 'turbo', 'prettier'],
  rules: {
    // Not useful for our playground apps:
    'jsx-a11y/alt-text': 'off',
    '@next/next/no-img-element': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'ignore' }],
  },
};
