import React from 'react';
import { getCachedDocMetadata } from '@/lib/docs-metadata';
import SegmentedControlPageClient from './page-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getCachedDocMetadata('/docs/segmented-control');

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function SegmentedControlPage() {
  const metadata = getCachedDocMetadata('/docs/segmented-control');

  return <SegmentedControlPageClient metadata={metadata || undefined} />;
}
