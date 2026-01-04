'use client';

import { useState } from 'react';
import { TableOfContents } from '@kushagradhawan/kookie-blocks';
import { Tabs } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { BookOpen01Icon, EyeIcon } from '@hugeicons/core-free-icons';
import { SiteDocsPage } from '@/components/site-docs-page';
import ContentMDX from './content.mdx';
import { CalloutExamples } from './examples';
import type { DocMetadata } from '@/lib/frontmatter';

interface PageClientProps {
  metadata?: DocMetadata;
}

export default function PageClient({ metadata }: PageClientProps) {
  const [activeTab, setActiveTab] = useState<'docs' | 'examples'>('docs');

  return (
    <SiteDocsPage
      meta={metadata}
      headerTabs={
        <Tabs.Root value={activeTab} onValueChange={(value) => setActiveTab(value as 'docs' | 'examples')}>
          <Tabs.List>
            <Tabs.Trigger value="docs">
              <HugeiconsIcon icon={BookOpen01Icon} strokeWidth={1.75} />
              Documentation
            </Tabs.Trigger>
            <Tabs.Trigger value="examples">
              <HugeiconsIcon icon={EyeIcon} strokeWidth={1.75} />
              Examples
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
      }
      tableOfContents={<TableOfContents renderContainer={(content) => content || null} />}
    >
      {activeTab === 'docs' ? <ContentMDX /> : <CalloutExamples />}
    </SiteDocsPage>
  );
}
