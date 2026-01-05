'use client';

import { DocsPage } from '@kushagradhawan/kookie-blocks';
import type { DocsPageMeta } from '@kushagradhawan/kookie-blocks';
import type { ReactNode } from 'react';

interface SiteDocsPageProps {
  children: ReactNode;
  meta?: DocsPageMeta;
  tableOfContents?: ReactNode;
  maxWidth?: string | number;
  padding?: '3' | '4' | '5' | '6' | '7' | '8' | '9';
  headerActions?: ReactNode;
  headerTabs?: ReactNode;
  header?: ReactNode;
}

/**
 * Site-specific DocsPage wrapper with default footer configuration.
 * Use this instead of DocsPage directly to avoid repeating footer props.
 */
export function SiteDocsPage(props: SiteDocsPageProps) {
  return (
    <DocsPage
      containerSize="2"
      {...props}
      showFooter
      footerCopyright={{
        name: 'Kushagra Dhawan',
        url: 'https://www.kushagradhawan.com',
      }}
      githubUrl="https://github.com/KushagraDhawan1997/kookie-ui"
    />
  );
}
