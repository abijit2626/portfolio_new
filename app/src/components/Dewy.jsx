import { useEffect, useState } from "react";

// A live pixel Dewy: blinks, glances around, changes mood when you hover,
// and switches to cat mode when you click it (just like the real one).
const PALETTES = [
  { eye: "#f7a8c4", pupil: "#5a1f33" },
  { eye: "#9cd3e8", pupil: "#1d3b52" },
  { eye: "#b7e08a", pupil: "#2c4a1e" },
  { eye: "#f7c873", pupil: "#6a3a10" },
];

export default function Dewy({ size = 120, interactive = true, startCat = false }) {
  const [pal] = useState(() => PALETTES[Math.floor(Math.random() * PALETTES.length)]);
  const [blink, setBlink] = useState(false);
  const [look, setLook] = useState(0);
  const [cat, setCat] = useState(startCat);
  const [mood, setMood] = useState("calm"); // calm | happy | dizzy

  useEffect(() => {
    let t1, t2;
    const loop = () => {
      t1 = setTimeout(() => {
        setBlink(true);
        t2 = setTimeout(() => { setBlink(false); loop(); }, 140);
      }, 2200 + Math.random() * 2600);
    };
    loop();
    const g = setInterval(() => setLook([-1, 0, 0, 1][Math.floor(Math.random() * 4)]), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearInterval(g); };
  }, []);

  // grid is 32 × 26
  const eyeY = mood === "happy" ? 9 : 8;
  const eyeH = blink ? 1 : mood === "happy" ? 5 : 7;
  const eyeTop = blink ? eyeY + 3 : eyeY;
  const eyes = [
    { x: 6, tilt: -1 },
    { x: 19, tilt: 1 },
  ];

  const pupil = (ex) => {
    if (blink) return null;
    if (mood === "dizzy") {
      return (
        <g fill={pal.pupil}>
          <rect x={ex + 2} y={eyeTop + 2} width="3" height="1" />
          <rect x={ex + 4} y={eyeTop + 3} width="1" height="2" />
          <rect x={ex + 2} y={eyeTop + 4} width="2" height="1" />
        </g>
      );
    }
    if (cat) return <rect x={ex + 3 + look} y={eyeTop + 1} width="1" height={eyeH - 2} fill={pal.pupil} />;
    return <rect x={ex + 2 + look} y={eyeTop + 2} width="3" height={Math.max(1, eyeH - 3)} fill={pal.pupil} />;
  };

  return (
    <button
      type="button"
      className={`dewy ${interactive ? "live" : ""}`}
      style={{ width: size }}
      aria-label={cat ? "dewy in cat mode. click to switch back" : "dewy the desk robot. click for cat mode"}
      title={interactive ? (cat ? "meow. click to un-cat" : "click me") : undefined}
      onClick={() => interactive && setCat((c) => !c)}
      onMouseEnter={() => interactive && setMood("happy")}
      onMouseLeave={() => interactive && setMood("calm")}
      onDoubleClick={() => { if (!interactive) return; setMood("dizzy"); setTimeout(() => setMood("calm"), 1800); }}
      tabIndex={interactive ? 0 : -1}
    >
      <svg viewBox="0 0 32 28" shapeRendering="crispEdges">
        {cat && (
          <g fill="#1f1d1a">
            <rect x="3" y="0" width="2" height="3" /><rect x="5" y="1" width="2" height="2" />
            <rect x="27" y="0" width="2" height="3" /><rect x="25" y="1" width="2" height="2" />
          </g>
        )}
        <rect x="1" y="3" width="30" height="24" fill="#1f1d1a" />
        <rect x="2" y="4" width="28" height="22" fill="#fbf3e4" />
        <rect x="3" y="5" width="26" height="16" fill="#1f1d1a" />
        {eyes.map((e) => (
          <g key={e.x}>
            <rect x={e.x} y={eyeTop} width="7" height={eyeH} fill={pal.eye} />
            {!blink && mood !== "happy" && <rect x={e.tilt < 0 ? e.x : e.x + 6} y={eyeTop} width="1" height="1" fill="#1f1d1a" />}
            {pupil(e.x)}
          </g>
        ))}
        {mood === "dizzy" ? (
          <rect x="14" y="18" width="4" height="1" fill={pal.eye} />
        ) : cat ? (
          <g fill={pal.eye}>
            <rect x="14" y="17" width="1" height="1" /><rect x="15" y="18" width="1" height="1" />
            <rect x="16" y="17" width="1" height="1" /><rect x="17" y="18" width="1" height="1" />
            <rect x="18" y="17" width="1" height="1" />
          </g>
        ) : (
          <g fill={pal.eye}>
            <rect x="14" y="17" width="1" height="1" /><rect x="15" y="18" width="3" height="1" /><rect x="18" y="17" width="1" height="1" />
          </g>
        )}
        <g fill="#1f1d1a">
          <rect x="11" y="23" width="2" height="1" /><rect x="15" y="23" width="2" height="1" /><rect x="19" y="23" width="2" height="1" />
        </g>
      </svg>
    </button>
  );
}
