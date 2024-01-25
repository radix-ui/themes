import { themePropDefs } from '../../theme-options';
import type { PropDef } from '..';

const colorProp = {
  type: 'enum',
  values: themePropDefs.accentColor.values,
  default: '' as (typeof themePropDefs.accentColor.values)[number] | undefined,
} satisfies PropDef<(typeof themePropDefs.accentColor.values)[number]>;

const inheritedColorProp = {
  type: 'enum',
  values: themePropDefs.accentColor.values,
  default: undefined as (typeof themePropDefs.accentColor.values)[number] | undefined,
} satisfies PropDef<(typeof themePropDefs.accentColor.values)[number]>;

// `interface HTMLAttributes` includes 'color', which may lead to clashes
type PropsWithoutRefOrColor<T extends React.ElementType> = Omit<
  React.ComponentPropsWithoutRef<T>,
  'color'
>;

export { colorProp, inheritedColorProp };
export type { PropsWithoutRefOrColor };
