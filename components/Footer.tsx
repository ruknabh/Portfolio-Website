export default function Footer() {
  return (
    <footer className="bg-accent-orange px-5 sm:px-8 pb-8 sm:pb-10 pt-0">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 border-t-2 border-background/15 pt-6 sm:pt-8">
        <p className="font-helvetica font-bold text-[9px] uppercase tracking-[0.35em] text-background/60 text-center sm:text-left">
          © {new Date().getFullYear()} Ruknabh Bhattacharyya — All rights reserved
        </p>
        <p className="font-garamond text-sm tracking-[0.15em] text-background/60">
          Thanks for visiting
        </p>
      </div>
    </footer>
  );
}