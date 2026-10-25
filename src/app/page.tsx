import Hero from "@/components/sections/Hero";
import System from "@/components/sections/System";
import Story from "@/components/sections/Story";
import BetoTV from "@/components/sections/BetoTV";
import OneDay from "@/components/sections/OneDay";
import Counter from "@/components/sections/Counter";
import KeptInOrder from "@/components/sections/KeptInOrder";
import Features from "@/components/sections/Features";
import BetoAI from "@/components/sections/BetoAI";
import { CTA, FAQ, Rollout } from "@/components/sections/Closing";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 p-2 sm:p-4">
      <Hero />
      <System />
      <Story />
      <BetoTV />
      <OneDay />
      <Counter />
      <KeptInOrder />
      <Features />
      <BetoAI />
      <Rollout />
      <FAQ />
      <CTA />
    </main>
  );
}
