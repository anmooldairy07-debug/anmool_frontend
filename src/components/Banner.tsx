import Image from "next/image";

interface BannerProps {
  title: string;
  subtitle?: string;
  tag?: string;
  image: string;
}

export default function Banner({ title, subtitle, tag, image }: BannerProps) {
  return (
    <section className="relative bg-navy py-20 sm:py-32 lg:py-44 overflow-hidden">
      <div className="absolute inset-0">
        <Image src={image} alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-block bg-white/2 backdrop-blur-xl rounded-3xl px-6 py-8 sm:px-12 sm:py-10 border border-white/20 shadow-2xl">
          {tag && (
            <div className="inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 mb-4 border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-white text-[11px] font-semibold tracking-widest uppercase">{tag}</span>
            </div>
          )}
          <h1 className="font-[Poppins] text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">{title}</h1>
          {subtitle && (
            <p className="text-white/80 mt-5 text-lg max-w-xl mx-auto leading-relaxed">{subtitle}</p>
          )}
          <div className="w-16 h-1 bg-sky rounded-full mx-auto mt-6" />
        </div>
      </div>
    </section>
  );
}
