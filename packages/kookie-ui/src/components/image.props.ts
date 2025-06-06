import { asChildPropDef } from '../props/as-child.prop.js';
import { radiusPropDef } from '../props/radius.prop.js';
import { shadowPropDefs } from '../props/shadow.props.js';

import type { PropDef } from '../props/prop-def.js';

const objectFitValues = ['cover', 'contain', 'fill', 'scale-down', 'none'] as const;
const variants = ['surface', 'blur'] as const;

const imagePropDefs = {
  ...asChildPropDef,
  /**
   * Sets the CSS **object-fit** property.
   * Controls how the image should be resized to fit its container.
   *
   * @example
   * fit="cover"
   * fit="contain"
   *
   * @link
   * https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
   */
  fit: {
    type: 'enum',
    className: 'rt-r-fit',
    values: objectFitValues,
    default: 'cover',
    responsive: true,
  },
  /**
   * Sets the visual variant of the image.
   *
   * @example
   * variant="surface"
   * variant="blur"
   */
  variant: {
    type: 'enum',
    className: 'rt-variant',
    values: variants,
    default: 'surface',
  },
  ...radiusPropDef,
  ...shadowPropDefs,
} satisfies {
  fit: PropDef<(typeof objectFitValues)[number]>;
  variant: PropDef<(typeof variants)[number]>;
};

export { imagePropDefs };
