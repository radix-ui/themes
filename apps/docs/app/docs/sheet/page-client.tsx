'use client';

import React from 'react';
import { TableOfContents } from "@kushagradhawan/kookie-blocks";
import { SiteDocsPage } from "@/components/site-docs-page";
import ContentMDX from "./content.mdx";
import type { DocMetadata } from "@/lib/frontmatter";

interface SheetPageClientProps {
  metadata?: DocMetadata;
}

export default function SheetPageClient({ metadata }: SheetPageClientProps) {
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
