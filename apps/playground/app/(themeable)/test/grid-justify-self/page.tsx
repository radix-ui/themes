import { Grid, Text, Box, type BoxProps, Code, Container } from '@radix-ui/themes';

export default function Test() {
  return (
    <Container py="8" mx="4">
      <Grid height="100vh" rows="repeat(4, 1fr)" gap="1">
        <BlueBox justifySelf="start">start</BlueBox>
        <BlueBox justifySelf="center">center</BlueBox>
        <BlueBox justifySelf="end">end</BlueBox>
        <BlueBox justifySelf="stretch">stretch</BlueBox>
      </Grid>
    </Container>
  );
}

const BlueBox = ({ children, ...props }: BoxProps) => (
  <Box p="3" asChild style={{ background: 'var(--blue-9)', minWidth: '50%' }} {...props}>
    <Text size="2" color="gray" highContrast>
      <Code variant="ghost">{children}</Code>
    </Text>
  </Box>
);
