import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",

  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {
      /* ===============================
         COLORS (Tailwind v4 – CSS var mapped)
      =============================== */
      colors: {
        /* Core semantic colors */
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",


        "accent-orange": "#d94e28",
        "accent-green": "#8b9a7f",
        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-foreground":
          "rgb(var(--primary-foreground) / <alpha-value>)",

        /* Cards */
        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          foreground:
            "rgb(var(--card-foreground) / <alpha-value>)",
        },

        /* Dark tokens (optional future use) */
        dark: {
          bg: "rgb(10 10 10 / <alpha-value>)",
          card: "rgb(26 26 26 / <alpha-value>)",
        },

        /* Accent palette */
        accent: {
          orange: "rgb(217 78 40 / <alpha-value>)",
          cyan: "rgb(0 212 255 / <alpha-value>)",
          sage: "rgb(139 154 127 / <alpha-value>)",
        },
      },

      /* ===============================
         FONTS (already verified working)
      =============================== */
      fontFamily: {
        helvetica: ["var(--font-helvetica)", "system-ui", "sans-serif"],
        garamond: ["var(--font-garamond)", "serif"],
        cormorant: ["var(--font-cormorant)", "serif"],
        blacksword: ["var(--font-blacksword)", "cursive"],
        mono: ["JetBrains Mono", "monospace"],
      },

      /* ===============================
         TYPOGRAPHY SCALE
      =============================== */
      fontSize: {
        hero: ["clamp(4rem, 10vw, 8rem)", { lineHeight: "0.9" }],
        large: ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.1" }],
      },

      /* ===============================
         ANIMATIONS (safe, no plugin)
      =============================== */
      animation: {
        "fade-up": "fadeUp 0.6s ease-out both",
        "slide-in": "slideIn 0.8s ease-out both",
        glow: "glow 2s ease-in-out infinite",
      },

      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(0, 212, 255, 0.8)",
          },
        },
      },
    },
  },

  plugins: [],
};

export default config;
