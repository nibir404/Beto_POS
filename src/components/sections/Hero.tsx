"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarCheck, Play } from "lucide-react";
import Nav from "./Nav";
import Console from "./Console";
import { Button } from "@/components/ui";

const Beto3D = dynamic(() => import("@/components/three/Beto3D"), {
  ssr: false,
  loading: () => (
    <Image src="/beto/beto-sitting.png" alt="" width={280} height={380} className="mx-auto mt-[60px] h-auto w-[62%]" priority />
  ),
});

const lines = [
  { text: "Every counter. Every store.", cream: false },
  { text: "One set of numbers.", cream: false },
  { text: "Beto keeps count.", cream: true },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const consoleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const betoY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="top" ref={ref} className="tex-weave-dark relative overflow-hidden rounded-[20px] px-4 pt-6 sm:rounded-[28px] sm:px-8 sm:pt-7 lg:px-16">
      <Nav />

      <div className="relative z-10 flex flex-col items-start gap-8 pt-14 sm:pt-16">
        <h1 className="poster text-[40px] leading-[1.22] sm:text-[60px] lg:text-[76px]">
          {lines.map((l, i) => (
            <span key={l.text} className="block overflow-hidden pb-1">
              <motion.span
                className={l.cream ? "poster-cream block" : "block"}
                initial={{ y: "110%", rotate: 2 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ duration: 1, delay: 0.15 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              >
                {l.text}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="flex flex-wrap gap-2.5"
        >
          <Button icon={<CalendarCheck size={16} />}>Book a demo</Button>
          <Button variant="ghost" href="#story" icon={<Play size={14} fill="currentColor" />}>
            Watch the film
          </Button>
        </motion.div>
      </div>

      {/* The product stage: Beto sits on the Retail Console. */}
      <div className="relative mt-[170px] sm:mt-[200px] lg:mt-24">
        <motion.div
          style={{ y: betoY }}
          className="absolute right-[2%] bottom-full z-20 h-[276px] w-[240px] translate-y-[81px] sm:h-[300px] sm:w-[260px] sm:translate-y-[88px] lg:right-[3%] lg:h-[600px] lg:w-[520px] lg:translate-y-[176px]"
        >
          <Beto3D className="h-full w-full cursor-grab" />
        </motion.div>
        <motion.div
          style={{ y: consoleY }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 h-[440px] sm:h-[560px] lg:h-[620px]"
        >
          <Console />
        </motion.div>
      </div>
    </section>
  );
}
