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
  const textRef = useRef<HTMLHeadingElement>(null);
  const langRef = useRef<HTMLSpanElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onReady(true);
      return;
    }

    let alive = true;
    const bar = layer.current?.querySelector(".loader-fill");
    const totalItems = greetings.length;
    let step = 0;

    // Timeline for progress bar
    const progressTween = gsap.to(bar ?? null, {
      scaleX: 0.95,
      duration: 2.7,
      ease: "power1.inOut",
    });

    const interval = setInterval(() => {
      if (!alive) return;
      step++;
      if (step < totalItems) {
        // Quick subtle fade transition for words
        if (textRef.current) {
          gsap.fromTo(
            textRef.current,
            { opacity: 0, y: 8, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.22, ease: "power2.out" }
          );
        }
        setCurrentIdx(step);
      } else {
        clearInterval(interval);
        // Completed - hold Welcome briefly then slide curtain away
        progressTween.kill();
        gsap
          .timeline({
            onComplete: () => {
              if (alive) onReady(true);
            },
          })
          .to(bar ?? null, { scaleX: 1, duration: 0.18 })
          .to(textRef.current, { scale: 1.06, opacity: 0.85, duration: 0.3, ease: "power2.out" }, "-=0.08")
          .to(layer.current, {
            yPercent: -100,
            duration: 0.65,
            ease: "expo.inOut",
          });
      }
    }, 290);

    return () => {
      alive = false;
      clearInterval(interval);
      progressTween.kill();
    };
  }, [onReady]);

  const current = greetings[currentIdx];

  return (
    <div ref={layer} className="brand-loader" aria-hidden="true">
      <div className="loader-inner">
        <div className="loader-greeting-box">
          <span className="loader-lang mono" ref={langRef}>
            {current.lang.toUpperCase()}
          </span>
          <h1 className="loader-greeting-text" ref={textRef}>
            {current.text}
          </h1>
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
