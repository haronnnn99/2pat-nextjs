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
          <FooterItem>
            <FooterLink href="/#about">About</FooterLink>
          </FooterItem>
          <FooterItem>
            <FooterLink href="/works">Works</FooterLink>
          </FooterItem>
          <FooterItem>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterItem>
        </FooterCol>

        <FooterCol title="Services">
          <FooterItem><FooterLink href="#">Event</FooterLink></FooterItem>
          <FooterItem><FooterLink href="#">Media</FooterLink></FooterItem>
          <FooterItem><FooterLink href="#">Branding</FooterLink></FooterItem>
          <FooterItem><FooterLink href="#">Show</FooterLink></FooterItem>
        </FooterCol>

        <FooterCol title="Contact">
          <FooterItem>contact@2pat-vn.com</FooterItem>
          <FooterItem>035-322-0598</FooterItem>
          <FooterItem>HCMC, Vietnam</FooterItem>
          <FooterItem className="mt-3 flex gap-1.5">
            <FooterLink href="#">IG</FooterLink>
            <span>·</span>
            <FooterLink href="#">FB</FooterLink>
            <span>·</span>
            <FooterLink href="#">YT</FooterLink>
            <span>·</span>
            <FooterLink href="#">TikTok</FooterLink>
          </FooterItem>
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

function FooterItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <li className={className}>{children}</li>;
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="hover:text-orange transition-colors">
      {children}
    </Link>
  );
}
