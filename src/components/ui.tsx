"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

const spring = { stiffness: 220, damping: 18, mass: 0.4 };

// Pulls its child toward the cursor a little, then springs back.
export function Magnetic({ children, strength = 0.3, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);
  return (
    <motion.div
      ref={ref}
      className={clsx("inline-flex", className)}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

// Soft 3D tilt that follows the cursor.
export function Tilt({ children, className, max = 7 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      {children}
    </motion.div>
  );
}

export function Logo({ className, dark = true }: { className?: string; dark?: boolean }) {
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <span className="grid size-8 place-items-center rounded-[10px] bg-[#3a3c42]">
        <span className="h-[12px] w-[20px] rounded-[4px] bg-orange shadow-[0_0_12px_rgba(255,122,26,0.7)]" />
      </span>
      <span className={clsx("font-display text-[21px] font-bold tracking-[-0.05em]", dark ? "text-white" : "text-ink")}>beto</span>
      <span className="-ml-1 rounded-[5px] bg-orange px-1.5 py-0.5 font-display text-[11px] font-bold tracking-[0.04em] text-ink">POS</span>
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
    <Magnetic>
    <motion.a
      href={href}
      whileTap={{ scale: 0.96 }}
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
    </Magnetic>
  );
}
