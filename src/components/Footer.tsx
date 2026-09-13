export default function Footer() {
  return (
    <footer data-nav-theme="dark" className="on-ink bg-ink text-paper">
      <div className="hair-b overflow-hidden px-4 py-8 md:px-6">
        <span className="display block text-[clamp(3rem,17vw,15rem)] leading-[0.82]">L28</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4">
        <div className="hair-b p-4 md:p-6">
          <span className="label opacity-50">Index</span>
          <div className="mt-4 space-y-2">
            <a href="#manufacture" className="block font-sans text-base transition-all duration-200 hover:translate-x-1 hover:text-acid">Manufacture</a>
            <a href="#capabilities" className="block font-sans text-base transition-all duration-200 hover:translate-x-1 hover:text-acid">Capabilities</a>
            <a href="#numbers" className="block font-sans text-base transition-all duration-200 hover:translate-x-1 hover:text-acid">Numbers</a>
            <a href="#about" className="block font-sans text-base transition-all duration-200 hover:translate-x-1 hover:text-acid">About</a>
          </div>
        </div>
        <div className="hair-b hair-l p-4 md:p-6">
          <span className="label opacity-50">Contact</span>
          <div className="mt-4 space-y-2">
            <a href="mailto:hello@legacy28.com" className="block font-sans text-base transition-all duration-200 hover:translate-x-1 hover:text-acid">hello@legacy28.com</a>
            <a href="https://wa.me/10000000000" className="block font-sans text-base transition-all duration-200 hover:translate-x-1 hover:text-acid">+1 000 000 0000</a>
            <a href="https://instagram.com/legacy28" className="block font-sans text-base transition-all duration-200 hover:translate-x-1 hover:text-acid">Instagram ↗</a>
          </div>
        </div>
        <div className="hair-b hair-l p-4 md:p-6">
          <span className="label opacity-50">Studio</span>
          <p className="mt-4 font-mono text-sm leading-relaxed opacity-70">
            2800 Alameda Street
            <br />
            Los Angeles, California
            <br />
            US · 90058
          </p>
        </div>
        <div className="hair-b hair-l p-4 md:p-6">
          <span className="label opacity-50">Coordinates</span>
          <p className="mt-4 font-mono text-sm opacity-70">
            34.0522°N
            <br />
            118.2437°W
          </p>
          <span className="label mt-4 block opacity-50">SS26 / BUILD 001</span>
        </div>
      </div>
      <p className="hair-t px-4 py-4 font-mono text-xs leading-relaxed opacity-60 md:px-6">
        Garment manufacturing from our facility in Los Angeles. Export orders shipped worldwide.
      </p>
      <div className="hair-t flex flex-col items-start justify-between gap-2 px-4 py-5 md:flex-row md:items-center md:px-6">
        <span className="label opacity-60">© {new Date().getFullYear()} Legacy 28. All rights reserved</span>
        <span className="label opacity-60">Made in Los Angeles · Shipped worldwide</span>
      </div>
    </footer>
  );
}
