import classNames from 'classnames';
import * as React from 'react';
import { Text } from './text';
import { extractProps, marginPropDefs } from '../helpers';
import { dataListPropDefs, dataListItemPropDefs, dataListLabelPropDefs } from './data-list.props';

import type { MarginProps, GetPropDefTypes, PropsWithoutRefOrColor } from '../helpers';

type DataListRootElement = HTMLDListElement;
type DataListRootOwnProps = GetPropDefTypes<typeof dataListPropDefs>;
interface DataListRootProps
  extends PropsWithoutRefOrColor<'dl'>,
    MarginProps,
    DataListRootOwnProps {}
const DataListRoot = React.forwardRef<DataListRootElement, DataListRootProps>(
  (props, forwardedRef) => {
    const { className, ...dataListProps } = extractProps(props, dataListPropDefs, marginPropDefs);
    return (
      <Text asChild>
        <dl
          {...dataListProps}
          ref={forwardedRef}
          className={classNames(className, 'rt-DataListRoot')}
        />
      </Text>
    );
  }
);
DataListRoot.displayName = 'DataListRoot';

type DataListItemElement = HTMLDivElement;
type DataListItemOwnProps = GetPropDefTypes<typeof dataListItemPropDefs>;
interface DataListItemProps extends PropsWithoutRefOrColor<'div'>, DataListItemOwnProps {}
const DataListItem = React.forwardRef<DataListItemElement, DataListItemProps>(
  (props, forwardedRef) => {
    const { className, ...itemProps } = extractProps(props, dataListItemPropDefs);
    return (
      <div {...itemProps} ref={forwardedRef} className={classNames(className, 'rt-DataListItem')} />
    );
  }
);
DataListItem.displayName = 'DataListItem';

type DataListLabelElement = React.ElementRef<'dt'>;
type DataListLabelOwnProps = GetPropDefTypes<typeof dataListLabelPropDefs>;
interface DataListLabelProps extends PropsWithoutRefOrColor<'dt'>, DataListLabelOwnProps {}
const DataListLabel = React.forwardRef<DataListLabelElement, DataListLabelProps>(
  (props, forwardedRef) => {
    const { className, color, ...labelProps } = extractProps(props, dataListLabelPropDefs);
    return (
      <dt
        {...labelProps}
        data-accent-color={color}
        ref={forwardedRef}
        className={classNames(className, 'rt-DataListLabel')}
      />
    );
  }
);
DataListLabel.displayName = 'DataListLabel';

type DataListValueElement = React.ElementRef<'dd'>;
interface DataListValueProps extends PropsWithoutRefOrColor<'dd'> {}
const DataListValue = React.forwardRef<DataListValueElement, DataListValueProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <dd
      {...props}
      ref={forwardedRef}
      className={classNames(className, 'rt-reset', 'rt-DataListValue')}
    >
      {children}
    </dd>
  )
);
DataListValue.displayName = 'DataListValue';

const DataList = Object.assign(
  {},
  {
    Root: DataListRoot,
    Item: DataListItem,
    Label: DataListLabel,
    Data: DataListValue,
  }
);
export { DataList, DataListRoot, DataListItem, DataListLabel, DataListValue };
export type { DataListRootProps, DataListItemProps, DataListLabelProps, DataListValueProps };
