import Link from "next/link";

export function Wordmark() {
  return (
    <Link href="/" className="wordmark">
      <span className="wordmark-icon" aria-hidden="true"><i /><i /><i /></span>
      Learn to Animate
    </Link>
  );
}
