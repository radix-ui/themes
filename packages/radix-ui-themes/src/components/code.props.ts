import { ThemeAccentScale } from '../theme';

const codeSizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
type CodeSize = (typeof codeSizes)[number];
const defaultCodeSize: CodeSize | undefined = undefined;

const codeVariants = ['solid', 'soft', 'outline', 'plain'] as const;
type CodeVariant = (typeof codeVariants)[number];
const defaultCodeVariant: CodeVariant = 'soft';

const codeWeights = ['normal', 'bold'] as const;
type CodeWeight = (typeof codeWeights)[number];
const defaultCodeWeight: CodeWeight = 'normal';

const defaultCodeColor: ThemeAccentScale | undefined = undefined;
const defaultCodeHighContrast: boolean | undefined = undefined;

export {
  codeSizes,
  defaultCodeSize,
  codeVariants,
  defaultCodeVariant,
  codeWeights,
  defaultCodeWeight,
  defaultCodeColor,
  defaultCodeHighContrast,
};
export type { CodeSize, CodeVariant, CodeWeight };
