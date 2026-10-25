"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Banknote, LayoutGrid, Mic, Minus, PauseCircle, Plus, Printer, ScanBarcode, Search, Settings, Sparkles, Wallet, WifiOff } from "lucide-react";
import clsx from "clsx";
import { products } from "@/lib/content";
import { Eyebrow, Reveal, SectionTitle } from "@/components/ui";

type Line = { name: string; price: number; qty: number };

const fmt = (n: number) => `৳${n.toLocaleString("en-IN")}`;

export default function Counter() {
  const [lines, setLines] = useState<Line[]>([
    { name: "Chicken Patty", price: 60, qty: 4 },
    { name: "Sandwich Bread", price: 90, qty: 1 },
    { name: "Rasmalai 500g", price: 260, qty: 1 },
  ]);
  const [split, setSplit] = useState(true);
  const [offline, setOffline] = useState(false);
  const [queued, setQueued] = useState(0);
  const [receipt, setReceipt] = useState<{ total: number; no: number } | null>(null);
  const [billNo, setBillNo] = useState(391);

  const total = useMemo(() => lines.reduce((s, l) => s + l.price * l.qty, 0), [lines]);
  const bkash = split ? Math.round((total * 0.68) / 10) * 10 : 0;

  const add = (name: string, price: number) =>
    setLines((ls) => {
      const f = ls.find((l) => l.name === name);
      return f ? ls.map((l) => (l === f ? { ...l, qty: l.qty + 1 } : l)) : [...ls, { name, price, qty: 1 }];
    });
  const dec = (name: string) => setLines((ls) => ls.flatMap((l) => (l.name !== name ? [l] : l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : [])));

  const charge = () => {
    if (!total) return;
    setReceipt({ total, no: billNo });
    if (offline) setQueued((q) => q + 1);
    setBillNo((n) => n + 1);
    setLines([]);
  };

  const suggestion = !lines.find((l) => l.name === "Mishti Doi") && lines.some((l) => l.name === "Rasmalai 500g");

  return (
    <section className="px-4 pb-24 sm:px-8 lg:px-16 lg:pb-32">
      <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-4">
          <Eyebrow>Try the counter</Eyebrow>
          <SectionTitle className="max-w-[900px] !text-[36px] sm:!text-[44px]">The counter. Fast for the cashier, strict where it matters.</SectionTitle>
        </div>
        <button
          onClick={() => setOffline((o) => !o)}
          className={clsx("flex items-center gap-2 self-start rounded-full border px-4 py-2.5 text-[12px] font-medium tracking-[0.08em] uppercase transition", offline ? "border-orange bg-orange text-ink" : "border-ink/20 text-ink hover:border-ink")}
        >
          <WifiOff size={15} /> {offline ? `Offline · ${queued} queued` : "Simulate power cut"}
        </button>
      </Reveal>

      <Reveal delay={0.1} className="bg-surface relative mt-10 flex flex-col gap-4 rounded-[24px] p-3 sm:p-5 lg:flex-row lg:p-6">
        <div className="hidden w-[60px] shrink-0 flex-col items-center gap-2 py-2 lg:flex">
          {[LayoutGrid, ScanBarcode, PauseCircle, Settings].map((I, i) => (
            <span key={i} className={clsx("grid size-11 place-items-center rounded-xl", i === 0 ? "bg-orange text-ink" : "bg-white text-body")}>
              <I size={19} />
            </span>
          ))}
        </div>

        {/* Catalog */}
        <div className="flex min-w-0 flex-1 flex-col gap-4 rounded-[18px] bg-white p-4 sm:p-6">
          <div className="flex gap-2.5">
            <div className="flex flex-1 items-center gap-2.5 rounded-xl bg-[#F5F6F7] px-4 py-3 text-[15px] text-muted">
              <Search size={16} /> Search or scan barcode…
            </div>
            <button className="flex items-center gap-2 rounded-xl bg-ink px-4 text-[12px] font-medium text-white">
              <Mic size={15} /> <span className="hidden sm:inline">Bangla voice</span>
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto text-[12px] font-medium [scrollbar-width:none]">
            {["All", "Cakes", "Bakery", "Sweets", "Snacks"].map((c, i) => (
              <span key={c} className={clsx("shrink-0 rounded-full px-3.5 py-2", i ? "bg-[#F5F6F7]" : "bg-ink text-white")}>{c}</span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {products.map((p) => (
              <motion.button
                key={p.name}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => add(p.name, p.price)}
                className="flex flex-col gap-1.5 rounded-[14px] border border-[#E7E8EA] p-3 text-left transition-colors hover:border-orange"
              >
                <span className="grid h-[72px] place-items-center rounded-[10px] sm:h-[90px]" style={{ background: p.tint }}>
                  <Plus size={18} className="text-ink/30" />
                </span>
                <span className="text-[14px] leading-tight sm:text-[15px]">{p.name}</span>
                <span className={clsx("text-[13px] tabular-nums", p.stock ? "text-orange-dark" : "text-body")}>
                  {fmt(p.price)}
                  {p.stock ? ` · ${p.stock} left` : ""}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Bill */}
        <div className="relative flex w-full flex-col gap-3.5 rounded-[18px] bg-white p-5 sm:p-6 lg:w-[360px] lg:shrink-0">
          <div className="flex items-center justify-between">
            <span className="font-display text-[20px] font-medium">Current bill</span>
            <span className="text-[12px] text-muted">#0{billNo} · Nadia</span>
          </div>
          <div className="flex min-h-[150px] flex-col">
            <AnimatePresence initial={false}>
              {lines.map((l) => (
                <motion.div key={l.name} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="flex items-center gap-2 border-b border-[#E7E8EA] py-2.5 text-[15px]">
                    <span className="flex-1">{l.name}</span>
                    <button onClick={() => dec(l.name)} aria-label={`Remove one ${l.name}`} className="grid size-6 place-items-center rounded-full bg-[#F5F6F7] hover:bg-line"><Minus size={12} /></button>
                    <span className="w-5 text-center tabular-nums">{l.qty}</span>
                    <button onClick={() => add(l.name, l.price)} aria-label={`Add one ${l.name}`} className="grid size-6 place-items-center rounded-full bg-[#F5F6F7] hover:bg-line"><Plus size={12} /></button>
                    <span className="w-16 text-right tabular-nums">{fmt(l.price * l.qty)}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {!lines.length && <span className="py-6 text-center text-[14px] text-muted">Tap a product to start a bill</span>}
          </div>

          <AnimatePresence>
            {suggestion && (
              <motion.button
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onClick={() => add("Mishti Doi", 150)}
                className="flex items-start gap-2 rounded-xl bg-[#FDEEE4] px-3.5 py-3 text-left text-[13px] leading-[19px]"
              >
                <Sparkles size={15} className="mt-0.5 shrink-0 text-orange-dark" />
                <span><b className="font-semibold">Beto POS AI:</b> customers who buy Rasmalai usually add Mishti Doi. Add it?</span>
              </motion.button>
            )}
          </AnimatePresence>

          <button onClick={() => setSplit((s) => !s)} className="flex items-center justify-between rounded-xl border border-[#E7E8EA] px-3.5 py-2.5 text-[13px]">
            <span className="flex items-center gap-2"><Wallet size={15} /> Split payment</span>
            <span className={clsx("relative h-5 w-9 rounded-full transition-colors", split ? "bg-orange" : "bg-line")}>
              <motion.span layout className={clsx("absolute top-0.5 size-4 rounded-full bg-white shadow", split ? "right-0.5" : "left-0.5")} />
            </span>
          </button>
          {split && total > 0 && (
            <div className="flex gap-1 text-[12px]">
              <div className="flex-[68] rounded-md bg-bkash px-2 py-1 text-white">bKash {fmt(bkash)}</div>
              <div className="flex flex-[32] items-center gap-1 rounded-md bg-[#F5F6F7] px-2 py-1"><Banknote size={12} />{fmt(total - bkash)}</div>
            </div>
          )}

          <div className="flex items-baseline justify-between">
            <span className="text-[12px] tracking-[0.1em] text-muted uppercase">Total</span>
            <motion.span key={total} initial={{ scale: 1.12 }} animate={{ scale: 1 }} className="font-display text-[40px] font-medium tracking-[-0.03em] tabular-nums">{fmt(total)}</motion.span>
          </div>
          <div className="flex gap-2">
            <motion.button whileTap={{ scale: 0.97 }} onClick={charge} disabled={!total} className="flex flex-1 items-center justify-center gap-2 rounded-[14px] bg-orange py-4 text-[13px] font-semibold tracking-[0.08em] uppercase disabled:opacity-40">
              <Printer size={16} /> Charge
            </motion.button>
            <button onClick={() => setLines([])} className="rounded-[14px] bg-[#F5F6F7] px-4 text-[13px] font-semibold tracking-[0.08em] uppercase">Hold</button>
          </div>

          {/* Printed receipt */}
          <AnimatePresence>
            {receipt && (
              <motion.div
                key={receipt.no}
                initial={{ clipPath: "inset(0 0 100% 0)", opacity: 1 }}
                animate={{ clipPath: "inset(0 0 0% 0)" }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 1.1, ease: "linear" }}
                onClick={() => setReceipt(null)}
                className="absolute top-full right-4 left-4 z-10 -mt-2 cursor-pointer bg-white px-5 pt-4 pb-5 text-center text-[12px] shadow-[0_20px_40px_rgba(58,60,65,0.2)] lg:right-6 lg:left-6"
              >
                <div className="font-semibold tracking-[0.1em]">BETO POS · BOGURA SHOWROOM</div>
                <div className="text-muted">COUNTER 2 · INV #0{receipt.no}</div>
                <div className="my-2 border-t border-dashed border-[#C4C6CB]" />
                <div className="flex justify-between text-[14px] font-semibold"><span>TOTAL</span><span>{fmt(receipt.total)}</span></div>
                <div className="mt-1 text-orange-dark">{offline ? "Saved offline · will sync ✓" : "Paid · receipt sent on WhatsApp ✓"}</div>
                <div className="mt-2 text-[11px] text-muted">dhonnobad · tap to close</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
