import React from 'react';
import { getCachedDocMetadata } from '@/lib/docs-metadata';
import ChatbarPageClient from './page-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getCachedDocMetadata('/docs/chatbar');

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function ChatbarPage() {
  const metadata = getCachedDocMetadata('/docs/chatbar');

  return <ChatbarPageClient metadata={metadata || undefined} />;
}
