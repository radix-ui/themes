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

const cache = new WeakMap();

module.exports = () => ({
  postcssPlugin: 'postcss-radix-themes',
  Comment(comment) {
    // Remove all comments from CSS source
    comment.remove();
  },
  Rule(rule) {
    if (rule.parent.name === 'breakpoints') {
      const breakpointsRule = rule.parent;

      // when we first meet a given @breakpoints at-rule
      if (!cache.has(breakpointsRule)) {
        // create the final media rules for this @breakpoints at-rule
        const medias = {
          all: new postcss.AtRule({ name: 'media', params: 'all' }),
          ...breakpoints.reduce((breakpointsMedias, breakpoint) => {
            breakpointsMedias[breakpoint.name] = new postcss.AtRule({
              name: 'media',
              params: breakpoint.params,
            });
            return breakpointsMedias;
          }, {}),
        };
        // add an entry to the cache
        cache.set(breakpointsRule, medias);

        // add final media rules to the BEFORE the @breakpoints at-rule
        // (before so it retains the correct mobile-first order)
        Object.values(medias).forEach((media) => {
          breakpointsRule.parent.insertBefore(breakpointsRule, media);
        });
      }

      // add top-level clone in @media all
      const clone = rule.clone();
      cache.get(breakpointsRule).all.append(clone);

      // add breakpoint-level rules
      breakpoints.forEach((breakpoint) => {
        const clone = rule.clone();
        addPrefix(clone, breakpoint.name);
        cache.get(breakpointsRule)[breakpoint.name].append(clone);
      });

      // remove rule from original @breakpoints at-rule
      rule.remove();

      // remove @breakpoints at-rule and clear cache if it has no rules
      if (breakpointsRule.nodes.length === 0) {
        breakpointsRule.remove();
        cache.delete(breakpointsRule);
      }
    }
  },
});

module.exports.postcss = true;

function addPrefix(node, prefix) {
  if (node.type === 'atrule') {
    node.each((child) => addPrefix(child, prefix));
  }

  /**
   * Should match responsive classes (rt-r- prefix):
   * ```
   * .rt-r-size-1
   * .rt-m-2
   * .-rt-m-2
   * .rt-Button.rt-r-size-1 (captures "rt-r-size-1")
   * ```
   *
   * Should not match:
   * .rt-Button
   */
  const classNameRegexp = /\.(-?rt-r-[a-z0-9\-]+)/g;

  // Check for rules that use compound props on a component:
  // - a component name (prefixed with "rt-" and pascal cased)
  // - followed by 2 or more prop selectors (lowercase, numbers, -)
  //
  // e.g. ".rt-DialogContent.rt-r-size-2.gray"
  if (/\.rt-(?:[A-Z][a-z]+)+(?:\.[a-z0-9\-]+){2,}/.test(node.selector)) {
    throw Error(`
      "${node.selector}" looks like it uses compound props on a component.
      "@breakpoints" does not support compound props yet.
    `);
  }

  if (classNameRegexp.test(node.selector)) {
    node.selector = node.selector.replace(classNameRegexp, `.${prefix}\\:$1`);
  }
}
