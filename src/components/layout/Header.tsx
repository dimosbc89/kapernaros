"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Αρχική", href: "/" },
    { name: "Εργασία", href: "/ergasia" },
    { name: "Επιχειρήσεις", href: "/epixeiriseis" },
    { name: "Εκπαίδευση", href: "/ekpaideusi" },
    { name: "Συνεργασίες", href: "/synergasies" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#131313]/80 backdrop-blur-xl shadow-[0_40px_0_0_rgba(0,0,0,0.04)]">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-12 py-6">
        <Link href="/" className="text-xl md:text-2xl font-display uppercase tracking-[0.2em] text-primary">
          Kapernaros Beauty
        </Link>
        <div className="hidden md:flex items-center space-x-10 font-body text-sm uppercase tracking-widest">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "transition-colors duration-500",
                pathname === link.href
                  ? "text-primary border-b border-primary-container pb-1"
                  : "text-white/70 hover:text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <Link href="/epixeiriseis" className="px-6 md:px-8 py-2.5 bg-primary-container text-on-primary-container text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-primary transition-colors duration-300">
          Consultation
        </Link>
      </div>
    </nav>
  );
}
