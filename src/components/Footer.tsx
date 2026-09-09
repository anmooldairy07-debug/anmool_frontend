"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowRight, Globe, MessageCircle, Video, Bookmark } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-5">
        <div className="milk-splash w-full h-full" />
      </div>

      {/* CTA Strip - warmer, less AI gradient */}
      <div className="bg-[#eef3f8] border-y border-black/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-[Poppins] text-[#1a3566] text-lg font-semibold">Pure Products. Honest Promise.</h3>
            <p className="text-[#5a6b83] text-sm mt-1">From Karnal to your home — no big claims, just what we’d use ourselves.</p>
          </div>
          <Link href="/products" className="flex items-center gap-2 bg-[#1a3566] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-black transition-colors shrink-0">
            Shop now <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Image src="/logo1.png" alt="Anmool Dairy" width={180} height={150} className="rounded-xl bg-white p-1" />
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Anmool Dairy — Bringing genuine products to your family with purity, care & trust. Started with local milk in Karnal, Haryana.
            </p>
            <p className="text-white/30 text-xs mb-6">Anmool Dairy is the parent brand • DhenuVera is our traditional incense & fragrance range.</p>
            <div className="flex gap-3">
              {[Globe, MessageCircle, Video, Bookmark].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-sky hover:text-white transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/our-story" },
                { label: "Our Journey", href: "/our-story#journey" },
                { label: "Our Farm", href: "/our-farm" },
                { label: "DhenuVera", href: "/dhenuvera" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/40 hover:text-sky transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-5">Our Products</h4>
            <ul className="space-y-3">
              {[
                { label: "Milk (Karnal Local)", href: "/products?category=Milk" },
                { label: "Pure Desi Ghee", href: "/products?category=Ghee" },
                { label: "Cow Dung Ash (500g / 1kg)", href: "/products?category=Cow+Dung+Ash" },
                { label: "Cow Dung Cakes", href: "/products?category=Cow+Dung+Cakes" },
                { label: "DhenuVera — Coming Soon", href: "/dhenuvera" },
              ].map((p) => (
                <li key={p.label}>
                  <Link href={p.href} className="text-sm text-white/40 hover:text-sky transition-colors">{p.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-5">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/40">
                <MapPin size={14} className="shrink-0 text-sky-light mt-0.5" /> Village Budhanpur, Karnal, Haryana – 132001
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/40">
                <Phone size={14} className="shrink-0 text-sky-light" /> 90342-39674
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/40">
                <Phone size={14} className="shrink-0 text-sky-light" /> 70784-20222
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/40">
                <Mail size={14} className="shrink-0 text-sky-light" /> anmooldairy@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-xs text-white/30">&copy; {new Date().getFullYear()} Anmool Dairy. All rights reserved.</p>
          <div className="flex gap-5 text-xs text-white/30">
            <span className="hover:text-white/60 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white/60 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
