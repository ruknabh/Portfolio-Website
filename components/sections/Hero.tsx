"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navigation from "../Navigation";
import PlanetModel from "../Planetmodel";

/* ─── Floating particle / star field ───────────────────────────────────── */
function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Star = { x: number; y: number; r: number; a: number; da: number; dx: number; dy: number };
    const stars: Star[] = Array.from({ length: 240 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.1 + 0.15,
      a: Math.random() * 0.7 + 0.05,
      da: (Math.random() - 0.5) * 0.0028,
      dx: (Math.random() - 0.5) * 0.055,
      dy: (Math.random() - 0.5) * 0.055,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const s of stars) {
        s.a = Math.max(0.04, Math.min(0.82, s.a + s.da));
        if (s.a <= 0.04 || s.a >= 0.82) s.da *= -1;
        s.x = (s.x + s.dx + W) % W;
        s.y = (s.y + s.dy + H) % H;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a.toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
export default function Hero() {
  const scrollToProjects = () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#07070f" }}
    >
      <Navigation />

      {/* Deep-space ambient glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 78% 52%, rgba(140,45,8,0.16) 0%, transparent 65%), " +
            "radial-gradient(ellipse 55% 90% at 100% 50%, rgba(200,65,10,0.09) 0%, transparent 55%)",
        }}
      />

      {/* Particle stars */}
      <StarField />

      {/* Film-grain texture */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          opacity: 0.05,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      {/* ── Planet arc ── */}
      <div
        className="absolute z-5"
        style={{
          width: "140vh",
          height: "150vh",

          top: "50%",
          right: 0,

          // 🔧 POSITION CONTROL
          transform: "translate(45%, -50%)",

          pointerEvents: "none",

          // ✅ smoother, more natural fade
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 70% 50%, black 55%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 70% 50%, black 55%, transparent 100%)",

          // very subtle edge smoothing
          filter: "blur(0.15px)",
        }}
      >
        <div style={{ width: "100%", height: "100%", pointerEvents: "none" }}>
          <PlanetModel />
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pt-28 pb-40">
        <div className="max-w-[54%]">
          <div className="flex flex-col gap-9">

            {/* Eyebrow label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.55 }}
              className="flex items-center gap-3"
            >
              <span className="w-8 h-px bg-accent-orange" style={{ height: "2px" }} />
              <span
                className="font-helvetica text-[10px] uppercase tracking-[0.32em] font-bold"
                style={{ color: "rgba(255,255,255,0.62)" }}
              >
                Full Stack Developer · Freelance
              </span>
            </motion.div>

            {/* Name */}
            <div>
              <h1 className="font-helvetica font-black leading-[0.88] tracking-tight">
                {"Hi! I'm".split("").map((letter, i) => (
                  <motion.span
                    key={`g-${i}`}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.75, delay: i * 0.045, ease: [0.6, 0.01, 0.05, 0.95] }}
                    className="inline-block"
                    style={{
                      fontSize: "clamp(1.9rem, 4.8vw, 3.4rem)",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </h1>

              <h1 className="font-helvetica font-black leading-[0.88] tracking-tight">
                {"Ruknabh".split("").map((letter, i) => (
                  <motion.span
                    key={`n-${i}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.85, delay: 0.32 + i * 0.075, ease: [0.6, 0.01, 0.05, 0.95] }}
                    className="inline-block"
                    style={{
                      fontSize: "clamp(4.2rem, 11.5vw, 8.8rem)",
                      color: "#ffffff",
                      textShadow: "4px 4px 0px rgba(217,78,40,0.52)",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* Short descriptor */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95] }}
              className="font-helvetica font-bold leading-relaxed max-w-[22rem]"
              style={{
                fontSize: "clamp(0.78rem, 1.1vw, 0.92rem)",
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.015em",
              }}
            >
              I build things for the web — fast, clean,
              <br />
              and with a sharp eye for design.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.28, duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95] }}
              className="flex items-center gap-5"
            >
              {/* 1. Hire Me — no hover animation, with bouncing arrow */}
              <button
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="font-helvetica font-black uppercase tracking-wider text-sm px-8 h-14 flex items-center gap-3"
                style={{
                  background: "#D94E28",
                  border: "4px solid #D94E28",
                  color: "#fff",

                }}
              >
                Hire Me
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </button>

              {/* 2. GitHub — solid white, border matches Hire Me weight */}
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center transition-all duration-200"
                style={{
                  background: "#ffffff",
                  border: "4px solid #ffffff",
                  color: "#07070f",

                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#D94E28";
                  el.style.borderColor = "#D94E28";
                  el.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#ffffff";
                  el.style.borderColor = "#ffffff";
                  el.style.color = "#07070f";
                }}
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.52, duration: 0.55 }}
              className="flex items-center gap-10 pt-1"
            >
              {[
                { value: "2+", label: "Years exp." },
                { value: "10+", label: "Projects" },
                { value: "Open", label: "To Work" },
              ].map(({ value, label }, i) => (
                <div key={label} className="relative flex flex-col gap-1.5">
                  {i > 0 && (
                    <div
                      className="absolute"
                      style={{
                        left: "-1.25rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "1px",
                        height: "2rem",
                        background: "rgba(255,255,255,0.15)",
                      }}
                    />
                  )}
                  <span
                    className="font-helvetica font-black leading-none"
                    style={{
                      fontSize: "clamp(1.3rem, 2.5vw, 1.85rem)",
                      color: i === 0 ? "#D94E28" : "rgba(255,255,255,0.92)",
                    }}
                  >
                    {value}
                  </span>
                  <span
                    className="font-helvetica font-bold text-[8px] uppercase tracking-[0.32em]"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={scrollToProjects}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 group"
      >
        <span
          className="font-garamond italic text-sm tracking-wide"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          <ChevronDown
            className="w-5 h-5 transition-colors duration-300 group-hover:text-accent-orange"
            style={{ color: "rgba(255,255,255,0.2)" }}
          />
        </motion.div>
      </motion.button>

      {/* Bottom dissolve */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          zIndex: 20,
          height: "32vh",
          background:
            "linear-gradient(to bottom, " +
            "transparent 0%, " +
            "rgba(7,7,15,0.55) 30%, " +
            "rgba(7,7,15,0.88) 55%, " +
            "#07070f 80%, " +
            "#07070f 100%)",
        }}
      />
    </section>
  );
}