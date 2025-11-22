"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { Menu, Sparkles, X } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

const logoSrc = "/mnt/data/A_logo_for_NutriSync_features_a_stylized_emblem_to.png";

export default function AppHeader() {
  const [open, setOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (mounted) setIsAuthed(!!data.user);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setIsAuthed(!!session?.user);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-sky-100 bg-sky-50">
            <Image src={logoSrc} alt="HealthSync" fill className="object-cover" />
          </div>
          <span className="text-lg font-semibold text-slate-900">HealthSync</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 lg:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="transition-colors hover:text-slate-900">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          {isAuthed ? (
            <Button size="md" className="bg-slate-900 px-4 text-sm text-white hover:bg-slate-800" asChild>
              <a href="/dashboard">Dashboard</a>
            </Button>
          ) : (
            <Button size="md" className="bg-sky-500 px-4 text-sm text-white hover:bg-sky-600" asChild>
              <a href="/login">Get Started</a>
            </Button>
          )}
        </div>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="container mx-auto flex flex-col gap-4 px-6 py-6">
            <nav className="flex flex-col gap-1 text-sm font-medium text-slate-600">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-lg px-2 py-2 transition-colors hover:bg-sky-50 hover:text-slate-900"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-2">
              {isAuthed ? (
                <Button size="md" className="bg-slate-900 px-4 text-sm text-white hover:bg-slate-800" asChild>
                  <a href="/dashboard" onClick={() => setOpen(false)}>Dashboard</a>
                </Button>
              ) : (
                <Button size="md" className="bg-sky-500 px-4 text-sm text-white hover:bg-sky-600" asChild>
                  <a href="/login" onClick={() => setOpen(false)}>Get Started</a>
                </Button>
              )}
            </div>
           
          </div>
        </div>
      )}
    </header>
  );
}
