import Link from "next/link";

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="wordmark">
      <span className="wordmark-icon" aria-hidden="true"><i /><i /><i /></span>
      <span className={compact ? "sr-only" : undefined}>Learn to Animate</span>
    </Link>
  );
}
