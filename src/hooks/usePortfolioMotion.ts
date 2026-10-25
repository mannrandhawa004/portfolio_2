import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Enhanced motion hook supporting:
 * 1. Project workbench entrance and depth with smooth scroll parallax
 * 2. Layered project reveals and an unpinned interlude
 * 3. Smooth Lenis scrolling & section tracking
 */
export function usePortfolioMotion(
  root: RefObject<HTMLDivElement | null>,
  still: boolean,
  ready: boolean,
  dialogOpen: boolean,
  onSection: (id: string) => void
) {
  const scroller = useRef<Lenis | null>(null);
  const introduced = useRef(false);

  useEffect(() => {
    const media = gsap.matchMedia();
    if (!still) {
      media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const lenis = new Lenis({
          lerp: 0.12,
          smoothWheel: true,
          syncTouch: false,
        });
        scroller.current = lenis;

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        const visibility = () => (document.hidden ? gsap.ticker.remove(tick) : gsap.ticker.add(tick));
        document.addEventListener("visibilitychange", visibility);

        return () => {
          document.removeEventListener("visibilitychange", visibility);
          gsap.ticker.remove(tick);
          lenis.destroy();
          scroller.current = null;
        };
      });
    }

    const navigate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || anchor.hasAttribute("download") || anchor.target === "_blank") return;
      const target = document.getElementById(anchor.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      if (window.location.hash !== anchor.hash) history.pushState(null, "", anchor.hash);
      const focus = () => {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      };
      requestAnimationFrame(() => {
        scroller.current?.start();
        if (scroller.current) scroller.current.scrollTo(target, { offset: -96, duration: 0.8, onComplete: focus });
        else {
          target.scrollIntoView({ behavior: still ? "instant" : "smooth" });
          focus();
        }
      });
    };
    document.addEventListener("click", navigate);
    return () => {
      document.removeEventListener("click", navigate);
      media.revert();
    };
  }, [still]);

  useEffect(() => {
    if (dialogOpen) scroller.current?.stop();
    else scroller.current?.start();
  }, [dialogOpen, still]);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>("main > section[id]");
      sections.forEach((section) =>
        ScrollTrigger.create({
          trigger: section,
          start: "top 36%",
          end: "bottom 36%",
          onEnter: () => onSection(section.id),
          onEnterBack: () => onSection(section.id),
        })
      );
      ScrollTrigger.create({
        start: 32,
        end: "max",
        onToggle: (self) => root.current?.classList.toggle("has-scrolled", self.isActive),
      });
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const progress = root.current?.querySelector<HTMLElement>(".page-progress");
          if (progress) progress.style.transform = `scaleX(${self.progress})`;
        },
      });

      if (still) return;

      // Reveal elements
      gsap.utils.toArray<HTMLElement>("[data-enter]").forEach((element) => {
        gsap.from(element, {
          y: 24,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: { trigger: element, start: "top 94%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".work-item").forEach((item, index) => {
        const stage = item.querySelector<HTMLElement>(".project-stage, .project-stage-canvas");
        const link = root.current?.querySelector(`[data-project-link="${item.id.replace("project-", "")}"]`);
        ScrollTrigger.create({ trigger: item, start: "top 65%", end: "bottom 35%", onToggle: self => {
          item.classList.toggle("is-active", self.isActive);
          link?.classList.toggle("is-active", self.isActive);
        } });
        if (stage) gsap.from(item, { opacity: 0, y: 40, duration: .85, delay: index % 2 ? .1 : 0, ease: "power3.out", clearProps: "opacity,transform",
          scrollTrigger: { trigger: item, start: "top 95%", once: true } });
      });
      const media = gsap.matchMedia();
      media.add("(min-width: 801px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.to(".intro", { y: -40, ease: "none",
          scrollTrigger: { trigger: ".intro-shell", start: "top top", end: "bottom 15%", scrub: .6 } });
        gsap.to(".hero-shader-bg", { yPercent: 12, ease: "none",
          scrollTrigger: { trigger: ".intro-shell", start: "top top", end: "bottom top", scrub: .7 } });
        gsap.utils.toArray<HTMLElement>(".project-stage, .project-stage-canvas").forEach((stage) => {
          const shell = stage.querySelector<HTMLElement>(".screen-shell, .browser-window");
          if (shell) {
            gsap.fromTo(shell, { y: 16 },
              { y: -16, ease: "none",
                scrollTrigger: { trigger: stage, start: "top bottom", end: "bottom 15%", scrub: .8 } });
          }
          const word = stage.querySelector<HTMLElement>(".stage-word");
          if (word) {
            gsap.fromTo(word, { y: 26 },
              { y: -26, ease: "none",
                scrollTrigger: { trigger: stage, start: "top bottom", end: "bottom top", scrub: .6 } });
          }
        });
        // The interlude moves with the document, without pinning an empty gap.
        gsap.to(".philosophy-type", { x: () => -Math.max(0, (root.current?.querySelector<HTMLElement>(".philosophy-type")?.scrollWidth ?? 0) - window.innerWidth + 40), ease: "none",
          scrollTrigger: { trigger: ".philosophy", start: "top bottom", end: "bottom top", scrub: .5, invalidateOnRefresh: true } });
      });

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, [root, still, onSection]);

  useLayoutEffect(() => {
    if (!ready || still || introduced.current) return;
    const context = gsap.context(() => {
      const intro = gsap.timeline({
        onComplete: () => {
          introduced.current = true;
          ScrollTrigger.refresh();
        },
      });
      intro
        .from(".hero-status-pill", { y: -12, opacity: 0, duration: 0.6, ease: "power3.out", clearProps: "all" }, 0.05)
        .from(".intro-title-line > span", {
          yPercent: 105,
          duration: 0.95,
          stagger: 0.1,
          ease: "power4.out",
          clearProps: "all",
        }, 0.12)
        .from(".hero-bio", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "all" }, 0.28)
        .from(".hero-stack-row", { y: 15, opacity: 0, duration: 0.7, ease: "power3.out", clearProps: "all" }, 0.38)
        .from(".hero-actions", { y: 20, opacity: 0, duration: 0.75, ease: "power3.out", clearProps: "all" }, 0.45)
        .from(".intro-bottom", { y: 15, opacity: 0, duration: 0.7, ease: "power3.out", clearProps: "all" }, 0.52);
    }, root);

    let alive = true;
    document.fonts.ready.then(() => { if (alive) ScrollTrigger.refresh(); });
    return () => { alive = false; context.revert(); };
  }, [root, ready, still]);

  useEffect(() => {
    if (still) return;
    const media = gsap.matchMedia();
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const cleanups = Array.from(root.current?.querySelectorAll<HTMLElement>("[data-depth]") ?? []).map((element) => {
        const target = element.querySelector<HTMLElement>("[data-depth-target]") ?? element;
        const rotateX = gsap.quickTo(target, "rotationX", { duration: 0.6, ease: "power3.out" });
        const rotateY = gsap.quickTo(target, "rotationY", { duration: 0.6, ease: "power3.out" });
        let bounds: DOMRect | null = null;
        const enter = () => {
          bounds = element.getBoundingClientRect();
        };
        const move = (event: PointerEvent) => {
          if (event.pointerType !== "mouse" || !bounds) return;
          const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
          const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
          rotateX((0.5 - y) * 6);
          rotateY((x - 0.5) * 8);
          element.style.setProperty("--light-x", `${x * 100}%`);
          element.style.setProperty("--light-y", `${y * 100}%`);
        };
        const leave = () => {
          rotateX(0);
          rotateY(0);
          bounds = null;
        };
        element.addEventListener("pointerenter", enter);
        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", leave);
        return () => {
          element.removeEventListener("pointerenter", enter);
          element.removeEventListener("pointermove", move);
          element.removeEventListener("pointerleave", leave);
          rotateX.tween.kill();
          rotateY.tween.kill();
          gsap.set(target, { clearProps: "transform" });
        };
      });
      return () => cleanups.forEach((cleanup) => cleanup());
    });
    return () => media.revert();
  }, [root, still]);
}
