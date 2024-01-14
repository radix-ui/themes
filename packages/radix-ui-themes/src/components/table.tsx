import * as React from 'react';
import classNames from 'classnames';
import { tableRootPropDefs, tableRowPropDefs, tableCellPropDefs } from './table.props';
import { extractProps, getResponsiveClassNames, marginPropDefs } from '../helpers';
import { ScrollArea } from './scroll-area';
import type { MarginProps, GetPropDefTypes } from '../helpers';

type TableRootElement = React.ElementRef<'div'>;
type TableRootOwnProps = GetPropDefTypes<typeof tableRootPropDefs>;
interface TableRootProps
  extends React.ComponentPropsWithoutRef<'div'>,
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
TableRoot.displayName = 'Table';

type TableHeaderElement = React.ElementRef<'thead'>;
interface TableHeaderProps extends React.ComponentPropsWithoutRef<'thead'> {}
const TableHeader = React.forwardRef<TableHeaderElement, TableHeaderProps>(
  (props, forwardedRef) => (
    <thead
      {...props}
      ref={forwardedRef}
      className={classNames('rt-TableHeader', props.className)}
    />
  )
);
TableHeader.displayName = 'TableHeader';

type TableBodyElement = React.ElementRef<'tbody'>;
interface TableBodyProps extends React.ComponentPropsWithoutRef<'tbody'> {}
const TableBody = React.forwardRef<TableBodyElement, TableBodyProps>((props, forwardedRef) => (
  <tbody {...props} ref={forwardedRef} className={classNames('rt-TableBody', props.className)} />
));
TableBody.displayName = 'TableBody';

type TableRowElement = React.ElementRef<'tr'>;
type TableRowOwnProps = GetPropDefTypes<typeof tableRowPropDefs>;
interface TableRowProps
  extends Omit<React.ComponentPropsWithoutRef<'tr'>, keyof TableRowOwnProps>,
    TableRowOwnProps {}
const TableRow = React.forwardRef<TableRowElement, TableRowProps>((props, forwardedRef) => {
  const { className, ...rowProps } = extractProps(props, tableRowPropDefs);
  return <tr {...rowProps} ref={forwardedRef} className={classNames('rt-TableRow', className)} />;
});
TableRow.displayName = 'TableRow';

type TableCellImplElement = React.ElementRef<'td'>;
type TableCellImplOwnProps = GetPropDefTypes<typeof tableCellPropDefs>;
interface TableCellImplProps
  extends Omit<React.ComponentPropsWithoutRef<'td'>, keyof TableCellImplOwnProps>,
    TableCellImplOwnProps {
  tag?: 'td' | 'th';
}
const TableCellImpl = React.forwardRef<TableCellImplElement, TableCellImplProps>(
  (props, forwardedRef) => {
    const { tag: Tag = 'td', className, ...cellProps } = extractProps(props, tableCellPropDefs);
    return (
      <Tag {...cellProps} ref={forwardedRef} className={classNames('rt-TableCell', className)} />
    );
  }
);
TableCellImpl.displayName = 'TableCellImpl';

type TableCellElement = React.ElementRef<typeof TableCellImpl>;
interface TableCellProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TableCellImpl>, 'tag'> {}
const TableCell = React.forwardRef<TableCellElement, TableCellProps>((props, forwardedRef) => (
  <TableCellImpl {...props} tag="td" ref={forwardedRef} />
));
TableCell.displayName = 'TableCell';

type TableColumnHeaderCellElement = React.ElementRef<'th'>;
interface TableColumnHeaderCellProps
  extends Omit<React.ComponentPropsWithoutRef<'th'>, keyof TableCellImplOwnProps>,
    TableCellImplOwnProps {}
const TableColumnHeaderCell = React.forwardRef<
  TableColumnHeaderCellElement,
  TableColumnHeaderCellProps
>((props, forwardedRef) => (
  <TableCellImpl
    scope="col"
    {...props}
    tag="th"
    ref={forwardedRef}
    className={classNames('rt-TableColumnHeaderCell', props.className)}
  />
));
TableColumnHeaderCell.displayName = 'TableColumnHeaderCell';

type TableRowHeaderCellElement = React.ElementRef<'th'>;
interface TableRowHeaderCellProps
  extends Omit<React.ComponentPropsWithoutRef<'th'>, keyof TableCellImplOwnProps>,
    TableCellImplOwnProps {}
const TableRowHeaderCell = React.forwardRef<TableRowHeaderCellElement, TableRowHeaderCellProps>(
  (props, forwardedRef) => (
    <TableCellImpl
      scope="row"
      {...props}
      tag="th"
      ref={forwardedRef}
      className={classNames('rt-TableRowHeaderCell', props.className)}
    />
  )
);
TableRowHeaderCell.displayName = 'TableRowHeaderCell';

const Table = Object.assign(
  {},
  {
    Root: TableRoot,
    Header: TableHeader,
    Body: TableBody,
    Row: TableRow,
    Cell: TableCell,
    ColumnHeaderCell: TableColumnHeaderCell,
    RowHeaderCell: TableRowHeaderCell,
  }
);

export {
  Table,
  TableRoot,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumnHeaderCell,
  TableRowHeaderCell,
};

export type {
  TableRootProps,
  TableHeaderProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
  TableColumnHeaderCellProps,
  TableRowHeaderCellProps,
};
