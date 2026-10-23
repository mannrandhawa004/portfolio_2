import type { ReactNode } from "react";

export function TechIcon({ name }: { name: string }): ReactNode {
  const n = name.toLowerCase().trim();

  if (n.includes("react")) {
    return (
      <svg viewBox="-11.5 -10.23 23 20.46" className="tech-logo" aria-hidden="true">
        <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
        <g stroke="#61dafb" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  if (n.includes("next")) {
    return (
      <svg viewBox="0 0 180 180" className="tech-logo" aria-hidden="true">
        <circle cx="90" cy="90" r="85" fill="#000" />
        <path d="M149 148L85 64H68v52h12V80l57 74c4-2 8-4 12-6z" fill="#fff" />
        <path d="M112 64h12v35l-12-15z" fill="#fff" />
      </svg>
    );
  }

  if (n.includes("typescript")) {
    return (
      <svg viewBox="0 0 128 128" className="tech-logo" aria-hidden="true">
        <rect width="128" height="128" rx="16" fill="#3178c6" />
        <path d="M70 42h-36v12h12v46h12V54h12V42zm16 43c4 5 10 8 18 8 7 0 12-3 12-8 0-6-5-8-14-11-13-4-21-9-21-20 0-11 9-19 23-19 10 0 18 3 24 9l-7 10c-5-4-10-6-17-6-6 0-10 3-10 7 0 5 5 7 13 10 14 5 22 10 22 21 0 12-10 20-25 20-12 0-21-4-28-11l7-9z" fill="#fff" />
      </svg>
    );
  }

  if (n.includes("tailwind")) {
    return (
      <svg viewBox="0 0 24 24" className="tech-logo" aria-hidden="true">
        <path d="M12 6c-3 0-4.5 1.5-4.5 4.5 0 2.5 1.5 3.5 3 4.5 1.5 1 2.5 1.5 2.5 3 0 1.5-1 2-2 2-2 0-3-1.5-3.5-2.5l-2.5 1c1 2 2.5 3.5 6 3.5 3.5 0 5-2 5-4.5 0-2.5-1.5-3.5-3-4.5-1.5-1-2.5-1.5-2.5-3 0-1 1-1.5 2-1.5 1.5 0 2.5 1 3 2l2.5-1C17 7.5 15 6 12 6zm-7 6c-3 0-4.5 1.5-4.5 4.5C.5 19 2 20 3.5 21c1.5 1 2.5 1.5 2.5 3 0 1.5-1 2-2 2-2 0-3-1.5-3.5-2.5L-2 24.5c1 2 2.5 3.5 6 3.5 3.5 0 5-2 5-4.5 0-2.5-1.5-3.5-3-4.5-1.5-1-2.5-1.5-2.5-3 0-1 1-1.5 2-1.5 1.5 0 2.5 1 3 2l2.5-1C8 13.5 6 12 3 12z" fill="#38bdf8" transform="translate(3,-3) scale(0.75)" />
      </svg>
    );
  }

  if (n.includes("node")) {
    return (
      <svg viewBox="0 0 128 128" className="tech-logo" aria-hidden="true">
        <path d="M64 8l52 30v60L64 128 12 98V38L64 8z" fill="#5fa04e" />
        <path d="M64 42c-12 0-20 7-20 17 0 15 21 16 21 24 0 3-3 5-7 5-6 0-11-3-15-7l-5 8c6 6 14 9 22 9 12 0 20-7 20-17 0-15-21-16-21-24 0-3 3-5 7-5 5 0 9 2 13 6l5-8c-5-5-12-8-20-8z" fill="#fff" />
      </svg>
    );
  }

  if (n.includes("express")) {
    return (
      <svg viewBox="0 0 128 128" className="tech-logo" aria-hidden="true">
        <rect width="128" height="128" rx="16" fill="#1e1e1e" />
        <text x="64" y="78" textAnchor="middle" fill="#fff" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="36" letterSpacing="-1">ex</text>
      </svg>
    );
  }

  if (n.includes("mongo")) {
    return (
      <svg viewBox="0 0 24 24" className="tech-logo" aria-hidden="true">
        <path d="M12 1.5s-4.5 4-4.5 9.5c0 4 2.5 7.5 4.5 11.5 2-4 4.5-7.5 4.5-11.5 0-5.5-4.5-9.5-4.5-9.5zm-.5 18c-1.5-3-3-5.5-3-8.5 0-3.5 2-6.5 3-8v16.5z" fill="#00ed64" />
      </svg>
    );
  }

  if (n.includes("sql") || n.includes("mysql")) {
    return (
      <svg viewBox="0 0 128 128" className="tech-logo" aria-hidden="true">
        <rect width="128" height="128" rx="16" fill="#00618a" />
        <text x="64" y="76" textAnchor="middle" fill="#e48e00" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="30">SQL</text>
      </svg>
    );
  }

  if (n.includes("redis")) {
    return (
      <svg viewBox="0 0 128 128" className="tech-logo" aria-hidden="true">
        <path d="M64 12L12 36l52 24 52-24-52-24zm0 36L12 72l52 24 52-24-52-24zm0 36L12 108l52 24 52-24-52-24z" fill="#dc382d" />
      </svg>
    );
  }

  if (n.includes("socket")) {
    return (
      <svg viewBox="0 0 128 128" className="tech-logo" aria-hidden="true">
        <circle cx="64" cy="64" r="56" fill="#010101" />
        <path d="M64 24L38 68h22v36l26-44H64V24z" fill="#fff" />
      </svg>
    );
  }

  if (n.includes("openai") || n.includes("gpt") || n.includes("llm")) {
    return (
      <svg viewBox="0 0 24 24" className="tech-logo" aria-hidden="true">
        <path d="M22.28 10.43a5.54 5.54 0 0 0-.47-4.47 5.7 5.7 0 0 0-3.9-2.73 5.67 5.67 0 0 0-4.63.85 5.6 5.6 0 0 0-3.8-1.58 5.73 5.73 0 0 0-5.46 4.04 5.6 5.6 0 0 0-2.3 3.66 5.69 5.69 0 0 0 .74 4.53 5.55 5.55 0 0 0 .47 4.47 5.7 5.7 0 0 0 3.9 2.73 5.67 5.67 0 0 0 4.63-.85 5.6 5.6 0 0 0 3.8 1.58 5.73 5.73 0 0 0 5.46-4.04 5.6 5.6 0 0 0 2.3-3.66 5.69 5.69 0 0 0-.74-4.53zm-8.86 10.1a4.2 4.2 0 0 1-2.61-.91l.13-.07 4.34-2.5a.77.77 0 0 0 .39-.68v-6.13l1.84 1.06v5.06a4.24 4.24 0 0 1-4.09 4.17zm-8.2-3.56a4.2 4.2 0 0 1-.51-2.72c.11-.96.6-1.84 1.36-2.45l.13.08 4.34 2.5a.77.77 0 0 0 .78 0l5.31-3.07v2.13l-4.38 2.53a4.24 4.24 0 0 1-7.03 1zM3.44 8.7a4.2 4.2 0 0 1 2.1-1.81c.9-.38 1.9-.37 2.8 0l-.13.08-4.34 2.5a.77.77 0 0 0-.39.68v6.13l-1.84-1.06V10.15c0-.5.14-.99.39-1.45zm13.78 2.55l-5.31 3.07v-2.13l4.38-2.53a4.24 4.24 0 0 1 7.03-1 4.2 4.2 0 0 1 .51 2.72 4.23 4.23 0 0 1-1.36 2.45l-.13-.08-4.34-2.5a.77.77 0 0 0-.78 0zm2.22-3.13l-.13-.08-4.34-2.5a.77.77 0 0 0-.78 0l-5.31 3.07V6.48l4.38-2.53a4.24 4.24 0 0 1 5.8 1.48 4.2 4.2 0 0 1 .38 3.4zm-8.44 5.34l-2.45-1.42 2.45-1.41 2.45 1.41-2.45 1.42z" fill="#10a37f" />
      </svg>
    );
  }

  if (n.includes("langchain")) {
    return (
      <svg viewBox="0 0 128 128" className="tech-logo" aria-hidden="true">
        <rect width="128" height="128" rx="16" fill="#1c3c3c" />
        <path d="M42 36h44c6 0 10 4 10 10v36c0 6-4 10-10 10H42c-6 0-10-4-10-10V46c0-6 4-10 10-10zm22 14v28m-14-14h28" stroke="#10b981" strokeWidth="10" strokeLinecap="round" />
      </svg>
    );
  }

  if (n.includes("python")) {
    return (
      <svg viewBox="0 0 128 128" className="tech-logo" aria-hidden="true">
        <path d="M63 12c-27 0-25 12-25 12l.03 12.5H64v3.7H28.5S12 38 12 65s14.5 26 14.5 26h8.6v-12.2s-.5-14.5 14.2-14.5h24.8s13.7.2 13.7-13.3V25.2S89.5 12 63 12zM52.3 20.3a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4z" fill="#3776ab" />
        <path d="M65 116c27 0 25-12 25-12l-.03-12.5H64v-3.7h35.5S116 90 116 63s-14.5-26-14.5-26h-8.6v12.2s.5 14.5-14.2 14.5H53.9S40.2 63.5 40.2 77v25.8s-1.7 13.2 24.8 13.2zm10.7-8.3a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4z" fill="#ffd438" />
      </svg>
    );
  }

  if (n.includes("docker")) {
    return (
      <svg viewBox="0 0 24 24" className="tech-logo" aria-hidden="true">
        <path d="M22.5 10.5c-.3-1.6-1.5-2.2-2.3-2.3-.5-.7-1.5-1.2-2.7-1.2h-.4c-.5-1.5-2-2.5-3.6-2.5H3.5C2.7 4.5 2 5.2 2 6v5.5c0 4.7 3.8 8.5 8.5 8.5 6 0 10.7-3.8 12-8.5v-1zm-13.5-3h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2h-2zm9 0h2v2h-2zm-9 3h2v2h-2zm3 0h2v2h-2zm3 0h2v2h-2zm3 0h2v2h-2zm3 0h2v2h-2z" fill="#2496ed" />
      </svg>
    );
  }

  if (n.includes("vercel")) {
    return (
      <svg viewBox="0 0 128 128" className="tech-logo" aria-hidden="true">
        <polygon points="64,16 120,112 8,112" fill="#000" />
      </svg>
    );
  }

  if (n.includes("azure")) {
    return (
      <svg viewBox="0 0 128 128" className="tech-logo" aria-hidden="true">
        <path d="M24 100l28-76h26L48 100H24zm34 0l16-44 26 22-18 22H58zm28-48l18-28h20l-30 48-8-20z" fill="#0089d6" />
      </svg>
    );
  }

  if (n.includes("three")) {
    return (
      <svg viewBox="0 0 128 128" className="tech-logo" aria-hidden="true">
        <polygon points="64,16 116,46 116,106 64,76" fill="#111" />
        <polygon points="64,16 12,46 12,106 64,76" fill="#333" />
        <polygon points="12,106 64,76 116,106 64,124" fill="#555" />
      </svg>
    );
  }

  if (n.includes("gsap")) {
    return (
      <svg viewBox="0 0 128 128" className="tech-logo" aria-hidden="true">
        <circle cx="64" cy="64" r="56" fill="#0ae448" />
        <path d="M42 42h44v14H56v10h26v14H56v16h32v10H42V42z" fill="#000" />
      </svg>
    );
  }

  if (n.includes("redux")) {
    return (
      <svg viewBox="0 0 128 128" className="tech-logo" aria-hidden="true">
        <circle cx="64" cy="64" r="56" fill="#764abc" />
        <path d="M64 36c-15 0-28 6-28 16 0 6 5 11 13 14-8 3-13 8-13 14 0 10 13 16 28 16s28-6 28-16c0-6-5-11-13-14 8-3 13-8 13-14 0-10-13-16-28-16z" fill="none" stroke="#fff" strokeWidth="6" />
      </svg>
    );
  }

  if (n.includes("git")) {
    return (
      <svg viewBox="0 0 128 128" className="tech-logo" aria-hidden="true">
        <path d="M124 55L73 4a12 12 0 0 0-17 0L46 14l22 22a14 14 0 0 1 18 18l21 21a14 14 0 1 1-9 8L78 63a14 14 0 0 1-18-18L38 23 4 57a12 12 0 0 0 0 17l51 50a12 12 0 0 0 17 0l52-52a12 12 0 0 0 0-17z" fill="#f05032" />
      </svg>
    );
  }

  if (n.includes("stripe")) {
    return (
      <svg viewBox="0 0 128 128" className="tech-logo" aria-hidden="true">
        <rect width="128" height="128" rx="16" fill="#635bff" />
        <path d="M58 48c0-4 3-6 8-6 7 0 16 2 23 6l4-14C85 30 76 28 66 28c-18 0-30 9-30 25 0 24 33 20 33 31 0 4-4 6-10 6-9 0-20-4-27-9l-4 15c9 5 20 7 31 7 19 0 32-9 32-26 0-26-33-22-33-31z" fill="#fff" />
      </svg>
    );
  }

  // Fallback icon for any generic technology
  return (
    <svg viewBox="0 0 24 24" className="tech-logo" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
