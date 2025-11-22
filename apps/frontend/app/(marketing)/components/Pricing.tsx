"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

const tiers = [
  { name: "Free", price: "$0", desc: "Track basics and see weekly trends.", cta: "Get Started" },
  { name: "Pro", price: "$9/mo", desc: "AI coaching and advanced analytics.", cta: "Start Pro" },
  { name: "Teams", price: "$49/mo", desc: "Collaborate with coaches and clients.", cta: "Contact Sales" },
];

export default function Pricing() {
  return (
    <section id="pricing" className="container-padded py-16 sm:py-24">
      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center text-3xl font-bold">
        Simple pricing
      </motion.h2>
      <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-3">
        {tiers.map((t, i) => (
          <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardHeader>
                <CardTitle>{t.name}</CardTitle>
                <CardDescription>{t.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{t.price}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">{t.cta}</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
