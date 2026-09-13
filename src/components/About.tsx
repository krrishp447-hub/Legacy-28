const CARDS = [
  { title: "Made honestly", copy: "Real MOQs, real lead times, prices that hold from quote to invoice." },
  { title: "Made properly", copy: "Reinforced construction built to survive the wash, not just the photo." },
  { title: "Made here", copy: "One facility, many teams, full traceability from fabric roll to carton." },
];

export default function About() {
  return (
    <div id="about" className="hair-b bg-paper">
      <div className="px-4 py-8 md:px-6 md:py-10">
        <span className="label text-ink/50">[ FIG. 07 · ABOUT ]</span>
        <div className="label mt-1 text-ink/50">Los Angeles, California · USA</div>
        <h2 className="display h1 mt-4">
          We are a factory, not an agency.
        </h2>
        <p className="prose-copy mt-4 text-sm text-ink/70 md:text-base">
          Pattern, cut, stitch and wash all happen under one roof in Los Angeles, checked by hand on every run.
        </p>
      </div>
      <div className="hair-t grid grid-cols-1 md:grid-cols-3">
        {CARDS.map((c) => (
          <div key={c.title} className="hair-b hair-r p-6 last:border-r-0">
            <h3 className="display h3">{c.title}</h3>
            <p className="prose-copy mt-2 text-sm text-ink/70">{c.copy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
