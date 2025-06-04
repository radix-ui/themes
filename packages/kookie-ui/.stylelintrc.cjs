module.exports = {
  rules: {
    // Disallow element type selector.
    'selector-max-type': 0,
    // Allow 0,1,1 specificity for pseudo elements and effectively cap at 0,1,0 in all other cases.
    // This is so that Tailwind classes work as expected.
    'selector-max-specificity': ['0,1,1'],
    // Enforce prefixes on classnames and keyframes
    'selector-class-pattern': /^((xs|sm|md|lg|xl):)?-?rt-|^radix-themes$|^(light|dark)(-theme)?$/,
    'keyframes-name-pattern': /^rt-([a-z]|-)+$/,
  },
};
