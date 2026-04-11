// @ts-check
import path from 'node:path';
import postcssImport from 'postcss-import';
import postcssNesting from 'postcss-nesting';
import postcssBreakpoints from './postcss-breakpoints.js';
import postcssCustomMedia from 'postcss-custom-media';
import postcssCombineDuplicatedSelectors from 'postcss-combine-duplicated-selectors';
import postcssDiscardEmpty from 'postcss-discard-empty';
import postcssWhitespace from './postcss-whitespace.js';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    postcssImport({
      path: [path.relative(process.cwd(), '../')],
    }),
    postcssNesting(),
    postcssBreakpoints(),
    postcssCustomMedia(),
    postcssCombineDuplicatedSelectors(),
    postcssDiscardEmpty(),
    postcssWhitespace(),
    autoprefixer(),
  ],
};
