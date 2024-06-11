'use client';

import * as React from 'react';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import { TabNav } from '@radix-ui/themes';

const TabNavDemo = React.forwardRef<
  React.ElementRef<typeof TabNav.Root>,
  React.ComponentPropsWithoutRef<typeof TabNav.Root>
>((props, forwardedRef) => {
  const params = useSearchParams();
  const tab = params?.get('tab');
  return (
    <TabNav.Root {...props} ref={forwardedRef}>
      <TabNav.Link asChild active={tab === 'account' || tab === null}>
        <NextLink href="/sink?tab=account#tab-nav" scroll={false}>
          Account
        </NextLink>
      </TabNav.Link>
      <TabNav.Link asChild active={tab === 'documents'}>
        <NextLink href="/sink?tab=documents#tab-nav" scroll={false}>
          Documents
        </NextLink>
      </TabNav.Link>
      <TabNav.Link asChild active={tab === 'settings'}>
        <NextLink href="/sink?tab=settings#tab-nav" scroll={false}>
          Settings
        </NextLink>
      </TabNav.Link>

      {/* without asChild */}
      {/* <TabNav.Link href="/sink?tab=account#tab-nav" active={tab === 'account' || tab === null}>
        Account
      </TabNav.Link>
      <TabNav.Link href="/sink?tab=documents#tab-nav" active={tab === 'documents'}>
        Documents
      </TabNav.Link>
      <TabNav.Link href="/sink?tab=settings#tab-nav" active={tab === 'settings'}>
        Settings
      </TabNav.Link> */}
    </TabNav.Root>
  );
});
TabNavDemo.displayName = 'TabNavDemo';

export { TabNavDemo };
