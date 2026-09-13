import { todayIso } from "../lib/date";
import { CheckIcon, FlameIcon, HABIT_ICONS } from "../lib/icons";
import { TIER_LABELS, TIER_ORDER, TIER_POINTS, type EffortTier, type Habit, type LogEntry } from "../types";

export function HabitRow({
  habit,
  logs,
  onLog,
  showActivities = false,
}: {
  habit: Habit;
  logs: LogEntry[];
  onLog: (habitId: string, tier: EffortTier) => void;
  showActivities?: boolean;
}) {
  const doneToday = habit.lastLoggedDate === todayIso();
  const todaysLog = doneToday ? logs.find((l) => l.habitId === habit.id && l.date === todayIso()) : undefined;
  const activityPreview = habit.activities.length
    ? habit.activities.length > 2
      ? `${habit.activities.slice(0, 2).join(" · ")} · +${habit.activities.length - 2} more`
      : habit.activities.join(" · ")
    : null;

  if (doneToday) {
    return (
      <div className="habit-row habit-row-done">
        <div className="habit-row-top">
          <div className="habit-icon">{HABIT_ICONS[habit.id] ?? null}</div>
          <div className="habit-row-text">
            <span className="habit-name">{habit.name}</span>
            <span className="habit-streak">
              <FlameIcon color="var(--flame)" /> {habit.streak}-day streak
            </span>
            {showActivities && activityPreview && <span className="habit-activities">{activityPreview}</span>}
          </div>
          <span className="habit-points-chip">+{todaysLog?.points ?? 0}</span>
          <div className="habit-check">
            <CheckIcon />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="habit-row">
      <div className="habit-row-top">
        <div className="habit-icon">{HABIT_ICONS[habit.id] ?? null}</div>
        <div className="habit-row-text">
          <span className="habit-name">{habit.name}</span>
          {habit.streak > 0 ? (
            <span className="habit-streak">
              <FlameIcon color="var(--flame)" /> {habit.streak}-day streak
            </span>
          ) : (
            <span className="habit-no-streak">no streak yet</span>
          )}
          {showActivities && activityPreview && <span className="habit-activities">{activityPreview}</span>}
        </div>
      </div>
      <div className="habit-tiers">
        {TIER_ORDER.map((tier) => (
          <button key={tier} className="tier-pill" onClick={() => onLog(habit.id, tier)}>
            {TIER_LABELS[tier]} +{TIER_POINTS[tier]}
          </button>
        ))}
      </div>
    </div>
  );
}
