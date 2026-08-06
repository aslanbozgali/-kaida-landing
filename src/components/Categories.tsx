import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import { Icon } from "@/components/icons";
import { categories } from "@/lib/content";

const shades = ["bg-[#1436CD]", "bg-[#0f2899]", "bg-[#3b5bf0]"];

export default function Categories() {
  return (
    <section id="categories" className="bg-[#f6f5f2] px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <span className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#1436CD]">
            Всё в одном приложении
          </span>
          <h2 className="mx-auto mt-5 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-[#0b0f19] sm:text-5xl">
            Kaida объединяет лучшие заведения Актобе
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-black/55">
            Все виды отдыха и развлечений с акциями и скидками
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div
                className={`hover-lift relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-[1.75rem] p-7 text-white ${shades[i % shades.length]}`}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10"
                />
                <div className="relative">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{item.count}</p>
                </div>
                <div className="relative flex items-end justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1436CD]">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                      <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <Icon name={item.icon} className="h-12 w-12 text-white/80" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-12 flex justify-center">
          <Button href="#download" variant="primary">
            Скачать приложение
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
