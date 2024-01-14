import type * as React from 'react';
import classNames from 'classnames';
import { PropDef } from './props';
import { getResponsiveClassNames, getResponsiveStyles, isResponsiveObject } from './responsive';
import { mergeStyles } from './merge-styles';

type PropDefsWithClassName<T> = T extends Record<string, PropDef>
  ? { [K in keyof T]: T[K] extends { className: string } ? K : never }[keyof T]
  : never;

// type UnionKeys<T> = T extends any ? keyof T : never;
// type PropDefsMerged<T extends Record<string, PropDef>[]> = {
//   [K in UnionKeys<T[number]>]: PropDef;
// };
// function mergeObjects<T extends Record<string, PropDef>[]>(...args: T): PropDefsMerged<T> {
//   return Object.assign({}, ...args);
// }
function mergePropDefs<T extends Record<string, PropDef>[]>(...args: T): Record<string, PropDef> {
  return Object.assign({}, ...args);
}

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
          customProperty: propDef.customProperty,
          propValues: propDef.values,
          parseValue: propDef.parseValue,
          value,
        });

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
