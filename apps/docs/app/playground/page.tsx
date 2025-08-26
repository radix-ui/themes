'use client';

import React from 'react';
import { Flex, Heading, Container, Section } from '@kushagradhawan/kookie-ui';
import ButtonPlayground from './ButtonPlayground';
import IconButtonPlayground from './IconButtonPlayground';
import ToggleButtonPlayground from './ToggleButtonPlayground';
import ToggleIconButtonPlayground from './ToggleIconButtonPlayground';
import SelectPlayground from './SelectPlayground';

export default function PlaygroundPage() {
  return (
    <Section>
      <Container size="3">
        <Flex direction="column" gap="8">
          <Flex direction="column" gap="4">
            <Heading weight="medium" size="4">
              Button
            </Heading>
            <ButtonPlayground />
          </Flex>

          <Flex direction="column" gap="4">
            <Heading weight="medium" size="4">
              Icon Button
            </Heading>
            <IconButtonPlayground />
          </Flex>

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

          <SelectPlayground />
        </Flex>
      </Container>
    </Section>
  );
}
