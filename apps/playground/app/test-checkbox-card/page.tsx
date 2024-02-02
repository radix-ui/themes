'use client';

import * as React from 'react';
import {
  Theme,
  Container,
  Section,
  CheckboxCardGroupRoot,
  CheckboxCardGroupItem,
  Grid,
  Button,
  Heading,
  Code,
  Flex,
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
                      <CheckboxCardGroupRoot name="frameworks" defaultValue={['next']}>
                        <CheckboxCardGroupItem value="next">Next.js</CheckboxCardGroupItem>
                        <CheckboxCardGroupItem value="remix">Remix</CheckboxCardGroupItem>
                        <CheckboxCardGroupItem value="astro">Astro</CheckboxCardGroupItem>
                        <CheckboxCardGroupItem value="htmx">HTMX</CheckboxCardGroupItem>
                      </CheckboxCardGroupRoot>
                    </Grid>

                    <Grid gap="5">
                      <Heading>Controlled</Heading>
                      <CheckboxCardGroupRoot
                        name="frameworks"
                        value={frameworks}
                        onValueChange={setFrameworks}
                      >
                        <CheckboxCardGroupItem value="next">Next.js</CheckboxCardGroupItem>
                        <CheckboxCardGroupItem value="remix">Remix</CheckboxCardGroupItem>
                        <CheckboxCardGroupItem value="astro">Astro</CheckboxCardGroupItem>
                        <CheckboxCardGroupItem value="htmx">HTMX</CheckboxCardGroupItem>
                      </CheckboxCardGroupRoot>

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

                        <CheckboxCardGroupRoot name="frameworks">
                          <CheckboxCardGroupItem value="next">Next.js</CheckboxCardGroupItem>
                          <CheckboxCardGroupItem value="remix">Remix</CheckboxCardGroupItem>
                          <CheckboxCardGroupItem value="astro">Astro</CheckboxCardGroupItem>
                          <CheckboxCardGroupItem value="htmx">HTMX</CheckboxCardGroupItem>
                        </CheckboxCardGroupRoot>

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
