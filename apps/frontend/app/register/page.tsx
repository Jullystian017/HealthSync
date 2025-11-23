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
    
    try {
      // Get the current origin for the redirect URL
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const redirectUrl = `${origin}/auth/callback`;
      
      // Sign up the user with magic link
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: redirectUrl, // Redirect to callback after clicking magic link
        }
      });
      
      if (error) {
        const msg = (error.message || "").toLowerCase();
        const alreadyRegistered = msg.includes("already registered") || msg.includes("user already registered") || (error as any).status === 422;
        if (alreadyRegistered) {
          const { data: signInData, error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
          if (signInData?.user && signInData.session) {
            setLoading(false);
            router.push("/dashboard");
            return;
          }
          if (signInErr) {
            const em = (signInErr.message || "").toLowerCase();
            const unconfirmed = em.includes("not confirmed") || em.includes("email not confirmed");
            if (unconfirmed) {
              const { error: resendError } = await supabase.auth.resend({ type: "signup", email });
              setLoading(false);
              if (!resendError) {
                setInfo("Email sudah terdaftar namun belum terverifikasi. Kami telah mengirim ulang email verifikasi.");
                router.push(`/auth/pending?email=${encodeURIComponent(email)}`);
                return;
              }
            }
            setLoading(false);
            setError("Email sudah terdaftar dan terverifikasi. Silakan login.");
            return;
          }
          setLoading(false);
          setError("Email sudah terdaftar dan terverifikasi. Silakan login.");
          return;
        }
        setLoading(false);
        setError(error.message);
        return;
      }
      
      if (data.user) {
        // If identities array is empty or missing, user likely already exists
        const u = data.user as any;
        const identities = u?.identities;
        const emailConfirmed = Boolean(u?.email_confirmed_at || u?.confirmed_at);

        if (Array.isArray(identities) && identities.length > 0) {
          setLoading(false);
          // Show success message - user needs to check email and click magic link
          setInfo("Registration successful! Please check your email and click the verification link to activate your account.");
          router.push(`/auth/pending?email=${encodeURIComponent(email)}`);
          return;
        }

        if (emailConfirmed) {
          setLoading(false);
          setError("Email sudah terdaftar dan terverifikasi. Silakan login.");
          return;
        }

        const { data: signInData, error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);
        if (signInData?.user && signInData.session) {
          router.push("/dashboard");
          return;
        }
        if (signInErr) {
          const em = (signInErr.message || "").toLowerCase();
          const unconfirmed = em.includes("not confirmed") || em.includes("email not confirmed");
          if (unconfirmed) {
            const { error: resendError } = await supabase.auth.resend({ type: "signup", email });
            if (!resendError) {
              setInfo("Email sudah terdaftar namun belum terverifikasi. Kami telah mengirim ulang email verifikasi.");
              router.push(`/auth/pending?email=${encodeURIComponent(email)}`);
              return;
            }
          }
        }
        setError("Email sudah terdaftar dan terverifikasi. Silakan login.");
      } else {
        setLoading(false);
        setError("Registration failed. Please try again.");
      }
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || "An error occurred during registration");
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
