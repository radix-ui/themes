import type { Color, Radius } from '../helpers';

const switchSizes = ['1', '2', '3'] as const;
type SwitchSize = (typeof switchSizes)[number];
const defaultSwitchSize: SwitchSize = '2';

const switchVariants = ['solid', 'solid-mono'] as const;
type SwitchVariant = (typeof switchVariants)[number];
const defaultSwitchVariant: SwitchVariant = 'solid';

const defaultSwitchColor: Color | undefined = undefined;
const defaultSwitchRadius: Radius | undefined = undefined;

export {
  switchSizes,
  defaultSwitchSize,
  switchVariants,
  defaultSwitchVariant,
  defaultSwitchColor,
  defaultSwitchRadius,
};
export type { SwitchSize, SwitchVariant };
