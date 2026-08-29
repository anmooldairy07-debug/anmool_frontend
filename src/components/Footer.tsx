"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowRight, Globe, MessageCircle, Video, Bookmark } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white relative overflow-hidden">
      {/* Decorative milk splash background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-5">
        <div className="milk-splash w-full h-full" />
      </div>

      {/* CTA Strip */}
      <div className="bg-gradient-to-r from-sky to-sky-light relative z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-[Poppins] text-white text-2xl font-bold">Fresh from our farm to your table</h3>
            <p className="text-white/70 text-base mt-1">Order now and experience the pure taste of nature.</p>
          </div>
          <Link href="/products" className="flex items-center gap-2 bg-white text-sky px-8 py-4 rounded-2xl text-base font-semibold hover:bg-navy hover:text-white transition-all shrink-0 shadow-xl shadow-black/10">
            Shop Now <ArrowRight size={16} />
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
              Premium farm-fresh dairy products delivered fresh from our farm to your doorstep. Pure Milk, Pure Trust.
            </p>
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
                { label: "Our Story", href: "/our-story" },
                { label: "Our Farm", href: "/our-farm" },
                { label: "Products", href: "/products" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/40 hover:text-sky transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-5">Products</h4>
            <ul className="space-y-3">
              {["Fresh Milk", "Paneer", "Dahi & Yogurt", "Ghee & Butter", "Lassi & Chaas"].map((p) => (
                <li key={p}>
                  <Link href="/products" className="text-sm text-white/40 hover:text-sky transition-colors">{p}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-5">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/40">
                <MapPin size={14} className="shrink-0 text-sky-light mt-0.5" /> Anand, Gujarat, India
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/40">
                <Phone size={14} className="shrink-0 text-sky-light" /> +91 98765 43210
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/40">
                <Mail size={14} className="shrink-0 text-sky-light" /> hello@anmool.in
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
