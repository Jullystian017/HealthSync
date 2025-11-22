import { type ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function kFormat(num: number) {
  if (Math.abs(num) < 1000) return String(num);
  const units = ["k", "M", "B", "T"];
  let unit = -1;
  let n = num;
  while (Math.abs(n) >= 1000 && unit < units.length - 1) {
    n /= 1000;
    unit++;
  }
  return `${n.toFixed(1)}${units[unit]}`;
}

export function trendDelta(a: number, b: number) {
  if (a === 0) return 0;
  return ((b - a) / a) * 100;
}
