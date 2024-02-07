import { themePropDefs } from './theme.props.js';
import type { PropDef } from './prop-def.js';

const radiusProp = {
  type: 'enum',
  values: themePropDefs.radius.values,
  default: undefined,
} satisfies PropDef<(typeof themePropDefs.radius.values)[number]>;

export { radiusProp };
