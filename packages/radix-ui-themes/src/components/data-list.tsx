import classNames from 'classnames';
import * as React from 'react';
import { MarginProps, GetPropDefTypes, extractProps, marginPropDefs } from '../helpers';
import { dataListPropDefs, dataListItemPropDefs, dataListLabelPropDefs } from './data-list.props';

type DataListRootOwnProps = GetPropDefTypes<typeof dataListPropDefs>;
interface DataListRootProps
  extends React.ComponentPropsWithoutRef<'dl'>,
    MarginProps,
    DataListRootOwnProps {}
const DataListRoot = React.forwardRef<HTMLDListElement, DataListRootProps>(
  (props, forwardedRef) => {
    const { className, ...dataListProps } = extractProps(props, dataListPropDefs, marginPropDefs);
    return (
      <dl
        ref={forwardedRef}
        className={classNames(className, 'rt-DataListRoot', 'rt-Text')}
        {...dataListProps}
      />
    );
  }
);
DataListRoot.displayName = 'DataListRootGrid';

interface DataListItemProps
  extends React.ComponentPropsWithRef<'div'>,
    GetPropDefTypes<typeof dataListItemPropDefs> {}
const DataListItem = React.forwardRef<HTMLDivElement, DataListItemProps>((props, forwardedRef) => {
  const { className, ...itemProps } = extractProps(props, dataListItemPropDefs);
  return (
    <div ref={forwardedRef} className={classNames(className, 'rt-DataListItem')} {...itemProps} />
  );
});
DataListItem.displayName = 'DataListItem';

interface DataListLabelProps
  extends React.ComponentPropsWithRef<'dt'>,
    GetPropDefTypes<typeof dataListLabelPropDefs> {}
const DataListLabel = React.forwardRef<HTMLElement, DataListLabelProps>((props, forwardedRef) => {
  const { className, minWidth, maxWidth, width, ...labelProps } = extractProps(
    props,
    dataListLabelPropDefs
  );
  return (
    <dt
      ref={forwardedRef}
      className={classNames(className, 'rt-DataListLabel')}
      {...labelProps}
      style={
        {
          '--data-list-label-width': width,
          '--data-list-label-min-width': minWidth,
          '--data-list-label-max-width': maxWidth,
          ...labelProps.style,
        } as React.CSSProperties
      }
    />
  );
});
DataListLabel.displayName = 'DataListLabel';

const DataListData = React.forwardRef<HTMLElement, React.ComponentPropsWithRef<'dd'>>(
  ({ children, className, ...props }, forwardedRef) => (
    <dd ref={forwardedRef} className={classNames(className, 'rt-DataListData')} {...props}>
      {children}
    </dd>
  )
);
DataListData.displayName = 'DataListData';

export { DataListRoot, DataListItem, DataListLabel, DataListData };
