import type { Color } from '../helpers';

const radioGroupSizes = ['1', '2'] as const;
type RadioGroupSize = (typeof radioGroupSizes)[number];
const defaultRadioGroupSize: RadioGroupSize = '1';

const radioGroupVariants = ['solid', 'solid-mono'] as const;
type RadioGroupVariant = (typeof radioGroupVariants)[number];
const defaultRadioGroupVariant: RadioGroupVariant = 'solid';

const defaultRadioGroupColor: Color | undefined = undefined;

export {
  radioGroupSizes,
  defaultRadioGroupSize,
  radioGroupVariants,
  defaultRadioGroupVariant,
  defaultRadioGroupColor,
};
export type { RadioGroupSize, RadioGroupVariant };
