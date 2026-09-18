import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: `Datenschutzerklärung von ${siteConfig.name}.`,
};

export default function DatenschutzPage() {
  return (
    <>
      <Navbar />
      <main className="section-py pt-40">
        <Container className="max-w-3xl">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink">
            Datenschutzerklärung
          </h1>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink/70">
            <section>
              <h2 className="font-display text-lg font-bold text-ink">
                Verantwortliche Stelle
              </h2>
              <p className="mt-2">
                {siteConfig.name}, {siteConfig.address.street},{" "}
                {siteConfig.address.zip} {siteConfig.address.city},{" "}
                {siteConfig.address.country}. Kontakt: {siteConfig.email}
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink">
                Bearbeitung von Personendaten
              </h2>
              <p className="mt-2">
                Wir bearbeiten Personendaten, die Sie uns über das
                Kontaktformular übermitteln, ausschliesslich zur
                Beantwortung Ihrer Anfrage und zur Erbringung unserer
                Dienstleistungen. Eine Weitergabe an Dritte erfolgt nicht,
                ausser wenn dies zur Vertragserfüllung notwendig ist oder
                wir gesetzlich dazu verpflichtet sind.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink">
                Ihre Rechte
              </h2>
              <p className="mt-2">
                Sie haben jederzeit das Recht auf Auskunft, Berichtigung
                oder Löschung Ihrer bei uns gespeicherten Personendaten.
                Kontaktieren Sie uns dazu unter {siteConfig.email}.
              </p>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
