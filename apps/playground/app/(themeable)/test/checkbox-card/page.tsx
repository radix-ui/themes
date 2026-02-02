'use client';
import * as React from 'react';
import { Button, CheckboxCards, Code, Container, Grid, Heading, Section } from '@radix-ui/themes';

export default function Test() {
  const [frameworks, setFrameworks] = React.useState(['next']);
  const [frameworksForm, setFrameworksForm] = React.useState<FormDataEntryValue[]>([]);

  function handleChange(event: React.ChangeEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const values = formData.getAll('frameworks');
    setFrameworksForm(values);
  }

  return (
    <Container size="1" py="8" mx="4">
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
            <CheckboxCards.Root name="frameworks" value={frameworks} onValueChange={setFrameworks}>
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
  );
}
