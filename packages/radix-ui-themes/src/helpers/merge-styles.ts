type InlineStyle = React.CSSProperties | Record<string, string | number | undefined> | undefined;

// Merges CSS styles like `classNames` merges CSS classes
export function mergeStyles(...styles: Array<InlineStyle>): InlineStyle {
  let result: InlineStyle = {};

  for (const style of styles) {
    if (style) {
      result = { ...style, ...result };
    }
  }

  return Object.keys(result).length ? result : undefined;
}
