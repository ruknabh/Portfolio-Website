"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Mail, FileDown } from "lucide-react";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder – integrate Web3Forms / EmailJS later
    console.log(formData);
    setFormData({ name: "", email: "", message: "" });
  };

  const socials = [
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Mail, label: "Email", href: "mailto:your@email.com" },
    { icon: FileDown, label: "Resume", href: "#" },
  ];

  return (
    <section
      ref={ref}
      id="contact"
      className="relative min-h-screen bg-accent-orange px-8 py-32"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* LEFT — Editorial Text */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="font-helvetica font-black text-[clamp(3rem,8vw,6rem)] leading-[0.9] text-background">
            LET’S BUILD
            <br />
            SOMETHING
          </h2>
        </motion.div>

        {/* RIGHT — Form */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <div>
              <label className="block mb-2 font-bold uppercase tracking-widest text-background text-xs">
                Name
              </label>
              <input
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-5 border-4 border-foreground bg-background text-lg focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-bold uppercase tracking-widest text-background text-xs">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-5 border-4 border-foreground bg-background text-lg focus:outline-none"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-2 font-bold uppercase tracking-widest text-background text-xs">
                Message
              </label>
              <textarea
                name="message"
                rows={6}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-4 border-4 border-foreground bg-background text-lg resize-none focus:outline-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-4 px-8 py-6 border-4 border-foreground bg-foreground text-background font-bold uppercase tracking-widest shadow-[6px_6px_0_0_rgba(26,26,26,1)] hover:bg-background hover:text-foreground hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0_0_rgba(26,26,26,1)] transition-all"
            >
              Send Message
            </button>
          </form>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            {socials.map((item, i) => {
              const Icon = item.icon;
              return (
                <a
                  key={i}
                  href={item.href}
                  className="flex items-center gap-2 px-6 py-3 bg-background border-3 border-foreground font-bold uppercase tracking-widest text-xs hover:bg-foreground hover:text-background transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
