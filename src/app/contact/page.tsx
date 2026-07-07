import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { RevealObserver } from "@/components/reveal-observer";
import { ContactHero } from "@/components/contact-hero";
import { ContactForm } from "@/components/contact-form";
import { ContactMethods } from "@/components/contact-methods";
import { ClosingManifesto } from "@/components/closing-manifesto";

export const metadata = {
  title: "Contact — 2PAT",
  description:
    "Got an event in mind? A story to tell? A brand worth building? Get in touch with 2PAT — HCMC, Vietnam.",
};

export default function ContactPage() {
  return (
    <>
      <Nav activePath="/contact" />
      <RevealObserver />
      <ContactHero />
      <ContactForm />
      <ContactMethods />
      <ClosingManifesto />
      <Footer />
    </>
  );
}
