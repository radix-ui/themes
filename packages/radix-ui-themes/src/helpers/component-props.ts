import type React from 'react';

type ComponentPropsAs<C extends React.ElementType<any>, T extends string> = Omit<
  Extract<React.ComponentPropsWithoutRef<C>, { as: T }>,
  'as' | 'asChild'
>;

// Omits the specified props from the component props. Autocomplete will suggest props
// of the component, but won't restrict the omittable props to those that actually exist.
type ComponentPropsWithout<
  O extends
    | Omit<string, keyof React.ComponentPropsWithoutRef<T>>
    | keyof React.ComponentPropsWithoutRef<T>,
  T extends React.ElementType
> = Omit<React.ComponentPropsWithoutRef<T>, O & string>;

type RemovedProps = 'asChild' | 'defaultChecked' | 'defaultValue' | 'color';

export type { ComponentPropsAs, ComponentPropsWithout, RemovedProps };

// TODO ComponentPropsAs swap argument
