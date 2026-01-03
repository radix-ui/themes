import React from 'react';
import { getCachedDocMetadata } from '@/lib/docs-metadata';
import ImagePageClient from './page-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getCachedDocMetadata('/docs/image');

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function ImagePage() {
  const metadata = getCachedDocMetadata('/docs/image');

  return <ImagePageClient metadata={metadata || undefined} />;
}
