import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { RevealObserver } from "@/components/reveal-observer";
import { WorksHero } from "@/components/works-hero";
import { WorksManifesto } from "@/components/works-manifesto";
import { Archive } from "@/components/archive";
import { Spotlight } from "@/components/spotlight";
import { Statement } from "@/components/statement";
import { getProjects } from "@/lib/sanity/queries";

export const metadata = {
  title: "Works — 2PAT",
  description:
    "Every project we've shipped, 2024 — 2025. Event planning, media production, branding and show production.",
};

export default async function WorksPage() {
  const projects = await getProjects();
  return (
    <>
      <Nav activePath="/works" />
      <RevealObserver />
      <WorksHero />
      <WorksManifesto />
      <Archive projects={projects} />
      <Spotlight projects={projects} />
      <Statement />
      <Footer />
    </>
  );
}
