"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

const LOOKS = ["Oversized Tee", "Overshirt", "Heavy Hoodie", "Cargo Set"];

export default function TheWalk() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    if (prefersReducedMotion()) {
      video.currentTime = 0;
      return;
    }

    const onReady = () => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=250%",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          video.currentTime = self.progress * video.duration;
          setActive(Math.min(LOOKS.length - 1, Math.floor(self.progress * LOOKS.length)));
        },
      });
      return () => st.kill();
    };

    if (video.readyState >= 1) {
      const cleanup = onReady();
      return cleanup;
    }
    video.addEventListener("loadedmetadata", onReady, { once: true });
    return () => video.removeEventListener("loadedmetadata", onReady);
  }, []);

  return (
    <div
      ref={sectionRef}
      data-nav-theme="dark"
      className="on-ink relative flex h-screen w-full items-center justify-center overflow-hidden hair-b bg-ink"
    >
      <video
        ref={videoRef}
        src="/videos/the-walk.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />

      <div className="label absolute left-4 top-6 text-paper/50 md:left-6 md:top-8">[ FIG. 02 · THE WALK ]</div>
      <div className="label absolute right-4 top-6 text-paper/50 md:right-6 md:top-8">4 LOOKS / SS26</div>

      <div className="label absolute bottom-6 left-4 space-y-1 md:bottom-8 md:left-6">
        {LOOKS.map((look, i) => (
          <div key={look} className={i === active ? "text-paper" : "text-paper/40"}>
            {String(i + 1).padStart(2, "0")} · {look}
          </div>
        ))}
      </div>
      <div className="label absolute bottom-6 right-4 max-w-[20ch] text-right text-paper/50 md:bottom-8 md:right-6">
        One model, four looks, all cut and sewn by us.
      </div>
    </div>
  );
}
