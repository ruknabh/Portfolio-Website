"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Terminal, TerminalLine } from "../ui/terminal";
import ThreeModel from "../ThreeModel";
import Navigation from "../Navigation";

const cyclingTexts = [
  "full_stack_developer",
  "ui/ux_enthusiast",
  "building_digital_experiences",
  "available_for_freelance",
];

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const smoothMouse = useRef({ x: 0, y: 0 });

  /* Terminal text cycle */
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentTextIndex((i) => (i + 1) % cyclingTexts.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  /* Mouse tracking */
  useEffect(() => {
    const onMove = (e: MouseEvent) =>
      setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* AI-style elastic grid */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const gridSize = 50;
    const influenceRadius = 250;
    const maxDistortion = 25;

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(26,26,26,0.15)";
      ctx.lineWidth = 1;

      smoothMouse.current.x += (mouse.x - smoothMouse.current.x) * 0.12;
      smoothMouse.current.y += (mouse.y - smoothMouse.current.y) * 0.12;

      const mx = smoothMouse.current.x;
      const my = smoothMouse.current.y;

      const falloff = (d: number) => {
        if (d > influenceRadius) return 0;
        const t = 1 - d / influenceRadius;
        return t * t;
      };

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();

        for (let y = 0; y < canvas.height; y += gridSize) {
          const dx = mx - x;
          const dy = my - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const strength = falloff(dist);
          const offsetX = strength * maxDistortion * Math.sin(y / 60);
          const offsetY = strength * maxDistortion * Math.sin(x / 60);

          y === 0
            ? ctx.moveTo(x + offsetX, y + offsetY)
            : ctx.lineTo(x + offsetX, y + offsetY);
        }

        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();

        for (let x = 0; x < canvas.width; x += gridSize) {
          const dx = mx - x;
          const dy = my - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const strength = falloff(dist);
          const offsetX = strength * maxDistortion * Math.sin(y / 60);
          const offsetY = strength * maxDistortion * Math.sin(x / 60);

          x === 0
            ? ctx.moveTo(x + offsetX, y + offsetY)
            : ctx.lineTo(x + offsetX, y + offsetY);
        }

        ctx.stroke();
      }
    };

    let rafId: number;
    const loop = () => {
      drawGrid();
      rafId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [mouse]);

  const scrollToProjects = () =>
    document
      .getElementById("projects")
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden flex items-center bg-background"
    >
      {/* Navigation */}
      <Navigation />

      {/* Grid */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ pointerEvents: "none" }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pt-20 pb-20">
        <div className="grid lg:grid-cols-[55%_45%] gap-16 lg:gap-15 items-center">
          
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-12">
            
            {/* Greeting + Name */}
            <div>
              <h1 className="font-helvetica font-black leading-[0.85] tracking-tight">
                {"Hi! I'm".split("").map((letter, i) => (
                  <motion.span
                    key={`greeting-${i}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.05,
                      ease: [0.6, 0.01, 0.05, 0.95]
                    }}
                    className="inline-block text-[clamp(2rem,5vw,3.5rem)] text-foreground drop-shadow-[4px_4px_0_rgba(217,78,40,0.3)]"
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
                    transition={{
                      duration: 0.8,
                      delay: 0.4 + i * 0.08,
                      ease: [0.6, 0.01, 0.05, 0.95]
                    }}
                    className="inline-block text-[clamp(4rem,10vw,7rem)] text-foreground drop-shadow-[4px_4px_0_rgba(217,78,40,0.3)]"
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7, ease: [0.6, 0.01, 0.05, 0.95] }}
            >
              <Terminal>
                <TerminalLine delay={1}>
                  <span className="text-accent-orange mr-3">$</span>
                  npm installing...
                </TerminalLine>
                <TerminalLine delay={1.2}>
                  <span className="text-accent-green mr-3">›</span>
                  <span className="text-background">{cyclingTexts[currentTextIndex]}</span>
                </TerminalLine>
              </Terminal>
            </motion.div>

            {/* Hire Me Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95] }}
            >
              <Button
                variant="neo"
                size="lg"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
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

          {/* RIGHT COLUMN - 3D Model */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.9, ease: [0.6, 0.01, 0.05, 0.95] }}
            className="w-full order-first lg:order-last"
          >
            <ThreeModel />
          </motion.div>

        </div>
      </div>

      {/* Scroll CTA */}
      <motion.button
        onClick={scrollToProjects}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-foreground group"
      >
        <span className="text-sm tracking-widest uppercase font-helvetica font-bold">
          View Work
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 group-hover:text-accent-orange transition-colors duration-300" />
        </motion.div>
      </motion.button>
    </section>
  );
}