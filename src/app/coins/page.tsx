"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { CoinPackage } from "@/lib/types";
import { motion } from "framer-motion";
import { FadeUp, StaggerChildren, StaggerItem } from "@/components/motion/Animations";
import { Coins, Check, Sparkles, Zap, Gift, ArrowRight, Wallet, TrendingUp, ShoppingBag } from "lucide-react";

export default function CoinsPage() {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [packages, setPackages] = useState<CoinPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState<string | null>(null);
  const [purchased, setPurchased] = useState<string | null>(null);

  useEffect(() => {
    if (!user) { router.push("/login"); return; }
    if (user.role === "admin") { router.push("/"); return; }
    api.getCoinPackages()
      .then((d) => setPackages(d.packages))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user, router]);

  const handleBuy = async (pkg: CoinPackage) => {
    setBuying(pkg._id);
    try {
      const data = await api.buyCoins(pkg._id);
      if (user) updateUser({ ...user, coins: data.coins });
      setPurchased(pkg._id);
      setTimeout(() => setPurchased(null), 2000);
    } catch {}
    setBuying(null);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-navy-dark to-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-60 h-60 bg-sky rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-green rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-white/50 text-sm mb-2">
                <Coins size={14} />
                <span>Digital Currency</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-[Poppins] font-bold text-white">Anmool Coins</h1>
              <p className="text-white/60 mt-2">Buy coins at discounted rates and save on every order</p>
            </div>

            {/* Balance Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 min-w-0 sm:min-w-[220px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center">
                  <Wallet size={20} className="text-amber-400" />
                </div>
                <span className="text-white/60 text-sm">Your Balance</span>
              </div>
              <p className="text-3xl font-[Poppins] font-bold text-white">{user.coins.toLocaleString()}</p>
              <p className="text-white/40 text-sm">coins available</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Packages */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <StaggerChildren stagger={0.08} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <StaggerItem key={pkg._id}>
                <div className={`relative bg-white rounded-2xl border overflow-hidden transition-all duration-500 group ${
                  pkg.popular
                    ? "border-sky shadow-xl shadow-sky/10 scale-[1.02]"
                    : "border-gray-100 hover:shadow-xl hover:border-gray-200"
                }`}>
                  {/* Popular Badge */}
                  {pkg.popular && (
                    <div className="bg-gradient-to-r from-sky to-sky-dark text-white text-xs font-bold px-4 py-2 flex items-center justify-center gap-1.5">
                      <Sparkles size={12} />
                      Most Popular
                    </div>
                  )}

                  <div className="p-5 sm:p-7 text-center">
                    {/* Coin Icon */}
                    <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${
                      pkg.popular ? "bg-sky/10" : "bg-amber-50"
                    }`}>
                      <Coins size={36} className={pkg.popular ? "text-sky" : "text-amber-500"} />
                    </div>

                    {/* Coins */}
                    <p className="text-3xl sm:text-4xl font-[Poppins] font-bold text-navy">{pkg.coins.toLocaleString()}</p>
                    <p className="text-gray-400 text-sm mt-1">coins</p>

                    {/* Bonus */}
                    {pkg.bonus > 0 && (
                      <div className="inline-flex items-center gap-1.5 bg-green-50 text-green text-sm font-semibold px-3 py-1 rounded-full mt-3">
                        <Gift size={12} />
                        +{pkg.bonus} bonus coins
                      </div>
                    )}

                    {/* Price */}
                    <div className="mt-6 mb-5">
                      <p className="text-3xl font-bold text-navy">₹{pkg.price}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        ₹{(pkg.price / (pkg.coins + pkg.bonus)).toFixed(2)} per coin
                      </p>
                    </div>

                    {/* Buy Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleBuy(pkg)}
                      disabled={buying === pkg._id}
                      className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 ${
                        purchased === pkg._id
                          ? "bg-green text-white"
                          : pkg.popular
                            ? "bg-gradient-to-r from-sky to-sky-dark text-white shadow-lg shadow-sky/20 hover:shadow-xl hover:shadow-sky/30"
                            : "bg-navy text-white hover:bg-navy-dark shadow-lg shadow-navy/20"
                      }`}
                    >
                      {purchased === pkg._id ? (
                        <>
                          <Check size={16} />
                          Purchased!
                        </>
                      ) : buying === pkg._id ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Zap size={14} />
                          Buy Now
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        )}

        {/* How It Works */}
        <FadeUp delay={0.2}>
          <div className="mt-12 bg-gradient-to-br from-navy to-navy-dark rounded-3xl p-8 sm:p-10 text-white">
            <h2 className="text-2xl font-[Poppins] font-bold mb-8 text-center">How Coins Work</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { step: "1", icon: ShoppingBag, title: "Buy Coins", desc: "Purchase coin packages at discounted rates" },
                { step: "2", icon: ArrowRight, title: "Use at Checkout", desc: "Select Anmool Coins as your payment method" },
                { step: "3", icon: TrendingUp, title: "Save Money", desc: "Get bonus coins and instant savings on every order" },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 mx-auto flex items-center justify-center mb-4">
                    <s.icon size={24} className="text-sky-light" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-sky/20 flex items-center justify-center mx-auto mb-3">
                    <span className="text-sm font-bold text-sky">{s.step}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
