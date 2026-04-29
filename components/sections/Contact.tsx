"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Github, Linkedin, Instagram, Twitter,
  Mail, FileDown, ArrowRight, X, Download,
} from "lucide-react";

/* ─── Resume confirmation modal ─────────────────────────────────────────── */
function ResumeModal({
  open,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50"
            onClick={onCancel}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center px-5 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 24 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto bg-background border-4 border-foreground shadow-[10px_10px_0_0] shadow-accent-orange w-full max-w-sm p-6 sm:p-8 relative"
            >
              <button
                onClick={onCancel}
                className="absolute top-4 right-4 p-1 text-foreground/30 hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 bg-accent-orange border-4 border-foreground flex items-center justify-center mb-6 shadow-[3px_3px_0_0] shadow-foreground">
                <Download className="w-5 h-5 text-background" />
              </div>

              <h3 className="font-helvetica font-black text-xl uppercase tracking-tight mb-2 text-foreground">
                Download Resume?
              </h3>
              <p className="font-helvetica text-xs uppercase tracking-widest text-foreground/40 leading-relaxed mb-8">
                You're about to download Ruknabh's resume as a PDF.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={onCancel}
                  className="flex-1 py-3 border-2 border-foreground/30 font-helvetica text-[10px] uppercase tracking-widest font-bold text-foreground/50 hover:border-foreground hover:text-foreground transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 py-3 bg-foreground text-background font-helvetica font-black text-[10px] uppercase tracking-widest border-4 border-foreground shadow-[4px_4px_0_0] shadow-accent-orange hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
                >
                  Download
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Contact section ────────────────────────────────────────────────────── */
export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setFormData({ name: "", email: "", message: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleResumeConfirm = () => {
    setResumeOpen(false);
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Ruknabh_Bhattacharyya_Resume.pdf";
    link.click();
  };

  const socials = [
    { icon: Github,    label: "GitHub",    href: "https://github.com/ruknabh" },
    { icon: Linkedin,  label: "LinkedIn",  href: "https://www.linkedin.com/in/ruknabh-bhattacharyya-8b182b281/" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com/" },
    { icon: Twitter,   label: "Twitter",   href: "https://x.com/ruknabh" },
    { icon: Mail,      label: "Email",     href: "mailto:ruknabhbhattacharyya009@gmail.com" },
  ];

  const inputCls =
    "w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-transparent border-4 border-background/40 " +
    "font-helvetica font-bold text-sm text-background placeholder:text-background/30 " +
    "focus:outline-none focus:border-background transition-colors duration-200";

  return (
    <>
      <ResumeModal
        open={resumeOpen}
        onConfirm={handleResumeConfirm}
        onCancel={() => setResumeOpen(false)}
      />

      <section
        id="contact"
        className="relative bg-accent-orange px-5 sm:px-8 py-20 sm:py-28 md:py-36 overflow-hidden"
      >

        <div className="relative max-w-6xl mx-auto">

          {/* Section eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-helvetica font-bold text-xs uppercase tracking-[0.4em] text-background/60 mb-5 sm:mb-6"
          >
            Get in touch
          </motion.p>

          {/* Two-column grid — single col on mobile, two col on lg */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 sm:gap-16 lg:gap-24 items-start">

            {/* ── LEFT: heading + copy + socials + resume ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-7 sm:gap-8"
            >
              {/* Heading */}
              <h2
                className="font-black leading-[0.88] uppercase tracking-tight text-background"
                style={{ fontSize: "clamp(2.4rem, 9vw, 4.8rem)" }}
              >
                Let's build
                <br />
                something...
              </h2>

              {/* Rule */}
              <div className="w-14 h-1.5 bg-background" />

              {/* Social icon buttons */}
              <div className="flex flex-col gap-3">
                <p className="font-helvetica font-black text-[10px] uppercase tracking-[0.3em] text-background/60">
                  Find me on
                </p>
                <div className="flex flex-wrap gap-2">
                  {socials.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="
                          w-11 h-11
                          flex items-center justify-center
                          bg-background text-foreground
                          border-4 border-background
                          shadow-[4px_4px_0_0] shadow-foreground/30
                          hover:translate-x-1 hover:translate-y-1 hover:shadow-none
                          transition-all duration-200
                        "
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Resume */}
              <div className="flex flex-col gap-3">
                <p className="font-helvetica font-black text-[10px] uppercase tracking-[0.3em] text-background/60">
                  My resume
                </p>
                <button
                  onClick={() => setResumeOpen(true)}
                  className="
                    self-start inline-flex items-center gap-3
                    px-5 sm:px-6 py-3 sm:py-3.5
                    bg-background text-foreground
                    border-4 border-background
                    font-helvetica font-black text-xs uppercase tracking-widest
                    shadow-[5px_5px_0_0] shadow-foreground/30
                    hover:translate-x-1.25 hover:translate-y-1.25 hover:shadow-none
                    transition-all duration-200
                  "
                >
                  <FileDown className="w-4 h-4" />
                  Download Resume
                </button>
              </div>
            </motion.div>

            {/* ── RIGHT: form ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col items-start gap-5 py-14 sm:py-20"
                  >
                    <div className="w-14 h-14 bg-background border-4 border-background flex items-center justify-center shadow-[4px_4px_0_0] shadow-foreground/30">
                      <span className="font-helvetica font-black text-foreground text-xl leading-none">✓</span>
                    </div>
                    <h3 className="font-helvetica font-black text-3xl uppercase tracking-tight text-background">
                      Message sent!
                    </h3>
                    <p className="font-helvetica font-bold text-xs uppercase tracking-widest text-background/60">
                      I'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Name + Email — stacked on mobile, side-by-side on sm+ */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.2 }}
                      >
                        <label className="block mb-2 font-helvetica font-black text-[10px] uppercase tracking-[0.3em] text-background">
                          Name
                        </label>
                        <input
                          name="name"
                          required
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleChange}
                          className={inputCls}
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.25 }}
                      >
                        <label className="block mb-2 font-helvetica font-black text-[10px] uppercase tracking-[0.3em] text-background">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          className={inputCls}
                        />
                      </motion.div>
                    </div>

                    {/* Message */}
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.3 }}
                    >
                      <label className="block mb-2 font-helvetica font-black text-[10px] uppercase tracking-[0.3em] text-background">
                        Message
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        placeholder="Tell me about your project…"
                        value={formData.message}
                        onChange={handleChange}
                        className={`${inputCls} resize-none`}
                      />
                    </motion.div>

                    {/* Submit */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.35 }}
                    >
                      <button
                        type="submit"
                        className="
                          group inline-flex items-center gap-3
                          mt-2 px-6 sm:px-8 py-3.5 sm:py-4
                          bg-background text-foreground
                          border-4 border-background
                          font-helvetica font-black text-xs uppercase tracking-widest
                          shadow-[6px_6px_0_0] shadow-foreground/30
                          hover:translate-x-1.5 hover:translate-y-1.5 hover:shadow-none
                          transition-all duration-200
                        "
                      >
                        Send Message
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </section>
    </>
  );
}