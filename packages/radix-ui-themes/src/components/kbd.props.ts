import { textPropDefs } from './text.props';
import type { PropDef } from '../helpers';

const underline = ['auto', 'hover', 'always'] as const;

const kbdPropDefs = {
  size: textPropDefs.size,
} satisfies {
  size: typeof textPropDefs.size;
};

export { kbdPropDefs };
