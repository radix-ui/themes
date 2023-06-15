const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

// Build a list of breakpoints from "@custom media" rules in "breakpoints.css"
const breakpointsFile = path.resolve('./src/styles/breakpoints.css');
const breakpointsCss = fs.readFileSync(breakpointsFile, 'utf-8');
const breakpoints = postcss
  .parse(breakpointsCss)
  .nodes.map((node) => {
    if (node.type === 'atrule' && node.name === 'custom-media') {
      const [_match, name, params] = node.params.match(/--(\w+)\s+(.+)/);
      return { name, params };
    }

    return null;
  })
  .filter(Boolean);

module.exports = () => ({
  postcssPlugin: 'postcss-radix-themes',
  Rule(rule) {
    if (rule.parent.name === 'breakpoints') {
      // add top-level clone
      rule.parent.parent.append(rule.clone());

      // add breakpoint-level rules
      breakpoints.forEach((breakpoint) => {
        const media = new postcss.AtRule({
          name: 'media',
          params: breakpoint.params,
        });

        const clone = rule.clone();
        addPrefix(clone, breakpoint.name);
        media.append(clone);
        rule.parent.parent.append(media);
      });

      // remove rule from original @breakpoints at-rule
      rule.remove();
    }
  },
});

module.exports.postcss = true;

function addPrefix(node, prefix) {
  if (node.type === 'atrule') {
    node.each((child) => addPrefix(child, prefix));
  }

  /**
   * Should match:
   * ```
   * .gray
   * .size-1
   * .rui-m-2
   * .-rui-m-2
   * .rui-Button.size-1 (captures "size-1")
   * ```
   *
   * Should not match:
   * .rui-Button
   */
  const classNameRegexp = /\.(-?(?:rui-)?(?!rui-)[a-z0-9\-]+)/g;

  // Check for rules that use compound props on a component:
  // - a component name (prefixed with "rui-" and pascal cased)
  // - followed by 2 or more prop selectors (lowercase, numbers, -)
  //
  // e.g. ".rui-DialogContent.size-2.gray"
  if (/\.rui-(?:[A-Z][a-z]+)+(?:\.[a-z0-9\-]+){2,}/.test(node.selector)) {
    throw Error(`
      "${node.selector}" looks like it uses compound props on a component.
      "@breakpoints" does not support compound props yet.
    `);
  }

  if (classNameRegexp.test(node.selector)) {
    node.selector = node.selector.replace(classNameRegexp, `.${prefix}\\:$1`);
  }
}
