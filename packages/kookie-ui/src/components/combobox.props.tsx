import { colorPropDef } from '../props/color.prop.js';
import { highContrastPropDef } from '../props/high-contrast.prop.js';
import { radiusPropDef } from '../props/radius.prop.js';
import { widthPropDefs } from '../props/width.props.js';

import type { PropDef } from '../props/prop-def.js';

const sizes = ['1', '2', '3'] as const;

/**
 * Shared responsive sizing + high contrast support inherited by Combobox.Root.
 */
const comboboxRootPropDefs = {
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '2', responsive: true },
  ...highContrastPropDef,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  highContrast: PropDef<boolean>;
};

const triggerVariants = ['classic', 'surface', 'soft', 'outline', 'ghost'] as const;

/**
 * Token-aware props specific to Combobox.Trigger.
 */
const comboboxTriggerPropDefs = {
  variant: { type: 'enum', className: 'rt-variant', values: triggerVariants, default: 'surface' },
  panelBackground: {
    type: 'enum',
    className: 'rt-panel-background',
    values: ['solid', 'translucent'],
  },
  material: { type: 'enum', values: ['solid', 'translucent'] },
  error: { type: 'boolean' },
  loading: { type: 'boolean' },
  disabled: { type: 'boolean' },
  readOnly: { type: 'boolean' },
  ...colorPropDef,
  ...radiusPropDef,
  width: widthPropDefs.width,
  placeholder: { type: 'string' },
} satisfies {
  variant: PropDef<(typeof triggerVariants)[number]>;
  panelBackground: PropDef<'solid' | 'translucent'>;
  material: PropDef<'solid' | 'translucent'>;
  error: PropDef<boolean>;
  loading: PropDef<boolean>;
  disabled: PropDef<boolean>;
  readOnly: PropDef<boolean>;
  width: PropDef<string>;
  placeholder: PropDef<string>;
};

const contentVariants = ['solid', 'soft'] as const;

/**
 * Styling props for the dropdown surface rendered by Combobox.Content.
 */
const comboboxContentPropDefs = {
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '2', responsive: true },
  variant: { type: 'enum', className: 'rt-variant', values: contentVariants, default: 'solid' },
  ...colorPropDef,
  ...highContrastPropDef,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof contentVariants)[number]>;
};

export { comboboxRootPropDefs, comboboxTriggerPropDefs, comboboxContentPropDefs };
