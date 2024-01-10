import classNames from 'classnames';
import * as React from 'react';
import { Responsive, withBreakpoints } from '../helpers';
import { Flex } from './flex';
import { Text } from './text';
import { DataListRootProps } from './data-list.props';

/*
 * decide what to do with layout prop
 * - label width
 */

const DataListRoot = React.forwardRef<HTMLDListElement, DataListRootProps>(
  ({ children, gap = '4', gapX, gapY, direction = 'row', size = '2' }, forwardedRef) => (
    <Flex asChild gap={gap} direction="column">
      <Text asChild size={size}>
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
    </Flex>
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

export { DataListRoot, DataListItem, DataListLabel, DataListData };
