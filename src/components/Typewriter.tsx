"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function Typewriter({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el.querySelectorAll(".tw-char"), { opacity: 1 });
      if (cursorRef.current) cursorRef.current.style.display = "none";
      return;
    }

    const chars = el.querySelectorAll<HTMLElement>(".tw-char");
    const tween = gsap.to(chars, {
      opacity: 1,
      duration: 0.01,
      stagger: 0.02,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top 80%", once: true },
      onComplete: () => {
        gsap.to(cursorRef.current, { opacity: 0, duration: 0.3, delay: 0.6 });
      },
    });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <p ref={ref} className={className}>
      {[...text].map((ch, i) => (
        <span key={i} className="tw-char opacity-0">
          {ch}
        </span>
      ))}
      <span ref={cursorRef} className="tw-cursor" aria-hidden>
        |
      </span>
    </p>
  );
}
