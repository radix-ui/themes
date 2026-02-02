import { Grid, Text, Box, BoxProps, Code, Container } from '@radix-ui/themes';

export default function Test() {
  return (
    <Container py="8" mx="4">
      <Grid height="100vh" columns="repeat(4, 1fr)" gap="1">
        <BlueBox alignSelf="start">start</BlueBox>
        <BlueBox alignSelf="center">center</BlueBox>
        <BlueBox alignSelf="end">end</BlueBox>
        <BlueBox alignSelf="stretch">stretch</BlueBox>
      </Grid>
    </Container>
  );
}

const BlueBox = ({ children, ...props }: BoxProps) => (
  <Box p="3" asChild style={{ background: 'var(--blue-9)', minHeight: '50%' }} {...props}>
    <Text size="2" color="gray" highContrast>
      <Code variant="ghost">{children}</Code>
    </Text>
  </Box>
);
