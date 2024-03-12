'use client';

import * as React from 'react';
import {
  Theme,
  Container,
  Section,
  CheckboxCardGroup,
  Grid,
  Button,
  Heading,
  Code,
} from '@radix-ui/themes';
import { NextThemeProvider } from '../next-theme-provider';

export default function Test() {
  const [frameworks, setFrameworks] = React.useState(['next']);
  const [frameworksForm, setFrameworksForm] = React.useState([]);

  function handleChange(event: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    setFrameworksForm(formData.getAll('frameworks'));
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
                      <CheckboxCardGroup.Root name="frameworks" defaultValue={['next']}>
                        <CheckboxCardGroup.Item value="next">Next.js</CheckboxCardGroup.Item>
                        <CheckboxCardGroup.Item value="remix">Remix</CheckboxCardGroup.Item>
                        <CheckboxCardGroup.Item value="astro">Astro</CheckboxCardGroup.Item>
                        <CheckboxCardGroup.Item value="htmx">HTMX</CheckboxCardGroup.Item>
                      </CheckboxCardGroup.Root>
                    </Grid>

                    <Grid gap="5">
                      <Heading>Controlled</Heading>
                      <CheckboxCardGroup.Root
                        name="frameworks"
                        value={frameworks}
                        onValueChange={setFrameworks}
                      >
                        <CheckboxCardGroup.Item value="next">Next.js</CheckboxCardGroup.Item>
                        <CheckboxCardGroup.Item value="remix">Remix</CheckboxCardGroup.Item>
                        <CheckboxCardGroup.Item value="astro">Astro</CheckboxCardGroup.Item>
                        <CheckboxCardGroup.Item value="htmx">HTMX</CheckboxCardGroup.Item>
                      </CheckboxCardGroup.Root>

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

                        <CheckboxCardGroup.Root name="frameworks">
                          <CheckboxCardGroup.Item value="next">Next.js</CheckboxCardGroup.Item>
                          <CheckboxCardGroup.Item value="remix">Remix</CheckboxCardGroup.Item>
                          <CheckboxCardGroup.Item value="astro">Astro</CheckboxCardGroup.Item>
                          <CheckboxCardGroup.Item value="htmx">HTMX</CheckboxCardGroup.Item>
                        </CheckboxCardGroup.Root>

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
