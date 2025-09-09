import { AppShell } from '../components/app-shell';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
