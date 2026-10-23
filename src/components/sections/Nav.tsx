"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo, Button } from "@/components/ui";

const links = [
  { label: "System", href: "#system" },
  { label: "Story", href: "#story" },
  { label: "Features", href: "#features" },
  { label: "Beto AI", href: "#ai" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="relative z-30 flex items-center justify-between">
      <a href="#top" aria-label="Beto POS home">
        <Logo />
      </a>
      <nav className="hidden items-center gap-9 md:flex">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="group relative text-[12px] font-medium tracking-[0.1em] text-white/90 uppercase">
            {l.label}
            {l.label === "Beto AI" && <span className="absolute -top-2 -right-3 size-1.5 rounded-full bg-orange animate-blink-dot" />}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-orange transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </nav>
      <div className="hidden md:block">
        <Button>Book a demo</Button>
      </div>
      <button
        className="grid size-11 place-items-center rounded-full border border-white/20 text-white md:hidden"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-14 right-0 left-0 flex flex-col gap-1 rounded-2xl border border-white/10 bg-tobacco-2 p-3 md:hidden"
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-[15px] text-cream hover:bg-white/5">
                {l.label}
              </a>
            ))}
            <a href="#demo" onClick={() => setOpen(false)} className="mt-1 rounded-xl bg-orange px-4 py-3 text-center text-[13px] font-medium tracking-[0.08em] text-ink uppercase">
              Book a demo
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
