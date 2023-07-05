const sectionSizes = ['1', '2', '3'] as const;
type SectionSize = (typeof sectionSizes)[number];
const sectionSizeDefault: SectionSize = '3';

const sectionDisplayValues = ['none', 'block'] as const;
type SectionDisplay = (typeof sectionDisplayValues)[number];

export { sectionSizes, sectionSizeDefault, sectionDisplayValues };
export type { SectionSize, SectionDisplay };
