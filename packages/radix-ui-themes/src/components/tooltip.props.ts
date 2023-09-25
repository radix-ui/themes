import type { PropDef } from '../helpers';

const tooltipPropDefs = {
  content: { type: 'ReactNode', default: undefined, required: true },
} satisfies {
  content: PropDef<React.ReactNode>;
};

export { tooltipPropDefs };
