import Image from "next/image";
import Reveal from "@/components/Reveal";
import { howItWorks } from "@/lib/content";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <span className="inline-flex items-center rounded-full bg-[#eef1fd] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#1436CD]">
            Как работает Kaida App
          </span>
          <h2 className="mx-auto mt-5 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-[#0b0f19] sm:text-5xl">
            Получить скидку занимает меньше минуты
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[12%] right-[12%] top-5 hidden border-t border-dashed border-[#1436CD]/25 lg:block"
          />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {howItWorks.map((item, i) => (
              <Reveal key={item.step} delay={i * 110}>
                <div className="hover-lift flex flex-col items-center text-center">
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#1436CD] text-base font-semibold text-white">
                    {item.step}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-[#0b0f19]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 max-w-[220px] text-sm leading-relaxed text-black/55">
                    {item.description}
                  </p>

                  <div className="relative mt-6 w-full max-w-[220px]">
                    <div className="overflow-hidden rounded-[2rem] border-[5px] border-[#0b0f19] bg-[#0b0f19] shadow-[0_25px_50px_-20px_rgba(11,15,25,0.35)]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={1179}
                        height={2556}
                        className="h-auto w-full"
                      />
                    </div>

                    {i < howItWorks.length - 1 && (
                      <span className="absolute top-1/2 -right-5 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1436CD] shadow-[0_8px_20px_-6px_rgba(11,15,25,0.3)] lg:flex">
                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                          <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
