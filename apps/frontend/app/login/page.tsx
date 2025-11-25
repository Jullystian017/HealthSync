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
     (
      <div className="min-h-screen bg-gray-100  items-center justify-center p-8">
        <Link href="/" className="mb-4 inline-flex flex items-center text-sm font-medium text-sky-600 hover:text-sky-700">
            ← Back to homepage
          </Link>
        <div className="w-full max-w-5xl h-[640px] flex overflow-hidden rounded-3xl shadow-lg bg-white">
          
          {/* LEFT SIDE (FORM) */}
          <div className="w-1/2 p-10 bg-white/90 backdrop-blur-lg flex flex-col justify-between rounded-3xl">
            
            {/* Logo + Title */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-md bg-black/90 flex items-center justify-center text-white">
                  ★
                </div>

                <div>
                  <h1 className="text-xl font-semibold">HealthySync</h1>
                  <p className="text-sm text-gray-500 -mt-1">
                    Welcome too HealthySync
                  </p>
                </div>
              </div>

              {/* Switch Sign In / Sign Up */}
              <div className="bg-white/0 rounded-full p-1 inline-flex border border-gray-200">
                <button className="px-6 py-2 bg-blue-500 text-white rounded-full">
                  Sign In
                </button>
                <button className="px-6 py-2 rounded-full text-gray-500">
                  Sign Up
                </button>
              </div>

              {/* Form */}
              <form className="mt-6 space-y-4">
                <div className="relative">
                  <input
                    placeholder="Enter your email"
                    className="w-full border border-gray-200 rounded-full py-3 pl-6 pr-12 
                    focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  <span className="absolute right-4 top-0 bottom-0 my-auto text-gray-400">
                    
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full border border-gray-200 rounded-full py-3 pl-6 pr-12 
                    focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  <span className="absolute right-4 top-0 bottom-0 my-auto text-gray-400">
                    
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    Remember me
                  </label>

                  <a href="#" className="text-blue-500">
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-blue-500 text-white 
                  font-medium shadow-md"
                >
                  Login
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center text-sm text-gray-400">
                <div className="flex-1 h-px bg-gray-200"></div>
                <div className="px-3">OR</div>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Social Login */}
              <div className="space-y-3">
                <button className="w-full py-3 rounded-full bg-black text-white flex items-center justify-center gap-3">
                  Log in with Apple
                </button>

                <button className="w-full py-3 rounded-full border border-gray-200 flex items-center justify-center gap-3">
                  Log in with Google
                </button>
              </div>
            </div>

            <div className="text-xs text-gray-400">
              © 2025 HealthySync. All right reserved
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div
            className="w-1/2 relative flex items-end justify-center p-8 
            bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://plus.unsplash.com/premium_photo-1701701278841-2c3aeea994d1?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2F2eSUyMGxpbmVzfGVufDB8fDB8fHww')"
            }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center text-xs text-gray-200 max-w-xs">
              <p className="opacity-80">
                © 2025 HealthySync. All right reserved
              </p>
              <p className="opacity-60 text-[11px] mt-1">
                Unauthorized use or reproduction of any content or materials from
                this site is prohibited.
              </p>
            </div>
          </div>
        </div>
      </div>
  )
)}
