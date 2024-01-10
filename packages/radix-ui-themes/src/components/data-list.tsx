import classNames from 'classnames';
import * as React from 'react';
import { Responsive, withBreakpoints } from '../helpers';
import { Flex } from './flex';
import { Grid } from './grid';
import { Text } from './text';
import { DataListRootProps } from './data-list.props';

/*
 * decide what to do with layout prop
 * - gap prop?
 * - label width
 * - trim?
 */

const DataListRoot = React.forwardRef<HTMLDListElement, DataListRootProps>(
  ({ children, gap = '4', gapX, gapY, layout = 'horizontal', size = '2', trim }, forwardedRef) => (
    <Text asChild size={size} trim={trim}>
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

const DataListRootGrid = React.forwardRef<HTMLDListElement, DataListRootProps>(
  (
    { children, gap = '4', gapX, gapY, columns, rows, direction = 'row', size = '2', trim },
    forwardedRef
  ) => (
    <Grid asChild gap={gap} gapX={gapX} gapY={gapY} columns={columns} rows={rows}>
      <Text asChild size={size} trim={trim}>
        <dl
          ref={forwardedRef}
          className={classNames(
            'DataListRoot',
            withBreakpoints(gap, 'gap'),
            withBreakpoints(gapX, 'gap-x'),
            withBreakpoints(gapY, 'gap-y'),
            withBreakpoints(direction, 'direction')
          )}
        >
          {children}
        </dl>
      </Text>
    </Grid>
  )
);

DataListRootGrid.displayName = 'DataListRootGrid';

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

export { DataListRoot, DataListRootGrid, DataListItem, DataListLabel, DataListData };
