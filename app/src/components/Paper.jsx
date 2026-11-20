import { useEffect, useRef, useState } from "react";

import { img } from "../site.js";
export { img };

export function Px({ src, alt = "", className = "", style }) {
  return <img className={`px ${className}`} src={img(src)} alt={alt} style={style} draggable={false} />;
}

export function Tape({ color = "", style }) {
  return <span className={`tape ${color}`} style={style} aria-hidden="true" />;
}

export function Paper({ as: Tag = "div", torn, className = "", children, ...rest }) {
  return (
    <Tag className={`paper ${torn ? "torn" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

export function Label({ children, id }) {
  return <h2 id={id}>{children}</h2>;
}

const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage blocked: fine */ } },
};

// A sticker you can pick up and move. Its spot is remembered in this browser.
export function Sticker({ id, src, alt = "", width = 56, style, rotate = 0 }) {
  const [off, setOff] = useState(() => store.get(`sticker:${id}`) || { x: 0, y: 0 });
  const [drag, setDrag] = useState(false);
  const start = useRef(null);

  const down = (e) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { px: e.clientX, py: e.clientY, ...off };
    setDrag(true);
  };
  const move = (e) => {
    if (!drag || !start.current) return;
    setOff({ x: start.current.x + e.clientX - start.current.px, y: start.current.y + e.clientY - start.current.py });
  };
  const up = () => {
    setDrag(false);
    store.set(`sticker:${id}`, off);
  };

  return (
    <img
      className={`sticker px ${drag ? "dragging" : ""}`}
      src={img(src)}
      alt={alt}
      title="drag me"
      draggable={false}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      style={{ width, ...style, transform: `translate(${off.x}px, ${off.y}px) rotate(${rotate}deg) ${drag ? "scale(1.15)" : ""}` }}
    />
  );
}

// Fades sections in as you scroll to them.
export function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    const safety = setTimeout(() => setOn(true), 2500); // never leave content hidden
    return () => { io.disconnect(); clearTimeout(safety); };
  }, []);
  return (
    <div ref={ref} className={`reveal ${on ? "in" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
