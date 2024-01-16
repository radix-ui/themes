import classNames from 'classnames';
import * as React from 'react';
import {
  Responsive,
  MarginProps,
  GetPropDefTypes,
  extractProps,
  layoutPropDefs,
  marginPropDefs,
} from '../helpers';
import { Text } from './text';
import { dataListPropDefs } from './data-list.props';

type DataListRootOwnProps = GetPropDefTypes<typeof dataListPropDefs>;
interface DataListRootProps
  extends React.ComponentPropsWithoutRef<'dl'>,
    MarginProps,
    DataListRootOwnProps {}
const DataListRoot = React.forwardRef<HTMLDListElement, DataListRootProps>(
  (props, forwardedRef) => {
    // const { rest: marginRest, ...marginProps } = extractMarginProps(props);

    const { className, ...restProps } = extractProps(
      props,
      dataListPropDefs,
      layoutPropDefs,
      marginPropDefs
    );
    const { children, columns, direction = 'row', gap = '4', gapX, gapY, size = '2' } = restProps;

    console.log({ restProps });
    return (
      <Text asChild size={size}>
        <dl
          ref={forwardedRef}
          className={classNames(
            'rt-DataListRoot'
            // withBreakpoints(gap, 'rt-r-gap'),
            // withBreakpoints(gapX, 'rt-r-gap-x'),
            // withBreakpoints(gapY, 'rt-r-gap-y'),
            // withBreakpoints(direction, 'rt-r-direction'),
            // withMarginProps(marginProps)
          )}
          style={
            typeof columns === 'string'
              ? ({
                  '--data-list-columns': columns,
                } as React.CSSProperties)
              : {}
          }
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
        'rt-DataListItem'
        // withBreakpoints(align, 'rt-r-vaf', {
        //   start: 'top',
        //   center: 'middle',
        //   end: 'bottom',
        // })
      )}
      {...props}
    />
  )
);

DataListItem.displayName = 'DataListItem';

const DataListLabel = React.forwardRef<HTMLElement, React.ComponentPropsWithRef<'dt'>>(
  ({ className, style, ...props }, forwardedRef) => (
    <dt
      ref={forwardedRef}
      className={classNames(className, 'rt-DataListLabel')}
      style={style}
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
