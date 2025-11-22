import { useEffect, useState } from "react";

export type User = { id: string; name: string; email: string } | null;

export function useUser() {
  const [user, setUser] = useState<User>(null);
  useEffect(() => {
    // mock auth
    setTimeout(() => setUser({ id: "u1", name: "Jane Doe", email: "jane@nutrisync.app" }), 200);
  }, []);
  return { user };
}
