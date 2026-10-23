"use client";

import { motion } from "framer-motion";
import { BellRing, Sparkles } from "lucide-react";
import { stores, alerts } from "@/lib/content";
import clsx from "clsx";

// The Retail Console as shown in the hero: every store's day on one page.
export default function Console() {
  return (
    <div className="rounded-t-[24px] border border-b-0 border-[rgba(255,236,210,0.14)] bg-tobacco-3 px-2.5 pt-2.5 shadow-[0_-30px_80px_rgba(255,122,26,0.12)]">
      <div className="flex items-center gap-2 px-2.5 pt-1.5 pb-3">
        <span className="size-2.5 rounded-full bg-[#4a3f35]" />
        <span className="size-2.5 rounded-full bg-[#4a3f35]" />
        <span className="size-2.5 rounded-full bg-[#4a3f35]" />
        <span className="flex-1 text-center text-[12px] font-medium text-muted">console.beto.com.bd</span>
        <span className="w-12" />
      </div>
      <div className="tex-weave-light flex gap-3 rounded-t-[16px] p-3 sm:p-4">
        <div className="min-w-0 flex-1 rounded-[14px] bg-white px-4 pt-1 pb-3 sm:px-6">
          <div className="grid grid-cols-[1.6fr_1fr_0.7fr] gap-3 border-b border-line py-4 text-[11px] font-medium tracking-[0.1em] text-muted uppercase sm:grid-cols-[1.6fr_0.9fr_1fr_0.7fr] lg:grid-cols-[1.6fr_0.9fr_1fr_0.7fr_1.8fr]">
            <span>Store</span>
            <span className="hidden sm:block">Type</span>
            <span>Sales today</span>
            <span>Counters</span>
            <span className="hidden lg:block">At the counter</span>
          </div>
          {stores.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.07, duration: 0.5 }}
              className="grid grid-cols-[1.6fr_1fr_0.7fr] items-center gap-3 border-b border-[#efe9dd] py-[15px] text-[14px] sm:grid-cols-[1.6fr_0.9fr_1fr_0.7fr] sm:text-[15px] lg:grid-cols-[1.6fr_0.9fr_1fr_0.7fr_1.8fr]"
            >
              <span className="flex items-center gap-2.5 truncate">
                <span className={clsx("size-2 shrink-0 rounded-full", s.status === "ok" ? "bg-ok" : "bg-orange animate-blink-dot")} />
                {s.name}
              </span>
              <span className="hidden text-muted sm:block">{s.type}</span>
              <span className="tabular-nums">{s.sales}</span>
              <span className="tabular-nums">{s.counters}</span>
              <span className="hidden truncate text-body lg:block">{s.staff}</span>
            </motion.div>
          ))}
          <div className="grid grid-cols-[1.6fr_1fr_0.7fr] gap-3 py-4 text-[14px] sm:grid-cols-[1.6fr_0.9fr_1fr_0.7fr] lg:grid-cols-[1.6fr_0.9fr_1fr_0.7fr_1.8fr]">
            <span className="pl-4 text-muted">+ 19 more stores</span>
            <span className="hidden sm:block" />
            <span className="font-medium">৳41.6 lakh</span>
            <span className="font-medium">61 / 62</span>
          </div>
        </div>
        <div className="hidden w-[320px] shrink-0 flex-col gap-2.5 rounded-[14px] bg-tobacco p-5 lg:flex">
          <div className="flex items-center justify-between text-[11px] font-medium tracking-[0.12em] text-[#a8a8ae] uppercase">
            <span className="flex items-center gap-2"><BellRing size={13} /> Alerts</span>
            <span className="text-glow">3 open</span>
          </div>
          {alerts.map((a, i) => (
            <motion.div
              key={a.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.25 }}
              className="flex flex-col gap-1 rounded-xl bg-[#1d1813] p-3.5"
            >
              <span className="text-[14px] leading-5 text-white">{a.text}</span>
              <span className="text-[11px] tracking-wide text-muted">{a.meta}</span>
            </motion.div>
          ))}
          <div className="mt-auto flex items-center gap-2.5 border-t border-white/10 pt-3 text-[13px] text-[#c9c9ce]">
            <Sparkles size={16} className="shrink-0 text-glow" />
            Beto POS AI grouped 41 events into 3 that need you.
          </div>
        </div>
      </div>
    </div>
  );
}
