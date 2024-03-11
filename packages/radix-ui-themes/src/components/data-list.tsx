import classNames from 'classnames';
import * as React from 'react';
import { Text } from './text.js';
import { extractProps } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';
import {
  dataListRootPropDefs,
  dataListItemPropDefs,
  dataListLabelPropDefs,
} from './data-list.props.js';

import type { ComponentPropsWithoutColor } from '../helpers/index.js';
import type { MarginProps, GetPropDefTypes } from '../props/index.js';

type DataListRootElement = HTMLDListElement;
type DataListRootOwnProps = GetPropDefTypes<typeof dataListRootPropDefs>;
interface DataListRootProps
  extends ComponentPropsWithoutColor<'dl'>,
    MarginProps,
    DataListRootOwnProps {}
const DataListRoot = React.forwardRef<DataListRootElement, DataListRootProps>(
  (props, forwardedRef) => {
    const { className, ...dataListProps } = extractProps(
      props,
      dataListRootPropDefs,
      marginPropDefs
    );
    return (
      <Text asChild>
        <dl
          {...dataListProps}
          ref={forwardedRef}
          className={classNames('rt-DataListRoot', className)}
        />
      </Text>
    );
  }
);
DataListRoot.displayName = 'DataListRoot';

type DataListItemElement = HTMLDivElement;
type DataListItemOwnProps = GetPropDefTypes<typeof dataListItemPropDefs>;
interface DataListItemProps extends ComponentPropsWithoutColor<'div'>, DataListItemOwnProps {}
const DataListItem = React.forwardRef<DataListItemElement, DataListItemProps>(
  (props, forwardedRef) => {
    const { className, ...itemProps } = extractProps(props, dataListItemPropDefs);
    return (
      <div {...itemProps} ref={forwardedRef} className={classNames('rt-DataListItem', className)} />
    );
  }
);
DataListItem.displayName = 'DataListItem';

type DataListLabelElement = React.ElementRef<'dt'>;
type DataListLabelOwnProps = GetPropDefTypes<typeof dataListLabelPropDefs>;
interface DataListLabelProps extends ComponentPropsWithoutColor<'dt'>, DataListLabelOwnProps {}
const DataListLabel = React.forwardRef<DataListLabelElement, DataListLabelProps>(
  (props, forwardedRef) => {
    const { className, color, ...labelProps } = extractProps(props, dataListLabelPropDefs);
    return (
      <dt
        {...labelProps}
        data-accent-color={color || undefined}
        ref={forwardedRef}
        className={classNames('rt-DataListLabel', className)}
      />
    );
  }
);
DataListLabel.displayName = 'DataListLabel';

type DataListValueElement = React.ElementRef<'dd'>;
interface DataListValueProps extends ComponentPropsWithoutColor<'dd'> {}
const DataListValue = React.forwardRef<DataListValueElement, DataListValueProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <dd {...props} ref={forwardedRef} className={classNames(className, 'rt-DataListValue')}>
      {children}
    </dd>
  )
);
DataListValue.displayName = 'DataListValue';

export { DataListRoot, DataListItem, DataListLabel, DataListValue };
export type { DataListRootProps, DataListItemProps, DataListLabelProps, DataListValueProps };
