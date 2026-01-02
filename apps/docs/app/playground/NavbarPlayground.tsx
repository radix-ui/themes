'use client';

import React from 'react';
import { Navbar, Button, Text, Flex } from '@kushagradhawan/kookie-ui';
import { Home, Settings, User, Menu } from 'lucide-react';
import Playground from '@/components/playground';

const positions = ['fixed', 'sticky', 'static'] as const;
const heights = ['56', '64', '72'] as const;

export default function NavbarPlayground() {
  const [position, setPosition] = React.useState<string>('static');
  const [height, setHeight] = React.useState<string>('64');
  const [showLogo, setShowLogo] = React.useState<boolean>(true);
  const [showNavigation, setShowNavigation] = React.useState<boolean>(true);
  const [showActions, setShowActions] = React.useState<boolean>(true);

  const items = [
    {
      id: 'position',
      label: 'Position',
      type: 'select' as const,
      value: position,
      onChange: setPosition,
      options: positions.map((p) => ({ label: p, value: p })),
      placeholder: 'Select position',
    },
    {
      id: 'height',
      label: 'Height',
      type: 'select' as const,
      value: height,
      onChange: setHeight,
      options: heights.map((h) => ({ label: `${h}px`, value: h })),
      placeholder: 'Select height',
    },
    {
      id: 'show-logo',
      label: 'Show Logo',
      type: 'switch' as const,
      value: showLogo,
      onChange: setShowLogo,
    },
    {
      id: 'show-navigation',
      label: 'Show Navigation',
      type: 'switch' as const,
      value: showNavigation,
      onChange: setShowNavigation,
    },
    {
      id: 'show-actions',
      label: 'Show Actions',
      type: 'switch' as const,
      value: showActions,
      onChange: setShowActions,
    },
  ];

  const generateCode = () => {
    const rootProps = [`position="${position}"`, `height="${height}"`];
    const rootPropsString = rootProps.length > 0 ? `\n  ${rootProps.join('\n  ')}` : '';

    let children = '';
    if (showLogo) {
      children += `\n  <Navbar.Logo>\n    <Text weight="bold">Brand</Text>\n  </Navbar.Logo>`;
    }
    if (showNavigation) {
      children += `\n  <Navbar.Navigation>\n    <Button variant="ghost" size="2">Home</Button>\n    <Button variant="ghost" size="2">About</Button>\n    <Button variant="ghost" size="2">Contact</Button>\n  </Navbar.Navigation>`;
    }
    if (showActions) {
      children += `\n  <Navbar.Actions>\n    <Button variant="soft" size="2">Sign In</Button>\n  </Navbar.Actions>`;
    }

    return `<Navbar.Root${rootPropsString}>${children}
</Navbar.Root>`;
  };

  return (
    <Playground
      component={
        <div style={{ width: '100%', position: 'relative', minHeight: '80px' }}>
          <Navbar.Root
            position="static"
            height={height as any}
            style={{ position: 'relative', borderRadius: 'var(--radius-3)', border: '1px solid var(--gray-a6)' }}
          >
            {showLogo && (
              <Navbar.Logo>
                <Text weight="bold" size="3">Brand</Text>
              </Navbar.Logo>
            )}
            {showNavigation && (
              <Navbar.Navigation>
                <Button variant="ghost" size="2">Home</Button>
                <Button variant="ghost" size="2">About</Button>
                <Button variant="ghost" size="2">Contact</Button>
              </Navbar.Navigation>
            )}
            {showActions && (
              <Navbar.Actions>
                <Button variant="soft" size="2">Sign In</Button>
              </Navbar.Actions>
            )}
          </Navbar.Root>
        </div>
      }
      code={generateCode()}
      items={items}
    />
  );
}
