module.exports = {
  rules: {
    // Allow 0,1,1 specificity for pseudo elements and effectively cap at 0,1,0 in all other cases
    'selector-max-type': 0,
    'selector-max-specificity': ['0,1,1'],
    'selector-class-pattern': /^-?rt-|^radix-themes$|^(light|dark)(-theme)?$/,
    'keyframes-name-pattern': /^rt-([a-z]|-)+$/,
  },
};
