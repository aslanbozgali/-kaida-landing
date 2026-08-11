import Reveal from "@/components/Reveal";
import { Icon } from "@/components/icons";
import { subscriptionBenefits, pricingPlans } from "@/lib/content";

export default function Subscription() {
  return (
    <section id="subscription" className="bg-white px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-[#eef1fd] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#1436CD]">
              Подписка Kaida App
            </span>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[#0b0f19] sm:text-5xl max-md:text-[2.25rem] max-md:font-extrabold max-md:leading-[1.1] max-md:tracking-[-0.01em]">
              Одна подписка — сотни выгод по всему городу
            </h2>
            <ul className="mt-9 flex flex-col gap-4 max-md:mt-7 max-md:gap-3.5">
              {subscriptionBenefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-base leading-relaxed text-black/60 sm:text-lg max-md:items-center max-md:gap-3.5 max-md:rounded-[1.25rem] max-md:bg-[#f6f5f2] max-md:p-4"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eef1fd] text-[#1436CD] max-md:mt-0 max-md:h-8 max-md:w-8 max-md:bg-white max-md:shadow-[0_8px_16px_-8px_rgba(11,15,25,0.15)]">
                    <Icon name="check" className="h-3.5 w-3.5 max-md:h-4 max-md:w-4" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#f6f5f2] max-md:mt-2 max-md:rounded-[2rem] max-md:border-0 max-md:shadow-[0_25px_55px_-25px_rgba(11,15,25,0.2)]">
              {pricingPlans.map((plan, i) => (
                <div
                  key={plan.duration}
                  className={`flex items-center justify-between px-7 py-6 sm:px-9 sm:py-7 max-md:px-6 max-md:py-7 ${
                    i > 0 ? "border-t border-black/8" : ""
                  } ${plan.highlighted ? "bg-[#0b0f19]" : ""}`}
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                      <span
                        className={`whitespace-nowrap text-sm font-medium ${
                          plan.highlighted ? "text-white/55" : "text-black/45"
                        }`}
                      >
                        {plan.duration}
                      </span>
                      {"badge" in plan && plan.badge && (
                        <span className="whitespace-nowrap rounded-full bg-[#1436CD] px-2.5 py-0.5 text-xs font-semibold text-white">
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <p
                      className={`mt-1 text-2xl font-semibold tracking-tight sm:text-3xl max-md:text-[1.75rem] max-md:font-bold ${
                        plan.highlighted ? "text-white" : "text-[#0b0f19]"
                      }`}
                    >
                      {plan.price}
                    </p>
                  </div>

                  <a
                    href="#download"
                    className={`shrink-0 whitespace-nowrap text-sm font-semibold transition-colors duration-300 max-md:rounded-full max-md:px-4 max-md:py-2.5 max-md:text-[15px] ${
                      plan.highlighted
                        ? "text-white hover:text-[#7f93ff] max-md:bg-white/15"
                        : "text-[#0b0f19] hover:text-[#1436CD] max-md:bg-[#1436CD]/10"
                    }`}
                  >
                    Выбрать →
                  </a>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
