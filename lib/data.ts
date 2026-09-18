export const siteConfig = {
  name: "Visiup",
  tagline: "Wo Sichtbarkeit zu Wachstum wird.",
  description:
    "Visiup ist die Digitalmarketing-Agentur für KMUs in der Region Basel. Wir kombinieren SEO, Webdesign, Social Media Marketing und KI-Automatisierungen zu messbarem Wachstum.",
  url: "https://www.visiup.ch",
  email: "hallo@visiup.ch",
  phone: "+41 61 000 00 00",
  address: {
    street: "Steinentorstrasse 11",
    zip: "4051",
    city: "Basel",
    country: "Schweiz",
  },
  social: {
    instagram: "https://instagram.com/visiup",
    linkedin: "https://linkedin.com/company/visiup",
    facebook: "https://facebook.com/visiup",
    tiktok: "https://tiktok.com/@visiup",
  },
};

export const navLinks = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Über uns", href: "#ueber-uns" },
  { label: "Referenzen", href: "#referenzen" },
  { label: "News", href: "#news" },
  { label: "Kontakt", href: "#kontakt" },
];

export type Service = {
  number: string;
  id: string;
  title: string;
  short: string;
  description: string;
  facts: { value: string; label: string }[];
  image: string;
};

export const services: Service[] = [
  {
    number: "01",
    id: "seo",
    title: "SEO",
    short: "Sichtbar werden, wo gesucht wird",
    description:
      "Wir bringen KMUs aus der Region Basel dorthin, wo ihre Kund:innen suchen: nach oben. Technisches SEO, Content-Strategie und lokale Suchmaschinenoptimierung aus einer Hand.",
    facts: [
      { value: "+180%", label: "organischer Traffic ø" },
      { value: "Top 3", label: "Google-Rankings lokal" },
      { value: "90+", label: "Core Web Vitals Score" },
      { value: "4–8 Mt.", label: "bis spürbarem Wachstum" },
    ],
    image: "/images/service-seo.svg",
  },
  {
    number: "02",
    id: "webdesign",
    title: "Webdesign",
    short: "Websites, die verkaufen statt nur gefallen",
    description:
      "Massgeschneiderte Webauftritte für KMUs — schnell, responsive und auf Conversion optimiert. Von der ersten Skizze bis zum Launch begleiten wir jeden Schritt.",
    facts: [
      { value: "< 1.5s", label: "Ladezeit ø" },
      { value: "100%", label: "mobile-first" },
      { value: "+65%", label: "mehr Anfragen ø" },
      { value: "2–4 Wo.", label: "Umsetzungszeit" },
    ],
    image: "/images/service-webdesign.svg",
  },
  {
    number: "03",
    id: "social-media",
    title: "Social Media Marketing",
    short: "Reichweite, die zu Kund:innen wird",
    description:
      "Strategie, Content und Ads für Instagram, LinkedIn, Facebook & TikTok — zugeschnitten auf KMU-Budgets und mit klarer Erfolgsmessung statt Bauchgefühl.",
    facts: [
      { value: "3,2x", label: "ø ROAS" },
      { value: "+220%", label: "Engagement ø" },
      { value: "12+", label: "Content-Formate" },
      { value: "wöchentlich", label: "Reporting" },
    ],
    image: "/images/service-social.svg",
  },
  {
    number: "04",
    id: "ki-automatisierung",
    title: "KI-Automatisierungen",
    short: "Zeit sparen, Prozesse skalieren",
    description:
      "Wir automatisieren Marketing- und Vertriebsprozesse mit KI — von Lead-Qualifizierung über Chatbots bis zu automatisierten Reportings. Weniger Handarbeit, mehr Wirkung.",
    facts: [
      { value: "15+ Std.", label: "gesparte Zeit/Woche" },
      { value: "24/7", label: "automatisierte Prozesse" },
      { value: "+40%", label: "schnellere Lead-Antwort" },
      { value: "1:1", label: "auf KMU zugeschnitten" },
    ],
    image: "/images/service-ki.svg",
  },
];

export const aboutStats = [
  { value: 7, suffix: "+", label: "Jahre Erfahrung" },
  { value: 85, suffix: "+", label: "betreute KMUs" },
  { value: 14, suffix: "", label: "Branchen" },
  { value: 98, suffix: "%", label: "Kundenzufriedenheit" },
];

export const aboutImages = [
  { src: "/images/about-1.svg", alt: "Visiup Team bei der Arbeit in Basel" },
  { src: "/images/about-2.svg", alt: "Strategie-Session mit KMU-Kunden" },
  { src: "/images/about-3.svg", alt: "Kreativ-Workshop für Webdesign" },
  { src: "/images/about-4.svg", alt: "Content-Produktion für Social Media" },
  { src: "/images/about-5.svg", alt: "KI-Automatisierung und Workflow-Tools" },
];

export type CaseStudy = {
  client: string;
  industry: string;
  result: string;
  description: string;
  services: string[];
  image: string;
};

export const caseStudies: CaseStudy[] = [
  {
    client: "Bäckerei Zumstein",
    industry: "Lokales Gewerbe",
    result: "+240% lokale Suchanfragen",
    description:
      "Mit lokalem SEO und einer neuen Website wurde die Traditionsbäckerei zur meistgefundenen Adresse für Basler Sonntagsbrunch-Bestellungen.",
    services: ["SEO", "Webdesign"],
    image: "/images/case-1.svg",
  },
  {
    client: "Rhein Physiotherapie",
    industry: "Gesundheit",
    result: "3,4x mehr Terminanfragen",
    description:
      "Eine durchdachte Social-Media-Strategie und gezielte Ads füllten den Terminkalender der Praxis innerhalb von drei Monaten.",
    services: ["Social Media Marketing"],
    image: "/images/case-2.svg",
  },
  {
    client: "Basel Treuhand AG",
    industry: "Finanzdienstleistung",
    result: "18 Std./Woche gespart",
    description:
      "Automatisierte Lead-Qualifizierung und Reporting-Workflows entlasten das Team spürbar — bei gleichzeitig schnellerer Kundenantwort.",
    services: ["KI-Automatisierungen", "Webdesign"],
    image: "/images/case-3.svg",
  },
];

export type BlogPost = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: "5 SEO-Trends, die KMUs 2026 nicht ignorieren sollten",
    excerpt:
      "Von KI-gestützter Suche bis zu Local SEO: Diese Entwicklungen entscheiden über Sichtbarkeit im nächsten Jahr.",
    category: "SEO",
    date: "12. Sep 2026",
    readTime: "5 Min.",
    image: "/images/blog-1.svg",
  },
  {
    title: "Warum Ladezeit über Umsatz entscheidet",
    excerpt:
      "Jede Sekunde zählt: Wie technische Performance direkt Ihre Conversion-Rate beeinflusst — mit konkreten Zahlen.",
    category: "Webdesign",
    date: "3. Sep 2026",
    readTime: "4 Min.",
    image: "/images/blog-2.svg",
  },
  {
    title: "Social Media für KMUs: Mit kleinem Budget grosse Wirkung",
    excerpt:
      "Wie regionale Betriebe mit gezieltem Content und smarten Ads planbar neue Kund:innen gewinnen.",
    category: "Social Media",
    date: "27. Aug 2026",
    readTime: "6 Min.",
    image: "/images/blog-3.svg",
  },
  {
    title: "KI-Automatisierung: Der Einstieg für kleine Teams",
    excerpt:
      "Drei Automatisierungen, die sich für KMUs sofort lohnen — ganz ohne eigene IT-Abteilung.",
    category: "KI-Automatisierung",
    date: "19. Aug 2026",
    readTime: "5 Min.",
    image: "/images/blog-4.svg",
  },
];

export const footerColumns = [
  {
    heading: "Leistungen",
    links: [
      { label: "SEO", href: "#leistungen" },
      { label: "Webdesign", href: "#leistungen" },
      { label: "Social Media Marketing", href: "#leistungen" },
      { label: "KI-Automatisierungen", href: "#leistungen" },
    ],
  },
  {
    heading: "Agentur",
    links: [
      { label: "Über Visiup", href: "#ueber-uns" },
      { label: "Referenzen", href: "#referenzen" },
      { label: "News", href: "#news" },
      { label: "Kontakt", href: "#kontakt" },
    ],
  },
  {
    heading: "Rechtliches",
    links: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
    ],
  },
];
