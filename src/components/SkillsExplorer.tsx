import { useState, useRef, type KeyboardEvent } from "react";
import { TechIcon } from "./TechLogos";

type SkillCategory = {
  index: string;
  tag: string;
  title: string;
  summary: string;
  stack: string[];
};

export default function SkillsExplorer({ categories }: { categories: SkillCategory[] }) {
  const [selected, setSelected] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);
  const prevSelected = useRef(0);

  const changeTab = (nextIndex: number) => {
    if (nextIndex === selected || animating) return;
    setDirection(nextIndex > selected ? "next" : "prev");
    setAnimating(true);
    setSelected(nextIndex);
    prevSelected.current = nextIndex;
    setTimeout(() => {
      setAnimating(false);
    }, 400);
  };

  const moveTab = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const dir = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (dir === undefined && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
        ? categories.length - 1
        : (index + (dir ?? 0) + categories.length) % categories.length;
    changeTab(next);
    document.getElementById(`skill-tab-${next}`)?.focus();
  };

  const currentCategory = categories[selected];

  return (
    <div className="skills-explorer" data-enter>
      <div className="skill-tabs" role="tablist" aria-label="Explore skills">
        {categories.map((category, index) => (
          <button
            type="button"
            key={category.index}
            role="tab"
            id={`skill-tab-${index}`}
            aria-selected={selected === index}
            aria-controls={`skill-panel-${index}`}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => changeTab(index)}
            onKeyDown={(event) => moveTab(event, index)}
          >
            <span className="mono">{category.index}</span>
            <span>{["Frontend", "Backend", "GenAI", "Security & Cloud"][index]}</span>
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>

      <div className="skill-panel-wrapper">
        <div
          key={selected}
          className={`skill-panel skill-panel-animated skill-slide-${direction}`}
          id={`skill-panel-${selected}`}
          role="tabpanel"
          aria-labelledby={`skill-tab-${selected}`}
          tabIndex={0}
        >
          <div className="skill-panel-top mono">
            <span>{currentCategory.tag}</span>
            <span>{currentCategory.stack.length.toString().padStart(2, "0")} TECHNOLOGIES</span>
          </div>
          <h3>{currentCategory.title}</h3>
          <p>{currentCategory.summary}</p>
          <ul className="skill-field" aria-label={`${currentCategory.tag} technologies`}>
            {currentCategory.stack.map((tool, idx) => (
              <li
                key={tool}
                className="skill-item-fade"
                style={{ animationDelay: `${idx * 40 + 60}ms` }}
              >
                <TechIcon name={tool} />
                <span>{tool}</span>
                <span className="skill-plus" aria-hidden="true">
                  +
                </span>
              </li>
            ))}
          </ul>
          <div className="skill-panel-bottom mono">
            <span>THE RIGHT TOOLS. CONNECTED THOUGHTFULLY.</span>
            <span>{currentCategory.index} / 04</span>
          </div>
        </div>
      </div>
    </div>
  );
}
