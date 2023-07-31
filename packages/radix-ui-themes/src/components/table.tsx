import * as React from 'react';
import classNames from 'classnames';
import { tableContentPropDefs, tableRowPropDefs, tableCellPropDefs } from './table.props';
import {
  extractMarginProps,
  withMarginProps,
  extractPaddingProps,
  withPaddingProps,
  withBreakpoints,
} from '../helpers';

import type { MarginProps, PaddingProps, GetPropDefTypes } from '../helpers';

type TableRootElement = React.ElementRef<'div'>;
interface TableRootProps extends React.ComponentPropsWithoutRef<'div'>, MarginProps {}
const TableRoot = React.forwardRef<TableRootElement, TableRootProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { className, ...rootProps } = marginRest;
  return (
    <div
      {...rootProps}
      ref={forwardedRef}
      className={classNames('rt-TableRoot', className, withMarginProps(marginProps))}
    />
  );
});
TableRoot.displayName = 'TableRoot';

type TableContentElement = React.ElementRef<'table'>;
type TableContentOwnProps = GetPropDefTypes<typeof tableContentPropDefs>;
interface TableContentProps
  extends React.ComponentPropsWithoutRef<'table'>,
    MarginProps,
    TableContentOwnProps {}
const TableContent = React.forwardRef<TableContentElement, TableContentProps>(
  (props, forwardedRef) => {
    const { rest: marginRest, ...marginProps } = extractMarginProps(props);
    const { className, size = tableContentPropDefs.size.default, ...contentProps } = marginRest;
    return (
      <table
        {...contentProps}
        ref={forwardedRef}
        className={classNames(
          'rt-TableContent',
          className,
          withBreakpoints(size, 'size'),
          withMarginProps(marginProps)
        )}
      />
    );
  }
);
TableContent.displayName = 'Table';

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
  const { className, align = tableRowPropDefs.align.default, ...rowProps } = props;
  return (
    <tr
      {...rowProps}
      ref={forwardedRef}
      className={classNames(
        'rt-TableRow',
        className,
        withBreakpoints(align, 'rt-va', {
          baseline: 'baseline',
          start: 'top',
          center: 'middle',
          end: 'bottom',
        })
      )}
    />
  );
});
TableRow.displayName = 'TableRow';

type TableCellImplElement = React.ElementRef<'td'>;
type TableCellImplOwnProps = GetPropDefTypes<typeof tableCellPropDefs>;
interface TableCellImplProps
  extends Omit<React.ComponentPropsWithoutRef<'td'>, keyof TableCellImplOwnProps>,
    PaddingProps,
    TableCellImplOwnProps {
  tag?: 'td' | 'th';
}
const TableCellImpl = React.forwardRef<TableCellImplElement, TableCellImplProps>(
  (props, forwardedRef) => {
    const { rest: paddingRest, ...paddingProps } = extractPaddingProps(props);
    const {
      tag: Tag = 'td',
      className,
      style,
      justify = tableCellPropDefs.justify.default,
      width = tableCellPropDefs.width.default,
      ...cellProps
    } = paddingRest;
    return (
      <Tag
        {...cellProps}
        ref={forwardedRef}
        className={classNames(
          'rt-TableCell',
          className,
          withPaddingProps(paddingProps),
          withBreakpoints(justify, 'rt-ta', { start: 'left', center: 'center', end: 'right' })
        )}
        style={{ width, ...style }}
      />
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
    PaddingProps,
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
    PaddingProps,
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
    Content: TableContent,
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
  TableContent,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumnHeaderCell,
  TableRowHeaderCell,
};
