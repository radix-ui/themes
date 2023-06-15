'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { DirectionProvider } from '@radix-ui/react-direction';

interface DirectionProviderProps extends React.ComponentProps<typeof DirectionProvider> {}
interface ProviderProps {
  children?: React.ReactNode;

  tooltipDelayDuration?: number;
  tooltipSkipDelayDuration?: number;

  dir?: DirectionProviderProps['dir'];
}

const Provider: React.FC<ProviderProps> = ({
  children,

  tooltipDelayDuration,
  tooltipSkipDelayDuration,

  dir = 'ltr',
}) => {
  return (
    <TooltipPrimitive.Provider
      delayDuration={tooltipDelayDuration}
      skipDelayDuration={tooltipSkipDelayDuration}
    >
      <DirectionProvider dir={dir}>{children}</DirectionProvider>
    </TooltipPrimitive.Provider>
  );
};

export { Provider };
