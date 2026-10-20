import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContributionSkyline from "@/components/ui/contribution-skyline";
import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer";
import GlassFolder from "@/components/ui/glass-folder-cards";
import resume_builder from "../public/images/resume_builder.png";
import scatch from "../public/images/scatch.png";
import task_management from "../public/images/task_management.png";

gsap.registerPlugin(ScrollTrigger);

type IconName =
  | "arrow"
  | "github"
  | "linkedin"
  | "mail"
  | "download"
  | "menu"
  | "close"
  | "copy"
  | "check"
  | "external";

const links = {
  github: "https://github.com/mannrandhawa004",
  linkedin: "https://www.linkedin.com/in/manpreet-singh-27099b280/",
  email: "mailto:randhawamanpreet37@gmail.com",
};

const footerColumns = [
  {
    title: "Navigation",
    links: [
      { label: "Work", href: "#work" },
      { label: "Expertise", href: "#expertise" },
      { label: "Activity", href: "#activity" },
      { label: "Experience", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Featured",
    links: [
      { label: "Taskflow (SaaS)", href: "https://github.com/mannrandhawa004/task_management_system" },
      { label: "Scatch (E-Commerce)", href: "https://github.com/mannrandhawa004/scatch" },
      { label: "Resume AI", href: "https://github.com/mannrandhawa004" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub ↗", href: links.github },
      { label: "LinkedIn ↗", href: links.linkedin },
      { label: "Email Directly ↗", href: links.email },
    ],
  },
];

const projects = [
  {
    number: "01",
    title: "Taskflow",
    eyebrow: "Enterprise Multi-Tenant SaaS",
    description:
      "A workspace for teams to manage projects, departments, and attendance. Built with tenant isolation, role-based access, two-factor authentication, real-time updates, and integrated billing.",
    tags: ["Next.js", "Node.js", "MySQL", "Socket.IO", "Redis", "Stripe", "Razorpay", "2FA / TOTP", "Tailwind CSS", "Redux Toolkit"],
    github: "https://github.com/mannrandhawa004/task_management_system",
    live: "https://github.com/mannrandhawa004/task_management_system",
    displayUrl: "github.com/mannrandhawa004/task_management_system",
    isLiveDemo: false,
    className: "project-starsync",
    image: task_management,
    metric: "Multi-Tenant RBAC · 2FA",
  },
  {
    number: "02",
    title: "AI Resume Builder",
    eyebrow: "AI-Powered Document Engine",
    description:
      "An AI-powered workspace for building résumés, with live previews, ATS-friendly templates, and instant PDF export. From a blank page to a document ready to share.",
    tags: ["React", "GenAI Integration", "Node.js", "Tailwind CSS", "PDF Engine", "Redux Toolkit"],
    github: "https://github.com/mannrandhawa004/ai-resume-builder",
    live: "https://ai-resume-builder-beta-pink.vercel.app",
    displayUrl: "ai-resume-builder-beta-pink.vercel.app",
    isLiveDemo: true,
    className: "project-resume",
    image: resume_builder,
    metric: "Instant ATS Preview · PDF Export",
  },
  {
    number: "03",
    title: "Scatch",
    eyebrow: "Full-Stack Commerce Engine",
    description:
      "An e-commerce application with product discovery, persistent carts, Google sign-in, and Stripe checkout. Built around a secure shopping flow, from browsing to payment.",
    tags: ["MERN Stack", "Google OAuth", "JWT", "Stripe API", "Webhooks", "Tailwind CSS"],
    github: "https://github.com/mannrandhawa004/scatch",
    live: "https://scatch-bice.vercel.app",
    displayUrl: "scatch-bice.vercel.app",
    isLiveDemo: true,
    className: "project-scatch",
    image: scatch,
    metric: "Stripe Webhooks · Secure Auth",
  },
];

const services = [
  {
    number: "01",
    title: "Full-stack products",
    body: "Scalable React and Next.js interfaces connected to high-throughput Node.js APIs and thoughtfully modeled relational and document databases.",
    tech: "React · Next.js · Node.js · Express · MongoDB · MySQL",
  },
  {
    number: "02",
    title: "GenAI experiences",
    body: "Useful AI capabilities grounded in user workflows—from structured prompt pipelines to LLM document generation and intelligent agents.",
    tech: "LangChain · OpenAI / Claude APIs · Python · Vector Search",
  },
  {
    number: "03",
    title: "Real-time systems",
    body: "Responsive architectures for live collaboration, instantaneous notifications, and events that feel immediate to the end user.",
    tech: "Socket.IO · WebSockets · Webhooks · Redis Pub/Sub",
  },
  {
    number: "04",
    title: "Secure integrations",
    body: "Authentication and payment gateways implemented with production-grade defense, rate limiting, and reliable webhook verification.",
    tech: "OAuth 2.0 · JWT · TOTP 2FA · Stripe · Razorpay",
  },
];

const experience = [
  {
    date: "March 2026 — Present",
    role: "Full-Stack Developer",
    company: "Fresco Web Services",
    location: "Mohali, India",
    body: "Architecting and shipping responsive MERN web applications. Developing production-ready RESTful APIs in Express and Node.js with MongoDB database optimization, implementing JWT session security, and collaborating with cross-functional teams to accelerate feature delivery cycles.",
  },
  {
    date: "Jul 2025 — Jan 2026",
    role: "Full-Stack Web Development Trainee",
    company: "Antier School of Blocktech",
    location: "Mohali, India",
    body: "Engineered scalable end-to-end full-stack modules. Designed secure role-based authentication flows, normalized relational and NoSQL database schemas, and integrated predictable client state management using Redux Toolkit.",
  },
];

const stackGroups = [
  { label: "Frontend", note: "Interfaces that feel fast, clear, and alive.", items: ["React.js", "Next.js", "Redux Toolkit", "Tailwind CSS", "GSAP", "TypeScript", "HTML5 / CSS3"] },
  { label: "Backend", note: "APIs and services designed to scale cleanly.", items: ["Node.js", "Express.js", "REST APIs", "Socket.IO", "Webhooks", "Redis", "JWT Auth"] },
  { label: "AI & Data", note: "Intelligence grounded in useful product flows.", items: ["LangChain", "LLM APIs", "Python", "MongoDB", "MySQL"] },
  { label: "Workflow & Cloud", note: "From local build to reliable deployment.", items: ["Git / GitHub", "Postman", "Vercel", "Render", "Azure"] },
];

function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const common = { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8 };
  if (name === "arrow") return <svg {...common} aria-hidden="true"><path d="M5 19 19 5M8 5h11v11" /></svg>;
  if (name === "mail") return <svg {...common} aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
  if (name === "download") return <svg {...common} aria-hidden="true"><path d="M12 3v12m0 0 5-5m-5 5-5-5M4 20h16" /></svg>;
  if (name === "menu") return <svg {...common} aria-hidden="true"><path d="M4 7h16M4 17h16" /></svg>;
  if (name === "close") return <svg {...common} aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" /></svg>;
  if (name === "linkedin") return <svg {...common} aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>;
  if (name === "copy") return <svg {...common} aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>;
  if (name === "check") return <svg {...common} aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>;
  if (name === "external") return <svg {...common} aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" /></svg>;
  return <svg {...common} aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.3 4 5 5 0 0 0 19.2.5S18 0 15 1.9a13.4 13.4 0 0 0-7 0C5 .1 3.8.5 3.8.5A5 5 0 0 0 3.7 4a5.4 5.4 0 0 0-1.5 3.7c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4" /></svg>;
}

export default function App() {
  const rootRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
      setIsScrolled(window.scrollY > 20);

      const sections = ["work", "vault", "expertise", "activity", "about", "contact"];
      const scrollPos = window.scrollY + 180;
      let current = "";
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            current = sectionId;
          }
        }
      }
      setActiveSection(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const menu = document.getElementById("mobile-navigation");
    const controls = menu?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    document.body.style.overflow = "hidden";
    controls?.[0]?.focus();

    const handleMenuKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
      }
      if (event.key !== "Tab" || !controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleMenuKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleMenuKey);
      previousFocus?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  useLayoutEffect(() => {
    if (!rootRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from("[data-nav]", { y: -20, opacity: 0, duration: 0.7 })
        .from("[data-hero-kicker]", { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
        .from("[data-hero-word]", { yPercent: 110, rotate: 2, duration: 1.15, stagger: 0.08, ease: "expo.out" }, "-=0.2")
        .from("[data-hero-copy]", { y: 24, opacity: 0, duration: 0.8 }, "-=0.55")
        .from("[data-hero-profile]", { y: 24, opacity: 0, duration: 0.8 }, "-=0.7");

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 50,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%" },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("randhawamanpreet37@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      // fallback
    }
  };

  const handleContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setFormStatus("sending");

    try {
      const response = await fetch("https://formsubmit.co/ajax/randhawamanpreet37@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error("Message delivery failed");
      form.reset();
      setFormStatus("sent");
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <>
      <main ref={rootRef} className="site-shell">
        {/* Floating Dock Navigation */}
        <header className="floating-dock-container" data-nav>
          <div className="floating-dock">
            {/* Embedded Dock Progress Bar */}
            <div className="dock-progress-track">
              <div
                className="dock-progress-fill"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>

            {/* Brand Item */}
            <a href="#top" className="dock-brand" aria-label="Manpreet Singh home" title="Manpreet Singh · Full-Stack & GenAI Engineer">
              <span className="dock-avatar">
                <span>MS</span>
                <span className="dock-pulse-dot" aria-hidden="true" />
              </span>
              <span className="dock-brand-info">
                <span className="dock-brand-name">Manpreet</span>
                <span className="dock-status-tag">Available</span>
              </span>
            </a>

            <span className="dock-divider" aria-hidden="true" />

            {/* Center Nav Links */}
            <nav className="dock-links" aria-label="Main navigation">
              <a href="#work" className={`dock-link ${activeSection === "work" ? "is-active" : ""}`}>
                <span>Work</span>
              </a>
              <a href="#vault" className={`dock-link ${activeSection === "vault" ? "is-active" : ""}`}>
                <span>Vault</span>
              </a>
              <a href="#expertise" className={`dock-link ${activeSection === "expertise" ? "is-active" : ""}`}>
                <span>Expertise</span>
              </a>
              <a href="#activity" className={`dock-link ${activeSection === "activity" ? "is-active" : ""}`}>
                <span>Activity</span>
              </a>
              <a href="#about" className={`dock-link ${activeSection === "about" ? "is-active" : ""}`}>
                <span>About</span>
              </a>
            </nav>

            <span className="dock-divider" aria-hidden="true" />

            {/* Action CTA & Mobile Menu Trigger */}
            <div className="dock-actions">
              <a href="#contact" className="dock-cta">
                <span>Let's talk</span>
                <Icon name="arrow" />
              </a>
              <button
                className="dock-menu-btn"
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
              >
                <Icon name="menu" />
              </button>
            </div>
          </div>
        </header>

        {menuOpen && (
          <div id="mobile-navigation" className="mobile-menu portfolio-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
            <div className="mobile-menu-header">
              <div className="mobile-brand">
                <span className="brand-mark">MS</span>
                <span className="brand-copy">
                  Manpreet Singh
                  <small>Full-Stack &amp; GenAI</small>
                </span>
              </div>
              <button className="menu-close" type="button" onClick={closeMenu} aria-label="Close menu">
                <Icon name="close" />
              </button>
            </div>
            <div className="mobile-menu-links">
              <a href="#work" onClick={closeMenu}>
                <span>Work</span>
                <span className="mobile-menu-index">01</span>
              </a>
              <a href="#vault" onClick={closeMenu}>
                <span>Vault</span>
                <span className="mobile-menu-index">02</span>
              </a>
              <a href="#expertise" onClick={closeMenu}>
                <span>Expertise</span>
                <span className="mobile-menu-index">03</span>
              </a>
              <a href="#activity" onClick={closeMenu}>
                <span>Activity</span>
                <span className="mobile-menu-index">04</span>
              </a>
              <a href="#about" onClick={closeMenu}>
                <span>About</span>
                <span className="mobile-menu-index">05</span>
              </a>
              <a href="#contact" onClick={closeMenu}>
                <span>Contact</span>
                <span className="mobile-menu-index">06</span>
              </a>
            </div>
            <div className="mobile-menu-footer">
              <a href="#contact" onClick={closeMenu} className="pill pill-accent mobile-cta">
                Let's talk <Icon name="arrow" />
              </a>
              <p>Mohali, Punjab · Available for Full-Time &amp; Contracts</p>
            </div>
          </div>
        )}

        <header id="top" className="p-hero p-container">
          <div className="p-hero-top" data-hero-kicker>
            <span className="p-eyebrow">Developer. Builder. Always learning.</span>
            <span className="p-available"><i aria-hidden="true" /> Open to opportunities</span>
          </div>
          <div className="p-hero-grid">
            <div className="p-hero-identity">
              <p className="p-hello" data-hero-copy>Hey, I'm</p>
              <h1 className="p-name">
                <span className="p-name-line"><span data-hero-word>Manpreet</span></span>
                <span className="p-name-line"><span data-hero-word className="p-name-serif">Singh.</span></span>
              </h1>
            </div>
            <div className="p-hero-profile" data-hero-profile>
              <span className="p-role-label">Full-stack & GenAI Engineer</span>
              <h2>I build for the web.<br /><span>And the people using it.</span></h2>
              <p>I'm a developer based in Mohali, India, turning ideas into useful web applications. I work across interfaces, backend systems, and applied AI.</p>
              <div className="p-hero-actions">
                <a href="#work" className="p-button">Explore my work <Icon name="arrow" /></a>
                <a href="/resume.pdf" className="p-resume" download="Manpreet_Singh_Resume.pdf">My résumé <Icon name="download" /></a>
              </div>
              <div className="p-current"><span className="p-current-mark" aria-hidden="true">↳</span><div>Currently building at<strong>Fresco Web Services</strong></div></div>
            </div>
          </div>
          <div className="p-hero-bottom">
            <div className="p-hero-links">
              <a href={links.github} target="_blank" rel="noreferrer">GitHub <Icon name="arrow" /></a>
              <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn <Icon name="arrow" /></a>
              <a href={links.email}>Email <Icon name="arrow" /></a>
            </div>
            <a className="p-scroll-link" href="#work">A selection of my work <span aria-hidden="true">↓</span></a>
          </div>
        </header>

        <section id="work" className="p-section p-work p-container">
          <div className="p-section-heading" data-reveal>
            <div><p className="p-eyebrow">01 / Selected work</p><h2>Ideas made <em>real.</em></h2></div>
            <p>A few projects I've taken from idea to implementation. Each one taught me something new.</p>
          </div>
          <div className="p-project-grid">
            {projects.map((project) => (
              <article id={`project-${project.number}`} className={`p-project p-project-${project.number}`} key={project.title} data-reveal>
                <a className="p-project-image" href={project.live} target="_blank" rel="noreferrer" aria-label={`View ${project.title} ${project.isLiveDemo ? "live demo" : "repository"}`}>
                  <div className="p-project-image-meta"><span>{project.number} / {project.isLiveDemo ? "Live project" : "Featured build"}</span><Icon name="arrow" /></div>
                  <div className="p-project-browser">
                    <div className="p-browser-top"><span /><span /><span /><small>{project.title}</small></div>
                    <img src={project.image} alt={`${project.title} application screenshot`} loading="lazy" />
                  </div>
                </a>
                <div className="p-project-content">
                  <p className="p-eyebrow">{project.eyebrow}</p>
                  <h3>{project.title}</h3>
                  <p className="p-project-description">{project.description}</p>
                  <ul className="p-tags" aria-label={`${project.title} technologies`}>
                    {project.tags.slice(0, 5).map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <div className="p-project-links">
                    {project.isLiveDemo && <a href={project.live} target="_blank" rel="noreferrer">View live <Icon name="arrow" /></a>}
                    <a href={project.github} target="_blank" rel="noreferrer">Source code <Icon name="github" /></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <a className="p-all-projects" href={links.github} target="_blank" rel="noreferrer">More experiments & projects on GitHub <Icon name="arrow" /></a>
        </section>

        <section id="vault" className="section section-vault wrap">
          <div className="section-heading" data-reveal>
            <div><span className="section-no">02</span><p>Tactile Vault</p></div>
            <h2>Interactive archives.<br /><em>Explore what I ship.</em></h2>
            <p className="section-intro">Three real layered frosted glass containers holding production systems, UI prototypes, and credentials. Hover to lean forward, click to fan out the files.</p>
          </div>

          <div className="vault-folders-container" data-reveal>
            <GlassFolder
              label="Projects"
              meta="3 Shipped Apps"
              tone="light"
              art="ember"
              seed={7}
              action="more"
              appearDelay={0}
              files={[
                { name: "Taskflow (SaaS)", meta: "Next.js · Node.js · 2FA", art: "aurora", href: "https://github.com/mannrandhawa004/task_management_system" },
                { name: "Scatch E-Commerce", meta: "MERN · Stripe · JWT", art: "ember", href: "https://github.com/mannrandhawa004/scatch" },
                { name: "Resume Builder AI", meta: "LangChain · GenAI", art: "dusk", href: "https://github.com/mannrandhawa004" },
              ]}
              menu={[
                { label: "View All GitHub Repos", onSelect: () => window.open(links.github, "_blank") },
                { label: "Scroll to Project Details", onSelect: () => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }) },
              ]}
            />

            <GlassFolder
              label="Frontend Design"
              meta="4 Interactive Labs"
              tone="light"
              art="aurora"
              seed={15}
              action="add"
              labelPlacement="top-left"
              appearDelay={140}
              files={[
                { name: "Halftone Canvas Wordmark", meta: "Spring Physics Engine", art: "ember" },
                { name: "3D Contribution Skyline", meta: "Isometric Matrix Canvas", art: "verdant" },
                { name: "View Transition Ripples", meta: "CSS clip-path morph", art: "glacier" },
                { name: "GSAP Kinetic Scroll", meta: "GPU Accelerated Motion", art: "aurora" },
              ]}
              onAdd={(existing) => ({
                name: "Interactive Experiment " + (existing.length + 1),
                meta: "Just compiled",
                art: "dusk",
              })}
            />

            <GlassFolder
              label="Résumé & Credentials"
              meta="Verified Documents"
              tone="light"
              art="verdant"
              seed={23}
              action="more"
              labelPlacement="top-right"
              appearDelay={280}
              files={[
                { name: "Manpreet_Singh_Resume.pdf", meta: "Full-Stack & GenAI Engineer", href: "/resume.pdf" },
                { name: "BCA Degree (CGPA 7.5)", meta: "Global Group of Institutes", href: "#about" },
                { name: "Antier Blocktech Cert", meta: "Full-Stack Web Dev Trainee", href: "#about" },
              ]}
              menu={[
                {
                  label: "Download Résumé (PDF)",
                  onSelect: () => {
                    const a = document.createElement("a");
                    a.href = "/resume.pdf";
                    a.download = "Manpreet_Singh_Resume.pdf";
                    a.click();
                  },
                },
                { label: "View Experience Timeline", onSelect: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) },
              ]}
            />
          </div>
          <p className="vault-hint">
            Hover folder to lean · Click to fan open · Click any file to view
          </p>
        </section>

        <section id="expertise" className="p-section p-expertise">
          <div className="p-container">
            <div className="p-section-heading" data-reveal>
              <div><p className="p-eyebrow">03 / My toolkit</p><h2>From the interface<br />to <em>what powers it.</em></h2></div>
              <p>I enjoy connecting the pieces: a thoughtful interface, a reliable backend, and the right tools for the problem.</p>
            </div>
            <div className="p-capabilities">
              {services.map((service) => (
                <article className="p-capability" key={service.number} data-reveal>
                  <span className="p-capability-number">{service.number}</span>
                  <h3>{service.title}</h3>
                  <div><p>{service.body}</p><small>{service.tech}</small></div>
                </article>
              ))}
            </div>
            <div className="p-tools-heading" data-reveal><h3>The tools I reach for.</h3><p>A practical stack, always evolving.</p></div>
            <div className="p-tools">
              {stackGroups.map((group, index) => (
                <article className="p-tool-group" key={group.label} data-reveal>
                  <span className="p-tool-index">0{index + 1}</span>
                  <h4>{group.label}</h4>
                  <p>{group.note}</p>
                  <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="activity" className="section section-activity wrap">
          <div className="section-heading" data-reveal>
            <div><span className="section-no">04</span><p>Commitment</p></div>
            <h2>Continuous shipping.<br /><em>Engineering skyline.</em></h2>
            <p className="section-intro">An interactive 3D activity skyline tracking daily code velocity, continuous releases, and open-source contributions.</p>
          </div>

          <div className="activity-card-wrap" data-reveal>
            <div className="activity-toolbar">
              <div className="activity-badge">
                <span className="status-dot" />
                Live Engineering Velocity
              </div>
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="activity-github-link"
              >
                <Icon name="github" /> @mannrandhawa004 on GitHub <Icon name="arrow" />
              </a>
            </div>

            <ContributionSkyline
              palette={["#dbe5d5", "#a8c29e", "#73946c", "#42634f"]}
              defaultView="3d"
              orbit={true}
              showStats={true}
              showLegend={true}
              showToggle={true}
            />
          </div>
        </section>

        <section id="about" className="p-section p-about p-container">
          <div className="p-section-heading" data-reveal>
            <div><p className="p-eyebrow">05 / A little about me</p><h2>Curiosity is<br />my <em>starting point.</em></h2></div>
            <p>I'm a BCA graduate and full-stack developer. I learn by building, asking questions, and getting the details right.</p>
          </div>
          <div className="p-about-grid">
            <aside className="p-about-note" data-reveal>
              <span className="p-note-label">My approach</span>
              <blockquote>Good software feels simple.<br />Getting it there is the part I love.</blockquote>
              <p>I care about the details people notice, and the systems they never have to think about. My work spans responsive interfaces, secure APIs, and useful AI integrations.</p>
              <div className="p-about-facts"><span>Based in</span><strong>Mohali, Punjab, India</strong><span>Interested in</span><strong>Full-stack development & applied AI</strong></div>
              <a href="/resume.pdf" className="p-note-link" download="Manpreet_Singh_Resume.pdf">The full story, in my résumé <Icon name="download" /></a>
            </aside>
            <div className="p-journey">
              <h3>Where I've been</h3>
              {experience.map((item, index) => (
                <article className="p-journey-item" key={item.company} data-reveal>
                  <div className="p-journey-meta"><span>{item.date}</span>{index === 0 && <span className="p-current-badge">Current</span>}</div>
                  <h4>{item.role}</h4>
                  <div className="p-journey-company">{item.company}<span>{item.location}</span></div>
                  <p>{item.body}</p>
                </article>
              ))}
              <article className="p-journey-item" data-reveal>
                <div className="p-journey-meta"><span>2022 — 2025</span><span>Education</span></div>
                <h4>Bachelor of Computer Applications</h4>
                <div className="p-journey-company">Global Group of Institutes<span>Amritsar, India</span></div>
                <p>CGPA 7.5. A foundation in software development, data structures, databases, and web application architecture.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section portfolio-contact">
          <div className="p-container contact-inner" data-reveal>
            <div className="contact-grid">
              <div className="contact-copy">
                <div className="contact-kicker"><span className="status-dot" />06 / Get in touch</div>
                <h2>Have something<br />in mind? <em>Let's talk.</em></h2>
                <p>I'm open to full-time roles, select projects, and interesting collaborations. Tell me what you're working on.</p>
                <div className="contact-email-row">
                  <a href={links.email} className="contact-email">
                    randhawamanpreet37@gmail.com <Icon name="arrow" />
                  </a>
                  <button
                    type="button"
                    onClick={copyEmailToClipboard}
                    className="copy-email-btn"
                    aria-label="Copy email address"
                  >
                    <Icon name={copiedEmail ? "check" : "copy"} />
                    <span>{copiedEmail ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
              </div>

              <form
                className="contact-form"
                action="https://formsubmit.co/randhawamanpreet37@gmail.com"
                method="POST"
                onSubmit={handleContact}
              >
                <input type="hidden" name="_subject" value="New portfolio enquiry" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <input className="form-honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <div className="form-topline"><span>Send me a note</span><Icon name="mail" /></div>
                <div className="form-row">
                  <label><span>Your name</span><input type="text" name="name" placeholder="Jane Smith" autoComplete="name" required /></label>
                  <label><span>Email address</span><input type="email" name="email" placeholder="jane@company.com" autoComplete="email" required /></label>
                </div>
                <label><span>What can I help with?</span>
                  <select name="subject" defaultValue="" required>
                    <option value="" disabled>Select a topic</option>
                    <option value="Full-time opportunity">Full-time opportunity</option>
                    <option value="Contract / Freelance">Contract / Freelance</option>
                    <option value="Technical Collaboration">Technical Collaboration</option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </label>
                <label><span>Tell me about it</span><textarea name="message" rows={5} placeholder="A few details about the role, project, or timeline..." required /></label>
                <div className="form-submit-row">
                  <p aria-live="polite" className={`form-status form-status-${formStatus}`}>
                    {formStatus === "sent" && "Message sent — I'll be in touch soon."}
                    {formStatus === "error" && "Something went wrong. Please email directly."}
                    {(formStatus === "idle" || formStatus === "sending") && "Your details stay private. No spam, ever."}
                  </p>
                  <button className="pill pill-accent" type="submit" disabled={formStatus === "sending"}>
                    {formStatus === "sending" ? "Sending..." : "Send message"}<Icon name="arrow" />
                  </button>
                </div>
              </form>
            </div>
            <div className="contact-footer">
              <p>Mohali, Punjab, India<br /><span>Available for Remote & On-Site Engineering Roles</span></p>
              <div>
                <a href={links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
                <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
                <a href="/resume.pdf" download="Manpreet_Singh_Resume.pdf">Résumé ↓</a>
              </div>
            </div>
          </div>
        </section>

        <HalftoneWordmarkFooter
          wordmark="manpreet"
          label="Manpreet Singh"
          meta="© 2026 · Mohali, Punjab · Full-Stack & GenAI Engineer"
          columns={footerColumns}
          backToTop={true}
          height="520px"
          crop={0.18}
          dotGap={6}
          radius={85}
          palette={{ background: "#f7f7f2", ink: "#42634f", warm: "#8b9d78" }}
        />
      </main>
    </>
  );
}
