import type { CleanStreak, Habit, HabitsState } from "../types";
import { yesterdayIso } from "./date";

interface SeedHabit {
  id: string;
  pillar: Habit["pillar"];
  name: string;
  activities: string[];
  streak: number;
}

// This is deliberately a small, generic starter sample, not real personal data -
// it's what a fresh install seeds. Add your own sub-categories from the Manage
// Habits screen once you're running your own instance.
const seedHabits: SeedHabit[] = [
  // Growth
  { id: "read-and-learn", pillar: "growth", name: "Read and learn", activities: ["Book or article", "Blogs"], streak: 0 },
  {
    id: "write-your-thoughts",
    pillar: "growth",
    name: "Write your thoughts",
    activities: ["Write a post", "Write a journal"],
    streak: 0,
  },
  // Career
  {
    id: "brand-positioning",
    pillar: "career",
    name: "Brand positioning",
    activities: ["Build a portfolio page", "Write LinkedIn post"],
    streak: 0,
  },
  // Wellbeing
  { id: "exercise", pillar: "wellbeing", name: "Exercise", activities: ["Walk", "Gym"], streak: 0 },
];

const seedCleanStreaks: CleanStreak[] = [
  { id: "screen-free-evenings", name: "Screen-free evenings", currentStreak: 0, bestStreak: 0 },
];

export function buildInitialState(): HabitsState {
  const yesterday = yesterdayIso();
  const habits: Habit[] = seedHabits.map((h, index) => ({
    id: h.id,
    pillar: h.pillar,
    name: h.name,
    activities: h.activities,
    streak: h.streak,
    lastLoggedDate: h.streak > 0 ? yesterday : null,
    order: index,
  }));

  return {
    habits,
    logs: [],
    pillarXp: { growth: 0, career: 0, wellbeing: 0 },
    cleanStreaks: seedCleanStreaks,
  };
}
