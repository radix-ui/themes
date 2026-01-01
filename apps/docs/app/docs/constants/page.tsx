import React from 'react';
import { getCachedDocMetadata } from '@/lib/docs-metadata';
import ConstantsPageClient from './page-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getCachedDocMetadata('/docs/constants');

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function ConstantsPage() {
  const metadata = getCachedDocMetadata('/docs/constants');

  return <ConstantsPageClient metadata={metadata || undefined} />;
}
