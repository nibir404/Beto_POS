"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, Mail, Minus, Plus, PlayCircle, Share2 } from "lucide-react";
import clsx from "clsx";
import { faqs, rollout } from "@/lib/content";
import { Eyebrow, Logo, Reveal, SectionTitle } from "@/components/ui";

export function Rollout() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] });
  const width = useTransform(scrollYProgress, [0, 1], ["4%", "100%"]);
  return (
    <section className="px-4 py-24 sm:px-8 lg:px-16 lg:py-32">
      <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-4">
          <Eyebrow>05 — Rollout</Eyebrow>
          <SectionTitle className="max-w-[640px]">One store this month. Every store next.</SectionTitle>
        </div>
        <p className="max-w-[320px] text-[16px] leading-6 text-body">We start where it&apos;s hardest, then copy it to the rest of the chain.</p>
      </Reveal>
      <div ref={ref} className="mt-14">
        <div className="h-1 rounded-full bg-line">
          <motion.div style={{ width }} className="h-full rounded-full bg-orange" />
        </div>
        <div className="grid grid-cols-1 gap-8 pt-7 sm:grid-cols-2 lg:grid-cols-4">
          {rollout.map((r, i) => (
            <Reveal key={r.week} delay={i * 0.1} className="flex flex-col gap-3">
              <span className={clsx("eyebrow", i ? "text-muted" : "text-orange-dark")}>{r.week}</span>
              <span className="font-display text-[26px] font-medium tracking-[-0.02em]">{r.title}</span>
              <span className="text-[15px] leading-[23px] text-body">{r.body}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="flex flex-col gap-10 px-4 pb-24 sm:px-8 lg:flex-row lg:gap-20 lg:px-16 lg:pb-32">
      <Reveal className="flex flex-col gap-4 lg:w-[400px] lg:shrink-0">
        <Eyebrow>06 — Questions</Eyebrow>
        <SectionTitle className="!text-[40px] sm:!text-[56px]">What chains ask us first.</SectionTitle>
      </Reveal>
      <div className="flex-1 border-t border-ink">
        {faqs.map((f, i) => (
          <div key={f.q} className="border-b border-line">
            <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-6 py-6 text-left">
              <span className="font-display text-[19px] font-medium tracking-[-0.015em] sm:text-[22px]">{f.q}</span>
              <span className={clsx("grid size-8 shrink-0 place-items-center rounded-full transition-colors", open === i ? "bg-orange text-ink" : "bg-kraft")}>
                {open === i ? <Minus size={15} /> : <Plus size={15} />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <p className="max-w-[640px] pb-6 text-[16px] leading-[25px] text-body">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CTA() {
  const [sent, setSent] = useState(false);
  const [value, setValue] = useState("");
  return (
    <section id="demo" className="tex-weave-dark flex flex-col gap-24 rounded-[20px] px-4 pt-20 pb-10 sm:rounded-[28px] sm:px-8 lg:gap-32 lg:px-16 lg:pt-28">
      <div className="flex flex-col items-center gap-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30, rotate: -6 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 120 }} className="relative h-[170px] w-[122px] sm:h-[210px] sm:w-[150px]">
          <Image src="/beto/beto-waving.png" alt="Beto waving" fill sizes="150px" className="object-contain" />
        </motion.div>
        <Reveal>
          <h2 className="poster font-bangla text-[52px] leading-[1.35] sm:text-[88px] lg:text-[120px]" style={{ fontFamily: "var(--font-galada)" }}>
            সব দোকান, এক হিসাব
          </h2>
        </Reveal>
        <p className="max-w-[480px] text-[18px] leading-7 text-[#c9c9ce]">See Beto POS running in a showroom and a franchise, then we&apos;ll set up a pilot in your stores.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (value.trim()) setSent(true);
          }}
          className="flex w-full max-w-[480px] items-center gap-2 rounded-full border border-white/20 bg-white/5 py-1.5 pr-1.5 pl-5"
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.span key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-1 items-center gap-2 py-3 text-left text-[15px] text-cream">
                <Check size={18} className="text-ok" /> Booked. The Beto POS team will call you within a day.
              </motion.span>
            ) : (
              <motion.input key="in" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Work email or phone" aria-label="Work email or phone" className="min-w-0 flex-1 bg-transparent py-3 text-[15px] text-white placeholder:text-[#a59a8c] focus:outline-none" />
            )}
          </AnimatePresence>
          {!sent && (
            <button type="submit" className="flex items-center gap-2 rounded-full bg-orange px-5 py-3.5 text-[12px] font-semibold tracking-[0.08em] whitespace-nowrap text-ink uppercase">
              Book a demo <ArrowRight size={15} />
            </button>
          )}
        </form>
      </div>
      <footer className="flex flex-col justify-between gap-8 border-t border-white/10 pt-8 lg:flex-row lg:items-end">
        <Logo className="origin-left scale-[2.6] pb-2 sm:scale-[3.2]" />
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-[12px] font-medium tracking-[0.08em] text-[#a8a8ae] uppercase">
          <span>Betopia Limited</span>
          <a href="#story" className="flex items-center gap-1.5 hover:text-white"><PlayCircle size={14} /> Watch the film</a>
          <a href="#" className="flex items-center gap-1.5 hover:text-white"><Share2 size={14} /> Facebook</a>
          <a href="mailto:hello@betopia.com" className="flex items-center gap-1.5 hover:text-white"><Mail size={14} /> hello@betopia.com</a>
          <span>© 2026</span>
        </div>
      </footer>
    </section>
  );
}
