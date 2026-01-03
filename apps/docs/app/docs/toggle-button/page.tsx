import React from 'react';
import { getCachedDocMetadata } from '@/lib/docs-metadata';
import ToggleButtonPageClient from './page-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getCachedDocMetadata('/docs/toggle-button');

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function ToggleButtonPage() {
  const metadata = getCachedDocMetadata('/docs/toggle-button');

  return <ToggleButtonPageClient metadata={metadata || undefined} />;
}
