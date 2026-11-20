import { Px } from "./Paper.jsx";

export function Nav({ route, onMood }) {
  const at = (r) => (route === r || route.startsWith(r + "/") ? "here" : "");
  return (
    <nav className="topnav" aria-label="main">
      <a href="#/" className={route === "/" ? "here" : ""}>home</a>
      <a href="#/month/1" className={at("/month")}>journal</a>
      <a href="#/projects/dewy" className={at("/projects")}>dewy</a>
      <a href="#/about" className={at("/about")}>about</a>
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
