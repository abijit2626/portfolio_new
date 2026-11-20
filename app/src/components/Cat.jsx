import { useEffect, useState } from "react";
import { img } from "./Paper.jsx";

// Type "meow" anywhere and it rains cats.
export function CatRain() {
  const [drops, setDrops] = useState([]);
  useEffect(() => {
    let typed = "";
    const onKey = (e) => {
      if (e.target.closest?.("input, textarea")) return;
      typed = (typed + e.key.toLowerCase()).slice(-4);
      if (typed === "meow") {
        const batch = Array.from({ length: 28 }).map((_, i) => ({
          id: Date.now() + i,
          left: Math.random() * 100,
          delay: Math.random() * 1.6,
          dur: 2.2 + Math.random() * 1.8,
          src: Math.random() < 0.5 ? "px-cat.svg" : "px-cat-black.svg",
          size: 28 + Math.random() * 28,
        }));
        setDrops(batch);
        setTimeout(() => setDrops([]), 4800);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  if (!drops.length) return null;
  return (
    <div className="cat-rain" aria-hidden="true">
      {drops.map((d) => (
        <img key={d.id} className="px" src={img(d.src)} alt="" style={{ left: `${d.left}%`, width: d.size, animationDelay: `${d.delay}s`, animationDuration: `${d.dur}s` }} />
      ))}
    </div>
  );
}
