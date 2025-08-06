'use client';

import { Box, Flex, Sidebar, ScrollArea } from '@kushagradhawan/kookie-ui';
import {
  Mouse,
  Square,
  ToggleLeft,
  ToggleRight,
  Image as ImageIcon,
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
    <Sidebar.Provider>
      <Flex height="100vh">
        {/* Sidebar */}
        <Sidebar.Root
          variant="ghost"
          color="gray"
          menuVariant="soft"
          size="2"
          collapsible="icon"
          type="floating"
        >
          <Sidebar.Content>
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

        {/* Content Area - ScrollArea */}
        <ScrollArea style={{ flexGrow: 1 }}>{children}</ScrollArea>
      </Flex>
    </Sidebar.Provider>
  );
}
