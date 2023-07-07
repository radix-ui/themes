import React from 'react';
import type { Responsive } from '../breakpoints';

type BooleanPropDef = {
  type: 'boolean';
  default?: boolean;
  required?: boolean;
};
type ReactNodePropDef = {
  type: 'ReactNode';
  default?: React.ReactNode;
  required?: boolean;
};
type EnumPropDef<T> = {
  type: 'enum';
  values: readonly T[];
  default?: T;
  required?: boolean;
};
type RegularPropDef<T> = BooleanPropDef | ReactNodePropDef | EnumPropDef<T>;
type ResponsivePropDef<T> = RegularPropDef<T> & {
  responsive: true;
};
type PropDef<T = any> = RegularPropDef<T> | ResponsivePropDef<T>;

type GetPropDefType<Def> = Def extends BooleanPropDef
  ? boolean
  : Def extends ReactNodePropDef
  ? React.ReactNode
  : Def extends EnumPropDef<infer Type>
  ? Def extends ResponsivePropDef<infer Type>
    ? Responsive<Type>
    : Type
  : never;

type GetPropDefTypes<P> = {
  [K in keyof P]?: GetPropDefType<P[K]>;
};

export type { PropDef, GetPropDefTypes };
