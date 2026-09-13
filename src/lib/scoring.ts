import { type EffortTier, TIER_POINTS } from "../types";

const STREAK_BONUS_THRESHOLD = 30;
const STREAK_BONUS_MULTIPLIER = 1.25;

/** Points earned for logging a habit at `tier`, given the streak that log extends it to. */
export function pointsForTier(tier: EffortTier, streakAfterLog: number): number {
  const base = TIER_POINTS[tier];
  return streakAfterLog >= STREAK_BONUS_THRESHOLD ? Math.round(base * STREAK_BONUS_MULTIPLIER) : base;
}

/** XP required to go from `level` to `level + 1`. */
export function levelThreshold(level: number): number {
  return 50 + 50 * level;
}

export interface LevelInfo {
  level: number;
  xpIntoLevel: number;
  xpForNextLevel: number;
}

/** Converts a pillar's cumulative XP into a level and progress toward the next one. */
export function levelForXp(totalXp: number): LevelInfo {
  let level = 1;
  let remaining = totalXp;
  let threshold = levelThreshold(level);
  while (remaining >= threshold) {
    remaining -= threshold;
    level += 1;
    threshold = levelThreshold(level);
  }
  return { level, xpIntoLevel: remaining, xpForNextLevel: threshold };
}
