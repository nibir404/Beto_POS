"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { Building2, Globe, ShieldCheck, Smartphone, Store, Tablet, Users } from "lucide-react";
import { Eyebrow, Reveal, SectionTitle, Tilt } from "@/components/ui";

const devices = [
  { icon: Smartphone, name: "SUNMI handheld", sub: "Print · scan · bill", dot: "bg-ok" },
  { icon: Tablet, name: "Android tablet", sub: "Showroom counters", dot: "bg-ok" },
  { icon: Globe, name: "Web counter", sub: "Any browser", dot: "bg-orange" },
];
const modules = [
  ["Sync engine", "live"],
  ["One price list", "v214"],
  ["Stock ledger · batches", "27 stores"],
  ["Roles, PINs, limits", "184 staff"],
  ["Audit log", "every action"],
];
const roles = [
  { icon: Building2, name: "Head office", sub: "All stores, prices, staff" },
  { icon: Store, name: "Store manager", sub: "Receiving, day close" },
  { icon: Users, name: "Franchise owner", sub: "Settlement, commission" },
];

function Count({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const v = useMotionValue(0);
  const text = useTransform(v, (n) => `${prefix}${Math.round(n)}${suffix}`);
  useEffect(() => {
    if (inView) animate(v, to, { duration: 1.6, ease: "easeOut" });
  }, [inView, to, v]);
  return <motion.span ref={ref}>{text}</motion.span>;
}

// Animated dashed link with a travelling packet.
function Link({ top, bottom, delay = 0 }: { top: string; bottom: string; delay?: number }) {
  return (
    <div className="relative flex min-w-0 flex-1 flex-col items-center gap-2.5 py-4 lg:py-0">
      <span className="text-[12px] font-medium text-muted">{top}</span>
      <div className="relative h-0.5 w-px self-stretch overflow-hidden max-lg:mx-auto max-lg:h-12 max-lg:w-0.5 lg:w-full">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#EE8139_0_8px,transparent_8px_14px)] max-lg:bg-[repeating-linear-gradient(180deg,#EE8139_0_8px,transparent_8px_14px)]" />
        <motion.span
          className="absolute top-1/2 left-0 size-2 -translate-y-1/2 rounded-full bg-orange shadow-[0_0_10px_#EE8139] max-lg:left-1/2 max-lg:-translate-x-1/2"
          animate={{ left: ["0%", "100%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay }}
        />
      </div>
      <span className="text-[12px] font-medium text-muted">{bottom}</span>
    </div>
  );
}

export default function System() {
  return (
    <section id="system" className="px-4 py-24 sm:px-8 lg:px-16 lg:py-32">
      <Reveal className="flex flex-col gap-4">
        <Eyebrow>01 — How it fits together</Eyebrow>
        <SectionTitle>Built for chains, not single tills.</SectionTitle>
      </Reveal>

      <Reveal delay={0.1} className="bg-surface mt-14 flex flex-col items-stretch rounded-[28px] p-5 sm:p-8 lg:flex-row lg:items-center lg:p-12">
        <div className="flex flex-col gap-3 lg:w-[300px] lg:shrink-0">
          <span className="eyebrow text-muted">Counter app · 62 devices</span>
          {devices.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ x: 4 }}
              className="flex items-center gap-3.5 rounded-2xl bg-[#FFFFFF] p-4"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-charcoal-3 text-cream">
                <d.icon size={20} />
              </span>
              <span className="flex flex-1 flex-col">
                <span className="font-display text-[17px] font-medium">{d.name}</span>
                <span className="text-[13px] text-muted">{d.sub}</span>
              </span>
              <span className={`size-2 rounded-full ${d.dot}`} />
            </motion.div>
          ))}
        </div>

        <Link top="bills · stock · cash" bottom="offline queue syncs" />

        <Tilt className="lg:w-[340px] lg:shrink-0" max={6}>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col gap-3.5 rounded-[22px] bg-charcoal-2 p-6 shadow-[0_30px_60px_rgba(58,60,65,0.25)]"
        >
          <div className="flex items-center justify-between">
            <span className="eyebrow text-glow">Central retail service</span>
            <ShieldCheck size={18} className="text-glow" />
          </div>
          <span className="font-display text-[26px] leading-tight font-medium tracking-[-0.02em] text-white">One source of truth</span>
          <div className="flex flex-col gap-1.5">
            {modules.map(([k, v], i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="flex justify-between rounded-[10px] bg-[#4A4C52] px-3 py-2.5 text-[14px] text-cream"
              >
                <span>{k}</span>
                <span className="text-muted">{v}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        </Tilt>

        <Link top="prices · rules" bottom="reports · alerts" delay={0.9} />

        <div className="flex flex-col gap-3 lg:w-[260px] lg:shrink-0">
          <span className="eyebrow text-muted">Retail Console</span>
          {roles.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{ x: -4 }}
              className="flex items-center gap-3 rounded-2xl bg-[#FFFFFF] p-4"
            >
              <r.icon size={18} className="shrink-0 text-orange-dark" />
              <span className="flex flex-col">
                <span className="font-display text-[17px] font-medium">{r.name}</span>
                <span className="text-[13px] text-muted">{r.sub}</span>
              </span>
            </motion.div>
          ))}
        </div>
      </Reveal>

      <div className="mt-14 grid grid-cols-2 border-t border-ink lg:grid-cols-4">
        {[
          { el: <Count to={27} />, label: "showrooms & franchises" },
          { el: <Count to={62} />, label: "counters, one price list" },
          { el: <Count to={0} />, label: "bills lost in power cuts" },
          { el: <span className="text-orange">&lt; 2s</span>, label: "counter to head office" },
        ].map((s, i) => (
          <div key={s.label} className={`flex flex-col gap-1.5 pt-6 pb-2 ${i % 2 ? "pl-5 sm:pl-7 border-l border-sand" : ""} ${i === 2 ? "lg:border-l lg:border-sand lg:pl-7" : ""}`}>
            <span className="font-display text-[44px] font-medium tracking-[-0.04em] sm:text-[56px]">{s.el}</span>
            <span className="text-[15px] text-body">{s.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[12px] text-muted">Figures from the Beto POS demo environment.</p>
    </section>
  );
}
