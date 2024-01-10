import { Text } from '@radix-ui/themes';
import classNames from 'classnames';
import * as React from 'react';
import { MarginProps, PropsWithoutRefOrColor, Responsive, withBreakpoints } from '../helpers';

interface DataListRootProps extends PropsWithoutRefOrColor<'dl'>, MarginProps {
  gap?: Responsive<'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'>;
  gapX?: Responsive<'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'>;
  gapY?: Responsive<'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'>;
  size?: React.ComponentPropsWithoutRef<typeof Text>['size'];
  trim?: React.ComponentPropsWithoutRef<typeof Text>['trim'];
  layout?: Responsive<'horizontal' | 'vertical'>;
}

/*
 * decide what to do with layout prop
 * - gap prop?
 * - label width
 */

const DataListRoot = React.forwardRef<HTMLDListElement, DataListRootProps>(
  (
    { children, gap = '4', gapX, gapY, layout = 'horizontal', size = '2', ...props },
    forwardedRef
  ) => (
    <Text asChild size={size} {...props}>
      <dl
        ref={forwardedRef}
        className={classNames(
          'DataListRoot',
          withBreakpoints(gap, 'gap'),
          withBreakpoints(gapX, 'gap-x'),
          withBreakpoints(gapY, 'gap-y'),
          withBreakpoints(layout, 'layout')
        )}
      >
        {children}
      </dl>
    </Text>
  )
);

DataListRoot.displayName = 'DataListRoot';

interface DataListItemProps extends React.ComponentPropsWithRef<'div'> {
  align?: Responsive<'start' | 'center' | 'end' | 'baseline'>;
}

const DataListItem = React.forwardRef<HTMLDivElement, DataListItemProps>(
  ({ align, className, ...props }, forwardedRef) => (
    <div
      ref={forwardedRef}
      className={classNames(
        className,
        'DataListItem',
        withBreakpoints(align, 'va', {
          start: 'top',
          center: 'middle',
          end: 'bottom',
        })
      )}
      {...props}
    />
  )
);

DataListItem.displayName = 'DataListItem';

interface DataListLabelProps extends React.ComponentPropsWithRef<'dt'> {
  width?: number | string;
}

const DataListLabel = React.forwardRef<HTMLElement, DataListLabelProps>(
  ({ className, style, width, ...props }, forwardedRef) => (
    <dt
      ref={forwardedRef}
      className={classNames(className, 'DataListLabel')}
      style={
        {
          '--data-list-label-width': typeof width === 'number' ? `${width}px` : width,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  )
);

DataListLabel.displayName = 'DataListLabel';

const DataListData = React.forwardRef<HTMLElement, React.ComponentPropsWithRef<'dd'>>(
  ({ children, className, ...props }, forwardedRef) => (
    <dd ref={forwardedRef} className={classNames(className, 'DataListData')} {...props}>
      <span className="DataListDataInner">
        <span className="DataListDataInnerContents">{children}</span>
      </span>
    </dd>
  )
);

DataListData.displayName = 'DataListData';

export const DataList = {
  Root: DataListRoot,
  Item: DataListItem,
  Label: DataListLabel,
  Data: DataListData,
};
