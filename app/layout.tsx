import "./globals.css";
import type { Metadata } from "next";

import {
  helvetica,
  garamond,
  cormorant
} from "./fonts/fonts";

export const metadata: Metadata = {
  title: "Ruknabh Bhattacharyya | Full Stack Developer",
  description:
    "Full-stack developer specializing in modern web applications. Available for freelance projects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={[
          helvetica.variable,
          garamond.variable,
          cormorant.variable,
        ].join(" ")}
      >
        {children}
      </body>
    </html>
  );
}