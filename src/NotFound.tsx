import { useEffect, useState } from "react";
import "./portfolio-v2.css";

export default function NotFound() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="notfound-shell">
      <header className="folio-nav">
        <a className="identity" href="/" aria-label="Manpreet Singh, home">
          <span className="identity-mark">
            m<span>↗</span>
          </span>
          <span>
            Manpreet Singh
            <small>FULL-STACK &amp; GENAI ENGINEER</small>
          </span>
        </a>
        <a className="nav-hello" href="/">
          BACK HOME <span>←</span>
        </a>
      </header>

      <main className="notfound-main content-width">
        <div className="notfound-kicker mono">
          <span>ERROR 404 // ROUTE NOT RESOLVED</span>
          <span className="notfound-pill">
            <span className="live-dot" /> MOHALI, IN · {time || "20:30:00"} IST
          </span>
        </div>

        <div className="notfound-display">
          <div className="notfound-code">
            <span>4</span>
            <span className="zero-orb">0</span>
            <span>4</span>
          </div>
          <h1>
            Lost in the <em>signal.</em>
          </h1>
          <p className="notfound-desc">
            The page you are looking for has either drifted out of orbit, been relocated, or never existed in this build.
          </p>
        </div>

        <div className="notfound-actions">
          <a href="/" className="send-button">
            Return to Portfolio <span>↳</span>
          </a>
          <a href="/#work" className="inline-link">
            Explore Selected Work <span>↗</span>
          </a>
          <a href="/#contact" className="inline-link">
            Send a Message <span>↗</span>
          </a>
        </div>

        <div className="notfound-dossier mono">
          <div className="dossier-row">
            <span>REQUESTED URI</span>
            <code>{typeof window !== "undefined" ? window.location.pathname : "/404"}</code>
          </div>
          <div className="dossier-row">
            <span>STATUS</span>
            <span className="dossier-badge">HTTP 404 NOT FOUND</span>
          </div>
          <div className="dossier-row">
            <span>INDEX REPO</span>
            <a href="https://github.com/mannrandhawa004" target="_blank" rel="noreferrer">
              github.com/mannrandhawa004 ↗
            </a>
          </div>
        </div>
      </main>

      <footer className="notfound-footer content-width mono">
        <span>© 2026 MANPREET SINGH</span>
        <span>MOHALI, PUNJAB · AVAILABLE WORLDWIDE</span>
      </footer>
    </div>
  );
}
