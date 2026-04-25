"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    role: "Software Engineering Intern",
    company: "Indian Oil Corporation Limited",
    short: "IOCL",
    period: "Dec '25 – Jan '26",
    type: "Internship",
    points: [
      "Built a full-stack Asset Management System with role-based access control across multi-tier user hierarchies.",
      "Designed RESTful APIs with Node.js, Express & MySQL — including normalized schema, assignment workflows, and audit logs.",
      "Created React dashboards with Recharts for KPI tracking across asset usage, maintenance, and lifecycle.",
      "Followed clean architecture — separated controllers, services, and routes for a maintainable, scalable codebase.",
    ],
    stack: ["React", "Node.js", "Express", "MySQL", "Recharts"],
  },
  {
    role: "Frontend Developer",
    company: "Bael Tea",
    short: "Bael",
    period: "Dec '24 – Jan '25",
    type: "Contract",
    points: [
      "Developed a responsive web application from scratch using React, TypeScript, and Next.js with a mobile-first approach.",
      "Implemented client-side routing, navigation architecture, and a reusable component library.",
    ],
    stack: ["React", "TypeScript", "Next.js"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="w-full max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-helvetica text-xs uppercase tracking-[0.35em] font-bold text-foreground/40 mb-3"
        >
          Where I've worked
        </motion.p>

        <div className="flex items-end gap-6 flex-wrap mb-14 md:mb-18">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-garamond text-6xl md:text-7xl leading-none"
          >
            Experience
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
            className="flex-1 min-w-[60px] h-1.5 bg-accent-orange mb-3"
          />
        </div>

        {/* Big outer card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border-4 border-foreground overflow-hidden shadow-[10px_10px_0_0] shadow-foreground"
        >
          {experiences.map((exp, i) => (
            <div
              key={exp.company}
              className={`
                relative px-8 md:px-12 py-10 md:py-12
                ${i < experiences.length - 1 ? "border-b-4 border-foreground" : ""}
              `}
            >
              {/* Top row */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                <div>
                  {/* Role */}
                  <h3 className="font-garamond text-3xl md:text-4xl leading-tight mb-1">
                    {exp.role}
                  </h3>
                  {/* Company */}
                  <p className="font-helvetica text-sm uppercase tracking-widest font-bold text-accent-orange">
                    {exp.company}
                  </p>
                </div>

                {/* Period + type badges — right side */}
                <div className="flex flex-row md:flex-col items-start md:items-end gap-2 flex-shrink-0">
                  <span className="font-helvetica text-xs uppercase tracking-wider font-bold px-3 py-1.5 border-2 border-foreground text-foreground">
                    {exp.period}
                  </span>
                  <span className="font-helvetica text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 bg-foreground text-background">
                    {exp.type}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-foreground/10 mb-8" />

              {/* Bullet points */}
              <ul className="space-y-3 mb-8">
                {exp.points.map((point, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.05 * j }}
                    className="flex items-start gap-4"
                  >
                    <span className="mt-[7px] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent-orange" />
                    <p className="font-helvetica text-sm leading-relaxed text-foreground/70">
                      {point}
                    </p>
                  </motion.li>
                ))}
              </ul>

              {/* Stack chips */}
              <div className="flex flex-wrap gap-2">
                {exp.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-helvetica text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 border-2 border-foreground/20 text-foreground/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Background number — decorative */}
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-6 right-8 font-garamond text-[7rem] md:text-[9rem] leading-none text-foreground/[0.04] select-none"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}