'use client';

import React from 'react';
import { Shell } from '@kushagradhawan/kookie-ui';

export default function Page() {
  return (
    <Shell.Root>
      <Shell.Header />
      <Shell.Sidebar side="start">
        <Shell.Sidebar.Rail />
        <Shell.Sidebar.Panel />
      </Shell.Sidebar>
      <Shell.Content />
    </Shell.Root>
  );
}
