"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import clsx from "clsx";
import { channelGroups, channels } from "@/lib/content";
import { Eyebrow } from "@/components/ui";

function Screen({ index }: { index: number }) {
  const c = channels[index];
  const s = c.screen;
  return (
    <div className="absolute inset-[4%_3.5%] flex flex-col gap-[3cqw] rounded-[3cqw] bg-[#efe4cf] p-[4.5cqw] text-[#1a120c] [filter:blur(0.3px)_saturate(0.85)]">
      <div className="flex items-center justify-between">
        <span className="font-display text-[5cqw] font-medium">{s.title}</span>
        {c.ai && <Sparkles className="size-[5cqw] text-orange-dark" />}
      </div>
      <div className="flex items-end justify-between border-b border-[#d8cbb2] pb-[2.5cqw]">
        <span className="text-[3.4cqw] text-[#7a6e60]">{s.meta}</span>
        {s.big && <span className="font-display text-[9cqw] leading-none font-medium tracking-[-0.03em]">{s.big}</span>}
      </div>
      <div className="flex flex-col gap-[1.6cqw]">
        {s.rows.map(([k, v]) => (
          <div key={k} className="flex justify-between rounded-[1.8cqw] bg-white px-[3cqw] py-[1.8cqw] text-[3.6cqw]">
            <span>{k}</span>
            <span className="font-semibold">{v}</span>
          </div>
        ))}
      </div>
      {s.cta && <div className="mt-auto rounded-[1.8cqw] bg-orange py-[2cqw] text-center text-[3.2cqw] font-semibold tracking-[0.06em]">{s.cta}</div>}
    </div>
  );
}

export default function BetoTV() {
  const [ch, setCh] = useState(9); // CH 10 · Split payments
  const [switching, setSwitching] = useState(false);
  const [touched, setTouched] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-30%" });

  const tune = useCallback((next: number, byUser = true) => {
    if (byUser) setTouched(true);
    setSwitching(true);
    window.setTimeout(() => {
      setCh((next + channels.length) % channels.length);
      setSwitching(false);
    }, 280);
  }, []);

  // Auto-surf until the visitor takes the remote.
  useEffect(() => {
    if (!inView || touched) return;
    const id = window.setInterval(() => tune(ch + 1, false), 6000);
    return () => window.clearInterval(id);
  }, [inView, touched, ch, tune]);

  useEffect(() => {
    if (!inView) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") tune(ch + 1);
      if (e.key === "ArrowLeft") tune(ch - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView, ch, tune]);

  const c = channels[ch];

  return (
    <section id="features" ref={ref} className="tex-weave-dark rounded-[20px] px-4 py-16 sm:rounded-[28px] sm:px-8 lg:px-16 lg:py-24">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-3">
          <Eyebrow dot>Now showing on Beto TV</Eyebrow>
          <h2 className="poster text-[38px] leading-[1.25] sm:text-[56px] lg:text-[72px]">Every feature, on one screen.</h2>
        </div>
        <p className="max-w-[320px] text-[16px] leading-6 text-[#bdb3a6]">21 channels, one for each job in the film. Flip through them like a TV.</p>
      </div>

      <div className="mt-12 flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-14">
        {/* The TV is Beto's face */}
        <div className="mx-auto w-full max-w-[560px] shrink-0 lg:mx-0 lg:w-[46%]">
          <div className="relative aspect-[1/0.86] overflow-hidden">
            <div className="absolute inset-[18%_12%] rounded-full bg-orange/15 blur-[60px]" />
            <div className="absolute inset-x-0 top-0 aspect-square origin-[50%_42%] scale-[1.32]">
            <Image src="/beto/beto-tv.png" alt="Beto with his TV screen face" fill sizes="(min-width:1024px) 60vw, 100vw" className="object-contain" />

            <div className="@container absolute top-[33.7%] left-[27.8%] h-[28.3%] w-[43%] overflow-hidden rounded-[10%] bg-[#1e150d] animate-crt-jitter">
              <AnimatePresence mode="wait">
                <motion.div key={ch} initial={{ opacity: 0, scaleY: 0.02 }} animate={{ opacity: 1, scaleY: 1 }} exit={{ opacity: 0, scaleY: 0.02 }} transition={{ duration: 0.18 }} className="absolute inset-0">
                  <Screen index={ch} />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-[rgba(255,128,40,0.16)]" />
              <Image src="/beto/crt-scan.png" alt="" fill className="opacity-55" />
              <Image src="/beto/crt-noise.png" alt="" fill className={clsx("transition-opacity", switching ? "opacity-100" : "opacity-80")} />
              {switching && <div className="absolute inset-0 bg-[#d8d0c4] mix-blend-screen" style={{ backgroundImage: "url(/beto/crt-noise.png)", backgroundSize: "60%" }} />}
              <div className="absolute inset-x-0 top-0 h-[8%] bg-[rgba(255,236,210,0.08)] animate-crt-roll" />
              <Image src="/beto/crt-vignette.png" alt="" fill />
              <div className="absolute top-[6%] right-[6%] flex flex-col items-end leading-none text-[#9cff8a] [text-shadow:0_0_6px_rgba(156,255,138,0.8),2px_0_rgba(229,55,43,0.5)]">
                <span className="font-display text-[8cqw] font-bold">{c.n}</span>
                <span className="text-[2.6cqw] font-bold tracking-[0.14em] uppercase">{c.ai ? "AI" : c.group.split(" ")[0]}</span>
              </div>
              <div className="absolute -top-[30%] -left-[10%] h-[60%] w-[60%] rotate-[-16deg] rounded-full bg-[rgba(255,248,240,0.07)]" />
              <div className="absolute inset-0 rounded-[10%] shadow-[inset_0_0_18px_rgba(0,0,0,0.85),inset_0_0_50px_rgba(255,122,26,0.18)]" />
            </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-b from-transparent to-tobacco" />
          </div>

          <div className="relative mx-auto -mt-[2%] flex w-[70%] max-w-[340px] items-center justify-between rounded-full border border-[rgba(255,236,210,0.14)] bg-[#0e0b08] p-2.5">
            <button onClick={() => tune(ch - 1)} aria-label="Previous channel" className="grid size-10 place-items-center rounded-full bg-tobacco-3 text-cream transition hover:bg-[#3a3027]">
              <ChevronLeft size={18} />
            </button>
            <span className="text-[12px] font-medium tracking-[0.12em] text-[#bdb3a6] tabular-nums">CH {String(c.n).padStart(2, "0")} / 21</span>
            <button onClick={() => tune(ch + 1)} aria-label="Next channel" className="grid size-10 place-items-center rounded-full bg-orange text-ink transition hover:bg-[#ff8d3a]">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Channel guide */}
        <div className="grid flex-1 grid-cols-1 gap-x-7 gap-y-6 sm:grid-cols-2">
          {channelGroups.map((g) => (
            <div key={g} className="flex flex-col">
              <span className="eyebrow border-b border-[rgba(255,236,210,0.12)] pb-2 text-[11px] text-muted">{g}</span>
              {channels
                .filter((x) => x.group === g)
                .map((x) => {
                  const active = x.n === c.n;
                  return (
                    <button
                      key={x.n}
                      onClick={() => tune(x.n - 1)}
                      className={clsx(
                        "relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-left text-[15px] transition-colors",
                        active ? "text-ink" : "text-cream hover:bg-white/5",
                      )}
                    >
                      {active && <motion.span layoutId="onair" className="absolute inset-0 rounded-lg bg-orange" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                      <span className={clsx("relative w-6 shrink-0 tabular-nums", active ? "font-semibold" : "text-[#6b6157]")}>{String(x.n).padStart(2, "0")}</span>
                      <span className={clsx("relative flex-1", active && "font-semibold")}>{x.name}</span>
                      {x.ai && !active && <Sparkles size={14} className="relative text-glow" />}
                      {active && <span className="relative text-[10px] font-semibold tracking-[0.1em]">● ON AIR</span>}
                    </button>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
