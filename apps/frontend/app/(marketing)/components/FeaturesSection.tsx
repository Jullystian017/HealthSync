"use client";
import { motion } from "framer-motion";
import { Heart, Brain, BarChart3, BotMessageSquare } from "lucide-react";

const features = [
  { icon: Heart, title: "Nutrition Tracking", desc: "Log meals with macro breakdowns and daily goals." },
  { icon: Brain, title: "Mood Journaling", desc: "Track mood and stress with simple, friendly controls." },
  { icon: BarChart3, title: "Smart Analytics", desc: "See correlations between food and how you feel." },
  { icon: BotMessageSquare, title: "AI Coach", desc: "Personalized recommendations to improve well‑being." },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="container-padded py-16 sm:py-24">
      <motion.h2
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-center text-3xl font-bold"
      >
        Everything you need to sync nutrition and mood
      </motion.h2>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
          >
            <f.icon className="h-6 w-6 text-primary" />
            <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
