import classNames from 'classnames';
import * as React from 'react';
import { Responsive, withBreakpoints } from '../helpers';
import { Text } from './text';
import { DataListRootProps } from './data-list.props';

/*
 * TODO
 * - setup margin props
 * - fixup types / enum
 * - add support for minWidth maxWidth for label
 * - support for gapX & gapY as row-gap and column-gap
 */

const DataListRoot = React.forwardRef<HTMLDListElement, DataListRootProps>(
  ({ children, gap = '4', direction = 'row', size = '2' }, forwardedRef) => (
    <Text asChild size={size}>
      <dl
        ref={forwardedRef}
        className={classNames(
          'rt-DataListRoot',
          withBreakpoints(gap, 'rt-r-gap'),
          withBreakpoints(direction, 'rt-r-direction')
        )}
      >
        {children}
      </dl>
    </Text>
  )
);

DataListRoot.displayName = 'DataListRootGrid';

interface DataListItemProps extends React.ComponentPropsWithRef<'div'> {
  align?: Responsive<'start' | 'center' | 'end' | 'baseline'>;
}

const DataListItem = React.forwardRef<HTMLDivElement, DataListItemProps>(
  ({ align, className, ...props }, forwardedRef) => (
    <div
      ref={forwardedRef}
      className={classNames(
        className,
        'rt-DataListItem',
        withBreakpoints(align, 'rt-r-va', {
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
  ({ className, style, width = '200px', ...props }, forwardedRef) => (
    <dt
      ref={forwardedRef}
      className={classNames(className, 'rt-DataListLabel')}
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
    <dd ref={forwardedRef} className={classNames(className, 'rt-DataListData')} {...props}>
      <span className="rt-DataListDataInner">
        <span className="rt-DataListDataInnerContents">{children}</span>
      </span>
    </dd>
  )
);

DataListData.displayName = 'DataListData';

export { DataListRoot, DataListItem, DataListLabel, DataListData };
