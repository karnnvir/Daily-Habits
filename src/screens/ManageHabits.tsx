import { useState } from "react";
import { HABIT_ICONS } from "../lib/icons";
import { PILLARS, type Habit, type HabitsState, type PillarId } from "../types";

export function ManageHabits({
  state,
  onAddHabit,
  onRenameHabit,
  onDeleteHabit,
  onAddActivity,
  onRemoveActivity,
}: {
  state: HabitsState;
  onAddHabit: (pillar: PillarId, name: string) => void;
  onRenameHabit: (habitId: string, name: string) => void;
  onDeleteHabit: (habitId: string) => void;
  onAddActivity: (habitId: string, activity: string) => void;
  onRemoveActivity: (habitId: string, activity: string) => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitPillar, setNewHabitPillar] = useState<PillarId>("growth");

  function handleAddHabit() {
    const name = newHabitName.trim();
    if (!name) return;
    onAddHabit(newHabitPillar, name);
    setNewHabitName("");
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <div>
          <h1>Manage Habits</h1>
          <p className="subtle">Add, edit, or retire your quests</p>
        </div>
      </div>

      <div className="add-habit-form">
        <input
          type="text"
          placeholder="New sub-category name"
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddHabit()}
        />
        <select value={newHabitPillar} onChange={(e) => setNewHabitPillar(e.target.value as PillarId)}>
          {PILLARS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddHabit}>Add</button>
      </div>

      {PILLARS.map((pillar) => {
        const habits = state.habits.filter((h) => h.pillar === pillar.id).sort((a, b) => a.order - b.order);
        return (
          <div key={pillar.id} className="pillar-section">
            <div className={`pillar-section-header pillar-${pillar.id}`}>
              <span className="pillar-dot" />
              <span className="pillar-section-name">{pillar.name}</span>
            </div>
            <div className="habit-list">
              {habits.map((habit) => (
                <ManageHabitRow
                  key={habit.id}
                  habit={habit}
                  expanded={expandedId === habit.id}
                  onToggle={() => setExpandedId(expandedId === habit.id ? null : habit.id)}
                  onRename={(name) => onRenameHabit(habit.id, name)}
                  onDelete={() => onDeleteHabit(habit.id)}
                  onAddActivity={(activity) => onAddActivity(habit.id, activity)}
                  onRemoveActivity={(activity) => onRemoveActivity(habit.id, activity)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ManageHabitRow({
  habit,
  expanded,
  onToggle,
  onRename,
  onDelete,
  onAddActivity,
  onRemoveActivity,
}: {
  habit: Habit;
  expanded: boolean;
  onToggle: () => void;
  onRename: (name: string) => void;
  onDelete: () => void;
  onAddActivity: (activity: string) => void;
  onRemoveActivity: (activity: string) => void;
}) {
  const [name, setName] = useState(habit.name);
  const [newActivity, setNewActivity] = useState("");

  function handleAddActivity() {
    const activity = newActivity.trim();
    if (!activity) return;
    onAddActivity(activity);
    setNewActivity("");
  }

  return (
    <div className={`manage-habit-row ${expanded ? "expanded" : ""}`}>
      <button className="manage-habit-summary" onClick={onToggle}>
        <div className="habit-icon">{HABIT_ICONS[habit.id] ?? null}</div>
        <span className="habit-name">{habit.name}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d={expanded ? "M6 15l6-6 6 6" : "M6 9l6 6 6-6"} />
        </svg>
      </button>

      {expanded && (
        <div className="manage-habit-detail">
          <label>
            <span className="field-label">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => name.trim() && name !== habit.name && onRename(name.trim())}
            />
          </label>

          <div className="field-label">Activities</div>
          <div className="activity-chips">
            {habit.activities.map((activity) => (
              <div key={activity} className="activity-chip">
                <span>{activity}</span>
                <button onClick={() => onRemoveActivity(activity)} aria-label={`Remove ${activity}`}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
            ))}
            <div className="activity-chip-add">
              <input
                type="text"
                placeholder="Add activity"
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddActivity()}
              />
              <button onClick={handleAddActivity}>Add</button>
            </div>
          </div>

          <button className="delete-habit-button" onClick={onDelete}>
            Delete sub-category
          </button>
        </div>
      )}
    </div>
  );
}
