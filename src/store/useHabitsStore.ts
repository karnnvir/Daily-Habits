import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  runTransaction,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { todayIso, yesterdayIso } from "../lib/date";
import { pointsForTier } from "../lib/scoring";
import { buildInitialState } from "../lib/seedData";
import type { CleanStreak, EffortTier, Habit, HabitsState, LogEntry, PillarId } from "../types";

const habitsCol = collection(db, "habits");
const logsCol = collection(db, "logs");
const cleanStreaksCol = collection(db, "cleanStreaks");
const pillarXpRef = doc(db, "meta", "pillarXp");

const emptyPillarXp: Record<PillarId, number> = { growth: 0, career: 0, wellbeing: 0 };

async function ensureSeeded() {
  const existing = await getDocs(habitsCol);
  if (!existing.empty) return;

  const seed = buildInitialState();
  const batch = writeBatch(db);
  for (const h of seed.habits) {
    const { id, ...fields } = h;
    batch.set(doc(habitsCol, id), fields);
  }
  for (const c of seed.cleanStreaks) {
    const { id, ...fields } = c;
    batch.set(doc(cleanStreaksCol, id), fields);
  }
  batch.set(pillarXpRef, seed.pillarXp);
  await batch.commit();
}

export function useHabitsStore(enabled: boolean) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [cleanStreaks, setCleanStreaks] = useState<CleanStreak[]>([]);
  const [pillarXp, setPillarXp] = useState<Record<PillarId, number>>(emptyPillarXp);
  const [ready, setReady] = useState(false);
  const habitsRef = useRef<Habit[]>([]);
  useEffect(() => {
    habitsRef.current = habits;
  }, [habits]);

  useEffect(() => {
    if (!enabled) return;
    const unsubs: Array<() => void> = [];

    ensureSeeded().then(() => {
      unsubs.push(
        onSnapshot(habitsCol, (snap) => {
          setHabits(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Habit, "id">) })));
        })
      );
      unsubs.push(
        onSnapshot(logsCol, (snap) => {
          setLogs(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<LogEntry, "id">) })));
        })
      );
      unsubs.push(
        onSnapshot(cleanStreaksCol, (snap) => {
          setCleanStreaks(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<CleanStreak, "id">) })));
        })
      );
      unsubs.push(
        onSnapshot(pillarXpRef, (snap) => {
          setPillarXp(snap.exists() ? { ...emptyPillarXp, ...(snap.data() as Record<PillarId, number>) } : emptyPillarXp);
        })
      );
      setReady(true);
    });

    return () => unsubs.forEach((u) => u());
  }, [enabled]);

  const logHabit = useCallback(async (habitId: string, tier: EffortTier) => {
    const habitRef = doc(habitsCol, habitId);
    const newLogRef = doc(logsCol);

    await runTransaction(db, async (tx) => {
      const habitSnap = await tx.get(habitRef);
      const pillarSnap = await tx.get(pillarXpRef);
      if (!habitSnap.exists()) return;

      const habit = habitSnap.data() as Omit<Habit, "id">;
      const today = todayIso();
      if (habit.lastLoggedDate === today) return;

      const newStreak = habit.lastLoggedDate === yesterdayIso() ? habit.streak + 1 : 1;
      const points = pointsForTier(tier, newStreak);
      const currentXp = pillarSnap.exists() ? ((pillarSnap.data() as Record<PillarId, number>)[habit.pillar] ?? 0) : 0;

      tx.update(habitRef, { streak: newStreak, lastLoggedDate: today });
      tx.set(pillarXpRef, { [habit.pillar]: currentXp + points }, { merge: true });
      tx.set(newLogRef, { habitId, date: today, tier, points, timestamp: Date.now() });
    });
  }, []);

  const addHabit = useCallback(async (pillar: PillarId, name: string) => {
    const maxOrder = habitsRef.current.reduce((max, h) => Math.max(max, h.order), -1);
    await setDoc(doc(habitsCol), {
      pillar,
      name,
      activities: [],
      streak: 0,
      lastLoggedDate: null,
      order: maxOrder + 1,
    });
  }, []);

  const renameHabit = useCallback(async (habitId: string, name: string) => {
    await updateDoc(doc(habitsCol, habitId), { name });
  }, []);

  const deleteHabit = useCallback(async (habitId: string) => {
    await deleteDoc(doc(habitsCol, habitId));
  }, []);

  const addActivity = useCallback(async (habitId: string, activity: string) => {
    await updateDoc(doc(habitsCol, habitId), { activities: arrayUnion(activity) });
  }, []);

  const removeActivity = useCallback(async (habitId: string, activity: string) => {
    await updateDoc(doc(habitsCol, habitId), { activities: arrayRemove(activity) });
  }, []);

  const logSlip = useCallback(async (cleanStreakId: string) => {
    const ref = doc(cleanStreaksCol, cleanStreakId);
    await runTransaction(db, async (tx) => {
      const snap = await tx.get(ref);
      if (!snap.exists()) return;
      const c = snap.data() as Omit<CleanStreak, "id">;
      tx.update(ref, { currentStreak: 0, bestStreak: Math.max(c.bestStreak, c.currentStreak) });
    });
  }, []);

  const state: HabitsState = { habits, logs, pillarXp, cleanStreaks };

  return { state, ready, logHabit, addHabit, renameHabit, deleteHabit, addActivity, removeActivity, logSlip };
}
