import { PillarCard } from "../components/PillarCard";
import { FlameIcon } from "../lib/icons";
import { computeAppStreak, pointsEarnedOn } from "../lib/streaks";
import { todayIso } from "../lib/date";
import { PILLARS, type HabitsState } from "../types";

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function Dashboard({ state }: { state: HabitsState }) {
  const today = todayIso();
  const pointsToday = pointsEarnedOn(state.logs, today);
  const appStreak = computeAppStreak(state.logs);
  const dateLabel = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="screen dashboard-screen">
      <div className="dashboard-header">
        <div>
          <h1>{greeting()}</h1>
          <p className="subtle">
            {dateLabel} {pointsToday > 0 ? `· +${pointsToday} pts today` : ""}
          </p>
        </div>
        <div className="streak-badge">
          <FlameIcon size={16} color="var(--flame)" />
          <span>{appStreak}</span>
        </div>
      </div>

      <div className="pillar-cards">
        {PILLARS.map((pillar) => {
          const todayDelta = state.logs
            .filter((l) => l.date === today)
            .filter((l) => state.habits.find((h) => h.id === l.habitId)?.pillar === pillar.id)
            .reduce((sum, l) => sum + l.points, 0);
          return (
            <PillarCard
              key={pillar.id}
              pillar={pillar.id}
              name={pillar.name}
              totalXp={state.pillarXp[pillar.id]}
              todayDelta={todayDelta}
            />
          );
        })}
      </div>
    </div>
  );
}
