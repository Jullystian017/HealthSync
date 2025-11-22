import type { Metadata } from "next";
import "../styles/globals.css";
import { cn } from "../lib/utils";

export const metadata: Metadata = {
  title: "HealthSync",
  description: "Track nutrition and mental wellness with intelligent insights.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-white text-slate-900")}>{children}</body>
    </html>
  );
}
