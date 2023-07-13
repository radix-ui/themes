import classNames from 'classnames';
import * as React from 'react';
import { extractMarginProps, withMarginProps } from '../helpers';
import { Box } from './box';
import { tablePropDefs } from './table.props';
import type { Responsive, MarginProps, GetPropDefTypes } from '../helpers';

type TableRootOwnProps = GetPropDefTypes<typeof tablePropDefs>;
interface TableRootProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Box>, 'asChild'>,
    TableRootOwnProps {}

const TableRoot = React.forwardRef<HTMLDivElement, TableRootProps>(
  ({ className, radius = tablePropDefs.radius.default, ...props }, forwardedRef) => {
    return (
      <Box
        data-radius={radius}
        ref={forwardedRef}
        className={classNames(className, 'TableRoot')}
        {...props}
      />
    );
  }
);

TableRoot.displayName = 'TableRoot';

interface TableProps extends React.ComponentPropsWithoutRef<'table'>, MarginProps {}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ children, className, defaultValue, ...props }, forwardedRef) => {
    const { rest: tableProps, ...marginProps } = extractMarginProps(props);

    return (
      <table
        ref={forwardedRef}
        className={classNames('Table', withMarginProps(marginProps), className)}
        {...tableProps}
      >
        {children}
      </table>
    );
  }
);

Table.displayName = 'Table';

interface TableHeaderProps extends React.ComponentPropsWithoutRef<'thead'> {}

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, forwardedRef) => (
    <thead ref={forwardedRef} className={classNames(className, 'TableHeader')} {...props} />
  )
);

TableHeader.displayName = 'TableHeader';

interface TableBodyProps extends React.ComponentPropsWithoutRef<'tbody'> {}

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, forwardedRef) => (
    <tbody ref={forwardedRef} className={classNames(className, 'TableBody')} {...props} />
  )
);

TableBody.displayName = 'TableBody';

interface TableRowOwnProps {
  align?: Responsive<'start' | 'center' | 'end' | 'baseline'>;
}

interface TableRowProps extends TableRowOwnProps, React.ComponentPropsWithoutRef<'tr'> {}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ align, children, className, ...props }, forwardedRef) => {
    return (
      <tr
        ref={forwardedRef}
        className={classNames(className, 'TableRow', {
          'rt-va-baseline': align === 'baseline',
          'rt-va-top': align === 'start',
          'rt-va-middle': align === 'center',
          'rt-va-bottom': align === 'end',
        })}
        {...props}
      >
        {children}
      </tr>
    );
  }
);

TableRow.displayName = 'TableRow';

interface TableCellOwnProps {
  justify?: Responsive<'start' | 'center' | 'end'>;
  width?: number | string;
}

interface TableCellProps
  extends TableCellOwnProps,
    Omit<React.ComponentPropsWithoutRef<'td'>, 'align' | 'width'> {}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, justify, style, width, ...props }, forwardedRef) => (
    <td
      ref={forwardedRef}
      className={classNames(className, 'TableCell', {
        'rt-ta-left': justify === 'start',
        'rt-ta-center': justify === 'center',
        'rt-ta-right': justify === 'end',
      })}
      style={{ width, ...style }}
      {...props}
    />
  )
);

TableCell.displayName = 'TableCell';

const TableColumnHeader = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, justify, style, width, ...props }, forwardedRef) => (
    <th
      ref={forwardedRef}
      className={classNames(className, 'TableColumnHeader TableCell', {
        'rt-ta-left': justify === 'start',
        'rt-ta-center': justify === 'center',
        'rt-ta-right': justify === 'end',
      })}
      scope="col"
      style={{ width, ...style }}
      {...props}
    />
  )
);

TableColumnHeader.displayName = 'TableColumnHeader';

const TableRowHeader = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, justify, style, width, ...props }, forwardedRef) => (
    <th
      ref={forwardedRef}
      className={classNames(className, 'TableRowHeader TableCell', {
        'rt-ta-left': justify === 'start',
        'rt-ta-center': justify === 'center',
        'rt-ta-right': justify === 'end',
      })}
      scope="row"
      style={{ width, ...style }}
      {...props}
    />
  )
);

TableRowHeader.displayName = 'TableRowHeader';

export {
  TableRoot,
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableColumnHeader,
  TableRowHeader,
  TableCell,
};
