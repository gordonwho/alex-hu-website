import { useState, useEffect } from "react";

const NAV_LINKS = ["About", "Works", "Listen", "Contact"];

const WORKS = [
  { title: "Memories of a Quiet Bird", year: 2026, instrumentation: "Baritone voice and 6-string guitar", duration: "6'15\"" },
  { title: "Avarice of the Mind", year: 2025, instrumentation: "Solo piano", duration: "8'30\"" },
  { title: "Buzzing, Dying World", year: 2025, instrumentation: "String quartet (2 violins, viola, cello)", duration: "5'15\"" },
  { title: "Larry's Wildflower Mountain", year: 2024, instrumentation: "Reed quintet (B-flat clarinet, oboe, tenor saxophone, bass clarinet, bassoon)", duration: "6'15\"" },
  { title: "Is this High Art?", year: 2024, instrumentation: "Electronics", duration: "4'" },
  { title: "Crumpled Up Pocky Box", year: 2023, instrumentation: "Violin, french horn, and bassoon", duration: "9'20\"" },
  { title: "Broken Dove", year: 2023, instrumentation: "Chamber orchestra (flute, oboe, B-flat clarinet, bassoon, chamber strings) and solo viola", duration: "3'20\"" },
  { title: "(Not) Alone (At All)", year: 2023, instrumentation: "Flute, viola, and harp", duration: "3'" },
  { title: "I Lost My Luggage", year: 2023, instrumentation: "B-flat clarinet and piano", duration: "2'" },
  { title: "Beautiful Trees Under Heavy Clouds", year: 2023, instrumentation: "Brass quintet (two trumpets, french horn, trombone, tuba)", duration: "3'" },
  { title: "Dirge", year: 2023, instrumentation: "Alto saxophone, cello, and marimba", duration: "5'20\"" },
];

const TRACKS = [
  { title: "Dirge", url: "https://soundcloud.com/alex-hu-39673826/dirge" },
  { title: "Is this High Art?", url: "https://soundcloud.com/alex-hu-39673826/is-this-high-art" },
  { title: "Crumpled Up Pocky Box", url: "https://soundcloud.com/alex-hu-39673826/crumpled-up-pocky-box" },
  { title: "Larry's Wildflower Mountain", url: "https://soundcloud.com/alex-hu-39673826/img_5826" },
];

function Nav({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className="site-nav" style={{
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
      <div className="nav-links" style={{ display: "flex", gap: "2.5rem" }}>
        {NAV_LINKS.map(link => (
          <button key={link} onClick={() => onNav(link.toLowerCase())} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: active === link.toLowerCase() ? "#7ab3d4" : "rgba(180,210,230,0.6)",
            transition: "color 0.2s",
            padding: "4px 0",
            borderBottom: active === link.toLowerCase() ? "1px solid #7ab3d4" : "1px solid transparent",
            whiteSpace: "nowrap",
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
      {/* Bridge at dusk background image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/images/hero-bridge-dusk.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
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
      <div style={{ position: "relative", zIndex: 2, maxWidth: "700px" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7ab3d4", marginBottom: "1.5rem", opacity: 0.9 }}>
          Composer · Lawrence University · Class of 2027
        </p>
        <h1 style={{ margin: "0 0 2rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.5rem, 8vw, 7rem)", lineHeight: 1.0, letterSpacing: "-0.02em" }}>
          <span style={{ display: "block", fontWeight: 300, color: "#ddeef8", marginBottom: "0.2em" }}>
            Alexander
          </span>
          <span style={{ display: "block", fontWeight: 600, color: "#7ab3d4" }}>
            Hu
          </span>
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
    <section id="about" style={{ position: "relative", overflow: "hidden", padding: "8rem 3rem" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/images/about-river-sunset.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(10,18,30,0.94) 0%, rgba(10,18,30,0.88) 40%, rgba(10,18,30,0.94) 100%)",
      }} />
      <div style={{ position: "relative", zIndex: 2, maxWidth: "1100px", margin: "0 auto" }}>
      <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "6rem", alignItems: "start" }}>
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7ab3d4", marginBottom: "1.2rem" }}>About</p>
          <div style={{ border: "1px solid rgba(122,179,212,0.25)", padding: "8px", background: "rgba(10,18,30,0.4)" }}>
            <img
              src="/images/alex-hu-portrait.jpg"
              alt="Alexander Hu"
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          </div>
        </div>
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "rgba(190,220,240,0.75)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
            Alex Hu is a composer who enjoys writing music that focuses on blending many styles and techniques together to form complete, coherent narratives. Such narratives may at times be a reflection of the physical world as we know it, or may also at times focus inward, on the introspective emotional world of the self. He may also simply write for the fun of it as well, as any inspiration may prove to be good inspiration in his eyes.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "rgba(190,220,240,0.75)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
            Alex Hu was raised in Marietta, Georgia, a little ways outside Atlanta. He started playing violin in 2016, and started composing in 2021, after the Covid pandemic somehow led him to appreciate music enough to write some himself. He is inspired by a wide range of work, from the string quartets of Shostakovich to the symphonies of Beethoven, from modern day Stacy Garrop, Franghiz Ali-Zadeh, and Joe Hisaishi to many of his friends. All of these myriad influences all help to inform his aforementioned attempts to blend styles, as a mirror of sorts of the many who inspire him.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "rgba(190,220,240,0.75)", lineHeight: 1.85, marginBottom: "2rem" }}>
            Alex Hu attended Interlochen's Arts Camp for music composition in 2023 and is currently studying at Lawrence University for a BM in music composition. He has studied under a myriad of composers, including Alex Tedrow, Yi-De Chen, Jennifer Jolley, Joanne Metcalf, and Asha Srinivasan. He won first prize in the WAC composition competition, college division, and was played at Denison's 2024 TUTTI festival.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {[["University", "Lawrence University"], ["Major", "Music Composition"], ["Year", "Junior · Class of 2027"], ["Focus", "Orchestral & Chamber"]].map(([label, val]) => (
              <div key={label}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#7ab3d4", margin: "0 0 4px" }}>{label}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem", color: "rgba(200,225,240,0.85)", margin: 0 }}>{val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

function Works() {
  const [hovered, setHovered] = useState(null);
  return (
    <section id="works" style={{ position: "relative", overflow: "hidden", padding: "6rem 3rem", borderTop: "1px solid rgba(100,160,210,0.08)", borderBottom: "1px solid rgba(100,160,210,0.08)" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/images/works-flooded-lake.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(10,18,30,0.95) 0%, rgba(10,18,30,0.9) 50%, rgba(10,18,30,0.95) 100%)",
      }} />
      <div style={{ position: "relative", zIndex: 2, maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7ab3d4", marginBottom: "1.2rem" }}>Portfolio</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 400, color: "#ddeef8", lineHeight: 1.1, margin: "0 0 4rem" }}>Selected Works</h2>
        <div>
          {WORKS.map((work, i) => (
            <div key={work.title}
              className="work-row"
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
              <div className="work-meta" style={{ textAlign: "right" }}>
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
  return (
    <section id="listen" style={{ padding: "6rem 3rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7ab3d4", marginBottom: "1.2rem" }}>Audio</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 400, color: "#ddeef8", lineHeight: 1.1, margin: "0 0 3rem" }}>Listen</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {TRACKS.map((track) => (
            <div key={track.title} style={{
              padding: "1.4rem 1.5rem",
              border: "1px solid rgba(100,160,210,0.12)",
              background: "rgba(100,160,210,0.03)",
            }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 500, color: "#ddeef8", margin: "0 0 12px" }}>{track.title}</p>
              <iframe
                title={track.title}
                width="100%"
                height="100"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                style={{ display: "block" }}
                src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(track.url)}&color=%237ab3d4&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const updateField = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const submit = async () => {
    setError(null);
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in your name, email, and a message.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setSent(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" style={{ position: "relative", overflow: "hidden", padding: "6rem 3rem", borderTop: "1px solid rgba(100,160,210,0.08)" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/images/contact-frozen-trees.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(10,18,30,0.95) 0%, rgba(10,18,30,0.88) 50%, rgba(10,18,30,0.95) 100%)",
      }} />
      <div style={{ position: "relative", zIndex: 2, maxWidth: "600px", margin: "0 auto" }}>
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
            {[["Name", "name", "text"], ["Email", "email", "email"]].map(([label, field, type]) => (
              <div key={field}>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(150,190,215,0.6)", marginBottom: "8px" }}>{label}</label>
                <input
                  type={type}
                  value={form[field]}
                  onChange={e => updateField(field, e.target.value)}
                  disabled={sending}
                  style={{
                    width: "100%", boxSizing: "border-box", padding: "12px 16px",
                    background: "transparent", border: "1px solid rgba(100,160,210,0.2)",
                    color: "#ddeef8", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem",
                    outline: "none",
                  }} />
              </div>
            ))}
            <div>
              <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(150,190,215,0.6)", marginBottom: "8px" }}>Message</label>
              <textarea
                rows={5}
                value={form.message}
                onChange={e => updateField("message", e.target.value)}
                disabled={sending}
                style={{
                  width: "100%", boxSizing: "border-box", padding: "12px 16px",
                  background: "transparent", border: "1px solid rgba(100,160,210,0.2)",
                  color: "#ddeef8", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem",
                  outline: "none", resize: "vertical",
                }} />
            </div>
            {error && (
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#e08a8a", margin: 0 }}>{error}</p>
            )}
            <button onClick={submit} disabled={sending} style={{
              alignSelf: "flex-start", padding: "14px 40px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", letterSpacing: "0.12em", textTransform: "uppercase",
              border: "1px solid #7ab3d4", background: "transparent", color: "#7ab3d4",
              cursor: sending ? "default" : "pointer", opacity: sending ? 0.6 : 1, transition: "all 0.2s",
            }}
              onMouseEnter={e => { if (!sending) { e.target.style.background = "#7ab3d4"; e.target.style.color = "#0a121e"; } }}
              onMouseLeave={e => { if (!sending) { e.target.style.background = "transparent"; e.target.style.color = "#7ab3d4"; } }}
            >{sending ? "Sending…" : "Send Message"}</button>
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
