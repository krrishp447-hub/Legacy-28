"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

const STATS: { value: number; suffix: string; label: string; static?: string }[] = [
  { value: 3200, suffix: "", label: "Units / month" },
  { value: 60, suffix: "+", label: "Brands shipped" },
  { value: 8, suffix: "+", label: "Years on the floor" },
  { value: 0, suffix: "", label: "Min. order / style", static: "NO MOQ" },
  { value: 500, suffix: "+ GSM", label: "Max fabric weight" },
];

export default function Numbers() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nums = el.querySelectorAll<HTMLElement>(".stat-num[data-value]");
    if (prefersReducedMotion()) {
      nums.forEach((num) => {
        num.textContent = Number(num.dataset.value).toLocaleString() + (num.dataset.suffix ?? "");
      });
      return;
    }
    const ctx = gsap.context(() => {
      nums.forEach((num) => {
        const target = Number(num.dataset.value);
        const suffix = num.dataset.suffix ?? "";
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
          onUpdate: () => {
            num.textContent = Math.round(counter.value).toLocaleString() + suffix;
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div id="numbers" ref={ref} data-nav-theme="dark" className="on-ink hair-b bg-ink text-paper">
      <div className="flex items-center justify-between px-4 py-8 md:px-6 md:py-10">
        <span className="label text-paper/50">[ FIG. 06 · BY THE NUMBERS ]</span>
        <span className="label border border-paper/30 px-2 py-0.5 text-paper/50">Verified 8+ yr</span>
      </div>
      <div className="hair-t grid grid-cols-1 sm:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.label} className="hair-r hair-b px-4 py-8 md:px-6 md:py-12 sm:[&:nth-child(3n)]:border-r-0">
            {s.static ? (
              <div className="display text-[clamp(1.75rem,4vw,3.5rem)]">{s.static}</div>
            ) : (
              <div className="stat-num display text-[clamp(1.75rem,4vw,3.5rem)]" data-value={s.value} data-suffix={s.suffix}>
                0
              </div>
            )}
            <div className="label mt-2 text-paper/50">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
