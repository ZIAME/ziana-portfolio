import { AboutMe } from "@/components/about/AboutMe";
import { CaseStudies } from "@/components/case-studies/CaseStudies";
import { Creations } from "@/components/creations/Creations";
import { Footer } from "@/components/footer/Footer";
import { Hero } from "@/components/hero/Hero";

export default function Home() {
  return (
    <>
      {/* The page sits as a rounded card lifted over the white footer. */}
      <div className="relative z-10 rounded-b-[48px] bg-background shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <Hero />
        <CaseStudies />
        <AboutMe />
        <Creations />
      </div>
      <Footer />
    </>
  );
}
