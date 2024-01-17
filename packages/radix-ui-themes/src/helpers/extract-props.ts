import type * as React from 'react';
import classNames from 'classnames';
import { PropDef } from './props';
import { getResponsiveClassNames, getResponsiveStyles, isResponsiveObject } from './responsive';
import { mergeStyles } from './merge-styles';

type PropDefsWithClassName<T> = T extends Record<string, PropDef>
  ? { [K in keyof T]: T[K] extends { className: string } ? K : never }[keyof T]
  : never;

function mergePropDefs<T extends Record<string, PropDef>[]>(...args: T): Record<string, PropDef> {
  return Object.assign({}, ...args);
}

/**
 * Takes props, checks them against prop defs that have a `className` on them,
 * adds necessary CSS classes and inline styles, and returns the props without
 * the corresponding prop defs that were used to formulate the new `className`
 * and `style` values. Also applies prop def defaults to every prop.
 */
function extractProps<
  P extends { className?: string; style?: React.CSSProperties; [key: string]: any },
  T extends Record<string, PropDef>[]
>(props: P, ...propDefs: T): Omit<P, PropDefsWithClassName<T[number]>> {
  let className: string | undefined;
  let style: ReturnType<typeof mergeStyles>;
  const extractedProps = { ...props };
  const allPropDefs = mergePropDefs(...propDefs);

  for (const key in allPropDefs) {
    const propDef = allPropDefs[key];

    // Apply prop def defaults
    if (propDef.default !== undefined && extractedProps[key] === undefined) {
      (extractedProps as Record<string, any>)[key] = propDef.default;
    }

    const value = extractedProps[key];

    if ('className' in propDef && propDef.className) {
      delete extractedProps[key];

      const isResponsivePropDef = 'responsive' in propDef;
      // Make sure we are not threading through responsive values for non-responsive prop defs
      if (!value || (isResponsiveObject(value) && !isResponsivePropDef)) {
        continue;
      }

      if (propDef.type === 'string') {
        className = classNames(propDef.className, className);
        continue;
      }

      if (propDef.type === 'enum') {
        const propClassName = getResponsiveClassNames({
          allowArbitraryValues: false,
          value,
          className: propDef.className,
          propValues: propDef.values,
          parseValue: propDef.parseValue,
        });

        className = classNames(className, propClassName);
        continue;
      }

      if (propDef.type === 'enum | string') {
        const [propClassNames, propCustomProperties] = getResponsiveStyles({
          className: propDef.className,
          customProperties: propDef.customProperties,
          propValues: propDef.values,
          parseValue: propDef.parseValue,
          value,
        });
        console.log({ propClassNames });

        style = mergeStyles(style, propCustomProperties);
        className = classNames(className, propClassNames);
        continue;
      }

      if (propDef.type === 'boolean' && value) {
        // TODO handle responsive boolean props
        className = classNames(propDef.className, className);
        continue;
      }
    }
  }

  extractedProps.className = classNames(className, props.className);
  extractedProps.style = mergeStyles(style, props.style);
  return extractedProps;
}

export { extractProps };
