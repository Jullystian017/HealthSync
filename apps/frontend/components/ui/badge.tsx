import { cn } from "../../lib/utils";

export function Badge({ className, children, color = "default" }: { className?: string; children: React.ReactNode; color?: "default" | "primary" | "success" | "warning" }) {
  const base = "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium";
  const styles = {
    default: "bg-slate-100 text-slate-700",
    primary: "bg-primary/10 text-primary",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
  } as const;
  return <span className={cn(base, styles[color], className)}>{children}</span>;
}
