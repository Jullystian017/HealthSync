"use client";

import { motion } from "framer-motion";

export default function FloatingShapes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <motion.div
        className="absolute -top-10 left-10 h-48 w-48 rounded-full bg-primary/20 blur-3xl"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-10 right-10 h-56 w-56 rounded-full bg-slate-950/10 blur-2xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
