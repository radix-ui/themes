"use client";

import { Theme, ThemePanel } from "@kushagradhawan/kookie-ui";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Theme
      accentColor="blue"
      grayColor="auto"
      material="solid"
      radius="medium"
      fontFamily="sans"
    >
      {children}
      <ThemePanel defaultOpen={false} />
    </Theme>
  );
}
