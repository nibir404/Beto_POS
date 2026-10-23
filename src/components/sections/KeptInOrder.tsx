"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { KeyRound, Link2, ReceiptText, ShoppingBag, Tags, Wallet } from "lucide-react";
import clsx from "clsx";
import { rules } from "@/lib/content";
import { Eyebrow, Reveal, SectionTitle, Tilt } from "@/components/ui";

const icons = [Tags, Link2, KeyRound, ReceiptText, ShoppingBag, Wallet];

function Preview({ i }: { i: number }) {
  const card = "flex w-full max-w-[460px] flex-col gap-5 rounded-[22px] bg-white p-6 shadow-[0_30px_60px_rgba(11,11,12,0.08)] sm:p-8";
  const head = (t: string, m: string) => (
    <div className="flex items-center justify-between">
      <span className="font-display text-[22px] font-medium tracking-[-0.015em]">{t}</span>
      <span className="text-[12px] font-medium text-muted">{m}</span>
    </div>
  );
  const row = (k: string, v: string, hi = false) => (
    <div key={k} className="flex justify-between rounded-xl bg-[#f7f2e9] px-4 py-3 text-[14px]">
      <span>{k}</span>
      <span className={clsx("tabular-nums", hi && "font-semibold text-orange-dark")}>{v}</span>
    </div>
  );
  switch (i) {
    case 0:
      return <div className={card}>{head("Price list v214", "27 stores")}{row("Black Forest 1kg", "৳950")}{row("Chicken Patty", "৳60 → ৳65", true)}{row("Rasmalai 500g", "৳260")}<div className="rounded-xl bg-orange py-3 text-center text-[12px] font-semibold tracking-[0.08em]">PUBLISH TO EVERY STORE</div></div>;
    case 1:
      return (
        <div className={card}>
          {head("Pair a new counter", "Rangpur Franchise")}
          <span className="text-[15px] leading-[22px] text-body">Open Beto POS on the SUNMI device and enter this code. Prices, staff and stock arrive in seconds.</span>
          <div className="flex gap-2.5">
            {"47K29".split("").map((ch, j) => (
              <motion.span key={j} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: j * 0.08 }} className={clsx("grid h-[72px] flex-1 place-items-center rounded-2xl font-display text-[36px] font-medium", j === 4 ? "border-2 border-orange bg-white" : "bg-[#f3f2ef]")}>
                {ch}
              </motion.span>
            ))}
          </div>
          <div className="flex justify-between border-t border-[#efefed] pt-3.5 text-[13px] text-muted"><span>Counter 3 · expires in 9:42</span><span className="font-medium text-orange-dark">Waiting for device…</span></div>
        </div>
      );
    case 2:
      return <div className={card}>{head("Roles & limits", "Bogura")}{row("Cashier", "discount ≤ 10%")}{row("Supervisor", "discount ≤ 25%")}{row("Manager", "voids, refunds", true)}</div>;
    case 3:
      return <div className={card}>{head("Return · bill #0377", "18:12")}{row("Rasmalai 500g", "paid ৳245")}{row("Refund", "৳245", true)}{row("Already refunded?", "No")}</div>;
    case 4:
      return <div className={card}>{head("Cake order", "Pickup 19:30")}{row("Black Forest 2kg", "৳1,900")}{row("Advance paid", "৳1,000")}{row("Balance on pickup", "৳900", true)}</div>;
    default:
      return <div className={card}>{head("Rangpur settlement", "This week")}{row("Sales", "৳4,12,600")}{row("Commission", "−৳41,260")}{row("Cash sent", "৳3,50,000", true)}</div>;
  }
}

export default function KeptInOrder() {
  const [active, setActive] = useState(1);
  return (
    <section className="flex flex-col gap-12 px-4 py-24 sm:px-8 lg:flex-row lg:items-center lg:gap-20 lg:px-16 lg:py-32">
      <Reveal className="flex flex-col gap-5 lg:w-[460px] lg:shrink-0">
        <Eyebrow>03 — Kept in order</Eyebrow>
        <SectionTitle className="!text-[40px] sm:!text-[52px]">Fifty counters behave like one.</SectionTitle>
        <div className="flex flex-col gap-1 pt-6">
          {rules.map((r, i) => {
            const Icon = icons[i];
            return (
              <button
                key={r.title}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={clsx("flex items-center gap-3 border-l-2 py-3 pl-4 text-left text-[17px] transition-colors sm:text-[18px]", i === active ? "border-orange text-ink" : "border-line text-[#8a8a90] hover:text-ink")}
              >
                <Icon size={17} className={i === active ? "text-orange-dark" : ""} />
                <span className="font-display font-medium">{r.title}</span>
              </button>
            );
          })}
        </div>
      </Reveal>
      <Reveal delay={0.15} className="tex-weave-light relative flex min-h-[460px] flex-1 items-center justify-center overflow-hidden rounded-[28px] p-5 sm:min-h-[560px] sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }} className="flex w-full justify-center">
            <Tilt className="flex w-full justify-center"><Preview i={active} /></Tilt>
          </motion.div>
        </AnimatePresence>
      </Reveal>
    </section>
  );
}
