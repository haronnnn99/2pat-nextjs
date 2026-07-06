import Link from "next/link";
import { clsx } from "@/lib/clsx";

type PillVariant = "outline" | "filled" | "inverted";

type PillProps = {
  href: string;
  children: React.ReactNode;
  variant?: PillVariant;
  className?: string;
};

/**
 * Editorial pill button — outlined by default, orange fill on hover.
 * Reproduces the .pill / .pill-filled / .pill-inverted styles from the mockup.
 */
export function Pill({ href, children, variant = "outline", className }: PillProps) {
  const base =
    "inline-flex items-center gap-1.5 rounded-pill px-[22px] py-[10px] " +
    "font-body font-medium text-[13px] uppercase tracking-[0.18em] " +
    "border transition-colors duration-150";

  const variantClasses: Record<PillVariant, string> = {
    outline:
      "border-orange text-orange bg-transparent hover:bg-orange hover:text-paper",
    filled:
      "border-orange bg-orange text-paper hover:opacity-85",
    inverted:
      "border-ink text-ink bg-transparent hover:bg-orange hover:border-orange hover:text-paper",
  };

  return (
    <Link href={href} className={clsx(base, variantClasses[variant], className)}>
      {children}
    </Link>
  );
}
