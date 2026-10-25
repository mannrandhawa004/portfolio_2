import { useEffect, useRef, useState, type FormEvent } from "react";
import BrandLoader from "./components/BrandLoader";
import { GlassFold } from "@/components/ui/glass-fold";
import SkillsExplorer from "./components/SkillsExplorer";
import { usePortfolioMotion } from "./hooks/usePortfolioMotion";
import HalftoneWordmarkFooter from "./components/ui/halftone-wordmark-footer";
import "./portfolio-v2.css";
import "./portfolio-refinements.css";

const email = "randhawamanpreet37@gmail.com";
const github = "https://github.com/mannrandhawa004";
const linkedin = "https://www.linkedin.com/in/manpreet-singh-27099b280/";

const projects = [
  {
    id: "01",
    title: "Taskflow",
    label: "Multi-Tenant Enterprise SaaS & Attendance Management",
    category: "ENTERPRISE SAAS / FULL-STACK",
    image: "/images/task_management.png",
    tone: "sage",
    word: "FLOW",
    description:
      "A comprehensive multi-tenant SaaS workspace enabling cross-functional teams to manage projects, organizational departments, and daily attendance. Architected with strict tenant data isolation, role-based access control (RBAC), and cryptographic two-factor authentication (TOTP). Features instant real-time sync via WebSockets, Redis caching, and automated billing workflows through Stripe and Razorpay.",
    features: [
      "Multi-tenant schema isolation and fine-grained RBAC for organizations",
      "Two-factor authentication with TOTP and secure JWT session management",
      "Real-time event synchronization using Socket.IO and Redis pub/sub",
      "Integrated subscription billing workflows with Stripe and Razorpay",
    ],
    tags: ["Next.js", "Node.js", "Express", "MySQL", "Socket.IO", "Redis", "Stripe", "Tailwind CSS"],
    source: github + "/task_management_system",
    live: "",
  },
  {
    id: "02",
    title: "AI Resume Builder",
    label: "Intelligent ATS-Optimized Document Generation Engine",
    category: "APPLIED GENAI / PRODUCT DESIGN",
    image: "/images/resume_builder.png",
    tone: "lavender",
    word: "NEXT",
    description:
      "An intelligent resume creation workspace designed to turn blank canvases into recruiter-ready documents. Powered by large language models to generate impactful professional summaries, tailor bullet points to job descriptions, and provide dynamic ATS compliance scoring. Features instant side-by-side template previews and vector-rendered PDF exports.",
    features: [
      "AI-assisted career summary and achievement bullet generation",
      "Live interactive preview with recruiter-tested ATS-friendly templates",
      "Instant client-side vector PDF generation and export",
      "Centralized state management with Redux Toolkit for seamless multi-step editing",
    ],
    tags: ["React", "GenAI / LLM APIs", "Node.js", "Tailwind CSS", "Redux Toolkit", "PDF Engine"],
    source: github + "/ai-resume-builder",
    live: "https://ai-resume-builder-beta-pink.vercel.app",
  },
  {
    id: "03",
    title: "Scatch",
    label: "High-Performance MERN Commerce Platform & Payment Gateway",
    category: "E-COMMERCE / FULL-STACK ARCHITECTURE",
    image: "/images/scatch.png",
    tone: "sand",
    word: "FIND",
    description:
      "A complete e-commerce solution engineered for friction-free product discovery, persistent cart state, and secure checkout. Built on a modular MERN stack architecture featuring Google OAuth 2.0 social authentication, interactive Swagger/OpenAPI documentation, and end-to-end payment processing with cryptographically verified Stripe webhooks.",
    features: [
      "Product discovery catalog with persistent cart state and quantity management",
      "Google OAuth 2.0 integration alongside secure JWT password-reset flows",
      "Stripe checkout integration with verified webhook handlers for order fulfillment",
      "Interactive Swagger OpenAPI 3.0 documentation for all backend endpoints",
    ],
    tags: ["MERN Stack", "MongoDB", "Express", "React", "Node.js", "Stripe API", "Google OAuth", "Swagger"],
    source: github + "/scatch",
    live: "https://scatch-bice.vercel.app",
  },
  {
    id: "04",
    title: "AI Code Explainer",
    label: "Production-Grade Codebase RAG & Semantic Line Citation",
    category: "GENAI ARCHITECTURE / RAG & VECTOR SEARCH",
    image: "/images/ai_code_explainer.png",
    tone: "cyan",
    word: "CODE",
    description:
      "A production-oriented GenAI platform for importing public GitHub repositories, indexing multi-language source code, and answering natural-language developer queries with precise file and line citations. Built as a distributed monorepo featuring background BullMQ workers, Tree-sitter AST parsing, Qdrant vector storage, and streamed AI responses.",
    features: [
      "Safe cloning and line-based AST chunking with Tree-sitter parsing",
      "Distributed BullMQ worker queue for background repository indexing",
      "Hybrid semantic vector search powered by Qdrant and OpenAI/Gemini embeddings",
      "Streamed chat interface with verified source file and line-number citations",
    ],
    tags: ["Next.js", "Node.js", "Express", "Qdrant", "MongoDB", "BullMQ", "LangChain", "TypeScript"],
    source: github + "/ai_code_explainer",
    live: "",
  },
];

const skillCategories = [
  {
    index: "01",
    tag: "FRONTEND & UI",
    title: "Interfaces & Interactions",
    summary: "Responsive, accessible web applications with clear hierarchy, fluid motion, and zero-compromise UX.",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Three.js", "Redux Toolkit"],
  },
  {
    index: "02",
    tag: "BACKEND & ARCHITECTURE",
    title: "Systems & Real-Time APIs",
    summary: "High-throughput RESTful services, database architecture, multi-tenant schemas, and event sockets.",
    stack: ["Node.js", "Express", "MongoDB", "MySQL", "Redis", "Socket.IO"],
  },
  {
    index: "03",
    tag: "APPLIED GENAI",
    title: "AI Integration & Workflows",
    summary: "Production LLM pipelines, structured schema outputs, document generation, and intelligent product agents.",
    stack: ["LangChain", "OpenAI / LLM APIs", "Python", "Prompt Pipelines"],
  },
  {
    index: "04",
    tag: "SECURITY & CLOUD",
    title: "Auth, Payments & Infrastructure",
    summary: "Enterprise sessions, cryptographic TOTP 2FA, verified webhook handling, containerization, and cloud deployment.",
    stack: ["OAuth 2.0 / JWT", "Stripe", "Docker", "Vercel", "Azure", "Git"],
  },
];

const journey = [
  {
    date: "MAR 2026 — PRESENT",
    company: "Fresco Web Services",
    role: "Full-Stack Developer",
    text: "Building responsive MERN applications, production APIs, and secure authentication with a cross-functional team in Mohali.",
  },
  {
    date: "JUL 2025 — JAN 2026",
    company: "Antier School of Blocktech",
    role: "Full-Stack Development Trainee",
    text: "Developed full-stack modules, role-based authentication, relational and NoSQL database schemas, and client state with Redux Toolkit.",
  },
  {
    date: "2022 — 2025",
    company: "Global Group of Institutes",
    role: "Bachelor of Computer Applications",
    text: "Software development, data structures, databases, and web architecture. Amritsar, India · CGPA 7.5.",
  },
];

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg className={down ? "arrow-icon arrow-down" : "arrow-icon"} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Star({ className = "" }: { className?: string }) {
  return (
    <svg className={`star-icon ${className}`} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <path d="M40 0v80M0 40h80M12 12l56 56M12 68l56-56" stroke="currentColor" strokeWidth="12" />
    </svg>
  );
}

export default function Portfolio() {
  const page = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const modal = useRef<HTMLDialogElement>(null);
  const [projectIndex, setProjectIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState("top");
  const [copyStatus, setCopyStatus] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [time, setTime] = useState("");
  const [userTime, setUserTime] = useState("");
  const [timeMode, setTimeMode] = useState<"ist" | "user">("ist");
  const [ready, setReady] = useState(false);

  // Theme Switcher State (persisted in localStorage)
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio_theme");
      if (saved === "light" || saved === "dark") return saved;
    }
    return "light";
  });

  useEffect(() => {
    localStorage.setItem("portfolio_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const selected = projects[projectIndex];
  const still = paused || reduced;
  usePortfolioMotion(page, still, ready, dialogOpen, setActive);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date())
      );
      setUserTime(
        new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date())
      );
    };
    tick();
    const timer = window.setInterval(tick, 30000);
    return () => {
      preference.removeEventListener("change", update);
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!dialogOpen) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = before;
    };
  }, [dialogOpen]);

  function showProject(index: number) {
    setProjectIndex(index);
    modal.current?.showModal();
    setDialogOpen(true);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("Email address copied.");
    } catch {
      setCopyStatus("Select the email address above to copy it.");
    }
  }

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setFormStatus("sending");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || (result.success !== true && result.success !== "true"))
        throw new Error("Message was not accepted");
      form.reset();
      setFormStatus("sent");
    } catch {
      setFormStatus("error");
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return (
    <div ref={page} className={`folio theme-${theme} ${theme === "light" ? "light-theme" : "dark-theme"} ${still ? "still" : ""}`}>
      {!ready && <BrandLoader onReady={setReady} />}
      <a className="skip-content" href="#work">
        Skip to selected work
      </a>
      <div className="page-progress" aria-hidden="true" />

      {/* ==============================================================
          NAVIGATION BAR WITH THEME SWITCHER
          ============================================================== */}
      <header className="folio-nav">
        <a className="identity" href="#top" aria-label="Manpreet Singh, home">
          <span className="identity-mark">
            m<span>↗</span>
          </span>
          <span>
            Manpreet Singh<small>FULL-STACK &amp; GENAI ENGINEER</small>
          </span>
        </a>
        <nav className="desktop-links" aria-label="Main navigation">
          {["expertise", "work", "about"].map((link, i) => (
            <a key={link} href={`#${link}`} aria-current={active === link ? "location" : undefined}>
              <sup>0{i + 1}</sup>
              {link === "expertise" ? "Skills" : link[0].toUpperCase() + link.slice(1)}
              <i />
            </a>
          ))}
        </nav>

        <div className="nav-actions-group">
          {/* Theme Switcher Button */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <>
                <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                <span className="theme-toggle-text mono">DARK</span>
              </>
            ) : (
              <>
                <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
                <span className="theme-toggle-text mono">LIGHT</span>
              </>
            )}
          </button>

          <a className="nav-hello" href="#contact" aria-current={active === "contact" ? "location" : undefined}>
            LET’S TALK <Arrow />
          </a>
        </div>

        <button
          className="mobile-trigger"
          onClick={() => {
            menu.current?.showModal();
            setDialogOpen(true);
          }}
          aria-label="Open menu"
          aria-haspopup="dialog"
        >
          <span />
          <span />
        </button>
      </header>

      <main>
        {/* ==============================================================
            STREAMLINED CENTERED HERO SECTION
            ============================================================== */}
        <section className="intro-shell" id="top">
          {/* Animated WebGL Glass Fold Shader Background */}
          <div className="hero-shader-bg" aria-hidden="true">
            <GlassFold
              mode={theme === "light" ? "light" : "dark"}
              color1={theme === "light" ? "#3e5c46" : "#26392b"}
              color2={theme === "light" ? "#f4f3ee" : "#0d100f"}
              color3={theme === "light" ? "#d9532f" : "#697758"}
              speed={still ? 0 : 0.22}
              scale={1.05}
              noise={0.06}
              className="hero-glassfold-canvas"
            />
            <div className="hero-shader-overlay" />
          </div>

          <div className="intro content-width">
            <div className="hero-status-pill mono">
              <span className="live-dot" />
              <span>AVAILABLE FOR FULL-STACK &amp; GENAI ROLES</span>
              <span className="hero-status-loc">· MOHALI, INDIA</span>
            </div>

            <div className="intro-title">
              <h1>
                <span className="intro-title-line">
                  <span>Good code.</span>
                </span>
                <span className="intro-title-line">
                  <span>
                    Great <em>feeling.</em>
                  </span>
                </span>
              </h1>
            </div>

            <p className="hero-bio">
              I’m <strong>Manpreet Singh</strong> — crafting scalable web applications, real-time backend
              architectures, and production LLM workflows where robust engineering foundations meet fluid,
              effortless user experiences.
            </p>

            <div className="hero-stack-row mono">
              <span>React / Next.js</span>
              <span className="dot">·</span>
              <span>TypeScript</span>
              <span className="dot">·</span>
              <span>Node.js</span>
              <span className="dot">·</span>
              <span>GenAI / LLMs</span>
              <span className="dot">·</span>
              <span>Redis &amp; WebSockets</span>
            </div>

            <div className="hero-actions">
              <a className="send-button" href="#work">
                Explore projects <Arrow down />
              </a>
              <a className="hero-resume-btn" href="/resume.pdf" download="Manpreet_Singh_Resume.pdf">
                Get Résumé <span>↓</span>
              </a>
              <a className="hero-contact" href="#contact">
                Let’s talk <Arrow />
              </a>
            </div>

            <div className="intro-bottom mono">
              <button
                type="button"
                className="time-pill mono"
                onClick={() => setTimeMode(timeMode === "ist" ? "user" : "ist")}
                title="Click to toggle time zone"
              >
                <span>
                  {timeMode === "ist" ? "MOHALI, INDIA" : "YOUR LOCAL TIME"} <i />{" "}
                  {timeMode === "ist" ? `${time || "--:--"} IST` : `${userTime || "--:--"} LOCAL`}
                </span>
                <span className="time-toggle-label">TOGGLE TIME</span>
              </button>
              <button aria-pressed={still} onClick={() => setPaused(!paused)} disabled={reduced}>
                {reduced ? "REDUCED MOTION ON" : paused ? "▶ PLAY MOTION" : "Ⅱ PAUSE MOTION"}
              </button>
              <a href="#work">
                SCROLL TO EXPLORE <span>↓</span>
              </a>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SKILLS SECTION WITH SMOOTH TAB ANIMATION & TRANSITIONS
            ============================================================== */}
        <section id="expertise" className="expertise-section">
          <div className="content-width">
            <div className="section-label mono" data-enter>
              <span>01 / A CONNECTED SKILL SET</span>
              <span>FROM THE FIRST PIXEL TO THE LAST ENDPOINT.</span>
            </div>
            <div className="expertise-layout">
              <div className="expertise-intro" data-enter>
                <span className="small-star">
                  <Star />
                </span>
                <h2>
                  What I<br />
                  <em>build with.</em>
                </h2>
                <p>I work across the stack, connecting the parts that people see with the systems they rely on.</p>
                <a className="inline-link" href="/resume.pdf" download="Manpreet_Singh_Resume.pdf">
                  Get the full resume <span>↓</span>
                </a>
              </div>
              <SkillsExplorer categories={skillCategories} />
            </div>
            <div className="tool-footnote mono">
              <span>DAILY COMPANIONS</span>
              <span>GIT / GITHUB / POSTMAN / VERCEL / RENDER / AZURE / DOCKER / QDRANT</span>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SELECTED WORK (4 PROJECTS WITH RECRUITER DESCRIPTIONS)
            ============================================================== */}
        <section id="work" className="selected-work content-width">
          <div className="section-label mono" data-enter>
            <span>02 / SELECTED WORK</span>
            <span>IDEAS, BUILT &amp; OUT IN THE WORLD.</span>
          </div>
          <div className="work-heading" data-enter>
            <h2>
              Less talk.<br />
              <em>More making.</em>
              <sup>(04)</sup>
            </h2>
            <p>
              A selection of things I’ve built.
              <br />
              Each with a problem to solve,
              <br />
              and a few details worth noticing.
            </p>
          </div>
          <nav className="work-index" aria-label="Selected project index">
            <span className="mono">THE COLLECTION / {String(projects.length).padStart(2, "0")}</span>
            <div>{projects.map(project => <a key={project.id} href={`#project-${project.id}`} data-project-link={project.id}><span className="mono">{project.id}</span>{project.title}<span aria-hidden="true">↗</span></a>)}</div>
          </nav>
          <div className="project-list">
            {projects.map((project, index) => (
              <article key={project.id} className="work-item" id={`project-${project.id}`}>
                <div className="work-item-info" data-enter>
                  <div className="work-item-header">
                    <span className="mono project-category-badge">{project.category}</span>
                    <span className="work-number mono">/ 0{index + 1} OF 0{projects.length}</span>
                  </div>

                  <div className="work-item-body">
                    <h3>
                      <button onClick={() => showProject(index)}>{project.title}</button>
                    </h3>
                    <p className="project-label">{project.label}</p>
                    <p className="project-full-description">{project.description}</p>

                    <div className="project-feature-highlights">
                      <span className="highlights-title mono">KEY ARCHITECTURAL HIGHLIGHTS</span>
                      <ul className="project-feature-bullets">
                        {project.features.slice(0, 3).map((feature) => (
                          <li key={feature}>
                            <span className="bullet-icon">↳</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="tech-tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    <div className="project-links">
                      {project.live ? (
                        <a
                          className="project-live-btn"
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${project.title} live demo`}
                        >
                          Visit Live Demo <Arrow />
                        </a>
                      ) : null}
                      <a
                        className="project-source-btn"
                        href={project.source}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} source code on GitHub`}
                      >
                        GitHub Code ↗
                      </a>
                      <button className="project-case-btn" onClick={() => showProject(index)}>
                        System Breakdown ↳
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className={`project-stage tone-${project.tone} ${project.tone}`}
                  data-depth
                  onClick={() => showProject(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") showProject(index);
                  }}
                  aria-label={`Explore ${project.title} case study details`}
                >
                  <div className="project-canvas-glow" aria-hidden="true" />

                  {/* Top Metadata */}
                  <div className="stage-meta mono">
                    <span>DESIGNED TO WORK. BUILT TO LAST.</span>
                    <span>0{index + 1} / 0{projects.length}</span>
                  </div>

                  {/* Bold Kinetic Wordmark Behind Browser */}
                  <div className="stage-word mono" aria-hidden="true">
                    {project.word}
                  </div>

                  {/* Perfectly Centered Floating Browser Shell */}
                  <div className="project-perspective" data-depth-target>
                    <div className="screen-shell">
                      <div className="screen-top">
                        <div className="browser-dots">
                          <span className="b-dot red" />
                          <span className="b-dot yellow" />
                          <span className="b-dot green" />
                        </div>
                        <div className="screen-address mono">
                          <span className="ssl-lock">🔒</span>
                          <span className="address-url">
                            {project.live
                              ? project.live.replace("https://", "").replace(/\/$/, "")
                              : `${project.title.toLowerCase().replace(/\s+/g, "")}.internal.app`}
                          </span>
                        </div>
                        <span className="screen-ext mono">↗</span>
                      </div>
                      <div className="screen-viewport">
                        <picture>
                          <source
                            srcSet={`${project.image.replace(".png", "-640.webp")} 640w, ${project.image.replace(".png", ".webp")} 1280w`}
                            sizes="(max-width: 800px) 92vw, 55vw"
                            type="image/webp"
                          />
                          <img
                            src={project.image}
                            alt={`${project.title} application interface`}
                            loading="lazy"
                            decoding="async"
                            width="1440"
                            height="900"
                          />
                        </picture>
                        <div className="screen-hover-veil">
                          <span className="veil-pill mono">
                            EXPAND CASE STUDY <Arrow />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Metadata & Live Indicator */}
                  <div className="stage-bottom mono">
                    <span className="stage-title">{project.title}</span>
                    <div className="stage-status">
                      <span className="pulse-beacon" />
                      <span>{project.live ? "LIVE PRODUCTION" : "VERIFIED REPO"}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <a className="github-row" href={github} target="_blank" rel="noreferrer">
            <span>And a few more things in the works.</span>
            <span className="mono">
              EXPLORE MY GITHUB <Arrow />
            </span>
          </a>
        </section>

        {/* ==============================================================
            [HUMAN IDEAS. DIGITAL POSSIBILITIES.] SCROLL & PIN BANNER
            ============================================================== */}
        <section id="philosophy" className="philosophy" aria-label="Core Philosophy">
          <div className="philosophy-type" aria-hidden="true">
            <span>HUMAN IDEAS.</span>
            <Star />
            <span>DIGITAL POSSIBILITIES.</span>
            <Star />
            <span>ENGINEERED TO SCALE.</span>
            <Star />
            <span>BUILT WITH INTENTION.</span>
            <Star />
            <span>HUMAN IDEAS.</span>
            <Star />
            <span>DIGITAL POSSIBILITIES.</span>
            <Star />
          </div>
        </section>

        {/* ==============================================================
            ABOUT SECTION
            ============================================================== */}
        <section id="about" className="about content-width">
          <div className="section-label mono" data-enter>
            <span>03 / A LITTLE MORE HUMAN</span>
            <span>BEHIND THE CODE.</span>
          </div>
          <div className="about-layout">
            <div className="about-heading" data-enter>
              <h2>
                Curious by nature.<br />
                <em>Builder by choice.</em>
              </h2>
              <div
                className="identity-card"
                onPointerMove={(event) => {
                  if (!still && event.pointerType === "mouse") {
                    const bounds = event.currentTarget.getBoundingClientRect();
                    event.currentTarget.style.setProperty(
                      "--tilt",
                      `${((event.clientX - bounds.left) / bounds.width - 0.5) * 8}deg`
                    );
                  }
                }}
                onPointerLeave={(event) => event.currentTarget.style.setProperty("--tilt", "0deg")}
              >
                <div className="id-top mono">
                  <span>THE PERSON / NOT THE PROFILE</span>
                  <Star />
                </div>
                <div className="id-monogram">
                  ms<span>↗</span>
                </div>
                <div className="id-bottom">
                  <span>
                    Manpreet Singh<small>FULL-STACK &amp; GENAI ENGINEER</small>
                  </span>
                  <span className="id-stamp">
                    MADE IN
                    <br />
                    PUNJAB
                  </span>
                </div>
              </div>
            </div>
            <div className="about-story" data-enter>
              <p className="about-lead">
                I like making complicated things
                <br />
                feel <em>surprisingly simple.</em>
              </p>
              <p>
                I’m a developer based in Mohali, India. My work brings together responsive interfaces, reliable backend
                systems, and AI that helps people get things done.
              </p>
              <p>
                I learn by building, asking questions, and getting the details right. The most satisfying part? When
                everything clicks and the technology gets out of the way.
              </p>
              <div className="journey">
                {journey.map((item, index) => (
                  <article key={item.company}>
                    <div className="journey-meta mono">
                      <span>{item.date}</span>
                      {index === 0 && <span className="now-badge">NOW</span>}
                    </div>
                    <h3>{item.role}</h3>
                    <h4>{item.company}</h4>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            CONTACT SECTION
            ============================================================== */}
        <section id="contact" className="contact">
          <div className="content-width">
            <div className="section-label mono" data-enter>
              <span>04 / YOUR NEXT GOOD IDEA STARTS HERE</span>
              <span className="availability">
                <i /> OPEN TO WHAT’S NEXT
              </span>
            </div>
            <a className="contact-headline" href={`mailto:${email}`} data-enter>
              <h2>
                Let’s make<br />
                <em>something matter.</em>
              </h2>
              <span className="contact-orb">
                <Arrow />
              </span>
            </a>
            <div className="contact-layout">
              <div className="contact-copy">
                <p>
                  A role, a project, a wild idea.
                  <br />
                  I’d love to hear what you have in mind.
                </p>
                <a className="email-address" href={`mailto:${email}`}>
                  {email}
                </a>
                <button className="copy-email mono" onClick={copyEmail}>
                  COPY EMAIL <span>⧉</span>
                </button>
                <span className="copy-feedback" role="status">
                  {copyStatus}
                </span>
                <div className="socials">
                  <a href={github} target="_blank" rel="noreferrer">
                    GitHub <Arrow />
                  </a>
                  <a href={linkedin} target="_blank" rel="noreferrer">
                    LinkedIn <Arrow />
                  </a>
                  <a href="/resume.pdf" download="Manpreet_Singh_Resume.pdf">
                    Resume ↓
                  </a>
                </div>
              </div>
              <form className="note-form" onSubmit={sendMessage}>
                <input type="hidden" name="_subject" value="New portfolio enquiry" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <input className="honey-field" name="_honey" tabIndex={-1} aria-hidden="true" autoComplete="off" />
                <div className="input-row">
                  <label>
                    Your name
                    <input name="name" placeholder="Alex Smith" autoComplete="name" required />
                  </label>
                  <label>
                    Email address
                    <input type="email" name="email" placeholder="alex@company.com" autoComplete="email" required />
                  </label>
                </div>
                <label>
                  A little about your idea
                  <textarea name="message" rows={3} placeholder="What are we making?" required />
                </label>
                <div className="form-end">
                  <p role="status">
                    {formStatus === "sent"
                      ? "Message sent. Thanks for reaching out!"
                      : formStatus === "error"
                      ? "Couldn’t send. Please use the email link instead."
                      : formStatus === "sending"
                      ? "Sending your note…"
                      : "Good things start with a simple hello."}
                  </p>
                  <button type="submit" className="send-button" disabled={formStatus === "sending"}>
                    {formStatus === "sending" ? "Sending…" : "Send a note"}
                    <Arrow />
                  </button>
                </div>
              </form>
            </div>
          </div>

          <HalftoneWordmarkFooter
            wordmark="manpreet"
            label="Manpreet Singh"
            meta="© 2026 · Mohali, India · Built with intention."
            columns={[]}
            backToTop={true}
            height="clamp(220px, 29vw, 440px)"
            crop={0.16}
            dotGap={6}
            radius={85}
            grain={0.12}
            interactive={!still}
            fontFamily='"DM Sans", Arial, sans-serif'
            monoFamily='"DM Mono", monospace'
            preset={theme === "light" ? "sage" : "night"}
            palette={
              theme === "light"
                ? { background: "#f4f3ee", ink: "#353830", warm: "#d94b27" }
                : { background: "#0d100f", ink: "#627160", warm: "#e5a384" }
            }
          />
        </section>
      </main>

      {/* ==============================================================
          MOBILE NAVIGATION DIALOG (WITH THEME TOGGLE)
          ============================================================== */}
      <dialog
        className="nav-dialog"
        ref={menu}
        data-lenis-prevent
        aria-label="Navigation menu"
        onClose={() => setDialogOpen(false)}
      >
        <div className="nav-dialog-head mono">
          <span>MANPREET SINGH</span>
          <button onClick={() => menu.current?.close()} aria-label="Close menu">
            CLOSE ×
          </button>
        </div>

        <div className="mobile-theme-row">
          <span className="mono">THEME MODE</span>
          <button type="button" className="theme-toggle-btn mobile-theme-btn" onClick={toggleTheme}>
            {theme === "light" ? "🌙 SWITCH TO DARK" : "☀️ SWITCH TO LIGHT"}
          </button>
        </div>

        <nav aria-label="Mobile navigation">
          {["expertise", "work", "about", "contact"].map((item, index) => (
            <a
              key={item}
              href={`#${item}`}
              aria-current={active === item ? "location" : undefined}
              onClick={() => menu.current?.close()}
            >
              <sup>0{index + 1}</sup>
              {item === "expertise" ? "Skills" : item}
              <Arrow />
            </a>
          ))}
        </nav>
        <a href={`mailto:${email}`}>{email}</a>
      </dialog>

      <dialog
        className="case-dialog"
        data-lenis-prevent
        ref={modal}
        onClose={() => setDialogOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) modal.current?.close();
        }}
        aria-labelledby="case-title"
      >
        <div className="case-content">
          <div className="case-top mono">
            <span>SELECTED WORK / {selected.id}</span>
            <button onClick={() => modal.current?.close()} aria-label="Close project details">
              CLOSE ×
            </button>
          </div>
          <span className="mono case-category-tag">{selected.category}</span>
          <h2 id="case-title">{selected.title}</h2>
          <p className="case-subtitle mono">{selected.label}</p>
          <picture className="case-picture">
            <source srcSet={selected.image.replace(".png", ".webp")} type="image/webp" />
            <img src={selected.image} alt={`${selected.title} screenshot`} width="1440" height="900" />
          </picture>

          <div className="case-section">
            <h3 className="mono case-section-heading">PROJECT OVERVIEW &amp; PROBLEM STATEMENT</h3>
            <p className="case-description">{selected.description}</p>
          </div>

          <div className="case-section">
            <h3 className="mono case-section-heading">SYSTEM ARCHITECTURE &amp; KEY CAPABILITIES</h3>
            <ul className="case-features-list">
              {selected.features.map((feature) => (
                <li key={feature}>
                  <span className="check-mark">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="case-section">
            <h3 className="mono case-section-heading">TECHNOLOGY STACK &amp; INFRASTRUCTURE</h3>
            <div className="tech-tags">
              {selected.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>

          <div className="case-actions">
            {selected.live && (
              <a className="send-button" href={selected.live} target="_blank" rel="noreferrer">
                Visit Live Site <Arrow />
              </a>
            )}
            <a className="inline-link" href={selected.source} target="_blank" rel="noreferrer">
              View Source Code <Arrow />
            </a>
            <button
              className="next-project mono"
              onClick={() => {
                setProjectIndex((projectIndex + 1) % projects.length);
                modal.current?.scrollTo({ top: 0 });
              }}
            >
              NEXT PROJECT →
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
