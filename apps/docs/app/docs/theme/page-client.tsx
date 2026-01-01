'use client';

import React from 'react';
import ComponentPage from '../../components/component-page';
import ContentMDX from './theme.mdx';
import type { DocMetadata } from '@/lib/frontmatter';

interface ThemePageClientProps {
  metadata?: DocMetadata;
}

export default function ThemePageClient({ metadata }: ThemePageClientProps) {
  return (
    <ComponentPage metadata={metadata}>
      <ContentMDX />
    </ComponentPage>
  );
}
