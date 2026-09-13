import { addDaysIso, todayIso } from "../lib/date";
import { PILLARS, type HabitsState } from "../types";

function lastSevenDays(): string[] {
  const today = todayIso();
  return Array.from({ length: 7 }, (_, i) => addDaysIso(today, i - 6));
}

function weekdayLetter(dateIso: string): string {
  return new Date(`${dateIso}T00:00:00`).toLocaleDateString(undefined, { weekday: "narrow" });
}

export function Progress({
  state,
  onLogSlip,
}: {
  state: HabitsState;
  onLogSlip: (cleanStreakId: string) => void;
}) {
  const days = lastSevenDays();

  return (
    <div className="screen">
      <div className="screen-header">
        <div>
          <h1>Progress</h1>
          <p className="subtle">How each pillar is growing</p>
        </div>
      </div>

      {PILLARS.map((pillar) => {
        const habitIds = new Set(state.habits.filter((h) => h.pillar === pillar.id).map((h) => h.id));
        const dailyTotals = days.map((day) =>
          state.logs
            .filter((l) => l.date === day && habitIds.has(l.habitId))
            .reduce((sum, l) => sum + l.points, 0)
        );
        const weekTotal = dailyTotals.reduce((a, b) => a + b, 0);
        const max = Math.max(...dailyTotals, 20);

        return (
          <div key={pillar.id} className={`chart-card pillar-${pillar.id}`}>
            <div className="chart-card-top">
              <span className="chart-card-name">{pillar.name}</span>
              <span className="chart-card-total">{weekTotal} pts this week</span>
            </div>
            <div className="chart-bars">
              {dailyTotals.map((value, i) => (
                <div key={days[i]} className="chart-bar" style={{ height: `${Math.max((value / max) * 100, 4)}%` }} />
              ))}
            </div>
            <div className="chart-labels">
              {days.map((day) => (
                <span key={day}>{weekdayLetter(day)}</span>
              ))}
            </div>
          </div>
        );
      })}

      <div className="self-control">
        <div>
          <h2>Self-Control</h2>
          <p className="subtle">the fewer taps here, the better</p>
        </div>
        {state.cleanStreaks.map((c) => (
          <div key={c.id} className="clean-streak-card">
            <div className="clean-streak-text">
              <span className="habit-name">{c.name}</span>
              <span className="subtle">best run: {c.bestStreak} days</span>
            </div>
            <div className="clean-streak-count">
              <div className="clean-streak-value">{c.currentStreak}</div>
              <div className="subtle">days clean</div>
            </div>
            <button className="slip-button" onClick={() => onLogSlip(c.id)}>
              Log a slip
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
