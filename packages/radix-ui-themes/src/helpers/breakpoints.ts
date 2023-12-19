import { hasOwnProperty } from './has-own-property';

type Breakpoints = 'initial' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Responsive<T> = T | Partial<Record<Breakpoints, T>>;
type Wide<T extends string> = T | Omit<string, T>;
type ResponsiveWide<T extends string> = Responsive<Wide<T>>;

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
  valueMap?: Record<string, string> // Optionally, an object to map prop values to a different CSS suffix
) {
  const classes: string[] = [];

  if (typeof value === 'object') {
    for (const bp of Object.keys(value) as Breakpoints[]) {
      if (bp in value) {
        const str = value[bp]?.toString();
        const isNegative = str?.startsWith('-');
        const delimiter = classPrefix === '' ? '' : '-';
        const prefix = isNegative ? `-${classPrefix}` : classPrefix;
        const matchedValue = isNegative ? str?.substring(1) : str;

        if (matchedValue === undefined) {
          continue;
        }

        const suffix = valueMap?.[matchedValue] ?? matchedValue;

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
    const delimiter = classPrefix === '' ? '' : '-';
    const prefix = isNegative ? `-${classPrefix}` : classPrefix;
    const matchedValue = isNegative ? value.substring(1) : value;
    const suffix = valueMap?.[matchedValue] ?? matchedValue;
    classes.push(`${prefix}${delimiter}${suffix}`);
  }

  if (typeof value === 'boolean') {
    const delimiter = classPrefix === '' ? '' : '-';
    const matchedValue = value.toString();
    const suffix = valueMap?.[matchedValue] ?? matchedValue;
    classes.push(`${classPrefix}${delimiter}${suffix}`);
  }

  return classes.join(' ');
}

function getResponsiveStyles({
  allowAribtraryValues,
  className,
  customProperty,
  ...args
}: GetResponsiveCustomPropertiesOptions & GetResponsiveClassNamesOptions) {
  const classNames = getResponsiveClassNames({
    allowAribtraryValues,
    className,
    ...args,
  });

  if (allowAribtraryValues) {
    const customProperties = getResponsiveCustomProperties({ customProperty, ...args });
    return [classNames, customProperties] as const;
  } else {
    return [classNames, undefined] as const;
  }
}

interface GetResponsiveClassNamesOptions {
  className?: string;
  value: ResponsiveWide<string> | Responsive<string> | undefined;
  values?: string[] | readonly string[];
  allowAribtraryValues?: boolean;
  map?: (value: string | undefined) => string | undefined;
}

function getResponsiveClassNames({
  className = '',
  value,
  values = [],
  allowAribtraryValues = false,
  map = (value) => value,
}: GetResponsiveClassNamesOptions): string {
  const classNames: string[] = [];

  if (!value) {
    return '';
  }

  if (typeof value === 'object') {
    const object = value as Partial<Record<Breakpoints, string>>;

    for (const bp of Object.keys(object) as Breakpoints[]) {
      const value = object[bp];

      if (value !== undefined) {
        if (values.includes(value)) {
          const baseClassName = getBaseClassName(className, value, map);
          const bpClassName = bp === 'initial' ? baseClassName : `${bp}:${baseClassName}`;
          classNames.push(bpClassName);
        } else if (allowAribtraryValues) {
          const bpClassName = bp === 'initial' ? className : `${bp}:${className}`;
          classNames.push(bpClassName);
        }
      }
    }

    return classNames.join(' ');
  }

  if (!values.includes(value)) {
    return allowAribtraryValues ? className : '';
  }

  return getBaseClassName(className, value, map);
}

function getBaseClassName(
  className: string,
  value: string,
  map: (value: string | undefined) => string | undefined
): string {
  const delimiter = className ? '-' : '';
  const matchedValue = map(value);
  const isNegative = matchedValue?.startsWith('-');
  const minus = isNegative ? '-' : '';
  const absoluteValue = isNegative ? value.substring(1) : value;
  return `${minus}${className}${delimiter}${absoluteValue}`;
}

interface GetResponsiveCustomPropertiesOptions {
  customProperty: `--${string}`;
  value: ResponsiveWide<string> | Responsive<string> | undefined;
  values?: string[] | readonly string[];
  map?: (value: string | undefined) => string | undefined;
}

function getResponsiveCustomProperties({
  customProperty,
  value,
  values = [],
  map = (value) => value,
}: GetResponsiveCustomPropertiesOptions) {
  let styles: Record<string, string | undefined> = {};

  if (!value || values.includes(value as string)) {
    return undefined;
  }

  if (typeof value === 'string') {
    styles = {
      [customProperty]: value,
    };
  }

  if (isBreakpointsObject(value)) {
    const object = value;

    for (const breakpoint in object) {
      if (hasOwnProperty(object, breakpoint)) {
        const value = object[breakpoint];
        const bp = breakpoint === 'initial' ? customProperty : `${customProperty}-${breakpoint}`;

        if (values.includes(value)) {
          continue;
        }

        styles = {
          [bp]: value,
          ...styles,
        };
      }
    }
  }

  for (const key in styles) {
    styles[key] = map(styles[key]);
  }

  return styles;
}

function isBreakpointsObject<V extends string>(
  obj: Responsive<V | Omit<string, V>> | undefined
): obj is Record<Breakpoints, string> {
  return typeof obj === 'object';
}

export {
  withBreakpoints,
  isBreakpointsObject,
  getResponsiveStyles,
  getResponsiveCustomProperties,
  getResponsiveClassNames,
};
export type { Breakpoints, Responsive, ResponsiveWide };
