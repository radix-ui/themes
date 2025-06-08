'use client';

import { ButtonExample } from '../components/ButtonExample';
import { IconButtonExample } from '../components/IconButtonExample';
import { ImageExample } from '../components/ImageExample';
import { PopoverExample } from '../components/PopoverExample';
import { SelectExample } from '../components/SelectExample';
import { TextAreaExample } from '../components/TextAreaExample';
import { TextFieldExample } from '../components/TextFieldExample';
import { ToggleButtonExample } from '../components/ToggleButtonExample';
import { ThemePanel, Container, Flex, Heading } from '@kushagradhawan/kookie-ui';
import { DropdownMenuExample } from '../components/DropdownMenuExample';

export default function Home() {
  return (
    <Container size="3" px="4" py="8">
      <Flex direction="column" gap="8">
        <Flex justify="between" align="center">
          <Flex direction="column" gap="1">
            <Heading size="8" weight="bold">
              Playground
            </Heading>
          </Flex>
          <ThemePanel />
        </Flex>

        <ButtonExample />
        <DropdownMenuExample />
        <IconButtonExample />
        <ImageExample />
        <PopoverExample />
        <SelectExample />
        <TextAreaExample />
        <TextFieldExample />
        <ToggleButtonExample />
      </Flex>
    </Container>
  );
}
