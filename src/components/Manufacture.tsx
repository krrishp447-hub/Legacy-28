"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Halftone from "./Halftone";
import { prefersReducedMotion } from "@/lib/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { title: "Oversized Tees", sub: "Boxy · drop-shoulder", gsm: "180–260 GSM", copy: "Single-jersey and heavyweight loop-knit. Bio-washed, garment-dyed, seam-taped necklines.", src: "/images/manufacture/oversized-tees.jpg" },
  { title: "Cut & Sew Shirts", sub: "Camp collar · overshirt", gsm: "140–320 GSM", copy: "Poplin, Oxford, twill, chambray, linen, dobby.", src: "/images/manufacture/cut-sew-shirts.jpg" },
  { title: "Heavyweight Hoodies", sub: "Loopback · brushed fleece", gsm: "320–420 GSM", copy: "Kangaroo & split pockets, ribbed cuffs, metal-tipped drawcords, double-needle topstitch.", src: "/images/manufacture/hoodies.jpg" },
  { title: "Bottoms", sub: "Cargo · sweatpant · short", gsm: "240–360 GSM", copy: "Tapered, wide and utility fits. Bartacked stress points, branded trims, custom washes.", src: "/images/manufacture/bottoms.jpg" },
  { title: "Headwear & Accessories", sub: "Caps · beanies · totes", gsm: "Assorted", copy: "5- & 6-panel caps, cuffed beanies, canvas totes. Woven labels, embroidery, screen & puff print.", src: "/images/manufacture/headwear.jpg" },
];

export default function Manufacture() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setReduced(true);
      return;
    }
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.5,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
      return () => tween.kill();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="manufacture"
      ref={sectionRef}
      className={`hair-b bg-paper ${reduced ? "overflow-x-auto" : "overflow-hidden"}`}
    >
      <div ref={trackRef} className="flex w-max">
        <div className="flex w-screen shrink-0 flex-col justify-center p-4 md:p-6">
          <span className="label text-ink/50">[ FIG. 03 · PRODUCT LINE ]</span>
          <h2 className="display h1 mt-2">
            What We
            <br />
            Manufacture
          </h2>
          <p className="label mt-4 text-ink/40">Scroll → the line moves</p>
        </div>

        {ITEMS.map((item, i) => (
          <div key={item.title} className="group hair-l flex w-[85vw] shrink-0 flex-col p-6 sm:w-[45vw] lg:w-[30vw]">
            <div className="flex items-baseline justify-between">
              <span className="label text-ink/40">
                {String(i + 1).padStart(2, "0")} / {String(ITEMS.length).padStart(2, "0")}
              </span>
              <span className="label text-ink/40">{item.gsm}</span>
            </div>
            <Halftone label={item.title} src={item.src} className="mt-4 aspect-[4/5] w-full" />
            <h3 className="display h3 mt-4">{item.title}</h3>
            <div className="label mt-1 text-ink/40">{item.sub}</div>
            <p className="prose-copy mt-2 text-sm text-ink/70">{item.copy}</p>
          </div>
        ))}

        <div className="hair-l flex w-[85vw] shrink-0 flex-col justify-between bg-ink p-6 text-paper sm:w-[45vw] lg:w-[30vw]">
          <span className="label text-paper/50">[ END OF LINE ]</span>
          <div>
            <h3 className="display h3">Your Label, Our Floor.</h3>
            <a
              href="#contact"
              className="label mt-3 inline-block underline underline-offset-4 transition-all duration-200 hover:text-acid hover:tracking-[0.2em]"
            >
              Request a quote ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
