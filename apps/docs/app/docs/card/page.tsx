import React from 'react';
import { getCachedDocMetadata } from '@/lib/docs-metadata';
import PageClient from './page-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getCachedDocMetadata('/docs/card');

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function Page() {
  const metadata = getCachedDocMetadata('/docs/card');

  return <PageClient metadata={metadata || undefined} />;
}
