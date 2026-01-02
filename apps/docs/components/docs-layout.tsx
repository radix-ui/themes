"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { DocsShell } from "@kushagradhawan/kookie-blocks";
import { docsNavigation } from "../navigation-config";
import { DarkModeToggle } from "./dark-mode";
import { IconButton, Flex, Badge } from "@kushagradhawan/kookie-ui";
import { HugeiconsIcon } from "@hugeicons/react";
import { Github01Icon } from "@hugeicons/core-free-icons";

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <DocsShell
      navigation={docsNavigation}
      logo={{
        src: "/kookie-logo.png",
        alt: "Kookie UI",
        href: "/",
      }}
      pathname={pathname}
      linkComponent={Link as any}
      headerActions={
        <Flex gap="0">
          <IconButton asChild variant="ghost" highContrast>
            <Link href="https://github.com/KushagraDhawan1997/kookie-ui" target="_blank">
              <HugeiconsIcon icon={Github01Icon} />
            </Link>
          </IconButton>
          <DarkModeToggle />
        </Flex>
      }
      sidebarFooter={
        <Badge highContrast color="gray" size="1">
          Alpha
        </Badge>
      }
    >
      {children}
    </DocsShell>
  );
}
