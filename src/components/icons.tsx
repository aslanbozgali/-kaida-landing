import type { IconKey } from "@/lib/content";

export function Icon({
  name,
  className = "h-6 w-6",
}: {
  name: IconKey;
  className?: string;
}) {
  switch (name) {
    case "people":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M15 4.2a3 3 0 0 1 0 5.8M21 20c0-2.8-2-5.1-4.7-5.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "tag":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M11.5 3H5a2 2 0 0 0-2 2v6.5a2 2 0 0 0 .6 1.4l9 9a2 2 0 0 0 2.8 0l6.5-6.5a2 2 0 0 0 0-2.8l-9-9a2 2 0 0 0-1.4-.6z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="8" cy="8" r="1.6" fill="currentColor" />
        </svg>
      );
    case "percent":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M19 5 5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="7.5" cy="7.5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="16.5" cy="16.5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "qr":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
          <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
          <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M14 14h3v3h-3zM20 14v3M14 20h3M20 20v-1"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "coffee":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M4 9h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 3c0 1-1.2 1-1.2 2s1.2 1 1.2 2M12 3c0 1-1.2 1-1.2 2s1.2 1 1.2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "food-dome":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M3 17a9 9 0 0 1 18 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M2 17h20M12 8V4M10 4h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "burger":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M3 10a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M2.5 13.5h19M3 17h18M4 20.5h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "joystick":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M7 9h10a4 4 0 0 1 4 4l-.8 4.4a2 2 0 0 1-2 1.6 2 2 0 0 1-1.8-1.1L15 15H9l-1.4 3a2 2 0 0 1-1.8 1 2 2 0 0 1-2-1.6L3 13a4 4 0 0 1 4-4z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M7.5 11.5v3M6 13h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="16" cy="12" r="0.9" fill="currentColor" />
          <circle cx="18" cy="14" r="0.9" fill="currentColor" />
        </svg>
      );
    case "house-tree":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M3 11 9 6l6 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 10v9h9v-9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M18.5 9 16 13h1.6l-2.2 3.5H20L17.6 13H19z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M18.5 16.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "bicycle":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="6" cy="17" r="3" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="18" cy="17" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M6 17l4-8h3l3 8M10 9H8m5-4h3l2 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "star-medal":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="m12 6.3.9 1.9 2.1.3-1.5 1.5.4 2.1-1.9-1-1.9 1 .4-2.1-1.5-1.5 2.1-.3z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path d="m8.5 14-1.4 6.5L12 18l4.9 2.5L15.5 14" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "gift":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M20 8v13H4V8M2 4h20v4H2zM12 4v17M12 4c-1-3-6-3-6 0s5 0 6 0M12 4c1-3 6-3 6 0s-5 0-6 0"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "pin":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

export function AppleLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.4 1.6c.1 1-.3 2-.9 2.8-.6.8-1.7 1.4-2.7 1.3-.1-1 .4-2 1-2.7.6-.8 1.7-1.3 2.6-1.4zM19.8 17c-.5 1.1-.7 1.6-1.4 2.6-.9 1.4-2.2 3.1-3.8 3.1-1.4 0-1.8-.9-3.7-.9s-2.4.9-3.7.9c-1.6 0-2.8-1.5-3.7-2.9C1 16.9 0.6 12.6 2.3 10c.9-1.4 2.4-2.3 4-2.3 1.5 0 2.5 1 3.7 1 1.2 0 1.9-1 3.7-1 1.3 0 2.8.7 3.7 1.9-3.2 1.8-2.7 6.4.4 7.4z" />
    </svg>
  );
}

export function GooglePlayLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 3.5v17l9-8.5-9-8.5z" fill="#fff" />
      <path d="M4 3.5 15 10l3-1.7L6.5 2.6c-.9-.5-2 0-2.5.9z" fill="#fff" opacity="0.8" />
      <path d="M4 20.5 15 14l3 1.7-11.5 5.7c-.9.5-2 0-2.5-.9z" fill="#fff" opacity="0.8" />
      <path d="m15 10 3.5 2-3.5 2-3-2z" fill="#fff" opacity="0.6" />
    </svg>
  );
}
