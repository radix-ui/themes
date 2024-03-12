import type { PropDef } from './prop-def.js';

const highContrastProp = {
  highContrast: {
    type: 'boolean',
    className: 'rt-high-contrast',
    default: undefined,
  },
} satisfies {
  highContrast: PropDef<boolean>;
};

export { highContrastProp };
