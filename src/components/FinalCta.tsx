import Image from "next/image";
import StoreBadges from "@/components/StoreBadges";
import Reveal from "@/components/Reveal";
import { Icon } from "@/components/icons";
import { finalCtaBenefits } from "@/lib/content";

export default function FinalCta() {
  return (
    <section id="download" className="relative isolate overflow-hidden bg-white px-5 py-20 sm:px-8 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full bg-[#eef1fd]"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-8">
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-[#eef1fd] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#1436CD]">
              Kaida App
            </span>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[#0b0f19] sm:text-5xl">
              Город становится выгоднее вместе с{" "}
              <span className="text-[#1436CD]">Kaida</span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-black/55">
              Скачай приложение и открой скидки, подарки и специальные
              предложения более чем в{" "}
              <span className="font-semibold text-[#1436CD]">100</span>{" "}
              заведениях <span className="font-semibold text-[#1436CD]">Актобе</span>.
            </p>

            <StoreBadges className="mt-8" />

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {finalCtaBenefits.map((benefit) => (
                <div key={benefit.label} className="flex items-center gap-2">
                  <Icon name={benefit.icon} className="h-5 w-5 text-[#1436CD]" />
                  <span className="text-sm font-medium text-black/65">
                    {benefit.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[340px]">
            <div className="animate-scale-in relative mx-auto w-[240px] sm:w-[300px] [animation-delay:120ms]">
              <div className="overflow-hidden rounded-[3rem] border-[6px] border-[#0b0f19] bg-[#0b0f19] shadow-[0_40px_80px_-20px_rgba(11,15,25,0.3)]">
                <Image
                  src="/screens/favorites.png"
                  alt="Экран избранного в приложении Kaida"
                  width={1179}
                  height={2556}
                  className="h-auto w-full"
                />
              </div>

              <div className="absolute -left-12 top-6 hidden h-16 w-16 items-center justify-center rounded-full bg-[#1436CD] text-white shadow-[0_18px_36px_-14px_rgba(20,54,205,0.5)] sm:flex">
                <Icon name="star-medal" className="h-7 w-7" />
              </div>
              <div className="absolute -right-10 top-1/3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#1436CD] shadow-[0_18px_36px_-14px_rgba(11,15,25,0.25)]">
                <Icon name="percent" className="h-6 w-6" />
              </div>
              <div className="absolute -left-8 bottom-10 hidden h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#1436CD] shadow-[0_18px_36px_-14px_rgba(11,15,25,0.25)] sm:flex">
                <Icon name="gift" className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
