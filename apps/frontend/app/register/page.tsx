"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    if (data.user) {
      // Depending on Supabase email confirmation settings, a link may be sent.
      setInfo("Registration successful. Please check your email to verify your account.");
      // Optionally redirect after a delay
      // setTimeout(() => router.push("/login"), 1500);
    }
  };

  return (
    <div className="min-h-[80vh] bg-slate-50 py-16">
      <div className="container mx-auto max-w-md px-6">
        <Link href="/" className="mb-4 inline-flex items-center text-sm font-medium text-sky-600 hover:text-sky-700">
          ← Back to homepage
        </Link>
        <Card className="border-slate-200/80">
          <CardHeader>
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <CardDescription>Join HealthSync to start your wellness journey</CardDescription>
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
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="confirm">Confirm password</label>
                <Input id="confirm" type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              {info && <p className="text-sm text-sky-700">{info}</p>}
              <Button type="submit" className="w-full bg-sky-500 text-white hover:bg-sky-600" disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </Button>
              <p className="text-center text-sm text-slate-600">
                Already have an account? <a href="/login" className="text-sky-600 underline">Sign in</a>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
