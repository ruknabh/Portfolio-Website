import localFont from "next/font/local";

/* ===============================
   HELVETICA
================================ */
export const helvetica = localFont({
  src: [
    { path: "./Helvetica.ttf", weight: "400", style: "normal" },
    { path: "./Helvetica-Bold.ttf", weight: "700", style: "normal" },
    { path: "./Helvetica-Oblique.ttf", weight: "400", style: "italic" },
    { path: "./Helvetica-BoldOblique.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-helvetica",
  display: "swap",
});

/* ===============================
   APPLE GARAMOND
================================ */
export const garamond = localFont({
  src: [
    { path: "./AppleGaramond.ttf", weight: "400", style: "normal" },
    { path: "./AppleGaramond-Bold.ttf", weight: "700", style: "normal" },
    { path: "./AppleGaramond-Italic.ttf", weight: "400", style: "italic" },
    { path: "./AppleGaramond-BoldItalic.ttf", weight: "700", style: "italic" },
    { path: "./AppleGaramond-Light.ttf", weight: "300", style: "normal" },
    { path: "./AppleGaramond-LightItalic.ttf", weight: "300", style: "italic" },
  ],
  variable: "--font-garamond",
  display: "swap",
});

/* ===============================
   CORMORANT GARAMOND
================================ */
export const cormorant = localFont({
  src: [
    { path: "./CormorantGaramond-Regular.ttf", weight: "400", style: "normal" },
    { path: "./CormorantGaramond-Medium.ttf", weight: "500", style: "normal" },
    { path: "./CormorantGaramond-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./CormorantGaramond-Bold.ttf", weight: "700", style: "normal" },
    { path: "./CormorantGaramond-Italic.ttf", weight: "400", style: "italic" },
    { path: "./CormorantGaramond-BoldItalic.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

/* ===============================
   BLACKSWORD (.otf is OK)
================================ */
export const blacksword = localFont({
  src: "./Blacksword.otf",
  variable: "--font-blacksword",
  display: "swap",
});
