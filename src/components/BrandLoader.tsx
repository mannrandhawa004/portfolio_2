import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const greetings = [
  { text: "Hello", lang: "English" },
  { text: "Bonjour", lang: "French" },
  { text: "Hola", lang: "Spanish" },
  { text: "こんにちは", lang: "Japanese" },
  { text: "안녕하세요", lang: "Korean" },
  { text: "Ciao", lang: "Italian" },
  { text: "नमस्ते", lang: "Hindi" },
  { text: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ", lang: "Punjabi" },
  { text: "Welcome", lang: "Ready" },
];

export default function BrandLoader({ onReady }: { onReady: (ready: boolean) => void }) {
  const layer = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onReady(true);
      return;
    }

    // One scoped timeline owns all animations, including unmount/StrictMode cleanup.
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ onComplete: () => onReady(true) });
      timeline.to(".loader-fill", { scaleX: 0.95, duration: 2.61, ease: "power1.inOut" }, 0);

      greetings.forEach((_, index) => {
        if (index === 0) return;
        const at = index * 0.29;
        timeline.call(() => setCurrentIdx(index), [], at);
        timeline.fromTo(textRef.current,
          { opacity: 0, y: 8, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.22, ease: "power2.out", immediateRender: false },
          at
        );
      });

      timeline
        .to(".loader-fill", { scaleX: 1, duration: 0.18 })
        .to(textRef.current, { scale: 1.06, opacity: 0.85, duration: 0.3, ease: "power2.out" }, "-=0.08")
        .to(layer.current, { yPercent: -100, duration: 0.65, ease: "expo.inOut" });
    }, layer);

    return () => context.revert();
  }, [onReady]);

  const current = greetings[currentIdx];

  return (
    <div ref={layer} className="brand-loader" aria-hidden="true">
      <div className="loader-inner">
        <div className="loader-greeting-box">
          <span className="loader-lang mono">
            {current.lang.toUpperCase()}
          </span>
          <span className="loader-greeting-text" ref={textRef}>
            {current.text}
          </span>
        </div>

        <div className="loader-track">
          <span className="loader-fill" />
        </div>

        <div className="loader-meta mono">
          <span>MANPREET SINGH — PORTFOLIO</span>
          <span>
            {String(currentIdx + 1).padStart(2, "0")} / {String(greetings.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
