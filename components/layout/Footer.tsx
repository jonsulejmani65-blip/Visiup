import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import {
  InstagramIcon,
  LinkedInIcon,
  FacebookIcon,
  TikTokIcon,
} from "@/components/icons/SocialIcons";
import { siteConfig, footerColumns } from "@/lib/data";

const socialLinks = [
  { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: siteConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: siteConfig.social.tiktok, label: "TikTok", Icon: TikTokIcon },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <Container className="pb-10 pt-20">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link
              href="#top"
              className="font-display text-3xl font-extrabold tracking-tight"
            >
              VISI<span className="text-teal-light">UP</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex gap-3">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-teal-light hover:text-teal-light"
                >
                  <Icon width={18} height={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-teal-light">
                  {col.heading}
                </h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-white/70 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-teal-light">
                Kontakt
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-white/70">
                <li>
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.zip} {siteConfig.address.city}
                </li>
                <li>
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                    className="hover:text-white"
                  >
                    {siteConfig.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                    {siteConfig.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Alle Rechte
            vorbehalten.
          </p>
          <a
            href="#kontakt"
            className="inline-flex items-center gap-1.5 font-medium text-white/80 hover:text-teal-light"
          >
            Kostenlose Analyse anfordern
            <ArrowUpRight size={14} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
