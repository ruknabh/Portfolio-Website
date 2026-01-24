import "./globals.css";
import {
  helvetica,
  garamond,
  cormorant,
  blacksword,
} from "./fonts/fonts";

export const metadata = {
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
          blacksword.variable,
        ].join(" ")}
      >
        {children}
      </body>
    </html>
  );
}
