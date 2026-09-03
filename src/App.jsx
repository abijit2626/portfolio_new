import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef, useCallback } from 'react'
import menuVideo from './assets/Mainn.mp4'
import menuLoopVideo from './assets/Mainn_1.mp4'
import main1 from './assets/main1.mp4'
import main2 from './assets/main2.mp4'
import main3 from './assets/main3.mp4'
import P3Menu from './P3Menu'
import VideoPage from './VideoPage'
import ResumePage from './ResumePage'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import './App.css'

function BackgroundVideo({ intro, loop, ...props }) {
  const [showLoop, setShowLoop] = useState(false);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, background: '#000' }}>
      <video
        {...props}
        src={intro}
        autoPlay
        muted
        playsInline
        style={{ 
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          zIndex: showLoop ? 1 : 2,
          opacity: showLoop ? 0 : 1,
          transition: 'opacity 0.4s ease-in-out'
        }}
        onEnded={() => setShowLoop(true)}
      />
      <video
        {...props}
        src={loop}
        autoPlay
        loop
        muted
        playsInline
        style={{ 
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          zIndex: showLoop ? 2 : 1,
          opacity: showLoop ? 1 : 0,
          transition: 'opacity 0.4s ease-in-out'
        }}
      />
    </div>
  );
}

function MenuScreen() {
  const navigate = useNavigate()
  useEffect(() => {
    const v = document.querySelector('video');
    if (v) {
      v.play().catch(e => console.log("Autoplay blocked:", e));
    }
  }, []);

  return (
    <div id="menu-screen">
      <BackgroundVideo intro={menuVideo} loop={menuLoopVideo} />
      <P3Menu onNavigate={(page) => {
        if (page === 'github') {
          window.open('https://github.com/abijit2626', '_blank', 'noopener,noreferrer')
        } else {
          navigate(`/${page}`)
        }
      }} />
    </div>
  )
}


const COMING_SOON_PROJECTS = [
  {
    name: "Threat Detection & Correlation Engine",
    role: "SOON",
    badge: "COMING SOON",
    html_url: "https://github.com/abijit2626",
    stats: [
      { label: "STATUS", value: "COMING SOON", tag: "⏳", box: "STATE" },
      { label: "FOCUS", value: "SIEM CORRELATION", tag: "🛡️", box: "TARGET" },
      { label: "STACK", value: "PYTHON / SQLITE", tag: "⚙️", box: "TECH" },
    ],
  },
  {
    name: "Endpoint Behavioral Telemetry Agent",
    role: "SOON",
    badge: "IN PROGRESS",
    html_url: "https://github.com/abijit2626",
    stats: [
      { label: "STATUS", value: "IN PROGRESS", tag: "⏳", box: "STATE" },
      { label: "FOCUS", value: "PROCESS & KEY HOOKS", tag: "🛡️", box: "TARGET" },
      { label: "STACK", value: "C / PYTHON", tag: "⚙️", box: "TECH" },
    ],
  },
  {
    name: "Network Traffic Anomaly Hunter",
    role: "SOON",
    badge: "COMING SOON",
    html_url: "https://github.com/abijit2626",
    stats: [
      { label: "STATUS", value: "COMING SOON", tag: "⏳", box: "STATE" },
      { label: "FOCUS", value: "PCAP / TRAFFIC TRIAGE", tag: "🛡️", box: "TARGET" },
      { label: "STACK", value: "WIRESHARK / TSHARK", tag: "⚙️", box: "TECH" },
    ],
  },
  {
    name: "Automated Incident Triage Playbooks",
    role: "SOON",
    badge: "PLANNING",
    html_url: "https://github.com/abijit2626",
    stats: [
      { label: "STATUS", value: "PLANNING", tag: "⏳", box: "STATE" },
      { label: "FOCUS", value: "SOC INVESTIGATIONS", tag: "🛡️", box: "TARGET" },
      { label: "STACK", value: "PYTHON / BASH", tag: "⚙️", box: "TECH" },
    ],
  },
  {
    name: "Sigma & Wazuh Rule Pipeline",
    role: "SOON",
    badge: "COMING SOON",
    html_url: "https://github.com/abijit2626",
    stats: [
      { label: "STATUS", value: "COMING SOON", tag: "⏳", box: "STATE" },
      { label: "FOCUS", value: "DETECTION ENGINEERING", tag: "🛡️", box: "TARGET" },
      { label: "STACK", value: "SIGMA / YAML / SIEM", tag: "⚙️", box: "TECH" },
    ],
  },
];

function SideProjectsPage() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  const [activeInfoBar, setActiveInfoBar] = useState(0);
  const projects = COMING_SOON_PROJECTS;

  useEffect(() => {
    const v = document.querySelector('video');
    if (v) v.play().catch(() => { });
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(projects.length - 1, i + 1));
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
      if (e.key === "Enter" && projects[active]) {
        window.open(projects[active].html_url || "https://github.com/abijit2626", "_blank", "noopener,noreferrer");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, active, projects]);

  const renderInfoBars = () => {
    const proj = projects[active];
    if (!proj) return null;
    const stats = proj.stats || [
      { label: "STATUS", value: "COMING SOON", tag: "⏳", box: "STATE" },
      { label: "FOCUS", value: "DEFENSIVE SECURITY", tag: "🛡️", box: "TARGET" },
      { label: "STACK", value: "PYTHON / C", tag: "⚙️", box: "TECH" },
    ];

    return stats.map((s, i) => (
      <div
        className={`sc-info-bar-wrap${activeInfoBar === i ? " selected" : ""}`}
        key={`stat-${active}-${i}`}
        style={{ top: `${155 + i * 52}px`, animationDelay: `${i * 50}ms` }}
        onMouseEnter={() => setActiveInfoBar(i)}
      >
        <div className="sc-info-bar">
          <span style={{ fontSize: '24px', marginLeft: '14px', marginRight: '8px' }}>{s.tag}</span>
          <span className="sc-info-bar-text" style={{ flex: 1 }}>{s.label}</span>
          <span className="sc-info-bar-box">{s.box || "VALUE"}</span>
          <span className="sc-info-bar-count" style={{ minWidth: '80px', textAlign: 'right', marginRight: '16px', whiteSpace: 'nowrap' }}>{s.value}</span>
        </div>
      </div>
    ));
  };

  return (
    <div id="menu-screen">
      <BackgroundVideo intro={menuVideo} loop={menuLoopVideo} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,700;1,700&family=Montserrat:wght@300&display=swap');
        
        .sp-container {
          position: absolute;
          inset: 0;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 8px;
          padding-left: 2.8vw;
          padding-top: 6vh;
        }
        
        .sp-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 88px;
          line-height: 0.9;
          color: #000000;
          letter-spacing: 4px;
          text-shadow: 0 2px 0 rgba(255,255,255,0.25);
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sp-container.mounted .sp-title, .sp-container.mounted .sp-subtitle {
          opacity: 1;
          transform: translateX(0);
        }
        
        .sp-subtitle {
          font-family: 'Montserrat', sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: #000000;
          letter-spacing: 1px;
          max-width: 55vw;
          line-height: 1.6;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.5s ease 0.1s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.1s;
        }

        .sp-btn-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 24px;
        }

        /* ── Socials sc-bar CSS ── */
        .sc-bar {
          position: relative;
          width: 45vw;
          height: 64px;
          transition: height 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, background 0.35s ease;
          background: #111;
          cursor: pointer;
          pointer-events: all;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 6px 24px rgba(0,0,0,0.65);
          z-index: 1;
        }
        .sc-bar-outer.active .sc-bar {
          transform: translateX(6px) scale(1.02);
          box-shadow: 10px 8px 0 #d63232;
        }
        .sc-bar-outer {
          position: relative;
          flex-shrink: 0;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-bar-outer.active .sc-bar     { height: 90px; }
        .sc-bar-outer.active .sc-bar-red { height: 90px; opacity: 1; }
        .sc-bar-outer.mounted { opacity: 1; transform: translateX(0); }

        .sc-bar-red {
          position: absolute;
          top: 0; left: 0;
          width: 45vw;
          height: 64px;
          background: #c4001a;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          transform: translateY(-7px);
          opacity: 0;
          transition: opacity 0.3s ease, height 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
          pointer-events: none;
        }
        .sc-bar-fill {
          position: absolute;
          inset: 0;
          width: 100%;
          background: var(--p3-blue-light);
          clip-path: polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%);
          transition: clip-path 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .sc-bar-outer.active .sc-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }
        .sc-bar-shade {
          position: absolute;
          top: 0; bottom: 0;
          left: 73%;
          width: 6%;
          background: linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%);
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .sc-bar-outer.active .sc-bar-shade { opacity: 1; }

        .sc-bar::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 6px;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%);
          z-index: 10;
          pointer-events: none;
        }
        .sc-bar-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0 20px 0 20px;
        }

        .sc-role {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          font-family: 'Anton', sans-serif;
          font-size: 50px;
          letter-spacing: 1px;
          color: #ffffff;
          transform: rotate(-30deg);
          user-select: none;
          line-height: 1;
          padding: 0 16px 0 8px;
          width: 140px;
        }

        .sc-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 3px;
          padding-left: 50px;
        }

        .sc-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 3px;
          line-height: 1.1;
          color: rgba(255,255,255,0.85);
          transition: color 0.2s ease;
          user-select: none;
        }
        .sc-bar-outer.active .sc-label { color: var(--p3-text-on-light); }

        /* ── Info Bars (Right Side Details) ── */
        @keyframes sc-infobar-in {
          0%   { opacity: 0; transform: translateX(40px); }
          60%  { opacity: 1; transform: translateX(-4px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .sc-info-bar-wrap {
          position: fixed;
          right: 48px;
          left: min(58%, calc(100vw - 440px));
          height: 46px;
          background: transparent;
          pointer-events: all;
          z-index: 50;
          padding: 0;
          animation: sc-infobar-in 0.35s cubic-bezier(0.22,1,0.36,1) both;
          transition: transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), background 0.2s ease, padding 0.2s ease, border-radius 0.2s ease;
          cursor: default;
        }
        .sc-info-bar-wrap.selected {
          background: #111;
          padding: 1.5px;
          border-radius: 8px;
          transform: translateX(-4px);
        }
        .sc-info-bar {
          position: relative;
          width: 100%;
          height: 100%;
          background: transparent;
          display: flex;
          align-items: center;
          overflow: hidden;
          transition: background 0.2s ease, border-radius 0.2s ease;
        }
        .sc-info-bar-wrap.selected .sc-info-bar {
          background: var(--p3-blue-light);
          border-radius: 7px;
        }
        .sc-info-bar-wrap.selected .sc-info-bar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: #c4001a;
          z-index: 1;
        }
        .sc-info-bar-text {
          flex: 1;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 2px;
          color: var(--p3-bg-dark);
          padding: 0 14px;
          user-select: none;
        }
        .sc-info-bar-box {
          height: 70%;
          background: #000;
          display: flex;
          align-items: center;
          padding: 0 12px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 1px;
          color: #fff;
          flex-shrink: 0;
          border-radius: 6px;
          margin-right: 4px;
          user-select: none;
        }
        .sc-info-bar-count {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 1px;
          color: #111;
          flex-shrink: 0;
          user-select: none;
        }

        /* Legacy Backup Styles */
        .p3-row-clone {
          position: relative; cursor: pointer; display: inline-flex; align-items: center; justify-content: flex-start; line-height: 1; text-decoration: none; opacity: 0; transform: translateX(-36px); transition: opacity 0.38s ease, transform 0.38s cubic-bezier(0.22,1,0.36,1);
        }
        .sp-container.mounted .p3-row-clone { opacity: 1; transform: translateX(0); }
        .p3-skew-wrap-clone { position: relative; display: flex; align-items: center; isolation: isolate; transform: skewX(-4deg) skewY(2deg); }
        .p3-shadow-tri-clone { position: absolute; top: 50%; left: -10%; width: 120%; height: 100%; transform-origin: left center; background: rgba(235, 80, 120, 0.85); z-index: 1; pointer-events: none; transform: translateY(-40%) translateX(-12px) scaleX(0); transition: transform 0.18s ease; clip-path: polygon(0 0, 100% 50%, 0 100%); }
        .p3-row-clone:hover .p3-shadow-tri-clone { transform: translateY(-40%) translateX(-12px) scaleX(1); }
        .p3-highlight-clone { position: absolute; top: 50%; left: -10%; width: 120%; height: 100%; transform-origin: left center; background: #ffffff; z-index: 2; transition: transform 0.22s cubic-bezier(0.22,1,0.36,1); pointer-events: none; transform: translateY(-50%) scaleX(0); clip-path: polygon(0 0, 100% 50%, 0 100%); }
        .p3-row-clone:hover .p3-highlight-clone { transform: translateY(-50%) scaleX(1); }
        .p3-label-wrap-clone { position: relative; z-index: 3; }
        .p3-label-base-clone { font-family: 'Anton', sans-serif; font-style: italic; letter-spacing: 2px; line-height: 0.85; display: block; white-space: nowrap; }
        .p3-label-dark-clone { color: #3ce2ff; transition: color 0.12s ease; }
        .p3-row-clone:hover .p3-label-dark-clone { color: #6b0010; }
        .p3-label-bright-clone { color: #ff2a2a; position: absolute; inset: 0; z-index: 1; opacity: 0; transition: opacity 0.12s ease; clip-path: polygon(0 0, 100% 50%, 0 100%); }
        .p3-row-clone:hover .p3-label-bright-clone { opacity: 1; }
        
        .sp-loading { font-family: 'Montserrat', sans-serif; font-size: 16px; color: #8df6ff; letter-spacing: 1px; opacity: 0.8; animation: sp-pulse 1.5s ease-in-out infinite; }
        @keyframes sp-pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        .sp-error { font-family: 'Montserrat', sans-serif; font-size: 14px; padding: 12px 18px; background: rgba(232, 61, 49, 0.15); border: 1px solid rgba(232, 61, 49, 0.4); color: #ff9999; clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 100%, 6px 100%); margin-bottom: 16px; opacity: 0; }
      `}</style>
      <div className={`sp-container${mounted ? ' mounted' : ''}`}>
        <h1 className="sp-title">SIDE PROJECTS</h1>
        <p className="sp-subtitle">
          Upcoming defensive security tools, telemetry collectors, and lab automation projects currently in development.
        </p>

        <div className="sp-btn-list" role="navigation">
          {projects.map((proj, idx) => (
            <div
              key={proj.name}
              className={`sc-bar-outer${active === idx ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: mounted ? `${idx * 60 + 100}ms` : "0ms" }}
              onMouseEnter={() => setActive(idx)}
            >
              <div className="sc-bar-red" />
              <div
                className="sc-bar"
                onClick={() => {
                  setActive(idx);
                  window.open(proj.html_url || "https://github.com/abijit2626", "_blank");
                }}
              >
                <div className="sc-bar-fill" />
                <div className="sc-bar-shade" />
                <div className="sc-bar-content">
                  <div className="sc-role">{proj.role || "SOON"}</div>
                  <div className="sc-main">
                    <div className="sc-label" style={{ fontSize: proj.name.length > 24 ? '21px' : '26px' }}>
                      {proj.name}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '18px',
                      letterSpacing: '1.2px',
                      color: active === idx ? '#041238' : '#8df6ff',
                      background: active === idx ? '#ffd28d' : 'rgba(141, 246, 255, 0.16)',
                      padding: '4px 10px',
                      clipPath: 'polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
                      flexShrink: 0,
                      marginRight: '12px',
                      transition: 'background 0.2s ease, color 0.2s ease',
                    }}
                  >
                    {proj.badge || "COMING SOON"}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '40px', display: 'flex', gap: '200px', marginLeft: '15px' }}>
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); navigate('/') }}
              className="p3-row-clone"
              style={{ transitionDelay: '600ms' }}
            >
              <div className="p3-skew-wrap-clone" style={{ transform: 'skewX(4deg) skewY(-2deg)' }}>
                <div className="p3-shadow-tri-clone" style={{ clipPath: 'polygon(0 50%, 100% 0, 100% 100%)', transformOrigin: 'right center', left: '-5%', height: '40px' }} />
                <div className="p3-highlight-clone" style={{ clipPath: 'polygon(0 50%, 100% 0, 100% 100%)', transformOrigin: 'right center', left: '-5%', height: '40px' }} />
                <div className="p3-label-wrap-clone">
                  <span className="p3-label-base-clone p3-label-dark-clone" style={{ fontSize: 42, color: '#3ce2ff' }}>← BACK</span>
                  <span className="p3-label-base-clone p3-label-bright-clone" style={{ fontSize: 42, color: '#ff2a2a', clipPath: 'polygon(0 50%, 100% 0, 100% 100%)' }}>← BACK</span>
                </div>
              </div>
            </a>
            <a
              href="https://github.com/abijit2626"
              target="_blank"
              rel="noopener noreferrer"
              className="p3-row-clone"
              style={{ transitionDelay: '700ms' }}
            >
              <div className="p3-skew-wrap-clone" style={{ transform: 'skewX(-4deg) skewY(2deg)' }}>
                <div className="p3-shadow-tri-clone" style={{ height: '40px' }} />
                <div className="p3-highlight-clone" style={{ height: '40px' }} />
                <div className="p3-label-wrap-clone">
                  <span className="p3-label-base-clone p3-label-dark-clone" style={{ fontSize: 42, color: '#3ce2ff' }}>GITHUB →</span>
                  <span className="p3-label-base-clone p3-label-bright-clone" style={{ fontSize: 42, color: '#ff2a2a' }}>GITHUB →</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Social-style Floating Detail Bars */}
      {mounted && projects.length > 0 && renderInfoBars()}
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition variant="about"><AboutMe /></PageTransition>
        } />
        <Route path="/resume" element={
          <PageTransition><ResumePage src={main2} /></PageTransition>
        } />
        <Route path="/socials" element={
          <PageTransition variant="socials"><Socials /></PageTransition>
        } />
        <Route path="/sideproj" element={
          <PageTransition><SideProjectsPage /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

function MusicPlayer() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(false);

  const startMusic = useCallback(() => {
    if (started) return;
    setStarted(true);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio.play().then(() => {
        setPlaying(true);
        setTimeout(() => setVisible(true), 300);
      }).catch(() => {});
    }
  }, [started]);

  useEffect(() => {
    const events = ['click', 'keydown', 'touchstart'];
    const handler = () => { startMusic(); events.forEach(e => window.removeEventListener(e, handler)); };
    events.forEach(e => window.addEventListener(e, handler, { once: true }));
    return () => events.forEach(e => window.removeEventListener(e, handler));
  }, [startMusic]);

  const toggleMute = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (!started) { startMusic(); return; }
    const next = !muted;
    setMuted(next);
    audio.muted = next;
  };

  return (
    <>
      <audio ref={audioRef} src="/Persona 3 Reload - Color Your Night (with Lyrics).mp3" loop preload="auto" />
      <div
        id="music-player-widget"
        onClick={!started ? startMusic : undefined}
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(60,226,255,0.25)',
          clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
          padding: '10px 16px 10px 14px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)',
          cursor: !started ? 'pointer' : 'default',
          minWidth: '220px',
        }}
      >
        {/* Left: note icon + bars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, overflow: 'hidden' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #c4001a 60%, #3ce2ff 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, boxShadow: playing && !muted ? '0 0 10px rgba(60,226,255,0.5)' : 'none',
            animation: playing && !muted ? 'p3-spin 4s linear infinite' : 'none',
          }}>
            <span style={{ fontSize: '14px' }}>♪</span>
          </div>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '13px',
              letterSpacing: '2px',
              color: '#3ce2ff',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>COLOR YOUR NIGHT</div>
            <div style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '10px',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '1px',
              marginTop: '1px',
            }}>PERSONA 3 RELOAD</div>
          </div>
        </div>

        {/* Equalizer bars */}
        {playing && !muted && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '20px', flexShrink: 0 }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{
                width: '3px',
                background: '#3ce2ff',
                borderRadius: '2px',
                animation: `p3-eq-${i} ${0.5 + i * 0.15}s ease-in-out infinite alternate`,
              }} />
            ))}
          </div>
        )}

        {/* Mute button */}
        <button
          id="music-mute-btn"
          onClick={toggleMute}
          title={muted ? 'Unmute' : 'Mute'}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: muted ? 'rgba(255,255,255,0.35)' : '#3ce2ff',
            fontSize: '18px', padding: '2px 4px', lineHeight: 1,
            transition: 'color 0.2s ease',
            flexShrink: 0,
          }}
        >
          {muted ? '🔇' : '🔊'}
        </button>
      </div>

      <style>{`
        @keyframes p3-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes p3-eq-1 { from { height: 4px; } to { height: 18px; } }
        @keyframes p3-eq-2 { from { height: 10px; } to { height: 6px; } }
        @keyframes p3-eq-3 { from { height: 16px; } to { height: 4px; } }
        @keyframes p3-eq-4 { from { height: 6px; } to { height: 14px; } }
      `}</style>
    </>
  );
}

export default function App() {
  return (
    <>
      <AnimatedRoutes />
      <MusicPlayer />
    </>
  );
}
