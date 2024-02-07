import type { PropDef } from '../props/index.js';

const tooltipPropDefs = {
  content: { type: 'ReactNode', default: undefined, required: true },
} satisfies {
  content: PropDef<React.ReactNode>;
};

export { tooltipPropDefs };
