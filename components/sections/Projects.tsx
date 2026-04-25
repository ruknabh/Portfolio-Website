"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    title: "Asset Management System",
    description:
      "A production-ready asset management platform featuring role-based permissions, automated asset unassignment, and admin override controls. Includes a comprehensive analytics dashboard for asset tracking, maintenance scheduling, and real-time status monitoring, with a fully responsive UI and integrated data visualizations.",
    tech: [
      "React",
      "Node.js",
      "Express",
      "MySQL",
      "Tailwind CSS",
      "Recharts",
    ],
    image: "/images/project-1.png",
  },
];

function ProjectCard({
  project,
}: {
  project: (typeof projects)[0];
}) {
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
    >
      {/* LEFT — Text */}
      <div className="space-y-6">
        {/* Huge Index */}
        <div className="font-helvetica font-black text-[9rem] leading-none text-foreground/10">
          {project.number}
        </div>

        <h3 className="font-helvetica font-black text-4xl lg:text-5xl -mt-8">
          {project.title}
        </h3>

        <p className="max-w-lg text-foreground/75 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-3 pt-2">
          {project.tech.map((item, i) => (
            <span
              key={i}
              className="px-4 py-2 text-xs uppercase tracking-widest font-bold border-3 border-foreground shadow-[2px_2px_0_0_rgba(26,26,26,1)]"
            >
              {item}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-6">
          <button className="group inline-flex items-center gap-2 px-6 py-3 border-4 border-foreground font-bold uppercase tracking-widest shadow-[4px_4px_0_0_rgba(26,26,26,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_rgba(26,26,26,1)] transition-all">
            View Project
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>

      {/* RIGHT — Image */}
      <motion.div
        ref={imageRef}
        style={{ y }}
        className="relative"
      >
        <div className="border-4 border-foreground shadow-[6px_6px_0_0_rgba(26,26,26,1)] overflow-hidden bg-background">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-95 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-screen py-32 px-8 bg-background"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* ⬇️ Reduced spacing here */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-helvetica font-black text-5xl lg:text-7xl"
        >
          Projects
        </motion.h2>

        <ProjectCard project={projects[0]} />
      </div>
    </section>
  );
}
