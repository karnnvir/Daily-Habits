import { addDaysIso, todayIso } from "./date";
import type { LogEntry } from "../types";

/** Consecutive days (ending today or yesterday) that have at least one log. */
export function computeAppStreak(logs: LogEntry[]): number {
  const days = new Set(logs.map((l) => l.date));
  const today = todayIso();
  let cursor = days.has(today) ? today : addDaysIso(today, -1);
  let streak = 0;
  while (days.has(cursor)) {
    streak += 1;
    cursor = addDaysIso(cursor, -1);
  }
  return streak;
}

export function pointsEarnedOn(logs: LogEntry[], dateIso: string): number {
  return logs.filter((l) => l.date === dateIso).reduce((sum, l) => sum + l.points, 0);
}
