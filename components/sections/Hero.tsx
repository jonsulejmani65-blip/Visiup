"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";

const tickerItems = [
  "SEO",
  "WEBDESIGN",
  "SOCIAL MEDIA MARKETING",
  "KI-AUTOMATISIERUNGEN",
  "REGION BASEL",
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-white"
    >
      {/* Animation-Loop Hintergrund (Platzhalter für Video-Loop) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-teal-dark" />
        <motion.div
          className="absolute -left-1/4 -top-1/4 h-[70vh] w-[70vh] rounded-full bg-teal/40 blur-[120px]"
          animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-1/4 top-1/3 h-[60vh] w-[60vh] rounded-full bg-teal-light/25 blur-[130px]"
          animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-[50vh] w-[50vh] rounded-full bg-teal/30 blur-[110px]"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/40" />
      </div>

      <Container className="relative z-10 pt-28">
        <div className="flex flex-col items-start">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-teal-light"
          >
            Digitalmarketing Agentur · Region Basel
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-7 max-w-4xl text-balance font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Wo Sichtbarkeit zu{" "}
            <span className="text-teal-light">Wachstum</span> wird.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-balance text-lg text-white/70"
          >
            Visiup ist die Digitalmarketing-Agentur für KMUs in Basel. SEO,
            Webdesign, Social Media Marketing und KI-Automatisierungen — für
            messbares Wachstum statt Buzzwords.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-teal px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-teal-light hover:text-ink"
            >
              Kostenlose Analyse anfordern
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href="#leistungen"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition-colors hover:border-teal-light hover:text-teal-light"
            >
              Leistungen entdecken
            </a>
          </motion.div>
        </div>
      </Container>

      {/* Ticker / Marquee im emons-Stil */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-black/20 py-4 backdrop-blur-sm">
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex items-center gap-8 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-white/50"
              >
                {item}
                <span className="text-teal-light">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-2 text-white/50 lg:flex"
      >
        <span className="rotate-90 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em]">
          Scroll
        </span>
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
}
