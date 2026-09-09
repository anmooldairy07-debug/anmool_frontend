"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { getAssetUrl } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, User, Menu, X, Coins, LogOut, ChevronDown, Phone } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileDhenuveraOpen, setMobileDhenuveraOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setUserOpen(false); setOpenDropdown(null); }, [pathname]);

  const handleLogout = () => { logout(); setUserOpen(false); router.push("/"); };

  const productsSub = [
    { label: "All Products", href: "/products" },
    { label: "Milk", href: "/products?category=Milk" },
    { label: "Pure Desi Ghee", href: "/products?category=Ghee" },
    { label: "Cow Dung Ash", href: "/products?category=Cow+Dung+Ash" },
    { label: "Cow Dung Cakes", href: "/products?category=Cow+Dung+Cakes" },
  ];

  const dhenuveraSub = [
    { label: "DhenuVera Overview", href: "/dhenuvera" },
    { label: "Cone Dhoop", href: "/dhenuvera#cone" },
    { label: "Stick Dhoop", href: "/dhenuvera#stick" },
    { label: "Sambrani Cups", href: "/dhenuvera#sambrani" },
  ];

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      {/* Top bar */}
      <div className="bg-navy text-white/70 text-xs py-2">
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between gap-4">
          <span className="hidden sm:inline">Pure Products. Honest Promise. — From Karnal, Haryana</span>
          <span className="sm:hidden truncate">Village Budhanpur, Karnal, Haryana – 132001</span>
          <div className="flex items-center gap-3 shrink-0 ml-auto">
            <a href="tel:+919034239674" className="flex items-center gap-1.5 hover:text-sky transition-colors">
              <Phone size={11} />
              <span className="font-medium hidden sm:inline">90342-39674</span>
              <span className="font-medium sm:hidden">90342-39674</span>
            </a>
            <span className="hidden sm:inline text-white/20">|</span>
            <a href="tel:+917078420222" className="hidden sm:flex items-center gap-1.5 hover:text-sky transition-colors">
              <span className="font-medium">70784-20222</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(26,53,102,0.08)]"
            : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image src="/logo1.png" alt="Anmool Dairy" width={170} height={150} className="rounded-xl bg-white p-1" priority />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link href="/" className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${pathname === "/" ? "text-sky bg-sky-50" : "text-gray-600 hover:text-sky hover:bg-sky-50"}`}>
                Home
              </Link>
              <Link href="/our-story" className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${pathname === "/our-story" ? "text-sky bg-sky-50" : "text-gray-600 hover:text-sky hover:bg-sky-50"}`}>
                About Us
              </Link>

              {/* Our Products dropdown */}
              <div className="relative" onMouseEnter={() => setOpenDropdown("products")} onMouseLeave={() => setOpenDropdown(null)}>
                <button
                  onClick={() => setOpenDropdown(openDropdown === "products" ? null : "products")}
                  className={`flex items-center gap-1 px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${isActive("/products") ? "text-sky bg-sky-50" : "text-gray-600 hover:text-sky hover:bg-sky-50"}`}
                >
                  Our Products <ChevronDown size={14} className={`transition-transform ${openDropdown === "products" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openDropdown === "products" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50"
                    >
                      {productsSub.map((s) => (
                        <Link key={s.label} href={s.href} className="block px-5 py-2.5 text-sm text-gray-600 hover:bg-sky-50 hover:text-sky transition-colors">
                          {s.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* DhenuVera dropdown */}
              <div className="relative" onMouseEnter={() => setOpenDropdown("dhenuvera")} onMouseLeave={() => setOpenDropdown(null)}>
                <Link
                  href="/dhenuvera"
                  onClick={() => setOpenDropdown(null)}
                  className={`flex items-center gap-1 px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${isActive("/dhenuvera") ? "text-sky bg-sky-50" : "text-gray-600 hover:text-sky hover:bg-sky-50"}`}
                >
                  DhenuVera <ChevronDown size={14} className={`transition-transform ${openDropdown === "dhenuvera" ? "rotate-180" : ""}`} />
                </Link>
                <AnimatePresence>
                  {openDropdown === "dhenuvera" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50"
                    >
                      {dhenuveraSub.map((s) => (
                        <Link key={s.label} href={s.href} className="block px-5 py-2.5 text-sm text-gray-600 hover:bg-sky-50 hover:text-sky transition-colors">
                          {s.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/our-story#journey" className="px-4 py-2.5 text-sm font-medium rounded-xl transition-all text-gray-600 hover:text-sky hover:bg-sky-50">
                Our Journey
              </Link>
              <Link href="/contact" className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${pathname === "/contact" ? "text-sky bg-sky-50" : "text-gray-600 hover:text-sky hover:bg-sky-50"}`}>
                Contact
              </Link>
            </nav>

            {/* Right */}
            <div className="flex items-center gap-2">
              {!isAdmin && (
                <Link href="/products" className="hidden lg:flex items-center gap-2 bg-sky text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-sky-dark transition-all shadow-md shadow-sky/20">
                  Order Now
                </Link>
              )}
              {user && !isAdmin && (
                <Link href="/coins" className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-full transition-all text-green bg-green-50 hover:bg-green-50/80">
                  <Coins size={15} />
                  {user.coins.toLocaleString()}
                </Link>
              )}

              <Link href="/cart" className={`relative p-2.5 rounded-xl transition-all text-gray-600 hover:text-sky hover:bg-sky-50 ${isAdmin ? "hidden" : ""}`}>
                <ShoppingBag size={21} strokeWidth={1.8} />
                {totalItems > 0 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-0.5 -right-0.5 bg-sky text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </motion.span>
                )}
              </Link>

              {user ? (
                <div className="relative">
                  <button onClick={() => setUserOpen(!userOpen)} className="flex items-center gap-2 p-1.5 pr-3 rounded-xl transition-all hover:bg-sky-50">
                    <div className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold overflow-hidden">
                      {user.avatar?.startsWith("/uploads") ? (
                        <img src={getAssetUrl(user.avatar)} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        user.avatar
                      )}
                    </div>
                    <ChevronDown size={13} className="hidden sm:block text-gray-400" />
                  </button>
                  <AnimatePresence>
                    {userOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setUserOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50"
                        >
                          <div className="px-5 py-3 border-b border-gray-100">
                            <p className="font-[Poppins] font-semibold text-navy">{user.name}</p>
                            <p className="text-sm text-gray-400 truncate">{user.email}</p>
                          </div>
                          {isAdmin ? (
                            <Link href="/admin" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-600 hover:bg-sky-50 hover:text-sky transition-colors" onClick={() => setUserOpen(false)}>
                              <Coins size={16} /> Admin Panel
                            </Link>
                          ) : (
                            <>
                              <Link href="/profile" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-600 hover:bg-sky-50 hover:text-sky transition-colors" onClick={() => setUserOpen(false)}>
                                <User size={16} /> My Profile
                              </Link>
                              <Link href="/coins" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-600 hover:bg-sky-50 hover:text-sky transition-colors" onClick={() => setUserOpen(false)}>
                                <Coins size={16} /> Buy Coins
                              </Link>
                            </>
                          )}
                          <div className="border-t border-gray-100 mt-1 pt-1">
                            <button onClick={handleLogout} className="flex items-center gap-3 px-5 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors w-full">
                              <LogOut size={16} /> Sign out
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/login" className="ml-1 hidden sm:flex items-center gap-2 bg-navy text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-navy-dark shadow-lg shadow-navy/10">
                  <User size={15} /> Sign in
                </Link>
              )}

              <button onClick={() => setOpen(!open)} className="lg:hidden p-2.5 rounded-xl transition-all text-gray-600 hover:bg-sky-50">
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="py-3 px-5 space-y-1 pb-5">
                <Link href="/" onClick={() => setOpen(false)} className={`block px-5 py-3 text-base font-medium rounded-xl transition-colors ${pathname === "/" ? "text-sky bg-sky-50" : "text-gray-600 hover:bg-sky-50"}`}>
                  Home
                </Link>
                <Link href="/our-story" onClick={() => setOpen(false)} className={`block px-5 py-3 text-base font-medium rounded-xl transition-colors ${pathname === "/our-story" ? "text-sky bg-sky-50" : "text-gray-600 hover:bg-sky-50"}`}>
                  About Us
                </Link>

                {/* Mobile Products dropdown */}
                <div>
                  <button onClick={() => setMobileProductsOpen(!mobileProductsOpen)} className="w-full flex items-center justify-between px-5 py-3 text-base font-medium rounded-xl text-gray-600 hover:bg-sky-50">
                    Our Products <ChevronDown size={16} className={`transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileProductsOpen && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-sky/10 pl-4">
                      {productsSub.map((s) => (
                        <Link key={s.label} href={s.href} onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-500 hover:text-sky">
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile DhenuVera dropdown */}
                <div>
                  <button onClick={() => setMobileDhenuveraOpen(!mobileDhenuveraOpen)} className="w-full flex items-center justify-between px-5 py-3 text-base font-medium rounded-xl text-gray-600 hover:bg-sky-50">
                    DhenuVera <ChevronDown size={16} className={`transition-transform ${mobileDhenuveraOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileDhenuveraOpen && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-sky/10 pl-4">
                      {dhenuveraSub.map((s) => (
                        <Link key={s.label} href={s.href} onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-500 hover:text-sky">
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link href="/our-story#journey" onClick={() => setOpen(false)} className="block px-5 py-3 text-base font-medium rounded-xl text-gray-600 hover:bg-sky-50">
                  Our Journey
                </Link>
                <Link href="/contact" onClick={() => setOpen(false)} className={`block px-5 py-3 text-base font-medium rounded-xl transition-colors ${pathname === "/contact" ? "text-sky bg-sky-50" : "text-gray-600 hover:bg-sky-50"}`}>
                  Contact
                </Link>
                {!user && (
                  <Link href="/login" onClick={() => setOpen(false)} className="block px-5 py-3 text-base font-semibold text-sky">Sign in</Link>
                )}
                {!isAdmin && (
                  <Link href="/products" onClick={() => setOpen(false)} className="block px-5 py-3.5 text-base font-bold text-white bg-sky rounded-xl text-center mt-2 hover:bg-sky-dark transition-colors shadow-md shadow-sky/20">
                    Order Now
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
