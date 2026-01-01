import React from 'react';
import { getCachedDocMetadata } from '@/lib/docs-metadata';
import ShadowsPageClient from './page-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getCachedDocMetadata('/docs/shadows');

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function ShadowsPage() {
  const metadata = getCachedDocMetadata('/docs/shadows');

  return <ShadowsPageClient metadata={metadata || undefined} />;
}
