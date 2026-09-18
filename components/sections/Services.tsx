import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import RevealSection from "@/components/ui/RevealSection";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section id="leistungen" className="section-py bg-white">
      <Container>
        <RevealSection>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
            Leistungen
          </span>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Vier Hebel für messbares Wachstum
          </h2>
        </RevealSection>

        <div className="mt-16 flex flex-col divide-y divide-ink/10 border-t border-ink/10">
          {services.map((service, index) => (
            <RevealSection key={service.id} delay={index * 0.05} as="article">
              <div
                id={service.id}
                className="grid grid-cols-1 gap-10 py-14 lg:grid-cols-12 lg:items-center lg:gap-8"
              >
                <div className="lg:col-span-1">
                  <span className="font-display text-3xl font-extrabold text-teal/30">
                    {service.number}
                  </span>
                </div>

                <div className="lg:col-span-4">
                  <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-teal">
                    {service.short}
                  </p>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-ink/65">
                    {service.description}
                  </p>
                  <a
                    href="#kontakt"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-teal"
                  >
                    Mehr erfahren
                    <ArrowUpRight size={16} />
                  </a>
                </div>

                <div className="lg:col-span-3">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="lg:col-span-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/40">
                    Auf einen Blick
                  </p>
                  <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5">
                    {service.facts.map((fact) => (
                      <div key={fact.label}>
                        <dt className="sr-only">{fact.label}</dt>
                        <dd className="font-display text-2xl font-extrabold text-ink">
                          {fact.value}
                        </dd>
                        <dd className="text-xs text-ink/55">{fact.label}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
