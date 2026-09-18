"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { navLinks } from "@/lib/data";
import clsx from "clsx";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled || isOpen
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <Container>
        <nav className="flex h-20 items-center justify-between">
          <Link
            href="#top"
            className={clsx(
              "font-display text-xl font-extrabold tracking-tight transition-colors",
              isScrolled || isOpen ? "text-ink" : "text-white"
            )}
          >
            VISI<span className="text-teal-light">UP</span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={clsx(
                    "text-sm font-medium transition-colors hover:text-teal",
                    isScrolled ? "text-ink" : "text-white/90"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#kontakt"
            className={clsx(
              "hidden items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors md:inline-flex",
              isScrolled
                ? "bg-teal text-white hover:bg-teal-dark"
                : "bg-white text-ink hover:bg-teal-light"
            )}
          >
            Kostenlose Analyse
            <ArrowUpRight size={16} />
          </a>

          <button
            type="button"
            aria-label={isOpen ? "Menü schliessen" : "Menü öffnen"}
            onClick={() => setIsOpen((v) => !v)}
            className={clsx(
              "flex h-10 w-10 items-center justify-center rounded-full md:hidden",
              isScrolled || isOpen ? "text-ink" : "text-white"
            )}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-black/5 bg-white md:hidden"
          >
            <Container className="flex flex-col gap-1 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-teal/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#kontakt"
                onClick={() => setIsOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-teal px-5 py-3 text-sm font-semibold text-white"
              >
                Kostenlose Analyse anfordern
                <ArrowUpRight size={16} />
              </a>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
