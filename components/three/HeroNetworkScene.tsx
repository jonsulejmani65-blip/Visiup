"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/ui/Container";
import { useDeviceTier } from "@/lib/useDeviceTier";

const NetworkCanvas = dynamic(() => import("./NetworkCanvas"), { ssr: false });

const TRACK_HEIGHT_VH = 200; // Hero (0-50%) + Section 01 (50-100%)
const SECTION_SWITCH = 0.35;

export default function HeroNetworkScene() {
  const tier = useDeviceTier();
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [phase, setPhase] = useState<"hero" | "section01">("hero");

  useEffect(() => {
    if (!trackRef.current || tier === null || tier === "off") return;

    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        const next = self.progress < SECTION_SWITCH ? "hero" : "section01";
        setPhase((prev) => (prev === next ? prev : next));
      },
    });

    return () => {
      trigger.kill();
    };
  }, [tier]);

  if (tier === null || tier === "off") {
    return (
      <>
        <StaticFallback />
        <div id="hero-sentinel" aria-hidden />
      </>
    );
  }

  return (
    <>
      <section
        ref={trackRef}
        id="top"
        className="relative bg-ink"
        style={{ height: `${TRACK_HEIGHT_VH}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <NetworkCanvas
            progressRef={progressRef}
            tier={tier}
            mode={tier === "full" ? "drift" : "static"}
          />

          <div className="pointer-events-none absolute inset-0 z-10 flex items-center">
            <Container className="w-full">
              <div
                className="max-w-2xl transition-opacity duration-700"
                style={{ opacity: phase === "hero" ? 1 : 0 }}
              >
                <h1 className="text-balance font-display text-4xl font-light leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Dein Unternehmen existiert.
                  <br />
                  Aber wird es auch gesehen?
                </h1>
                <p className="mt-6 max-w-md text-balance text-lg font-light text-white/60">
                  Wir machen Unternehmen sichtbar, vernetzt und skalierbar.
                </p>
                <div className="mt-14 flex items-center gap-2 text-white/40">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="animate-bounce"
                  >
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                  <span className="text-xs font-medium uppercase tracking-[0.25em]">
                    Scroll
                  </span>
                </div>
              </div>

              <div
                className="max-w-xl transition-opacity duration-700"
                style={{ opacity: phase === "section01" ? 1 : 0 }}
              >
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-teal-light">
                  01 — Unsichtbar
                </span>
                <h2 className="mt-5 text-balance font-display text-3xl font-light leading-[1.2] tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Grossartige Unternehmen sollten nicht unsichtbar bleiben.
                </h2>
              </div>
            </Container>
          </div>
        </div>
      </section>
      <div id="hero-sentinel" aria-hidden />
    </>
  );
}

function StaticFallback() {
  const dots = [
    { top: "18%", left: "12%", size: 6, delay: "0s" },
    { top: "30%", left: "72%", size: 4, delay: "0.6s" },
    { top: "55%", left: "22%", size: 5, delay: "1.2s" },
    { top: "70%", left: "60%", size: 7, delay: "0.3s" },
    { top: "40%", left: "45%", size: 4, delay: "0.9s" },
    { top: "62%", left: "85%", size: 5, delay: "1.5s" },
    { top: "22%", left: "88%", size: 4, delay: "0.4s" },
  ];

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink">
      <div className="absolute inset-0">
        {dots.map((dot, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-teal-light/70"
            style={{
              top: dot.top,
              left: dot.left,
              width: dot.size,
              height: dot.size,
              boxShadow: "0 0 16px 4px rgba(127,214,205,0.35)",
              animation: `staticTwinkle 3.4s ease-in-out ${dot.delay} infinite`,
            }}
          />
        ))}
        <span
          className="absolute rounded-full bg-[#0d1518] ring-1 ring-white/10"
          style={{ top: "48%", left: "58%", width: 10, height: 10 }}
        />
      </div>
      <style>{`
        @keyframes staticTwinkle {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }
      `}</style>

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-balance font-display text-4xl font-light leading-[1.15] tracking-tight text-white sm:text-5xl">
            Dein Unternehmen existiert.
            <br />
            Aber wird es auch gesehen?
          </h1>
          <p className="mt-6 max-w-md text-balance text-lg font-light text-white/60">
            Wir machen Unternehmen sichtbar, vernetzt und skalierbar.
          </p>
        </div>
      </Container>
    </section>
  );
}
