'use client';
import * as React from 'react';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import { TabNav } from '@radix-ui/themes';

function TabNavDemoImpl(props: React.ComponentPropsWithRef<typeof TabNav.Root>) {
  const params = useSearchParams();
  const tab = params?.get('tab');
  return (
    <TabNav.Root {...props}>
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
}

export function TabNavDemo(props: React.ComponentPropsWithRef<typeof TabNav.Root>) {
  return (
    <React.Suspense fallback={null}>
      <TabNavDemoImpl {...props} />
    </React.Suspense>
  );
}
