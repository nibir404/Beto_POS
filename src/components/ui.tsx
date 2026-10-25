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

// BETO logo: charcoal mark with an orange pill, lowercase wordmark. "POS" sits beside it as a
// descriptor so the logo itself is never altered.
export function Logo({ className, variant = "full", pos = true }: { className?: string; variant?: "full" | "reversed"; pos?: boolean }) {
  const reversed = variant === "reversed";
  return (
    <span className={clsx("inline-flex items-center gap-[7px]", className)}>
      <span className={clsx("grid size-[30px] place-items-center rounded-[8px]", reversed ? "bg-white" : "bg-ink")}>
        <span className="h-[12px] w-[19px] rounded-[4px] bg-orange" />
      </span>
      <span className={clsx("font-display text-[30px] leading-none font-semibold tracking-[-0.045em]", reversed ? "text-white" : "text-ink")}>beto</span>
      {pos && (
        <span className={clsx("ml-2 border-l pl-2.5 font-display text-[13px] font-medium tracking-[0.16em]", reversed ? "border-white/25 text-white/80" : "border-line text-body")}>POS</span>
      )}
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
    <div className={clsx("eyebrow flex items-center gap-2.5", tone === "orange" ? "text-orange-dark" : "text-muted")}>
      {dot && <span className="size-1.5 rounded-full bg-orange animate-blink-dot" />}
      {children}
      <span className="h-px w-14 bg-current opacity-50" />
    </div>
  );
}

export function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={clsx("headline text-[40px] leading-[1.04] sm:text-[52px] lg:text-[62px]", className)}>{children}</h2>;
}

// Accent phrase inside a headline, set in BETO Orange.
export function Accent({ children }: { children: React.ReactNode }) {
  return <span className="text-orange">{children}</span>;
}

export function Button({
  children,
  variant = "primary",
  href = "#demo",
  icon,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "tertiary-dark";
  href?: string;
  icon?: React.ReactNode;
}) {
  return (
    <Magnetic>
      <motion.a
        href={href}
        whileTap={{ scale: 0.97 }}
        className={clsx(
          "inline-flex shrink-0 items-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-medium whitespace-nowrap transition-colors",
          variant === "primary" && "bg-orange text-white hover:bg-orange-dark",
          variant === "secondary" && "bg-ink text-white hover:bg-charcoal-2",
          variant === "tertiary" && "border border-ink/30 text-ink hover:bg-soft",
          variant === "tertiary-dark" && "border border-white/40 text-white hover:bg-white/10",
        )}
      >
        {icon}
        {children}
      </motion.a>
    </Magnetic>
  );
}
