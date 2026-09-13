import { levelForXp } from "../lib/scoring";
import { PILLAR_ICONS } from "../lib/icons";
import type { PillarId } from "../types";

export function PillarCard({
  pillar,
  name,
  totalXp,
  todayDelta,
}: {
  pillar: PillarId;
  name: string;
  totalXp: number;
  todayDelta: number;
}) {
  const { level, xpIntoLevel, xpForNextLevel } = levelForXp(totalXp);
  const percent = Math.round((xpIntoLevel / xpForNextLevel) * 100);

  return (
    <div className={`pillar-card pillar-${pillar}`}>
      <div className="pillar-card-icon">{PILLAR_ICONS[pillar]}</div>
      <div className="pillar-card-body">
        <div className="pillar-card-top">
          <span className="pillar-card-name">{name}</span>
          <span className="pillar-card-level">Lv {level}</span>
        </div>
        <div className="pillar-card-bar">
          <div className="pillar-card-bar-fill" style={{ width: `${percent}%` }} />
        </div>
        <div className="pillar-card-meta">
          <span>
            {xpIntoLevel} / {xpForNextLevel} XP
          </span>
          <span>{todayDelta > 0 ? `+${todayDelta} today` : "no activity yet"}</span>
        </div>
      </div>
    </div>
  );
}
