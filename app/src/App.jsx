import { useEffect, useState } from "react";
import { Nav, Footer } from "./components/Chrome.jsx";
import { CatRain } from "./components/Cat.jsx";
import Home from "./pages/Home.jsx";
import Month from "./pages/Month.jsx";
import Project from "./pages/Project.jsx";
import About from "./pages/About.jsx";
import { Paper } from "./components/Paper.jsx";
import Cliffside from "./components/Cliffside.jsx";

// The mood a visitor picked on the opening cliffside scene. Kept for this browser tab session
// only, so a new visit gets the opening again.
const LOOKS = ["orange", "blonde", "endless"];
function readLook() {
  try {
    const v = sessionStorage.getItem("look");
    return LOOKS.includes(v) ? v : null;
  } catch { return null; }
}

// Hash routing (#/month/1) so the site works as plain static files anywhere.
function useRoute() {
  const get = () => (window.location.hash.replace(/^#/, "") || "/");
  const [route, setRoute] = useState(get);
  useEffect(() => {
    const on = () => { setRoute(get()); window.scrollTo({ top: 0 }); };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}

function Lost() {
  return (
    <div className="wrap">
      <Paper torn className="blank">
        <h1>404</h1>
        <p className="hand">the cat knocked this page off the table. <a href="#/">go home →</a></p>
      </Paper>
    </div>
  );
}

export default function App() {
  const route = useRoute();
  const [look, setLook] = useState(() => readLook() || "orange");
  const [firstVisit] = useState(() => !readLook());
  const [reopen, setReopen] = useState(0);

  useEffect(() => { document.documentElement.dataset.look = look; }, [look]);

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

  useEffect(() => {
    const titles = { "/": "abijit arun · scrapbook of making" };
    document.title = titles[route] || `${route.split("/").pop()} · abijit arun`;
  }, [route]);

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
