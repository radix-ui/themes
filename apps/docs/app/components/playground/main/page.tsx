'use client';

import { Theme, Box, Flex, Heading, Container, Image, Sidebar } from '@kushagradhawan/kookie-ui';
import { useControls, Leva } from 'leva';
import { useRef, useCallback, useState } from 'react';
import {
  AlertTriangle,
  RectangleHorizontal,
  User,
  Award,
  Mouse,
  MessageSquare,
  CreditCard,
  CheckSquare,
  Grid3X3,
  Check,
  MoreHorizontal,
  MessageCircle,
  ChevronDown,
  Type,
  MousePointer,
  Image as ImageIcon,
  HelpCircle,
  BarChart3,
  Circle,
  SquareCheckBig,
  Users,
  List,
  ToggleLeft,
  Navigation,
  PanelLeft,
  Sliders,
  ToggleRight,
  Folder,
  Table,
  FileText,
  Search,
  UserCheck,
} from 'lucide-react';

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
    'https://images.unsplash.com/photo-1746003288323-89dba68721f6?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  '3D Render':
    'https://images.unsplash.com/photo-1741145018917-216c9275bc3a?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

const componentSections = [
  {
    title: 'Actions',
    components: [
      { id: 'button', name: 'Button', icon: Mouse, component: ButtonPlayground },
      {
        id: 'icon-button',
        name: 'Icon Button',
        icon: MousePointer,
        component: IconButtonPlayground,
      },
      {
        id: 'toggle-button',
        name: 'Toggle Button',
        icon: ToggleLeft,
        component: ToggleButtonPlayground,
      },
      {
        id: 'toggle-icon-button',
        name: 'Toggle Icon Button',
        icon: ToggleRight,
        component: ToggleIconButtonPlayground,
      },
    ],
  },
  {
    title: 'Forms',
    components: [
      { id: 'checkbox', name: 'Checkbox', icon: CheckSquare, component: CheckboxPlayground },
      {
        id: 'checkbox-cards',
        name: 'Checkbox Cards',
        icon: Grid3X3,
        component: CheckboxCardsPlayground,
      },
      {
        id: 'checkbox-group',
        name: 'Checkbox Group',
        icon: Check,
        component: CheckboxGroupPlayground,
      },
      { id: 'radio', name: 'Radio', icon: Circle, component: RadioPlayground },
      {
        id: 'radio-cards',
        name: 'Radio Cards',
        icon: SquareCheckBig,
        component: RadioCardsPlayground,
      },
      { id: 'radio-group', name: 'Radio Group', icon: Users, component: RadioGroupPlayground },
      { id: 'select', name: 'Select', icon: ChevronDown, component: SelectPlayground },
      {
        id: 'segmented-control',
        name: 'Segmented Control',
        icon: List,
        component: SegmentedControlPlayground,
      },
      { id: 'slider', name: 'Slider', icon: Sliders, component: SliderPlayground },
      { id: 'switch', name: 'Switch', icon: ToggleLeft, component: SwitchPlayground },
      { id: 'text-area', name: 'Text Area', icon: FileText, component: TextAreaPlayground },
      { id: 'text-field', name: 'Text Field', icon: Search, component: TextFieldPlayground },
    ],
  },
  {
    title: 'Display',
    components: [
      { id: 'avatar', name: 'Avatar', icon: User, component: AvatarPlayground },
      { id: 'badge', name: 'Badge', icon: Award, component: BadgePlayground },
      { id: 'card', name: 'Card', icon: CreditCard, component: CardPlayground },
      { id: 'user-card', name: 'User Card', icon: UserCheck, component: UserCardPlayground },
      { id: 'callout', name: 'Callout', icon: MessageSquare, component: CalloutPlayground },
      { id: 'heading', name: 'Heading', icon: Type, component: HeadingPlayground },
      { id: 'text', name: 'Text', icon: FileText, component: TextPlayground },
      { id: 'image', name: 'Image', icon: ImageIcon, component: ImagePlayground },
      { id: 'progress', name: 'Progress', icon: BarChart3, component: ProgressPlayground },
      { id: 'table', name: 'Table', icon: Table, component: TablePlayground },
    ],
  },
  {
    title: 'Overlays',
    components: [
      {
        id: 'alert-dialog',
        name: 'Alert Dialog',
        icon: AlertTriangle,
        component: AlertDialogPlayground,
      },
      {
        id: 'context-menu',
        name: 'Context Menu',
        icon: MoreHorizontal,
        component: ContextMenuPlayground,
      },
      { id: 'dialog', name: 'Dialog', icon: MessageCircle, component: DialogPlayground },
      {
        id: 'dropdown-menu',
        name: 'Dropdown Menu',
        icon: ChevronDown,
        component: DropdownMenuPlayground,
      },
      { id: 'popover', name: 'Popover', icon: HelpCircle, component: PopoverPlayground },
    ],
  },
  {
    title: 'Navigation',
    components: [
      { id: 'sidebar', name: 'Sidebar', icon: PanelLeft, component: SidebarPlayground },
      { id: 'tabs', name: 'Tabs', icon: Folder, component: TabsPlayground },
    ],
  },
  {
    title: 'Layout',
    components: [
      {
        id: 'aspect-ratio',
        name: 'Aspect Ratio',
        icon: RectangleHorizontal,
        component: AspectRatioPlayground,
      },
    ],
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
    blur: { value: true, label: 'Blur Effect' },
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
            p="6"
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
              variant={backgroundControls.blur ? 'blur' : 'surface'}
              style={{
                zIndex: -1,
                opacity: backgroundControls.opacity,
              }}
              wrapperStyle={{ width: '100%', height: '100%', display: 'block' }}
              fit="cover"
            />
          </Box>
        )}

        <Sidebar.Provider>
          <PlaygroundContent scrollToComponent={scrollToComponent} containerRef={containerRef} />
        </Sidebar.Provider>
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
  const { state: sidebarState } = Sidebar.useSidebar();
  const isSidebarExpanded = sidebarState === 'expanded';

  return (
    <Flex style={{ height: '100vh', position: 'relative' }}>
      <Sidebar.Root variant="soft" menuVariant="soft" size="2" collapsible="icon">
        <Sidebar.Content>
          <Sidebar.Menu>
            {componentSections.map((section) => (
              <Sidebar.Group key={section.title}>
                <Sidebar.GroupLabel>{section.title}</Sidebar.GroupLabel>
                {section.components.map((component) => (
                  <Sidebar.MenuItem key={component.id}>
                    <Sidebar.MenuButton onClick={() => scrollToComponent(component.id)}>
                      <component.icon />
                      <span>{component.name}</span>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                ))}
              </Sidebar.Group>
            ))}
          </Sidebar.Menu>
        </Sidebar.Content>
      </Sidebar.Root>

      {/* Main content area - expands when sidebar is collapsed */}
      <Box
        style={{
          flex: 1,
          overflow: 'auto',
          position: 'relative',
        }}
      >
        {/* Responsive sidebar trigger - moves based on sidebar state */}
        <Box
          style={{
            position: 'fixed',
            top: 'var(--space-4)',
            left: isSidebarExpanded
              ? 'calc(16rem + var(--space-4))' // Next to expanded sidebar
              : 'var(--space-4)', // Left edge when sidebar is collapsed
            zIndex: 50,
            transition: 'left var(--duration-3) var(--ease-2)', // Smooth transition for trigger position
          }}
        >
          <Sidebar.Trigger variant="ghost" size="2" color="gray" highContrast>
            <PanelLeft />
          </Sidebar.Trigger>
        </Box>

        {/* Component sections */}
        <Container size="4" py="6" ref={containerRef}>
          <Flex direction="column" gap="9">
            {componentSections.map((section) => (
              <Box key={section.title}>
                {section.components.map((component) => (
                  <Box key={component.id} id={component.id} pb="9">
                    <component.component />
                  </Box>
                ))}
              </Box>
            ))}
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
}
