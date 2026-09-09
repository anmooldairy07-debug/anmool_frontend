"use client";

import Image from "next/image";

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-dark to-navy relative overflow-hidden flex items-center justify-center px-5 py-12">
      {/* Decorative milk wave top */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none opacity-20">
        <svg viewBox="0 0 1800 120" fill="none" className="w-full h-24">
          <path d="M0 60C225 20 450 100 675 70C900 40 1125 100 1350 60C1575 20 1688 80 1800 60V120H0V60Z" fill="#00AEEF" />
          <path d="M0 80C300 40 600 110 900 80C1200 50 1500 100 1800 80V120H0V80Z" fill="white" fillOpacity="0.5" />
        </svg>
      </div>

      {/* blurred orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-sky/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-green/10 rounded-full blur-[100px] pointer-events-none" />

      {/* subtle dots */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {[
          { left: 12, top: 18 }, { left: 88, top: 22 }, { left: 45, top: 12 },
          { left: 72, top: 85 }, { left: 25, top: 78 }, { left: 90, top: 55 },
          { left: 5, top: 45 }, { left: 55, top: 92 },
        ].map((p, i) => (
          <div key={i} className="absolute w-1 h-1 bg-sky/30 rounded-full" style={{ left: `${p.left}%`, top: `${p.top}%` }} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-3 shadow-2xl">
            <Image src="/logo1.png" alt="Anmool Dairy" width={160} height={56} className="rounded-xl" priority />
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-xs sm:text-sm font-medium tracking-widest uppercase px-5 py-2 rounded-full border border-white/15 backdrop-blur-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-sky animate-pulse" />
          Village Budhanpur, Karnal, Haryana — Since ~1.5 Years Ago
        </div>

        <h1 className="font-[Poppins] text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
          Coming <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky to-sky-light">Soon</span>
        </h1>

        <p className="text-white/60 text-lg sm:text-xl leading-relaxed mt-6 max-w-xl mx-auto">
          Pure Products. Honest Promise. — We&apos;re building something genuine.
          Stay tuned — From Karnal milk to Desi Ghee & our upcoming DhenuVera.
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="h-px w-12 bg-white/15" />
          <div className="w-2 h-2 rounded-full bg-sky/60" />
          <div className="h-px w-12 bg-white/15" />
        </div>

        {/* Notify / contact */}
        <div className="mt-10 bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 text-left sm:text-center">
          <p className="font-[Poppins] font-bold text-white text-lg">Get notified when we&apos;re live</p>
          <p className="text-white/50 text-sm mt-1">We&apos;ll drop you an email the moment we launch.</p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3.5 rounded-2xl bg-white text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky text-sm"
            />
            <button className="px-8 py-3.5 rounded-2xl bg-sky text-white font-bold hover:bg-sky-dark transition-colors shadow-lg shadow-sky/20 whitespace-nowrap">
              Notify Me
            </button>
          </form>

          <p className="text-white/30 text-xs mt-4">
            No spam — just one launch email. Reach us:{" "}
            <a href="tel:+919034239674" className="text-sky hover:underline">90342-39674</a> /{" "}
            <a href="tel:+917078420222" className="text-sky hover:underline">70784-20222</a> •{" "}
            <a href="mailto:anmooldairy@gmail.com" className="text-sky hover:underline">anmooldairy@gmail.com</a>
          </p>
        </div>

        <p className="text-white/25 text-xs tracking-widest uppercase mt-10">
          © {new Date().getFullYear()} Anmool Dairy — Pure Products. Honest Promise. • Village Budhanpur, Karnal, Haryana – 132001
        </p>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1800 120" fill="none" className="w-full h-20">
          <path d="M0 60C225 20 450 100 675 70C900 40 1125 100 1350 60C1575 20 1688 80 1800 60V120H0V60Z" fill="white" />
          <path d="M0 80C300 40 600 110 900 80C1200 50 1500 100 1800 80V120H0V80Z" fill="white" fillOpacity="0.6" />
        </svg>
      </div>
    </div>
  );
}
