import React from 'react';

type ExtractPropsForTag<C extends React.ElementType<any>, T extends string> = Omit<
  Extract<React.ComponentPropsWithoutRef<C>, { as: T }>,
  'as' | 'asChild'
>;

export type { ExtractPropsForTag };
