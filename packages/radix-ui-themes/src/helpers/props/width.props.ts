import classNames from 'classnames';
import { getResponsiveStyles } from '../breakpoints';
import { mergeStyles } from '../merge-styles';
import { GetPropDefTypes, PropDef } from './prop-def';

const widthValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const widthPropDefs = {
  width: { type: 'enum | string', values: widthValues, default: undefined, responsive: true },
  minWidth: { type: 'enum | string', values: widthValues, default: undefined, responsive: true },
  maxWidth: { type: 'enum | string', values: widthValues, default: undefined, responsive: true },
} satisfies {
  width: PropDef<(typeof widthValues)[number]>;
  minWidth: PropDef<(typeof widthValues)[number]>;
  maxWidth: PropDef<(typeof widthValues)[number]>;
};

type WidthProps = GetPropDefTypes<typeof widthPropDefs>;

function extractWidthProps<T extends WidthProps>(props: T) {
  const {
    width = widthPropDefs.width.default,
    minWidth = widthPropDefs.minWidth.default,
    maxWidth = widthPropDefs.maxWidth.default,
    ...rest
  } = props;
  return {
    width,
    minWidth,
    maxWidth,
    rest,
  };
}

function getWidthStyles(props: WidthProps) {
  const [widthClassNames, widthCustomProperties] = getResponsiveStyles({
    className: 'rt-r-w',
    customProperty: '--width',
    propValues: widthPropDefs.width.values,
    value: props.width,
  });

  const [minWidthClassNames, minWidthCustomProperties] = getResponsiveStyles({
    className: 'rt-r-min-w',
    customProperty: '--min-width',
    propValues: widthPropDefs.minWidth.values,
    value: props.minWidth,
  });

  const [maxWidthClassNames, maxWidthCustomProperties] = getResponsiveStyles({
    className: 'rt-r-max-w',
    customProperty: '--max-width',
    propValues: widthPropDefs.maxWidth.values,
    value: props.maxWidth,
  });

  return [
    classNames(widthClassNames, minWidthClassNames, maxWidthClassNames),
    mergeStyles(widthCustomProperties, minWidthCustomProperties, maxWidthCustomProperties),
  ] as const;
}

export { widthPropDefs, extractWidthProps, getWidthStyles };
export type { WidthProps };
