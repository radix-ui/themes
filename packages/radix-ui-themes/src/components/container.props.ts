const containerSizes = ['1', '2', '3'] as const;
type ContainerSize = (typeof containerSizes)[number];
const containerSizeDefault: ContainerSize = '3';

export { containerSizes, containerSizeDefault };
export type { ContainerSize };
