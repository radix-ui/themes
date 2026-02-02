import { Grid, Text, Box, BoxProps, Code, Container } from '@radix-ui/themes';

export default function Test() {
  return (
    <Container py="8" mx="4">
      <Grid rows="repeat(4, 1fr)" gap="5" height="100dvh">
        <Grid
          height="100%"
          rows="repeat(3, 1fr)"
          gap="1"
          justifyItems="start"
          style={{ background: 'var(--blue-a3)' }}
        >
          <BlueBox>start</BlueBox>
          <BlueBox />
          <BlueBox />
        </Grid>

        <Grid
          height="100%"
          rows="repeat(3, 1fr)"
          gap="1"
          justifyItems="center"
          style={{ background: 'var(--blue-a3)' }}
        >
          <BlueBox>center</BlueBox>
          <BlueBox />
          <BlueBox />
        </Grid>

        <Grid
          height="100%"
          rows="repeat(3, 1fr)"
          gap="1"
          justifyItems="end"
          style={{ background: 'var(--blue-a3)' }}
        >
          <BlueBox>end</BlueBox>
          <BlueBox />
          <BlueBox />
        </Grid>
        <Grid
          height="100%"
          rows="repeat(3, 1fr)"
          gap="1"
          justifyItems="stretch"
          style={{ background: 'var(--blue-a3)' }}
        >
          <BlueBox>stretch</BlueBox>
          <BlueBox />
          <BlueBox />
        </Grid>
      </Grid>
    </Container>
  );
}

const BlueBox = ({ children, ...props }: BoxProps) => (
  <Box p="3" asChild style={{ background: 'var(--blue-9)', minWidth: '50dvw' }} {...props}>
    <Text size="2" color="gray" highContrast>
      {children && <Code variant="ghost">{children}</Code>}
    </Text>
  </Box>
);
