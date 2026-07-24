import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import PortfolioRibbon from "./components/Ribbon";
// import ScrollRibbon from "./components/Ribbon";
import resume_builder from "../public/images/resume_builder.png"
import scatch from "../public/images/scatch.png";

gsap.registerPlugin(ScrollTrigger);

type IconName = "arrow" | "github" | "linkedin" | "mail" | "download" | "menu" | "close";

const links = {
  github: "https://github.com/mannrandhawa004",
  linkedin: "https://www.linkedin.com/in/manpreet-singh-27099b280/",
  email: "mailto:randhawamanpreet37@gmail.com",
};

const projects = [
  {
    number: "01",
    title: "StarSync",
    eyebrow: "Astrology SaaS platform",
    description:
      "A full-stack consultation platform with real-time video sessions, secure authentication, and a Stripe-powered digital wallet.",
    tags: ["React", "Node.js", "MongoDB", "LiveKit", "Stripe"],
    href: "https://astro-lilac-chi.vercel.app",
    className: "project-starsync",
    image: "",
    metric: "Realtime consultations",
  },
  {
    number: "02",
    title: "AI Resume Builder",
    eyebrow: "AI-powered document editor",
    description:
      "A dynamic resume workspace with live preview, flexible templates, cloud image delivery, and instant client-side PDF exports.",
    tags: ["React", "GenAI", "ImageKit", "Tailwind", "PDF"],
    href: "https://ai-resume-builder-beta-pink.vercel.app",
    className: "project-resume",
    image: resume_builder,
    metric: "Live document preview",
  },
  {
    number: "03",
    title: "Scatch",
    eyebrow: "Full-stack commerce",
    description:
      "An end-to-end shopping experience with Google OAuth, JWT security, Stripe webhooks, inventory sync, and an admin dashboard.",
    tags: ["MERN", "OAuth", "JWT", "Stripe", "Webhooks"],
    href: "https://scatch-bice.vercel.app",
    className: "project-scatch",
    image: scatch,
    metric: "Automated order flow",
  },
];

const services = [
  {
    number: "01",
    title: "Full-stack products",
    body: "Scalable React interfaces connected to clean Node.js APIs and thoughtfully modeled databases.",
    tech: "React · Express · MongoDB",
  },
  {
    number: "02",
    title: "GenAI experiences",
    body: "Useful AI features designed around real user workflows, from prompt systems to document generation.",
    tech: "LangChain · LLM APIs · Python",
  },
  {
    number: "03",
    title: "Real-time systems",
    body: "Responsive experiences for live communication, updates, and events that need to feel immediate.",
    tech: "LiveKit · WebSockets · Webhooks",
  },
  {
    number: "04",
    title: "Secure integrations",
    body: "Authentication and payment flows built with production-minded security and clear failure states.",
    tech: "OAuth · JWT · Stripe",
  },
];

const experience = [
  {
    date: "Dec 2025 — Feb 2026",
    role: "Full-Stack Developer Intern",
    company: "Clepr Technologies",
    location: "Mohali, India",
    body: "Contributed to a full-stack MERN application, coordinated feature delivery, and developed scalable Express APIs backed by MongoDB.",
  },
  {
    date: "Jul 2025 — Jan 2026",
    role: "Full-Stack Web Development",
    company: "Antier School of Blocktech",
    location: "Mohali, India",
    body: "Built scalable MERN modules, secure authentication flows, predictable state management, and optimized database schemas.",
  },
];

const stackGroups = [
  { label: "Frontend", note: "Interfaces that feel fast, clear, and alive.", items: ["React.js", "Redux Toolkit", "Tailwind CSS", "GSAP", "HTML5 / CSS3"] },
  { label: "Backend", note: "APIs and services designed to scale cleanly.", items: ["Node.js", "Express.js", "REST APIs", "Authentication", "Webhooks"] },
  { label: "AI & Data", note: "Intelligence grounded in useful product flows.", items: ["LangChain", "Python", "MongoDB", "MySQL", "LLM APIs"] },
  { label: "Workflow", note: "From local build to reliable deployment.", items: ["Git", "Postman", "Vercel", "Render", "Azure"] },
];

function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const common = { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8 };
  if (name === "arrow") return <svg {...common} aria-hidden="true"><path d="M5 19 19 5M8 5h11v11" /></svg>;
  if (name === "mail") return <svg {...common} aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
  if (name === "download") return <svg {...common} aria-hidden="true"><path d="M12 3v12m0 0 5-5m-5 5-5-5M4 20h16" /></svg>;
  if (name === "menu") return <svg {...common} aria-hidden="true"><path d="M4 7h16M4 17h16" /></svg>;
  if (name === "close") return <svg {...common} aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" /></svg>;
  if (name === "linkedin") return <svg {...common} aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>;
  return <svg {...common} aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.3 4 5 5 0 0 0 19.2.5S18 0 15 1.9a13.4 13.4 0 0 0-7 0C5 .1 3.8.5 3.8.5A5 5 0 0 0 3.7 4a5.4 5.4 0 0 0-1.5 3.7c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4" /></svg>;
}

function Marquee() {
  const words = ["MERN", "GEN AI", "REACT", "NODE", "LANGCHAIN", "MONGODB", "EXPRESS", "PYTHON", "MYSQL"];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...words, ...words].map((word, index) => (
          <span key={`${word}-${index}`}>{word}<i>✦</i></span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const rootRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from("[data-nav]", { y: -20, opacity: 0, duration: 0.7 })
        .from("[data-hero-kicker]", { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
        .from("[data-hero-word]", { yPercent: 110, rotate: 2, duration: 1.15, stagger: 0.08, ease: "expo.out" }, "-=0.2")
        .from("[data-hero-copy]", { y: 24, opacity: 0, duration: 0.8 }, "-=0.55")
        .from("[data-terminal]", { y: 36, opacity: 0, rotate: 1.5, duration: 1 }, "-=0.7");

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 54,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%" },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-project]").forEach((card) => {
        const media = card.querySelector("[data-project-media]");
        if (!media || reduced) return;
        gsap.fromTo(media, { scale: 1.08 }, {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const closeMenu = () => setMenuOpen(false);

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
        <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />

        <nav className="nav wrap" data-nav aria-label="Main navigation">
          <a href="#top" className="brand" aria-label="Manpreet Singh home">
            <span className="brand-mark">MS</span>
            <span className="brand-copy">Mann<small>MERN + GenAI Developer</small></span>
          </a>
          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#expertise">Expertise</a>
            <a href="#about">About</a>
          </div>
          <a href="#contact" className="pill pill-dark nav-cta">Let's talk <Icon name="arrow" /></a>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Icon name="menu" /></button>
        </nav>

        {menuOpen && (
          <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
            <button className="menu-close" type="button" onClick={closeMenu} aria-label="Close menu"><Icon name="close" /></button>
            <div className="mobile-menu-links">
              <a href="#work" onClick={closeMenu}>Work <span>01</span></a>
              <a href="#expertise" onClick={closeMenu}>Expertise <span>02</span></a>
              <a href="#about" onClick={closeMenu}>About <span>03</span></a>
              <a href="#contact" onClick={closeMenu}>Contact <span>04</span></a>
            </div>
            <p>Mohali, Punjab · Available for opportunities</p>
          </div>
        )}

        <header id="top" className="hero wrap">
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />

          <div className="hero-kicker" data-hero-kicker>
            <span className="status-dot" />
            Available for full-time roles & select projects
          </div>
          <h1 className="hero-title" aria-label="Manpreet Singh">
            <span className="hero-line"><span data-hero-word>Mann</span></span>
            <span className="hero-line hero-line-bottom"><span data-hero-word>dev<span className="title-dot">.</span></span></span>
          </h1>
          <div className="hero-bottom">
            <div className="hero-copy" data-hero-copy>
              <div className="hero-role"><span>Full-stack engineer</span><i>×</i><span>GenAI builder</span></div>
              <p>I turn ambitious ideas into <strong>fast, secure products</strong>—from polished React interfaces to intelligent LangChain workflows.</p>
              <div className="hero-proof">
                <div><strong>03</strong><span>Live products</span></div>
                <div><strong>MERN</strong><span>End-to-end</span></div>
                <div><strong>AI</strong><span>Product-minded</span></div>
              </div>
              <div className="hero-actions">
                <a className="pill pill-acid" href="#work">Explore my work <Icon name="arrow" /></a>
                <a className="text-link" href="/resume.pdf" download>Download résumé <Icon name="download" /></a>
              </div>
            </div>
            <div className="terminal" data-terminal>
              <div className="terminal-bar">
                <div><i /><i /><i /></div>
                <span>mann.dev</span>
                <span>⌘</span>
              </div>
              <div className="terminal-body">
                <p><span className="code-muted">01</span><span className="code-pink">const</span> developer = {'{'}</p>
                <p><span className="code-muted">02</span>&nbsp;&nbsp;name: <span className="code-green">"Manpreet Singh"</span>,</p>
                <p><span className="code-muted">03</span>&nbsp;&nbsp;focus: [<span className="code-green">"Full stack"</span>, <span className="code-green">"GenAI"</span>],</p>
                <p><span className="code-muted">04</span>&nbsp;&nbsp;ships: <span className="code-pink">true</span>,</p>
                <p><span className="code-muted">05</span>&nbsp;&nbsp;location: <span className="code-green">"Mohali, IN"</span></p>
                <p><span className="code-muted">06</span>{'}'};</p>
                <p className="terminal-output"><span>→</span> Ready to build something meaningful_</p>
              </div>
            </div>
          </div>
          <div className="hero-meta">
            <span>01° 00' N / 76° 43' E</span>
            <span className="hero-meta-center">Scroll to explore ↓</span>
            <span>Portfolio / 2026</span>
          </div>
        </header>

        <Marquee />

        <section id="work" className="section section-work wrap">
          <div className="section-heading" data-reveal>
            <div><span className="section-no">01</span><p>Selected work</p></div>
            <h2>Products built to<br /><em>work in the real world.</em></h2>
            <p className="section-intro">From live consultations to intelligent documents and commerce—each project solves a complete product problem.</p>
          </div>

          <div className="projects">
            {projects.map((project) => (
              <article className="project" key={project.title} data-project data-reveal>
                <a href={project.href} target="_blank" rel="noreferrer" className={`project-media ${project.className}`} data-project-media aria-label={`View ${project.title} live`}>
                  {project.image && <img src={project.image} alt={`${project.title} interface`} />}
                  <div className="browser-chrome">
                    <span><i /><i /><i /></span>
                    <b>{project.href.replace("https://", "")}</b>
                    <span>↗</span>
                  </div>
                  <div className="project-art">
                    <span className="project-ghost" style={{ position: "absolute", color:"red" }}>{project.number}</span>
                    <div className="project-screen">
                      <small>{project.eyebrow}</small>
                      <strong>{project.title}</strong>
                      <span>{project.metric}</span>
                    </div>
                  </div>
                  <div className="project-open">Open live project <Icon name="arrow" /></div>
                </a>
                <div className="project-info">
                  <div className="project-title-row"><span>{project.number}</span><h3>{project.title}</h3></div>
                  <p>{project.description}</p>
                  <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="expertise" className="section expertise-section">
          <div className="wrap">
            <div className="section-heading section-heading-light" data-reveal>
              <div><span className="section-no">02</span><p>What I bring</p></div>
              <h2>One developer.<br /><em>The full product loop.</em></h2>
              <p className="section-intro">I move between interface, API, data, and intelligence so the whole experience stays coherent.</p>
            </div>
            <div className="service-grid">
              {services.map((service) => (
                <article className="service-card" key={service.number} data-reveal>
                  <div><span>{service.number}</span><i>✦</i></div>
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                  <small>{service.tech}</small>
                </article>
              ))}
            </div>
            <div className="stack" data-reveal>
              <div className="stack-heading">
                <div><span>03 / Skill system</span><p>How the pieces connect</p></div>
                <h3>From interface<br />to intelligence.</h3>
                <p>My toolkit covers the complete path from a user's first click to the data, logic, and AI working behind it.</p>
              </div>
              <div className="skill-system">
                <div className="skill-orbit" aria-label="Core development stack">
                  <div className="orbit-ring orbit-ring-one" />
                  <div className="orbit-ring orbit-ring-two" />
                  <div className="skill-core"><span>MERN</span><strong>+</strong><span>GEN AI</span><small>Full product thinking</small></div>
                  <span className="orbit-chip orbit-react">React</span>
                  <span className="orbit-chip orbit-node">Node.js</span>
                  <span className="orbit-chip orbit-mongo">MongoDB</span>
                  <span className="orbit-chip orbit-langchain">LangChain</span>
                  <span className="orbit-chip orbit-gsap">GSAP</span>
                  <span className="orbit-chip orbit-python">Python</span>
                </div>
                <div className="stack-groups">
                  {stackGroups.map((group, index) => (
                    <article className="stack-group" key={group.label}>
                      <div className="stack-group-title"><span>0{index + 1}</span><h4>{group.label}</h4></div>
                      <p>{group.note}</p>
                      <div>{group.items.map((item) => <span key={item}>{item}</span>)}</div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section wrap">
          <div className="section-heading" data-reveal>
            <div><span className="section-no">03</span><p>Experience</p></div>
            <h2>Learning fast.<br /><em>Shipping faster.</em></h2>
            <p className="section-intro">A BCA graduate with hands-on experience building production-minded MERN applications.</p>
          </div>

          <div className="experience-layout">
            <aside className="about-card" data-reveal>
              <div className="avatar-mark"><span>MS</span><i>✦</i></div>
              <blockquote>“I care about the tiny details users feel—and the robust systems they never have to think about.”</blockquote>
              <p>Based in Mohali, Punjab.<br />Open to teams building ambitious digital products.</p>
              <div className="social-row">
                <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a>
                <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
                <a href={links.email} aria-label="Email"><Icon name="mail" /></a>
              </div>
            </aside>
            <div className="timeline">
              {experience.map((item) => (
                <article className="timeline-item" key={item.company} data-reveal>
                  <div className="timeline-date">{item.date}</div>
                  <div className="timeline-copy">
                    <span>{item.location}</span>
                    <h3>{item.role}</h3>
                    <h4>{item.company}</h4>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
              <article className="timeline-item education" data-reveal>
                <div className="timeline-date">2022 — 2025</div>
                <div className="timeline-copy">
                  <span>Amritsar, India</span>
                  <h3>Bachelor of Computer Applications</h3>
                  <h4>Global Group of Institutes · CGPA 7.5</h4>
                  <p>Foundation in software development, computer science, databases, and web technologies.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-orb" />
          <div className="wrap contact-inner" data-reveal>
            <div className="contact-grid">
              <div className="contact-copy">
                <div className="contact-kicker"><span className="status-dot" />Have a role, project, or bold idea?</div>
                <h2>Let's build<br /><em>what's next.</em></h2>
                <p>Tell me what you're working on, what you need, and where I can help. I usually reply within 24–48 hours.</p>
                <a href={links.email} className="contact-email">randhawamanpreet37@gmail.com <Icon name="arrow" /></a>
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
                <input className="form-honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" />
                <div className="form-topline"><span>Start a conversation</span><i>✦</i></div>
                <div className="form-row">
                  <label><span>Your name</span><input type="text" name="name" placeholder="Jane Smith" autoComplete="name" required /></label>
                  <label><span>Email address</span><input type="email" name="email" placeholder="jane@company.com" autoComplete="email" required /></label>
                </div>
                <label><span>What can I help with?</span>
                  <select name="subject" defaultValue="" required>
                    <option value="" disabled>Select a topic</option>
                    <option value="Full-time opportunity">Full-time opportunity</option>
                    <option value="Freelance project">Freelance project</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Just saying hello">Just saying hello</option>
                  </select>
                </label>
                <label><span>Tell me about it</span><textarea name="message" rows={5} placeholder="A few details about the role, project, or idea..." required /></label>
                <div className="form-submit-row">
                  <p aria-live="polite" className={`form-status form-status-${formStatus}`}>
                    {formStatus === "sent" && "Message sent — I'll be in touch soon."}
                    {formStatus === "error" && "Something went wrong. Please email me directly."}
                    {(formStatus === "idle" || formStatus === "sending") && "Your details stay private. No spam, ever."}
                  </p>
                  <button className="pill pill-acid" type="submit" disabled={formStatus === "sending"}>
                    {formStatus === "sending" ? "Sending..." : "Send message"}<Icon name="arrow" />
                  </button>
                </div>
              </form>
            </div>
            <div className="contact-footer">
              <p>Mohali, Punjab, India<br /><span>Available for remote & on-site opportunities</span></p>
              <div><a href={links.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="/resume.pdf" download>Résumé ↓</a></div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="wrap"><span>© {new Date().getFullYear()} Manpreet Singh</span><span>Designed & built with React + caffeine</span><a href="#top">Back to top ↑</a></div>
        </footer>
      </main>
    </>
  );
}
