'use client';

import React from 'react';
import ComponentPage from '../../components/component-page';
import ContentMDX from './constants.mdx';
import type { DocMetadata } from '@/lib/frontmatter';

interface ConstantsPageClientProps {
  metadata?: DocMetadata;
}

export default function ConstantsPageClient({ metadata }: ConstantsPageClientProps) {
  return (
    <ComponentPage metadata={metadata}>
      <ContentMDX />
    </ComponentPage>
  );
}
