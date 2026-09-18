import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum von ${siteConfig.name}.`,
};

export default function ImpressumPage() {
  return (
    <>
      <Navbar />
      <main className="section-py pt-40">
        <Container className="max-w-3xl">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink">
            Impressum
          </h1>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink/70">
            <section>
              <h2 className="font-display text-lg font-bold text-ink">
                Anbieterin
              </h2>
              <p className="mt-2">
                {siteConfig.name}
                <br />
                {siteConfig.address.street}
                <br />
                {siteConfig.address.zip} {siteConfig.address.city},{" "}
                {siteConfig.address.country}
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink">
                Kontakt
              </h2>
              <p className="mt-2">
                Telefon: {siteConfig.phone}
                <br />
                E-Mail: {siteConfig.email}
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink">
                Haftungsausschluss
              </h2>
              <p className="mt-2">
                Alle Inhalte dieser Website wurden mit grösster Sorgfalt
                erstellt. Für die Richtigkeit, Vollständigkeit und
                Aktualität der Inhalte übernehmen wir jedoch keine Gewähr.
              </p>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
