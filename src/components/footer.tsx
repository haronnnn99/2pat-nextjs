import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-paper px-[var(--spacing-pad-x)] pt-20 pb-8">
      <div className="mx-auto max-w-[var(--spacing-max-w)] grid grid-cols-[2fr_1fr_1fr_1.2fr] gap-10 border-t border-orange pt-12 max-md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="font-display text-[50px] tracking-[-1.5px] leading-none text-orange lowercase">
            2pat.
          </div>
          <p className="text-sm text-ink-soft">
            Choose the right place,
            <br />
            seize the right time.
          </p>
        </div>

        <FooterCol title="Pages">
          <FooterLink href="/#about">About</FooterLink>
          <FooterLink href="/works">Works</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterCol>

        <FooterCol title="Services">
          <FooterLink href="#">Event</FooterLink>
          <FooterLink href="#">Media</FooterLink>
          <FooterLink href="#">Branding</FooterLink>
          <FooterLink href="#">Show</FooterLink>
        </FooterCol>

        <FooterCol title="Contact">
          <li>contact@2pat-vn.com</li>
          <li>035-322-0598</li>
          <li>HCMC, Vietnam</li>
          <li className="mt-3">
            <FooterLink href="#">IG</FooterLink> ·{" "}
            <FooterLink href="#">FB</FooterLink> ·{" "}
            <FooterLink href="#">YT</FooterLink> ·{" "}
            <FooterLink href="#">TikTok</FooterLink>
          </li>
        </FooterCol>
      </div>

      <div className="mx-auto max-w-[var(--spacing-max-w)] mt-10 pt-5 border-t border-orange flex justify-between text-sm text-ink-soft tracking-[0.21px]">
        <span>© 2026 2PAT. All rights reserved.</span>
        <Link href="#">Privacy Policy</Link>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="font-display text-sm uppercase tracking-[0.21em] text-orange mb-4">
        {title}
      </h4>
      <ul className="list-none space-y-2 text-base text-ink">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link href={href} className="hover:text-orange transition-colors">
        {children}
      </Link>
    </li>
  );
}
