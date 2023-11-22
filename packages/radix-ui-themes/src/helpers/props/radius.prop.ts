import { themePropDefs } from '../../theme-options.js';
import type { PropDef } from '../index.js';

const radiusProp = {
  type: 'enum',
  values: themePropDefs.radius.values,
  default: undefined,
} satisfies PropDef<(typeof themePropDefs.radius.values)[number]>;

export { radiusProp };
