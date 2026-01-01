'use client';

import React from 'react';
import ComponentPage from '../../components/component-page';
import ContentMDX from './material.mdx';
import type { DocMetadata } from '@/lib/frontmatter';

interface MaterialPageClientProps {
  metadata?: DocMetadata;
}

export default function MaterialPageClient({ metadata }: MaterialPageClientProps) {
  return (
    <ComponentPage metadata={metadata}>
      <ContentMDX />
    </ComponentPage>
  );
}
