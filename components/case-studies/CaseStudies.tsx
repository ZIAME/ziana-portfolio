import { Reveal } from "@/components/motion/Reveal";
import { CASE_STUDIES } from "./content";
import { CaseStudyCard } from "./CaseStudyCard";

export function CaseStudies() {
  return (
    <section className="relative px-6 py-16 sm:px-10 sm:py-24">
      {/* eslint-disable-next-line @next/next/no-img-element -- small decorative sticker, no responsive variants needed */}
      <img
        src="/stickers/scribble.svg"
        alt=""
        className="pointer-events-none absolute top-6 right-6 hidden w-16 select-none lg:block xl:right-16"
        aria-hidden="true"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- small decorative sticker, no responsive variants needed */}
      <img
        src="/stickers/plant.svg"
        alt=""
        className="pointer-events-none absolute bottom-10 left-6 hidden w-20 select-none lg:block xl:left-16"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[960px]">
        <Reveal>
          <h2 className="font-nohemi mb-10 text-3xl font-bold tracking-tight text-neutral-900 sm:mb-14 sm:text-4xl">
            Case Studies
          </h2>
        </Reveal>

        <div className="grid gap-x-14 gap-y-16 md:grid-cols-2">
          {CASE_STUDIES.map((study, i) => (
            // Cards sitting side by side on desktop come in one after the other.
            <Reveal key={study.id} delay={(i % 2) * 0.12} y={40}>
              <CaseStudyCard {...study} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
