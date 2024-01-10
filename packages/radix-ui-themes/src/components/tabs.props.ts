import { PropDef, colorProp } from '../helpers';

const sizes = ['1', '2'] as const;

const tabsListPropDefs = {
  size: { type: 'enum', values: sizes, default: '2', responsive: true },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

const tabsRootPropDefs = {
  color: { ...colorProp, default: undefined },
} satisfies {
  color: typeof colorProp;
};

export { tabsListPropDefs, tabsRootPropDefs };
