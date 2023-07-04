import { ThemeAccentScale } from '../theme-options';

const codeSizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
type CodeSize = (typeof codeSizes)[number];
const codeSizeDefault: CodeSize | undefined = undefined;

const codeVariants = ['solid', 'soft', 'outline', 'plain'] as const;
type CodeVariant = (typeof codeVariants)[number];
const codeVariantDefault: CodeVariant = 'soft';

const codeWeights = ['normal', 'bold'] as const;
type CodeWeight = (typeof codeWeights)[number];
const codeWeightDefault: CodeWeight = 'normal';

const codeColorDefault: ThemeAccentScale | undefined = undefined;
const codeHighContrastDefault: boolean | undefined = undefined;

export {
  codeSizes,
  codeSizeDefault,
  codeVariants,
  codeVariantDefault,
  codeWeights,
  codeWeightDefault,
  codeColorDefault,
  codeHighContrastDefault,
};
export type { CodeSize, CodeVariant, CodeWeight };
