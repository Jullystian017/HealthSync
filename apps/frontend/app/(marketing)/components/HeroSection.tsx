import { Button } from "../../../components/ui/button";
import Link from "next/link";
import FloatingShapes from "./FloatingShapes";

export default function HeroSection() {
  return (
    <section className="bg-hero relative overflow-hidden">
      <div className="container-padded py-20 sm:py-28">
        <h1
          className="mx-auto max-w-3xl text-center text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
        >
          Eat smarter. Feel better. Stay in sync.
        </h1>
        <p
          className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-600"
        >
          NutriSync unifies your nutrition and mental wellness—backed by intelligent insights and a delightful experience.
        </p>
        <div
          className="mt-10 flex justify-center gap-3"
        >
          <Link href="/dashboard"><Button size="lg">Get Started</Button></Link>
          <a href="#features"><Button size="lg" variant="outline">See Features</Button></a>
        </div>
      </div>
      <FloatingShapes />
    </section>
  );
}
