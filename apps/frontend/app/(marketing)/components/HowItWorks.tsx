"use client";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../components/ui/accordion";

export default function HowItWorks() {
  return (
    <section id="how" className="container-padded py-16 sm:py-24">
      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center text-3xl font-bold">
        How it works
      </motion.h2>
      <div className="mx-auto mt-10 max-w-2xl">
        <Accordion type="single" collapsible>
          <AccordionItem value="step1">
            <AccordionTrigger>1. Track your meals and mood</AccordionTrigger>
            <AccordionContent>Log meals in seconds and select your mood and stress levels daily.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="step2">
            <AccordionTrigger>2. Get AI insights</AccordionTrigger>
            <AccordionContent>NutriSync AI finds patterns and suggests improvements tailored to you.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="step3">
            <AccordionTrigger>3. See trends and correlations</AccordionTrigger>
            <AccordionContent>Visualize your week or month to understand what fuels your best days.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
