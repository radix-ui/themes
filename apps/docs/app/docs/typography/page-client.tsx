'use client';

import React from 'react';
import { TableOfContents } from "@kushagradhawan/kookie-blocks";
import { SiteDocsPage } from "@/components/site-docs-page";
import ContentMDX from './typography.mdx';
import type { DocMetadata } from "@/lib/frontmatter";

interface TypographyPageClientProps {
  metadata?: DocMetadata;
}

export default function TypographyPageClient({ metadata }: TypographyPageClientProps) {
  return (
    <SiteDocsPage
      meta={metadata}
      tableOfContents={
        <TableOfContents renderContainer={(content) => content || null} />
      }
    >
      <ContentMDX />
    </SiteDocsPage>
  );
}
