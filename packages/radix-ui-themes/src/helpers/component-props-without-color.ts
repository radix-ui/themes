import type React from 'react';

// `interface HTMLAttributes` includes 'color', which may lead to clashes
export type ComponentPropsWithoutColor<T extends React.ElementType> = Omit<
  React.ComponentPropsWithoutRef<T>,
  'color'
>;
