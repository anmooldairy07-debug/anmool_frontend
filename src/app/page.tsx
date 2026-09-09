"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Quote, ChevronDown, ChevronUp, Star, ChevronLeft, ChevronRight as ChevronRightIcon, ShoppingCart } from "lucide-react";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => { api.getProducts().then((d) => setProducts(d.products)).catch(() => {}); }, []);
  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx((i) => (i + 1) % 3), 5000);
    return () => clearInterval(t);
  }, []);

  const featured = products.slice(0, 4);

  const testimonials = [
    { name: "Sunil Kumar", place: "Karnal", text: "Started with milk — genuinely fresh. Now we take their ghee too. You can taste the difference, it’s not factory stuff.", product: "Milk & Desi Ghee" },
    { name: "Reena Sharma", place: "Karnal", text: "The cow dung cakes are properly dried, not damp like market ones. Burn clean for our daily havan.", product: "Cow Dung Cakes" },
    { name: "Amit Verma", place: "Panipat", text: "Ordered ghee online — came from Karnal in 2 days. My mother said it smells like ghar ka ghee.", product: "Pure Desi Ghee" },
  ];

  const faqs = [
    { q: "Do you deliver milk outside Karnal?", a: "No — milk is still local. We supply fresh milk in and around Karnal so it reaches you the same morning. Outside Karnal we send Ghee, Ash, Cakes and soon DhenuVera." },
    { q: "Is your Desi Ghee actually pure?", a: "We don’t make it in a big factory. We work with a small trusted source we’ve vetted, pack it hygienically and mention everything clearly on the label. If we wouldn’t give it to our own kids, we won’t sell it." },
    { q: "Cow Dung Ash / Cakes — what are they for?", a: "For havan, pooja and traditional home use. Ash comes in 500g / 1kg, Cakes in convenient bundles. Dried properly, not half-burnt." },
    { q: "What is DhenuVera? When is it coming?", a: "Our new incense range — Cone Dhoop, Stick Dhoop and Sambrani Cups in 6 fragrances. We’re finalising it now. If you want a heads up, WhatsApp us on 90342-39674." },
    { q: "How do I order?", a: "This website, or just WhatsApp/call 90342-39674 / 70784-20222, or email anmooldairy@gmail.com. We reply the same day." },
  ];

  return (
    <div className="bg-[#FFFBF5] text-[#1d2a39]">
      {/* HERO */}
      <section className="relative bg-[#0f1f3a] overflow-hidden">
        <div className="absolute inset-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-50">
            <source src="/banner.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#0f1f3a]/70" />
        </div>

        {/* subtle paper grain */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-[640px]">
            <p className="text-white/60 text-[11px] tracking-[0.2em] uppercase">Village Budhanpur · Karnal · Haryana — started Jan 2024</p>

            <h1 className="font-[Poppins] font-extrabold text-white leading-[0.95] tracking-tight mt-4 text-[40px] sm:text-[56px]">
              Pure Products.
              <br />
              <span className="font-light italic text-[#8ec8ff]">Honest Promise.</span>
            </h1>

            <p className="text-white/80 mt-6 text-[17px] leading-relaxed">
              Bringing genuine products to your family — with purity, care & trust.
            </p>
            <p className="text-white/55 mt-3 text-[15px] leading-relaxed">
              We started by carrying milk cans in Karnal. Then ghee. Then cow dung products our customers asked for. Now <span className="text-white font-medium">DhenuVera</span> — same idea: if we wouldn’t use it at home, we won’t sell it.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/products" className="bg-[#00AEEF] text-white px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-[#0095cc] transition-colors inline-flex items-center gap-2">
                Explore products <ArrowRight size={16} />
              </Link>
              <Link href="/our-story" className="bg-white/10 text-white border border-white/20 px-7 py-3.5 rounded-full text-[15px] font-medium hover:bg-white/15 transition-colors">
                Read our story
              </Link>
            </div>

            <p className="text-white/40 text-xs mt-6 italic">P.S. Milk is still delivered by us before 7am in Karnal — no middlemen, just our own route.</p>
          </div>
        </div>

        <div className="h-[1px] bg-white/10" />
      </section>

      {/* TRUST STRIP - simple text not icons */}
      <div className="bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#6b7a90]">
          <span><b className="text-[#1d2a39] font-semibold">Milk</b> — fresh, Karnal only</span>
          <span className="opacity-30">·</span>
          <span><b className="text-[#1d2a39]">Desi Ghee</b> — pan-India</span>
          <span className="opacity-30">·</span>
          <span>Cow Dung Ash <span className="opacity-60">500g / 1kg</span> · Cakes for havan</span>
          <span className="opacity-30">·</span>
          <span className="text-[#c08a2a] font-medium">DhenuVera — coming soon</span>
        </div>
      </div>

      {/* STORY */}
      <section className="py-16 sm:py-20 bg-[#FFFBF5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">
            <div>
              <p className="text-[#6b8e23] text-xs tracking-[0.18em] uppercase font-semibold">A small beginning, big purpose</p>
              <h2 className="font-[Poppins] text-[32px] sm:text-[36px] font-bold text-[#1a3566] mt-2 leading-tight">
                We didn’t start to be a “brand”.
                <br />
                <span className="font-normal text-[#3d5a80]">We started to fix a problem.</span>
              </h2>

              <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-[#3d4f63]">
                <p>
                  About a year and a half ago in Budhanpur, Karnal — people were worried about what they were actually buying: was the milk diluted? Is the ghee pure? We thought: let’s just supply what we’d want for our own family.
                </p>
                <p>
                  So we started with milk in our local lanes. No ads, just word of mouth. One house told another. Then ghee — sourced from a small trusted maker we visited ourselves — went to homes across India. The messages we got back kept us going.
                </p>
                <p>
                  Then customers asked: “Do you have good cow dung cakes for havan?” We added those too — properly dried Ash and Cakes, not rushed. Every product since has come from a real ask, not a catalogue.
                </p>
              </div>

              <div className="mt-8 border-l-2 border-[#00AEEF]/30 pl-5 py-1">
                <p className="font-serif italic text-[17px] leading-relaxed text-[#1a3566]">
                  “If we would not want a product for our own family, we would not want to offer it to yours.”
                </p>
                <p className="text-xs text-[#6b7a90] mt-2">— the rule we still use when we list anything new</p>
              </div>

              <div className="flex gap-3 mt-8">
                <Link href="/our-story" className="text-sm font-semibold text-[#1a3566] underline underline-offset-4 decoration-[#00AEEF]/40 hover:decoration-[#00AEEF]">
                  Read the full story →
                </Link>
                <span className="text-black/10">|</span>
                <Link href="/contact" className="text-sm text-[#6b7a90] hover:text-[#1a3566]">Talk to us</Link>
              </div>
            </div>

            <div className="relative lg:sticky lg:top-24">
              {/* Polaroid style */}
              <div className="bg-white p-3 pb-10 rounded-[4px] shadow-[0_10px_40px_rgba(26,53,102,0.12)] rotate-[0.6deg]">
                <div className="relative aspect-[4/3.2] overflow-hidden bg-[#f3e9d8]">
                  <Image src="/images/dairy-products-collage.jpeg" alt="Our products on a table at home" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
                </div>
                <p className="font-serif italic text-center text-sm text-[#6b5a48] mt-4">Our first table — milk, ghee, and a lot of learning.</p>
                <p className="text-center text-[11px] tracking-wide text-black/40 uppercase mt-1">Budhanpur, Karnal · early 2024</p>
              </div>
              {/* small sticker */}
              <div className="absolute -bottom-3 -right-2 bg-[#fff3c4] border border-[#e8d5a0] px-3 py-1.5 rounded-full shadow-sm rotate-[-1.5deg]">
                <p className="text-xs font-semibold text-[#7a5c00]">1.5 years · still learning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNEY - vertical, human */}
      <section id="journey" className="py-16 sm:py-20 bg-white border-y border-black/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-[#6b8e23] text-xs tracking-[0.18em] uppercase font-semibold text-center">Our journey so far</p>
          <h2 className="font-[Poppins] text-[28px] sm:text-[32px] font-bold text-center text-[#1a3566] mt-2">Step by step, not overnight</h2>
          <p className="text-center text-[#6b7a90] text-sm mt-2">No 1965 story. Just 1.5 years of small, honest steps.</p>

          <div className="mt-10 relative">
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-[#e6e8ec]" />
            <div className="space-y-8">
              {[
                { n: "01", title: "Started with milk", when: "Jan 2024 · Karnal lanes", text: "Two cans, a bike, early mornings. Supplying fresh milk to neighbours in Budhanpur. The only marketing was: “If it’s not fresh, don’t pay.”" },
                { n: "02", title: "People trusted us", when: "Mid 2024", text: "A few houses became many. Feedback was direct — “a little more malai please”, “pack it better”. We listened and kept fixing things." },
                { n: "03", title: "Desi Ghee — across India", when: "Late 2024", text: "Customers asked for good ghee. We found a small maker, checked the process ourselves, and started shipping pan-India. The first reviews made us emotional." },
                { n: "04", title: "Cow Dung Ash & Cakes", when: "2025", text: "For havan & pooja. People wanted properly dried, clean products — not dusty packets. So we added 500g/1kg Ash and neat Cakes." },
                { n: "05", title: "Now: DhenuVera", when: "Coming very soon", text: "Cone Dhoop, Stick Dhoop and Sambrani Cups — 6 fragrances. Same thinking: traditional, small-batch, honestly made. Not yet for sale — you’ll be the first to know." },
              ].map((s) => (
                <div key={s.n} className="relative pl-10">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-white border border-[#dbe2ef] flex items-center justify-center">
                    <span className="text-[11px] font-bold text-[#1a3566]">{s.n}</span>
                  </div>
                  <p className="text-[11px] tracking-widest uppercase text-[#8a9ab5]">{s.when}</p>
                  <h3 className="font-semibold text-[#1a3566] mt-0.5">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-[#4a5a73] mt-1.5">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS - simple, not glossy grid */}
      <section className="py-16 sm:py-20 bg-[#FFFBF5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[#6b8e23] text-xs tracking-[0.18em] uppercase font-semibold">What we sell now</p>
              <h2 className="font-[Poppins] text-[30px] font-bold text-[#1a3566] mt-1.5">Products made because someone asked for them</h2>
              <p className="text-sm text-[#6b7a90] mt-2 max-w-xl">Not a big catalogue. Just what we can stand behind. Milk is still local — everything else ships across India.</p>
            </div>
            <Link href="/products" className="text-sm font-semibold text-[#1a3566] underline underline-offset-4 decoration-black/15">See all products →</Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            {[
              { title: "Milk", note: "Karnal local only", desc: "Fresh milk, morning delivery in and around Budhanpur/Karnal. We still do the route ourselves.", meta: "Daily · glass bottles & pouches" },
              { title: "Pure Desi Ghee", note: "Pan-India", desc: "Our most loved. Small-batch, aroma that fills the kitchen. Families order it from Gujarat to Assam now.", meta: "500ml / 1L" },
              { title: "Cow Dung Ash", note: "500g · 1kg", desc: "Fine, clean ash for traditional & household use. Sieved and packed dry — not dusty.", meta: "Traditional use" },
              { title: "Cow Dung Cakes", note: "For havan / pooja", desc: "Well-dried, even size, less smoke. Made the old way, packed neatly so they don’t break.", meta: "Bundles of 12 / 24" },
            ].map((c) => (
              <div key={c.title} className="bg-white border border-black/5 rounded-2xl p-5 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-[#1a3566]">{c.title}</h3>
                  <span className="text-[11px] bg-[#f1f5f9] border border-black/5 px-2 py-1 rounded-full text-[#4a5a73] whitespace-nowrap">{c.note}</span>
                </div>
                <p className="text-sm leading-relaxed text-[#4a5a73] mt-3">{c.desc}</p>
                <p className="text-xs text-black/40 mt-3">{c.meta}</p>
                <Link href="/products" className="text-xs font-semibold text-[#00AEEF] mt-4 inline-block">View →</Link>
              </div>
            ))}
          </div>

          {featured.length > 0 && (
            <div className="mt-10">
              <div className="h-px bg-black/5 my-8" />
              <p className="text-xs tracking-[0.15em] uppercase text-[#8a9ab5] font-semibold">Also in our store right now</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
                {featured.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* DHENUVERA - muted, not flashy */}
      <section className="py-16 sm:py-20 bg-[#fdf6ec] border-y border-[#e8dcc3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
            <div>
              <span className="inline-block bg-white border border-[#e8dcc3] text-[#8a6d2b] text-[11px] tracking-widest uppercase px-3 py-1 rounded-full">Coming soon · DhenuVera</span>
              <h2 className="font-[Poppins] text-[30px] sm:text-[36px] font-bold text-[#1a3566] mt-4 leading-tight">
                Tradition in<br />every fragrance.
              </h2>
              <p className="text-[#5a4d3a] mt-4 leading-relaxed">
                DhenuVera is our next small step — not a separate company, just our incense range under Anmool Dairy. Cone dhoop, stick dhoop and sambrani cups, in 6 fragrances we’re still finalising with a small family maker.
              </p>

              <div className="grid grid-cols-3 gap-3 mt-6 text-center">
                <div className="bg-white border border-[#e8dcc3] rounded-xl p-4">
                  <p className="font-semibold text-[#1a3566] text-sm">Cone</p>
                  <p className="text-xs text-[#7a6e5a] mt-1">quick, rich</p>
                </div>
                <div className="bg-white border border-[#e8dcc3] rounded-xl p-4">
                  <p className="font-semibold text-[#1a3566] text-sm">Stick</p>
                  <p className="text-xs text-[#7a6e5a] mt-1">everyday</p>
                </div>
                <div className="bg-white border border-[#e8dcc3] rounded-xl p-4">
                  <p className="font-semibold text-[#1a3566] text-sm">Sambrani</p>
                  <p className="text-xs text-[#7a6e5a] mt-1">cups</p>
                </div>
              </div>

              <p className="text-sm text-[#7a6e5a] mt-6">
                <span className="font-semibold text-[#1a3566]">6 fragrances</span> — we’re testing them at home first. If it doesn’t feel calm and clean, we don’t list it.
              </p>

              <Link href="/dhenuvera" className="inline-flex items-center gap-2 mt-6 bg-[#1a3566] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-black transition-colors">
                Peek at DhenuVera <ArrowRight size={14} />
              </Link>
            </div>

            <div className="bg-white border border-[#e8dcc3] rounded-2xl p-6 shadow-[0_8px_30px_rgba(122,92,0,0.08)]">
              <div className="border border-dashed border-[#d9c9a6] rounded-xl p-6 text-center">
                <p className="font-serif text-2xl text-[#1a3566]">DhenuVera</p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-[#8a7a5a] mt-1">Tradition · Fragrance · Purity</p>
                <div className="h-px bg-[#e8dcc3] my-4" />
                <p className="text-xs text-[#7a6e5a]">Cone Dhoop · Stick Dhoop · Sambrani Cups</p>
                <div className="inline-block mt-4 border border-[#1a3566] text-[#1a3566] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full rotate-[-1deg]">
                  Not for sale yet
                </div>
                <p className="text-xs text-[#9a8d76] mt-3">Want a message when it’s ready? WhatsApp us.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US - simple list, not 6 cards */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16">
            <div>
              <h2 className="font-[Poppins] text-[28px] font-bold text-[#1a3566] leading-tight">
                Why people stick with us — in their words, not ours.
              </h2>
              <p className="text-sm leading-relaxed text-[#5a6b83] mt-3">
                We’re not the cheapest, not the biggest. We just try to be consistent. Here’s what comes up when customers talk about us:
              </p>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-[#2d3a4f]">
              <p><span className="font-semibold">We started on the ground.</span> Still deliver milk ourselves in Karnal. No big warehouse story.</p>
              <p><span className="font-semibold">Customer first, really.</span> A lot of our products exist because someone WhatsApp’d: “Bhai, can you get good ghee?”</p>
              <p><span className="font-semibold">Small, trusted sources.</span> We visit, we taste, we ask questions. Price is not the first filter.</p>
              <p><span className="font-semibold">Traditional, not trendy.</span> Cow dung, ghee, dhoop — things our dadi used, not Instagram fads.</p>
              <p><span className="font-semibold">Slow growth.</span> We’d rather say “not ready yet” than sell something half-done. That’s why DhenuVera is still coming soon.</p>
            </div>
          </div>

          <div className="mt-10 bg-[#f8f9fb] border border-black/5 rounded-2xl p-6 grid sm:grid-cols-3 gap-6 text-sm">
            <div><p className="font-semibold text-[#1a3566]">Our promise</p><p className="text-[#5a6b83] mt-1">Genuine sourcing, careful processing, hygienic packing, and we write clearly what’s inside. No fine print.</p></div>
            <div><p className="font-semibold text-[#1a3566]">Vision</p><p className="text-[#5a6b83] mt-1">From Budhanpur, Karnal to homes across India — same honesty, just more pin codes.</p></div>
            <div><p className="font-semibold text-[#1a3566]">Anmool = parent, DhenuVera = incense</p><p className="text-[#5a6b83] mt-1">One family, two names. Helps us keep dairy and fragrance honest and separate.</p></div>
          </div>
        </div>
      </section>

      {/* FOUNDER NOTE - paper */}
      <section className="py-16 sm:py-20 bg-[#FFFBF5]">
        <div className="max-w-[720px] mx-auto px-6 lg:px-8">
          <div className="bg-white border border-black/5 rounded-2xl p-7 sm:p-8 shadow-[0_12px_40px_rgba(26,53,102,0.06)] relative">
            <div className="absolute -top-3 left-7 bg-[#fff3c4] border border-[#e8d5a0] px-3 py-1 rounded-full text-xs font-semibold text-[#7a5c00]">A note from us</div>
            <h3 className="font-[Poppins] font-bold text-[#1a3566] text-xl mt-2">Our journey has just begun</h3>
            <div className="mt-4 space-y-3.5 text-[15px] leading-relaxed text-[#3d4f63]">
              <p>We’re not a decades-old company and we won’t pretend to be. We’re about 1.5 years in. Young, sometimes figuring things out as we go.</p>
              <p>But one thing we’ve learned for sure: <span className="font-semibold text-[#1a3566]">trust isn’t bought, it’s earned — one delivery at a time.</span></p>
              <p>We started with milk. Then ghee, then Ash and Cakes because you asked. Now DhenuVera. Same test every time: would we keep this in our own kitchen/pooja room? If yes, we list it.</p>
              <p>Thank you for being part of it — for the feedback, the patience, and the repeats.</p>
            </div>
            <p className="font-serif italic text-[#1a3566] mt-6">— Team Anmool Dairy, Budhanpur, Karnal</p>
            <p className="text-xs text-[#8a9ab5] mt-1">P.S. If something isn’t right, tell us on WhatsApp. We actually read it.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - simple, no carousel chrome */}
      <section className="py-14 bg-white border-y border-black/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-center text-xs tracking-[0.18em] uppercase font-semibold text-[#8a9ab5]">A few messages we kept</p>
          <div className="relative mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="text-center max-w-2xl mx-auto"
              >
                <Quote size={20} className="mx-auto text-[#dbe2ef]" />
                <p className="font-serif italic text-[18px] leading-relaxed text-[#1a3566] mt-3">“{testimonials[testimonialIdx].text}”</p>
                <p className="text-sm font-semibold text-[#1a3566] mt-4">{testimonials[testimonialIdx].name} · <span className="font-normal text-[#6b7a90]">{testimonials[testimonialIdx].place} — {testimonials[testimonialIdx].product}</span></p>
                <div className="flex justify-center gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} className="text-[#e8b84a] fill-[#e8b84a]" />)}
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex items-center justify-center gap-3 mt-6">
              <button onClick={() => setTestimonialIdx((i) => (i - 1 + 3) % 3)} className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                <ChevronLeft size={14} />
              </button>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => <button key={i} onClick={() => setTestimonialIdx(i)} className={`h-1.5 rounded-full transition-all ${i === testimonialIdx ? "w-6 bg-[#1a3566]" : "w-1.5 bg-black/15"}`} />)}
              </div>
              <button onClick={() => setTestimonialIdx((i) => (i + 1) % 3)} className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                <ChevronRightIcon size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - simple */}
      <section className="py-16 sm:py-20 bg-[#FFFBF5]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="font-[Poppins] text-[24px] font-bold text-[#1a3566]">Questions we get on WhatsApp</h2>
          <p className="text-sm text-[#6b7a90] mt-1">If you don’t see yours, just message us — 90342-39674</p>
          <div className="mt-6 divide-y divide-black/5 border border-black/5 rounded-2xl bg-white overflow-hidden">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-[#f8f9fb] transition-colors">
                  <span className="text-sm font-medium text-[#1a3566]">{faq.q}</span>
                  <span className="w-7 h-7 rounded-full bg-[#f1f5f9] flex items-center justify-center shrink-0">
                    {openFaq === i ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-[#4a5a73]">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT STRIP - not gradient */}
      <section className="py-10 bg-[#1a3566]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-semibold">Have a question? Just ask.</p>
            <p className="text-white/60 text-sm mt-1">Village Budhanpur, Karnal – 132001 · 90342-39674 · 70784-20222 · anmooldairy@gmail.com</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/contact" className="bg-white text-[#1a3566] px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#f1f5f9]">Contact us</Link>
            <a href="https://wa.me/919034239674" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#1eb855]">WhatsApp</a>
          </div>
        </div>
      </section>

      <a
        href="https://wa.me/919034239674"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
      <Link href="/products" className="fixed bottom-6 left-6 z-50 bg-[#1a3566] text-white px-5 py-3 rounded-full text-sm font-semibold shadow-lg hover:bg-black transition-colors inline-flex items-center gap-2">
        <ShoppingCart size={16} /> Shop
      </Link>
    </div>
  );
}
