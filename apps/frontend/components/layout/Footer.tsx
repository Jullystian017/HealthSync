import Link from "next/link";
import Image from "next/image";
import { Apple, Brain, LineChart } from "lucide-react";

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Support", href: "#hero" },
];

const logoSrc = "/mnt/data/A_logo_for_NutriSync_features_a_stylized_emblem_to.png";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white py-10" id="footer">
      <div className="container mx-auto flex flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-sky-100 bg-sky-50">
            <Image src={logoSrc} alt="HealthSync" fill className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">HealthSync</p>
            <p className="text-xs text-slate-500">AI Nutrition & Mental Wellness Companion</p>
          </div>
        </Link>
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href} className="transition-colors hover:text-slate-900">
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <Apple className="h-5 w-5" />
          <LineChart className="h-5 w-5" />
          <Brain className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-6 text-center text-xs text-slate-400">© {year} HealthSync. All rights reserved.</div>
    </footer>
  );
}
