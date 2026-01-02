'use client';

import React from 'react';
import { TableOfContents } from "@kushagradhawan/kookie-blocks";
import { SiteDocsPage } from "@/components/site-docs-page";
import ContentMDX from './colors.mdx';
import type { DocMetadata } from "@/lib/frontmatter";

interface ColorsPageClientProps {
  metadata?: DocMetadata;
}

export default function ColorsPageClient({ metadata }: ColorsPageClientProps) {
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
