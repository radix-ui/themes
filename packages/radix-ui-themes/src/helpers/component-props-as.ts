import type React from 'react';

type ComponentPropsAs<C extends React.ElementType<any>, T extends string> = Omit<
  Extract<React.ComponentPropsWithoutRef<C>, { as: T }>,
  'as' | 'asChild'
>;

export type { ComponentPropsAs };
