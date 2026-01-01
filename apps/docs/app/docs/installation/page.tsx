import React from 'react';
import { getCachedDocMetadata } from '@/lib/docs-metadata';
import InstallationPageClient from './page-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getCachedDocMetadata('/docs/installation');

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function InstallationPage() {
  const metadata = getCachedDocMetadata('/docs/installation');

  return <InstallationPageClient metadata={metadata || undefined} />;
}
