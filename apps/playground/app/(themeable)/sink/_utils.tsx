export function upperFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const colorsRegular = [
  'tomato',
  'red',
  'ruby',
  'crimson',
  'pink',
  'plum',
  'purple',
  'violet',
  'iris',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'jade',
  'green',
  'grass',
  'brown',
  'orange',
] as const;
export const colorsBright = ['sky', 'mint', 'lime', 'yellow', 'amber'] as const;
export const colorsMetal = ['gold', 'bronze'] as const;
export const accentColorsGrouped = [
  { label: 'Regulars', values: colorsRegular },
  { label: 'Brights', values: colorsBright },
  { label: 'Metals', values: colorsMetal },
  { label: 'Gray', values: ['gray'] as const },
];
