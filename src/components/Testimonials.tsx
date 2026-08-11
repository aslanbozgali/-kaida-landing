"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { testimonials } from "@/lib/content";

export default function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cards.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { root: el, threshold: 0.6 }
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  const scrollToIndex = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <section className="bg-[#f6f5f2] px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#1436CD]">
            Отзывы
          </span>
          <h2 className="mt-5 max-w-lg text-3xl font-semibold leading-tight tracking-tight text-[#0b0f19] sm:text-5xl max-md:text-[2.25rem] max-md:font-extrabold max-md:leading-[1.1] max-md:tracking-[-0.01em]">
            Что говорят наши пользователи
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-black/55 max-md:text-base">
            Реальные отзывы людей, которые уже экономят в любимых местах с
            Kaida App
          </p>
        </Reveal>

        <div
          ref={scrollerRef}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-md:mt-9 max-md:gap-4"
        >
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 90}
              className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[24%]"
            >
              <div className="hover-lift flex h-full flex-col rounded-[1.75rem] border border-black/8 bg-white p-6 max-md:rounded-[2rem] max-md:border-0 max-md:p-7 max-md:shadow-[0_25px_55px_-28px_rgba(11,15,25,0.22)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef1fd] text-base font-semibold text-[#1436CD]">
                    {t.initial}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#0b0f19]">{t.name}</p>
                    <p className="text-xs text-black/40">{t.date}</p>
                  </div>
                </div>

                <div className="mt-3 flex gap-0.5 text-[#1436CD]">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <svg key={idx} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                      <path d="M10 1.5 12.6 7l6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7z" />
                    </svg>
                  ))}
                </div>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-black/60">
                  {t.text}
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-sm text-black/40">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                    <path
                      d="M20.8 8.6c0 4.5-8.8 9.9-8.8 9.9S3.2 13.1 3.2 8.6a4.8 4.8 0 0 1 8.8-2.7 4.8 4.8 0 0 1 8.8 2.7z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {t.helpful} полезно
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between max-md:mt-6">
          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                aria-label={`Отзыв ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 max-md:h-2.5 ${
                  active === i ? "w-6 bg-[#1436CD]" : "w-2 bg-black/15"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2 max-md:gap-3">
            <button
              type="button"
              aria-label="Предыдущий отзыв"
              onClick={() => scrollToIndex(Math.max(0, active - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[#0b0f19] transition-colors duration-300 hover:border-[#1436CD]/40 hover:text-[#1436CD] max-md:h-12 max-md:w-12 max-md:border-0 max-md:bg-[#f6f5f2] max-md:shadow-[0_10px_25px_-15px_rgba(11,15,25,0.2)]"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Следующий отзыв"
              onClick={() => scrollToIndex(Math.min(testimonials.length - 1, active + 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[#0b0f19] transition-colors duration-300 hover:border-[#1436CD]/40 hover:text-[#1436CD] max-md:h-12 max-md:w-12 max-md:border-0 max-md:bg-[#f6f5f2] max-md:shadow-[0_10px_25px_-15px_rgba(11,15,25,0.2)]"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
