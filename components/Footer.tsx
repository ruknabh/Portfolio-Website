export default function Footer() {
  return (
    <footer className="bg-accent-orange px-8 pb-10 pt-0">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 border-t-2 border-background/15 pt-8">
        <p className="font-helvetica font-bold text-[10px] uppercase tracking-[0.35em] text-background/60">
          © {new Date().getFullYear()} Ruknabh Bhattacharyya — All rights reserved
        </p>
        <p className="font-garamond text-md tracking-[0.15em] text-background/60">
          Thanks for visiting
        </p>
      </div>
    </footer>
  );
}