import { Theme } from './theme';

export default function Layout({ children }: LayoutProps<'/'>) {
  return <Theme>{children}</Theme>;
}
