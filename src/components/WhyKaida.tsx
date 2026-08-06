import ConcentricRings from "@/components/ConcentricRings";
import Reveal from "@/components/Reveal";
import { Icon } from "@/components/icons";
import { whyKaida } from "@/lib/content";

export default function WhyKaida() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#1436CD] px-6 py-16 sm:px-12 sm:py-20">
          <ConcentricRings
            className="pointer-events-none absolute -left-24 -top-24 h-[420px] w-[420px] opacity-40"
            stroke="rgba(255,255,255,0.12)"
          />
          <ConcentricRings
            className="pointer-events-none absolute -bottom-24 -right-24 h-[420px] w-[420px] opacity-40"
            stroke="rgba(255,255,255,0.12)"
          />

          <Reveal className="relative text-center">
            <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
              Преимущества Kaida App
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              Всё, что нужно для выгодного отдыха в Актобе
            </h2>
          </Reveal>

          <div className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyKaida.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="hover-lift flex h-full flex-col rounded-[1.75rem] bg-white p-7">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#eef1fd] text-[#1436CD]">
                    <Icon name={item.icon} className="h-7 w-7" />
                  </span>
                  <p className="mt-6 text-3xl font-semibold tracking-tight text-[#1436CD]">
                    {item.value}
                  </p>
                  <p className="text-lg font-semibold text-[#0b0f19]">{item.title}</p>
                  <div className="mt-4 border-t border-black/8 pt-4">
                    <p className="text-sm leading-relaxed text-black/55">
                      {item.description}
                    </p>
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
