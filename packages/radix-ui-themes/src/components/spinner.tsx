import * as React from 'react';
import classNames from 'classnames';
import { Flex } from './flex';
import { spinnerPropDefs } from './spinner.props';
import { extractProps, marginPropDefs } from '../helpers';
import { VisuallyHidden } from './visually-hidden';

import type { MarginProps, GetPropDefTypes, PropsWithoutRefOrColor } from '../helpers';

type SpinnerElement = React.ElementRef<'span'>;
type SpinnerOwnProps = GetPropDefTypes<typeof spinnerPropDefs>;
interface SpinnerProps extends PropsWithoutRefOrColor<'span'>, MarginProps, SpinnerOwnProps {}
const Spinner = React.forwardRef<SpinnerElement, SpinnerProps>((props, forwardedRef) => {
  const { className, children, loading, ...spinnerProps } = extractProps(
    props,
    spinnerPropDefs,
    marginPropDefs
  );

  if (!loading) return <>{children}</>;

  const spinner = (
    <span {...spinnerProps} ref={forwardedRef} className={classNames('rt-Spinner', className)}>
      <span className="rt-SpinnerLeaf" />
      <span className="rt-SpinnerLeaf" />
      <span className="rt-SpinnerLeaf" />
      <span className="rt-SpinnerLeaf" />
      <span className="rt-SpinnerLeaf" />
      <span className="rt-SpinnerLeaf" />
      <span className="rt-SpinnerLeaf" />
      <span className="rt-SpinnerLeaf" />
    </span>
  );

  if (children === undefined) return spinner;

  return (
    <Flex asChild position="relative" align="center" justify="center">
      <span>
        {/**
         * `display: contents` removes the content from the accessibility tree in some browsers,
         * so we force remove it with `aria-hidden` and re-add it in the tree with `VisuallyHidden`
         */}
        <span style={{ display: 'contents', visibility: 'hidden' }}>{children}</span>
        <VisuallyHidden>{children}</VisuallyHidden>

        <Flex asChild align="center" justify="center" position="absolute" inset="0">
          <span>{spinner}</span>
        </Flex>
      </span>
    </Flex>
  );
});
Spinner.displayName = 'Spinner';

export { Spinner };
export type { SpinnerProps };
