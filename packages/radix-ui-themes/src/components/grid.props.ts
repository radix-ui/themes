const gridDisplayValues = ['none', 'inline-grid', 'grid'] as const;
type GridDisplay = (typeof gridDisplayValues)[number];
const gridDisplayDefault: GridDisplay = 'grid';

const gridColumnsValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
type GridColumns = (typeof gridColumnsValues)[number];
const gridColumnsDefault: GridColumns = '1';

const gridFlowValues = ['row', 'column', 'dense', 'row-dense', 'column-dense'] as const;
type GridFlow = (typeof gridFlowValues)[number];
const gridFlowDefault: GridFlow | undefined = undefined;

const gridAlignValues = ['start', 'center', 'end', 'baseline', 'stretch'] as const;
type GridAlign = (typeof gridAlignValues)[number];
const gridAlignDefault: GridAlign = 'stretch';

const gridJustifyValues = ['start', 'center', 'end', 'between'] as const;
type GridJustify = (typeof gridJustifyValues)[number];
const gridJustifyDefault: GridJustify = 'start';

const gridGapValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
type GridCap = (typeof gridGapValues)[number];
const gridGapDefault: GridCap | undefined = undefined;
const gridGapXDefault: GridCap | undefined = undefined;
const gridGapYDefault: GridCap | undefined = undefined;

export {
  gridDisplayValues,
  gridDisplayDefault,
  gridColumnsValues,
  gridColumnsDefault,
  gridFlowValues,
  gridFlowDefault,
  gridAlignValues,
  gridAlignDefault,
  gridJustifyValues,
  gridJustifyDefault,
  gridGapValues,
  gridGapDefault,
  gridGapXDefault,
  gridGapYDefault,
};
export { GridDisplay, GridColumns, GridFlow, GridAlign, GridJustify, GridCap };
