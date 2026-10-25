# Beto POS — landing page

Next.js 15 + Tailwind v4 build of the Paper design (`03 · Landing Page`).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Stack

- **Three.js / React Three Fiber / drei** — the hero Beto is a real-time 3D model built in code (`src/components/three/Beto3D.tsx`). His head follows the cursor, the screen blinks, legs swing, and hovering turns his light bar into a smile.
- **GSAP ScrollTrigger** — pins *The story of one bill* and plays it as you scroll.
- **Lenis** — smooth scrolling, synced to GSAP (`src/components/providers/SmoothScroll.tsx`).
- **Framer Motion** — reveals, Beto TV channel switching, chat typing, counter interactions, FAQ.
- **lucide-react** — icons.

## Where things live

| Section | File |
|---|---|
| Hero + Retail Console | `sections/Hero.tsx`, `sections/Console.tsx` |
| 01 System diagram + figures | `sections/System.tsx` |
| Story of one bill (pinned film) | `sections/Story.tsx` |
| Beto TV (21 feature channels) | `sections/BetoTV.tsx` |
| One day | `sections/OneDay.tsx` |
| Playable counter | `sections/Counter.tsx` |
| Kept in order | `sections/KeptInOrder.tsx` |
| Beto AI | `sections/BetoAI.tsx` |
| Rollout, FAQ, CTA + footer | `sections/Closing.tsx` |

All copy and demo figures are in `src/lib/content.ts`. **The figures are demo data — replace them before launch.**

## Brand

Follows the BETO Brand Identity Guidelines 2026.

- **Type:** Outfit (Bold headings, SemiBold subheadings, Medium titles and buttons, Regular body). Bangla text uses Hind Siliguri, since Outfit has no Bengali glyphs.
- **Colour:** BETO Orange `#EE8139`, BETO Charcoal `#3A3C41`, White, Soft Gray `#F5F6F7`, Gray `#E7E8EA` — tokens in `src/app/globals.css`. Aim for 70% white/charcoal, 20% grays, 10% orange.
- **Logo:** `Logo` in `src/components/ui.tsx` — full colour on light, `variant="reversed"` on dark. "POS" is a separate descriptor; never restyle the mark or wordmark.
- **Mascot:** use only the approved states (thinking, waving, pointing, sleeping, TV mode, …).
