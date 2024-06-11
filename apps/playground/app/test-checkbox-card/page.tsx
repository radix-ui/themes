'use client';

import * as React from 'react';
import {
  Theme,
  Container,
  Section,
  CheckboxCards,
  Grid,
  Button,
  Heading,
  Code,
} from '@radix-ui/themes';
import { NextThemeProvider } from '../next-theme-provider';

export default function Test() {
  const [frameworks, setFrameworks] = React.useState(['next']);
  const [frameworksForm, setFrameworksForm] = React.useState<FormDataEntryValue[]>([]);

  function handleChange(event: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const values = formData.getAll('frameworks');
    setFrameworksForm(values);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextThemeProvider>
          <Theme asChild>
            <div id="root">
              <Container px="8" size="3">
                <Section size="3">
                  <Grid columns="2" gap="7" align="start">
                    <Grid gap="5">
                      <Heading>Uncontrolled</Heading>
                      <CheckboxCards.Root name="frameworks" defaultValue={['next']}>
                        <CheckboxCards.Item value="next">Next.js</CheckboxCards.Item>
                        <CheckboxCards.Item value="remix">Remix</CheckboxCards.Item>
                        <CheckboxCards.Item value="astro">Astro</CheckboxCards.Item>
                        <CheckboxCards.Item value="htmx">HTMX</CheckboxCards.Item>
                      </CheckboxCards.Root>
                    </Grid>

                    <Grid gap="5">
                      <Heading>Controlled</Heading>
                      <CheckboxCards.Root
                        name="frameworks"
                        value={frameworks}
                        onValueChange={setFrameworks}
                      >
                        <CheckboxCards.Item value="next">Next.js</CheckboxCards.Item>
                        <CheckboxCards.Item value="remix">Remix</CheckboxCards.Item>
                        <CheckboxCards.Item value="astro">Astro</CheckboxCards.Item>
                        <CheckboxCards.Item value="htmx">HTMX</CheckboxCards.Item>
                      </CheckboxCards.Root>

                      <div>
                        <Code size="2">{JSON.stringify(frameworks)}</Code>
                      </div>
                    </Grid>

                    <form
                      onSubmit={(event) => {
                        handleChange(event);
                        event.preventDefault();
                      }}
                      onChange={handleChange}
                    >
                      <Grid gap="5">
                        <Heading>Within Form</Heading>

                        <CheckboxCards.Root name="frameworks">
                          <CheckboxCards.Item value="next">Next.js</CheckboxCards.Item>
                          <CheckboxCards.Item value="remix">Remix</CheckboxCards.Item>
                          <CheckboxCards.Item value="astro">Astro</CheckboxCards.Item>
                          <CheckboxCards.Item value="htmx">HTMX</CheckboxCards.Item>
                        </CheckboxCards.Root>

                        <Button type="submit" size="3">
                          Submit
                        </Button>

                        <div>
                          <Code size="2">{JSON.stringify(frameworksForm)}</Code>
                        </div>
                      </Grid>
                    </form>
                  </Grid>
                </Section>
              </Container>
            </div>
          </Theme>
        </NextThemeProvider>
      </body>
    </html>
  );
}
