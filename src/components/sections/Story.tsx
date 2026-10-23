"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BarChart3, CloudOff, FileText, RefreshCw, Smartphone } from "lucide-react";
import clsx from "clsx";
import { scenes } from "@/lib/content";
import { Eyebrow } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stopIcons = [FileText, Smartphone, CloudOff, RefreshCw, BarChart3];
const stops = [10, 30, 50, 70, 90]; // % across the stage

export default function Story() {
  const section = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [progress, setProgress] = useState(0);
  const scene = Math.min(scenes.length - 1, Math.floor(progress * scenes.length));
  const current = scenes[scene];

  useGSAP(
    () => {
      trigger.current = ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top+=16",
        end: "+=320%",
        pin: true,
        scrub: true,
        onUpdate: (self) => setProgress(self.progress),
      });
    },
    { scope: section },
  );

  const jumpTo = (i: number) => {
    const st = trigger.current;
    if (!st) return;
    window.scrollTo({ top: st.start + ((i + 0.5) / scenes.length) * (st.end - st.start), behavior: "smooth" });
  };

  // Beto walks the rail, then holds at each stop for a beat.
  const local = progress * scenes.length - scene;
  const eased = Math.min(1, Math.max(0, (local - 0.55) / 0.45));
  const next = Math.min(scene + 1, scenes.length - 1);
  const betoX = stops[scene] + (stops[next] - stops[scene]) * eased;
  const dark = scene === 2;

  return (
    <section id="story" ref={section} className="relative">
      <div ref={pinRef} className="tex-weave-dark flex min-h-[calc(100svh-32px)] flex-col justify-center gap-6 rounded-[20px] px-4 py-10 sm:rounded-[28px] sm:px-8 lg:gap-8 lg:px-16 lg:py-14">
        <div className="flex items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <Eyebrow dot>A Beto film · Scene {scene + 1} of 5</Eyebrow>
            <h2 className="poster text-[38px] leading-[1.25] sm:text-[56px] lg:text-[72px]">The story of one bill.</h2>
          </div>
          <span className="hidden font-display text-[48px] font-light tracking-[-0.04em] text-[#4a4038] sm:block lg:text-[64px]">
            {String(scene + 1).padStart(2, "0")} / 05
          </span>
        </div>

        {/* Widescreen stage */}
        <div className="tex-dots-dark relative aspect-square w-full overflow-hidden rounded-[18px] border border-[rgba(255,236,210,0.1)] sm:aspect-[1280/520]">
          <div className="absolute inset-x-0 top-0 z-20 h-[7%] bg-[#060504]" />
          <div className="absolute inset-x-0 bottom-0 z-20 h-[7%] bg-[#060504]" />

          <div className="absolute top-[11%] left-[3%] z-20 flex items-center gap-2.5 text-[10px] font-medium tracking-[0.12em] text-[#bdb3a6] sm:text-[12px]">
            <span className="border border-[rgba(255,236,210,0.25)] px-2 py-1 text-cream">SC. {current.id}</span>
            <AnimatePresence mode="wait">
              <motion.span key={current.slate} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="hidden sm:inline">
                {current.slate}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="absolute top-[11%] right-[3%] z-20 flex items-center gap-2 text-[10px] font-medium tracking-[0.12em] text-[#bdb3a6] sm:text-[12px]">
            <span className="size-2 rounded-full bg-[#e5372b] animate-blink-dot" /> LIVE
          </div>

          {/* Power-cut darkness */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 bg-black"
            animate={{ opacity: dark ? [0.55, 0.2, 0.6, 0.45, 0.55] : 0 }}
            transition={dark ? { duration: 1.6, repeat: Infinity } : { duration: 0.4 }}
          />

          {/* Rail */}
          <div className="absolute top-[64%] left-[10%] h-0.5 w-[80%] bg-white/10" />
          <div className="absolute top-[64%] left-[10%] h-1 -translate-y-px rounded-full bg-orange shadow-[0_0_14px_#ff7a1a]" style={{ width: `${betoX - 10}%` }} />

          {stops.map((x, i) => {
            const Icon = stopIcons[i];
            const state = i < scene ? "past" : i === scene ? "now" : "future";
            return (
              <div key={i} className="absolute top-[58%] -translate-x-1/2" style={{ left: `${x}%`, width: "11%" }}>
                <motion.div
                  animate={{ y: state === "now" ? -6 : 0, opacity: state === "future" ? 0.45 : 1 }}
                  className={clsx(
                    "absolute bottom-full left-1/2 mb-3 grid aspect-square w-[52%] -translate-x-1/2 place-items-center rounded-xl border",
                    state === "now" ? "border-orange/60 bg-[#2a1a0e] text-glow" : "border-white/10 bg-tobacco-3 text-cream",
                  )}
                >
                  <Icon className="size-[42%]" />
                </motion.div>
                <div className={clsx("h-[clamp(14px,3.6vw,50px)] rounded-t-[12px]", state === "now" ? "bg-orange" : "bg-tobacco-3", state === "future" && "opacity-50")} />
                <div className={clsx("h-[clamp(10px,2.2vw,30px)] rounded-b-[12px]", state === "now" ? "bg-[#b84e08]" : "bg-[#1c1612]", state === "future" && "opacity-50")} />
              </div>
            );
          })}

          {/* Beto travelling the rail */}
          <div className="absolute top-[18%] z-[11] h-[42%] -translate-x-1/2 transition-[left] duration-100 ease-linear" style={{ left: `${betoX}%` }}>
            <AnimatePresence mode="wait">
              <motion.div key={current.pose} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.25 }} className="relative h-full aspect-[3/4]">
                <Image src={`/beto/beto-${current.pose}.png`} alt={`Beto ${current.pose}`} fill sizes="200px" className="object-contain object-bottom" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Subtitles */}
          <div className="absolute inset-x-0 bottom-[10%] z-20 flex flex-col items-center gap-1 px-4 text-center">
            <AnimatePresence mode="wait">
              <motion.div key={current.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="flex flex-col items-center gap-1">
                <span className="bg-[rgba(6,5,4,0.75)] px-3 py-0.5 font-bangla text-[13px] font-medium text-mustard sm:text-[20px]">{current.bn}</span>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="bg-[rgba(6,5,4,0.75)] px-3 py-0.5 text-[12px] font-medium text-cream sm:text-[16px]">
                  {current.en}
                </motion.span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Film strip */}
        <div className="rounded-md bg-[#060504] py-2.5">
          <div className="flex justify-between px-3">
            {Array.from({ length: 30 }).map((_, i) => (
              <span key={i} className={clsx("h-2 w-3 rounded-[2px] bg-tobacco-3", i > 14 && "max-sm:hidden")} />
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto px-2.5 py-2.5 [scrollbar-width:none]">
            {scenes.map((s, i) => (
              <button
                key={s.id}
                onClick={() => jumpTo(i)}
                className={clsx(
                  "flex min-w-[190px] flex-1 flex-col gap-1.5 rounded px-4 py-3.5 text-left transition-colors",
                  i === scene ? "border border-orange bg-[#2a1a0e]" : "border border-transparent bg-tobacco hover:bg-tobacco-2",
                  i > scene && "opacity-60",
                )}
              >
                <span className={clsx("text-[11px] font-medium tracking-[0.12em]", i === scene ? "text-glow" : "text-muted")}>
                  SC. {s.id} · {s.time}
                  {i === scene && " · NOW"}
                </span>
                <span className="font-display text-[17px] font-medium text-cream">{s.title}</span>
                <span className="hidden text-[13px] leading-[19px] text-muted md:block">{s.beat}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-between px-3">
            {Array.from({ length: 30 }).map((_, i) => (
              <span key={i} className={clsx("h-2 w-3 rounded-[2px] bg-tobacco-3", i > 14 && "max-sm:hidden")} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
