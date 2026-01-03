import React from 'react';
import { getCachedDocMetadata } from '@/lib/docs-metadata';
import IconButtonPageClient from './page-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getCachedDocMetadata('/docs/icon-button');

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function IconButtonPage() {
  const metadata = getCachedDocMetadata('/docs/icon-button');

  return <IconButtonPageClient metadata={metadata || undefined} />;
}
