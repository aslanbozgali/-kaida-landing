"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { nav } from "@/lib/content";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link href="#" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo-blue.png"
            alt="Kaida App"
            width={32}
            height={32}
            className="h-7 w-7 sm:h-8 sm:w-8"
            unoptimized
            priority
          />
          <span className="text-lg font-semibold tracking-tight text-[#0b0f19] sm:text-xl max-md:font-bold">
            Kaida App
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[15px] font-medium text-black/60 transition-colors duration-300 hover:text-[#1436CD]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#download"
          className="hidden rounded-full bg-[#1436CD] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:bg-[#0f2899] active:scale-[0.98] md:inline-flex"
        >
          Скачать приложение
        </a>

        <button
          type="button"
          aria-label="Открыть меню"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#0b0f19] md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-5 bg-current transition-transform ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-white px-5 py-4 md:hidden max-md:rounded-b-[2rem] max-md:border-t-0 max-md:px-6 max-md:pb-8 max-md:pt-4 max-md:shadow-[0_30px_60px_-25px_rgba(11,15,25,0.25)]">
          <nav className="flex flex-col gap-1 max-md:gap-2">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-[15px] font-medium text-black/70 active:bg-black/5 max-md:rounded-2xl max-md:px-4 max-md:py-4 max-md:text-[17px] max-md:font-semibold"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#download"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-[#1436CD] px-5 py-3 text-center text-sm font-semibold text-white max-md:mt-4 max-md:flex max-md:h-14 max-md:items-center max-md:justify-center max-md:rounded-[1.75rem] max-md:text-base max-md:shadow-[0_20px_40px_-15px_rgba(20,54,205,0.5)] max-md:active:scale-[0.98] max-md:transition-transform"
            >
              Скачать приложение
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
