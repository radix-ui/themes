import * as React from 'react';

/**
 * RenderCounter - tracks render count for performance assertions
 *
 * Usage:
 * ```tsx
 * const renderCount = { current: 0 };
 * render(
 *   <Shell.Panel>
 *     <RenderCounter counter={renderCount} />
 *   </Shell.Panel>
 * );
 * expect(renderCount.current).toBe(1);
 * ```
 */
export interface RenderCounterProps {
  counter: { current: number };
  label?: string;
}

export const RenderCounter: React.FC<RenderCounterProps> = ({ counter, label = 'RenderCounter' }) => {
  counter.current++;
  return (
    <div data-testid={label} data-render-count={counter.current}>
      {label} rendered {counter.current} times
    </div>
  );
};

/**
 * Hook to create a render counter
 */
export function useRenderCounter(label?: string) {
  const counter = React.useRef(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    counter.current++;
    setCount(counter.current);
  });

  return { counter, count, label };
}
