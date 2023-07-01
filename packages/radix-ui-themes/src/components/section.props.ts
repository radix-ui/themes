const sectionSizes = ['1', '2', '3'] as const;
type SectionSize = (typeof sectionSizes)[number];
const sectionSizeDefault: SectionSize = '3';

export { sectionSizes, sectionSizeDefault };
export type { SectionSize };
