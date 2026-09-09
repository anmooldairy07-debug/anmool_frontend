import Image from "next/image";

interface BannerProps {
  title: string;
  subtitle?: string;
  tag?: string;
  image: string;
}

export default function Banner({ title, subtitle, tag, image }: BannerProps) {
  return (
    <section className="relative bg-[#0f1f3a] py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0">
        <Image src={image} alt="" fill className="object-cover opacity-50" priority />
        <div className="absolute inset-0 bg-[#0f1f3a]/65" />
      </div>
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        {tag && (
          <p className="text-white/60 text-[11px] tracking-[0.18em] uppercase font-semibold">{tag}</p>
        )}
        <h1 className="font-[Poppins] text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight mt-2">{title}</h1>
        {subtitle && (
          <p className="text-white/70 mt-3 text-[15px] leading-relaxed max-w-2xl mx-auto">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
