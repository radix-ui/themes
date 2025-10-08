/**
 * Font configuration utilities for Kookie UI
 *
 * These utilities help users configure custom fonts through CSS variables
 * and provide type-safe font configuration options.
 */

/**
 * Font family configuration interface
 */
export interface FontConfig {
  /** Sans-serif font stack for fontFamily="sans" */
  sans?: string;
  /** Monospace font stack for fontFamily="mono" */
  mono?: string;
  /** Serif font stack for fontFamily="serif" */
  serif?: string;
  /** Base Inter font replacement */
  inter?: string;
  /** Base JetBrains Mono font replacement */
  jetbrainsMono?: string;
  /** Base Playfair Display font replacement */
  playfairDisplay?: string;
}

/**
 * CSS variable names used by Kookie UI for fonts
 */
export const FONT_CSS_VARIABLES = {
  sans: '--font-sans',
  mono: '--font-mono',
  serif: '--font-serif',
  inter: '--font-inter',
  jetbrainsMono: '--font-jetbrains-mono',
  playfairDisplay: '--font-playfair-display',
  defaultFamily: '--default-font-family',
  headingFamily: '--heading-font-family',
  strongFamily: '--strong-font-family',
  codeFamily: '--code-font-family',
} as const;

/**
 * Popular font stacks for common use cases
 */
export const FONT_STACKS = {
  // Sans-serif options
  inter: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  system: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  poppins: "'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  openSans: "'Open Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",

  // Monospace options
  jetbrainsMono: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Liberation Mono', monospace",
  firaCode: "'Fira Code', 'JetBrains Mono', 'Consolas', 'Liberation Mono', monospace",
  sourceCodePro: "'Source Code Pro', 'JetBrains Mono', 'Consolas', monospace",
  systemMono: "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', 'Courier New', monospace",

  // Serif options
  playfair: "'Playfair Display', 'Times New Roman', 'Times', 'Georgia', 'Cambria', serif",
  times: "'Times New Roman', 'Times', 'Georgia', 'Cambria', serif",
  georgia: "'Georgia', 'Times New Roman', 'Times', serif",
  lora: "'Lora', 'Times New Roman', 'Times', serif",
} as const;

/**
 * Apply font configuration to CSS variables
 *
 * @param config Font configuration object
 * @param target Target element (defaults to document.documentElement)
 *
 * @example
 * ```ts
 * // Use Google Fonts
 * applyFontConfig({
 *   sans: FONT_STACKS.poppins,
 *   mono: FONT_STACKS.firaCode
 * });
 *
 * // Use system fonts only
 * applyFontConfig({
 *   sans: FONT_STACKS.system,
 *   mono: FONT_STACKS.systemMono
 * });
 * ```
 */
export function applyFontConfig(config: FontConfig, target: HTMLElement = document.documentElement): void {
  const style = target.style;

  if (config.sans) {
    style.setProperty(FONT_CSS_VARIABLES.sans, config.sans);
  }

  if (config.mono) {
    style.setProperty(FONT_CSS_VARIABLES.mono, config.mono);
  }

  if (config.serif) {
    style.setProperty(FONT_CSS_VARIABLES.serif, config.serif);
  }

  if (config.inter) {
    style.setProperty(FONT_CSS_VARIABLES.inter, config.inter);
  }

  if (config.jetbrainsMono) {
    style.setProperty(FONT_CSS_VARIABLES.jetbrainsMono, config.jetbrainsMono);
  }

  if (config.playfairDisplay) {
    style.setProperty(FONT_CSS_VARIABLES.playfairDisplay, config.playfairDisplay);
  }
}

/**
 * Generate CSS string for font configuration
 *
 * @param config Font configuration object
 * @returns CSS string that can be injected into a stylesheet
 *
 * @example
 * ```ts
 * const css = generateFontCSS({
 *   sans: FONT_STACKS.poppins,
 *   mono: FONT_STACKS.firaCode
 * });
 *
 * // Inject into document
 * const style = document.createElement('style');
 * style.textContent = css;
 * document.head.appendChild(style);
 * ```
 */
export function generateFontCSS(config: FontConfig): string {
  const rules: string[] = [':root {'];

  if (config.sans) {
    rules.push(`  ${FONT_CSS_VARIABLES.sans}: ${config.sans};`);
  }

  if (config.mono) {
    rules.push(`  ${FONT_CSS_VARIABLES.mono}: ${config.mono};`);
  }

  if (config.serif) {
    rules.push(`  ${FONT_CSS_VARIABLES.serif}: ${config.serif};`);
  }

  if (config.inter) {
    rules.push(`  ${FONT_CSS_VARIABLES.inter}: ${config.inter};`);
  }

  if (config.jetbrainsMono) {
    rules.push(`  ${FONT_CSS_VARIABLES.jetbrainsMono}: ${config.jetbrainsMono};`);
  }

  if (config.playfairDisplay) {
    rules.push(`  ${FONT_CSS_VARIABLES.playfairDisplay}: ${config.playfairDisplay};`);
  }

  rules.push('}');

  return rules.join('\n');
}

/**
 * Reset fonts to Kookie UI defaults
 */
export function resetFonts(target: HTMLElement = document.documentElement): void {
  const style = target.style;

  // Remove custom font variables to fall back to defaults
  style.removeProperty(FONT_CSS_VARIABLES.sans);
  style.removeProperty(FONT_CSS_VARIABLES.mono);
  style.removeProperty(FONT_CSS_VARIABLES.serif);
  style.removeProperty(FONT_CSS_VARIABLES.inter);
  style.removeProperty(FONT_CSS_VARIABLES.jetbrainsMono);
  style.removeProperty(FONT_CSS_VARIABLES.playfairDisplay);
}

/**
 * Get current font configuration from CSS variables
 */
export function getCurrentFontConfig(target: HTMLElement = document.documentElement): FontConfig {
  const computedStyle = getComputedStyle(target);

  return {
    sans: computedStyle.getPropertyValue(FONT_CSS_VARIABLES.sans).trim() || undefined,
    mono: computedStyle.getPropertyValue(FONT_CSS_VARIABLES.mono).trim() || undefined,
    serif: computedStyle.getPropertyValue(FONT_CSS_VARIABLES.serif).trim() || undefined,
    inter: computedStyle.getPropertyValue(FONT_CSS_VARIABLES.inter).trim() || undefined,
    jetbrainsMono: computedStyle.getPropertyValue(FONT_CSS_VARIABLES.jetbrainsMono).trim() || undefined,
    playfairDisplay: computedStyle.getPropertyValue(FONT_CSS_VARIABLES.playfairDisplay).trim() || undefined,
  };
}
