'use client';

import React from 'react';
import ComponentPage from '../../components/component-page';
import ContentMDX from './content.mdx';
import type { DocMetadata } from '@/lib/frontmatter';

interface InstallationPageClientProps {
  metadata?: DocMetadata;
}

export default function InstallationPageClient({ metadata }: InstallationPageClientProps) {
  return (
    <ComponentPage metadata={metadata}>
      <ContentMDX />
    </ComponentPage>
  );
}
