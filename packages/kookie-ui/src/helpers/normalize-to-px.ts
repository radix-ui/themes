/**
 * Normalize CSS length values to pixels.
 * Supports: px, rem, %, and bare numbers.
 *
 * @param value - The value to normalize (number, string, or undefined)
 * @param orientation - 'horizontal' for width-based % or 'vertical' for height-based %
 * @returns The value in pixels, or undefined if invalid
 */
export function normalizeToPx(
  value: number | string | undefined,
  orientation: 'horizontal' | 'vertical' = 'horizontal',
): number | undefined {
  if (value == null) return undefined;
  if (typeof value === 'number' && Number.isFinite(value)) return value;

  const str = String(value).trim();
  if (!str) return undefined;

  // px: direct parse
  if (str.endsWith('px')) return Number.parseFloat(str);

  // rem: multiply by root font size
  if (str.endsWith('rem')) {
    const rem = Number.parseFloat(getComputedStyle(document.documentElement).fontSize || '16') || 16;
    return Number.parseFloat(str) * rem;
  }

  // %: calculate based on viewport dimension
  if (str.endsWith('%')) {
    const pct = Number.parseFloat(str);
    const base =
      orientation === 'horizontal'
        ? document.documentElement.clientWidth || window.innerWidth || 0
        : document.documentElement.clientHeight || window.innerHeight || 0;
    return (pct / 100) * base;
  }

  // Bare number-like string
  const n = Number.parseFloat(str);
  return Number.isFinite(n) ? n : undefined;
}

