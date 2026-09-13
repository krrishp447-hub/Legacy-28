"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { tag: "PATTERN", title: "Design & Tech-Pack", copy: "Bring a sketch or a full spec. We build production-ready tech-packs, BOMs and graded size sets in-house." },
  { tag: "SAMPLE", title: "Sampling", copy: "Fit, proto and PP samples in 7–10 days. We fit on real bodies, iterate fast, and lock construction before bulk." },
  { tag: "SOURCE", title: "Fabric & Trims", copy: "Sourced knits and wovens from 50 to 500 GSM. Reactive and pigment dyeing, enzyme washes, and a full trims library." },
  { tag: "PRODUCTION", title: "Cut & Sew", copy: "Built to survive." },
  { tag: "FINISH", title: "Print & Embellishment", copy: "Screen, DTG, sublimation and puff prints. Flat and 3D embroidery, patches and heat-transfer vinyls, all colour matched." },
  { tag: "DISPATCH", title: "QC, Pack & Ship", copy: "Customised packaging and strict quality checks on every unit, for the highest standard of consistency and durability." },
];

export default function Capabilities() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>(".cap-step");
      steps.forEach((step, i) => {
        const num = step.querySelector(".cap-num");
        const fromLeft = i % 2 === 0;
        gsap.fromTo(
          num,
          {
            opacity: 0,
            x: fromLeft ? -220 : 220,
            y: -60,
            rotation: fromLeft ? -35 : 35,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: fromLeft ? -3 : 3,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, listRef);
    return () => ctx.revert();
  }, []);

  return (
    <div id="capabilities" className="hair-b bg-paper">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="hair-r md:sticky md:top-0 md:h-screen md:flex md:flex-col md:justify-center p-4 py-10 md:p-10">
          <span className="label text-ink/50">[ FIG. 05 · CAPABILITIES ]</span>
          <h2 className="display h1 mt-2">
            Everything
            <br />
            Under One
            <br />
            Roof.
          </h2>
          <p className="prose-copy mt-4 text-sm text-ink/70">
            Six operations, one facility. No middlemen, no lost samples in transit, no surprises at bulk.
          </p>
        </div>

        <div ref={listRef}>
          {STEPS.map((s, i) => (
            <div key={s.title} className="cap-step hair-b flex min-h-[70vh] flex-col justify-center p-6 md:p-10">
              <span className="cap-num display inline-block text-ink/10 text-[clamp(4rem,10vw,8rem)] leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="label mt-4 text-acid">{s.tag}</div>
              <h3 className="display h2 mt-1">{s.title}</h3>
              <p className="prose-copy mt-3 text-sm text-ink/70 md:text-base">{s.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
