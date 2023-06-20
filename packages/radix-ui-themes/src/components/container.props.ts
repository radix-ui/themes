const containerSizes = ['1', '2', '3'] as const;
type ContainerSize = (typeof containerSizes)[number];
const defaultContainerSize: ContainerSize = '3';

export { containerSizes, defaultContainerSize };
export type { ContainerSize };
