'use client';

import React from 'react';
import ComponentPage from '../../components/component-page';
import ContentMDX from './typography.mdx';
import type { DocMetadata } from '@/lib/frontmatter';

interface TypographyPageClientProps {
  metadata?: DocMetadata;
}

export default function TypographyPageClient({ metadata }: TypographyPageClientProps) {
  return (
    <ComponentPage metadata={metadata}>
      <ContentMDX />
    </ComponentPage>
  );
}
