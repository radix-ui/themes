// @ts-check
// Clean up the whitespace mess left behind by other plugins

/**
 * @returns {Plugin}
 */
const plugin = () => ({
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

/** @type {true} */
const postcss = true;
/** @type {import('postcss').PluginCreator<never>} */
const creator = Object.assign(plugin, { postcss });
export default creator;

/**
 * @typedef {import('postcss').Plugin} Plugin
 */
