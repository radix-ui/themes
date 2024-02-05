import * as React from 'react';
import classNames from 'classnames';
import { tableRootPropDefs, tableRowPropDefs, tableCellPropDefs } from './table.props.js';
import { extractProps, getResponsiveClassNames, marginPropDefs } from '../helpers/index.js';
import { ScrollArea } from './scroll-area.js';

import type { MarginProps, GetPropDefTypes, PropsWithoutRefOrColor } from '../helpers/index.js';

type TableRootElement = React.ElementRef<'div'>;
type TableRootOwnProps = GetPropDefTypes<typeof tableRootPropDefs>;
interface TableRootProps extends PropsWithoutRefOrColor<'div'>, MarginProps, TableRootOwnProps {}
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
interface TableHeaderProps extends PropsWithoutRefOrColor<'thead'> {}
const TableHeader = React.forwardRef<TableHeaderElement, TableHeaderProps>(
  ({ className, ...props }, forwardedRef) => (
    <thead {...props} ref={forwardedRef} className={classNames('rt-TableHeader', className)} />
  )
);
TableHeader.displayName = 'TableHeader';

type TableBodyElement = React.ElementRef<'tbody'>;
interface TableBodyProps extends PropsWithoutRefOrColor<'tbody'> {}
const TableBody = React.forwardRef<TableBodyElement, TableBodyProps>(
  ({ className, ...props }, forwardedRef) => (
    <tbody {...props} ref={forwardedRef} className={classNames('rt-TableBody', className)} />
  )
);
TableBody.displayName = 'TableBody';

type TableRowElement = React.ElementRef<'tr'>;
type TableRowOwnProps = GetPropDefTypes<typeof tableRowPropDefs>;
interface TableRowProps
  extends Omit<PropsWithoutRefOrColor<'tr'>, keyof TableRowOwnProps>,
    TableRowOwnProps {}
const TableRow = React.forwardRef<TableRowElement, TableRowProps>((props, forwardedRef) => {
  const { className, ...rowProps } = extractProps(props, tableRowPropDefs);
  return <tr {...rowProps} ref={forwardedRef} className={classNames('rt-TableRow', className)} />;
});
TableRow.displayName = 'TableRow';

type TableCellImplElement = React.ElementRef<'td'>;
type TableCellImplOwnProps = GetPropDefTypes<typeof tableCellPropDefs>;
interface TableCellImplProps
  extends Omit<PropsWithoutRefOrColor<'td'>, keyof TableCellImplOwnProps>,
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
interface TableCellProps extends Omit<PropsWithoutRefOrColor<typeof TableCellImpl>, 'tag'> {}
const TableCell = React.forwardRef<TableCellElement, TableCellProps>((props, forwardedRef) => (
  <TableCellImpl {...props} tag="td" ref={forwardedRef} />
));
TableCell.displayName = 'TableCell';

type TableColumnHeaderCellElement = React.ElementRef<'th'>;
interface TableColumnHeaderCellProps
  extends Omit<PropsWithoutRefOrColor<'th'>, keyof TableCellImplOwnProps>,
    TableCellImplOwnProps {}
const TableColumnHeaderCell = React.forwardRef<
  TableColumnHeaderCellElement,
  TableColumnHeaderCellProps
>(({ className, ...props }, forwardedRef) => (
  <TableCellImpl
    scope="col"
    {...props}
    tag="th"
    ref={forwardedRef}
    className={classNames('rt-TableColumnHeaderCell', className)}
  />
));
TableColumnHeaderCell.displayName = 'TableColumnHeaderCell';

type TableRowHeaderCellElement = React.ElementRef<'th'>;
interface TableRowHeaderCellProps
  extends Omit<PropsWithoutRefOrColor<'th'>, keyof TableCellImplOwnProps>,
    TableCellImplOwnProps {}
const TableRowHeaderCell = React.forwardRef<TableRowHeaderCellElement, TableRowHeaderCellProps>(
  ({ className, ...props }, forwardedRef) => (
    <TableCellImpl
      scope="row"
      {...props}
      tag="th"
      ref={forwardedRef}
      className={classNames('rt-TableRowHeaderCell', className)}
    />
  )
);
TableRowHeaderCell.displayName = 'TableRowHeaderCell';

export {
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
