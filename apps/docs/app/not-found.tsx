import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "1rem" }}>
      <h1 style={{ fontSize: "3rem", fontWeight: 600 }}>404</h1>
      <p style={{ color: "var(--gray-11)" }}>Page not found</p>
      <Link href="/" style={{ textDecoration: "underline" }}>
        Go home
      </Link>
    </div>
  );
}
