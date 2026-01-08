import * as React from 'react';
import classNames from 'classnames';

import { Card } from './card.js';
import { Flex } from './flex.js';
import { Heading } from './heading.js';

import type { CardProps } from './card.js';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';

// ============================================================================
// Toolbar Root
// ============================================================================

type ToolbarRootElement = React.ElementRef<'div'>;
type Anchor = 'top' | 'bottom' | 'left' | 'right';
type SpaceScale = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

interface ToolbarRootProps extends Omit<CardProps, 'asChild'> {
  /**
   * Which edge to anchor to. Sets position: sticky and the appropriate edge.
   * @default "top"
   */
  anchor?: Anchor;
  /**
   * Floating variant adds margin from edges for a detached look.
   * When floating, shows full card treatment. When not floating, only shows exposed edge border.
   * @default false
   */
  floating?: boolean;
  /**
   * Margin offset from edges when floating. Uses space scale values.
   * @default "2"
   */
  offset?: SpaceScale;
}

const ToolbarRoot = React.forwardRef<ToolbarRootElement, ToolbarRootProps>(
  (props, forwardedRef) => {
    const {
      anchor = 'top',
      floating = false,
      offset = '2',
      size = '1',
      variant = 'ghost',
      material,
      className,
      style,
      children,
      ...restProps
    } = props;

    const isHorizontal = anchor === 'top' || anchor === 'bottom';
    const internalRef = React.useRef<HTMLDivElement>(null);

    // Merge refs
    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        (internalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    // Measure and expose height/width as CSS variable on parent element
    // so that sibling elements can access it
    React.useEffect(() => {
      const element = internalRef.current;
      if (!element) return;

      const parent = element.parentElement;
      if (!parent) return;

      const updateDimension = () => {
        let dimension = isHorizontal ? element.offsetHeight : element.offsetWidth;

        // For floating toolbars, include the margin offset (2x for top + bottom or left + right)
        if (floating) {
          const computedStyle = getComputedStyle(element);
          const margin = parseFloat(computedStyle.marginTop) || 0;
          dimension += margin * 2;
        }

        if (isHorizontal) {
          parent.style.setProperty('--rt-toolbar-height', `${dimension}px`);
        } else {
          parent.style.setProperty('--rt-toolbar-width', `${dimension}px`);
        }
      };

      updateDimension();

      const resizeObserver = new ResizeObserver(updateDimension);
      resizeObserver.observe(element);

      return () => resizeObserver.disconnect();
    }, [isHorizontal, floating]);

    const floatingStyle = floating
      ? { margin: `var(--space-${offset})`, ...style }
      : style;

    return (
      <Card
        ref={mergedRef}
        size={size}
        variant={variant}
        material={material}
        data-anchor={anchor}
        data-floating={floating || undefined}
        className={classNames('rt-Toolbar', className)}
        style={floatingStyle}
        {...restProps}
      >
        <Flex
          align="center"
          justify="between"
          direction={isHorizontal ? 'row' : 'column'}
          gap="2"
          className="rt-ToolbarInner"
        >
          {children}
        </Flex>
      </Card>
    );
  },
);
ToolbarRoot.displayName = 'Toolbar.Root';

// ============================================================================
// Toolbar Left (for horizontal) / Start (alias)
// ============================================================================

type ToolbarSectionElement = React.ElementRef<'div'>;
interface ToolbarSectionProps extends ComponentPropsWithout<'div', RemovedProps> {}

const ToolbarLeft = React.forwardRef<ToolbarSectionElement, ToolbarSectionProps>(
  ({ className, children, ...props }, forwardedRef) => (
    <Flex
      ref={forwardedRef}
      align="center"
      gap="2"
      flexShrink="0"
      className={classNames('rt-ToolbarSection', 'rt-ToolbarLeft', className)}
      {...props}
    >
      {children}
    </Flex>
  ),
);
ToolbarLeft.displayName = 'Toolbar.Left';

// ============================================================================
// Toolbar Center
// ============================================================================

const ToolbarCenter = React.forwardRef<ToolbarSectionElement, ToolbarSectionProps>(
  ({ className, children, ...props }, forwardedRef) => (
    <Flex
      ref={forwardedRef}
      align="center"
      justify="center"
      flexGrow="1"
      minWidth="0"
      className={classNames('rt-ToolbarSection', 'rt-ToolbarCenter', className)}
      {...props}
    >
      {children}
    </Flex>
  ),
);
ToolbarCenter.displayName = 'Toolbar.Center';

// ============================================================================
// Toolbar Right (for horizontal) / End (alias)
// ============================================================================

const ToolbarRight = React.forwardRef<ToolbarSectionElement, ToolbarSectionProps>(
  ({ className, children, ...props }, forwardedRef) => (
    <Flex
      ref={forwardedRef}
      align="center"
      gap="2"
      flexShrink="0"
      className={classNames('rt-ToolbarSection', 'rt-ToolbarRight', className)}
      {...props}
    >
      {children}
    </Flex>
  ),
);
ToolbarRight.displayName = 'Toolbar.Right';

// ============================================================================
// Toolbar Title
// ============================================================================

type ToolbarTitleElement = React.ElementRef<typeof Heading>;
interface ToolbarTitleProps extends React.ComponentPropsWithoutRef<typeof Heading> {}

const ToolbarTitle = React.forwardRef<ToolbarTitleElement, ToolbarTitleProps>(
  ({ className, size = '3', weight = 'medium', truncate = true, children, ...props }, forwardedRef) => (
    <Heading
      ref={forwardedRef}
      size={size}
      weight={weight}
      truncate={truncate}
      className={classNames('rt-ToolbarTitle', className)}
      {...props}
    >
      {children}
    </Heading>
  ),
);
ToolbarTitle.displayName = 'Toolbar.Title';

// ============================================================================
// Exports
// ============================================================================

const Toolbar = ToolbarRoot as typeof ToolbarRoot & {
  Left: typeof ToolbarLeft;
  Center: typeof ToolbarCenter;
  Right: typeof ToolbarRight;
  Title: typeof ToolbarTitle;
};

Toolbar.Left = ToolbarLeft;
Toolbar.Center = ToolbarCenter;
Toolbar.Right = ToolbarRight;
Toolbar.Title = ToolbarTitle;

export {
  Toolbar,
  ToolbarRoot as Root,
  ToolbarLeft as Left,
  ToolbarCenter as Center,
  ToolbarRight as Right,
  ToolbarTitle as Title,
};
export type {
  ToolbarRootProps as RootProps,
  ToolbarSectionProps as LeftProps,
  ToolbarSectionProps as CenterProps,
  ToolbarSectionProps as RightProps,
  ToolbarTitleProps as TitleProps,
};
