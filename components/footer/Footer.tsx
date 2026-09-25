import { Reveal } from "@/components/motion/Reveal";
import { CONTACT_LINKS, RESUME_HREF, newTabProps } from "@/lib/contact";

const ROWS = [
  CONTACT_LINKS.mail,
  CONTACT_LINKS.linkedin,
  CONTACT_LINKS.behance,
  CONTACT_LINKS.instagram,
];

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" />
    </svg>
  );
}

export function Footer() {
  return (
    // Negative top margin tucks the white footer up behind the page's rounded
    // bottom corners (see app/page.tsx), so those corners show white, not
    // the page background.
    <footer className="-mt-12 bg-white pt-12">
      <div className="mx-auto box-content max-w-[1220px] px-3 py-12 sm:px-5 sm:py-16">
        <Reveal className="grid items-center gap-10 md:grid-cols-[auto_1fr_minmax(0,1.3fr)] md:gap-12">
          {/* The source clip is a square frame with blank canvas on either
              side of her (she leans left in some frames, so the safe crop
              was measured across the whole animation, not one still). This
              box crops that side margin away via object-cover + object-left
              while keeping the full height, since she's flush with both the
              top and bottom of the frame at every point in the clip. */}
          <div className="aspect-[4/5] w-48 justify-self-center sm:w-56 md:w-64 md:justify-self-auto">
            <video
              src="/footer/zee-char-ani.mp4"
              className="h-full w-full select-none object-cover object-left"
              autoPlay
              loop
              muted
              playsInline
              aria-label="Looping animated illustration of Ziana Saif"
            />
          </div>

          <p className="font-nohemi max-w-sm text-xl leading-snug font-medium text-neutral-900 sm:text-2xl">
            Reach out for full-time roles, freelance work, or just to talk design.
          </p>

          <div>
            <ul className="border-b border-neutral-200">
              {ROWS.map((row) => (
                <li key={row.label} className="border-t border-neutral-200">
                  <a
                    href={row.href}
                    {...newTabProps(row.href)}
                    className="group flex items-center justify-between gap-4 py-4 sm:py-5"
                  >
                    <span className="text-base text-neutral-400 sm:text-lg">{row.label}</span>
                    <span className="flex min-w-0 items-center gap-4 sm:gap-6">
                      <span className="truncate text-base text-neutral-900 sm:text-lg">
                        {row.display}
                      </span>
                      <ArrowIcon className="h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-900" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col items-end gap-1">
              <span className="text-sm text-neutral-400">© Ziana Saif {new Date().getFullYear()}</span>
              <a
                href={RESUME_HREF}
                {...newTabProps(RESUME_HREF)}
                className="group flex items-center gap-2 text-base text-neutral-900"
              >
                <span className="decoration-1 underline-offset-4 group-hover:underline">Resume</span>
                <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
