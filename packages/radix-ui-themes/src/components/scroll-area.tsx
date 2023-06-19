'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';

import type { MarginProps, ButtonRadius, Responsive } from '../helpers';

const scrollAreaSizes = ['1', '2', '3'] as const;
type ScrollAreaSize = (typeof scrollAreaSizes)[number];
const defaultScrollAreaSize: ScrollAreaSize = '1';

const defaultScrollAreaRadius: ButtonRadius | undefined = undefined;

const scrollAreaScrollbarsValues = ['vertical', 'horizontal', 'both'] as const;
type ScrollAreaScrollbars = (typeof scrollAreaScrollbarsValues)[number];
const defaultScrollAreaScrollbars: ScrollAreaScrollbars = 'both';

type ScrollAreaElement = React.ElementRef<typeof ScrollAreaPrimitive.Viewport>;
interface ScrollAreaProps
  extends React.ComponentPropsWithRef<typeof ScrollAreaPrimitive.Root>,
    Omit<React.ComponentPropsWithRef<typeof ScrollAreaPrimitive.Viewport>, 'dir'>,
    MarginProps {
  size?: Responsive<ScrollAreaSize>;
  radius?: ButtonRadius;
  scrollbars?: ScrollAreaScrollbars;
}
const ScrollArea = React.forwardRef<ScrollAreaElement, ScrollAreaProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    style,
    type,
    scrollHideDelay = type !== 'scroll' ? 0 : undefined,
    dir,
    size = defaultScrollAreaSize,
    radius = defaultScrollAreaRadius,
    scrollbars = defaultScrollAreaScrollbars,
    ...viewportProps
  } = marginRest;

  return (
    <ScrollAreaPrimitive.Root
      type={type}
      scrollHideDelay={scrollHideDelay}
      className={classNames('rui-ScrollAreaRoot', withMargin(marginProps), className)}
      style={style}
    >
      <ScrollAreaPrimitive.Viewport
        {...viewportProps}
        ref={forwardedRef}
        className="rui-ScrollAreaViewport"
      />

      {scrollbars !== 'vertical' ? (
        <ScrollAreaPrimitive.Scrollbar
          data-button-radius={radius}
          orientation="horizontal"
          className={classNames('rui-ScrollAreaScrollbar', withBreakpoints(size, 'size'))}
        >
          <ScrollAreaPrimitive.Thumb className="rui-ScrollAreaThumb" />
        </ScrollAreaPrimitive.Scrollbar>
      ) : null}

      {scrollbars !== 'horizontal' ? (
        <ScrollAreaPrimitive.Scrollbar
          data-button-radius={radius}
          orientation="vertical"
          className={classNames('rui-ScrollAreaScrollbar', withBreakpoints(size, 'size'))}
        >
          <ScrollAreaPrimitive.Thumb className="rui-ScrollAreaThumb" />
        </ScrollAreaPrimitive.Scrollbar>
      ) : null}

      {scrollbars === 'both' ? (
        <ScrollAreaPrimitive.Corner className="rui-ScrollAreaCorner" />
      ) : null}
    </ScrollAreaPrimitive.Root>
  );
});
ScrollArea.displayName = 'ScrollArea';

export {
  scrollAreaSizes,
  defaultScrollAreaSize,
  defaultScrollAreaRadius,
  scrollAreaScrollbarsValues,
  defaultScrollAreaScrollbars,
  ScrollArea,
};
export type { ScrollAreaSize, ScrollAreaScrollbars };
