import Image from "next/image";
import StoreBadges from "@/components/StoreBadges";
import { Icon } from "@/components/icons";
import { stats } from "@/lib/content";

export default function Hero() {
  return (
    <section className="overflow-x-hidden bg-white px-5 pt-10 sm:px-8 sm:pt-14 lg:pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-8">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#eef1fd] px-4 py-1.5 text-sm font-medium text-[#1436CD]">
              Скидки • Подарки • Акции
            </span>

            <h1 className="mt-6 text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-[#0b0f19] sm:text-5xl lg:text-[3.4rem]">
              Все скидки, подарки и акции Актобе —
              <br />
              <span className="text-[#1436CD]">в одном приложении</span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-black/55">
              Открывай Kaida App, выбирай заведение, показывай QR-код и
              получай скидки, подарки и специальные предложения более чем в
              100 заведениях города.
            </p>

            <StoreBadges className="mt-8" />

            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-black/10 pt-8 sm:max-w-md">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef1fd] text-[#1436CD]">
                    <Icon name={stat.icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-lg font-semibold leading-tight text-[#0b0f19]">
                      {stat.value}
                    </span>
                    <span className="block text-sm text-black/45">{stat.label}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[380px] lg:max-w-none">
            <div
              aria-hidden
              className="absolute -bottom-6 -right-4 h-[94%] w-[94%] rounded-[3rem] bg-[#1436CD] sm:-bottom-8 sm:-right-6"
            />

            <div className="animate-scale-in relative mx-auto w-[260px] sm:w-[320px] lg:w-[360px] lg:ml-auto lg:mr-8 [animation-delay:120ms]">
              <div className="relative overflow-hidden rounded-[3rem] border-[6px] border-[#0b0f19] bg-[#0b0f19] shadow-[0_40px_80px_-20px_rgba(11,15,25,0.35)]">
                <Image
                  src="/screens/home.jpg"
                  alt="Главный экран приложения Kaida с каталогом заведений и акциями"
                  width={1179}
                  height={2556}
                  className="h-auto w-full"
                  priority
                />
              </div>

              {/* Подарки от заведений */}
              <div className="absolute -left-10 top-10 hidden items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-[0_18px_36px_-14px_rgba(11,15,25,0.25)] sm:flex">
                <Icon name="gift" className="h-5 w-5 text-[#1436CD]" />
                <span className="text-sm font-semibold text-[#0b0f19]">
                  Подарки от заведений
                </span>
              </div>

              {/* До 30% скидки */}
              <div className="absolute -right-6 top-1/3 flex items-center gap-1 rounded-2xl bg-[#1436CD] px-4 py-3 text-white shadow-[0_18px_36px_-14px_rgba(20,54,205,0.5)] sm:-right-10">
                <span className="text-sm">до</span>
                <span className="text-xl font-semibold">30%</span>
                <span className="ml-1 text-sm">скидки</span>
              </div>

              {/* Активация по QR-коду */}
              <div className="absolute -left-8 bottom-10 hidden items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-[0_18px_36px_-14px_rgba(11,15,25,0.25)] sm:flex">
                <Icon name="qr" className="h-5 w-5 text-[#1436CD]" />
                <span className="text-sm font-semibold text-[#0b0f19]">
                  Активация по QR-коду
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
