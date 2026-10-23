import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Portfolio from "./Portfolio";
import NotFound from "./NotFound";

function AppRouter() {
  const [is404, setIs404] = useState(() => {
    const path = window.location.pathname;
    return path !== "/" && path !== "" && path !== "/index.html";
  });

  useEffect(() => {
    const onPop = () => {
      const path = window.location.pathname;
      setIs404(path !== "/" && path !== "" && path !== "/index.html");
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  if (is404) {
    return <NotFound />;
  }

  return <Portfolio />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
