'use client';

import * as React from 'react';
import classNames from 'classnames';
import { useVirtualizer } from '@tanstack/react-virtual';

/**
 * VirtualMenu - A virtualized menu component for rendering large lists efficiently.
 * 
 * Uses TanStack Virtual to render only visible items.
 * Works inside any container (DropdownMenu.Content, Sidebar.Content, Popover.Content, etc.)
 * 
 * @example
 * <VirtualMenu items={items} onSelect={handleSelect}>
 *   {(item, { isHighlighted, ...props }) => (
 *     <VirtualMenu.Item {...props}>{item.label}</VirtualMenu.Item>
 *   )}
 * </VirtualMenu>
 */

// ============================================================================
// Constants
// ============================================================================

/** Stable no-op function to avoid creating new references */
const noop = () => {};

// ============================================================================
// Types
// ============================================================================

interface VirtualMenuItemRenderProps {
  /** Whether this item is currently highlighted (keyboard/hover) */
  isHighlighted: boolean;
  /** Positioning styles - must be applied for virtualization to work */
  style: React.CSSProperties;
  /** Menu item role */
  role: 'menuitem';
  /** Tab index for focus management */
  tabIndex: number;
  /** Position in set for accessibility */
  'aria-posinset': number;
  /** Total set size for accessibility */
  'aria-setsize': number;
  /** Data attribute for CSS styling */
  'data-highlighted': true | undefined;
  /** Mouse enter handler for hover highlighting */
  onMouseEnter: () => void;
  /** Mouse leave handler */
  onMouseLeave: () => void;
  /** Click handler for selection */
  onClick: () => void;
  /** Keyboard handler */
  onKeyDown: (e: React.KeyboardEvent) => void;
}

interface VirtualMenuProps<T> {
  /** Array of items to render */
  items: T[];
  /**
   * Estimated height of each item in pixels.
   * Can be a number (same for all) or a function (per-item).
   * @default 36
   * @example
   * // Fixed height
   * estimatedItemSize={36}
   * // Variable heights
   * estimatedItemSize={(index) => items[index].type === 'header' ? 48 : 36}
   */
  estimatedItemSize?: number | ((index: number) => number);
  /** Number of items to render outside visible area (default: 5) */
  overscan?: number;
  /** Callback when an item is selected */
  onSelect?: (item: T, index: number) => void;
  /** Render function for each item */
  children: (item: T, props: VirtualMenuItemRenderProps) => React.ReactNode;
  /** Additional class name for the root element */
  className?: string;
  /** Additional styles for the root element */
  style?: React.CSSProperties;
  /** Accessible label for the menu */
  'aria-label'?: string;
}

// ============================================================================
// VirtualMenu Component
// ============================================================================

function VirtualMenuRoot<T>({
  items,
  estimatedItemSize = 36,
  overscan = 5,
  onSelect,
  children,
  className,
  style,
  'aria-label': ariaLabel,
}: VirtualMenuProps<T>) {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1);

  // Derive safe highlighted index - clamp to valid range when items change
  // This avoids useEffect and keeps highlight stable when possible
  const safeHighlightedIndex = React.useMemo(() => {
    if (items.length === 0) return -1;
    if (highlightedIndex < 0) return -1;
    return Math.min(highlightedIndex, items.length - 1);
  }, [highlightedIndex, items.length]);

  // Normalize estimatedItemSize to always be a function
  const getItemSize = React.useMemo(
    () =>
      typeof estimatedItemSize === 'function'
        ? estimatedItemSize
        : () => estimatedItemSize,
    [estimatedItemSize],
  );

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: getItemSize,
    overscan,
  });

  const virtualItems = virtualizer.getVirtualItems();

  // Handle keyboard navigation
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          const nextIndex =
            safeHighlightedIndex < items.length - 1 ? safeHighlightedIndex + 1 : 0;
          setHighlightedIndex(nextIndex);
          virtualizer.scrollToIndex(nextIndex, { align: 'auto' });
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          const prevIndex =
            safeHighlightedIndex > 0 ? safeHighlightedIndex - 1 : items.length - 1;
          setHighlightedIndex(prevIndex);
          virtualizer.scrollToIndex(prevIndex, { align: 'auto' });
          break;
        }
        case 'Home': {
          e.preventDefault();
          setHighlightedIndex(0);
          virtualizer.scrollToIndex(0, { align: 'start' });
          break;
        }
        case 'End': {
          e.preventDefault();
          const lastIndex = items.length - 1;
          setHighlightedIndex(lastIndex);
          virtualizer.scrollToIndex(lastIndex, { align: 'end' });
          break;
        }
        case 'Enter':
        case ' ': {
          e.preventDefault();
          if (safeHighlightedIndex >= 0 && safeHighlightedIndex < items.length) {
            onSelect?.(items[safeHighlightedIndex], safeHighlightedIndex);
          }
          break;
        }
      }
    },
    [safeHighlightedIndex, items, onSelect, virtualizer],
  );

  // Create item props generator
  const getItemProps = React.useCallback(
    (index: number, virtualRow: { start: number; size: number }): VirtualMenuItemRenderProps => ({
      isHighlighted: safeHighlightedIndex === index,
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: `${virtualRow.size}px`,
        transform: `translateY(${virtualRow.start}px)`,
      },
      role: 'menuitem',
      tabIndex: safeHighlightedIndex === index ? 0 : -1,
      'aria-posinset': index + 1,
      'aria-setsize': items.length,
      'data-highlighted': safeHighlightedIndex === index ? true : undefined,
      onMouseEnter: () => setHighlightedIndex(index),
      onMouseLeave: noop,
      onClick: () => onSelect?.(items[index], index),
      onKeyDown: handleKeyDown,
    }),
    [safeHighlightedIndex, items, onSelect, handleKeyDown],
  );

  // Memoize root styles to prevent object recreation on each render
  const rootStyle = React.useMemo(
    () => ({
      overflow: 'auto' as const,
      position: 'relative' as const,
      ...style,
    }),
    [style],
  );

  return (
    <div
      ref={parentRef}
      role="menu"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={classNames('rt-VirtualMenuRoot', className)}
      style={rootStyle}
    >
      <div
        className="rt-VirtualMenuViewport"
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualItems.map((virtualRow) => {
          const item = items[virtualRow.index];
          const props = getItemProps(virtualRow.index, virtualRow);
          return (
            <React.Fragment key={virtualRow.key}>
              {children(item, props)}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

VirtualMenuRoot.displayName = 'VirtualMenu';

// ============================================================================
// VirtualMenu.Item Component
// ============================================================================

interface VirtualMenuItemProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
}

const VirtualMenuItem = React.forwardRef<HTMLDivElement, VirtualMenuItemProps>(
  ({ className, children, ...props }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        className={classNames('rt-reset', 'rt-BaseMenuItem', 'rt-VirtualMenuItem', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

VirtualMenuItem.displayName = 'VirtualMenu.Item';

// ============================================================================
// Exports
// ============================================================================

const VirtualMenu = Object.assign(VirtualMenuRoot, {
  Item: VirtualMenuItem,
});

export { VirtualMenu };
export type { VirtualMenuProps, VirtualMenuItemProps, VirtualMenuItemRenderProps };
