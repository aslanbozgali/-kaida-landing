import { AppleLogo, GooglePlayLogo } from "@/components/icons";

export default function StoreBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 max-md:flex-col max-md:items-stretch ${className}`}>
      <a
        href="https://apps.apple.com/kz/app/kaida-app/id6754979600"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 rounded-2xl bg-[#0b0f19] px-5 py-3 text-white transition-transform duration-300 hover:scale-[1.03] max-md:h-14 max-md:justify-center max-md:rounded-[1.75rem] max-md:shadow-[0_20px_40px_-18px_rgba(11,15,25,0.3)] max-md:active:scale-[0.98]"
      >
        <AppleLogo className="h-6 w-6" />
        <span className="leading-tight">
          <span className="block text-[11px] text-white/60">Скачать в</span>
          <span className="block text-base font-semibold">App Store</span>
        </span>
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=com.kaida_android"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 rounded-2xl bg-[#0b0f19] px-5 py-3 text-white transition-transform duration-300 hover:scale-[1.03] max-md:h-14 max-md:justify-center max-md:rounded-[1.75rem] max-md:shadow-[0_20px_40px_-18px_rgba(11,15,25,0.3)] max-md:active:scale-[0.98]"
      >
        <GooglePlayLogo className="h-6 w-6" />
        <span className="leading-tight">
          <span className="block text-[11px] text-white/60">Доступно в</span>
          <span className="block text-base font-semibold">Google Play</span>
        </span>
      </a>
    </div>
  );
}
