"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUp, BrainCircuit, Languages, LineChart, Sparkles } from "lucide-react";
import clsx from "clsx";
import { aiQA } from "@/lib/content";
import { Accent, Eyebrow } from "@/components/ui";

function useTyped(text: string, run: boolean, speed = 18) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!run) return;
    setOut("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, run, speed]);
  return out;
}

const powers = [
  { icon: LineChart, title: "Forecasts tomorrow's demand", sub: "Per store, from today's sales and orders" },
  { icon: BrainCircuit, title: "Explains what changed", sub: "Cash gaps, slow stores, odd discounts" },
  { icon: Languages, title: "Speaks Bangla and English", sub: "At the counter and at head office" },
];

export default function BetoAI() {
  const [q, setQ] = useState(0);
  const [phase, setPhase] = useState<"thinking" | "answer">("thinking");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const qa = aiQA[q];
  const typed = useTyped(qa.a, inView && phase === "answer");

  useEffect(() => {
    if (!inView) return;
    setPhase("thinking");
    const id = window.setTimeout(() => setPhase("answer"), 1100);
    return () => window.clearTimeout(id);
  }, [q, inView]);

  return (
    <section id="ai" ref={ref} className="bg-dark relative overflow-hidden rounded-[20px] px-4 py-20 sm:rounded-[28px] sm:px-8 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute top-1/2 right-[18%] size-[520px] -translate-y-1/2 rounded-full bg-orange/10 blur-[120px]" />
      <div className="relative flex flex-col gap-14 lg:flex-row lg:items-center lg:gap-20">
        <div className="flex flex-col gap-6 lg:w-[46%]">
          <Eyebrow>05 — Beto POS AI</Eyebrow>
          <h2 className="headline text-[40px] leading-[1.04] text-white sm:text-[56px] lg:text-[68px]">Ask your chain <Accent>anything.</Accent></h2>
          <p className="max-w-[440px] text-[17px] leading-7 text-[#C4C6CB]">Beto POS AI reads every store&apos;s live sales, stock and settlements. Head office and franchise owners get answers, not spreadsheets.</p>

          <div className="flex flex-col gap-2 pt-2">
            {aiQA.map((x, i) => (
              <button
                key={x.q}
                onClick={() => setQ(i)}
                className={clsx(
                  "flex items-center gap-3 self-start rounded-full border px-4 py-3 text-left text-[15px] font-medium transition-colors",
                  i === q ? "border-orange bg-orange text-ink" : "border-[rgba(255,255,255,0.18)] text-cream hover:border-glow",
                )}
              >
                <Sparkles size={15} /> {x.q}
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
            {powers.map((p) => (
              <div key={p.title} className="flex flex-col gap-2">
                <p.icon size={20} className="text-glow" />
                <span className="font-display text-[16px] font-medium text-white">{p.title}</span>
                <span className="text-[13px] leading-5 text-muted">{p.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="relative flex-1">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative flex min-h-[460px] flex-col gap-3.5 rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[#2F3135] p-5 sm:p-8">
            <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
              <span className="relative grid size-9 place-items-center overflow-hidden rounded-full bg-[#F5F6F7]">
                <Image src="/beto/beto-thinking.png" alt="" width={36} height={80} className="mt-6 scale-[1.6]" />
              </span>
              <span className="flex flex-col">
                <span className="text-[14px] font-semibold text-white">Beto POS AI</span>
                <span className="flex items-center gap-1.5 text-[12px] text-muted"><span className="size-1.5 rounded-full bg-ok" /> Reading 27 stores live</span>
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={q} className="flex flex-col gap-3.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-[85%] self-end rounded-[18px_18px_4px_18px] bg-orange px-4.5 py-3.5 text-[15px] leading-6 text-ink">
                  {qa.q}
                </motion.div>
                <div className="max-w-[92%] rounded-[18px_18px_18px_4px] bg-cream px-4.5 py-4 text-[15px] leading-6 text-ink">
                  {phase === "thinking" ? (
                    <span className="flex items-center gap-1.5 py-1">
                      {[0, 1, 2].map((d) => (
                        <motion.span key={d} className="size-2 rounded-full bg-orange-dark" animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }} transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }} />
                      ))}
                    </span>
                  ) : (
                    <>
                      {typed}
                      {typed.length < qa.a.length && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-blink-dot bg-ink" />}
                      {qa.chart && typed.length === qa.a.length && (
                        <div className="mt-3 flex h-14 items-end gap-1.5">
                          {qa.chart.map((h, i) => (
                            <motion.span key={i} initial={{ height: 0 }} animate={{ height: h }} transition={{ delay: i * 0.06 }} className={clsx("w-7 rounded", i === qa.chart!.length - 1 ? "bg-orange" : "bg-sand")} />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-auto flex items-center gap-2 rounded-full border border-white/10 bg-[#3A3C41] py-2 pr-2 pl-4 text-[14px] text-muted">
              <span className="flex-1 truncate">Ask in Bangla or English…</span>
              <span className="grid size-9 place-items-center rounded-full bg-orange text-ink"><ArrowUp size={16} /></span>
            </div>
          </motion.div>

          {/* Beto thinks while he answers */}
          <div className="pointer-events-none absolute -bottom-8 -left-14 hidden h-[230px] w-[110px] sm:block">
            <AnimatePresence mode="wait">
              <motion.div key={phase} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative h-full w-full">
                <Image src={phase === "thinking" ? "/beto/beto-thinking.png" : "/beto/beto-pointing.png"} alt="" fill sizes="110px" className="object-contain object-bottom" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
