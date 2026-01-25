"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Code, Briefcase, Globe } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fixed scroll progress - ends earlier to ensure animations complete
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  // Subtle upward lift
  const sectionY = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  
  // Right-to-left entrance - ALL END AT 0 with proper timing
  const profileX = useTransform(scrollYProgress, [0, 0.6], [150, 0]);
  const headingX = useTransform(scrollYProgress, [0.05, 0.65], [100, 0]);
  const textX = useTransform(scrollYProgress, [0.1, 0.7], [80, 0]);
  const statsX = useTransform(scrollYProgress, [0.15, 0.75], [60, 0]);
  
  // Smooth fade in
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const stats = [
    { label: "Experience", value: "2+ Years", icon: Briefcase },
    { label: "Tech Stack", value: "10+ Tools", icon: Code },
    { label: "Location", value: "Assam, India", icon: Globe },
    { label: "Status", value: "Freelance", icon: MapPin },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen bg-background overflow-hidden "
    >
      {/* Subtle diagonal stripes background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              rgba(217,78,40,0.3) 35px,
              rgba(217,78,40,0.3) 70px
            )`,
          }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.2]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(26,26,26,0.4) 1px, transparent 1px),
              linear-gradient(0deg, rgba(26,26,26,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Main container */}
      <motion.div
        style={{ y: sectionY, opacity }}
        className="relative min-h-screen py-24 lg:py-32 px-32 flex items-center"
      >
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-12 lg:gap-16 items-center">

            {/* LEFT — Profile Card */}
            <motion.div
              style={{ x: profileX }}
              className="flex justify-center lg:justify-start order-2 lg:order-1"
            >
              <Card className="group relative bg-background border-4 border-foreground rounded-none shadow-[8px_8px_0_0_rgba(26,26,26,1)] hover:shadow-[12px_12px_0_0_rgba(217,78,40,1)] transition-all duration-300 w-full max-w-md overflow-hidden">
                {/* Subtle corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-accent-orange opacity-10 clip-triangle" />
                
                <CardHeader className="items-center text-center gap-6 pt-10 pb-10 relative">
                  {/* Circular Avatar */}
                  <div className="relative">
                    {/* Subtle glow behind image */}
                    <div className="absolute -inset-2 bg-accent-orange blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                    
                    <div className="relative w-44 h-44 rounded-full border-4 border-foreground overflow-hidden bg-background shadow-[3px_3px_0_0_rgba(26,26,26,1)]">
                      <img
                        src="/images/profile.png"
                        alt="Ruknabh Bhattacharyya"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <CardTitle className="font-helvetica font-black text-3xl text-foreground tracking-tight">
                    Ruknabh Bhattacharyya
                  </CardTitle>

                  <p className="text-base text-foreground/70 font-helvetica font-bold uppercase tracking-wider">
                    Full Stack Developer
                  </p>

                  <div className="flex items-center gap-2 text-sm text-accent-orange font-helvetica font-bold">
                    <MapPin className="w-4 h-4" />
                    Assam, India
                  </div>

                  {/* Neo-brutalist divider */}
                  <div className="w-20 h-1 bg-foreground shadow-[2px_2px_0_0_rgba(217,78,40,1)]" />
                </CardHeader>
              </Card>
            </motion.div>

            {/* RIGHT — About Content */}
            <div className="space-y-10 order-1 lg:order-2">
              
              {/* Heading */}
              <motion.div style={{ x: headingX }}>
                <h2 className="font-helvetica font-black text-4xl lg:text-7xl text-foreground tracking-tight leading-[0.9] mb-2">
                  About Me
                </h2>
                <div className="w-24 h-2 bg-accent-orange shadow-[3px_3px_0_0_rgba(26,26,26,1)]" />
              </motion.div>

              {/* Text */}
              <motion.div style={{ x: textX }}>
                <p className="font-helvetica text-base lg:text-lg leading-relaxed text-foreground/75 max-w-2xl">
                  I'm a full-stack developer focused on building modern,
                  performance-driven web experiences with clean design
                  and solid engineering. Over the past two years, I've
                  worked across frontend and backend systems—shipping
                  real products, collaborating with teams, and constantly
                  refining how code and design work together.
                </p>
              </motion.div>

              {/* Stats Grid - Smaller cards */}
              <motion.div
                style={{ x: statsX }}
                className="grid grid-cols-2 gap-3"
              >
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <Card
                      key={i}
                      className="group relative bg-background border-3 border-foreground rounded-none shadow-[4px_4px_0_0_rgba(26,26,26,1)] hover:shadow-[6px_6px_0_0_rgba(217,78,40,1)] hover:border-accent-orange transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                      {/* Corner accent on hover */}
                      <div className="absolute top-0 left-0 w-0 h-0 border-t-16 border-t-accent-orange border-r-16 border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <CardContent className="relative p-4">
                        <Icon className="w-5 h-5 text-accent-orange mb-2 transition-transform group-hover:scale-110 duration-300" />
                        <div className="font-helvetica font-black text-xl text-foreground mb-1">
                          {stat.value}
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-foreground/60 font-helvetica font-bold">
                          {stat.label}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </motion.div>
            </div>

          </div>
        </div>

        {/* Decorative accent line */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-1 h-16 bg-accent-orange shadow-[2px_0_0_0_rgba(26,26,26,1)]" />
          <div className="w-3 h-3 bg-foreground rotate-45 shadow-[2px_2px_0_0_rgba(217,78,40,1)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}