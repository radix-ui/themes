'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { TabNav, Heading, Flex } from '@radix-ui/themes';

export function Nav() {
  const pathname = usePathname();
  return (
    <Flex direction="column" gap="9">
      <Flex direction="column" gap="2">
        <Heading size="3">Straight up `TabNav.Link`</Heading>
        <TabNav.Root>
          <TabNav.Link href="/test-tabnav" active={pathname === '/test-tabnav'}>
            Accounts
          </TabNav.Link>
          <TabNav.Link href="/test-tabnav/documents" active={pathname === '/test-tabnav/documents'}>
            Documents
          </TabNav.Link>
          <TabNav.Link href="/test-tabnav/settings" active={pathname === '/test-tabnav/settings'}>
            Settings
          </TabNav.Link>
        </TabNav.Root>
      </Flex>

      <Flex direction="column" gap="2">
        <Heading size="3">{`<TabNav.Link asChild>`} with `NextLink`</Heading>
        <TabNav.Root>
          <TabNav.Link asChild active={pathname === '/test-tabnav'}>
            <NextLink href="/test-tabnav">Accounts</NextLink>
          </TabNav.Link>
          <TabNav.Link asChild active={pathname === '/test-tabnav/documents'}>
            <NextLink href="/test-tabnav/documents">Documents</NextLink>
          </TabNav.Link>
          <TabNav.Link asChild active={pathname === '/test-tabnav/settings'}>
            <NextLink href="/test-tabnav/settings">Settings</NextLink>
          </TabNav.Link>
        </TabNav.Root>
      </Flex>

      <Flex direction="column" gap="2">
        <Heading size="3">{`<NextLink passHref legacyBehavior>`} with `TabNav.Link`</Heading>
        <TabNav.Root>
          <NextLink passHref legacyBehavior href="/test-tabnav">
            <TabNav.Link active={pathname === '/test-tabnav'}>Accounts</TabNav.Link>
          </NextLink>
          <NextLink passHref legacyBehavior href="/test-tabnav/documents">
            <TabNav.Link active={pathname === '/test-tabnav/documents'}>Documents</TabNav.Link>
          </NextLink>
          <NextLink passHref legacyBehavior href="/test-tabnav/settings">
            <TabNav.Link active={pathname === '/test-tabnav/settings'}>Settings</TabNav.Link>
          </NextLink>
        </TabNav.Root>
      </Flex>
    </Flex>
  );
}
