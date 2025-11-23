"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    const isNew = searchParams.get("new") === "true";
    
    if (emailParam) {
      setEmail(emailParam);
    }

    // If this is a new registration, send OTP code automatically after a short delay
    // This delay helps avoid rate limiting from Supabase
    if (isNew && emailParam && !codeSent) {
      const sendOTP = async () => {
        // Wait 3 seconds to avoid rate limiting after signup
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        setResending(true);
        
        // Use signInWithOtp to send OTP code
        // Note: This requires Supabase to be configured to send OTP codes, not magic links
        // In Supabase Dashboard: Authentication > Email Templates > Configure to use OTP
        const { error: otpError } = await supabase.auth.signInWithOtp({
          email: emailParam,
          options: {
            shouldCreateUser: false, // User already created
            // This should send OTP code, but depends on Supabase configuration
          }
        });

        setResending(false);
        setCodeSent(true);

        if (otpError) {
          setError(`Failed to send verification code: ${otpError.message}. You can try resending the code below.`);
        }
      };

      sendOTP();
    }
  }, [searchParams, codeSent]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !code) {
      setError("Email and verification code are required");
      return;
    }

    setLoading(true);
    
    try {
      // Verify OTP code
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'email',
      });

      if (verifyError) {
        setError(verifyError.message);
        setLoading(false);
        return;
      }

      if (data.user && data.session) {
        // User is now verified and logged in automatically
        // Wait a moment for session to be established, then redirect to dashboard
        setTimeout(() => {
          router.push("/dashboard");
        }, 100);
      } else if (data.user) {
        // Session might be establishing, wait a bit and check again
        const checkSession = async () => {
          const { data: sessionData } = await supabase.auth.getSession();
          if (sessionData.session) {
            router.push("/dashboard");
          } else {
            setError("Session not established. Please try again.");
            setLoading(false);
          }
        };
        setTimeout(checkSession, 500);
      } else {
        setError("Verification failed. Please try again.");
        setLoading(false);
      }
    } catch (err: any) {
      setError(err?.message || "An error occurred during verification");
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setError("Email is required to resend code");
      return;
    }

    setResending(true);
    setError(null);

    const { error: resendError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: undefined, // This ensures OTP code is sent, not magic link
      }
    });

    setResending(false);

    if (resendError) {
      setError(resendError.message);
    } else {
      setError(null);
      alert("Verification code has been resent to your email");
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
            <CardTitle className="text-2xl">Verify your email</CardTitle>
            <CardDescription>
              {codeSent || searchParams.get("new") !== "true" 
                ? `We've sent a verification code to ${email || "your email"}. Please enter it below.`
                : "Sending verification code to your email..."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="email">Email</label>
                <Input 
                  id="email" 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="you@example.com"
                  disabled={!!searchParams.get("email")}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="code">Verification Code</label>
                <Input 
                  id="code" 
                  type="text" 
                  required 
                  value={code} 
                  onChange={(e) => setCode(e.target.value.replace(/\s/g, ''))} 
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className="text-center text-2xl tracking-widest"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" className="w-full bg-sky-500 text-white hover:bg-sky-600" disabled={loading}>
                {loading ? "Verifying..." : "Verify & Continue"}
              </Button>
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resending || !email}
                  className="text-sm text-sky-600 hover:text-sky-700 underline disabled:text-slate-400 disabled:no-underline"
                >
                  {resending ? "Sending..." : "Resend code"}
                </button>
              </div>
              <p className="text-center text-sm text-slate-600">
                Already verified? <a href="/login" className="text-sky-600 underline">Sign in</a>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

