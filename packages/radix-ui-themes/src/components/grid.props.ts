const gridDisplayValues = ['none', 'inline-grid', 'grid'] as const;
type GridDisplay = (typeof gridDisplayValues)[number];
const defaultGridDisplay: GridDisplay = 'grid';

const gridColumnsValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
type GridColumns = (typeof gridColumnsValues)[number];
const defaultGridColumns: GridColumns = '1';

const gridFlowValues = ['row', 'column', 'dense', 'row-dense', 'column-dense'] as const;
type GridFlow = (typeof gridFlowValues)[number];
const defaultGridFlow: GridFlow | undefined = undefined;

const gridAlignValues = ['start', 'center', 'end', 'baseline', 'stretch'] as const;
type GridAlign = (typeof gridAlignValues)[number];
const defaultGridAlign: GridAlign = 'stretch';

const gridJustifyValues = ['start', 'center', 'end', 'between'] as const;
type GridJustify = (typeof gridJustifyValues)[number];
const defaultGridJustify: GridJustify = 'start';

const gridGapValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
type GridCap = (typeof gridGapValues)[number];
const defaultGridGap: GridCap | undefined = undefined;
const defaultGridGapX: GridCap | undefined = undefined;
const defaultGridGapY: GridCap | undefined = undefined;

export {
  gridDisplayValues,
  defaultGridDisplay,
  gridColumnsValues,
  defaultGridColumns,
  gridFlowValues,
  defaultGridFlow,
  gridAlignValues,
  defaultGridAlign,
  gridJustifyValues,
  defaultGridJustify,
  gridGapValues,
  defaultGridGap,
  defaultGridGapX,
  defaultGridGapY,
};
export { GridDisplay, GridColumns, GridFlow, GridAlign, GridJustify, GridCap };
