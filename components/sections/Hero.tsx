"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import Navigation from "../Navigation";
import PlanetModel from "../Planetmodel";


/* ── 3-line terminal sequences ── */
const terminalSequences = [
  [
    { prefix: "$",  color: "text-accent-orange", text: "npm install ruknabh-portfolio" },
    { prefix: "›",  color: "text-white/50",       text: "Resolving 6 packages..." },
    { prefix: "✓",  color: "text-accent-green",   text: "installed in 1.2s" },
  ],
  [
    { prefix: "$",  color: "text-accent-orange", text: "git log --oneline -1" },
    { prefix: "›",  color: "text-white/40",       text: "a3f92bc feat: 3D helmet + parallax" },
    { prefix: "›",  color: "text-white/30",       text: "on branch main — up to date" },
  ],
  [
    { prefix: "$",  color: "text-accent-orange", text: "npm run dev" },
    { prefix: "✓",  color: "text-accent-green",   text: "compiled in 842ms" },
    { prefix: "›",  color: "text-accent-green",   text: "ready → http://localhost:3000" },
  ],
];

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [seqIndex, setSeqIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });

  /* Terminal: reveal one line every 1.8s, pause 3.5s, then next sequence */
  useEffect(() => {
    const seq = terminalSequences[seqIndex];
    if (visibleCount < seq.length) {
      const id = setTimeout(() => setVisibleCount((c) => c + 1), 1800);
      return () => clearTimeout(id);
    } else {
      const id = setTimeout(() => {
        setSeqIndex((s) => (s + 1) % terminalSequences.length);
        setVisibleCount(1);
      }, 3500);
      return () => clearTimeout(id);
    }
  }, [visibleCount, seqIndex]);

  /* Mouse tracking */
  useEffect(() => {
    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* Dot grid */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const gridSize = 44;
    const influenceRadius = 200;
    const maxPull = 16;

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.1;
      smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.1;
      const mx = smoothMouse.current.x;
      const my = smoothMouse.current.y;

      const falloff = (d: number) => {
        if (d > influenceRadius) return 0;
        const t = 1 - d / influenceRadius;
        return t * t * t;
      };

      for (let x = 0; x < canvas.width + gridSize; x += gridSize) {
        for (let y = 0; y < canvas.height + gridSize; y += gridSize) {
          const dx = mx - x;
          const dy = my - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const s = falloff(dist);

          const px = x + s * maxPull * (dx / (dist || 1));
          const py = y + s * maxPull * (dy / (dist || 1));

          const alpha = 0.18 + s * 0.55;
          const radius = 1.4 + s * 2.4;

          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(26,26,26,${alpha})`;
          ctx.fill();
        }
      }
    };

    let rafId: number;
    const loop = () => { drawGrid(); rafId = requestAnimationFrame(loop); };
    loop();
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", resize); };
  }, []);

  const scrollToProjects = () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

  const displayedLines = terminalSequences[seqIndex].slice(0, visibleCount);

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden flex items-center bg-background"
    >
      <Navigation />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          opacity: 0.10,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ pointerEvents: "none" }} />

      {/*
        ── PLANET ARC ──────────────────────────────────────────────────────
        The container is a large square (110vh × 110vh) whose CENTER sits
        exactly at the right edge of the viewport (right: 0).
        translateX(+70%) pushes it so that 70% of the square is off-screen
        to the right, leaving only 30% (the left arc of the planet) visible.
        The planet itself is centered inside the canvas via the 3-D camera,
        so what peeks in from the right is a clean arc.

        IMPORTANT: pointer-events must remain "none" on this wrapper so the
        dot-grid and page scrolling aren't blocked, but the Canvas inside
        re-enables pointer-events so OrbitControls still work for rotation.
      */}
      <div
        className="absolute z-5"
        style={{
          width:  "130vh",                          //increase width of the div section for the planet 
          height: "140vh",
          top:    "50%",
          right:  0,
          transform: "translate(50%, -50%)",       //move left or right by adjusting the traslate +%
          pointerEvents: "none",
        }}
      >
        {/* Re-enable pointer events just for the 3-D canvas */}
        <div style={{ width: "100%", height: "100%", pointerEvents: "auto" }}>
          <PlanetModel />
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pt-20 pb-20">
        {/* Single column — planet is decorative, not in grid flow */}
        <div className="max-w-[55%]">
          <div className="flex flex-col gap-10">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="w-8 h-0.5 bg-accent-orange" />
              <span className="font-helvetica text-sm text-foreground/45 tracking-wide">
                Full Stack Developer · Freelance
              </span>
            </motion.div>

            {/* Name */}
            <div>
              <h1 className="font-helvetica font-black leading-[0.85] tracking-tight">
                {"Hi! I'm".split("").map((letter, i) => (
                  <motion.span
                    key={`greeting-${i}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: i * 0.05, ease: [0.6, 0.01, 0.05, 0.95] }}
                    className="inline-block text-foreground"
                    style={{
                      fontSize: "clamp(2.2rem,5.5vw,4rem)",
                      textShadow: "3px 3px 0px rgba(217,78,40,0.4)",
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </h1>

              <h1 className="font-helvetica font-black leading-[0.85] tracking-tight">
                {"Ruknabh".split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.08, ease: [0.6, 0.01, 0.05, 0.95] }}
                    className="inline-block text-foreground"
                    style={{
                      fontSize: "clamp(5rem,13vw,9.5rem)",
                      textShadow: "4px 4px 0px rgba(217,78,40,0.45)",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* ── Terminal ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7, ease: [0.6, 0.01, 0.05, 0.95] }}
              className="max-w-sm"
            >
              <div
                className="border-4 border-foreground font-mono text-xs overflow-hidden"
                style={{
                  background: "rgb(26,26,26)",
                  boxShadow: "5px 5px 0 0 rgb(26,26,26)",
                }}
              >
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-orange" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <span className="ml-3 font-garamond italic text-[10px] text-white/25">
                    ruknabh ~ bash
                  </span>
                </div>

                <div className="px-4 py-3" style={{ height: "112px" }}>
                  <div className="space-y-1.5">
                    <AnimatePresence initial={false}>
                      {displayedLines.map((line, i) => (
                        <motion.div
                          key={`${seqIndex}-${i}`}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.45, ease: "easeOut" }}
                          className="flex items-start gap-2 leading-relaxed"
                        >
                          <span className={`shrink-0 font-bold ${line.color}`}>{line.prefix}</span>
                          <span className="text-white/65">{line.text}</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <div className="flex items-center gap-2">
                      <span className="text-accent-orange font-bold">$</span>
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1.1, repeat: Infinity }}
                        className="inline-block w-1.5 bg-accent-orange"
                        style={{ height: "0.85em" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hire Me */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95] }}
            >
              <Button
                variant="neo"
                size="lg"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Hire Me
                <motion.span
                  className="inline-block ml-3"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </Button>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Scroll CTA */}
      <motion.button
        onClick={scrollToProjects}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground group z-20"
      >
        <span className="font-garamond italic text-sm text-foreground/50 tracking-wide">
          scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 group-hover:text-accent-orange transition-colors duration-300" />
        </motion.div>
      </motion.button>
    </section>
  );
}