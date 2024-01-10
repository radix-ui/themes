import { PropDef, colorProp } from '../helpers';

const sizes = ['1', '2'] as const;

const tabsListPropDefs = {
  size: { type: 'enum', values: sizes, default: '2', responsive: true },
  color: { ...colorProp, default: undefined },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  color: typeof colorProp;
};

export { tabsListPropDefs };
