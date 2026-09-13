"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import HeroGlitch from "./HeroGlitch";

const BADGES = [
  { value: "42,500 pcs", label: "Capacity / mo" },
  { value: "NO MOQ", label: "MOQ / style" },
  { value: "18–30 days", label: "Lead time" },
  { value: "50–500", label: "GSM range" },
];

export default function Hero() {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-label", { y: 12, opacity: 0, stagger: 0.08, duration: 0.5 })
        .from(
          ".hero-line .reveal-inner",
          { yPercent: 110, duration: 0.9, stagger: 0.1 },
          "-=0.2"
        )
        .from(".hero-blurb", { y: 12, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".hero-badge", { y: 12, opacity: 0, stagger: 0.06, duration: 0.4 }, "-=0.3");
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={scope} id="top" className="relative hair-b bg-paper">
      <div className="hero-meta flex items-center justify-between px-4 md:px-6 pt-24 md:pt-28 pb-4">
        <span className="hero-label label">EST. Los Angeles · USA</span>
        <span className="hero-label label">[ FIG. 01 · CUT &amp; SEW ]</span>
        <span className="hero-label label hidden md:inline">34.0522°N, 118.2437°W</span>
      </div>

      <HeroGlitch />

      <div className="hair-t grid grid-cols-1 md:grid-cols-2">
        <p className="hero-blurb prose-copy hair-r p-4 text-sm text-ink/70 md:p-6 md:text-base">
          LEGACY 28 stands as a full-package streetwear manufacturer. Established with a vision to
          run a tighter floor than the agencies reselling it, we specialise in transforming raw
          fabric into premium, production-ready garments for brands who need to trust their supply chain.
        </p>
        <div className="grid grid-cols-2">
          {BADGES.map((b, i) => (
            <div
              key={b.label}
              className={`hero-badge p-4 md:p-6 ${i % 2 === 0 ? "hair-r" : ""} ${i < 2 ? "hair-b" : ""}`}
            >
              <div className="label text-ink/50 mb-1">{b.label}</div>
              <div className="font-mono text-sm md:text-base">{b.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="label flex items-center justify-center gap-2 py-4 text-ink/40">
        Scroll to enter the line
        <span aria-hidden>↓</span>
      </div>
    </div>
  );
}
