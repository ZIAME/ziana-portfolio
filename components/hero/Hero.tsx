import { MediumSketchButton, RoundSketchButton } from "@/components/ui/SketchButton";
import { DESCRIPTION, NAV_LINKS, SOCIAL_LINKS } from "./content";
import { SOCIAL_ICONS } from "./icons";
import { RotatingHeadline } from "./RotatingHeadline";
import { ScrollPrompt } from "./ScrollPrompt";
import { TiltIllustration } from "./TiltIllustration";

export function Hero() {
  return (
    <div className="flex min-h-screen flex-col px-6 py-6 sm:px-10 sm:py-8">
      <header className="flex items-center justify-between gap-3">
        <span className="font-nohemi text-base font-bold tracking-tight whitespace-nowrap text-neutral-900 sm:text-lg">
          Ziana Saif
        </span>
        <nav className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <MediumSketchButton key={link.label} href={link.href}>
              {link.label}
            </MediumSketchButton>
          ))}
        </nav>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-6 py-10">
        <TiltIllustration />

        <div className="flex flex-col items-center gap-5 text-center">
          <RotatingHeadline />
          <p className="max-w-xl text-balance text-base text-neutral-500 sm:text-lg">
            {DESCRIPTION}
          </p>
          <div className="flex items-center gap-1">
            {SOCIAL_LINKS.map(({ label, href }) => {
              const Icon = SOCIAL_ICONS[label];
              return (
                <RoundSketchButton key={label} href={href} ariaLabel={label}>
                  <Icon className="h-3.5 w-3.5" />
                </RoundSketchButton>
              );
            })}
          </div>
        </div>
      </main>

      <div className="flex justify-center">
        <ScrollPrompt />
      </div>
    </div>
  );
}
