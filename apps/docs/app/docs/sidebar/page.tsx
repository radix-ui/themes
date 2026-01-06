import React from 'react';
import { getCachedDocMetadata } from '@/lib/docs-metadata';
import SidebarPageClient from './page-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getCachedDocMetadata('/docs/sidebar');

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function SidebarPage() {
  const metadata = getCachedDocMetadata('/docs/sidebar');

  return <SidebarPageClient metadata={metadata || undefined} />;
}

