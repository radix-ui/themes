import type { Color } from '../helpers';

const separatorSizes = ['1', '2', '3', '4'] as const;
type SeparatorSize = (typeof separatorSizes)[number];
const defaultSeparatorSize: SeparatorSize = '1';

const defaultSeparatorColor: Color | undefined = undefined;

export { separatorSizes, defaultSeparatorSize, defaultSeparatorColor };
export type { SeparatorSize };
