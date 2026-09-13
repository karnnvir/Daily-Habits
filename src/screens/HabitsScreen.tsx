import { Link } from "react-router-dom";
import { HabitRow } from "../components/HabitRow";
import { levelForXp } from "../lib/scoring";
import { PILLARS, type EffortTier, type HabitsState } from "../types";

export function HabitsScreen({
  state,
  onLog,
}: {
  state: HabitsState;
  onLog: (habitId: string, tier: EffortTier) => void;
}) {
  return (
    <div className="screen">
      <div className="screen-header">
        <div>
          <h1>Habits</h1>
          <p className="subtle">{state.habits.length} quests across 3 pillars · pick your effort each time</p>
        </div>
        <Link to="/manage" className="header-link">
          Manage
        </Link>
      </div>

      {PILLARS.map((pillar) => {
        const { level } = levelForXp(state.pillarXp[pillar.id]);
        const habits = state.habits.filter((h) => h.pillar === pillar.id).sort((a, b) => a.order - b.order);
        return (
          <div key={pillar.id} className="pillar-section">
            <div className={`pillar-section-header pillar-${pillar.id}`}>
              <span className="pillar-dot" />
              <span className="pillar-section-name">{pillar.name}</span>
              <span className="pillar-section-level">Lv {level}</span>
            </div>
            <div className="habit-list">
              {habits.map((habit) => (
                <HabitRow key={habit.id} habit={habit} logs={state.logs} onLog={onLog} showActivities />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
