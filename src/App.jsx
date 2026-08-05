import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Works", "Listen", "Contact"];

const WORKS = [
  { title: "Memories of a Quiet Bird", year: 2026, instrumentation: "Baritone voice and 6-string guitar", duration: "6'15\"" },
  { title: "Avarice of the Mind", year: 2025, instrumentation: "Solo piano", duration: "8'30\"" },
  { title: "Buzzing, Dying World", year: 2025, instrumentation: "String quartet (2 violins, viola, cello)", duration: "5'15\"" },
  { title: "House Fear", year: 2025, instrumentation: "Soprano voice and piano", duration: "1'30\"" },
  { title: "Ice Crystals", year: 2025, instrumentation: "Electronics", duration: "1'" },
  { title: "Where in Time?", year: 2025, instrumentation: "Solo piano", duration: "1'" },
  { title: "Skip a Beat, Trip a Beat", year: 2025, instrumentation: "Solo flute", duration: "1'30\"" },
  { title: "Larry's Wildflower Mountain", year: 2024, instrumentation: "Reed quintet (clarinet, oboe, tenor saxophone, bass clarinet, bassoon)", duration: "6'15\"" },
  { title: "Is this High Art?", year: 2024, instrumentation: "Electronics", duration: "4'" },
  { title: "Crumpled Up Pocky Box", year: 2023, instrumentation: "Violin, french horn, and bassoon", duration: "9'20\"" },
  { title: "Broken Dove", year: 2023, instrumentation: "Chamber orchestra (flute, oboe, clarinet, bassoon, chamber strings) and solo viola", duration: "3'20\"" },
  { title: "(Not) Alone (At All)", year: 2023, instrumentation: "Flute, viola, and harp", duration: "3'" },
  { title: "Anti-Langsam", year: 2023, instrumentation: "Brass quartet (tenor trombone, bass trombone, two french horns)", duration: "2'50\"" },
  { title: "I Lost My Luggage", year: 2023, instrumentation: "B-flat clarinet and piano", duration: "2'" },
  { title: "Beautiful Trees Under Heavy Clouds", year: 2023, instrumentation: "Brass quintet (two trumpets, french horn, trombone, tuba)", duration: "3'" },
  { title: "Present, Past, and Synthesis", year: 2023, instrumentation: "String quartet", duration: "Mvt I 2'40\" · Mvt II 5'20\"" },
  { title: "Dirge", year: 2023, instrumentation: "Saxophone, cello, and marimba", duration: "5'20\"" },
];

const TRACKS = [
  { title: "Elegy for Strings", ensemble: "Lawrence Symphony Orchestra", year: 2024, duration: "8:14" },
  { title: "Nocturne No. 2", ensemble: "Student Recital Recording", year: 2023, duration: "5:02" },
  { title: "Cantus", ensemble: "Lawrence University Concert Choir", year: 2022, duration: "6:31" },
];

function StaffLines() {
  return (
    <svg viewBox="0 0 900 120" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07 }}>
      {[20, 36, 52, 68, 84].map((y, i) => (
        <line key={i} x1="0" y1={y} x2="900" y2={y} stroke="#93b8d4" strokeWidth="1" />
      ))}
      {/* Decorative notes */}
      {[80, 200, 340, 500, 650, 780].map((x, i) => (
        <g key={i} transform={`translate(${x}, ${[36, 52, 20, 68, 36, 52][i]})`}>
          <ellipse cx="0" cy="0" rx="7" ry="5" fill="#93b8d4" transform="rotate(-20)" />
          <line x1="7" y1="-2" x2="7" y2="-30" stroke="#93b8d4" strokeWidth="1.5" />
        </g>
      ))}
    </svg>
  );
}

function WaveformIllustration() {
  const points = [];
  const W = 800, H = 200;
  for (let x = 0; x <= W; x += 2) {
    const y = H / 2
      + Math.sin(x * 0.025) * 40
      + Math.sin(x * 0.07 + 1) * 20
      + Math.sin(x * 0.012 + 2) * 30;
    points.push(`${x},${y}`);
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: "100%", height: "100%", opacity: 0.18 }}>
      <polyline points={points.join(" ")} fill="none" stroke="#7ab3d4" strokeWidth="1.5" />
      <polyline points={points.map(p => { const [x, y] = p.split(","); return `${x},${H / 2 + (y - H / 2) * 0.5}`; }).join(" ")} fill="none" stroke="#93c5e0" strokeWidth="1" />
    </svg>
  );
}

function Nav({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 3rem",
      height: "64px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(10,18,30,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(100,160,210,0.12)" : "none",
      transition: "all 0.4s ease",
    }}>
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 600, color: "#c8dff0", letterSpacing: "0.04em" }}>
        A H
      </span>
      <div style={{ display: "flex", gap: "2.5rem" }}>
        {NAV_LINKS.map(link => (
          <button key={link} onClick={() => onNav(link.toLowerCase())} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: active === link.toLowerCase() ? "#7ab3d4" : "rgba(180,210,230,0.6)",
            transition: "color 0.2s",
            padding: "4px 0",
            borderBottom: active === link.toLowerCase() ? "1px solid #7ab3d4" : "1px solid transparent",
          }}>{link}</button>
        ))}
      </div>
    </nav>
  );
}

function Hero({ onNav }) {
  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
      position: "relative", overflow: "hidden",
      padding: "0 3rem",
    }}>
      {/* Violin background image — place your downloaded file at /public/images/violin-bg.jpg */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/images/kalhh-violin-1252019_1280.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
      }} />
      {/* Gradient overlay: opaque on left for text legibility, fades right to reveal image */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, rgba(10,18,30,0.96) 35%, rgba(10,18,30,0.6) 65%, rgba(10,18,30,0.35) 100%)",
      }} />
      {/* Bottom fade so the section blends into the rest of the page */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "180px",
        background: "linear-gradient(to bottom, transparent, #0a121e)",
      }} />
      {/* Staff lines in hero */}
      <div style={{ position: "absolute", bottom: "12%", left: 0, right: 0, height: "120px" }}>
        <StaffLines />
      </div>
      {/* Waveform */}
      <div style={{ position: "absolute", top: "60%", left: 0, right: 0, height: "200px", transform: "translateY(-50%)" }}>
        <WaveformIllustration />
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: "700px" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7ab3d4", marginBottom: "1.5rem", opacity: 0.9 }}>
          Composer · Lawrence University · Class of 2026
        </p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(3.5rem, 8vw, 7rem)",
          fontWeight: 300,
          lineHeight: 1.0,
          color: "#ddeef8",
          margin: "0 0 0.2em",
          letterSpacing: "-0.02em",
        }}>
          Alexander
        </h1>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(3.5rem, 8vw, 7rem)",
          fontWeight: 600,
          lineHeight: 1.0,
          color: "#7ab3d4",
          margin: "0 0 2rem",
          letterSpacing: "-0.02em",
        }}>
          Hu
        </h1>
        <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
          <button onClick={() => onNav("works")} style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "14px 32px", border: "1px solid #7ab3d4", background: "transparent",
            color: "#7ab3d4", cursor: "pointer", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.target.style.background = "#7ab3d4"; e.target.style.color = "#0a121e"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#7ab3d4"; }}
          >View Works</button>
          <button onClick={() => onNav("listen")} style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "14px 32px", border: "1px solid rgba(100,160,210,0.25)", background: "transparent",
            color: "rgba(180,210,230,0.6)", cursor: "pointer", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.target.style.borderColor = "rgba(100,160,210,0.5)"; e.target.style.color = "rgba(180,210,230,0.9)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(100,160,210,0.25)"; e.target.style.color = "rgba(180,210,230,0.6)"; }}
          >Listen</button>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "8rem 3rem", maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "6rem", alignItems: "start" }}>
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7ab3d4", marginBottom: "1.2rem" }}>About</p>
          {/* Decorative staff fragment */}
          <div style={{ position: "relative", height: "60px", margin: "2rem 0" }}>
            <svg viewBox="0 0 200 60" style={{ width: "100%", opacity: 0.2 }}>
              {[10, 22, 34, 46, 58].map((y, i) => <line key={i} x1="0" y1={y} x2="200" y2={y} stroke="#7ab3d4" strokeWidth="1" />)}
              <ellipse cx="30" cy="22" rx="7" ry="5" fill="#7ab3d4" transform="rotate(-15,30,22)" />
              <line x1="36" y1="20" x2="36" y2="-4" stroke="#7ab3d4" strokeWidth="1.5" />
              <ellipse cx="70" cy="34" rx="7" ry="5" fill="#7ab3d4" transform="rotate(-15,70,34)" />
              <line x1="76" y1="32" x2="76" y2="8" stroke="#7ab3d4" strokeWidth="1.5" />
              <ellipse cx="110" cy="10" rx="7" ry="5" fill="#7ab3d4" transform="rotate(-15,110,10)" />
              <line x1="116" y1="8" x2="116" y2="-16" stroke="#7ab3d4" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "rgba(190,220,240,0.75)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
            Alex Hu is a composer from Marietta, Georgia, a little ways outside Atlanta. He started playing violin in 2016, and started composing in 2021, after the Covid pandemic somehow led him to appreciate music enough to write some himself.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "rgba(190,220,240,0.75)", lineHeight: 1.85, marginBottom: "2rem" }}>
            He is inspired by a wide range of work, from the string quartets of Shostakovich to the symphonies of Beethoven, from modern day Stacy Garrop and Franghiz Ali-Zadeh to many of his friends. His wish is merely to continue writing and perfecting his music for others to play and listen to.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {[["University", "Lawrence University"], ["Major", "Music Composition"], ["Year", "Junior · Class of 2026"], ["Focus", "Orchestral & Chamber"]].map(([label, val]) => (
              <div key={label}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#7ab3d4", margin: "0 0 4px" }}>{label}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem", color: "rgba(200,225,240,0.85)", margin: 0 }}>{val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Works() {
  const [hovered, setHovered] = useState(null);
  return (
    <section id="works" style={{ padding: "6rem 3rem", background: "rgba(100,160,210,0.03)", borderTop: "1px solid rgba(100,160,210,0.08)", borderBottom: "1px solid rgba(100,160,210,0.08)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7ab3d4", marginBottom: "1.2rem" }}>Portfolio</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 400, color: "#ddeef8", lineHeight: 1.1, margin: "0 0 4rem" }}>Selected Works</h2>
        <div>
          {WORKS.map((work, i) => (
            <div key={work.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: "1.6rem 0",
                borderTop: "1px solid rgba(100,160,210,0.12)",
                display: "grid", gridTemplateColumns: "2fr 1fr",
                gap: "2rem", alignItems: "start",
                transition: "background 0.2s",
                cursor: "default",
              }}
            >
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem", fontWeight: 500, color: hovered === i ? "#7ab3d4" : "#ddeef8", margin: "0 0 6px", transition: "color 0.2s" }}>{work.title}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "rgba(180,210,230,0.6)", margin: 0, opacity: hovered === i ? 1 : 0.75, transition: "opacity 0.2s" }}>{work.instrumentation}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "rgba(150,190,215,0.7)", margin: "0 0 4px" }}>{work.year}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(120,170,200,0.5)", margin: 0 }}>{work.duration}</p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(100,160,210,0.12)" }} />
        </div>
      </div>
    </section>
  );
}

function Listen() {
  const [playing, setPlaying] = useState(null);
  const [progress, setProgress] = useState({});
  const intervals = useRef({});

  const togglePlay = (i) => {
    if (playing === i) {
      setPlaying(null);
      clearInterval(intervals.current[i]);
    } else {
      if (playing !== null) clearInterval(intervals.current[playing]);
      setPlaying(i);
      setProgress(p => ({ ...p, [i]: p[i] || 0 }));
      intervals.current[i] = setInterval(() => {
        setProgress(p => ({ ...p, [i]: Math.min((p[i] || 0) + 0.5, 100) }));
      }, 300);
    }
  };

  return (
    <section id="listen" style={{ padding: "6rem 3rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7ab3d4", marginBottom: "1.2rem" }}>Audio</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 400, color: "#ddeef8", lineHeight: 1.1, margin: "0 0 3rem" }}>Listen</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          {TRACKS.map((track, i) => (
            <div key={track.title} style={{
              display: "grid", gridTemplateColumns: "48px 1fr auto",
              gap: "1.5rem", alignItems: "center",
              padding: "1.4rem 1.5rem",
              background: playing === i ? "rgba(100,160,210,0.07)" : "transparent",
              border: "1px solid",
              borderColor: playing === i ? "rgba(100,160,210,0.2)" : "rgba(100,160,210,0.08)",
              marginBottom: "8px",
              transition: "all 0.2s",
            }}>
              <button onClick={() => togglePlay(i)} style={{
                width: "40px", height: "40px", borderRadius: "50%",
                border: "1px solid rgba(100,160,210,0.4)",
                background: playing === i ? "#7ab3d4" : "transparent",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s", flexShrink: 0,
              }}>
                {playing === i
                  ? <span style={{ display: "flex", gap: "3px" }}><span style={{ width: "3px", height: "14px", background: "#0a121e", borderRadius: "1px" }} /><span style={{ width: "3px", height: "14px", background: "#0a121e", borderRadius: "1px" }} /></span>
                  : <span style={{ width: 0, height: 0, borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderLeft: "12px solid #7ab3d4", marginLeft: "3px" }} />
                }
              </button>
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 500, color: "#ddeef8", margin: "0 0 4px" }}>{track.title}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "rgba(150,190,215,0.6)", margin: "0 0 10px" }}>{track.ensemble} · {track.year}</p>
                <div style={{ height: "2px", background: "rgba(100,160,210,0.12)", borderRadius: "1px", position: "relative" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${progress[i] || 0}%`, background: "#7ab3d4", borderRadius: "1px", transition: "width 0.3s linear" }} />
                </div>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(150,190,215,0.5)", margin: 0 }}>{track.duration}</p>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(120,160,190,0.4)", marginTop: "1.5rem" }}>
          Audio players are placeholders — connect to SoundCloud, Spotify, or hosted files.
        </p>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" style={{ padding: "6rem 3rem", background: "rgba(100,160,210,0.03)", borderTop: "1px solid rgba(100,160,210,0.08)" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7ab3d4", marginBottom: "1.2rem" }}>Get in Touch</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 400, color: "#ddeef8", lineHeight: 1.1, margin: "0 0 1.5rem" }}>Contact</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "rgba(180,210,230,0.65)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          For performance inquiries, score requests, or just to say hello — Alexander would love to hear from you.
        </p>
        <a href="mailto:alexhucomposer@gmail.com" style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#7ab3d4", textDecoration: "none", marginBottom: "3rem", borderBottom: "1px solid rgba(122,179,212,0.4)", paddingBottom: "2px" }}>
          alexhucomposer@gmail.com
        </a>
        {sent ? (
          <div style={{ padding: "2rem", border: "1px solid rgba(100,160,210,0.3)", textAlign: "center" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "#7ab3d4", margin: 0 }}>Message sent — thank you.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {["Name", "Email"].map(field => (
              <div key={field}>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(150,190,215,0.6)", marginBottom: "8px" }}>{field}</label>
                <input type={field === "Email" ? "email" : "text"} style={{
                  width: "100%", boxSizing: "border-box", padding: "12px 16px",
                  background: "transparent", border: "1px solid rgba(100,160,210,0.2)",
                  color: "#ddeef8", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem",
                  outline: "none",
                }} />
              </div>
            ))}
            <div>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(150,190,215,0.6)", marginBottom: "8px" }}>Message</label>
              <textarea rows={5} style={{
                width: "100%", boxSizing: "border-box", padding: "12px 16px",
                background: "transparent", border: "1px solid rgba(100,160,210,0.2)",
                color: "#ddeef8", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem",
                outline: "none", resize: "vertical",
              }} />
            </div>
            <button onClick={() => setSent(true)} style={{
              alignSelf: "flex-start", padding: "14px 40px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", letterSpacing: "0.12em", textTransform: "uppercase",
              border: "1px solid #7ab3d4", background: "transparent", color: "#7ab3d4", cursor: "pointer", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.target.style.background = "#7ab3d4"; e.target.style.color = "#0a121e"; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#7ab3d4"; }}
            >Send Message</button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function AlexanderHuSite() {
  const [activeNav, setActiveNav] = useState("about");

  const scrollTo = (section) => {
    setActiveNav(section);
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{
      background: "#0a121e",
      minHeight: "100vh",
      color: "#ddeef8",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <Nav active={activeNav} onNav={scrollTo} />
      <Hero onNav={scrollTo} />
      <About />
      <Works />
      <Listen />
      <Contact />
      <footer style={{ padding: "2rem 3rem", borderTop: "1px solid rgba(100,160,210,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "rgba(150,190,215,0.4)" }}>Alexander Hu</span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(120,160,190,0.3)" }}>© 2025</span>
      </footer>
    </div>
  );
}
