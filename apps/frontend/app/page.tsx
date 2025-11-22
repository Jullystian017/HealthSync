"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { cn } from "../lib/utils";
import { Activity, Bot, Brain, Check, LineChart, Salad, ShoppingCart, Sparkles, Zap } from "lucide-react";
import AppHeader from "../components/layout/AppHeader";
import Footer from "../components/layout/Footer";

const trustedLogos = ["WellnessCo", "HealthFlow", "FitPlus", "Mindful", "VitalityLab"];

const featureHighlights = [
  {
    icon: Bot,
    title: "AI Nutrition Coach",
    description: "Personalized meal guidance using adaptive AI that evolves with you.",
  },
  {
    icon: Salad,
    title: "Meal Plan Generator",
    description: "Instant weekly plans tailored to macros, allergies, and lifestyle goals.",
  },
  {
    icon: Brain,
    title: "Mental Wellness Assistant",
    description: "Daily mindfulness prompts, journaling cues, and resilience techniques.",
  },
  {
    icon: Activity,
    title: "Stress & Mood Tracker",
    description: "Visualize mood patterns and stress triggers with smart correlations.",
  },
  {
    icon: Zap,
    title: "Wearable Sync",
    description: "Connect Fitbit, Apple Health, and Garmin for real-time biometrics.",
  },
  {
    icon: ShoppingCart,
    title: "Smart Grocery List",
    description: "Auto-generate grocery lists aligned with your AI meal plans.",
  },
];

const testimonialData = [
  {
    name: "Dr. Maya Arifin",
    role: "Functional Nutritionist",
    quote: "HealthSync helps my clients stay accountable between sessions with AI nudges and clear analytics.",
  },
  {
    name: "James Liu",
    role: "Product Designer",
    quote: "The stress tracking and meal planner combo finally gave me balance. I feel sharper every day.",
  },
  {
    name: "Amelia Duarte",
    role: "Endurance Athlete",
    quote: "Wearable syncing plus smart grocery lists keep my nutrition dialed in when training peaks.",
  },
  {
    name: "Ravi Patel",
    role: "Startup Founder",
    quote: "AI wellness assistant is like having a coach on call 24/7—without the overwhelm.",
  },
];

type BillingCycle = "monthly" | "yearly";

type PricingTier = {
  name: string;
  badge?: string;
  highlighted?: boolean;
  price: Record<BillingCycle, number>;
  description: string;
  perks: string[];
  buttonLabel?: string;
  savings?: string;
  support?: string;
};

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    badge: "Starter",
    price: { monthly: 0, yearly: 0 },
    description: "Get started with core tracking, weekly AI tips, and community access.",
    perks: [
      "Daily mood & meal logging",
      "Basic AI suggestions",
      "One wearable connection",
      "Access to community rituals",
    ],
    buttonLabel: "Get Started",
    support: "Perfect for exploring HealthSync foundations.",
  },
  {
    name: "Premium",
    badge: "Premium",
    highlighted: true,
    price: { monthly: 39, yearly: 390 },
    description: "Scale your health journey with concierge-level coaching and biomarker sync.",
    perks: [
      "AI accountability partner",
      "Custom biomarker insights",
      "Family & team planning",
      "Priority concierge support",
      "Exclusive workshops & events",
    ],
    buttonLabel: "Talk to Sales",
    savings: "Save 2 months with annual billing",
    support: "For performance teams and high-touch coaching workflows.",
  },
];

const billingOptions: { value: BillingCycle; label: string; subLabel?: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly", subLabel: "Save 2 months" },
];

const showcaseBullets = [
  "Macro-aligned recipe recommendations updated daily",
  "Mindful check-ins correlated with nutrition score",
  "Progressive habit streaks across sleep, mood, and nutrition",
];

const logoSrc = "/mnt/data/A_logo_for_NutriSync_features_a_stylized_emblem_to.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HomePage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const formatPrice = (tier: PricingTier) => {
    const amount = tier.price[billingCycle];
    if (amount === 0) return "Free";
    return `$${amount}`;
  };

  const billingSuffix = billingCycle === "monthly" ? "/month" : "/year";

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />

      <main className="overflow-hidden">
        <section className="relative isolate bg-gradient-to-b from-white to-sky-50" id="hero">
          <div className="absolute -left-16 top-20 hidden h-80 w-80 rounded-full bg-sky-200/40 blur-3xl lg:block" />
          <div className="absolute -right-20 bottom-10 hidden h-96 w-96 rounded-full bg-sky-100/40 blur-3xl lg:block" />
          <div className="container mx-auto grid gap-16 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <Badge className="mb-6 bg-sky-500/10 text-sky-700">AI Nutrition & Wellness Assistant</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Your AI-Powered Nutrition & Wellness Companion
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-slate-600">
                Eat better, think clearer, and improve your overall wellbeing with personalized insights powered by AI.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button size="lg" className="bg-sky-500 px-8 text-base text-white shadow-lg shadow-sky-200 hover:bg-sky-600">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="px-8 text-base text-sky-700 border-sky-200 hover:bg-sky-50">
                  Watch Demo
                </Button>
              </div>
              <div className="mt-12 flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-sky-500" />
                  <span>AI Nutrition Coach</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-sky-500" />
                  <span>Mental Wellness Assistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <LineChart className="h-4 w-4 text-sky-500" />
                  <span>Health Analytics</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute inset-0 -translate-y-6 rounded-[32px] bg-gradient-to-br from-sky-200/60 to-sky-100/30 blur-3xl" />
              <motion.div
                className="relative rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-2xl backdrop-blur-xl"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Today&apos;s Focus</p>
                    <p className="text-xl font-semibold text-slate-900">Balanced Energy</p>
                  </div>
                  <Badge className="bg-sky-500/10 text-sky-700">+18% Wellness</Badge>
                </div>
                <div className="mt-6 grid gap-4">
                  <Card className="border-sky-100 bg-white/90">
                    <CardContent className="flex items-start gap-4 p-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600">
                        <Salad className="h-6 w-6 text-sky-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500">AI Meal Plan</p>
                        <p className="text-base font-semibold text-slate-900">Mediterranean Flex Day</p>
                        <p className="mt-2 text-sm text-slate-500">Target macros: 110g protein, 45g healthy fats, 65g complex carbs.</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-transparent bg-gradient-to-r from-sky-500/10 to-sky-300/10">
                    <CardContent className="flex items-center justify-between p-5">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Mindful Break</p>
                        <p className="text-base font-semibold text-slate-900">5-minute grounding session</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-sky-600">
                        <Brain className="h-5 w-5" />
                        <span>Recommended</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-12">
          <motion.div
            className="container mx-auto px-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
            }}
          >
            <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Trusted by teams focused on whole-person health
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-10 text-base text-slate-400">
              {trustedLogos.map((logo) => (
                <motion.span key={logo} className="uppercase tracking-[0.3em]" variants={fadeUp}>
                  {logo}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="features" className="container mx-auto px-6 py-24">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Badge className="mx-auto mb-4 bg-sky-500/10 text-sky-700">Our Capabilities</Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Everything you need to stay in sync</h2>
            <p className="mt-4 text-base text-slate-600">
              Intelligent, adaptive tools for nutrition, mindfulness, and lifestyle designed around your real-world data.
            </p>
          </motion.div>
          <motion.div
            className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {featureHighlights.map((feature) => (
              <motion.div key={feature.title} variants={fadeUp}>
                <Card className="h-full border-slate-200/60 bg-white p-1">
                  <CardContent className="flex h-full flex-col gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
                      <p className="text-sm text-slate-600">{feature.description}</p>
                    </div>
                    <div className="mt-auto flex items-center gap-2 text-sm font-medium text-sky-600">
                      <Sparkles className="h-4 w-4" />
                      <span>AI Powered</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="relative overflow-hidden bg-white py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-100/60 via-white to-sky-50" />
          <div className="relative container mx-auto grid gap-16 px-6 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="order-2 rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-xl backdrop-blur-sm lg:order-1"
            >
              <div className="space-y-4">
                <Badge className="bg-sky-500/10 text-sky-700">AI Recommendation Snapshot</Badge>
                <h3 className="text-2xl font-semibold text-slate-900">Today&apos;s Mind & Body Blend</h3>
                <div className="space-y-3 text-sm text-slate-600">
                  <p><strong className="text-slate-900">Morning:</strong> Steel-cut oats with chia, berries, and adaptogenic greens smoothie.</p>
                  <p><strong className="text-slate-900">Midday:</strong> Guided micro-reset and posture refresh after wearable detects stress spike.</p>
                  <p><strong className="text-slate-900">Evening:</strong> AI-crafted Mediterranean bowl with mindful wind-down breathing series.</p>
                </div>
                <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4 text-sm text-sky-700">
                  <p className="font-medium">Sync summary</p>
                  <p>Fitbit, Apple Health, and Garmin metrics aligned—sleep score +12% week-over-week.</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="order-1 lg:order-2"
            >
              <Badge className="mb-4 bg-sky-500/10 text-sky-700">Holistic Approach</Badge>
              <h2 className="text-3xl font-semibold text-slate-900">Nutrition and mental wellness in perfect harmony</h2>
              <p className="mt-4 text-base text-slate-600">
                HealthSync brings together meal intelligence, mood support, and biomarker insights to build routines that actually stick. We translate the complexity of your health data into actionable rituals.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                {showcaseBullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 text-sky-600" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        <section className="bg-slate-900 py-24" id="dashboard">
          <motion.div className="container mx-auto max-w-5xl px-6 text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Badge className="mx-auto mb-4 bg-white/10 text-white">Personal Health Dashboard</Badge>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Visualize your progress in a single intelligent dashboard</h2>
            <p className="mt-4 text-base text-slate-300">
              Monitor nutrition score, wellness streaks, and biometric trends with adaptive insights refresh every hour.
            </p>
            <motion.div
              className="relative mx-auto mt-12 max-w-4xl rounded-[36px] border border-white/10 bg-gradient-to-br from-sky-500/10 to-sky-200/10 p-8 shadow-[0_20px_60px_-30px_rgba(14,165,233,0.45)]"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="mx-auto h-64 rounded-3xl border border-white/10 bg-slate-800/80" />
              <p className="mt-6 text-sm text-slate-400">(Dashboard preview placeholder – integrate product shots when ready)</p>
            </motion.div>
          </motion.div>
        </section>

        <section className="container mx-auto px-6 py-24" id="testimonials">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Badge className="mx-auto mb-4 bg-sky-500/10 text-sky-700">Testimonials</Badge>
            <h2 className="text-3xl font-semibold text-slate-900">Trusted by high performers and health pros</h2>
            <p className="mt-4 text-base text-slate-600">Hear from the people weaving HealthSync into their health rituals.</p>
          </motion.div>
          <motion.div
            className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {testimonialData.map((testimonial) => (
              <motion.div key={testimonial.name} variants={fadeUp}>
                <Card className="group h-full border-slate-200/60 bg-white transition-shadow duration-300 hover:shadow-xl">
                  <CardContent className="flex h-full flex-col gap-5 p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/10 text-sky-600">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{testimonial.name}</p>
                        <p className="text-xs uppercase tracking-wide text-slate-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600">“{testimonial.quote}”</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section id="pricing" className="relative overflow-hidden py-24">
          <motion.div className="container mx-auto px-6">
            <motion.div className="mx-auto max-w-3xl text-center" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Badge className="mx-auto mb-4 bg-sky-500/10 text-sky-700">Flexible pricing</Badge>
              <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">Invest in your wellbeing at the pace that fits</h2>
              <p className="mt-4 text-base text-slate-600">
                Switch billing anytime. Every plan comes with guided onboarding, AI insights, and mindful ritual templates.
              </p>
            </motion.div>

            <motion.div
              className="mx-auto mt-10 flex max-w-xl items-center justify-center rounded-full border border-sky-200/70 bg-white/80 p-1 shadow-lg shadow-sky-200/30 backdrop-blur"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {billingOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setBillingCycle(option.value)}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all",
                    billingCycle === option.value
                      ? "bg-gradient-to-r from-sky-500 to-sky-300 text-white shadow-md shadow-sky-400/40"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  <span>{option.label}</span>
                  {option.subLabel && (
                    <span
                      className={cn(
                        "text-xs",
                        billingCycle === option.value ? "text-white/80" : "text-sky-500"
                      )}
                    >
                      {option.subLabel}
                    </span>
                  )}
                </button>
              ))}
            </motion.div>

            <motion.div
              className="mt-16 grid gap-6 md:grid-cols-2 lg:mx-auto lg:max-w-4xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            >
              {pricingTiers.map((tier) => (
                <motion.div key={tier.name} variants={fadeUp}>
                  <Card
                    className={cn(
                      "relative flex h-full flex-col border-sky-100/60 bg-white/95 p-1 shadow-sm transition-shadow duration-300",
                      tier.highlighted
                        ? "shadow-xl shadow-sky-200/70 ring-2 ring-sky-500/60"
                        : "hover:shadow-lg hover:shadow-sky-100"
                    )}
                  >
                    {tier.badge && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <Badge
                          className={cn(
                            "px-4 py-1 text-xs font-semibold uppercase tracking-wide",
                            tier.highlighted
                              ? "bg-gradient-to-r from-sky-500 to-sky-300 text-white shadow-md shadow-sky-400/40"
                              : "bg-white text-sky-600 shadow"
                          )}
                        >
                          {tier.badge}
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="space-y-4 pt-8 text-left">
                      <div>
                        <p className="text-sm font-medium uppercase tracking-wide text-sky-600/90">
                          {tier.name}
                        </p>
                        <div className="mt-3 flex items-baseline gap-2">
                          <span className="text-4xl font-semibold text-slate-900">{formatPrice(tier)}</span>
                          {tier.price[billingCycle] !== 0 && (
                            <span className="text-sm font-medium text-slate-500">{billingSuffix}</span>
                          )}
                        </div>
                        <CardDescription className="mt-2 text-sm text-slate-600">
                          {tier.description}
                        </CardDescription>
                        {tier.savings && billingCycle === "yearly" && (
                          <div className="mt-3 inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-700">
                            <Sparkles className="mr-1 h-3.5 w-3.5" />
                            {tier.savings}
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {tier.perks.map((perk) => (
                        <div key={perk} className="flex items-start gap-3 text-sm text-slate-600">
                          <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/10">
                            <Check className="h-3 w-3 text-sky-600" />
                          </div>
                          <span>{perk}</span>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter className="mt-auto flex flex-col gap-3">
                      <Button
                        className={cn(
                          "w-full text-sm font-semibold shadow-md transition-transform duration-200",
                          tier.highlighted
                            ? "bg-gradient-to-r from-sky-600 to-sky-300 text-white hover:from-sky-700 hover:to-sky-400"
                            : "bg-slate-900 text-white hover:bg-slate-800"
                        )}
                      >
                        {tier.buttonLabel ?? "Choose Plan"}
                      </Button>
                      {tier.support && (
                        <p className="text-xs text-slate-500">{tier.support}</p>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mx-auto mt-14 max-w-3xl text-center"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-sky-200/70 bg-white px-6 py-3 text-sm text-slate-600 shadow-sm">
                <Sparkles className="h-4 w-4 text-sky-600" />
                <span>Every plan includes mindful habit loops, recipe intelligence, and dedicated community rituals.</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="relative overflow-hidden py-20" id="cta">
          <motion.div
            className="container mx-auto px-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 p-10 text-white shadow-[0_20px_80px_-30px_rgba(14,165,233,0.7)]">
              <motion.div
                className="absolute -right-16 top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-full bg-sky-400/60 blur-3xl lg:block"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative z-10 grid gap-6 lg:grid-cols-[2fr_1fr] lg:items-center">
                <div>
                  <h2 className="text-3xl font-semibold">Transform your health with HealthSync today.</h2>
                  <p className="mt-3 max-w-2xl text-base text-sky-50">
                    Harness personalized AI to align nutrition, mind, and lifestyle. Start your free trial and feel the difference within days.
                  </p>
                </div>
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-end">
                  <Button size="lg" className="bg-white px-8 text-sky-700 hover:bg-sky-100">
                    Get Started
                  </Button>
                  <Button size="lg" variant="ghost" className="border border-white/40 px-8 text-white hover:bg-white/10">
                    Talk to Sales
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
