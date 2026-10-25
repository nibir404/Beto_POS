"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity, Archive, BarChart3, BellRing, BookOpen, Boxes, Building2, Cable, CalendarCheck, Check, Clock, Coins, Cpu, CreditCard, Download,
  FileChartColumn, Gauge, Globe, Inbox, KeyRound, Languages, Link2, Minus, MonitorSmartphone, MoonStar, PauseCircle, Percent, Printer, QrCode,
  RefreshCw, ScanBarcode, Server, Settings2, ShieldAlert, ShoppingBag, Smartphone, Split, Store, Sun, Tag, Undo2, UserCog, Users, Wallet, WifiOff,
  Banknote, type LucideIcon,
} from "lucide-react";
import clsx from "clsx";
import { devices, featureGroups, peripherals } from "@/lib/content";
import { Eyebrow, Reveal, SectionTitle } from "@/components/ui";

const tabs = [...featureGroups.map((g) => ({ id: g.id, label: g.label, count: g.features.length })), { id: "devices", label: "Devices", count: devices.length + peripherals.length }];

const iconMap: Record<string, LucideIcon> = {
  Activity, Archive, BarChart3, BellRing, BookOpen, Boxes, Building2, Cable, CalendarCheck, Clock, Coins, CreditCard, Download, FileChartColumn,
  Gauge, Globe, Inbox, KeyRound, Languages, Link2, MonitorSmartphone, MoonStar, PauseCircle, Percent, Printer, QrCode, RefreshCw, ScanBarcode,
  Server, Settings2, ShieldAlert, ShoppingBag, Smartphone, Split, Store, Sun, Tag, Undo2, UserCog, Users, Wallet, WifiOff, Banknote,
};

const icon = (name: string) => iconMap[name] ?? Cpu;

function Devices() {
  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-x-auto rounded-[18px] bg-white">
        <table className="w-full min-w-[720px] text-left text-[14px]">
          <thead>
            <tr className="border-b border-line text-[11px] font-medium tracking-[0.1em] text-muted uppercase">
              <th className="px-5 py-4 font-medium">Device</th>
              <th className="px-5 py-4 font-medium">Printing</th>
              <th className="px-5 py-4 font-medium">Scanning</th>
              <th className="px-5 py-4 font-medium">Cash drawer</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((d) => (
              <tr key={d.device} className="border-b border-[#EEEFF1] last:border-0">
                <td className="px-5 py-4">
                  <span className="block font-display text-[16px] font-medium">{d.device}</span>
                  <span className="text-[12px] text-muted">{d.os}</span>
                </td>
                <td className="px-5 py-4 text-body">{d.print}</td>
                <td className="px-5 py-4 text-body">{d.scan}</td>
                <td className="px-5 py-4">
                  <span className={clsx("inline-flex items-center gap-1.5", d.ok ? "text-ink" : "text-muted")}>
                    {d.ok ? <Check size={15} className="shrink-0 text-ok" /> : <Minus size={15} className="shrink-0" />}
                    {d.drawer}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {peripherals.map((p) => (
          <div key={p.name} className="flex flex-col gap-1.5 rounded-[16px] border border-line bg-[#FFFFFF] p-5">
            <span className="eyebrow text-[11px] text-orange-dark">{p.name}</span>
            <span className="text-[14px] leading-[21px] text-body">{p.req}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Features() {
  const [tab, setTab] = useState("counter");
  const group = featureGroups.find((g) => g.id === tab);

  return (
    <section id="all-features" className="px-4 py-24 sm:px-8 lg:px-16 lg:py-32">
      <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-4">
          <Eyebrow>04 — The full feature list</Eyebrow>
          <SectionTitle className="max-w-[820px]">Everything Beto POS does, counter to head office.</SectionTitle>
        </div>
        <p className="max-w-[340px] text-[16px] leading-6 text-body">
          Three parts working as one: the counter app, the Retail Console and the Retail Server — on the hardware you already have.
        </p>
      </Reveal>

      <div className="mt-12 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={clsx("relative flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-[13px] font-medium tracking-[0.04em] transition-colors", tab === t.id ? "text-ink" : "bg-kraft text-body hover:text-ink")}
          >
            {tab === t.id && <motion.span layoutId="feature-tab" className="absolute inset-0 rounded-full bg-orange" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
            <span className="relative">{t.label}</span>
            <span className={clsx("relative rounded-full px-1.5 text-[11px] tabular-nums", tab === t.id ? "bg-ink/10" : "bg-white")}>{t.count}</span>
          </button>
        ))}
      </div>

      <div className="bg-surface mt-5 rounded-[28px] p-4 sm:p-8 lg:p-10">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            {group ? (
              <>
                <div className="mb-7 flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
                  <p className="max-w-[620px] font-display text-[20px] leading-[1.35] font-medium tracking-[-0.01em] sm:text-[24px]">{group.intro}</p>
                  <span className="eyebrow text-[11px] text-muted lg:text-right">{group.who}</span>
                </div>
                <div className={clsx("grid gap-3 sm:grid-cols-2", group.features.length > 4 ? "lg:grid-cols-4" : "lg:grid-cols-2")}>
                  {group.features.map((f, i) => {
                    const Icon = icon(f.icon);
                    return (
                      <motion.div
                        key={f.title}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(i * 0.03, 0.4) }}
                        className="group flex flex-col gap-3 rounded-[18px] bg-white p-5 transition-shadow hover:shadow-[0_18px_40px_rgba(58,60,65,0.08)]"
                      >
                        <span className="grid size-10 place-items-center rounded-xl bg-charcoal-3 text-cream transition-colors group-hover:bg-orange group-hover:text-ink">
                          <Icon size={18} />
                        </span>
                        <span className="font-display text-[18px] leading-tight font-medium tracking-[-0.01em]">{f.title}</span>
                        <span className="text-[14px] leading-[21px] text-body">{f.body}</span>
                        {f.tag && <span className="mt-auto border-t border-line pt-3 text-[12px] font-medium text-orange-dark">Records: {f.tag}</span>}
                      </motion.div>
                    );
                  })}
                </div>
              </>
            ) : (
              <Devices />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
