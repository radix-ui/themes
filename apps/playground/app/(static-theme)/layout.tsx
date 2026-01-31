import { Box, Container, Theme } from '@radix-ui/themes';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body>
        <Theme asChild>
          <Container py="8" mx="4">
            <Box>{children}</Box>
          </Container>
        </Theme>
      </body>
    </html>
  );
}
