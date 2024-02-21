'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { TabNavRoot, TabNavLink, Heading, Flex, Text } from '@radix-ui/themes';

export function Nav() {
  const pathname = usePathname();
  return (
    <Flex direction="column" gap="9">
      <Flex direction="column" gap="2">
        <Heading size="3">Straight up `TabNavLink`</Heading>
        <TabNavRoot>
          <TabNavLink href="/test-tabnav" active={pathname === '/test-tabnav'}>
            Accounts
          </TabNavLink>
          <TabNavLink href="/test-tabnav/documents" active={pathname === '/test-tabnav/documents'}>
            Documents
          </TabNavLink>
          <TabNavLink href="/test-tabnav/settings" active={pathname === '/test-tabnav/settings'}>
            Settings
          </TabNavLink>
        </TabNavRoot>
      </Flex>

      <Flex direction="column" gap="2">
        <Heading size="3">{`<TabNavLink asChild>`} with `NextLink`</Heading>
        <TabNavRoot>
          <TabNavLink asChild active={pathname === '/test-tabnav'}>
            <NextLink href="/test-tabnav">Accounts</NextLink>
          </TabNavLink>
          <TabNavLink asChild active={pathname === '/test-tabnav/documents'}>
            <NextLink href="/test-tabnav/documents">Documents</NextLink>
          </TabNavLink>
          <TabNavLink asChild active={pathname === '/test-tabnav/settings'}>
            <NextLink href="/test-tabnav/settings">Settings</NextLink>
          </TabNavLink>
        </TabNavRoot>
      </Flex>

      <Flex direction="column" gap="2">
        <Heading size="3">{`<NextLink passHref legacyBehavior>`} with `TabNavLink`</Heading>
        <TabNavRoot>
          <NextLink passHref legacyBehavior href="/test-tabnav">
            <TabNavLink active={pathname === '/test-tabnav'}>Accounts</TabNavLink>
          </NextLink>
          <NextLink passHref legacyBehavior href="/test-tabnav/documents">
            <TabNavLink active={pathname === '/test-tabnav/documents'}>Documents</TabNavLink>
          </NextLink>
          <NextLink passHref legacyBehavior href="/test-tabnav/settings">
            <TabNavLink active={pathname === '/test-tabnav/settings'}>Settings</TabNavLink>
          </NextLink>
        </TabNavRoot>
      </Flex>
    </Flex>
  );
}
