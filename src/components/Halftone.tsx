import Image from "next/image";

export default function Halftone({
  label,
  src,
  tone = "color",
  className = "",
}: {
  label: string;
  src: string;
  tone?: "color" | "mono";
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-ink/10 transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-xl ${className}`}
    >
      <Image
        src={src}
        alt={label}
        fill
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 85vw"
        className={`object-cover grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0 ${
          tone === "mono" ? "contrast-125" : ""
        }`}
      />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{
          backgroundImage: "radial-gradient(var(--color-ink) 1px, transparent 1.5px)",
          backgroundSize: "6px 6px",
          opacity: 0.35,
        }}
      />
      <span className="label absolute bottom-2 left-2 bg-paper px-1.5 py-0.5 text-ink/60">
        IMG · {label}
      </span>
    </div>
  );
}
