"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

export function Logo({ className, dark = true }: { className?: string; dark?: boolean }) {
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <span className="grid size-8 place-items-center rounded-[10px] bg-[#3a3c42]">
        <span className="h-[12px] w-[20px] rounded-[4px] bg-orange shadow-[0_0_12px_rgba(255,122,26,0.7)]" />
      </span>
      <span className={clsx("font-display text-[21px] font-bold tracking-[-0.05em]", dark ? "text-white" : "text-ink")}>beto</span>
    </span>
  );
}

export function Reveal({ children, delay = 0, y = 28, className, ...rest }: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, tone = "orange", dot }: { children: React.ReactNode; tone?: "orange" | "muted"; dot?: boolean }) {
  return (
    <div className={clsx("eyebrow flex items-center gap-2", tone === "orange" ? "text-orange-dark" : "text-muted")}>
      {dot && <span className="size-1.5 rounded-full bg-[#e5372b] animate-blink-dot" />}
      {children}
    </div>
  );
}

export function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={clsx("font-display text-[40px] font-medium leading-[1.02] tracking-[-0.04em] sm:text-[52px] lg:text-[64px]", className)}>
      {children}
    </h2>
  );
}

export function Button({
  children,
  variant = "primary",
  href = "#demo",
  icon,
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "dark";
  href?: string;
  icon?: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={clsx(
        "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-6 py-3.5 text-[13px] font-medium tracking-[0.08em] uppercase transition-colors",
        variant === "primary" && "bg-orange text-ink hover:bg-[#ff8d3a]",
        variant === "ghost" && "border border-white/60 text-white hover:bg-white/10",
        variant === "dark" && "bg-ink text-white hover:bg-black",
      )}
    >
      {icon}
      {children}
    </motion.a>
  );
}
