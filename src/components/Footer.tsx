import Image from "next/image";
import { nav } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-white px-5 pb-5 pt-24 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-[#f0efec] px-8 py-12 sm:px-14 sm:py-16">
        <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/brand/logo-blue.png"
                alt="Kaida"
                width={28}
                height={28}
                className="h-7 w-7"
                unoptimized
              />
              <span className="text-xl font-semibold tracking-tight text-[#0b0f19]">
                kaida
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-black/45">
              Скидки и подарки в любимых местах Актобе — в одном приложении.
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-black/35">Навигация</span>
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-base text-black/65 transition-colors duration-300 hover:text-[#1436CD]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-black/35">Город</span>
            <span className="text-base text-black/65">Актобе</span>
            <span className="text-base text-black/65">RU / KZ</span>
          </div>
        </div>

        <p className="mt-14 text-xs text-black/35">
          © {new Date().getFullYear()} Kaida App. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
