import { Theme, Box, Container, ThemePanel } from '@radix-ui/themes';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body>
        <Theme asChild appearance="dark" accentColor="mint" radius="large" scaling="110%">
          <Container py="8" mx="4">
            <Box>{children}</Box>
            <ThemePanel defaultOpen={false} />
          </Container>
        </Theme>
      </body>
    </html>
  );
}
