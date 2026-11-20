import { Px } from "./Paper.jsx";
import { homeHref, aboutHref, monthHref, projectHref } from "../site.js";

export function Nav({ route, onMood }) {
  const at = (r) => (route === r || route.startsWith(r + "/") ? "here" : "");
  return (
    <nav className="topnav" aria-label="main">
      <a href={homeHref()} className={route === "/" ? "here" : ""}>home</a>
      <a href={monthHref(1)} className={at("/month")}>journal</a>
      <a href={projectHref("dewy")} className={at("/projects")}>dewy</a>
      <a href={aboutHref()} className={at("/about")}>about</a>
      <button type="button" className="mood-btn" onClick={onMood} title="pick a different record (changes the look)">
        ◉ change record
      </button>
    </nav>
  );
}

export function Footer() {
  return (
    <footer>
      <Px src="px-cat-sleep.svg" alt="pixel black cat curled up asleep" className="sleepy" />
      <div className="pixel">made slowly in palakkad · tinkerhub maker fellowship '26</div>
      <div className="hand footer-tip">psst: type “meow” anywhere ↑</div>
    </footer>
  );
}
