"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { supabase } from "../../../lib/supabaseClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

export default function PendingVerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email");

  const [email, setEmail] = useState(emailParam ?? "");
  const [resending, setResending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam]);

  useEffect(() => {
    let active = true;

    const redirectIfAuthenticated = async () => {
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (!active) return;

      if (sessionError) {
        setError(sessionError.message);
        setCheckingSession(false);
        return;
      }

      if (data.session) {
        router.replace("/dashboard");
      } else {
        setCheckingSession(false);
      }
    };

    redirectIfAuthenticated();

    const interval = setInterval(redirectIfAuthenticated, 6000);
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      if (session) {
        router.replace("/dashboard");
      }
    });

    return () => {
      active = false;
      clearInterval(interval);
      subscription.subscription.unsubscribe();
    };
  }, [router]);

  const handleResend = async () => {
    if (!email) {
      setError("Alamat email tidak ditemukan. Silakan kembali ke halaman registrasi.");
      return;
    }

    setResending(true);
    setStatus(null);
    setError(null);

    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    setResending(false);

    if (resendError) {
      setError(resendError.message);
    } else {
      setStatus("Email verifikasi baru telah dikirim. Periksa kotak masuk Anda.");
    }
  };

  return (
    <div className="min-h-[80vh] bg-slate-50 py-16">
      <div className="container mx-auto max-w-md px-6">
        <Link href="/" className="mb-4 inline-flex items-center text-sm font-medium text-sky-600 hover:text-sky-700">
          ← Kembali ke beranda
        </Link>
        <Card className="border-slate-200/80">
          <CardHeader>
            <CardTitle className="text-2xl">Verifikasi email kamu</CardTitle>
            <CardDescription>
              {email
                ? `Kami sudah mengirimkan tautan verifikasi ke ${email}. Buka email tersebut dan klik tombol verifikasi untuk mengaktifkan akunmu.`
                : "Kami sudah mengirimkan tautan verifikasi ke email kamu. Buka email tersebut dan klik tombol verifikasi untuk mengaktifkan akunmu."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-xl border border-dashed border-sky-200 bg-sky-50/60 p-4 text-sm text-slate-700">
              <p className="font-medium text-slate-900">Menunggu konfirmasi...</p>
              <p className="mt-1 text-slate-600">
                Setelah kamu klik tautan verifikasi, kami akan otomatis masuk ke akunmu dan mengarahkan ke dashboard.
              </p>
              {checkingSession && (
                <p className="mt-2 text-xs text-slate-500">Memeriksa status verifikasi setiap beberapa detik...</p>
              )}
            </div>

            {status && <p className="text-sm text-sky-700">{status}</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="space-y-3">
              <Button onClick={handleResend} className="w-full bg-sky-500 text-white hover:bg-sky-600" disabled={resending}>
                {resending ? "Mengirim ulang..." : "Kirim ulang email verifikasi"}
              </Button>
              <p className="text-center text-sm text-slate-600">
                Tidak menemukan emailnya? Coba periksa folder spam atau promosi.
              </p>
            </div>

            <div className="mt-6 text-center text-sm text-slate-500">
              <p>
                Sudah mengonfirmasi tetapi tetap kembali ke sini?{" "}
                <button
                  type="button"
                  onClick={() => router.replace("/auth/callback")}
                  className="font-medium text-sky-600 underline hover:text-sky-700"
                >
                  halaman callback
                </button>
                {" "}
                untuk menyelesaikan proses login.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
