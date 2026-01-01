'use client';

import React from 'react';
import ComponentPage from '../../components/component-page';
import ContentMDX from './content.mdx';
import type { DocMetadata } from '@/lib/frontmatter';

interface ShellPageClientProps {
  metadata?: DocMetadata;
}

export default function ShellPageClient({ metadata }: ShellPageClientProps) {
  return (
    <ComponentPage metadata={metadata}>
      <ContentMDX />
    </ComponentPage>
  );
}
