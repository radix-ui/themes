"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "1rem" }}>
      <h1 style={{ fontSize: "3rem", fontWeight: 600 }}>Oops</h1>
      <p style={{ color: "var(--gray-11)" }}>Something went wrong</p>
      <button onClick={reset} style={{ textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}>
        Try again
      </button>
    </div>
  );
}
