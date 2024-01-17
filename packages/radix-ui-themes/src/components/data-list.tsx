import classNames from 'classnames';
import * as React from 'react';
import { MarginProps, GetPropDefTypes, extractProps, marginPropDefs } from '../helpers';
import { Text } from './text';
import { dataListPropDefs, dataListItemPropDefs } from './data-list.props';

/**
 * - do we need to define gap styles again? ✅
 * - use orientation instead of direction ✅
 * - no columns, try width, min and max width
 * - three sizes ✅
 * - think hard on how to make trim work.
 *    - can we exclue the ::before and ::after
 *    - or we can make it span two columns!!!
 */

type DataListRootOwnProps = GetPropDefTypes<typeof dataListPropDefs>;
interface DataListRootProps
  extends React.ComponentPropsWithoutRef<'dl'>,
    MarginProps,
    DataListRootOwnProps {}
const DataListRoot = React.forwardRef<HTMLDListElement, DataListRootProps>(
  (props, forwardedRef) => {
    const { className, children, columns, size, ...dataListProps } = extractProps(
      props,
      dataListPropDefs,
      marginPropDefs
    );
    return (
      <Text asChild size={size}>
        <dl
          ref={forwardedRef}
          {...dataListProps}
          className={classNames(className, 'rt-DataListRoot')}
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

interface DataListItemProps
  extends React.ComponentPropsWithRef<'div'>,
    GetPropDefTypes<typeof dataListItemPropDefs> {}

const DataListItem = React.forwardRef<HTMLDivElement, DataListItemProps>((props, forwardedRef) => {
  const { className, ...dataListItemProps } = extractProps(
    props,
    dataListItemPropDefs,
    marginPropDefs
  );
  return (
    <div
      ref={forwardedRef}
      className={classNames(className, 'rt-DataListItem')}
      {...dataListItemProps}
    />
  );
});

DataListItem.displayName = 'DataListItem';

const DataListLabel = React.forwardRef<HTMLElement, React.ComponentPropsWithRef<'dt'>>(
  ({ className, ...props }, forwardedRef) => (
    <dt ref={forwardedRef} {...props} className={classNames(className, 'rt-DataListLabel')} />
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
