import type { ReactElement } from "react";
import type { PillarId } from "../types";

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const PILLAR_ICONS: Record<PillarId, ReactElement> = {
  growth: (
    <svg {...iconProps}>
      <path d="M4 5.5c2-1 5-1 7 1v13c-2-2-5-2-7-1v-13Z" />
      <path d="M20 5.5c-2-1-5-1-7 1v13c2-2 5-2 7-1v-13Z" />
    </svg>
  ),
  career: (
    <svg {...iconProps}>
      <rect x="3.5" y="8" width="17" height="12" rx="2.2" />
      <path d="M8.5 8V6.2A2.2 2.2 0 0 1 10.7 4h2.6a2.2 2.2 0 0 1 2.2 2.2V8" />
    </svg>
  ),
  wellbeing: (
    <svg {...iconProps}>
      <path d="M12 20.3s-7-4.3-9-8.7a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.4-9 8.7-9 8.7Z" />
    </svg>
  ),
};

export const HABIT_ICONS: Record<string, ReactElement> = {
  "read-and-learn": (
    <svg {...iconProps}>
      <path d="M4 5.5c2-1 5-1 7 1v13c-2-2-5-2-7-1v-13Z" />
      <path d="M20 5.5c-2-1-5-1-7 1v13c2-2 5-2 7-1v-13Z" />
    </svg>
  ),
  "write-your-thoughts": (
    <svg {...iconProps}>
      <path d="M4 20l4-1 11-11a2 2 0 0 0-3-3L5 16l-1 4Z" />
    </svg>
  ),
  "build-personal-application": (
    <svg {...iconProps}>
      <path d="M9 6.5 3.5 12l5.5 5.5" />
      <path d="M15 6.5 20.5 12 15 17.5" />
    </svg>
  ),
  "learn-and-build-ai": (
    <svg {...iconProps}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.5 6.5l2 2M15.5 15.5l2 2M17.5 6.5l-2 2M8.5 15.5l-2 2" />
    </svg>
  ),
  "become-better-professional": PILLAR_ICONS.career,
  "brand-positioning": (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  "job-search": (
    <svg {...iconProps}>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M20 20l-5.2-5.2" />
    </svg>
  ),
  "interview-preparation": (
    <svg {...iconProps}>
      <path d="M4 5.5h16v11H8.5l-4.5 4V5.5Z" />
    </svg>
  ),
  "executive-comms": (
    <svg {...iconProps}>
      <rect x="9.5" y="3" width="5" height="10.5" rx="2.5" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
      <path d="M12 17.5v3" />
    </svg>
  ),
  "purpose-of-life": (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15 9l-2 5-5 2 2-5 5-2Z" />
    </svg>
  ),
  "live-better": (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2.2M12 18.8V21M4.5 4.5l1.6 1.6M17.9 17.9l1.6 1.6M3 12h2.2M18.8 12H21M4.5 19.5l1.6-1.6M17.9 6.1l1.6-1.6" />
    </svg>
  ),
  exercise: (
    <svg {...iconProps}>
      <path d="M4 9v6M2.2 10.2v3.6M20 9v6M21.8 10.2v3.6M7 12h10" />
    </svg>
  ),
  pray: (
    <svg {...iconProps}>
      <path d="M12 3c2 3 3 4 3 6.5a3 3 0 0 1-6 0C9 7 10 6 12 3Z" />
      <path d="M8 21h8v-6a4 4 0 0 0-8 0v6Z" />
    </svg>
  ),
  manifestation: (
    <svg {...iconProps}>
      <path d="M12 3.5l2.4 5 5.6.7-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.6-.7L12 3.5Z" />
    </svg>
  ),
};

export function FlameIcon({ size = 11, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c4.4 0 7-3.1 7-7 0-4-3-6.2-4-10-1 2-1 4-3 4-1 0-1-2-1-3-3 3-6 6.4-6 9.4C5 18.9 7.6 22 12 22Z" />
    </svg>
  );
}

export function CheckIcon({ size = 14, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4 10-10" />
    </svg>
  );
}
