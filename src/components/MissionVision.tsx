import Typewriter from "./Typewriter";

export default function MissionVision() {
  return (
    <div className="hair-b bg-paper">
      <div className="px-4 pt-8 md:px-6 md:pt-10">
        <span className="label text-ink/50">[ FIG. 08 · MISSION &amp; VISION ]</span>
        <div className="label mt-1 text-ink/40">L28 / DOCTRINE</div>
      </div>
      <div className="hair-t mt-8 grid grid-cols-1 md:grid-cols-2">
        <div className="hair-b hair-r p-6 md:p-10">
          <span className="label text-ink/40">01 / MISSION</span>
          <h3 className="display h3 mt-2">Our Mission</h3>
          <Typewriter
            className="display h2 mt-4"
            text="Build every garment like it carries our name, not just yours."
          />
        </div>
        <div className="hair-b p-6 md:p-10">
          <span className="label text-ink/40">02 / VISION</span>
          <h3 className="display h3 mt-2">Our Vision</h3>
          <Typewriter
            className="display h2 mt-4"
            text="One factory floor, zero middlemen, a supply chain a founder can trust."
          />
        </div>
      </div>
    </div>
  );
}
