import { Box, Card, Container, Grid, Inset, Text } from '@radix-ui/themes';

const sizes = ['1', '2', '3', '4', '5'] as const;
const padding = ['3', '4', '5', '6', '8'] as const;
const variants = ['surface', 'classic', 'ghost'] as const;

export default function Test() {
  return (
    <Container p="8">
      <Grid columns="3" gap="8">
        {variants.flatMap((variant) =>
          sizes.map((size, index) => (
            <Card key={`${variant}-${size}`} variant={variant} size={size}>
              <Text as="div" data-testid={`${variant}-${size}-body`}>
                {variant}, size {size}
              </Text>
              <Inset side="bottom" mt="3" style={{ background: 'var(--gray-a3)' }}>
                <Box p={padding[index]}>
                  <Text as="div" data-testid={`${variant}-${size}-panel`}>
                    Matching padding
                  </Text>
                </Box>
              </Inset>
            </Card>
          ))
        )}
      </Grid>
    </Container>
  );
}
