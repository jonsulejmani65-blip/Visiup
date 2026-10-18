"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import RevealSection from "@/components/ui/RevealSection";
import { blogPosts } from "@/lib/data";

export default function BlogCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollByCard = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>("[data-card]");
    const cardWidth = card ? card.offsetWidth + 24 : 340;
    scroller.scrollBy({ left: direction * cardWidth, behavior: "smooth" });

    setActiveIndex((prev) => {
      const next = prev + direction;
      return Math.max(0, Math.min(blogPosts.length - 1, next));
    });
  };

  return (
    <section id="news" className="section-py bg-[#f6f8f7]">
      <Container>
        <RevealSection>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
                News &amp; Marketing-Tipps
              </span>
              <h2 className="mt-4 max-w-xl text-balance font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                Frisches Wissen für Ihr Wachstum
              </h2>
            </div>

            <div className="flex gap-3 self-start sm:self-auto">
              <button
                type="button"
                aria-label="Vorheriger Artikel"
                onClick={() => scrollByCard(-1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-teal hover:text-teal disabled:opacity-30"
                disabled={activeIndex === 0}
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Nächster Artikel"
                onClick={() => scrollByCard(1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-teal hover:text-teal disabled:opacity-30"
                disabled={activeIndex === blogPosts.length - 1}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </RevealSection>

        <div
          ref={scrollerRef}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {blogPosts.map((post) => (
            <article
              key={post.title}
              data-card
              className="group flex w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white sm:w-[340px]"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="340px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 rounded-full bg-teal px-3 py-1 text-xs font-semibold text-white">
                  {post.category}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs text-ink/50">
                  <time>{post.date}</time>
                  <span>·</span>
                  <span>{post.readTime} Lesezeit</span>
                </div>
                <h3 className="mt-3 text-lg font-bold leading-snug text-ink">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">
                  {post.excerpt}
                </p>
                <a
                  href="#"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-teal"
                >
                  Artikel lesen
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
