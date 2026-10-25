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
import { Accent, Eyebrow } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stopIcons = [FileText, Smartphone, CloudOff, RefreshCw, BarChart3];
const stops = [10, 30, 50, 70, 90]; // % across the stage
const HOLD = 0.55; // share of each scene Beto stands still before walking on

export default function Story() {
  const section = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const walker = useRef<HTMLDivElement>(null);
  const bob = useRef<HTMLDivElement>(null);
  const railFill = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const sceneRef = useRef(0);
  const [scene, setScene] = useState(0);
  const current = scenes[scene];

  useGSAP(
    () => {
      const n = scenes.length;
      // One timeline unit per scene; scroll scrubs it, React only hears about scene changes.
      const tl = gsap.timeline({ defaults: { ease: "none" } });
      gsap.set(walker.current, { xPercent: stops[0] });
      gsap.set(railFill.current, { scaleX: 0 });
      for (let i = 0; i < n; i++) {
        const at = i;
        if (i < n - 1) {
          tl.to(walker.current, { xPercent: stops[i + 1], duration: 1 - HOLD, ease: "power1.inOut" }, at + HOLD);
          tl.to(railFill.current, { scaleX: (stops[i + 1] - stops[0]) / 80, duration: 1 - HOLD, ease: "power1.inOut" }, at + HOLD);
          tl.to(bob.current, { y: -8, duration: (1 - HOLD) / 4, repeat: 3, yoyo: true, ease: "sine.inOut" }, at + HOLD);
        } else {
          tl.to({}, { duration: 1 }, at);
        }
      }

      trigger.current = ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top+=16",
        end: "+=360%",
        pin: true,
        scrub: 0.9,
        animation: tl,
        onUpdate: (self) => {
          const s = Math.min(n - 1, Math.floor(self.progress * n));
          if (s !== sceneRef.current) {
            sceneRef.current = s;
            setScene(s);
          }
        },
      });
    },
    { scope: section },
  );

  const jumpTo = (i: number) => {
    const st = trigger.current;
    if (!st) return;
    const top = st.start + ((i + HOLD / 2) / scenes.length) * (st.end - st.start);
    const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(top, { duration: 1.2 });
    else window.scrollTo({ top, behavior: "smooth" });
  };

  const dark = scene === 2;

  return (
    <section id="story" ref={section} className="relative">
      <div ref={pinRef} className="bg-dark flex min-h-[calc(100svh-32px)] flex-col justify-center gap-6 rounded-[20px] px-4 py-10 sm:rounded-[28px] sm:px-8 lg:gap-8 lg:px-16 lg:py-14">
        <div className="flex items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <Eyebrow dot>A Beto POS film · Scene {scene + 1} of 5</Eyebrow>
            <h2 className="headline text-[40px] leading-[1.04] text-white sm:text-[56px] lg:text-[68px]">The story of <Accent>one bill.</Accent></h2>
          </div>
          <span className="hidden font-display text-[48px] font-light tracking-[-0.04em] text-[#55575D] tabular-nums sm:block lg:text-[64px]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={scene} className="inline-block" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }} transition={{ duration: 0.35 }}>
                {String(scene + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>{" "}
            / 05
          </span>
        </div>

        {/* Widescreen stage */}
        <div className="bg-stage relative aspect-square w-full overflow-hidden rounded-[18px] border border-[rgba(255,255,255,0.1)] sm:aspect-[1280/520]">
          <div className="absolute inset-x-0 top-0 z-20 h-[7%] bg-[#1F2023]" />
          <div className="absolute inset-x-0 bottom-0 z-20 h-[7%] bg-[#1F2023]" />

          <div className="absolute top-[11%] left-[3%] z-20 flex items-center gap-2.5 text-[10px] font-medium tracking-[0.12em] text-[#C4C6CB] sm:text-[12px]">
            <span className="border border-[rgba(255,255,255,0.25)] px-2 py-1 text-cream">SC. {current.id}</span>
            <AnimatePresence mode="wait">
              <motion.span key={current.slate} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="hidden sm:inline">
                {current.slate}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="absolute top-[11%] right-[3%] z-20 flex items-center gap-2 text-[10px] font-medium tracking-[0.12em] text-[#C4C6CB] sm:text-[12px]">
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
          <div ref={railFill} className="absolute top-[64%] left-[10%] h-1 w-[80%] origin-left -translate-y-px rounded-full bg-orange shadow-[0_0_14px_#EE8139] will-change-transform" />

          {stops.map((x, i) => {
            const Icon = stopIcons[i];
            const state = i < scene ? "past" : i === scene ? "now" : "future";
            return (
              <div key={i} className="absolute top-[58%] -translate-x-1/2" style={{ left: `${x}%`, width: "11%" }}>
                <motion.div
                  animate={{ y: state === "now" ? 10 : 0, opacity: state === "now" ? 0 : state === "future" ? 0.45 : 1, scale: state === "now" ? 0.8 : 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={clsx(
                    "absolute bottom-full left-1/2 mb-3 grid aspect-square w-[52%] -translate-x-1/2 place-items-center rounded-xl border",
                    state === "past" ? "border-orange/30 bg-[#4A3B32] text-glow" : "border-white/10 bg-charcoal-3 text-cream",
                  )}
                >
                  <Icon className="size-[42%]" />
                </motion.div>
                <div className={clsx("h-[clamp(14px,3.6vw,50px)] rounded-t-[12px] transition-colors duration-500", state === "now" ? "bg-orange" : "bg-charcoal-3", state === "future" && "opacity-50")} />
                <div className={clsx("h-[clamp(10px,2.2vw,30px)] rounded-b-[12px] transition-colors duration-500", state === "now" ? "bg-[#C2621F]" : "bg-[#2A2C30]", state === "future" && "opacity-50")} />
              </div>
            );
          })}

          {/* Beto travelling the rail: a full-width track whose xPercent equals % of the stage */}
          <div ref={walker} className="pointer-events-none absolute inset-x-0 top-[18%] z-[11] h-[42%] will-change-transform">
            <div ref={bob} className="absolute top-0 left-0 h-full -translate-x-1/2">
              <AnimatePresence mode="wait">
                <motion.div key={current.pose} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.22 }} className="relative aspect-[3/4] h-full">
                  <Image src={`/beto/beto-${current.pose}.png`} alt={`Beto ${current.pose}`} fill sizes="220px" className="object-contain object-bottom" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Subtitles */}
          <div className="absolute inset-x-0 bottom-[10%] z-20 flex flex-col items-center gap-1 px-4 text-center">
            <AnimatePresence mode="wait">
              <motion.div key={current.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35 }} className="flex flex-col items-center gap-1">
                <span className="bg-[rgba(31,32,35,0.8)] px-3 py-0.5 font-bangla text-[13px] font-medium text-glow sm:text-[20px]">{current.bn}</span>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="bg-[rgba(31,32,35,0.8)] px-3 py-0.5 text-[12px] font-medium text-cream sm:text-[16px]">
                  {current.en}
                </motion.span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Film strip */}
        <div className="rounded-md bg-[#1F2023] py-2.5">
          <div className="flex justify-between px-3">
            {Array.from({ length: 30 }).map((_, i) => (
              <span key={i} className={clsx("h-2 w-3 rounded-[2px] bg-charcoal-3", i > 14 && "max-sm:hidden")} />
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto px-2.5 py-2.5 [scrollbar-width:none]">
            {scenes.map((s, i) => (
              <motion.button
                key={s.id}
                onClick={() => jumpTo(i)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className={clsx(
                  "relative flex min-w-[190px] flex-1 flex-col gap-1.5 overflow-hidden rounded px-4 py-3.5 text-left transition-colors duration-300",
                  i === scene ? "bg-[#4A3B32]" : "bg-charcoal-2 hover:bg-charcoal-2",
                  i > scene && "opacity-60",
                )}
              >
                {i === scene && <motion.span layoutId="scene-frame" className="absolute inset-0 rounded border border-orange" transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
                <span className={clsx("relative text-[11px] font-medium tracking-[0.12em]", i === scene ? "text-glow" : "text-muted")}>
                  SC. {s.id} · {s.time}
                  {i === scene && " · NOW"}
                </span>
                <span className="relative font-display text-[17px] font-medium text-cream">{s.title}</span>
                <span className="relative hidden text-[13px] leading-[19px] text-muted md:block">{s.beat}</span>
              </motion.button>
            ))}
          </div>
          <div className="flex justify-between px-3">
            {Array.from({ length: 30 }).map((_, i) => (
              <span key={i} className={clsx("h-2 w-3 rounded-[2px] bg-charcoal-3", i > 14 && "max-sm:hidden")} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
