'use client';

import React from 'react';
import ComponentPage from '../../components/component-page';
import ContentMDX from './shadows.mdx';
import type { DocMetadata } from '@/lib/frontmatter';

interface ShadowsPageClientProps {
  metadata?: DocMetadata;
}

export default function ShadowsPageClient({ metadata }: ShadowsPageClientProps) {
  return (
    <ComponentPage metadata={metadata}>
      <ContentMDX />
    </ComponentPage>
  );
}
