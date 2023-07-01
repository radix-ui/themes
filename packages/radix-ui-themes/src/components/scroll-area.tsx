'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import {
  scrollAreaSizeDefault,
  scrollAreaRadiusDefault,
  scrollAreaScrollbarsDefault,
} from './scroll-area.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { ScrollAreaSize, ScrollAreaScrollbars } from './scroll-area.props';
import type { MarginProps, Responsive } from '../helpers';
import type { ThemeRadius } from '../theme';

type ScrollAreaElement = React.ElementRef<typeof ScrollAreaPrimitive.Viewport>;
interface ScrollAreaProps
  extends React.ComponentPropsWithRef<typeof ScrollAreaPrimitive.Root>,
    Omit<React.ComponentPropsWithRef<typeof ScrollAreaPrimitive.Viewport>, 'dir'>,
    MarginProps {
  size?: Responsive<ScrollAreaSize>;
  radius?: ThemeRadius;
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
    size = scrollAreaSizeDefault,
    radius = scrollAreaRadiusDefault,
    scrollbars = scrollAreaScrollbarsDefault,
    ...viewportProps
  } = marginRest;
  return (
    <ScrollAreaPrimitive.Root
      type={type}
      scrollHideDelay={scrollHideDelay}
      className={classNames('rui-ScrollAreaRoot', withMarginProps(marginProps), className)}
      style={style}
    >
      <ScrollAreaPrimitive.Viewport
        {...viewportProps}
        ref={forwardedRef}
        className="rui-ScrollAreaViewport"
      />

      {scrollbars !== 'vertical' ? (
        <ScrollAreaPrimitive.Scrollbar
          data-radius={radius}
          orientation="horizontal"
          className={classNames('rui-ScrollAreaScrollbar', withBreakpoints(size, 'size'))}
        >
          <ScrollAreaPrimitive.Thumb className="rui-ScrollAreaThumb" />
        </ScrollAreaPrimitive.Scrollbar>
      ) : null}

      {scrollbars !== 'horizontal' ? (
        <ScrollAreaPrimitive.Scrollbar
          data-radius={radius}
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

export { ScrollArea };
