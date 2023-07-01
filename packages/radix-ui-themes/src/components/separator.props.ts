import type { ThemeAccentScale } from '../theme';

const separatorSizes = ['1', '2', '3', '4'] as const;
type SeparatorSize = (typeof separatorSizes)[number];
const separatorSizeDefault: SeparatorSize = '1';

const separatorColorDefault: ThemeAccentScale | undefined = undefined;

export { separatorSizes, separatorSizeDefault, separatorColorDefault };
export type { SeparatorSize };
