"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import Container from "@/components/ui/Container";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import { services } from "@/lib/data";
import { useDeviceTier } from "@/lib/useDeviceTier";
import { getActiveStationIndex } from "@/components/three/CameraRig";

const GrowthSceneCanvas = dynamic(() => import("./GrowthSceneCanvas"), {
  ssr: false,
});

const STATION_COUNT = 4;
const VH_PER_PHASE = 100;
const TRACK_HEIGHT_VH = VH_PER_PHASE * (STATION_COUNT + 1);

export default function GrowthScene() {
  const tier = useDeviceTier();
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [activeStation, setActiveStation] = useState(-1);

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
        const next = getActiveStationIndex(self.progress);
        setActiveStation((prev) => (prev === next ? prev : next));
      },
    });

    return () => {
      trigger.kill();
    };
  }, [tier]);

  // Still detecting capability, or device can't handle the 3D scene:
  // render the static, fully accessible fallback.
  if (tier === null || tier === "off") {
    return (
      <>
        <Hero />
        <div id="hero-sentinel" aria-hidden />
        <Services />
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
        <GrowthSceneCanvas
          progressRef={progressRef}
          activeStationIndex={activeStation}
          tier={tier}
          mode={tier === "full" ? "scroll" : "static"}
        />

        <div className="pointer-events-none absolute inset-0 z-10 flex items-center">
          <Container className="w-full">
            {/* Intro / Hero panel */}
            <div
              aria-hidden={activeStation !== -1}
              className="max-w-2xl transition-opacity duration-500"
              style={{ opacity: activeStation === -1 ? 1 : 0 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-teal-light">
                Digitalmarketing Agentur · Region Basel
              </span>
              <h1 className="mt-7 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Wo Sichtbarkeit zu <span className="text-teal-light">Wachstum</span> wird.
              </h1>
              <p className="mt-6 max-w-lg text-balance text-lg text-white/70">
                Visiup ist die Digitalmarketing-Agentur für KMUs in Basel. Scrollen Sie
                durch unsere vier Leistungen — direkt im Signal-Raum.
              </p>
              <div
                className="mt-10 flex flex-wrap items-center gap-4"
                style={{ pointerEvents: activeStation === -1 ? "auto" : "none" }}
              >
                <a
                  href="#kontakt"
                  className="group inline-flex items-center gap-2 rounded-full bg-teal px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-teal-light hover:text-ink"
                >
                  Kostenlose Analyse anfordern
                  <ArrowUpRight size={18} />
                </a>
              </div>
              <div className="mt-14 flex items-center gap-2 text-white/50">
                <ArrowDown size={16} className="animate-bounce" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                  Scrollen, um die Leistungen zu erkunden
                </span>
              </div>
            </div>

            {/* Station panels */}
            {services.map((service, index) => (
              <div
                key={service.id}
                aria-hidden={activeStation !== index}
                className="absolute left-6 top-1/2 max-w-md -translate-y-1/2 rounded-2xl border border-white/10 bg-ink/60 p-8 backdrop-blur-md transition-opacity duration-500 sm:left-8 lg:left-12"
                style={{ opacity: activeStation === index ? 1 : 0 }}
              >
                <span className="font-display text-3xl font-extrabold text-teal-light/40">
                  {service.number}
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-teal-light">
                  {service.short}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  {service.description}
                </p>
                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
                  {service.facts.map((fact) => (
                    <div key={fact.label}>
                      <dd className="font-display text-xl font-extrabold text-white">
                        {fact.value}
                      </dd>
                      <dd className="text-xs text-white/55">{fact.label}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href="#kontakt"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-teal-light"
                  style={{ pointerEvents: activeStation === index ? "auto" : "none" }}
                >
                  Mehr erfahren
                  <ArrowUpRight size={16} />
                </a>
              </div>
            ))}

            {/* Progress indicator */}
            <div className="pointer-events-none absolute bottom-10 right-6 flex flex-col items-center gap-3 sm:right-10">
              {["01", "02", "03", "04"].map((label, index) => (
                <span
                  key={label}
                  className="flex h-2 w-2 items-center justify-center rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      activeStation === index ? "#7fd6cd" : "rgba(255,255,255,0.25)",
                    transform: activeStation === index ? "scale(1.6)" : "scale(1)",
                  }}
                  aria-hidden
                />
              ))}
            </div>
          </Container>
        </div>
      </div>
    </section>
    <div id="hero-sentinel" aria-hidden />
    </>
  );
}
