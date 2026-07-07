import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { RevealObserver } from "@/components/reveal-observer";
import { Hero } from "@/components/hero";
import { Manifesto } from "@/components/manifesto";
import { ProjectsMosaic } from "@/components/projects-mosaic";
import { AboutServices } from "@/components/about-services";
import { CTA } from "@/components/cta";

export default function HomePage() {
  return (
    <>
      <Nav activePath="/" />
      <RevealObserver />
      <Hero />
      <Manifesto />
      <ProjectsMosaic />
      <AboutServices />
      <CTA />
      <Footer />
    </>
  );
}
