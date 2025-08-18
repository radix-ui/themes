'use client';

import React from 'react';
import { useControls, Leva } from 'leva';
import { useRef, useCallback, useState } from 'react';
import { PanelLeft } from 'lucide-react';
import {
  Theme,
  Box,
  Flex,
  Heading,
  Container,
  Image,
  Sidebar,
  Shell,
} from '@kushagradhawan/kookie-ui';

import AccordionPlayground from '../AccordionPlayground';
import AlertDialogPlayground from '../AlertDialogPlayground';
import AspectRatioPlayground from '../AspectRatioPlayground';
import AvatarPlayground from '../AvatarPlayground';
import BadgePlayground from '../BadgePlayground';
import ButtonPlayground from '../ButtonPlayground';
import CalloutPlayground from '../CalloutPlayground';
import CardPlayground from '../CardPlayground';
import CheckboxPlayground from '../CheckboxPlayground';
import CheckboxCardsPlayground from '../CheckboxCardsPlayground';
import CheckboxGroupPlayground from '../CheckboxGroupPlayground';
import ContextMenuPlayground from '../ContextMenuPlayground';
import DialogPlayground from '../DialogPlayground';
import DropdownMenuPlayground from '../DropdownMenuPlayground';
import HeadingPlayground from '../HeadingPlayground';
import IconButtonPlayground from '../IconButtonPlayground';
import ImagePlayground from '../ImagePlayground';
import PopoverPlayground from '../PopoverPlayground';
import ProgressPlayground from '../ProgressPlayground';
import RadioPlayground from '../RadioPlayground';
import RadioCardsPlayground from '../RadioCardsPlayground';
import RadioGroupPlayground from '../RadioGroupPlayground';
import SelectPlayground from '../SelectPlayground';
import SegmentedControlPlayground from '../SegmentedControlPlayground';
import SliderPlayground from '../SliderPlayground';
import SwitchPlayground from '../SwitchPlayground';
import TabsPlayground from '../TabsPlayground';
import TextAreaPlayground from '../TextAreaPlayground';
import TextFieldPlayground from '../TextFieldPlayground';
import TextPlayground from '../TextPlayground';
import ToggleButtonPlayground from '../ToggleButtonPlayground';
import ToggleIconButtonPlayground from '../ToggleIconButtonPlayground';
import UserCardPlayground from '../UserCardPlayground';
import SidebarPlayground from '../SidebarPlayground';
import TablePlayground from '../TablePlayground';

const backgroundImages = {
  'Abstract Dark':
    'https://images.unsplash.com/photo-1678025276032-fd796f4a0ec2?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Abstract Light':
    'https://images.unsplash.com/vector-1741103922268-b32c11b13733?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  '3D Render':
    'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

const componentSections = [
  {
    title: 'Content',
    components: [
      { id: 'heading', name: 'Heading', component: HeadingPlayground },
      { id: 'text', name: 'Text', component: TextPlayground },
      { id: 'image', name: 'Image', component: ImagePlayground },
      { id: 'callout', name: 'Callout', component: CalloutPlayground },
    ],
  },
  {
    title: 'Layout and organization',
    components: [
      {
        id: 'accordion',
        name: 'Accordion',
        component: AccordionPlayground,
      },
      { id: 'table', name: 'Table', component: TablePlayground },
      { id: 'tabs', name: 'Tabs', component: TabsPlayground },
      {
        id: 'aspect-ratio',
        name: 'Aspect Ratio',
        component: AspectRatioPlayground,
      },
    ],
  },
  {
    title: 'Menus and actions',
    components: [
      { id: 'button', name: 'Button', component: ButtonPlayground },
      {
        id: 'icon-button',
        name: 'Icon Button',
        component: IconButtonPlayground,
      },
      {
        id: 'context-menu',
        name: 'Context Menu',
        component: ContextMenuPlayground,
      },
      {
        id: 'dropdown-menu',
        name: 'Dropdown Menu',
        component: DropdownMenuPlayground,
      },
    ],
  },
  {
    title: 'Navigation and search',
    components: [
      { id: 'text-field', name: 'Text Field', component: TextFieldPlayground },
      // { id: 'sidebar', name: 'Sidebar', component: SidebarPlayground },
    ],
  },
  {
    title: 'Presentation',
    components: [
      {
        id: 'alert-dialog',
        name: 'Alert Dialog',
        component: AlertDialogPlayground,
      },
      { id: 'card', name: 'Card', component: CardPlayground },
      { id: 'popover', name: 'Popover', component: PopoverPlayground },
      { id: 'dialog', name: 'Dialog', component: DialogPlayground },
    ],
  },
  {
    title: 'Selection and input',
    components: [
      { id: 'checkbox', name: 'Checkbox', component: CheckboxPlayground },
      {
        id: 'checkbox-cards',
        name: 'Checkbox Cards',
        component: CheckboxCardsPlayground,
      },
      {
        id: 'checkbox-group',
        name: 'Checkbox Group',
        component: CheckboxGroupPlayground,
      },
      { id: 'radio', name: 'Radio', component: RadioPlayground },
      {
        id: 'radio-cards',
        name: 'Radio Cards',
        component: RadioCardsPlayground,
      },
      { id: 'radio-group', name: 'Radio Group', component: RadioGroupPlayground },
      { id: 'select', name: 'Select', component: SelectPlayground },
      {
        id: 'segmented-control',
        name: 'Segmented Control',
        component: SegmentedControlPlayground,
      },
      { id: 'slider', name: 'Slider', component: SliderPlayground },
      { id: 'switch', name: 'Switch', component: SwitchPlayground },
      {
        id: 'toggle-button',
        name: 'Toggle Button',
        component: ToggleButtonPlayground,
      },
      {
        id: 'toggle-icon-button',
        name: 'Toggle Icon Button',
        component: ToggleIconButtonPlayground,
      },
      { id: 'text-area', name: 'Text Area', component: TextAreaPlayground },
    ],
  },
  {
    title: 'Status',
    components: [
      { id: 'badge', name: 'Badge', component: BadgePlayground },
      { id: 'progress', name: 'Progress', component: ProgressPlayground },
    ],
  },
  {
    title: 'System experiences',
    components: [
      { id: 'avatar', name: 'Avatar', component: AvatarPlayground },
      { id: 'user-card', name: 'User Card', component: UserCardPlayground },
    ],
  },
  {
    title: 'Test',
  },
];

export default function MainPlayground() {
  const containerRef = useRef<HTMLDivElement>(null);

  const backgroundControls = useControls('Background Image', {
    enabled: { value: false, label: 'Show Background' },
    image: {
      value: 'Abstract Light',
      options: Object.keys(backgroundImages),
      label: 'Image',
    },
    opacity: { value: 1, min: 0, max: 1, step: 0.1, label: 'Opacity' },
    blur: { value: false, label: 'Blur Effect' },
  });

  const scrollToComponent = useCallback((componentId: string) => {
    const element = document.getElementById(componentId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }, []);

  return (
    <>
      <Leva
        collapsed={false}
        oneLineLabels
        titleBar={{ title: 'Playground Controls' }}
        theme={{
          sizes: {
            titleBarHeight: '36px',
          },
        }}
      />
      <Theme>
        {backgroundControls.enabled && (
          <Box
            p="1"
            position="fixed"
            top="0"
            left="0"
            style={{ zIndex: -1 }}
            height="100vh"
            width="100vw"
          >
            <Image
              src={backgroundImages[backgroundControls.image as keyof typeof backgroundImages]}
              alt="Background Image"
              width="100%"
              height="100%"
              style={{
                zIndex: -1,
                opacity: backgroundControls.opacity,
                width: '100%',
                height: '100%',
                display: 'block',
              }}
              fit="cover"
              radius="large"
            />
          </Box>
        )}

        <PlaygroundContent scrollToComponent={scrollToComponent} containerRef={containerRef} />
      </Theme>
    </>
  );
}

// Inner component that uses the sidebar context
function PlaygroundContent({
  scrollToComponent,
  containerRef,
}: {
  scrollToComponent: (id: string) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [selectedSectionTitle, setSelectedSectionTitle] = useState<string>(
    componentSections[0]?.title ?? 'Content',
  );

  return (
    <Shell.Root>
      <Shell.Header>
        <Flex align="center" gap="2" px="3">
          <Shell.Trigger side="start" aria-label="Toggle navigation">
            <PanelLeft />
          </Shell.Trigger>
        </Flex>
      </Shell.Header>

      <Shell.Sidebar side="start" defaultValue="open" as="div">
        <Shell.Sidebar.Rail>
          <RailMenu
            sections={componentSections}
            onSelect={(title) => setSelectedSectionTitle(title)}
          />
        </Shell.Sidebar.Rail>
        <Shell.Sidebar.Panel>
          <PanelMenu
            sections={componentSections}
            selectedTitle={selectedSectionTitle}
            onSelectComponent={(id) => scrollToComponent(id)}
          />
        </Shell.Sidebar.Panel>
      </Shell.Sidebar>

      <Shell.Content>
        <Container size="4" py="6" ref={containerRef}>
          <Flex direction="column" gap="9">
            {componentSections.map((section) => (
              <Box key={section.title}>
                {section.components?.map((component) => (
                  <Box key={component.id} id={component.id} pb="9">
                    <component.component />
                  </Box>
                ))}
              </Box>
            ))}
          </Flex>
        </Container>
      </Shell.Content>
    </Shell.Root>
  );
}

function RailMenu({
  sections,
  onSelect,
}: {
  sections: { title: string; components?: { id: string; name: string }[] }[];
  onSelect: (title: string) => void;
}) {
  const { panel } = Shell.useSidebar('start');
  return (
    <Sidebar.Root variant="soft" menuVariant="soft" size="2">
      <Sidebar.Content aria-label="Playground sections" role="none">
        <Sidebar.Menu>
          {sections.map((section) => (
            <Sidebar.MenuItem key={section.title}>
              <Sidebar.MenuButton
                onClick={() => {
                  onSelect(section.title);
                  // Rail emits selection event - Shell coordinates panel visibility
                  if (section.components && section.components.length > 0) {
                    panel.show();
                  } else {
                    panel.hide();
                  }
                }}
              >
                <span>{section.title}</span>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          ))}
        </Sidebar.Menu>
      </Sidebar.Content>
    </Sidebar.Root>
  );
}

function PanelMenu({
  sections,
  selectedTitle,
  onSelectComponent,
}: {
  sections: { title: string; components?: { id: string; name: string }[] }[];
  selectedTitle: string;
  onSelectComponent: (id: string) => void;
}) {
  const selected = sections.find((s) => s.title === selectedTitle);
  if (!selected || !selected.components || selected.components.length === 0) return null;
  return (
    <Sidebar.Root variant="soft" menuVariant="soft" size="2">
      <Sidebar.Content aria-label="Playground navigation">
        <Sidebar.Menu>
          <Sidebar.Group>
            <Sidebar.GroupLabel>{selected.title}</Sidebar.GroupLabel>
            {selected.components.map((component) => (
              <Sidebar.MenuItem key={component.id}>
                <Sidebar.MenuButton onClick={() => onSelectComponent(component.id)}>
                  <span>{component.name}</span>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            ))}
          </Sidebar.Group>
        </Sidebar.Menu>
      </Sidebar.Content>
    </Sidebar.Root>
  );
}
