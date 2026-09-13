"use client";

const CONTACT_EMAIL = "hello@legacy28.com";

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const body = [
    `Brand / Label: ${data.get("brand") ?? ""}`,
    `Product: ${data.get("product") ?? ""}`,
    `Est. quantity: ${data.get("quantity") ?? ""}`,
    "",
    String(data.get("brief") ?? ""),
  ].join("\n");
  const subject = `Enquiry from ${data.get("name") ?? "website"}`;
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Field({
  name,
  label,
  type = "text",
  required = false,
  textarea = false,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const shared = "hair-b w-full bg-transparent pb-2 pt-1 outline-none";
  return (
    <label className="block">
      <span className="label text-ink/50">{label}</span>
      {textarea ? (
        <textarea name={name} required={required} rows={3} className={`${shared} mt-1 resize-none`} />
      ) : (
        <input name={name} type={type} required={required} className={`${shared} mt-1`} />
      )}
    </label>
  );
}

export default function Contact() {
  return (
    <div id="contact" className="hair-b bg-paper">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="hair-r p-6 md:p-10">
          <span className="label text-ink/50">[ FIG. 09 · START A PROJECT ]</span>
          <h2 className="display h1 mt-4">Let&apos;s build it.</h2>
          <p className="prose-copy mt-4 text-sm text-ink/70 md:text-base">
            Tell us what you&apos;re making. We reply within one working day with feasibility, indicative pricing and a sampling timeline.
          </p>
          <div className="mt-8 space-y-3">
            <a href={`mailto:${CONTACT_EMAIL}`} className="pop-underline label inline-flex w-fit items-center gap-2 pb-0.5">
              Email — {CONTACT_EMAIL} ↗
            </a>
            <a href="https://wa.me/10000000000" className="pop-underline label inline-flex w-fit items-center gap-2 pb-0.5">
              WhatsApp — +1 000 000 0000 ↗
            </a>
            <a href="https://instagram.com/legacy28" className="pop-underline label inline-flex w-fit items-center gap-2 pb-0.5">
              Instagram — @legacy28 ↗
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 md:p-10">
          <Field name="name" label="Name *" required />
          <Field name="brand" label="Brand / Label" />
          <Field name="email" label="Email *" type="email" required />
          <div className="grid grid-cols-2 gap-6">
            <Field name="product" label="Product" />
            <Field name="quantity" label="Est. quantity" />
          </div>
          <Field name="brief" label="Project brief" textarea />
          <button type="submit" className="pop-btn display mt-2 border border-ink px-4 py-3 text-left">
            Send enquiry ↗
          </button>
        </form>
      </div>
    </div>
  );
}
