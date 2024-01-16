// Clean up the whitespace mess left behind by other plugins
module.exports = () => ({
  postcssPlugin: 'postcss-whitespace',
  Comment(comment) {
    // Remove all comments
    comment.remove();
  },
  Declaration(decl) {
    if (decl.value.includes('\n')) {
      // Remove line breaks and consequent spaces
      decl.value = decl.value.replace(/\s+/g, ' ');
      // Collapse whitespace around round brackets
      decl.value = decl.value.replace(/\(\s/g, '(');
      decl.value = decl.value.replace(/\s\)/g, ')');
    }
  },
  AtRule(rule) {
    // Remove line breaks before and after the rule
    delete rule.raws.before;
    delete rule.raws.after;
  },
  Rule(rule) {
    rule.cleanRaws();
  },
});

module.exports.postcss = true;
