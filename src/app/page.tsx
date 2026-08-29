"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { FadeUp, FadeLeft, FadeRight, ScaleIn, StaggerChildren, StaggerItem } from "@/components/motion/Animations";
import {
  ArrowRight, Leaf, Truck, Heart, ShieldCheck, Star, Quote, ChevronDown, ChevronUp,
  Milk, Award, Clock, Users, ThumbsUp, ShoppingCart,
  FlaskConical, Package, Thermometer, MapPin, Send, ChevronLeft, ChevronRight as ChevronRightIcon,
} from "lucide-react";

/* ── Milk Splash SVG Component ── */
function MilkPourAnimation({ className = "", flip = false, id = "l" }: { className?: string; flip?: boolean; id?: string }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} style={{ transform: flip ? "scaleX(-1)" : undefined }}>
      <svg viewBox="0 0 120 200" fill="none" className="w-full h-full">
        <defs>
          <clipPath id={`glass-clip-${id}`}>
            <path d="M30 80 L25 180 Q25 190 35 190 L85 190 Q95 190 95 180 L90 80 Z" />
          </clipPath>
        </defs>

        {/* Pouring stream from above */}
        <rect x="56" y="-20" width="8" height="100" rx="4" fill="#0ea5e9" fillOpacity="0.5">
          <animate attributeName="y" values="-20;-20;-20;-20" dur="4s" repeatCount="indefinite" />
          <animate attributeName="height" values="0;100;100;0" dur="4s" repeatCount="indefinite" />
        </rect>

        {/* Glass body */}
        <path d="M30 80 L25 180 Q25 190 35 190 L85 190 Q95 190 95 180 L90 80 Z" fill="#e0f2fe" fillOpacity="0.3" stroke="#0ea5e9" strokeWidth="1.5" strokeOpacity="0.5" />
        <line x1="28" y1="80" x2="92" y2="80" stroke="#0ea5e9" strokeWidth="2" strokeOpacity="0.5" />

        {/* Milk inside glass — rises */}
        <g clipPath={`url(#glass-clip-${id})`}>
          <rect x="25" y="190" width="70" height="0" fill="#bae6fd">
            <animate attributeName="y" values="190;130;130;190" dur="4s" repeatCount="indefinite" />
            <animate attributeName="height" values="0;60;60;0" dur="4s" repeatCount="indefinite" />
          </rect>
          {/* Surface wave */}
          <path d="M25 130 Q35 125 50 130 Q65 135 75 130 Q85 125 95 130" fill="#7dd3fc" fillOpacity="0.7">
            <animate attributeName="d" values="M25 130 Q35 125 50 130 Q65 135 75 130 Q85 125 95 130;M25 130 Q35 135 50 130 Q65 125 75 130 Q85 135 95 130;M25 130 Q35 125 50 130 Q65 135 75 130 Q85 125 95 130" dur="1.5s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Splash droplets */}
        <circle cx="45" cy="82" r="3" fill="#0ea5e9" fillOpacity="0.6">
          <animate attributeName="cy" values="82;70;82" dur="0.8s" repeatCount="indefinite" />
          <animate attributeName="r" values="3;0;3" dur="0.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="84" r="2.5" fill="#38bdf8" fillOpacity="0.5">
          <animate attributeName="cy" values="84;72;84" dur="1s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;0;2.5" dur="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="58" cy="78" r="2" fill="#7dd3fc" fillOpacity="0.6">
          <animate attributeName="cy" values="78;64;78" dur="0.7s" repeatCount="indefinite" />
          <animate attributeName="r" values="2;0;2" dur="0.7s" repeatCount="indefinite" />
        </circle>
        <circle cx="52" cy="88" r="1.5" fill="#0ea5e9" fillOpacity="0.4">
          <animate attributeName="cy" values="88;76;88" dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="r" values="1.5;0;1.5" dur="1.2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

function TypewriterText({ text, delay = 0, speed = 50 }: { text: string; delay?: number; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [started, displayed, text, speed]);

  return (
    <span>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="inline-block w-[3px] h-[0.85em] bg-white ml-0.5 align-text-bottom animate-pulse" />
      )}
    </span>
  );
}

function MilkSplashSVG({ className = "", color = "white" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 1200 200" fill="none" className={className}>
      <path
        d="M0 120C100 80 200 160 300 130C400 100 500 180 600 140C700 100 800 170 900 130C1000 90 1100 160 1200 120V200H0V120Z"
        fill={color}
        fillOpacity="0.9"
      />
      <path
        d="M0 140C150 100 250 180 400 150C550 120 650 190 800 150C950 110 1050 180 1200 140V200H0V140Z"
        fill={color}
        fillOpacity="0.5"
      />
      {/* Splash droplets */}
      <circle cx="150" cy="90" r="8" fill={color} fillOpacity="0.6">
        <animate attributeName="cy" values="90;60;90" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="450" cy="70" r="6" fill={color} fillOpacity="0.5">
        <animate attributeName="cy" values="70;40;70" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="750" cy="80" r="10" fill={color} fillOpacity="0.4">
        <animate attributeName="cy" values="80;50;80" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="1050" cy="85" r="7" fill={color} fillOpacity="0.5">
        <animate attributeName="cy" values="85;55;85" dur="2.2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function MilkDroplets({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <path d="M50 10C50 10 20 50 20 65C20 82 33 95 50 95C67 95 80 82 80 65C80 50 50 10 50 10Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M50 20C50 20 30 50 30 62C30 75 39 85 50 85C61 85 70 75 70 62C70 50 50 20 50 20Z" fill="currentColor" fillOpacity="0.1" />
    </svg>
  );
}

/* ── Data ── */
const testimonials = [
  { name: "Priya Mehta", city: "Ahmedabad", text: "The paneer is unbelievably fresh. My family has switched from our old brand permanently.", rating: 5, product: "Paneer Fresh", avatar: "PM" },
  { name: "Rajiv Kumar", city: "Surat", text: "Finally, dairy I can trust. The milk tastes like how it did in my childhood.", rating: 5, product: "Full Cream Milk", avatar: "RK" },
  { name: "Sneha Patel", city: "Vadodara", text: "The ghee is incredible — pure, aromatic, and worth every rupee.", rating: 5, product: "Pure Desi Ghee", avatar: "SP" },
  { name: "Amit Joshi", city: "Rajkot", text: "Ordered the buttermilk for a family gathering. Everyone loved it!", rating: 5, product: "Masala Buttermilk", avatar: "AJ" },
  { name: "Neha Gupta", city: "Bhopal", text: "As a mother, Anmool's milk is the only brand I trust for my kids.", rating: 5, product: "Full Cream Milk", avatar: "NG" },
  { name: "Vikram Desai", city: "Baroda", text: "The curd set in earthen pots is something else entirely.", rating: 5, product: "Pure A2 Curd", avatar: "VD" },
];

const faqs = [
  { q: "Where do you source your milk from?", a: "All our milk comes from our own 200-acre farm in Anand, Gujarat, where 300+ cows graze freely on natural pastures." },
  { q: "Is your dairy organic and chemical-free?", a: "Yes, absolutely. We never use growth hormones, antibiotics, or artificial preservatives." },
  { q: "How do you ensure freshness during delivery?", a: "We use temperature-controlled delivery vehicles and follow a farm-to-doorstep model." },
  { q: "Do you offer subscription or daily delivery plans?", a: "Yes, we offer flexible subscription plans for milk, curd, and butter." },
  { q: "What payment methods do you accept?", a: "We accept Cash on Delivery (COD) and our own Anmool Coins system." },
  { q: "Can I visit your farm?", a: "Absolutely! We welcome visitors to our farm in Anand, Gujarat." },
];

const processSteps = [
  { icon: Milk, title: "Milking", desc: "Fresh milk from free-grazing cows" },
  { icon: FlaskConical, title: "Testing", desc: "Every batch lab-tested for purity" },
  { icon: Package, title: "Packaging", desc: "Sealed within hours of milking" },
  { icon: Thermometer, title: "Cold Storage", desc: "Temperature-controlled environment" },
  { icon: Truck, title: "Delivery", desc: "Farm-fresh to your doorstep" },
];

const stats = [
  { value: 10000, suffix: "+", label: "Happy Customers", icon: Users },
  { value: 250, suffix: "+", label: "Products", icon: Milk },
  { value: 50, suffix: "+", label: "Cities", icon: MapPin },
  { value: 99, suffix: "%", label: "Satisfaction", icon: ThumbsUp },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = target;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => { api.getProducts().then((d) => setProducts(d.products)).catch(() => {}); }, []);
  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const featured = products.slice(0, 8);

  return (
    <div>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-navy">
        {/* Banner video */}
        <div className="absolute inset-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="/banner.mp4" type="video/mp4" />
          </video>

        </div>

        <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          <div className="max-w-2xl lg:-ml-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium tracking-widest uppercase px-5 py-2 rounded-full border border-white/20 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-sky animate-pulse" />
              Est. 1965 — Anand, Gujarat
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="font-[Poppins] text-3xl sm:text-5xl lg:text-[5rem] font-extrabold text-white mt-8 leading-[1.05] tracking-tight relative"
            >
              <span className="invisible pointer-events-none select-none" aria-hidden="true">
                Farm Fresh Dairy Products <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky to-sky-light">Delivered</span>{" "}Every Morning
              </span>
              <span className="absolute inset-0">
                <TypewriterText text="Farm Fresh Dairy Products " delay={400} speed={50} />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky to-sky-light"><TypewriterText text="Delivered" delay={1600} speed={70} /></span>{" "}
                <TypewriterText text=" Every Morning" delay={2300} speed={50} />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-white/90 mt-8 text-xl leading-relaxed max-w-lg"
            >
              58 years of tradition. 300+ happy cows. 100% pure, farm-fresh dairy delivered to your doorstep — the way nature intended.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <Link href="/products" className="inline-flex items-center justify-center gap-2.5 bg-sky text-white px-10 py-4 rounded-2xl text-lg font-bold hover:bg-sky-dark transition-all shadow-xl shadow-sky/30 min-h-[52px]">
                Order Now <ArrowRight size={18} />
              </Link>
              <Link href="/our-story" className="inline-flex items-center justify-center gap-2.5 bg-white/10 text-white px-8 py-4 rounded-2xl text-base font-semibold hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all min-h-[52px]">
                Learn More
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-wrap gap-6 mt-14"
            >
              {[
                { icon: ShieldCheck, label: "Lab Tested" },
                { icon: Leaf, label: "100% Natural" },
                { icon: Award, label: "Premium Quality" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-2 text-white text-sm">
                  <b.icon size={16} className="text-sky" />
                  {b.label}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom milk wave */}
        <div className="absolute bottom-0 -left-20 -right-20 pointer-events-none">
          <svg viewBox="0 0 1800 120" fill="none" className="w-full h-24">
            <path d="M0 60C225 20 450 100 675 70C900 40 1125 100 1350 60C1575 20 1688 80 1800 60V120H0V60Z" fill="white" />
            <path d="M0 80C300 40 600 110 900 80C1200 50 1500 100 1800 80V120H0V80Z" fill="white" fillOpacity="0.5" />
          </svg>
        </div>
      </section>

      {/* ═══════════════ FEATURES BAR ═══════════════ */}
      <section className="py-8 bg-white relative overflow-hidden">
        {/* Subtle splash decoration */}
        <div className="absolute -top-20 right-0 w-60 h-60 rounded-full bg-sky/3 blur-[60px]" />
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Leaf, title: "100% Natural", desc: "No preservatives" },
              { icon: Truck, title: "Same Day Delivery", desc: "Fresh to your door" },
              { icon: Heart, title: "Farm Direct", desc: "No middlemen" },
              { icon: ShieldCheck, title: "Lab Tested", desc: "Quality certified" },
            ].map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.1}>
                <div className="flex items-center gap-4 py-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center shrink-0">
                    <f.icon size={22} className="text-sky" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-navy">{f.title}</h3>
                    <p className="text-xs text-gray-400">{f.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ABOUT SECTION ═══════════════ */}
      <section className="py-24 sm:py-32 bg-gray-50 relative overflow-hidden">
        {/* Decorative splashes */}
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-sky/5 blur-[50px]" />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-green/5 blur-[60px]" />
        <MilkDroplets className="absolute top-20 right-20 w-16 h-16 text-sky/10 animate-float" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeLeft>
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white shadow-2xl shadow-navy/10">
                  <Image src="/images/dairy-products-collage.jpeg" alt="Anmool Dairy Products" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-navy/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="font-[Poppins] font-bold text-2xl">Our Pure Dairy Range</p>
                    <p className="text-white/70 text-sm mt-1">Farm-fresh milk, paneer, ghee & more</p>
                  </div>
                </div>
                {/* Floating badge */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl shadow-navy/5 border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                      <Award size={24} className="text-green" />
                    </div>
                    <div>
                      <p className="font-[Poppins] font-bold text-navy text-lg">58 Years</p>
                      <p className="text-xs text-gray-400">of Tradition</p>
                    </div>
                  </div>
                </motion.div>
                {/* Splash decoration around image */}
                <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-sky/5 blur-[30px]" />
              </div>
            </FadeLeft>

            <div>
              <FadeUp>
                <span className="text-green font-semibold text-sm tracking-widest uppercase">About Us</span>
                <h2 className="font-[Poppins] text-4xl sm:text-5xl font-extrabold text-navy mt-3 tracking-tight leading-tight">
                  58 years of{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky to-sky-light">pure dairy</span>{" "}
                  tradition
                </h2>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p className="text-gray-500 mt-7 text-lg leading-relaxed">
                  Since 1965, the Anmool family has been dedicated to producing dairy the natural way. Our cows graze freely on 200 acres of lush pasture, drink natural spring water, and are cared for by a dedicated veterinary team.
                </p>
              </FadeUp>

              <FadeUp delay={0.3}>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[
                    { icon: Milk, title: "Farm Fresh", desc: "Within hours of milking" },
                    { icon: Leaf, title: "100% Pure", desc: "No chemicals or additives" },
                    { icon: ShieldCheck, title: "Quality Certified", desc: "Lab tested every batch" },
                    { icon: Truck, title: "Daily Delivery", desc: "Same day to your door" },
                  ].map((f) => (
                    <div key={f.title} className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-gray-100 hover:border-sky/20 hover:shadow-md transition-all">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                        <f.icon size={18} className="text-sky" />
                      </div>
                      <div>
                        <p className="font-semibold text-navy text-sm">{f.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                  <Link href="/products" className="inline-flex items-center justify-center gap-2.5 bg-sky text-white px-7 py-3.5 rounded-2xl text-base font-bold hover:bg-sky-dark transition-all shadow-lg shadow-sky/30 min-h-[52px]">
                    Order Now <ArrowRight size={16} />
                  </Link>
                  <Link href="/our-story" className="inline-flex items-center justify-center gap-2.5 border-2 border-navy text-navy px-7 py-3.5 rounded-2xl text-base font-semibold hover:bg-navy hover:text-white transition-all min-h-[52px]">
                    Read Our Story
                  </Link>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PRODUCT SHOWCASE ═══════════════ */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        {/* Decorative splashes */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none">
          <MilkSplashSVG className="w-full h-20 opacity-30" color="rgba(0,174,239,0.05)" />
        </div>
        <div className="absolute -top-20 left-1/4 w-80 h-80 rounded-full bg-sky/3 blur-[80px]" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="text-green font-semibold text-sm tracking-widest uppercase">Our Products</span>
              <h2 className="font-[Poppins] text-4xl sm:text-5xl font-extrabold text-navy mt-3 tracking-tight">Farm fresh collection</h2>
              <div className="flex items-center justify-center gap-3 mt-5">
                <div className="h-px w-12 bg-sky/30" />
                <Milk size={20} className="text-sky" />
                <div className="h-px w-12 bg-sky/30" />
              </div>
              <p className="text-gray-400 mt-4 text-lg">Every product made with love, delivered with care.</p>
            </div>
          </FadeUp>

          <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
            {featured.map((p) => (
              <StaggerItem key={p._id}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </StaggerChildren>

          <FadeUp>
            <div className="text-center mt-14">
              <Link href="/products" className="inline-flex items-center gap-2 bg-sky text-white px-8 py-4 rounded-2xl text-base font-bold hover:bg-sky-dark transition-all shadow-lg shadow-sky/30">
                Order Now <ArrowRight size={16} />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════ WHY CHOOSE US ═══════════════ */}
      <section className="py-24 sm:py-32 bg-gradient-to-br from-navy via-navy-dark to-navy relative overflow-hidden">
        {/* Milk splash decorations */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none">
          <MilkSplashSVG className="w-full h-32 opacity-20" color="rgba(0,174,239,0.15)" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none rotate-180">
          <MilkSplashSVG className="w-full h-24 opacity-10" color="rgba(255,255,255,0.1)" />
        </div>

       

        {[
          { left: 68.73, top: 16.03 }, { left: 48.30, top: 89.06 }, { left: 34.75, top: 11.79 },
          { left: 31.93, top: 50.18 }, { left: 35.16, top: 61.42 }, { left: 14.14, top: 83.90 },
          { left: 36.84, top: 59.08 }, { left: 5.05, top: 2.89 }, { left: 44.51, top: 99.47 },
          { left: 19.83, top: 89.70 }, { left: 63.69, top: 32.34 }, { left: 72.24, top: 61.52 },
          { left: 48.95, top: 83.22 }, { left: 25.79, top: 8.62 }, { left: 17.77, top: 84.10 },
          { left: 22.94, top: 45.22 }, { left: 28.69, top: 21.71 }, { left: 73.15, top: 41.71 },
          { left: 74.41, top: 16.06 }, { left: 15.52, top: 13.27 },
        ].map((pos, i) => (
          <div key={i} className="absolute w-1 h-1 bg-sky/20 rounded-full" style={{ left: `${pos.left}%`, top: `${pos.top}%` }} />
        ))}

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="text-sky font-semibold text-sm tracking-widest uppercase">Why Choose Us</span>
              <h2 className="font-[Poppins] text-4xl sm:text-5xl font-extrabold text-white mt-3 tracking-tight">The Anmool difference</h2>
              <p className="text-white/50 mt-4 text-lg max-w-lg mx-auto">We don&apos;t just deliver dairy. We deliver trust, purity, and a legacy of excellence.</p>
            </div>
          </FadeUp>

          <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.15}>
            {[
              { icon: Milk, title: "Premium Quality", desc: "Every product is lab-tested and certified.", stat: "100%" },
              { icon: Leaf, title: "100% Organic", desc: "No hormones, no antibiotics, no artificial anything.", stat: "0" },
              { icon: Truck, title: "Fast Delivery", desc: "Same-day delivery fresh within hours.", stat: "24h" },
              { icon: Users, title: "Trusted by Thousands", desc: "10,000+ families trust us daily.", stat: "10K+" },
            ].map((c) => (
              <StaggerItem key={c.title}>
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-5 sm:p-8 border border-white/10 hover:bg-white/15 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-sky/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <c.icon size={26} className="text-sky" />
                  </div>
                  <p className="font-[Poppins] text-3xl font-extrabold text-white mb-1">{c.stat}</p>
                  <h3 className="font-[Poppins] text-lg font-bold text-white">{c.title}</h3>
                  <p className="text-sm text-white/50 mt-2 leading-relaxed">{c.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ═══════════════ PROCESS TIMELINE ═══════════════ */}
      <section className="py-24 sm:py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-sky/5 blur-[50px]" />
        <MilkDroplets className="absolute bottom-20 left-10 w-20 h-20 text-green/10 animate-float" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="text-green font-semibold text-sm tracking-widest uppercase">Our Process</span>
              <h2 className="font-[Poppins] text-4xl sm:text-5xl font-extrabold text-navy mt-3 tracking-tight">From farm to your doorstep</h2>
            </div>
          </FadeUp>

          <div className="hidden lg:block">
            <div className="relative flex items-start justify-between">
              <div className="absolute top-12 left-[10%] right-[10%] h-1 bg-gray-200 rounded-full" />
              <div className="absolute top-12 left-[10%] h-1 bg-gradient-to-r from-navy via-sky to-green rounded-full" style={{ width: "80%" }} />

              {processSteps.map((step, i) => (
                <FadeUp key={step.title} delay={i * 0.15}>
                  <div className="relative flex flex-col items-center text-center w-40">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-navy to-sky flex items-center justify-center mb-5 shadow-xl z-10">
                      <step.icon size={32} className="text-white" />
                    </div>
                    <h3 className="font-[Poppins] font-bold text-navy text-lg">{step.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{step.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          <div className="lg:hidden space-y-8">
            {processSteps.map((step, i) => (
              <FadeUp key={step.title} delay={i * 0.1}>
                <div className="flex gap-5 items-start">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-navy to-sky flex items-center justify-center shrink-0 shadow-lg">
                    <step.icon size={24} className="text-white" />
                  </div>
                  <div className="pt-2">
                    <h3 className="font-[Poppins] font-bold text-navy text-lg">{step.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{step.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="py-24 sm:py-32 relative">
        <div className="absolute -top-20 left-1/3 w-60 h-60 rounded-full bg-sky/3 blur-[60px]" />

        {/* Left milk pour + image */}
        <div className="absolute left-0 lg:left-22 top-1/2 -translate-y-1/2 flex items-end gap-2 ">
          <div className="hidden lg:block w-20 h-28 rounded-xl overflow-hidden shadow-lg">
            <Image src="/images/left.jpg" alt="" fill className="object-cover rounded-[10%]" />
          </div>
          <div className="w-24 sm:w-28 lg:w-32 h-64 lg:h-80 ">
            <MilkPourAnimation id="left" />
          </div>
        </div>
        {/* Right milk pour + image */}
        <div className="absolute right-0 lg:right-22 top-1/2 -translate-y-1/2 flex items-end gap-2 ">
          <div className="w-24 sm:w-28 lg:w-32 h-64 lg:h-80">
            <MilkPourAnimation flip id="right" />
          </div>
          <div className="hidden lg:block w-20 h-28 rounded-xl overflow-hidden shadow-lg">
            <Image src="/images/right.jpg" alt="" fill className="object-cover rounded-[10%]" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="text-green font-semibold text-sm tracking-widest uppercase">Testimonials</span>
              <h2 className="font-[Poppins] text-4xl sm:text-5xl font-extrabold text-navy mt-3 tracking-tight">What our families say</h2>
            </div>
          </FadeUp>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-6 sm:p-10 lg:p-14 border border-gray-100 shadow-xl shadow-sky/5 text-center relative overflow-hidden"
              >
                {/* Decorative splash */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-sky/3 blur-[40px]" />
                <Quote size={32} className="text-sky/15 mx-auto mb-4 relative z-10" />
                <p className="font-[Poppins] text-xl text-gray-600 leading-relaxed italic max-w-2xl mx-auto relative z-10">
                  &ldquo;{testimonials[testimonialIdx].text}&rdquo;
                </p>
                <div className="flex justify-center gap-1 mt-5 relative z-10">
                  {Array.from({ length: testimonials[testimonialIdx].rating }).map((_, i) => (
                    <Star key={i} size={18} className="text-orange fill-orange" />
                  ))}
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-navy to-sky flex items-center justify-center mx-auto mt-6 text-white font-[Poppins] font-bold text-lg relative z-10">
                  {testimonials[testimonialIdx].avatar}
                </div>
                <p className="font-[Poppins] font-bold text-navy text-lg mt-4 relative z-10">{testimonials[testimonialIdx].name}</p>
                <p className="text-sm text-gray-400 relative z-10">{testimonials[testimonialIdx].city} · {testimonials[testimonialIdx].product}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-3 mt-8">
              <button onClick={() => setTestimonialIdx((i) => (i - 1 + testimonials.length) % testimonials.length)} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-navy hover:text-white hover:border-navy transition-all">
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2 items-center">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setTestimonialIdx(i)} className={`h-2 rounded-full transition-all ${i === testimonialIdx ? "w-8 bg-sky" : "w-2 bg-gray-200 hover:bg-gray-300"}`} />
                ))}
              </div>
              <button onClick={() => setTestimonialIdx((i) => (i + 1) % testimonials.length)} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-navy hover:text-white hover:border-navy transition-all">
                <ChevronRightIcon size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATISTICS ═══════════════ */}
      <section className="py-20 bg-gradient-to-r from-navy to-navy-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 pointer-events-none">
          <MilkSplashSVG className="w-full h-24 opacity-10" color="rgba(0,174,239,0.2)" />
        </div>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <FadeUp key={s.label}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <s.icon size={28} className="text-sky" />
                  </div>
                  <p className="font-[Poppins] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-white/50 mt-2">{s.label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute -bottom-20 right-1/4 w-60 h-60 rounded-full bg-sky/3 blur-[60px]" />
        <MilkDroplets className="absolute top-10 right-20 w-12 h-12 text-sky/10 animate-float" />

        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="text-green font-semibold text-sm tracking-widest uppercase">FAQ</span>
              <h2 className="font-[Poppins] text-4xl sm:text-5xl font-extrabold text-navy mt-3 tracking-tight">Frequently asked questions</h2>
            </div>
          </FadeUp>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className={`rounded-2xl border overflow-hidden transition-all ${openFaq === i ? "border-sky/20 shadow-lg shadow-sky/5 bg-white" : "border-gray-100 bg-white hover:border-sky/10"}`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  >
                    <span className="font-[Poppins] font-semibold text-navy">{faq.q}</span>
                    <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${openFaq === i ? "bg-sky text-white" : "bg-gray-50 text-gray-400"}`}>
                      {openFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <p className="text-gray-500 leading-relaxed">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ NEWSLETTER ═══════════════ */}
      <section className="py-24 sm:py-32 bg-gradient-to-br from-navy via-navy-dark to-navy relative overflow-hidden">
        {/* Milk splash decorations */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none">
          <MilkSplashSVG className="w-full h-32 opacity-15" color="rgba(0,174,239,0.2)" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none rotate-180">
          <MilkSplashSVG className="w-full h-24 opacity-10" color="rgba(255,255,255,0.08)" />
        </div>
        
        <div className="absolute top-10 left-10 w-40 h-40 bg-sky/5 rounded-full blur-[60px]" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-green/5 rounded-full blur-[80px]" />

        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeUp>
            <h2 className="font-[Poppins] text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Stay Fresh with Us</h2>
            <p className="text-white/50 mt-4 text-lg">Subscribe for exclusive offers, recipes, and farm updates.</p>
            <form className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-sky focus:bg-white/15 backdrop-blur-sm transition-all"
              />
              <button className="flex items-center justify-center gap-2 bg-sky text-white px-8 py-4 rounded-2xl font-semibold hover:bg-sky-dark transition-all shadow-xl shadow-sky/30">
                <Send size={16} /> Subscribe
              </button>
            </form>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════ FLOATING CTAs ═══════════════ */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
      <Link
        href="/products"
        className="fixed bottom-6 left-6 z-50 bg-sky text-white px-5 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-bold shadow-xl shadow-sky/40 hover:bg-sky-dark hover:scale-105 transition-all flex items-center gap-2"
      >
        <ShoppingCart size={18} /> Order Now
      </Link>
    </div>
  );
}
