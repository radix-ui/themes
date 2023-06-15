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

const colorScalesByGroup = [
  { label: 'Regulars', colors: regularColors },
  { label: 'Brights', colors: brightColors },
  { label: 'Metals', colors: metalColors },
];

export { regularColors, brightColors, metalColors, allColors, colorScalesByGroup };
export type { Color };
