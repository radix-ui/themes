'use client';

import * as React from 'react';
import { Button, Checkbox, Container, Flex, Text } from '@radix-ui/themes';

export default function Test() {
  const [submitCount, setSubmitCount] = React.useState(0);
  // Mirrors Conform's getInputProps(field, { type: 'checkbox' }).
  const checkboxInputProps = { type: 'checkbox', name: 'agree' } as React.ComponentProps<
    typeof Checkbox
  >;

  return (
    <Container py="8" mx="4">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitCount((count) => count + 1);
        }}
      >
        <Flex direction="column" gap="3" align="start">
          <Flex gap="2" align="center">
            <Checkbox id="agree" {...checkboxInputProps} />
            <Text as="label" htmlFor="agree">
              Agree
            </Text>
          </Flex>
          <Button type="submit">Submit</Button>
          <Text data-testid="submit-count">{submitCount}</Text>
        </Flex>
      </form>
    </Container>
  );
}
