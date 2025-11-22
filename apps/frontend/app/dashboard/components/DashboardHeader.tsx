"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { supabase } from "../../../lib/supabaseClient";

export default function DashboardHeader() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (mounted) {
        setEmail(data.user?.email ?? null);
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setEmail(session?.user?.email ?? null);
      }
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    router.push("/");
  };

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container-padded flex h-14 items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <span className="rounded-lg bg-sky-500/10 px-2 py-1 text-sky-600">HealthSync</span>
          <span className="text-slate-500">Dashboard</span>
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">Go to Marketing Site</Link>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleSignOut} disabled={loading}>
            {loading ? "Signing out..." : "Sign out"}
          </Button>
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${email ?? "User"}`} alt={email ?? "User"} />
            <AvatarFallback>{email?.[0]?.toUpperCase() ?? "U"}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
