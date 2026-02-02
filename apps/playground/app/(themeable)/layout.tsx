import { Theme, ThemePanel } from '@radix-ui/themes';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <Theme appearance="dark" accentColor="violet">
      {children}
      <ThemePanel defaultOpen={false} />
    </Theme>
  );
}
