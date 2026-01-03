'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { DocsShell } from '@kushagradhawan/kookie-blocks';
import { docsNavigation } from '../navigation-config';
import { DarkModeToggle } from './dark-mode';
import { IconButton, Flex, Badge } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { GithubIcon } from '@hugeicons/core-free-icons';

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <DocsShell
      navigation={docsNavigation}
      logo={{
        src: '/kookie-ui-logo.png',
        alt: 'Kookie UI',
        href: '/',
      }}
      pathname={pathname}
      linkComponent={Link as any}
      headerActions={
        <Flex gap="2" align="center">
          <IconButton asChild variant="ghost" highContrast>
            <Link href="https://github.com/KushagraDhawan1997/kookie-ui" target="_blank">
              <HugeiconsIcon icon={GithubIcon} strokeWidth={1.75} />
            </Link>
          </IconButton>
          <Badge variant="classic" highContrast color="gray" size="1">
            v{process.env.KOOKIE_UI_VERSION}
          </Badge>
        </Flex>
      }
      sidebarFooter={<DarkModeToggle />}
    >
      {children}
    </DocsShell>
  );
}
