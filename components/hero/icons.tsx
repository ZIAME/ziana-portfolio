type IconProps = {
  className?: string;
};

export function MailIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- className kept for a uniform icon interface across SOCIAL_ICONS
export function BehanceIcon({ className }: IconProps) {
  return (
    <span className="text-[13px] font-semibold leading-none" aria-hidden="true">
      Bē
    </span>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <circle cx="7.8" cy="8.2" r="0.9" fill="currentColor" stroke="none" />
      <path d="M7.8 11v6" />
      <path d="M12 17v-3.5c0-1.4 1-2.5 2.3-2.5s2.2 1 2.2 2.5V17" />
      <path d="M12 11v.6" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="16.8" cy="7.2" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export const SOCIAL_ICONS = {
  Email: MailIcon,
  Behance: BehanceIcon,
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
} as const;
