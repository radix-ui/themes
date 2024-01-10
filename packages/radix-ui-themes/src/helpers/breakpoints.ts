import { hasOwnProperty } from './has-own-property';
import type { StringOrValue } from './string-or-value';

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
  allowArbitraryValues = true,
  className,
  customProperty,
  ...args
}: GetResponsiveCustomPropertiesOptions & GetResponsiveClassNamesOptions) {
  const classNames = getResponsiveClassNames({
    allowArbitraryValues,
    className,
    ...args,
  });

  if (allowArbitraryValues) {
    const customProperties = getResponsiveCustomProperties({ customProperty, ...args });
    return [classNames, customProperties] as const;
  } else {
    return [classNames, undefined] as const;
  }
}

interface GetResponsiveClassNamesOptions {
  allowArbitraryValues?: boolean;
  value: Responsive<StringOrValue<string>> | Responsive<string> | undefined;
  className?: string;
  propValues?: string[] | readonly string[];
  parseValue?: (value: string | undefined) => string | undefined;
}

function getResponsiveClassNames({
  allowArbitraryValues = false,
  value,
  className = '',
  propValues = [],
  parseValue = (value) => value,
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
        if (propValues.includes(value)) {
          const baseClassName = getBaseClassName(className, value, parseValue);
          const bpClassName = bp === 'initial' ? baseClassName : `${bp}:${baseClassName}`;
          classNames.push(bpClassName);
        } else if (allowArbitraryValues) {
          const bpClassName = bp === 'initial' ? className : `${bp}:${className}`;
          classNames.push(bpClassName);
        }
      }
    }

    return classNames.join(' ');
  }

  if (!propValues.includes(value)) {
    return allowArbitraryValues ? className : '';
  }

  return getBaseClassName(className, value, parseValue);
}

function getBaseClassName(
  className: string,
  value: string,
  parseValue: (value: string | undefined) => string | undefined
): string {
  const delimiter = className ? '-' : '';
  const matchedValue = parseValue(value);
  const isNegative = matchedValue?.startsWith('-');
  const minus = isNegative ? '-' : '';
  const absoluteValue = isNegative ? value.substring(1) : value;
  return `${minus}${className}${delimiter}${absoluteValue}`;
}

interface GetResponsiveCustomPropertiesOptions {
  value: Responsive<StringOrValue<string>> | Responsive<string> | undefined;
  customProperty: `--${string}` | `--${string}`[];
  propValues?: string[] | readonly string[];
  parseValue?: (value: string | undefined) => string | undefined;
}

function getResponsiveCustomProperties({
  value,
  customProperty,
  propValues = [],
  parseValue = (value) => value,
}: GetResponsiveCustomPropertiesOptions) {
  let styles: Record<string, string | undefined> = {};

  if (!value || propValues.includes(value as string)) {
    return undefined;
  }

  if (typeof value === 'string') {
    const customProperties = [customProperty].flat();
    styles = Object.fromEntries(customProperties.map((prop) => [prop, value]));
  }

  if (isBreakpointsObject(value)) {
    const object = value;

    for (const breakpoint in object) {
      if (hasOwnProperty(object, breakpoint)) {
        const value = object[breakpoint];
        const customProperties = [customProperty].flat();

        if (propValues.includes(value)) {
          continue;
        }

        for (const customProperty of customProperties) {
          const bp = breakpoint === 'initial' ? customProperty : `${customProperty}-${breakpoint}`;

          styles = {
            [bp]: value,
            ...styles,
          };
        }
      }
    }
  }

  for (const key in styles) {
    styles[key] = parseValue(styles[key]);
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
export type { Breakpoints, Responsive, StringOrValue };
