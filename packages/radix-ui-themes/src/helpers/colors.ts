const regularColors = [
  'tomato',
  'red',
  'crimson',
  'pink',
  'plum',
  'purple',
  'violet',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'green',
  'grass',
  'brown',
  'orange',
] as const;

const brightColors = ['sky', 'mint', 'lime', 'yellow', 'amber'] as const;

const metalColors = ['gold', 'bronze'] as const;

const allColors = [...regularColors, ...brightColors, ...metalColors] as const;
type Color = (typeof allColors)[number] | 'gray';

const groupedColors = [
  { label: 'Regulars', colors: [...regularColors] as Color[] },
  { label: 'Brights', colors: [...brightColors] as Color[] },
  { label: 'Metals', colors: [...metalColors] as Color[] },
];

export { regularColors, brightColors, metalColors, allColors, groupedColors };
export type { Color };
