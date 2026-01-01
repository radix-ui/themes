'use client';

import React from 'react';
import ComponentPage from '../../components/component-page';
import ContentMDX from './colors.mdx';
import type { DocMetadata } from '@/lib/frontmatter';

interface ColorsPageClientProps {
  metadata?: DocMetadata;
}

export default function ColorsPageClient({ metadata }: ColorsPageClientProps) {
  return (
    <ComponentPage metadata={metadata}>
      <ContentMDX />
    </ComponentPage>
  );
}
