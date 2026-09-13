"use client";

import { useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/reducedMotion";

const TEE_D =
  "M100 60 L150 24 L200 60 L252 34 L300 88 L256 128 L232 108 L232 340 L68 340 L68 108 L44 128 L0 88 L48 34 L100 60 Z";

export default function HeroGlitch() {
  const areaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const jitter = useRef<gsap.core.Tween | null>(null);

  const handleMove = (e: React.PointerEvent) => {
    const el = areaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--gx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--gy", `${e.clientY - rect.top}px`);
  };

  const handleEnter = () => {
    if (prefersReducedMotion() || !overlayRef.current) return;
    const text = overlayRef.current.querySelector(".glitch-text-group");
    jitter.current = gsap.to(text, {
      x: "random(-6, 6)",
      skewX: "random(-5, 5)",
      duration: 0.08,
      repeat: -1,
      repeatRefresh: true,
      ease: "none",
    });
  };

  const handleLeave = () => {
    jitter.current?.kill();
    const text = overlayRef.current?.querySelector(".glitch-text-group");
    if (text) gsap.set(text, { x: 0, skewX: 0 });
    areaRef.current?.style.setProperty("--gx", "-999px");
  };

  return (
    <div
      ref={areaRef}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      className="relative px-4 pb-6 md:px-6"
      style={{ "--gx": "-999px", "--gy": "-999px" } as React.CSSProperties}
    >
      <h1 className="display relative z-10 text-ink">
        <span className="sr-only">Legacy 28, a streetwear and apparel manufacturer.</span>
        <span aria-hidden className="hero-line reveal-mask relative block">
          <span className="reveal-inner block h-hero">Legacy</span>
        </span>
        <span aria-hidden className="hero-line reveal-mask relative block">
          <span className="reveal-inner block h-hero">28</span>
        </span>
      </h1>

      <svg
        aria-hidden
        viewBox="0 0 300 390"
        className="pointer-events-none absolute bottom-[4%] right-[6%] hidden h-[42%] w-auto opacity-[0.07] md:block"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth={2}
      >
        <path d={TEE_D} />
      </svg>

      <div ref={overlayRef} aria-hidden className="glitch-overlay pointer-events-none absolute inset-0 z-20">
        <div className="glitch-text-group">
          <h1 className="display">
            <span className="reveal-mask relative block">
              <span className="glitch-text block h-hero">Legacy</span>
            </span>
            <span className="reveal-mask relative block">
              <span className="glitch-text block h-hero">28</span>
            </span>
          </h1>
        </div>
        <svg
          viewBox="0 0 300 390"
          className="tee-glitch absolute bottom-[4%] right-[6%] hidden h-[42%] w-auto md:block"
          fill="var(--color-ink)"
          stroke="none"
        >
          <path d={TEE_D} />
        </svg>
      </div>
    </div>
  );
}
