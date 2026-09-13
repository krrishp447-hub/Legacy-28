"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/reducedMotion";

export default function Marquee({ items, dark = false }: { items: string[]; dark?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setReduced(true);
      return;
    }
    const track = trackRef.current;
    if (!track) return;
    const tween = gsap.to(track, { xPercent: -50, ease: "none", duration: 24, repeat: -1 });
    return () => {
      tween.kill();
    };
  }, []);

  const line = items.join(" ✦ ") + " ✦ ";

  return (
    <div className={`hair-b overflow-hidden py-4 ${dark ? "on-ink bg-ink text-paper" : "bg-paper text-ink"}`}>
      <div ref={trackRef} className="marquee-track">
        <span className="display px-4 text-2xl md:text-4xl">{line}</span>
        {!reduced && <span className="display px-4 text-2xl md:text-4xl">{line}</span>}
      </div>
    </div>
  );
}
