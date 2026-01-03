import React from 'react';
import { getCachedDocMetadata } from '@/lib/docs-metadata';
import ToggleIconButtonPageClient from './page-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getCachedDocMetadata('/docs/toggle-icon-button');

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function ToggleIconButtonPage() {
  const metadata = getCachedDocMetadata('/docs/toggle-icon-button');

  return <ToggleIconButtonPageClient metadata={metadata || undefined} />;
}
