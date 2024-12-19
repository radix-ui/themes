import * as React from 'react';

/**
 * This is a helper function that is used when a component supports `asChild`
 * using the `Slot` component but its implementation contains nested DOM elements.
 *
 * Using it ensures if a consumer uses the `asChild` prop, the elements are in
 * correct order in the DOM, adopting the intended consumer `children`.
 */
export function getSubtree(
  options: { asChild: boolean | undefined; children: React.ReactNode },
  content: React.ReactNode | ((children: React.ReactNode) => React.ReactNode)
) {
  const { asChild, children } = options;
  if (!asChild) return typeof content === 'function' ? content(children) : content;

  const firstChild = React.Children.only(children) as React.ReactElement;
  return React.cloneElement(firstChild, {
    // @ts-expect-error
    children: typeof content === 'function' ? content(firstChild.props.children) : content,
  });
}
