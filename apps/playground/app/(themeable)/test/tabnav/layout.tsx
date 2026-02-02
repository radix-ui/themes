import * as React from 'react';
import { Container, Section, Box } from '@radix-ui/themes';
import { Nav } from './nav';

export default function Test({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Section>
        <Nav />
        <Box my="9">{children}</Box>
      </Section>
    </Container>
  );
}
