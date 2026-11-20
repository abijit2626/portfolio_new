import { useEffect, useRef, useState } from "react";
import { terminal, albums, months } from "../content.js";

const CAT = String.raw` /\_/\
( o.o )
 > ^ <   meow.`;

const FILES = {
  "about.txt": "engineering student · jcet palakkad\ndefensive security, ctfs, guitar, vinyl, cats.",
  "now.txt": terminal.now,
  "records.txt": albums.map((a, i) => `${i + 1}. ${a.title}`).join("\n"),
  "journal.txt": months.map((m) => `${String(m.n).padStart(2, "0")} ${m.name.padEnd(9)} ${m.status === "soon" ? "[locked]" : "[open]"}`).join("\n"),
};

function run(raw, setLines) {
  const [cmd, ...args] = raw.trim().split(/\s+/);
  const arg = args.join(" ");
  switch ((cmd || "").toLowerCase()) {
    case "": return [];
    case "help":
      return ["commands: whoami  ls  cat <file>  records  cats  dewy  date  echo  history  clear  sudo", "psst: there's a flag in here somewhere."];
    case "whoami": return [terminal.whoami];
    case "ls": return args.includes("-a") ? [".secret   " + Object.keys(FILES).join("   ")] : [Object.keys(FILES).join("   ")];
    case "la": return [".secret   " + Object.keys(FILES).join("   ")];
    case "cat":
      if (!arg) return ["cat: which file? try `ls`", CAT];
      if (arg === ".secret") return ["the flag hides in plain sight. try ./submit_flag"];
      return FILES[arg] ? FILES[arg].split("\n") : [`cat: ${arg}: no such file (try ls -a 👀)`];
    case "cats": return CAT.split("\n");
    case "records": return FILES["records.txt"].split("\n");
    case "dewy": return ["dewy: (◕‿◕)  status: being built. say \"hey dewy\" in december."];
    case "date": return [new Date().toString().slice(0, 24)];
    case "echo": return [arg];
    case "sudo": return ["nice try. this incident will be reported to the cat. 🐈"];
    case "./submit_flag": case "flag": return [{ ok: terminal.flag }, "+50 points. you found it ♡"];
    case "rm": return ["rm: absolutely not."];
    case "frank": return ["now playing: frank ocean (always)"];
    case "clear": setLines([]); return null;
    default: return [`${cmd}: command not found. try \`help\``];
  }
}

export default function Terminal() {
  const [lines, setLines] = useState([
    { cmd: "whoami" }, terminal.whoami,
    { cmd: "cat now.txt" }, terminal.now,
    "type `help` ↓",
  ]);
  const [val, setVal] = useState("");
  const [hist, setHist] = useState([]);
  const [hi, setHi] = useState(-1);
  const input = useRef(null);
  const body = useRef(null);

  useEffect(() => { body.current && (body.current.scrollTop = body.current.scrollHeight); }, [lines]);

  const submit = (e) => {
    e.preventDefault();
    const out = val === "history" ? hist.map((h, i) => `${i + 1}  ${h}`) : run(val, setLines);
    if (out !== null) setLines((l) => [...l, { cmd: val }, ...out]);
    if (val.trim()) setHist((h) => [...h, val]);
    setVal("");
    setHi(-1);
  };

  const key = (e) => {
    if (e.key === "ArrowUp" && hist.length) {
      e.preventDefault();
      const n = hi < 0 ? hist.length - 1 : Math.max(0, hi - 1);
      setHi(n); setVal(hist[n]);
    } else if (e.key === "ArrowDown" && hi >= 0) {
      e.preventDefault();
      const n = hi + 1;
      if (n >= hist.length) { setHi(-1); setVal(""); } else { setHi(n); setVal(hist[n]); }
    }
  };

  return (
    <div className="term" onClick={() => input.current?.focus()}>
      <div className="bar"><i /><i /><i /><span className="pixel">~/scrapbook — zsh</span></div>
      <div className="term-body" ref={body} aria-live="polite">
        {lines.map((l, i) =>
          typeof l === "object" && l.cmd !== undefined ? (
            <div key={i}><span className="p">{terminal.user}</span>:~$ {l.cmd}</div>
          ) : typeof l === "object" && l.ok ? (
            <div key={i} className="ok">{l.ok}</div>
          ) : (
            <div key={i} className="out">{l}</div>
          )
        )}
        <form onSubmit={submit} className="prompt">
          <span className="p">{terminal.user}</span>:~$&nbsp;
          <input
            ref={input}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={key}
            spellCheck={false}
            autoComplete="off"
            aria-label="terminal input"
          />
        </form>
      </div>
    </div>
  );
}
