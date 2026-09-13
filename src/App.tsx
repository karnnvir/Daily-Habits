import { Navigate, Route, Routes } from "react-router-dom";
import { BottomNav } from "./components/BottomNav";
import { useAuth } from "./hooks/useAuth";
import { useHabitsStore } from "./store/useHabitsStore";
import { Login } from "./screens/Login";
import { Dashboard } from "./screens/Dashboard";
import { HabitsScreen } from "./screens/HabitsScreen";
import { Progress } from "./screens/Progress";
import { ManageHabits } from "./screens/ManageHabits";

export default function App() {
  const { user, loading: authLoading } = useAuth();
  const store = useHabitsStore(!!user);

  if (authLoading) {
    return <div className="empty-state">Loading…</div>;
  }

  if (!user) {
    return <Login />;
  }

  if (!store.ready) {
    return <div className="empty-state">Loading…</div>;
  }

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<Dashboard state={store.state} />} />
        <Route path="/habits" element={<HabitsScreen state={store.state} onLog={store.logHabit} />} />
        <Route path="/progress" element={<Progress state={store.state} onLogSlip={store.logSlip} />} />
        <Route
          path="/manage"
          element={
            <ManageHabits
              state={store.state}
              onAddHabit={store.addHabit}
              onRenameHabit={store.renameHabit}
              onDeleteHabit={store.deleteHabit}
              onAddActivity={store.addActivity}
              onRemoveActivity={store.removeActivity}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomNav />
    </div>
  );
}
