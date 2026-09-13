import Halftone from "./Halftone";

const TECHNIQUES = [
  {
    tag: "CONSTRUCTION",
    title: "Cut & Sew",
    copy: "Custom garments cut and sewn from jersey, fleece and terry. Reliable fit and a clean finish that holds its shape wash after wash.",
    src: "/images/techniques/cut-sew.jpg",
  },
  {
    tag: "INK",
    title: "Screen Printing",
    copy: "Bold, opaque graphics with sharp registration. Water based, plastisol and puff, all colour matched by hand.",
    src: "/images/techniques/screen-printing.jpg",
  },
  {
    tag: "DIGITAL",
    title: "DTG Printing",
    copy: "Direct to garment for photographic detail and a soft hand feel. Full colour, no minimum, built for intricate artwork.",
    src: "/images/techniques/dtg-printing.jpg",
  },
  {
    tag: "ALL-OVER",
    title: "Sublimation Printing",
    copy: "Edge to edge all-over prints dyed into the fabric. Fade resistant colour that never cracks or peels.",
    src: "/images/techniques/sublimation.jpg",
  },
  {
    tag: "THREAD",
    title: "Embroidery",
    copy: "Flat and 3D puff threadwork for a premium, tactile brand mark. Tight stitch count, crisp edges, clean digitising.",
    src: "/images/techniques/embroidery.jpg",
  },
];

export default function Techniques() {
  return (
    <div className="hair-b bg-paper">
      <div className="px-4 py-8 md:px-6 md:py-10">
        <span className="label text-ink/50">[ FIG. 04 · MANUFACTURING CAPABILITIES ]</span>
        <h2 className="display h1 mt-2">Print, Stitch, Finish.</h2>
        <p className="prose-copy mt-2 text-sm text-ink/70">
          Every finish handled on our own floor, colour matched and checked by hand before it goes anywhere near your carton.
        </p>
      </div>
      <div className="hair-t grid grid-cols-1 md:grid-cols-5">
        {TECHNIQUES.map((t, i) => (
          <div key={t.title} className="group hair-b hair-r p-6 last:border-r-0 md:hair-b-0">
            <div className="flex items-baseline justify-between">
              <span className="label text-ink/40">
                {String(i + 1).padStart(2, "0")} / {String(TECHNIQUES.length).padStart(2, "0")}
              </span>
              <span className="label text-ink/40">{t.tag}</span>
            </div>
            <Halftone label={t.title} src={t.src} tone="mono" className="mt-4 aspect-square w-full" />
            <h3 className="display h3 mt-4">{t.title}</h3>
            <p className="prose-copy mt-2 text-sm text-ink/70">{t.copy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
