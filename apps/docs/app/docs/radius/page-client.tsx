'use client';

import React from 'react';
import ComponentPage from '../../components/component-page';
import ContentMDX from './radius.mdx';
import type { DocMetadata } from '@/lib/frontmatter';

interface RadiusPageClientProps {
  metadata?: DocMetadata;
}

export default function RadiusPageClient({ metadata }: RadiusPageClientProps) {
  return (
    <ComponentPage metadata={metadata}>
      <ContentMDX />
    </ComponentPage>
  );
}
