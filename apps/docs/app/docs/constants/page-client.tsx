'use client';

import React from 'react';
import { TableOfContents } from "@kushagradhawan/kookie-blocks";
import { SiteDocsPage } from "@/components/site-docs-page";
import ContentMDX from './constants.mdx';
import type { DocMetadata } from "@/lib/frontmatter";

interface ConstantsPageClientProps {
  metadata?: DocMetadata;
}

export default function ConstantsPageClient({ metadata }: ConstantsPageClientProps) {
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
