import type { Color, Radius } from '../helpers';

const switchSizes = ['1', '2', '3'] as const;
type SwitchSize = (typeof switchSizes)[number];
const defaultSwitchSize: SwitchSize = '2';

const switchVariants = ['solid'] as const;
type SwitchVariant = (typeof switchVariants)[number];
const defaultSwitchVariant: SwitchVariant = 'solid';

const defaultSwitchColor: Color | undefined = undefined;
const defaultSwitchHighContrast: boolean | undefined = undefined;
const defaultSwitchRadius: Radius | undefined = undefined;

export {
  switchSizes,
  defaultSwitchSize,
  switchVariants,
  defaultSwitchVariant,
  defaultSwitchColor,
  defaultSwitchHighContrast,
  defaultSwitchRadius,
};
export type { SwitchSize, SwitchVariant };
