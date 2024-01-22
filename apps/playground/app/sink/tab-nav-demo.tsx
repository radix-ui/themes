'use client';

import * as React from 'react';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import { TabNavRoot, TabNavItem } from '@radix-ui/themes';

const TabNavDemo = React.forwardRef<
  React.ElementRef<typeof TabNavRoot>,
  React.ComponentPropsWithoutRef<typeof TabNavRoot>
>((props, forwardedRef) => {
  const params = useSearchParams();
  const tab = params.get('tab');
  return (
    <TabNavRoot {...props} ref={forwardedRef}>
      <TabNavItem asChild active={tab === 'account' || tab === null}>
        <NextLink href="/sink?tab=account#tab-nav" scroll={false}>
          Account
        </NextLink>
      </TabNavItem>
      <TabNavItem asChild active={tab === 'documents'}>
        <NextLink href="/sink?tab=documents#tab-nav" scroll={false}>
          Documents
        </NextLink>
      </TabNavItem>
      <TabNavItem asChild active={tab === 'settings'}>
        <NextLink href="/sink?tab=settings#tab-nav" scroll={false}>
          Settings
        </NextLink>
      </TabNavItem>

      {/* without asChild */}
      {/* <TabNavItem href="/sink?tab=account#tab-nav" active={tab === 'account' || tab === null}>
        Account
      </TabNavItem>
      <TabNavItem href="/sink?tab=documents#tab-nav" active={tab === 'documents'}>
        Documents
      </TabNavItem>
      <TabNavItem href="/sink?tab=settings#tab-nav" active={tab === 'settings'}>
        Settings
      </TabNavItem> */}
    </TabNavRoot>
  );
});
TabNavDemo.displayName = 'TabNavDemo';

export { TabNavDemo };
