import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Premium 2D rectangular ribbon.
 *
 * - Single meandering path anchored at the top-right of the page (hero area).
 * - Rectangular geometry (butt caps + miter joins).
 * - Two stacked strokes: a soft glow underlay + a crisp gradient body.
 * - Carries the same repeating headline text as the marquee section,
 *   set in the same display typeface/style, running along the ribbon.
 * - Reveals via stroke-dashoffset scrubbed against full-page scroll — the
 *   text is masked so it only appears on the portion of ribbon already
 *   drawn, starting once the ribbon flows past the hero.
 * - Sits at z-[5] so all content (z-[10]+) stays clearly above it.
 */

/** Shared with the marquee section so both display identical copy. */
export const MARQUEE_WORDS = [
  "Human spark",
  "Machine scale",
  "New visions",
  "Made to move",
  "Pixel deep",
  "Art redefined",
];

const PATH_D = `
  M 1400 0
  C 1300 100, 1000 100, 800 300
  C 600 500, 900 700, 1100 600
  C 1300 500, 1200 300, 700 800
  C 200 1300, 500 1600, 300 2000
  C 100 2400, 400 2800, 200 3200
`;

/** Repeat the phrase enough times to run the full length of the path. */
const RIBBON_TEXT = Array(24)
  .fill(MARQUEE_WORDS.map((w) => w.toUpperCase()).join("  ✦  "))
  .join("  ✦  ");

/** Path length (approx, in hero-area units) skipped so the text only
 *  appears once the ribbon has flowed past the hero section. */
const TEXT_START_OFFSET = 620;

export default function ScrollRibbon() {
  const glowRef = useRef<SVGPathElement>(null);
  const bodyRef = useRef<SVGPathElement>(null);
  const textMaskRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const glow = glowRef.current;
    const body = bodyRef.current;
    const textMask = textMaskRef.current;
    if (!glow || !body || !textMask) return;

    const length = body.getTotalLength();

    gsap.set([glow, body, textMask], { strokeDasharray: length, strokeDashoffset: length });

    gsap.to([glow, body, textMask], {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: "max",
        scrub: 0.5,
      },
    });
  }, []);

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] h-full w-full"
      viewBox="0 0 1500 3500"
      preserveAspectRatio="xMidYMin slice"
    >
      <defs>
        <linearGradient id="ribbon-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eaff4a" />
          <stop offset="50%" stopColor="#dfff00" />
          <stop offset="100%" stopColor="#c3dc00" />
        </linearGradient>
        <filter id="ribbon-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="26" />
        </filter>

        {/* Invisible layout path used purely to run the marquee text along */}
        <path id="ribbon-text-layout" d={PATH_D} fill="none" />

        {/* Mask: only shows the text where the ribbon has been drawn */}
        <mask id="ribbon-text-mask" maskUnits="userSpaceOnUse">
          <path
            ref={textMaskRef}
            d={PATH_D}
            fill="none"
            stroke="#ffffff"
            strokeWidth="60"
            strokeLinecap="butt"
            strokeLinejoin="miter"
          />
        </mask>
      </defs>

      {/* Soft ambient glow underlay */}
      <path
        ref={glowRef}
        d={PATH_D}
        fill="none"
        stroke="#dfff00"
        strokeWidth="90"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        filter="url(#ribbon-soft)"
        className="opacity-25"
      />

      {/* Crisp rectangular ribbon body */}
      <path
        ref={bodyRef}
        d={PATH_D}
        fill="none"
        stroke="url(#ribbon-body)"
        strokeWidth="60"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        className="opacity-70"
      />

      {/* Marquee-style headline text running along the ribbon, revealed
          only on the drawn portion, starting after the hero section. */}
      <text
        mask="url(#ribbon-text-mask)"
        fill="#111111"
        fontFamily="Anton, Impact, 'Arial Black', sans-serif"
        fontSize="30"
        letterSpacing="0.5"
        style={{ textTransform: "uppercase" }}
        dy="10"
      >
        <textPath href="#ribbon-text-layout" startOffset={TEXT_START_OFFSET}>
          {RIBBON_TEXT}
        </textPath>
      </text>
    </svg>
  );
}
