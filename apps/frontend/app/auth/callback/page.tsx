"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Supabase handles the callback automatically via onAuthStateChange
        // But we need to wait for it to process
        
        // First, check if we have a code in search params (some Supabase flows use this)
        const code = searchParams.get('code');
        if (code) {
          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            setError(exchangeError.message);
            setLoading(false);
            return;
          }
          if (data.session) {
            router.push("/dashboard");
            return;
          }
        }

        // Check hash params (magic link usually uses hash)
        if (window.location.hash) {
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token');
          const errorParam = hashParams.get('error');
          const errorDescription = hashParams.get('error_description');

          if (errorParam) {
            setError(errorDescription || errorParam || "Authentication failed");
            setLoading(false);
            return;
          }

          if (accessToken && refreshToken) {
            const { data, error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (sessionError) {
              setError(sessionError.message);
              setLoading(false);
              return;
            }

            if (data.session) {
              router.push("/dashboard");
              return;
            }
          }
        }

        // Wait a bit for Supabase to process the callback automatically
        // Supabase client automatically handles auth state changes
        const checkSession = async () => {
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError) {
            setError(sessionError.message);
            setLoading(false);
            return;
          }

          if (session) {
            router.push("/dashboard");
            return;
          }

          // If still no session after waiting, show error
          setError("Unable to complete authentication. Please try clicking the verification link again.");
          setLoading(false);
        };

        // Wait 1 second for Supabase to process
        setTimeout(checkSession, 1000);
      } catch (err: any) {
        setError(err?.message || "An error occurred during authentication");
        setLoading(false);
      }
    };

    handleAuthCallback();
  }, [router, searchParams]);

  if (loading) {
    return (
      <div className="min-h-[80vh] bg-slate-50 py-16">
        <div className="container mx-auto max-w-md px-6">
          <Card className="border-slate-200/80">
            <CardHeader>
              <CardTitle className="text-2xl">Verifying your account...</CardTitle>
              <CardDescription>Please wait while we verify your email and log you in.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] bg-slate-50 py-16">
        <div className="container mx-auto max-w-md px-6">
          <Card className="border-slate-200/80">
            <CardHeader>
              <CardTitle className="text-2xl text-red-600">Verification Failed</CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-slate-600">
                  Please try clicking the verification link again, or contact support if the problem persists.
                </p>
                <a
                  href="/login"
                  className="inline-block w-full rounded-2xl bg-sky-500 px-4 py-2 text-center text-white hover:bg-sky-600"
                >
                  Go to Login
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}

