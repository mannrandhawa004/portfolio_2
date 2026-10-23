import { useEffect, useLayoutEffect, useRef, useState, type FormEvent, type PointerEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WavesShader from "./components/WavesShader";
import HalftoneWordmarkFooter from "./components/ui/halftone-wordmark-footer";
import { TechIcon } from "./components/TechLogos";
import "./portfolio-v2.css";

gsap.registerPlugin(ScrollTrigger);
const email = "randhawamanpreet37@gmail.com";
const github = "https://github.com/mannrandhawa004";
const linkedin = "https://www.linkedin.com/in/manpreet-singh-27099b280/";

const projects = [
  { id: "01", title: "Taskflow", label: "A little less chaos. A lot more flow.", category: "SAAS / FULL-STACK DEVELOPMENT", image: "/images/task_management.png", tone: "sage", word: "FLOW", description: "A multi-tenant workspace for teams to manage projects, departments, and attendance. Thoughtfully connected, from the first sign-in to the final task.", features: ["Tenant isolation and role-based access", "Two-factor authentication with TOTP", "Real-time updates and integrated billing"], tags: ["Next.js", "Node.js", "MySQL", "Socket.IO", "Redis", "Stripe"], source: github + "/task_management_system", live: "" },
  { id: "02", title: "AI Resume Builder", label: "A better start to your next chapter.", category: "APPLIED AI / PRODUCT DESIGN", image: "/images/resume_builder.png", tone: "lavender", word: "NEXT", description: "An AI-powered workspace that turns a blank page into a resume ready to share. Build, refine, and preview your story in one focused experience.", features: ["AI-assisted resume writing", "Live preview with ATS-friendly templates", "Instant PDF export"], tags: ["React", "GenAI", "Node.js", "Tailwind CSS", "Redux Toolkit"], source: github + "/ai-resume-builder", live: "https://ai-resume-builder-beta-pink.vercel.app" },
  { id: "03", title: "Scatch", label: "From the first find to the final checkout.", category: "E-COMMERCE / FULL-STACK DEVELOPMENT", image: "/images/scatch.png", tone: "sand", word: "FIND", description: "A complete shopping experience with product discovery, persistent carts, and secure checkout. The detail is in making every step feel effortless.", features: ["Product discovery and persistent shopping carts", "Google OAuth and JWT authentication", "Stripe payments with verified webhooks"], tags: ["MERN Stack", "Google OAuth", "JWT", "Stripe", "Webhooks"], source: github + "/scatch", live: "https://scatch-bice.vercel.app" },
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
  { date: "MAR 2026 — PRESENT", company: "Fresco Web Services", role: "Full-Stack Developer", text: "Building responsive MERN applications, production APIs, and secure authentication with a cross-functional team in Mohali." },
  { date: "JUL 2025 — JAN 2026", company: "Antier School of Blocktech", role: "Full-Stack Development Trainee", text: "Developed full-stack modules, role-based authentication, relational and NoSQL database schemas, and client state with Redux Toolkit." },
  { date: "2022 — 2025", company: "Global Group of Institutes", role: "Bachelor of Computer Applications", text: "Software development, data structures, databases, and web architecture. Amritsar, India · CGPA 7.5." },
];

function Arrow({ down = false }: { down?: boolean }) { return <svg className={down ? "arrow-icon arrow-down" : "arrow-icon"} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" /></svg>; }
function Star({ className = "" }: { className?: string }) { return <svg className={`star-icon ${className}`} viewBox="0 0 80 80" fill="none" aria-hidden="true"><path d="M40 0v80M0 40h80M12 12l56 56M12 68l56-56" stroke="currentColor" strokeWidth="12" /></svg>; }

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
  const [showStatusCard, setShowStatusCard] = useState(false);

  const selected = projects[projectIndex];
  const still = paused || reduced;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update(); preference.addEventListener("change", update);
    const tick = () => {
      setTime(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
      setUserTime(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
    };
    tick(); const timer = window.setInterval(tick, 10000);
    return () => { preference.removeEventListener("change", update); window.clearInterval(timer); };
  }, []);

  useEffect(() => {
    if (!dialogOpen) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = before; };
  }, [dialogOpen]);

  useEffect(() => {
    const sections = page.current?.querySelectorAll<HTMLElement>("section[id], div[id]");
    const update = () => {
      let id = "top";
      sections?.forEach(section => { if (section.getBoundingClientRect().top <= window.innerHeight * .35) id = section.id; });
      setActive(id);
    };
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useLayoutEffect(() => {
    if (still || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.from(".intro-title-line > span", { yPercent: 110, rotate: 2, duration: 1.2, stagger: .11, ease: "power4.out", clearProps: "all" });
      gsap.from(".intro-kicker, .intro-description, .intro-bottom", { y: 20, opacity: 0, duration: .9, stagger: .1, delay: .25, clearProps: "all" });
      gsap.to(".hero-shader-bg", { y: 60, ease: "none", scrollTrigger: { trigger: ".intro-shell", start: "top top", end: "bottom top", scrub: 1.2 } });
      gsap.utils.toArray<HTMLElement>("[data-enter]").forEach(element => gsap.from(element, { y: 36, opacity: 0, duration: .85, ease: "power3.out", clearProps: "all", scrollTrigger: { trigger: element, start: "top 91%", once: true } }));
      gsap.utils.toArray<HTMLElement>(".project-stage").forEach(stage => {
        gsap.fromTo(stage.querySelector(".screen-shell"), { y: 40, rotateX: 9, rotateY: -7 }, { y: -18, rotateX: 0, rotateY: 2, ease: "none", scrollTrigger: { trigger: stage, start: "top bottom", end: "bottom top", scrub: 1.4 } });
      });
      gsap.to(".philosophy-type", { xPercent: -12, ease: "none", scrollTrigger: { trigger: ".philosophy", start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.to(".page-progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: .2 } });
    }, page);
    return () => context.revert();
  }, [still]);

  function showProject(index: number) { setProjectIndex(index); modal.current?.showModal(); setDialogOpen(true); }
  function moveCursor(event: PointerEvent<HTMLButtonElement>) {
    if (still || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--cursor-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--cursor-y", `${event.clientY - rect.top}px`);
  }
  async function copyEmail() {
    try { await navigator.clipboard.writeText(email); setCopyStatus("Email address copied."); }
    catch { setCopyStatus("Select the email address above to copy it."); }
  }
  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; setFormStatus("sending");
    const controller = new AbortController(); const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${email}`, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form), signal: controller.signal });
      const result = await response.json();
      if (!response.ok || (result.success !== true && result.success !== "true")) throw new Error("Message was not accepted");
      form.reset(); setFormStatus("sent");
    } catch { setFormStatus("error"); }
    finally { window.clearTimeout(timeout); }
  }

  return <div ref={page} className={`folio ${still ? "still" : ""}`}>
    <a className="skip-content" href="#work">Skip to selected work</a>
    <div className="page-progress" aria-hidden="true" />
    <header className="folio-nav">
      <a className="identity" href="#top" aria-label="Manpreet Singh, home"><span className="identity-mark">m<span>↗</span></span><span>Manpreet Singh<small>DEVELOPER &amp; CREATIVE THINKER</small></span></a>
      <nav className="desktop-links" aria-label="Main navigation">{["work", "expertise", "about"].map((link, i) => <a key={link} href={`#${link}`} aria-current={active === link ? "location" : undefined}><sup>0{i + 1}</sup>{link[0].toUpperCase() + link.slice(1)}<i /></a>)}</nav>
      <a className="nav-hello" href="#contact">LET’S TALK <Arrow /></a>
      <button className="mobile-trigger" onClick={() => { menu.current?.showModal(); setDialogOpen(true); }} aria-label="Open menu"><span /><span /></button>
    </header>

    <main>
      <section className="intro-shell" id="top">
        <div className="hero-shader-bg" aria-hidden="true">
          <WavesShader paused={still} />
        </div>
        <div className="intro content-width">
          <div className="intro-kicker">
            <span className="mono">FULL-STACK &amp; GENAI ENGINEER</span>
            <div
              className="availability-wrapper"
              onMouseEnter={() => setShowStatusCard(true)}
              onMouseLeave={() => setShowStatusCard(false)}
            >
              <button
                type="button"
                className="availability"
                onClick={() => setShowStatusCard(!showStatusCard)}
                aria-expanded={showStatusCard}
              >
                <i /> Available for opportunities <span className="availability-tip">ⓘ</span>
              </button>
              {showStatusCard && (
                <div className="status-popover mono" role="tooltip">
                  <div className="status-popover-top">
                    <span className="live-dot" /> LIVE AVAILABILITY
                  </div>
                  <p>Open for Full-Stack, AI integration &amp; contract engineering roles.</p>
                  <div className="status-popover-meta">
                    <span>Base: Mohali, Punjab</span>
                    <span>Avg Reply: &lt; 2 hrs</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="intro-composition">
            <div className="intro-title">
              <h1>
                <span className="intro-title-line"><span>Good code.</span></span>
                <span className="intro-title-line"><span>Great <em>feeling.</em></span></span>
              </h1>
              <span className="intro-index mono">PORTFOLIO — VOL. 26 · FLOW WAVES</span>
            </div>
            <div className="intro-description">
              <span className="intro-arrow" aria-hidden="true">↳</span>
              <div>
                <p>I’m Manpreet. I bring ideas to life through<br className="wide-break" /> thoughtful interfaces, reliable systems,<br className="wide-break" /> and a healthy obsession with the details.</p>
                <div className="hero-stack-chips">
                  {["React / Next.js", "TypeScript", "Node.js", "GenAI / LLMs", "Three.js"].map((chip) => (
                    <span key={chip} className="hero-chip">{chip}</span>
                  ))}
                </div>
                <a className="inline-link" href="#work">Discover my work <Arrow down /></a>
              </div>
            </div>
          </div>
          <div className="intro-bottom mono">
            <button
              type="button"
              className="time-pill mono"
              onClick={() => setTimeMode(timeMode === "ist" ? "user" : "ist")}
              title="Click to toggle time zone"
            >
              <span>MOHALI, INDIA <i /> {timeMode === "ist" ? `${time || "20:30"} IST` : `${userTime || "20:30"} LOCAL`}</span>
              <span className="time-toggle-label">TOGGLE TIME</span>
            </button>
            <button aria-pressed={paused} onClick={() => setPaused(!paused)}>
              {paused ? "▶ PLAY MOTION" : "Ⅱ PAUSE MOTION"}
            </button>
            <a href="#work">SCROLL TO EXPLORE <span>↓</span></a>
          </div>
        </div>
      </section>

      <section id="work" className="selected-work content-width">
        <div className="section-label mono" data-enter><span>01 / SELECTED WORK</span><span>IDEAS, BUILT &amp; OUT IN THE WORLD.</span></div>
        <div className="work-heading" data-enter><h2>Less talk.<br /><em>More making.</em><sup>(03)</sup></h2><p>A selection of things I’ve built.<br />Each with a problem to solve,<br />and a few details worth noticing.</p></div>
        <div className="project-list">{projects.map((project, index) => <article key={project.id} className="work-item" id={`project-${project.id}`}>
          <div className="work-item-info" data-enter><span className="work-number mono">/ {project.id}</span><div><span className="mono project-category">{project.category}</span><h3><button onClick={() => showProject(index)}>{project.title}</button></h3><p>{project.label}</p><div className="tech-tags">{project.tags.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div><button className="inline-link" onClick={() => showProject(index)}>Explore project <Arrow /></button></div></div>
          <button className={`project-stage ${project.tone}`} onPointerMove={moveCursor} onClick={() => showProject(index)} aria-label={`Explore ${project.title} project details`}>
            <span className="stage-meta mono">DESIGNED TO WORK. BUILT TO LAST.<span>0{index + 1} / 03</span></span><span className="stage-word" aria-hidden="true">{project.word}<span>®</span></span>
            <div className="screen-shell"><div className="screen-top"><i /><i /><i /><span>{project.title} / preview</span><span>↗</span></div><img src={project.image} alt={`${project.title} application interface`} loading="lazy" width="1440" height="900" /></div>
            <span className="stage-bottom mono">{project.title}<span>{project.live ? "LIVE PROJECT" : "SOURCE AVAILABLE"} ↗</span></span><span className="view-cursor" aria-hidden="true">VIEW<Arrow /></span>
          </button>
        </article>)}</div>
        <a className="github-row" href={github} target="_blank" rel="noreferrer"><span>And a few more things in the works.</span><span className="mono">EXPLORE MY GITHUB <Arrow /></span></a>
      </section>

      <section className="philosophy" aria-label="My approach"><div className="philosophy-type" aria-hidden="true">HUMAN IDEAS. <Star /> DIGITAL POSSIBILITIES. <Star /></div><p className="mono">THE TECHNOLOGY IS THE TOOL. THE EXPERIENCE IS THE POINT.</p></section>

      <section id="expertise" className="expertise-dark"><div className="content-width">
        <div className="section-label mono" data-enter><span>02 / A CONNECTED SKILL SET</span><span>FROM THE FIRST PIXEL TO THE LAST ENDPOINT.</span></div>
        <div className="expertise-layout">
          <div className="expertise-intro" data-enter>
            <span className="small-star"><Star /></span>
            <h2>Beautiful outside.<br /><em>Thoughtful inside.</em></h2>
            <p>I work across the stack, connecting the parts that people see with the systems they rely on.</p>
            <a className="inline-link" href="/resume.pdf" download="Manpreet_Singh_Resume.pdf">Get the full resume <span>↓</span></a>
          </div>
          <div className="skills-grid" data-enter>
            {skillCategories.map((skill) => (
              <div className="skill-card" key={skill.title}>
                <div className="skill-card-head">
                  <span className="mono skill-card-num">{skill.index}</span>
                  <span className="skill-card-tag mono">{skill.tag}</span>
                </div>
                <h3>{skill.title}</h3>
                <p>{skill.summary}</p>
                <div className="tech-tags">
                  {skill.stack.map(tool => (
                    <span key={tool} className="skill-pill">
                      <TechIcon name={tool} />
                      <span>{tool}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="tool-footnote mono"><span>DAILY COMPANIONS</span><span>GIT / GITHUB / POSTMAN / VERCEL / RENDER / AZURE</span></div>
      </div></section>

      <section id="about" className="about content-width">
        <div className="section-label mono" data-enter><span>03 / A LITTLE MORE HUMAN</span><span>BEHIND THE CODE.</span></div>
        <div className="about-layout"><div className="about-heading" data-enter><h2>Curious by nature.<br /><em>Builder by choice.</em></h2><div className="identity-card" onPointerMove={event => { if (!still && event.pointerType === "mouse") { const bounds = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty("--tilt", `${((event.clientX - bounds.left) / bounds.width - .5) * 8}deg`); } }} onPointerLeave={event => event.currentTarget.style.setProperty("--tilt", "0deg")}><div className="id-top mono"><span>THE PERSON / NOT THE PROFILE</span><Star /></div><div className="id-monogram">ms<span>↗</span></div><div className="id-bottom"><span>Manpreet Singh<small>FULL-STACK &amp; GENAI ENGINEER</small></span><span className="id-stamp">MADE IN<br />PUNJAB</span></div></div></div>
          <div className="about-story" data-enter><p className="about-lead">I like making complicated things<br />feel <em>surprisingly simple.</em></p><p>I’m a developer based in Mohali, India. My work brings together responsive interfaces, reliable backend systems, and AI that helps people get things done.</p><p>I learn by building, asking questions, and getting the details right. The most satisfying part? When everything clicks and the technology gets out of the way.</p><div className="journey">{journey.map((item, index) => <article key={item.company}><div className="journey-meta mono"><span>{item.date}</span>{index === 0 && <span className="now-badge">NOW</span>}</div><h3>{item.role}</h3><h4>{item.company}</h4><p>{item.text}</p></article>)}</div></div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="content-width">
          <div className="section-label mono" data-enter>
            <span>04 / YOUR NEXT GOOD IDEA STARTS HERE</span>
            <span className="availability"><i /> OPEN TO WHAT’S NEXT</span>
          </div>
          <a className="contact-headline" href={`mailto:${email}`} data-enter>
            <h2>Let’s make<br /><em>something matter.</em></h2>
            <span className="contact-orb"><Arrow /></span>
          </a>
          <div className="contact-layout">
            <div className="contact-copy">
              <p>A role, a project, a wild idea.<br />I’d love to hear what you have in mind.</p>
              <a className="email-address" href={`mailto:${email}`}>{email}</a>
              <button className="copy-email mono" onClick={copyEmail}>COPY EMAIL <span>⧉</span></button>
              <span className="copy-feedback" role="status">{copyStatus}</span>
              <div className="socials">
                <a href={github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
                <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
                <a href="/resume.pdf" download="Manpreet_Singh_Resume.pdf">Resume ↓</a>
              </div>
            </div>
            <form className="note-form" onSubmit={sendMessage}>
              <input type="hidden" name="_subject" value="New portfolio enquiry" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input className="honey-field" name="_honey" tabIndex={-1} aria-hidden="true" autoComplete="off" />
              <div className="input-row">
                <label>Your name<input name="name" placeholder="Alex Smith" autoComplete="name" required /></label>
                <label>Email address<input type="email" name="email" placeholder="alex@company.com" autoComplete="email" required /></label>
              </div>
              <label>A little about your idea<textarea name="message" rows={3} placeholder="What are we making?" required /></label>
              <div className="form-end">
                <p role="status">
                  {formStatus === "sent" ? "Message sent. Thanks for reaching out!" : formStatus === "error" ? "Couldn’t send. Please use the email link instead." : formStatus === "sending" ? "Sending your note…" : "Good things start with a simple hello."}
                </p>
                <button type="submit" className="send-button" disabled={formStatus === "sending"}>
                  {formStatus === "sending" ? "Sending…" : "Send a note"}<Arrow />
                </button>
              </div>
            </form>
          </div>
        </div>

        <HalftoneWordmarkFooter
          wordmark="manpreet"
          label="Manpreet Singh"
          meta="© 2026 · Mohali, India · Full-Stack &amp; GenAI Engineer"
          columns={[]}
          backToTop={true}
          height="440px"
          crop={0.16}
          dotGap={6}
          radius={85}
          grain={0.3}
          preset="night"
          palette={{ background: "#242620", ink: "#efeee6", warm: "#d94b27" }}
        />
      </section>
    </main>

    <dialog className="nav-dialog" ref={menu} onClose={() => setDialogOpen(false)}><div className="nav-dialog-head mono"><span>MANPREET SINGH</span><button onClick={() => menu.current?.close()} aria-label="Close menu">CLOSE ×</button></div><nav aria-label="Mobile navigation">{["work", "expertise", "about", "contact"].map((item, index) => <a key={item} href={`#${item}`} onClick={() => menu.current?.close()}><sup>0{index + 1}</sup>{item}<Arrow /></a>)}</nav><a href={`mailto:${email}`}>{email}</a></dialog>
    <dialog className="case-dialog" ref={modal} onClose={() => setDialogOpen(false)} onClick={event => { if (event.target === event.currentTarget) modal.current?.close(); }} aria-labelledby="case-title"><div className="case-content"><div className="case-top mono"><span>SELECTED WORK / {selected.id}</span><button onClick={() => modal.current?.close()} aria-label="Close project details">CLOSE ×</button></div><span className="mono">{selected.category}</span><h2 id="case-title">{selected.title}</h2><img src={selected.image} alt={`${selected.title} screenshot`} /><p className="case-description">{selected.description}</p><ul>{selected.features.map(feature => <li key={feature}>{feature}</li>)}</ul><div className="tech-tags">{selected.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="case-actions">{selected.live && <a className="send-button" href={selected.live} target="_blank" rel="noreferrer">Visit live site <Arrow /></a>}<a className="inline-link" href={selected.source} target="_blank" rel="noreferrer">Source code <Arrow /></a><button className="next-project mono" onClick={() => { setProjectIndex((projectIndex + 1) % projects.length); modal.current?.scrollTo({ top: 0 }); }}>NEXT PROJECT →</button></div></div></dialog>
  </div>;
}
