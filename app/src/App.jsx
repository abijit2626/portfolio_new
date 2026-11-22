import { useEffect, useState } from "react";
import { Nav, Footer } from "./components/Chrome.jsx";
import { CatRain } from "./components/Cat.jsx";
import Home from "./pages/Home.jsx";
import Month from "./pages/Month.jsx";
import Project from "./pages/Project.jsx";
import About from "./pages/About.jsx";
import { Paper } from "./components/Paper.jsx";
import Cliffside from "./components/Cliffside.jsx";
import { homeHref } from "./site.js";
import { months } from "./content.js";

// The mood a visitor picked on the opening cliffside scene. Kept for this browser tab session
// only, so a new visit gets the opening again.
const LOOKS = ["orange", "blonde", "endless"];
function readLook() {
  try {
    const v = sessionStorage.getItem("look");
    return LOOKS.includes(v) ? v : null;
  } catch { return null; }
}


// Every page is still its own HTML file (so each URL works on its own), but moving between them
// inside the site swaps the page in place instead of reloading. That keeps the music playing.
const PAGE = /(months\/month-(\d+)|projects\/([\w-]+)|about|index)\.html$/;
function locate(pathname) {
  const m = pathname.match(PAGE);
  const base = m ? pathname.slice(0, m.index) : pathname.replace(/[^/]*$/, "");
  let route = "/", prefix = "";
  if (m && m[2]) { route = `/month/${m[2]}`; prefix = "../"; }
  else if (m && m[3]) { route = `/projects/${m[3]}`; prefix = "../"; }
  else if (m && m[1] === "about") route = "/about";
  return { base, route, prefix };
}
function titleFor(route) {
  const m = route.match(/^\/month\/(\d+)$/);
  if (m) return `${months.find((x) => x.n === Number(m[1]))?.name || "journal"} · abijit arun`;
  if (route === "/about") return "about · abijit arun";
  if (route.startsWith("/projects/")) return `${route.slice(10)} · abijit arun`;
  return "abijit arun · scrapbook of making";
}

function Lost() {
  return (
    <div className="wrap">
      <Paper torn className="blank">
        <h1>404</h1>
        <p className="hand">the cat knocked this page off the table. <a href={homeHref()}>go home →</a></p>
      </Paper>
    </div>
  );
}

export default function App({ route: first }) {
  const [route, setRoute] = useState(first);
  const [look, setLook] = useState(() => readLook() || "orange");
  const [firstVisit] = useState(() => !readLook());
  const [reopen, setReopen] = useState(0);

  useEffect(() => { document.documentElement.dataset.look = look; }, [look]);

  useEffect(() => {
    const go = (r, prefix) => {
      window.SITE_PREFIX = prefix; // links and images are written relative to the page's folder
      document.title = titleFor(r);
      setRoute(r);
    };
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest("a[href]");
      if (!a || a.target || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || !PAGE.test(url.pathname)) return;
      const to = locate(url.pathname);
      if (to.base !== locate(location.pathname).base) return; // not one of this site's pages
      e.preventDefault();
      if (url.pathname === location.pathname) { window.scrollTo({ top: 0 }); return; }
      history.pushState(null, "", url.pathname + url.search);
      go(to.route, to.prefix);
      window.scrollTo({ top: 0 });
    };
    const onPop = () => { const to = locate(location.pathname); go(to.route, to.prefix); };
    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPop);
    return () => { document.removeEventListener("click", onClick); window.removeEventListener("popstate", onPop); };
  }, []);

  const choose = (id) => {
    setLook(id);
    try { sessionStorage.setItem("look", id); } catch { /* storage blocked: fine */ }
  };
  let page;
  const month = route.match(/^\/month\/(\d+)$/);
  const proj = route.match(/^\/projects\/([\w-]+)$/);
  if (route === "/") page = <Home look={look} />;
  else if (route === "/about") page = <About />;
  else if (month) page = <Month n={Number(month[1])} />;
  else if (proj) page = <Project id={proj[1]} />;
  else page = <Lost />;

  return (
    <>
      <Nav route={route} onMood={() => setReopen((n) => n + 1)} />
      <Cliffside look={look} startFull={firstVisit} reopen={reopen} onPick={choose} />
      <main key={route} className="page-in">{page}</main>
      <Footer />
      <CatRain />
    </>
  );
}
