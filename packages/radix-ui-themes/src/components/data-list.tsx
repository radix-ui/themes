import { Text } from './text';
import classNames from 'classnames';
import * as React from 'react';
import {
  Responsive,
  withBreakpoints,
  extractMarginProps,
  withMarginProps,
  MarginProps,
  GetPropDefTypes,
} from '../helpers';
import { dataListPropDefs } from './data-list.props';

type DataListRootOwnProps = GetPropDefTypes<typeof dataListPropDefs>;
interface DataListRootProps
  extends React.ComponentPropsWithoutRef<'dl'>,
    MarginProps,
    DataListRootOwnProps {}
const DataListRoot = React.forwardRef<HTMLDListElement, DataListRootProps>(
  (props, forwardedRef) => {
    const { rest: marginRest, ...marginProps } = extractMarginProps(props);
    const { children, columns = '200px 1fr', gap = '4', gapX, gapY, size = '2', trim } = marginRest;
    const direction = columns === 'none' ? 'vertical' : 'row';
    const labelColWidth =
      typeof columns === 'string' && direction !== 'vertical' ? columns.split(' ')[0] : 'auto';

    return (
      <Text asChild size={size} trim={trim}>
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
          style={
            {
              '--data-list-label-width':
                typeof labelColWidth === 'number' ? `${labelColWidth}px` : labelColWidth,
            } as React.CSSProperties
          }
        >
          {children}
        </dl>
      </Text>
    );
  }
);

DataListRoot.displayName = 'DataListRoot';

// the align prop is different than text align
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

interface DataListLabelProps extends React.ComponentPropsWithRef<'dt'> {}

const DataListLabel = React.forwardRef<HTMLElement, DataListLabelProps>(
  ({ className, style, ...props }, forwardedRef) => (
    <dt
      ref={forwardedRef}
      className={classNames(className, 'rt-DataListLabel')}
      style={style as React.CSSProperties}
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
