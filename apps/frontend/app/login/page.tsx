"use client";

import { useEffect, useState } from "react";
import type { Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hydrated, setHydrated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    if (data.user) {
      const redirectTo = searchParams.get("redirect");
      const safeRedirect: Route = redirectTo && redirectTo.startsWith("/") ? (redirectTo as Route) : "/dashboard";
      router.push(safeRedirect);
    }
  };

  if (!hydrated) {
    return (
      <div className="min-h-[80vh] bg-slate-50 py-16">
        <div className="container mx-auto flex max-w-md items-center justify-center px-6">
          <div className="h-48 w-full animate-pulse rounded-2xl border border-slate-200/80 bg-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-slate-50 py-16">
      <div className="container mx-auto max-w-md px-6">
        <Link href="/" className="mb-4 inline-flex items-center text-sm font-medium text-sky-600 hover:text-sky-700">
          ← Back to homepage
        </Link>
        <Card className="border-slate-200/80">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your HealthSync account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="email">Email</label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="password">Password</label>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" className="w-full bg-sky-500 text-white hover:bg-sky-600" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
              <p className="text-center text-sm text-slate-600">
                Don&apos;t have an account? <a href="/register" className="text-sky-600 underline">Create one</a>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
