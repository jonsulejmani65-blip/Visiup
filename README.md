# Visiup

Website für **Visiup**, eine Digitalmarketing-Agentur für KMUs in der Region
Basel (SEO, Webdesign, Social Media Marketing, KI-Automatisierungen).

Gebaut mit Next.js 14 (App Router), TypeScript, Tailwind CSS und Framer
Motion — inspiriert von der Struktur von [emons.de](https://www.emons.de/):
nummerierte Leistungs-Sektionen, animierte Stat-Counter, Bild-Collage und
ein News-Karussell.

## Tech-Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** für Styling
- **Framer Motion** für Scroll-Animationen und Counter
- **lucide-react** für Icons

## Entwicklung

```bash
npm install
npm run dev
```

Die Seite läuft danach unter [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Projektstruktur

```
app/                   Next.js App Router (Seiten, Layout, SEO-Routen)
components/layout/     Navbar, Footer
components/sections/   Hero, Leistungen, Über uns, Referenzen, News, Kontakt
components/ui/         Wiederverwendbare UI-Bausteine (Reveal, Counter, ...)
lib/data.ts            Zentrale Inhalte (Leistungen, Stats, Case Studies, ...)
public/images/         Platzhalter-Grafiken (durch echte Bilder/Assets ersetzen)
```

## Platzhalter-Inhalte

Bilder unter `public/images/` sind generierte SVG-Platzhalter und sollten vor
dem Launch durch echte Fotos/Grafiken ersetzt werden. Texte (Referenzen,
News-Artikel, Adresse) sind Beispielinhalte.
