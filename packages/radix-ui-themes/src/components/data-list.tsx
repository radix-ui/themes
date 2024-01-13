import classNames from 'classnames';
import * as React from 'react';
import {
  Responsive,
  withBreakpoints,
  MarginProps,
  GetPropDefTypes,
  extractMarginProps,
  withMarginProps,
} from '../helpers';
import { Text } from './text';
import { dataListPropDefs } from './data-list.props';

/*
 * TODO
 * - add support for minWidth maxWidth for label
 */
type DataListRootOwnProps = GetPropDefTypes<typeof dataListPropDefs>;
interface DataListRootProps
  extends React.ComponentPropsWithoutRef<'dl'>,
    MarginProps,
    DataListRootOwnProps {}
const DataListRoot = React.forwardRef<HTMLDListElement, DataListRootProps>(
  (props, forwardedRef) => {
    const { rest: marginRest, ...marginProps } = extractMarginProps(props);
    const { children, direction = 'row', gap = '4', gapX, gapY, size = '2' } = marginRest;
    return (
      <Text asChild size={size}>
        <dl
          ref={forwardedRef}
          className={classNames(
            'rt-DataListRoot',
            withBreakpoints(gap, 'rt-r-gap'),
            withBreakpoints(gapX, 'rt-r-gap-x'),
            withBreakpoints(gapY, 'rt-r-gap-y'),
            withBreakpoints(direction, 'rt-r-direction'),
            withMarginProps(marginProps)
          )}
        >
          {children}
        </dl>
      </Text>
    );
  }
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
  minWidth?: number | string;
  maxWidth?: number | string;
}

const DataListLabel = React.forwardRef<HTMLElement, DataListLabelProps>(
  ({ className, style, width, minWidth = '200px', maxWidth, ...props }, forwardedRef) => (
    <dt
      ref={forwardedRef}
      className={classNames(className, 'rt-DataListLabel')}
      style={
        {
          '--data-list-label-width': typeof width === 'number' ? `${width}px` : width,
          '--data-list-label-min-width': typeof width === 'number' ? `${width}px` : minWidth,
          '--data-list-label-max-width': typeof width === 'number' ? `${width}px` : maxWidth,
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
