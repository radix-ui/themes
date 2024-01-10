import classNames from 'classnames';
import { getResponsiveStyles } from '../breakpoints';
import { mergeStyles } from '../merge-styles';
import { GetPropDefTypes, PropDef } from './prop-def';

const heightValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const heightPropDefs = {
  height: { type: 'enum | string', values: heightValues, default: undefined, responsive: true },
  minHeight: { type: 'enum | string', values: heightValues, default: undefined, responsive: true },
  maxHeight: { type: 'enum | string', values: heightValues, default: undefined, responsive: true },
} satisfies {
  height: PropDef<(typeof heightValues)[number]>;
  minHeight: PropDef<(typeof heightValues)[number]>;
  maxHeight: PropDef<(typeof heightValues)[number]>;
};

type HeightProps = GetPropDefTypes<typeof heightPropDefs>;

function extractHeightProps<T extends HeightProps>(props: T) {
  const {
    height = heightPropDefs.height.default,
    minHeight = heightPropDefs.minHeight.default,
    maxHeight = heightPropDefs.maxHeight.default,
    ...rest
  } = props;
  return {
    height,
    minHeight,
    maxHeight,
    rest,
  };
}

function getHeightStyles(props: HeightProps) {
  const [heightClassNames, heightCustomProperties] = getResponsiveStyles({
    className: 'rt-r-h',
    customProperty: '--height',
    propValues: heightPropDefs.height.values,
    value: props.height,
  });

  const [minHeightClassNames, minHeightCustomProperties] = getResponsiveStyles({
    className: 'rt-r-min-h',
    customProperty: '--min-height',
    propValues: heightPropDefs.minHeight.values,
    value: props.minHeight,
  });

  const [maxHeightClassNames, maxHeightCustomProperties] = getResponsiveStyles({
    className: 'rt-r-max-h',
    customProperty: '--max-height',
    propValues: heightPropDefs.maxHeight.values,
    value: props.maxHeight,
  });

  return [
    classNames(heightClassNames, minHeightClassNames, maxHeightClassNames),
    mergeStyles(heightCustomProperties, minHeightCustomProperties, maxHeightCustomProperties),
  ] as const;
}

export { heightPropDefs, extractHeightProps, getHeightStyles };
export type { HeightProps };
