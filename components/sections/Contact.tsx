"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import RevealSection from "@/components/ui/RevealSection";
import { siteConfig } from "@/lib/data";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("success");
  };

  return (
    <section id="kontakt" className="section-py bg-ink text-white">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <RevealSection>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-light">
              Kontakt
            </span>
            <h2 className="mt-4 text-balance font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              Bereit für mehr Sichtbarkeit?
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/65">
              Erzählen Sie uns von Ihrem Vorhaben. Wir melden uns innerhalb
              von 24 Stunden mit einer kostenlosen Erst-Analyse Ihrer
              digitalen Sichtbarkeit.
            </p>

            <ul className="mt-10 space-y-5">
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-teal-light">
                  <MapPin size={18} />
                </span>
                <span className="text-sm text-white/75">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.zip} {siteConfig.address.city},{" "}
                  {siteConfig.address.country}
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-teal-light">
                  <Phone size={18} />
                </span>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="text-sm text-white/75 hover:text-white"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-teal-light">
                  <Mail size={18} />
                </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-white/75 hover:text-white"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </RevealSection>

          <RevealSection delay={0.1}>
            {status === "success" ? (
              <div className="flex h-full flex-col items-start justify-center rounded-2xl border border-white/10 bg-white/5 p-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal text-white">
                  ✓
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold">
                  Danke für Ihre Anfrage!
                </h3>
                <p className="mt-3 text-sm text-white/65">
                  Wir haben Ihre Nachricht erhalten und melden uns innerhalb
                  von 24 Stunden bei Ihnen.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:p-10"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <label htmlFor="name" className="text-xs font-medium text-white/60">
                      Name*
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-teal-light focus:outline-none"
                      placeholder="Ihr Name"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="company" className="text-xs font-medium text-white/60">
                      Unternehmen
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-teal-light focus:outline-none"
                      placeholder="Ihre Firma"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="text-xs font-medium text-white/60">
                      E-Mail*
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-teal-light focus:outline-none"
                      placeholder="name@unternehmen.ch"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="text-xs font-medium text-white/60">
                      Nachricht*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="mt-2 w-full resize-none rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-teal-light focus:outline-none"
                      placeholder="Erzählen Sie uns kurz von Ihrem Projekt…"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-teal-light hover:text-ink sm:w-auto"
                >
                  Kostenlose Analyse anfordern
                  <ArrowUpRight
                    size={18}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
              </form>
            )}
          </RevealSection>
        </div>
      </Container>
    </section>
  );
}
