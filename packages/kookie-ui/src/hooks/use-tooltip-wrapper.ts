import * as React from 'react';

/**
 * Hook for managing tooltip accessibility props and conditional rendering.
 * Encapsulates tooltip ID generation and aria-describedby binding.
 *
 * @param tooltip - The tooltip content (if any)
 * @returns Object containing tooltipId, hasTooltip flag, and accessibility props
 *
 * @example
 * ```tsx
 * const { tooltipId, hasTooltip, accessibilityProps } = useTooltipWrapper(tooltip);
 *
 * const button = <button {...accessibilityProps}>Click me</button>;
 *
 * if (!hasTooltip) return button;
 *
 * return <Tooltip id={tooltipId} content={tooltip}>{button}</Tooltip>;
 * ```
 */
export function useTooltipWrapper(tooltip: React.ReactNode) {
  const tooltipId = React.useId();
  const hasTooltip = Boolean(tooltip);

  const accessibilityProps = React.useMemo(() => (hasTooltip ? { 'aria-describedby': tooltipId } : {}), [hasTooltip, tooltipId]);

  return { tooltipId, hasTooltip, accessibilityProps };
}
