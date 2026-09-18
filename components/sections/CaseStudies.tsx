import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import RevealSection from "@/components/ui/RevealSection";
import { caseStudies } from "@/lib/data";

export default function CaseStudies() {
  return (
    <section id="referenzen" className="section-py bg-white">
      <Container>
        <RevealSection>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
                Referenzen
              </span>
              <h2 className="mt-4 max-w-xl text-balance font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                Ergebnisse, die für sich sprechen
              </h2>
            </div>
            <p className="max-w-sm text-sm text-ink/60">
              Drei Beispiele, wie wir KMUs aus Basel mit gezielten
              Massnahmen zu spürbarem Wachstum verholfen haben.
            </p>
          </div>
        </RevealSection>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {caseStudies.map((study, index) => (
            <RevealSection key={study.client} delay={index * 0.1} as="article">
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card transition-transform duration-300 hover:-translate-y-1">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={study.image}
                    alt={`Case Study ${study.client}`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink">
                    {study.industry}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold text-ink">
                    {study.client}
                  </h3>
                  <p className="mt-2 text-2xl font-extrabold text-teal">
                    {study.result}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60">
                    {study.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {study.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal-dark"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#kontakt"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-teal"
                  >
                    Case Study anfragen
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
