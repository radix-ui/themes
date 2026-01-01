import React from 'react';
import { getCachedDocMetadata } from '@/lib/docs-metadata';
import RadiusPageClient from './page-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getCachedDocMetadata('/docs/radius');

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function RadiusPage() {
  const metadata = getCachedDocMetadata('/docs/radius');

  return <RadiusPageClient metadata={metadata || undefined} />;
}
