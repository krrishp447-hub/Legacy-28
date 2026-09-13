"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Nav() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-nav-theme="dark"]');
    const triggers = Array.from(sections).map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top top+=1",
        end: "bottom top+=1",
        onEnter: () => setDark(true),
        onEnterBack: () => setDark(true),
        onLeave: () => setDark(false),
        onLeaveBack: () => setDark(false),
      })
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b px-4 py-4 backdrop-blur-md transition-colors duration-300 md:px-6 ${
        dark ? "border-paper/15 bg-ink/70 text-paper" : "border-ink/15 bg-paper/80 text-ink"
      }`}
    >
      <a href="#top" className="display text-lg transition-transform duration-200 hover:scale-110 active:scale-95">
        L28
      </a>
      <div className="label hidden gap-6 md:flex">
        <a href="#manufacture" className="pop-underline pb-0.5">Manufacture</a>
        <a href="#capabilities" className="pop-underline pb-0.5">Capabilities</a>
        <a href="#about" className="pop-underline pb-0.5">About</a>
        <a href="#contact" className="pop-underline pb-0.5">Contact</a>
      </div>
      <a
        href="#contact"
        className={`pop-btn label border px-3 py-1.5 transition-colors duration-300 ${dark ? "border-paper" : "border-ink"}`}
      >
        Start a project ↗
      </a>
    </nav>
  );
}
