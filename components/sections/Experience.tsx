"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";

const experiences = [
  {
    number: "01",
    role: "Software Engineering Intern",
    company: "Indian Oil Corporation Limited",
    short: "IOCL",
    period: "Dec '25 – Jan '26",
    type: "Internship",
    points: [
      "Built a full-stack Asset Management System with role-based access control across multi-tier user hierarchies.",
      "Designed RESTful APIs with Node.js, Express & MySQL — normalized schema, assignment workflows, and audit logs.",
      "Created React dashboards with Recharts for KPI tracking across asset usage, maintenance, and lifecycle.",
      "Followed clean architecture — separated controllers, services, and routes for maintainable, scalable codebase.",
    ],
    stack: ["React", "Node.js", "Express", "MySQL", "Recharts"],
    certificate: "\\images\\certificates\\iocl.jpg", // ← swap with actual path
  },
  {
    number: "02",
    role: "Frontend Developer",
    company: "Bael Tea",
    short: "Bael",
    period: "Dec '24 – Jan '25",
    type: "Contract",
    points: [
      "Developed a responsive web application from scratch using React, TypeScript, and Next.js with mobile-first design.",
      "Implemented client-side routing, navigation architecture, and a reusable component library.",
    ],
    stack: ["React", "TypeScript", "Next.js"],
    certificate: "\\images\\certificates\\bael.png", // ← swap with actual path
  },
];

/* ─── Lightbox ───────────────────────────────────────────────────────────── */
function CertificateModal({
  src,
  company,
  onClose,
}: {
  src: string;
  company: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-sm flex items-center justify-center px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 30 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-3xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header bar */}
          <div className="flex items-center justify-between bg-foreground border-4 border-foreground px-5 py-3">
            <span className="font-helvetica font-black text-[10px] uppercase tracking-widest text-background">
              {company} — Certificate
            </span>
            <button
              onClick={onClose}
              className="text-background/50 hover:text-background transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Image */}
          <div className="border-4 border-t-0 border-foreground shadow-[10px_10px_0_0] shadow-accent-orange bg-background">
            <img
              src={src}
              alt={`${company} Certificate`}
              className="w-full h-auto object-contain max-h-[70vh]"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Certificate thumbnail ──────────────────────────────────────────────── */
function CertificateThumbnail({
  src,
  company,
  onClick,
}: {
  src: string;
  company: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full border-4 border-foreground/25 hover:border-foreground overflow-hidden shadow-[4px_4px_0_0] shadow-foreground/15 hover:shadow-accent-orange transition-all duration-200"
    >
      <img
        src={src}
        alt={`${company} Certificate`}
        className="w-full h-28 object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/55 group-hover:bg-foreground/20 flex items-center justify-center transition-all duration-200">
        <div className="flex flex-col items-center gap-1.5">
          <ZoomIn className="w-5 h-5 text-background" />
          <span className="font-helvetica font-black text-[9px] uppercase tracking-widest text-background">
            View
          </span>
        </div>
      </div>
    </button>
  );
}

/* ─── Main section ───────────────────────────────────────────────────────── */
export default function Experience() {
  const [activeCert, setActiveCert] = useState<{ src: string; company: string } | null>(null);

  return (
    <>
      {activeCert && (
        <CertificateModal
          src={activeCert.src}
          company={activeCert.company}
          onClose={() => setActiveCert(null)}
        />
      )}

      <section id="experience" className="py-24 md:py-32">
        <div className="w-full max-w-6xl mx-auto px-6">

          {/* ── Header ── */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-helvetica font-bold text-xs uppercase tracking-[0.4em] text-foreground/40 mb-3"
          >
            Where I've worked
          </motion.p>

          <div className="flex items-end gap-6 flex-wrap mb-14 md:mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-garamond  text-6xl md:text-7xl tracking-tight leading-none"
            >
              Experience
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
              className="flex-1 min-w-15.5 bg-accent-orange mb-2"
            />
          </div>

          {/* ── Cards ── */}
          <div className="flex flex-col">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`
                  relative border-4 border-foreground bg-background
                  ${i > 0 ? "border-t-0" : ""}
                  ${i === experiences.length - 1 ? "shadow-[8px_8px_0_0] shadow-foreground" : ""}
                `}
              >
                {/* Orange top-stripe */}
                <div className="h-1.5 w-full bg-accent-orange" />

                <div className="p-8 md:p-10">

                  {/* Top row */}
                  <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10 mb-8">

                    {/* Ghost number */}
                    <span className="font-helvetica font-black text-[5rem] leading-none text-foreground/8 select-none shrink-0 hidden md:block -mt-2">
                      {exp.number}
                    </span>

                    {/* Role + company */}
                    <div className="flex-1">
                      <h3 className="font-helvetica font-black text-2xl md:text-[1.75rem] uppercase tracking-tight leading-tight mb-2">
                        {exp.role}
                      </h3>
                      <p className="font-helvetica font-black text-sm uppercase tracking-widest text-accent-orange">
                        {exp.company}
                      </p>
                    </div>

                    {/* Period + type */}
                    <div className="flex flex-row md:flex-col items-start md:items-end gap-2 shrink-0">
                      <span className="font-helvetica font-black text-[10px] uppercase tracking-wider px-3 py-2 border-4 border-foreground text-foreground shadow-[3px_3px_0_0] shadow-foreground/20">
                        {exp.period}
                      </span>
                      <span className="font-helvetica font-black text-[10px] uppercase tracking-wider px-3 py-2 bg-foreground text-background">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-foreground/12 mb-8" />

                  {/* Bullets + Certificate */}
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_176px] gap-8 md:gap-10 mb-8">

                    {/* Bullet points */}
                    <ul className="space-y-4">
                      {exp.points.map((point, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.06 * j }}
                          className="flex items-start gap-4"
                        >
                          {/* Square bullet */}
                          <span className="mt-1.75 shrink-0 w-2 h-2 bg-accent-orange" />
                          <p className="font-helvetica font-bold text-sm leading-relaxed text-foreground/65">
                            {point}
                          </p>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Certificate */}
                    <div className="flex flex-col gap-2.5">
                      <p className="font-helvetica font-black text-[9px] uppercase tracking-[0.3em] text-foreground/35">
                        Certificate
                      </p>
                      <CertificateThumbnail
                        src={exp.certificate}
                        company={exp.company}
                        onClick={() =>
                          setActiveCert({ src: exp.certificate, company: exp.company })
                        }
                      />
                    </div>
                  </div>

                  {/* Stack chips */}
                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-helvetica font-black text-[9px] uppercase tracking-wider px-3 py-1.5 border-2 border-foreground/20 text-foreground/45 hover:border-foreground hover:text-foreground transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}