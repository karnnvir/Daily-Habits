export type PillarId = "growth" | "career" | "wellbeing";

export interface PillarMeta {
  id: PillarId;
  name: string;
}

export const PILLARS: PillarMeta[] = [
  { id: "growth", name: "Growth" },
  { id: "career", name: "Career" },
  { id: "wellbeing", name: "Wellbeing" },
];

export type EffortTier = "quick" | "steady" | "deep";

export const TIER_POINTS: Record<EffortTier, number> = {
  quick: 5,
  steady: 10,
  deep: 20,
};

export const TIER_LABELS: Record<EffortTier, string> = {
  quick: "Quick",
  steady: "Steady",
  deep: "Deep",
};

export const TIER_ORDER: EffortTier[] = ["quick", "steady", "deep"];

export interface Habit {
  id: string;
  pillar: PillarId;
  name: string;
  activities: string[];
  streak: number;
  lastLoggedDate: string | null;
  order: number;
}

export interface LogEntry {
  id: string;
  habitId: string;
  date: string;
  tier: EffortTier;
  points: number;
  timestamp: number;
}

export interface CleanStreak {
  id: string;
  name: string;
  currentStreak: number;
  bestStreak: number;
}

export interface PillarProgress {
  totalXp: number;
}

export interface HabitsState {
  habits: Habit[];
  logs: LogEntry[];
  pillarXp: Record<PillarId, number>;
  cleanStreaks: CleanStreak[];
}
