import { themePropDefs } from '../../theme-options';
import type { PropDef } from '..';

const radiusProp = {
  type: 'enum',
  values: themePropDefs.radius.values,
  default: undefined,
} satisfies PropDef<(typeof themePropDefs.radius.values)[number]>;

export { radiusProp };
