"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";

interface DashboardGateProps {
  children: ReactNode;
}

type GateState = "loading" | "authorized";

export default function DashboardGate({ children }: DashboardGateProps) {
  const router = useRouter();
  const [state, setState] = useState<GateState>("loading");

  useEffect(() => {
    let mounted = true;

    const evaluateSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      if (data.session) {
        setState("authorized");
      } else {
        router.replace("/login?redirect=/dashboard");
      }
    };

    evaluateSession();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      if (session) {
        setState("authorized");
      } else {
        router.replace("/login?redirect=/dashboard");
      }
    });

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, [router]);

  if (state === "loading") {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-3 text-slate-500">
        <Loader2 className="h-6 w-6 animate-spin" />
        <p>Checking your session…</p>
      </div>
    );
  }

  return <>{children}</>;
}
