import Image from "next/image";
import Container from "@/components/ui/Container";
import RevealSection from "@/components/ui/RevealSection";
import StatCounter from "@/components/ui/StatCounter";
import { aboutImages, aboutStats } from "@/lib/data";

export default function About() {
  return (
    <section id="ueber-uns" className="section-py bg-[#f6f8f7]">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <RevealSection>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
              Über Visiup
            </span>
            <h2 className="mt-4 text-balance font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Eine Agentur, die KMUs aus der Region Basel wirklich versteht
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/65">
              Visiup wurde gegründet, um kleinen und mittleren Unternehmen den
              Zugang zu Digitalmarketing auf Konzern-Niveau zu ermöglichen —
              ohne Konzern-Preise und ohne Fachchinesisch. Wir arbeiten eng,
              transparent und mit klarem Fokus auf messbare Resultate.
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/65">
              Ob Bäckerei, Treuhandbüro oder Physiotherapie-Praxis: Wir
              entwickeln digitale Auftritte und Strategien, die zur Grösse und
              zum Budget unserer Kund:innen passen — und trotzdem gross
              wirken.
            </p>

            <dl className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {aboutStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-3xl font-extrabold text-teal sm:text-4xl">
                    <StatCounter value={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dd className="mt-1 text-xs text-ink/55">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </RevealSection>

          <RevealSection delay={0.1}>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                    <Image
                      src={aboutImages[0].src}
                      alt={aboutImages[0].alt}
                      fill
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={aboutImages[2].src}
                      alt={aboutImages[2].alt}
                      fill
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 sm:mt-12">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={aboutImages[1].src}
                      alt={aboutImages[1].alt}
                      fill
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                    <Image
                      src={aboutImages[3].src}
                      alt={aboutImages[3].alt}
                      fill
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-6 h-28 w-28 overflow-hidden rounded-2xl border-4 border-[#f6f8f7] shadow-card sm:h-36 sm:w-36">
                <Image
                  src={aboutImages[4].src}
                  alt={aboutImages[4].alt}
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>
            </div>
          </RevealSection>
        </div>
      </Container>
    </section>
  );
}
