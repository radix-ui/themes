import * as React from 'react';
import classNames from 'classnames';

import { tableRootPropDefs, tableRowPropDefs, tableCellPropDefs } from './table.props.js';
import { extractProps } from '../helpers/extract-props.js';
import { getResponsiveClassNames } from '../helpers/get-responsive-styles.js';
import { marginPropDefs } from '../props/margin.props.js';
import { ScrollArea } from './scroll-area.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { MarginProps } from '../props/margin.props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

type TableRootElement = React.ElementRef<'div'>;
type TableRootOwnProps = GetPropDefTypes<typeof tableRootPropDefs>;
interface TableRootProps
  extends ComponentPropsWithout<'div', RemovedProps>,
    MarginProps,
    TableRootOwnProps {}
const TableRoot = React.forwardRef<TableRootElement, TableRootProps>((props, forwardedRef) => {
  const { layout: layoutPropDef, ...rootPropDefs } = tableRootPropDefs;
  const { className, children, layout, ...rootProps } = extractProps(
    props,
    rootPropDefs,
    marginPropDefs
  );
  const tableLayoutClassNames = getResponsiveClassNames({
    value: layout,
    className: tableRootPropDefs.layout.className,
    propValues: tableRootPropDefs.layout.values,
  });
  return (
    <div ref={forwardedRef} className={classNames('rt-TableRoot', className)} {...rootProps}>
      <ScrollArea>
        <table className={classNames('rt-TableRootTable', tableLayoutClassNames)}>{children}</table>
      </ScrollArea>
    </div>
  );
});
TableRoot.displayName = 'Table.Root';

type TableHeaderElement = React.ElementRef<'thead'>;
interface TableHeaderProps extends ComponentPropsWithout<'thead', RemovedProps> {}
const TableHeader = React.forwardRef<TableHeaderElement, TableHeaderProps>(
  ({ className, ...props }, forwardedRef) => (
    <thead {...props} ref={forwardedRef} className={classNames('rt-TableHeader', className)} />
  )
);
TableHeader.displayName = 'Table.Header';

type TableBodyElement = React.ElementRef<'tbody'>;
interface TableBodyProps extends ComponentPropsWithout<'tbody', RemovedProps> {}
const TableBody = React.forwardRef<TableBodyElement, TableBodyProps>(
  ({ className, ...props }, forwardedRef) => (
    <tbody {...props} ref={forwardedRef} className={classNames('rt-TableBody', className)} />
  )
);
TableBody.displayName = 'Table.Body';

type TableRowElement = React.ElementRef<'tr'>;
type TableRowOwnProps = GetPropDefTypes<typeof tableRowPropDefs>;
interface TableRowProps extends ComponentPropsWithout<'tr', RemovedProps>, TableRowOwnProps {}
const TableRow = React.forwardRef<TableRowElement, TableRowProps>((props, forwardedRef) => {
  const { className, ...rowProps } = extractProps(props, tableRowPropDefs);
  return <tr {...rowProps} ref={forwardedRef} className={classNames('rt-TableRow', className)} />;
});
TableRow.displayName = 'Table.Row';

type TableCellElement = React.ElementRef<'td'>;
type TableCellOwnProps = GetPropDefTypes<typeof tableCellPropDefs>;
interface TableCellProps
  extends ComponentPropsWithout<'td', RemovedProps | 'width'>,
    TableCellOwnProps {}
const TableCell = React.forwardRef<TableCellElement, TableCellProps>((props, forwardedRef) => {
  const { className, ...cellProps } = extractProps(props, tableCellPropDefs);
  return <td className={classNames('rt-TableCell', className)} ref={forwardedRef} {...cellProps} />;
});
TableCell.displayName = 'Table.Cell';

type TableColumnHeaderCellElement = React.ElementRef<'th'>;
interface TableColumnHeaderCellProps
  extends ComponentPropsWithout<'th', RemovedProps>,
    TableCellOwnProps {}
const TableColumnHeaderCell = React.forwardRef<
  TableColumnHeaderCellElement,
  TableColumnHeaderCellProps
>((props, forwardedRef) => {
  const { className, ...cellProps } = extractProps(props, tableCellPropDefs);
  return (
    <th
      className={classNames('rt-TableCell', 'rt-TableColumnHeaderCell', className)}
      scope="col"
      ref={forwardedRef}
      {...cellProps}
    />
  );
});
TableColumnHeaderCell.displayName = 'Table.ColumnHeaderCell';

type TableRowHeaderCellElement = React.ElementRef<'th'>;
interface TableRowHeaderCellProps
  extends ComponentPropsWithout<'th', RemovedProps>,
    TableCellOwnProps {}
const TableRowHeaderCell = React.forwardRef<TableRowHeaderCellElement, TableRowHeaderCellProps>(
  (props, forwardedRef) => {
    const { className, ...cellProps } = extractProps(props, tableCellPropDefs);
    return (
      <th
        className={classNames('rt-TableCell', 'rt-TableRowHeaderCell', className)}
        scope="row"
        ref={forwardedRef}
        {...cellProps}
      />
    );
  }
);
TableRowHeaderCell.displayName = 'Table.RowHeaderCell';

export {
  TableRoot as Root,
  TableHeader as Header,
  TableBody as Body,
  TableRow as Row,
  TableCell as Cell,
  TableColumnHeaderCell as ColumnHeaderCell,
  TableRowHeaderCell as RowHeaderCell,
};

export type {
  TableRootProps as RootProps,
  TableHeaderProps as HeaderProps,
  TableBodyProps as BodyProps,
  TableRowProps as RowProps,
  TableCellProps as CellProps,
  TableColumnHeaderCellProps as ColumnHeaderCellProps,
  TableRowHeaderCellProps as RowHeaderCellProps,
};
