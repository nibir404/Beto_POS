"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronDown, ChevronUp, Hand, Power, Sparkles } from "lucide-react";
import clsx from "clsx";
import { channelGroups, channels } from "@/lib/content";
import { Accent, Eyebrow } from "@/components/ui";

// Where the glass sits in /beto/beto-tv-frame.png (1024×1024), in %.
const GLASS = { left: 26.2, top: 32.6, width: 46.2, height: 31.4 };

function Screen({ index }: { index: number }) {
  const c = channels[index];
  const s = c.screen;
  return (
    <div className="absolute inset-[9%_8%] flex flex-col gap-[3cqw] rounded-[4cqw] bg-[#E7E8EA] p-[4.5cqw] text-[#2A2C30] [filter:blur(0.35px)_saturate(0.8)_contrast(0.92)]">
      <div className="flex items-center justify-between">
        <span className="font-display text-[5cqw] font-medium">{s.title}</span>
        {c.ai && <Sparkles className="size-[5cqw] text-orange-dark" />}
      </div>
      <div className="flex items-end justify-between border-b border-[#D5D7DB] pb-[2.5cqw]">
        <span className="text-[3.4cqw] text-[#6B6D73]">{s.meta}</span>
        {s.big && <span className="font-display text-[9cqw] leading-none font-medium tracking-[-0.03em]">{s.big}</span>}
      </div>
      <div className="flex flex-col gap-[1.6cqw]">
        {s.rows.map(([k, v]) => (
          <div key={k} className="flex justify-between rounded-[1.8cqw] bg-[#FFFFFF] px-[3cqw] py-[1.8cqw] text-[3.6cqw]">
            <span>{k}</span>
            <span className="font-semibold">{v}</span>
          </div>
        ))}
      </div>
      {s.cta && <div className="mt-auto rounded-[1.8cqw] bg-[#EE8139] py-[2cqw] text-center text-[3.2cqw] font-semibold tracking-[0.06em] text-[#2A2C30]">{s.cta}</div>}
    </div>
  );
}

export default function BetoTV() {
  const [ch, setCh] = useState(9); // CH 10 · Split payments
  const [switching, setSwitching] = useState(false);
  const [osd, setOsd] = useState(true);
  const [touched, setTouched] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-30%" });
  const busy = useRef(false);

  const tune = useCallback((next: number, byUser = true) => {
    if (busy.current) return;
    busy.current = true;
    if (byUser) setTouched(true);
    setSwitching(true);
    setOsd(true);
    window.setTimeout(() => {
      setCh((next + channels.length) % channels.length);
      setSwitching(false);
      busy.current = false;
    }, 260);
  }, []);

  // The on-screen channel number fades out after a moment, like a real TV.
  useEffect(() => {
    const id = window.setTimeout(() => setOsd(false), 1800);
    return () => window.clearTimeout(id);
  }, [ch]);

  // Keep the active chip in view in the channel strip.
  useEffect(() => {
    strip.current?.querySelector<HTMLElement>(`[data-ch="${ch}"]`)?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [ch]);

  // Auto-surf until the visitor takes the remote.
  useEffect(() => {
    if (!inView || touched) return;
    const id = window.setInterval(() => tune(ch + 1, false), 6000);
    return () => window.clearInterval(id);
  }, [inView, touched, ch, tune]);

  useEffect(() => {
    if (!inView) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowUp") tune(ch + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") tune(ch - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView, ch, tune]);

  const c = channels[ch];

  return (
    <section id="features" ref={ref} className="bg-dark rounded-[20px] px-4 py-16 sm:rounded-[28px] sm:px-8 lg:px-16 lg:py-24">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-3">
          <Eyebrow dot>Now showing on Beto POS TV</Eyebrow>
          <h2 className="headline text-[40px] leading-[1.04] text-white sm:text-[56px] lg:text-[68px]">Every feature, <Accent>on one screen.</Accent></h2>
        </div>
        <p className="max-w-[320px] text-[16px] leading-6 text-[#C4C6CB]">21 channels, one for each job in the film. Swipe the screen or use the remote to change the channel.</p>
      </div>

      <div className="mt-12 flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-14">
        <div className="mx-auto w-full max-w-[580px] shrink-0 lg:mx-0 lg:w-[47%]">
          {/* The TV is Beto's face: the screen sits behind the bezel cut-out. */}
          <div className="relative aspect-[1/0.84] overflow-hidden">
            <div className="absolute inset-[16%_14%_26%] rounded-full bg-orange/20 blur-[70px]" />
            <div className="absolute inset-x-0 top-0 aspect-square origin-[50%_45%] scale-[1.3]">
              <motion.div
                className="@container absolute cursor-grab overflow-hidden rounded-[13%] bg-[#232428] active:cursor-grabbing"
                style={{ left: `${GLASS.left}%`, top: `${GLASS.top}%`, width: `${GLASS.width}%`, height: `${GLASS.height}%` }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -40) tune(ch + 1);
                  else if (info.offset.x > 40) tune(ch - 1);
                }}
              >
                <div className="absolute inset-0 animate-crt-jitter">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={ch}
                      initial={{ opacity: 0, scaleY: 0.01, scaleX: 1.3, filter: "brightness(3)" }}
                      animate={{ opacity: 1, scaleY: 1, scaleX: 1, filter: "brightness(1)" }}
                      exit={{ opacity: 0, scaleY: 0.01, scaleX: 1.2, filter: "brightness(3)" }}
                      transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
                      className="absolute inset-0"
                    >
                      <Screen index={ch} />
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* CRT layers */}
                <div className="pointer-events-none absolute inset-0 bg-[rgba(238,129,57,0.14)] mix-blend-multiply" />
                <Image src="/beto/crt-scan.png" alt="" fill className="pointer-events-none opacity-60" />
                <Image src="/beto/crt-noise.png" alt="" fill className={clsx("pointer-events-none transition-opacity duration-150", switching ? "opacity-100" : "opacity-60")} />
                <AnimatePresence>
                  {switching && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.85 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      className="pointer-events-none absolute inset-0 bg-[#D5D7DB] bg-[url(/beto/crt-noise.png)] bg-[length:45%] mix-blend-screen"
                    />
                  )}
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[9%] bg-[rgba(255,255,255,0.07)] animate-crt-roll" />
                <Image src="/beto/crt-vignette.png" alt="" fill className="pointer-events-none" />
                <div className="pointer-events-none absolute inset-0 rounded-[13%] shadow-[inset_0_0_26px_10px_rgba(0,0,0,0.9),inset_0_0_60px_rgba(238,129,57,0.22)]" />
                <div className="pointer-events-none absolute -top-[35%] -left-[12%] h-[70%] w-[62%] rotate-[-16deg] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.12),transparent)]" />

                <AnimatePresence>
                  {osd && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.5 } }}
                      className="pointer-events-none absolute top-[10%] right-[9%] flex flex-col items-end leading-none text-[#FFFFFF] [text-shadow:0_0_6px_rgba(238,129,57,0.9),2px_0_rgba(238,129,57,0.5)]"
                    >
                      <span className="font-display text-[11cqw] font-bold tabular-nums">{c.n}</span>
                      <span className="text-[2.8cqw] font-bold tracking-[0.14em] uppercase">{c.ai ? "AI" : c.group.split(" ")[0]}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <Image src="/beto/beto-tv-frame.png" alt="Beto, whose face is a TV screen" fill priority={false} sizes="(min-width:1024px) 60vw, 100vw" className="pointer-events-none object-contain" />
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-b from-transparent to-ink" />
          </div>

          {/* Remote */}
          <div className="relative mx-auto -mt-[3%] flex w-full max-w-[420px] flex-col gap-3 rounded-[22px] border border-[rgba(255,255,255,0.12)] bg-[#232428] p-3">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-[#2A2C30] text-[#e5372b]" aria-hidden>
                <Power size={16} />
              </span>
              <div className="flex flex-1 flex-col leading-tight">
                <span className="text-[11px] font-medium tracking-[0.12em] text-muted tabular-nums">CH {String(c.n).padStart(2, "0")} / 21</span>
                <AnimatePresence mode="wait">
                  <motion.span key={c.n} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="truncate text-[14px] font-medium text-cream">
                    {c.name}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="flex flex-col gap-1">
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => tune(ch + 1)} aria-label="Channel up" className="grid h-8 w-12 place-items-center rounded-t-xl rounded-b-md bg-orange text-ink">
                  <ChevronUp size={18} />
                </motion.button>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => tune(ch - 1)} aria-label="Channel down" className="grid h-8 w-12 place-items-center rounded-t-md rounded-b-xl bg-charcoal-3 text-cream">
                  <ChevronDown size={18} />
                </motion.button>
              </div>
            </div>
            <div ref={strip} className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
              {channels.map((x, i) => (
                <button
                  key={x.n}
                  data-ch={i}
                  onClick={() => i !== ch && tune(i)}
                  aria-label={`Channel ${x.n}: ${x.name}`}
                  className={clsx(
                    "relative grid h-9 min-w-9 shrink-0 place-items-center rounded-lg text-[12px] font-semibold tabular-nums transition-colors",
                    i === ch ? "text-ink" : "bg-charcoal-2 text-[#A3A5AB] hover:text-cream",
                  )}
                >
                  {i === ch && <motion.span layoutId="ch-chip" className="absolute inset-0 rounded-lg bg-orange" transition={{ type: "spring", stiffness: 500, damping: 36 }} />}
                  <span className="relative">{String(x.n).padStart(2, "0")}</span>
                </button>
              ))}
            </div>
            <span className="flex items-center justify-center gap-1.5 text-[11px] text-muted"><Hand size={12} /> Swipe the screen · ← → keys</span>
          </div>
        </div>

        {/* Channel guide */}
        <div className="grid flex-1 grid-cols-1 gap-x-7 gap-y-6 sm:grid-cols-2">
          {channelGroups.map((g) => (
            <div key={g} className="flex flex-col">
              <span className="eyebrow border-b border-[rgba(255,255,255,0.12)] pb-2 text-[11px] text-muted">{g}</span>
              {channels
                .filter((x) => x.group === g)
                .map((x) => {
                  const active = x.n === c.n;
                  return (
                    <button
                      key={x.n}
                      onClick={() => !active && tune(x.n - 1)}
                      className={clsx("relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-left text-[15px] transition-colors", active ? "text-ink" : "text-cream hover:bg-white/5")}
                    >
                      {active && <motion.span layoutId="onair" className="absolute inset-0 rounded-lg bg-orange" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                      <span className={clsx("relative w-6 shrink-0 tabular-nums", active ? "font-semibold" : "text-[#5E6066]")}>{String(x.n).padStart(2, "0")}</span>
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
