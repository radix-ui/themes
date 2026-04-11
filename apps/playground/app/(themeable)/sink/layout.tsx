import { Box, Container, Grid, Separator } from '@radix-ui/themes';
import { SinkLayoutNavigation } from './sink-layout.navigation';

export default function SinkLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container size="4" maxWidth="1680px">
      <Grid
        areas={{ initial: '"header" "separator" "main"', md: '"main separator header"' }}
        columns={{ initial: '1', md: '1fr 1px 360px', xl: '1fr 1px 480px' }}
        rows={{ initial: 'auto 1px 1fr', md: '1' }}
        height="100%"
        minHeight="100svh"
      >
        <SinkLayoutNavigation />
        <Box asChild gridArea="separator">
          <Separator size="4" aria-hidden orientation={{ initial: 'horizontal', md: 'vertical' }} />
        </Box>
        <Box
          asChild
          flexGrow="1"
          flexShrink="1"
          flexBasis="0"
          gridArea="main"
          py={{ initial: '6', md: '9' }}
        >
          <main>
            <Container mx="4" size="4" position="relative" width="100%" height="100%">
              {children}
            </Container>
          </main>
        </Box>
      </Grid>
    </Container>
  );
}
