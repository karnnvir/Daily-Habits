import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      // Anonymous sessions predate the switch to email/password login - treat
      // them as signed out so stale phone/browser sessions fall through to
      // the login screen instead of hanging on a permission-denied read.
      if (u?.isAnonymous) {
        signOut(auth);
        return;
      }
      setUser(u);
      setLoading(false);
    });
  }, []);

  return { user, loading };
}
