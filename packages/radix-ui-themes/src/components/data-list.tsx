import classNames from 'classnames';
import * as React from 'react';
import { Responsive, withBreakpoints } from '../helpers';
import { Flex } from './flex';
import { Grid } from './grid';
import { Text } from './text';
import { DataListRootProps } from './data-list.props';

/*
 * decide what to do with layout prop
 * - label width
 * - setup margin props
 * - handle 'initial etc'
 * - align isn't doing anything?
 */

const DataListRoot = React.forwardRef<HTMLDListElement, DataListRootProps>(
  ({ children, gap = '4', direction = 'row', labelWidth = '200px', size = '2' }, forwardedRef) => (
    <Grid asChild gap={gap}>
      <Text asChild size={size}>
        <dl
          ref={forwardedRef}
          className={classNames(
            'rt-DataListRoot',
            withBreakpoints(gap, 'rt-r-gap'),
            withBreakpoints(direction, 'rt-r-direction')
          )}
          style={
            {
              '--data-list-label-width':
                typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth,
            } as React.CSSProperties
          }
        >
          {children}
        </dl>
      </Text>
    </Grid>
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
  ({ className, style, width, ...props }, forwardedRef) => (
    <dt
      ref={forwardedRef}
      className={classNames(className, 'rt-DataListLabel')}
      style={
        {
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
