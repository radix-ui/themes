import type { PropDef } from '../helpers';

const tooltipPropDefs = {
  multiline: { type: 'boolean', default: false },
  content: { type: 'ReactNode', default: undefined, required: true },
} satisfies {
  multiline: PropDef<boolean>;
  content: PropDef<React.ReactNode>;
};

export { tooltipPropDefs };
