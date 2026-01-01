'use client';

import React from 'react';
import ComponentPage from '../../components/component-page';
import ContentMDX from './content.mdx';
import type { DocMetadata } from '@/lib/frontmatter';

interface ButtonPageClientProps {
  metadata?: DocMetadata;
}

export default function ButtonPageClient({ metadata }: ButtonPageClientProps) {
  return (
    <ComponentPage metadata={metadata}>
      <ContentMDX />
    </ComponentPage>
  );
}
