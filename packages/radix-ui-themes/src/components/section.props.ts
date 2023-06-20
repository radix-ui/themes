const sectionSizes = ['1', '2', '3'] as const;
type SectionSize = (typeof sectionSizes)[number];
const defaultSectionSize: SectionSize = '3';

export { sectionSizes, defaultSectionSize };
export type { SectionSize };
