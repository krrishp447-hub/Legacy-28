# Legacy 28 — Project Context

Handoff doc for starting a fresh session with full context. This is a **from-scratch recreation of the design/motion style** of a real site (bombaygarmentcompany.com), rebuilt under an invented brand, **Legacy 28** (fictional LA-based streetwear manufacturer — no real business data, content, or photography was copied from the source site).

Read this whole file before making changes. It reflects the actual code as of this session, not aspirational plans.

---

## 1. How this project came to exist

1. User asked to analyze `bombaygarmentcompany.com`'s style (fonts, colors, GSAP usage, layout system) — done via live browser inspection (computed CSS, `window` globals, DOM structure).
2. User then provided a **HAR file** of the real site's network traffic, which exposed the React Server Components flight payload — this revealed the *real* component tree/names (`Nav, Hero, Marquee, ScrollSequence, Manufacture, Techniques, Capabilities, Numbers, About, MissionVision, Contact, Footer`) and exact copy, which was far more accurate than DOM scraping.
3. User then provided a **screen recording (.mp4)** of the real site being scrolled — extracted via `ffmpeg` into frames, which revealed real scroll *mechanics* that weren't visible from static inspection: a horizontal-scroll pinned filmstrip (Manufacture), a sticky-left/scrolling-right pattern (Capabilities), a dark Numbers section, and a hero wordmark texture-fill effect tied to scroll.
4. From there, the project was built and iterated entirely under the **Legacy 28** brand — same *mechanisms*, entirely invented content/imagery.
5. Real product/technique photography was generated via the **Freepik MCP** (`images_generate`, `video_generate`).
6. A "The Walk" lookbook video was generated via a **multi-shot video prompt** (one continuous take, 4 wardrobe transitions via match-cuts) and wired into a scroll-scrubbed video section.
7. A third-party Claude Code skill, **`ui-ux-pro-max`**, was reviewed for safety (cloned, inspected — local-only CSV search, no network calls, no prompt injection) then installed project-locally at `.claude/skills/`. It was used to catch a real gap: none of the GSAP animations respected `prefers-reduced-motion`, which was then fixed everywhere.

**Key constraint honored throughout:** no real business PII (address, phone, email) from the source site was ever copied in — Legacy 28's contact details are all invented placeholders.

---

## 2. Tech stack

- **Next.js 16.3.2** — App Router, TypeScript, Turbopack
- **React 19.2.8**
- **Tailwind CSS v4** (`@tailwindcss/postcss`) — CSS-variable-native theme (`@theme inline` block in `globals.css`), not a JS config file
- **GSAP `^3.15.0`** + `ScrollTrigger` — all scroll/hover motion
- **Lenis `^1.3.26`** — smooth scroll (the `lenis` npm package, successor to deprecated `@studio-freight/lenis`)
- **Freepik MCP** — used to generate 10 product/technique photos + 1 lookbook video (not a runtime dependency, just a build-time tool)
- No backend, no database, no CMS. Contact form builds a `mailto:` link client-side; nothing is persisted.

Dev server: `npm run dev` (Turbopack). Preview config lives in `.claude/launch.json` (name: `legacy28-dev`, port 3000).

---

## 3. Design tokens

Defined in `src/app/globals.css`, exposed to Tailwind via `@theme inline`:

```css
--color-ink:       #0a0a0a   /* near-black — text, dark section bg */
--color-paper:     #f4f4f0   /* warm off-white — main bg */
--color-paper-dim: #e8e8e2   /* slightly dimmer off-white */
--color-acid:      #d6ff00   /* lime — the ONE accent color, used sparingly */
```

Fonts (self-hosted via `next/font/google`, declared in `src/app/layout.tsx`):

| Token | Font | Weights loaded | Used for |
|---|---|---|---|
| `--font-display` / `.display` class | Archivo | 800, 900 | All headings/wordmarks — uppercase, `letter-spacing: -0.02em`, `line-height: 0.9` |
| `--font-sans` | Space Grotesk | default | Body text (via `.prose-copy`) |
| `--font-mono` / `.label` class | JetBrains Mono | default | All caps labels — uppercase, `letter-spacing: 0.15em`, `font-size: 0.6875rem` |

**Modular type scale** (added mid-project to fix inconsistent one-off `clamp()` values — same semantic heading level = same size everywhere now):

```css
.h-hero { font-size: clamp(3.5rem, 15.5vw, 15rem); line-height: 0.86; }  /* hero wordmark, footer wordmark only */
.h1     { font-size: clamp(2.25rem, 7vw, 5.5rem);  line-height: 0.92; }  /* section headers */
.h2     { font-size: clamp(1.75rem, 4vw, 3rem);    line-height: 0.98; }  /* card/statement headers */
.h3     { font-size: clamp(1.25rem, 2.2vw, 1.75rem); line-height: 1.05; } /* card titles */
```

Apply as `className="display h1"` etc. (`.display` sets font-family/weight/case, the scale class sets size).

`.prose-copy` = Space Grotesk, `line-height: 1.6`, `max-width: 42ch` (readable measure, used on all body paragraphs).

---

## 4. Global CSS utility system (`src/app/globals.css`)

| Class | Purpose |
|---|---|
| `.hair-b/-t/-l/-r` | 1px hairline borders (`border-color: var(--color-ink)`); flip to `var(--color-paper)` inside `.on-ink` ancestor |
| `.on-ink` | Marks a dark section; flips hairline colors, and is queried by `Nav.tsx`'s scroll-theme logic (see below) — **not** the same as `data-nav-theme` |
| `.reveal-mask` | `overflow: hidden` wrapper for line-mask text reveals |
| `.grain` (on `<body>`) | Fixed full-viewport SVG `feTurbulence` noise overlay, `opacity: 0.045`, `mix-blend-mode: multiply`. Disabled under `prefers-reduced-motion` |
| `.marquee-track` | `display: inline-flex; white-space: nowrap` — driven by GSAP `xPercent` tween, no CSS `@keyframes` anywhere in the project |
| `.pop-underline` | Hover: lime underline grows 0%→100% width (`background-size` trick). Used on plain text links (nav, footer, contact) |
| `.pop-btn` | Hover: bg flips to lime + ink text + `scale(1.04)`; `:active` → `scale(0.97)`. Used on buttons/CTAs. Reduced-motion keeps the color transition, drops the scale |
| `.tw-cursor` / `@keyframes tw-blink` | Blinking typewriter cursor |
| `.glitch-overlay` / `.glitch-text` / `.tee-glitch` | Hero cursor-tracked glitch reveal (see §6, Hero) |

**Known CSS cascade gotcha**: `@import "tailwindcss"` sits at the very top of `globals.css`, so any custom class defined *after* it in the same file wins over a same-specificity Tailwind utility regardless of Tailwind's own internal layer order. This is why `Nav.tsx`'s dark/light border color is done with plain Tailwind classes (not `.hair-b`) — `.hair-b`'s fixed border-color would have silently overridden a `hover:`/conditional Tailwind border utility on the same element.

---

## 5. File-by-file component reference

All components live in `src/components/`. Section order in `src/app/page.tsx`:

```
Nav → Hero → Marquee(dark) → TheWalk → Manufacture → Techniques →
Marquee(light) → Capabilities → Numbers → About → MissionVision → Contact → Footer
```

### `Nav.tsx` — adaptive sticky nav
- `position: fixed`, `backdrop-blur-md`, semi-opaque background (`bg-paper/80` / `bg-ink/70`).
- **Theme-adaptive**: GSAP `ScrollTrigger`s watch every element with `data-nav-theme="dark"` (currently: `TheWalk`, `Numbers`, `Footer`) and toggle a `dark` boolean via `onEnter/onEnterBack/onLeave/onLeaveBack`. Nav crossfades between light/dark styling (300ms) accordingly.
- Fixed after two rounds of iteration: first pass had no background at all (invisible over dark sections); this pass fixed both "always legible" and "doesn't look like a flat bar clashing with the cinematic video."
- Links use `.pop-underline`; CTA uses `.pop-btn`.

### `Hero.tsx` — landing/wordmark section
- GSAP load-in timeline (`gsap.context`, scoped to root ref): staggers `.hero-label` fade-up → `.hero-line .reveal-inner` line-mask reveal (`yPercent: 110 → 0`) → `.hero-blurb` → `.hero-badge`. Skipped entirely under reduced-motion.
- Wordmark itself is delegated to `HeroGlitch.tsx` (see below).
- 2-column row below: blurb paragraph (left) + 2×2 stat badge grid (right) — `Capacity/mo`, `MOQ/style`, `Lead time`, `GSM range`.
- "Scroll to enter the line ↓" prompt at the bottom.

### `HeroGlitch.tsx` — interactive cursor-glitch wordmark (the most complex single component)
- Renders "LEGACY" / "28" as normal black text (line-mask reveal target, `.hero-line .reveal-inner`).
- A **faint tee-outline SVG** sits in the empty space to the right of "28" (`opacity-[0.07]`, basically invisible at rest).
- **One shared pointer-tracked overlay** (`.glitch-overlay`) spans the *entire* heading area (text + empty right side) via `onPointerMove` on the outer wrapper, writing `--gx`/`--gy` CSS custom properties (mouse position relative to that wrapper).
- The overlay's `clip-path: circle(120px at var(--gx) var(--gy))` means only a 120px circle around the cursor is visible at all — everywhere else it's fully clipped away.
- Inside that clipped overlay: a duplicate of the wordmark text (`.glitch-text` — lime + magenta `text-shadow` RGB-split) **and** a bold filled duplicate of the tee outline (`.tee-glitch` — ink fill + lime/magenta `drop-shadow` split for the same chromatic-aberration look).
- On `pointerenter`, GSAP starts an infinite fast jitter (`x`/`skewX` random, `repeatRefresh: true`, 80ms) on just the text group — the tee reveal itself doesn't jitter (distorting the garment shape didn't read well visually).
- Net effect: move your cursor anywhere across the wordmark row, and a small "digital interference" spotlight follows it, revealing vivid glitch-colored text and — once you reach the right side — a hidden tee-outline logo, all through the same mechanic.
- Fully inert under `prefers-reduced-motion` (pointer handlers still update CSS vars but no jitter tween starts; in practice the reveal is harmless without motion since it's just a static color patch under the cursor).
- **Predecessor**: an earlier `GlitchWord.tsx` did per-word-scoped glitch (each word tracked its own local cursor position). It was deleted and replaced by this shared-overlay architecture specifically because per-word-local coordinates can't reveal content positioned *outside* any single word's box (the tee logo) — a real architectural lesson if extending this further.

### `Marquee.tsx` — infinite ticker
- Reusable, takes `items: string[]` and `dark?: boolean`.
- Two duplicate `<span>` copies of the joined text (`" ✦ "` separator, matching the real site's exact separator character), animated via `gsap.to(track, { xPercent: -50, repeat: -1 })`. Duplicating content + moving exactly 50% is the standard seamless-loop trick.
- Under reduced motion: renders only ONE copy (no duplicate) and never starts the tween — avoids showing duplicated static text.
- Used twice: dark variant right after Hero, light variant between Techniques and Capabilities.

### `TheWalk.tsx` — scroll-scrubbed lookbook video (formerly `GarmentSketch.tsx`)
- **This was originally an SVG line-draw animation** (pure vector, no real photography) that morphed between 4 hand-drawn garment silhouettes via `stroke-dashoffset`, scroll-scrubbed. It was later replaced wholesale by a real generated video once the user wanted actual "someone walking" footage — same pin/scrub *mechanism*, different asset. If you see references to "GarmentSketch" or SVG path morphing anywhere in older context, that's superseded.
- Current implementation: a single `<video src="/videos/the-walk.mp4">` (10s, 1280×720, generated via one Freepik `video_generate` call — see §7).
- `ScrollTrigger.create({ pin: true, scrub: 0.5, end: "+=250%" })` — `onUpdate` sets `video.currentTime = self.progress * video.duration` directly. This is the general "scroll-scrub a video" recipe: pin the section, drive `currentTime` from scroll progress instead of animating a CSS property.
- The "4 looks" numbered list (bottom-left) highlights the active look based on `Math.floor(progress * 4)`, synced to quarters of the video's actual duration.
- `data-nav-theme="dark"` (drives the Nav adaptive-color system).
- Reduced motion: skips the ScrollTrigger/pin entirely, sets `video.currentTime = 0` (shows first frame statically, no scroll-jacking).

### `Manufacture.tsx` — horizontal-scroll pinned filmstrip
- **This was originally a vertical CSS grid** — wrong mechanic entirely, corrected after the screen-recording revealed the real site uses a pinned horizontal scroll ("Scroll → the line moves" copy, which was already present but not actually implemented until this fix).
- `ScrollTrigger.create({ pin: true, scrub: 0.5 })` translates the flex track (`x: -distance()`) where `distance = track.scrollWidth - window.innerWidth`. `invalidateOnRefresh: true` so it recalculates on resize.
- Track = intro panel (`w-screen`) + 5 product cards (`w-[85vw] sm:w-[45vw] lg:w-[30vw]`) + a dark "Your Label, Our Floor" closing card, all `shrink-0` in a `flex w-max` row.
- Each product card uses `Halftone` for its image (see below), with a `group` class so hovering triggers the grayscale→color reveal.
- Reduced motion: skips the pin/scrub, section becomes `overflow-x-auto` instead of `overflow-hidden` — user can natively swipe/trackpad-scroll the row horizontally. This was a deliberate accessible fallback, not just "disable the effect."

### `Techniques.tsx` — 5-card capability grid
- Static grid (`md:grid-cols-5`), no ScrollTrigger pinning (unlike Manufacture) — just a normal in-flow section.
- Each card: number/tag row, `Halftone` image (`tone="mono"` — extra `contrast-125`), title, copy.
- Same `group` + `Halftone` grayscale-reveal-on-hover treatment as Manufacture.

### `Halftone.tsx` — shared image treatment component
- Takes `src`, `label`, optional `tone: "color" | "mono"`.
- **Always renders grayscale by default** (`grayscale` filter class), transitions to full color on `group-hover:grayscale-0` (500ms) — parent card needs the `group` class.
- Simultaneously lifts (`group-hover:-translate-y-1.5`) and gains a shadow on hover.
- A CSS `radial-gradient` dot-pattern overlay (`mix-blend-multiply`, 6px grid) sits on top always — the "halftone screen print" look, present in both hover states.
- `IMG · {label}` caption chip bottom-left — this literal "IMG ·" prefix convention was copied from the real site (it uses the same placeholder-style caption even in production).
- Reduced-motion note: the color-reveal *filter* transition is intentionally left running even under reduced motion (a color/filter change isn't considered motion in the vestibular sense); only the `-translate-y` **lift** is disabled globally via the `[class*="group-hover:-translate-y"]` CSS override in `globals.css`.

### `Capabilities.tsx` — sticky-left / scrolling-right, card-throw numbers
- **This was originally a static 6-card grid** — wrong mechanic, corrected after the screen recording showed the real site pins the left heading (`Everything Under One Roof.`) via native CSS `position: sticky` (`md:sticky md:top-0 md:h-screen`) while 6 numbered steps scroll past on the right, each `min-h-[70vh]`.
- **The big ghost number per step animates in like a thrown/dealt playing card** — this went through two iterations at the user's request:
  1. First pass: simple scale+fade+bounce (`scale: 0.7→1`, `back.out` ease).
  2. Final version (current): `gsap.fromTo` per step, **alternating** entry direction (even-indexed steps fly in from the left at `-35°` rotation, odd from the right at `+35°`), landing at a natural resting tilt (**not** 0° — `±3°`, like an actually-dealt card), `power3.out` easing for a fast-snap-then-settle feel. Triggered via `ScrollTrigger` per `.cap-step` (`start: "top 70%", toggleActions: "play none none reverse"` — reverses if you scroll back up).
  3. The number span needed `inline-block` added explicitly for the transform/rotation to apply predictably.
- Skipped entirely under reduced motion (`if (prefersReducedMotion()) return;` before any ScrollTrigger is created).

### `Numbers.tsx` — stat counter band
- **Originally light background** — corrected to `on-ink`/dark after the screen recording showed the real section is dark. Also fixed from a flat 5-col grid to `grid-cols-1 sm:grid-cols-3` (naturally wraps 5 items into a 3-then-2 layout, matching the real site).
- Count-up animation: `gsap.to({value:0}, {value: target, onUpdate: ...})` tweening a plain JS object (not the DOM element directly), writing `toLocaleString()` text each frame. `ScrollTrigger` with `once: true`.
- One stat (`Min. order / style`) is non-numeric (`"NO MOQ"`) — rendered as static text, skips the counter entirely (`s.static` field).
- `data-nav-theme="dark"`.
- Reduced motion: writes final values directly via `toLocaleString()`, no tween.

### `About.tsx` — factory statement + 3 cards
- Plain, no client-side JS/GSAP at all (not even `"use client"`) — fully static section. "Made honestly / properly / here" 3-column grid.

### `MissionVision.tsx` — typewriter statements
- Two statements ("Our Mission" / "Our Vision"), each rendered via `Typewriter.tsx`.

### `Typewriter.tsx` — character-by-character reveal component
- Splits `text` into `[...text]` (individual Unicode-aware characters, spaces included as literal characters — deliberately *not* wrapped in non-breaking spaces, so normal line-wrapping still works).
- Each character starts `opacity-0`; GSAP reveals them via `stagger: 0.02, duration: 0.01, ease: "none"` — the near-zero duration is what makes it read as an instant "typewriter click" per character rather than a smooth fade.
- A blinking `|` cursor (`.tw-cursor`, CSS `@keyframes`) sits after the text, fades out 0.6s after the reveal completes.
- `ScrollTrigger` with `once: true` per instance.
- Reduced motion: sets all chars to `opacity: 1` immediately, hides the cursor.

### `Contact.tsx` — enquiry section
- Two-column: contact info + links (left), form (right).
- Form fields use a shared internal `Field` component — **underline style** (label above, `.hair-b` bottom border, no boxes) — this was a deliberate correction from an earlier bordered-grid-box style after comparing against the screen recording.
- **No backend.** `handleSubmit` builds a `mailto:` URL client-side from `FormData` and does `window.location.href = ...`. This is intentional (no server exists), not a stub to fill in later — flagged explicitly at the time as the pragmatic no-backend choice.
- Contact links (email/WhatsApp/Instagram) and the submit button use `.pop-underline` / `.pop-btn` respectively.

### `Footer.tsx`
- Dark (`on-ink`, `data-nav-theme="dark"`), giant `L28` wordmark (`.h-hero`), 4-column index/contact/studio/coordinates grid, bottom copyright bar.
- Footer link hover: `hover:text-acid hover:translate-x-1` (safe here specifically because the background is dark — lime text on dark bg is high-contrast; the same lime-as-text-color trick is deliberately *avoided* on light-background sections elsewhere, see §8).

### `SmoothScroll.tsx` — Lenis provider
Wraps the whole app in `layout.tsx`. **Current state (confirmed from disk, this is the latest tuning):**
```ts
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard Lenis "smooth" expo-out easing
  wheelMultiplier: 0.8,
});
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```
This was tuned specifically for an "Apple-product-page, slow and premium" scroll feel (longer duration + reduced wheel multiplier than Lenis defaults). Skipped entirely under reduced motion (native scroll instead). **Note**: this file was edited directly on disk outside the visible conversation at some point — treat the above as ground truth, don't assume the original `duration: 1.2` default is still in effect anywhere.

### `lib/reducedMotion.ts`
```ts
export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
```
Single source of truth, imported by every animated component. **Every** GSAP-driven component in this project checks this before setting up ScrollTrigger/tweens — this was retrofitted project-wide in one pass after the `ui-ux-pro-max` skill flagged it as a gap (see §9). If you add a new animated component, follow the same pattern.

---

## 6. Motion inventory (quick reference)

| Effect | Where | Mechanism |
|---|---|---|
| Load-in reveal (labels/wordmark/blurb/badges) | Hero | `gsap.timeline` + `.from()`, no ScrollTrigger (fires on mount) |
| Cursor-tracked glitch spotlight | HeroGlitch | CSS `clip-path: circle()` driven by `--gx/--gy` custom props set on `pointermove`; GSAP jitter on `pointerenter` |
| Infinite marquee | Marquee ×2 | `gsap.to({xPercent:-50, repeat:-1})` on a duplicated track — no `@keyframes` |
| Scroll-scrubbed video | TheWalk | `ScrollTrigger` pin + `onUpdate` sets `video.currentTime` |
| Horizontal-scroll filmstrip | Manufacture | `ScrollTrigger` pin + `onUpdate`/tween sets track `x` |
| Grayscale→color hover reveal + lift | Halftone (used in Manufacture, Techniques) | Tailwind `group-hover:` on `filter` + `translate` |
| Sticky-left / scroll-right | Capabilities | **Native CSS** `position: sticky` (no GSAP needed for the pin itself) |
| Card-throw number animation | Capabilities | `gsap.fromTo` per `.cap-step`, alternating rotation/direction, `ScrollTrigger` per-element |
| Count-up numbers | Numbers | `gsap.to()` tweening a plain object + manual `textContent` writes |
| Typewriter character reveal | MissionVision (via Typewriter) | `gsap.to()` stagger over per-character spans |
| Adaptive nav color | Nav | `ScrollTrigger` enter/leave callbacks toggling React state, CSS `transition-colors` |
| Hover pop (links/buttons) | Nav, Manufacture, Contact, Footer | Pure CSS (`.pop-underline`, `.pop-btn`) — no JS |

**Zero CSS `@keyframes` are used for continuous/scroll motion** — confirmed by inspecting the real site's compiled CSS (it also had none) and matched here; the only `@keyframes` in the whole project is `tw-blink` for the typewriter cursor, which is a fixed, non-scroll-linked blink.

---

## 7. Generated media assets

Generated via the **Freepik MCP** (`images_generate`, `video_generate`, `creations_show`, `creations_wait`).

**Images** (`public/images/`) — all reviewed frame-by-frame before accepting:
- `manufacture/{oversized-tees,cut-sew-shirts,hoodies,bottoms,headwear}.jpg` — color editorial streetwear photography, `4:5` aspect
- `techniques/{cut-sew,screen-printing,dtg-printing,sublimation,embroidery}.jpg` — B&W industrial/documentary close-ups, `1:1` aspect

**Video** (`public/videos/the-walk.mp4`):
- 10s, 1280×720, h264, generated from a **single continuous prompt** (not the safer 4-shot `multi_prompt` alternative that was also drafted) describing one model walking toward camera through 4 match-cut wardrobe transitions (oversized tee → overshirt → hooded fleece → cargo set), fixed lighting/camera throughout.
- **This worked on the first attempt** — verified by extracting frames at ~0s/2.5s/5s/9.5s and confirming each of the 4 looks rendered correctly and in order. Single-prompt wardrobe-change video generation is generally unreliable (models are built for continuous motion, not costume changes) — if regenerating or extending this, know that this was a lucky/well-prompted success, not a guaranteed technique. The 4-shot `multi_prompt` structure (drafted earlier in the project's history but not the one actually used) is the safer fallback if a re-generation fails to produce clean transitions.

**Not generated / explicitly deferred:**
- Hero wordmark texture-fill images (the real site's `wm-fill` hover effect, which shows a garment-texture image through the letters via `background-clip: text`) — noted as a gap early on, never circled back to.
- A dedicated About-section factory photo.

---

## 8. Deliberate design decisions worth knowing (so you don't "fix" them by accident)

- **Lime (`--color-acid`) is never used as foreground text color on the light `paper` background** — contrast between `#d6ff00` and `#f4f4f0` is poor (both light colors). It's only ever used as: a `pop-btn` *background* (with ink text on top, always high-contrast), an underline accent, or as text color on **dark** backgrounds (Footer links, Manufacture's dark closing card, glitch overlay on Hero). If asked to add more lime accents, respect this rule.
- **Three pinned/scroll-jacked sections exist** (TheWalk, Manufacture, and Capabilities' sticky-left — though the last is native CSS sticky, not a GSAP pin): the `ui-ux-pro-max` skill's GSAP ruleset explicitly warns against pinning more than 1–2 sections per page for mobile UX reasons. This was flagged and *consciously not changed* — the real source site does the same thing, so it was treated as a deliberate style match rather than a bug.
- **No real photography for TheWalk was ever attempted as stills** — early in the project a pure-SVG line-draw morph was built as a stand-in (clearly flagged as "my simplification, not the real site's mechanic") before being fully replaced by generated video later. If you see any lingering references to SVG "garment sketch" content, it's fully superseded — `TheWalk.tsx` is 100% video now.
- **The Contact form has no backend by design** — don't add a fake API route "to complete it"; the `mailto:` approach was an explicit, discussed choice for a project with no server.
- **Halftone's grayscale-hover-reveal and Manufacture/Techniques' `group` classes are load-bearing** — removing `group` from a parent card breaks the hover effect silently (Tailwind `group-hover:` just won't fire, no error).

---

## 9. The `ui-ux-pro-max` skill

Installed project-locally at `.claude/skills/` (also includes `banner-design`, `brand`, `design`, `design-system`, `slides`, `ui-styling` — all bundled from the same marketplace repo, `github.com/nextlevelbuilder/ui-ux-pro-max-skill`).

**Security note for future reference**: before installing, the repo was cloned to a scratch dir and manually inspected (skill.json, plugin.json, all SKILL.md files, grepped for network/credential patterns) — confirmed to be local-only CSV/data search via a Python script, MIT licensed, no runtime network calls, no prompt-injection patterns. Safe.

**How it's used**: `python .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <domain>` (domains include `ux`, `gsap`, `typography`, `style`, `color`, `product`, `landing`, etc.), or `--design-system` for a full aggregated recommendation.

**What it actually caught in this project**: querying `--domain gsap` for scroll/pin patterns surfaced the `prefers-reduced-motion` gap described in §5/§8, which was then fixed everywhere. Its `--design-system` generic recommendation for "streetwear manufacturer" was tried and found **not useful** (it has no streetwear-specific category, defaulted to generic corporate navy/blue B2B styling) — that suggestion was explicitly discarded in favor of the already-established brand system.

---

## 10. Known gaps / explicitly deferred (not bugs — just not done)

- Hero wordmark texture-fill-on-scroll effect (see §7)
- Dedicated About-section photography
- Mobile hamburger menu (Nav's link row is `hidden md:flex` — no mobile nav drawer exists)
- No automated tests of any kind
- `npm run lint` was attempted once and hung on stdin in this shell environment (unrelated to code correctness — `tsc --noEmit` has been the verification method throughout, always clean)
- `.claude/skills/` additions beyond `ui-ux-pro-max` itself (`banner-design`, `brand`, `design-system`, `slides`, `ui-styling`) were installed as part of the same marketplace bundle but never actually used — they came along for free, not vetted individually beyond the top-level safety check

---

## 11. Verification method used throughout

No visual screenshots were possible in the working environment (the Browser pane tool consistently returned "not displayed, so the page is not compositing frames" for `computer.screenshot`). Every change was instead verified via:
1. `npx tsc --noEmit` (must be clean before considering anything done)
2. `mcp__Claude_Browser__get_page_text` / `javascript_tool` — checking rendered DOM content, computed styles, and specific CSS property values (e.g., confirming `clip-path` resolves correctly, confirming `grayscale(1)` is applied, confirming ScrollTrigger elements exist)
3. Direct `curl` checks that `/_next/image` and video routes return 200 with real payload sizes

If you have working screenshot capability in your session, use it — it wasn't a design choice to skip visual QA, it was an environment limitation.

---

## 12. If continuing this project, good next questions to ask the user

- Do you want the hero wm-fill texture effect built now?
- Mobile nav — is the current "links just disappear below `md`" acceptable, or do you want a drawer/hamburger?
- Any interest in the `multi_prompt` 4-shot video regeneration as a more robust version of TheWalk's video, or is the current single-prompt result good enough?
- Deploy target — still "local dev only" per the original scoping conversation, or ready for Vercel now?
