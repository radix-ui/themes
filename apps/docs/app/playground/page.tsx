'use client';

import React from 'react';
import { Flex, Heading, Container, Section, Theme } from '@kushagradhawan/kookie-ui';
import ButtonPlayground from './ButtonPlayground';
import IconButtonPlayground from './IconButtonPlayground';
import ToggleButtonPlayground from './ToggleButtonPlayground';
import ToggleIconButtonPlayground from './ToggleIconButtonPlayground';
import DialogPlayground from './DialogPlayground';
import DropdownMenuPlayground from './DropdownMenuPlayground';
import ChatbarPlayground from './ChatbarPlayground';
import TextAreaPlayground from './TextAreaPlayground';
import PopoverPlayground from './PopoverPlayground';

export default function PlaygroundPage() {
  return (
    // The goal is to add a background image to the Section.
    // We'll use the `style` prop on Section to set the background image,
    // ensuring it covers the area and is visually appealing for the playground.

    <Theme material="solid">
      <Section
      // style={{
      //   backgroundImage:
      //     'url(https://images.unsplash.com/photo-1700056397549-aeeaaa8d5906?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
      //   backgroundRepeat: 'no-repeat',
      //   minHeight: '100vh',
      // }}
      >
        <Container size="3">
          <Flex direction="column" gap="8">
            <Flex direction="column" gap="4">
              <Heading weight="medium" size="4">
                Button
              </Heading>
              <ButtonPlayground />
            </Flex>

            <Theme material="translucent">
              <Flex direction="column" gap="4">
                <Heading weight="medium" size="4">
                  Icon Button
                </Heading>
                <IconButtonPlayground />
              </Flex>
            </Theme>

            <Flex direction="column" gap="4">
              <Heading weight="medium" size="4">
                Toggle Button
              </Heading>
              <ToggleButtonPlayground />
            </Flex>

            <Flex direction="column" gap="4">
              <Heading weight="medium" size="4">
                Toggle Icon Button
              </Heading>
              <ToggleIconButtonPlayground />
            </Flex>

            <DialogPlayground />

            <DropdownMenuPlayground />

            <Flex direction="column" gap="4">
              <Heading weight="medium" size="4">
                Chatbar
              </Heading>
              <ChatbarPlayground />
            </Flex>

            <Flex direction="column" gap="4">
              <Heading weight="medium" size="4">
                Text Area
              </Heading>
              <TextAreaPlayground />
            </Flex>

            <Flex direction="column" gap="4">
              <Heading weight="medium" size="4">
                Text Area
              </Heading>
              <PopoverPlayground />
            </Flex>
          </Flex>
        </Container>
      </Section>
    </Theme>
  );
}
