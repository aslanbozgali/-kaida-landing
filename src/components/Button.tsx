import Link from "next/link";

type Variant = "primary" | "outline" | "dark";

const variantClasses: Record<Variant, string> = {
  primary: "bg-[#1436CD] text-white hover:bg-[#0f2899]",
  outline: "border border-black/15 text-[#0b0f19] hover:border-[#1436CD]/50 hover:text-[#1436CD]",
  dark: "bg-[#0b0b0f] text-white hover:bg-black",
};

export default function Button({
  href,
  variant,
  className = "",
  children,
}: {
  href: string;
  variant: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-7 py-4 text-base font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] max-md:h-14 max-md:w-full max-md:rounded-[1.75rem] max-md:px-8 max-md:text-[17px] max-md:shadow-[0_20px_40px_-18px_rgba(11,15,25,0.28)] ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
