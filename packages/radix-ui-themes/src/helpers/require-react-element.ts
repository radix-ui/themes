import * as React from 'react';

/** A function that throws an error when a value isn't a valid React Element, otherwise returns the value */
export const requireReactElement = <T extends React.ReactNode>(children: T): T => {
  const isReactElement = React.isValidElement(children);

  if (!isReactElement) {
    throw Error(
      `Expected a single React Element child, but got: ${React.Children.toArray(children)
        .map((child) =>
          typeof child === 'object' && 'type' in child && typeof child.type === 'string'
            ? child.type
            : typeof child
        )
        .join(', ')}`
    );
  }

  return children;
};
