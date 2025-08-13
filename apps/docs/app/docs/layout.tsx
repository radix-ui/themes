'use client';

import { Box, Flex, Sidebar, ScrollArea, Shell, IconButton } from '@kushagradhawan/kookie-ui';
import {
  Mouse,
  Square,
  ToggleLeft,
  ToggleRight,
  Image as ImageIcon,
  PanelLeft,
  BookOpen,
  Ruler,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const foundations = [
  {
    title: 'Foundations',
    components: [
      { id: 'introduction', name: 'Introduction', icon: BookOpen, href: '/docs/Introduction' },
      { id: 'workspace', name: 'Workspace', icon: Ruler, href: '/docs/Workspace' },
      { id: 'sizing', name: 'Sizing', icon: Ruler, href: '/docs/Sizing' },
    ],
  },
];

const componentSections = [
  {
    title: 'Menus and actions',
    components: [
      { id: 'button', name: 'Button', icon: Mouse, href: '/docs/Button' },
      { id: 'icon-button', name: 'IconButton', icon: Square, href: '/docs/IconButton' },
      { id: 'toggle-button', name: 'ToggleButton', icon: ToggleLeft, href: '/docs/ToggleButton' },
      {
        id: 'toggle-icon-button',
        name: 'ToggleIconButton',
        icon: ToggleRight,
        href: '/docs/ToggleIconButton',
      },
      { id: 'image', name: 'Image', icon: ImageIcon, href: '/docs/Image' },
    ],
  },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <Shell.Root>
      <Shell.Header className="rt-flex rt-items-center rt-gap-2 rt-px-3">
        <Shell.Trigger side="start" aria-label="Toggle navigation">
          <PanelLeft />
        </Shell.Trigger>
      </Shell.Header>

      <Shell.Sidebar side="start" defaultValue="both" as="div">
        <Shell.Sidebar.Rail>
          <Sidebar.Root variant="soft" color="gray" menuVariant="soft" size="2">
            <Sidebar.Content role="none" aria-label="Primary categories">
              <Sidebar.Menu>
                {[
                  { id: 'foundations', label: 'Foundations' },
                  { id: 'components', label: 'Components' },
                ].map((cat) => (
                  <Sidebar.MenuItem key={cat.id}>
                    <Sidebar.MenuButton>
                      <span>{cat.label}</span>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                ))}
              </Sidebar.Menu>
            </Sidebar.Content>
          </Sidebar.Root>
        </Shell.Sidebar.Rail>
        <Shell.Sidebar.Panel>
          <Sidebar.Root variant="soft" color="gray" menuVariant="soft" size="2">
            <Sidebar.Content aria-label="Primary navigation">
              <Sidebar.Menu>
                {foundations.map((section) => (
                  <Sidebar.Group key={section.title}>
                    <Sidebar.GroupLabel>{section.title}</Sidebar.GroupLabel>
                    {section.components.map((component) => (
                      <Sidebar.MenuItem key={component.id}>
                        <Sidebar.MenuButton asChild>
                          <Link href={component.href}>
                            {/* <component.icon /> */}
                            <span>{component.name}</span>
                          </Link>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                    ))}
                  </Sidebar.Group>
                ))}
                {componentSections.map((section) => (
                  <Sidebar.Group key={section.title}>
                    <Sidebar.GroupLabel>{section.title}</Sidebar.GroupLabel>
                    {section.components.map((component) => (
                      <Sidebar.MenuItem key={component.id}>
                        <Sidebar.MenuButton asChild>
                          <Link href={component.href}>
                            {/* <component.icon /> */}
                            <span>{component.name}</span>
                          </Link>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                    ))}
                  </Sidebar.Group>
                ))}
              </Sidebar.Menu>
            </Sidebar.Content>
          </Sidebar.Root>
        </Shell.Sidebar.Panel>
      </Shell.Sidebar>

      <Shell.Content>{children}</Shell.Content>

      <Shell.Footer />
    </Shell.Root>
  );
}
