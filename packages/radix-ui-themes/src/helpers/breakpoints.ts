import { hasOwnProperty } from './has-own-property';

type Breakpoints = 'initial' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Responsive<T> = T | Partial<Record<Breakpoints, T>>;

/**
 * A helper to generate CSS classes that include breakpoints.
 *
 * Examples:
 * ```
 * const marginTop = '1'
 * withBreakpoints(marginTop, 'mt') // returns 'mt-1'
 *
 * const padding = { initial: '1', xs: '2', md: '3' }
 * withBreakpoints(padding, 'p') // returns 'p-1 xs:p-1 md:p-3'
 *
 * const justifyContent = { initial: 'start', md: 'space-between' }
 * withBreakpoints(justifyContent, 'jc', { 'space-between': 'sb' }) // returns 'jc-start md:jc-sb'
 * ```
 */
function withBreakpoints(
  value: Responsive<string | boolean> | undefined, // Value to check
  classPrefix = '', // CSS class prefix, e.g. "px" in "px-1" class
  valueMap?: Record<string, string>, // Optionally, an object to map prop values to a different CSS suffix
  withoutValue = false
) {
  const classes: string[] = [];

  if (typeof value === 'object') {
    for (const bp of Object.keys(value) as Breakpoints[]) {
      if (bp in value) {
        const str = value[bp]?.toString();
        const isNegative = str?.startsWith('-');
        const delimiter = withoutValue || classPrefix === '' ? '' : '-';
        const prefix = isNegative ? `-${classPrefix}` : classPrefix;
        const matchedValue = isNegative ? str?.substring(1) : str;

        if (matchedValue === undefined) {
          continue;
        }

        const suffix = withoutValue ? '' : valueMap?.[matchedValue] ?? matchedValue;

        const className =
          bp === 'initial'
            ? `${prefix}${delimiter}${suffix}`
            : `${bp}:${prefix}${delimiter}${suffix}`;

        classes.push(className);
      }
    }
  }

  if (typeof value === 'string') {
    const isNegative = value.startsWith('-');
    const delimiter = withoutValue || classPrefix === '' ? '' : '-';
    const prefix = isNegative ? `-${classPrefix}` : classPrefix;
    const matchedValue = isNegative ? value.substring(1) : value;
    const suffix = withoutValue ? '' : valueMap?.[matchedValue] ?? matchedValue;
    classes.push(`${prefix}${delimiter}${suffix}`);
  }

  if (typeof value === 'boolean') {
    const delimiter = withoutValue || classPrefix === '' ? '' : '-';
    const matchedValue = value.toString();
    const suffix = withoutValue ? '' : valueMap?.[matchedValue] ?? matchedValue;
    classes.push(`${classPrefix}${delimiter}${suffix}`);
  }

  return classes.join(' ');
}

function isBreakpointsObject<V extends string>(
  obj: Responsive<V | Omit<string, V>> | undefined
): obj is Record<Breakpoints, string> {
  return typeof obj === 'object';
}

function getResponsiveCustomProperties(
  name: `--${string}`,
  value: Responsive<string> | undefined,
  parserFn?: (value: string | undefined) => string | undefined
) {
  let styles: Record<string, string | undefined> = {};

  if (typeof value === 'string') {
    styles = {
      [name]: value,
    };
  }

  if (isBreakpointsObject(value)) {
    for (const breakpoint in value) {
      if (hasOwnProperty(value, breakpoint)) {
        const customProperty = breakpoint === 'initial' ? name : `${name}-${breakpoint}`;

        styles = {
          [customProperty]: value[breakpoint],
          ...styles,
        };
      }
    }
  }

  if (parserFn) {
    for (const key in styles) {
      styles[key] = parserFn(styles[key]);
    }
  }

  return styles;
}

function getResponsiveStyles({
  className,
  variable,
  value,
  map,
}: {
  className: string;
  variable: `--${string}`;
  value: Responsive<string> | undefined;
  map?: (value: string | undefined) => string | undefined;
}) {
  const classNames = withBreakpoints(value, className, undefined, true);
  const customProperties = getResponsiveCustomProperties(variable, value, map);
  return [classNames, customProperties] as const;
}

export { withBreakpoints, isBreakpointsObject, getResponsiveStyles };
export type { Breakpoints, Responsive };
