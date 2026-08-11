import Image from "next/image";
import Reveal from "@/components/Reveal";
import { partners } from "@/lib/content";

export default function Partners() {
  return (
    <section id="partners" className="bg-white px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <span className="inline-flex items-center rounded-full bg-[#eef1fd] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#1436CD]">
            Наши партнёры
          </span>
          <h2 className="mx-auto mt-5 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-[#0b0f19] sm:text-5xl max-md:text-[2.25rem] max-md:font-extrabold max-md:leading-[1.1] max-md:tracking-[-0.01em]">
            Лучшие заведения Актобе всегда с вами
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-black/55 max-md:text-base">
            Мы сотрудничаем с топовыми местами города, чтобы вы получали
            максимум удовольствия и выгоды
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 max-md:mt-10 max-md:gap-3.5">
          {partners.map((partner, i) => (
            <Reveal key={partner.name} delay={(i % 10) * 60}>
              <div className="hover-lift flex h-full flex-col items-center gap-3 rounded-2xl border border-black/8 bg-[#f6f5f2] px-4 py-6 text-center max-md:rounded-[1.75rem] max-md:border-0 max-md:py-7 max-md:shadow-[0_18px_40px_-24px_rgba(11,15,25,0.2)]">
                {partner.logo ? (
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white max-md:h-14 max-md:w-14">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </span>
                ) : (
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1436CD] text-lg font-semibold text-white max-md:h-14 max-md:w-14 max-md:text-xl">
                    {partner.name.charAt(0)}
                  </span>
                )}
                <span className="text-sm font-medium leading-snug text-[#0b0f19]">
                  {partner.name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150} className="mt-10 text-center">
          <span className="text-sm text-black/40">
            Логотипы остальных партнёров скоро появятся здесь
          </span>
        </Reveal>
      </div>
    </section>
  );
}
