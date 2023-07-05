const containerSizes = ['1', '2', '3'] as const;
type ContainerSize = (typeof containerSizes)[number];
const containerSizeDefault: ContainerSize = '3';

const containerDisplayValues = ['none', 'block'] as const;
type ContainerDisplay = (typeof containerDisplayValues)[number];

export { containerSizes, containerSizeDefault, containerDisplayValues };
export type { ContainerSize, ContainerDisplay };
