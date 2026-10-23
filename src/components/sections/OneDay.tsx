"use client";

import { motion } from "framer-motion";
import { CheckCircle2, KeyRound, Moon, WifiOff } from "lucide-react";
import { days } from "@/lib/content";
import { Eyebrow, Reveal, SectionTitle } from "@/components/ui";

function Visual({ i }: { i: number }) {
  if (i === 0)
    return (
      <div className="flex flex-col gap-2">
        {[["Challan #DC-2291", "48 / 50"], ["Short", "2 · Patty"], ["Expiry", "24 Oct"]].map(([k, v], j) => (
          <motion.div key={k} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + j * 0.12 }} className="flex justify-between rounded-xl bg-white px-3.5 py-3 text-[12px] font-medium">
            <span>{k}</span>
            <span className="text-orange-dark">{v}</span>
          </motion.div>
        ))}
      </div>
    );
  if (i === 1)
    return (
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2.5 rounded-full bg-ink px-3.5 py-3 text-[13px] text-white">
          <KeyRound size={16} className="text-mustard" /> Discount 15% · PIN needed
        </div>
        <div className="flex items-center justify-between rounded-xl bg-white p-3.5">
          <span className="font-display text-[22px] font-medium">৳590</span>
          <span className="flex gap-1">
            <span className="rounded-full bg-bkash px-2.5 py-1.5 text-[10px] font-medium text-white">bKash</span>
            <span className="rounded-full bg-[#f3f2ef] px-2.5 py-1.5 text-[10px] font-medium">Nagad</span>
          </span>
        </div>
      </div>
    );
  if (i === 2)
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 text-[14px]">
          <WifiOff size={16} className="text-orange-dark" />
          <span className="flex-1">Offline · 12 bills</span>
          <span className="text-[12px] text-muted">queued</span>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 text-[14px]">
          <CheckCircle2 size={16} className="text-ok" />
          <span className="flex-1">Back online</span>
          <span className="text-[12px] text-muted">synced</span>
        </div>
        <div className="rounded-xl bg-orange py-2.5 text-center text-[11px] font-semibold tracking-[0.08em]">0 BILLS LOST</div>
      </div>
    );
  return (
    <div className="flex h-full flex-col justify-center gap-2 text-cream">
      <span className="eyebrow flex items-center gap-2 text-[11px] text-mustard"><Moon size={13} /> Day close · 3 / 3 counters</span>
      <span className="font-display text-[34px] font-medium tracking-[-0.03em] text-white">−৳20</span>
      <span className="text-[13px] leading-[19px] text-[#a8a8ae]">cash difference · stock counted · demand sent to Akboria</span>
    </div>
  );
}

export default function OneDay() {
  return (
    <section className="px-4 py-24 sm:px-8 lg:px-16 lg:py-32">
      <Reveal className="flex flex-col gap-4">
        <Eyebrow>02 — One day, Bogura & Rangpur</Eyebrow>
        <SectionTitle className="max-w-[880px]">From the morning challan to the last counter closing.</SectionTitle>
      </Reveal>
      <div className="mt-14 grid grid-cols-1 border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
        {days.map((d, i) => (
          <Reveal key={d.title} delay={i * 0.1} className={`flex flex-col gap-3 pt-6 pb-8 sm:px-5 lg:px-6 ${i ? "lg:border-l lg:border-line" : "lg:pl-0"}`}>
            <motion.div whileHover={{ y: -4 }} className={`h-[220px] rounded-[18px] p-[18px] ${i === 3 ? "bg-tobacco" : "tex-weave-light"} flex flex-col justify-center`}>
              <Visual i={i} />
            </motion.div>
            <span className={`pt-2 text-[13px] font-medium tracking-wide uppercase ${i === 3 ? "text-orange-dark" : "text-muted"}`}>{d.time}</span>
            <span className="font-display text-[24px] leading-tight font-medium tracking-[-0.02em]">{d.title}</span>
            <span className="text-[15px] leading-[23px] text-body">{d.body}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
