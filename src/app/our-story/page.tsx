"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Milk, Heart, Leaf, Shield, Award, Truck } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function OurStoryPage() {
  return (
    <div>
      <section className="relative bg-navy py-20 sm:py-32 lg:py-44 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/ourstory.png" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white/10 backdrop-blur-xl rounded-3xl px-6 py-8 sm:px-12 sm:py-10 border border-white/20 shadow-2xl">
            <div className="inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 mb-4 border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-white text-[11px] font-semibold tracking-widest uppercase">Since 1965</motion.span>
            </div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-[Poppins] text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">Our Story</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/80 mt-5 text-lg max-w-xl mx-auto leading-relaxed">Five decades of pure dairy tradition, rooted in trust and nature.</motion.p>
            <div className="w-16 h-1 bg-sky rounded-full mx-auto mt-6" />
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-green font-semibold text-sm tracking-widest uppercase">How It All Began</span>
              <h2 className="font-[Poppins] text-3xl sm:text-4xl font-extrabold text-navy mt-3 tracking-tight leading-tight">
                A legacy of <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky to-sky-light">pure dairy</span>
              </h2>
              <p className="text-gray-500 mt-6 text-lg leading-relaxed">
                In 1965, in the heart of Anand, Gujarat — India&apos;s milk capital — a small family started milking a few cows and delivering milk to their neighbours. What began as a simple act of sharing pure, fresh milk grew into a legacy of trust that spans over five decades.
              </p>
              <p className="text-gray-500 mt-4 text-lg leading-relaxed">
                The Anmool family believed that great dairy starts with happy cows. Our cows graze freely on 200 acres of lush pasture, drink natural spring water, and are cared for by a dedicated veterinary team. This philosophy has remained unchanged since day one.
              </p>
              <p className="text-gray-500 mt-4 text-lg leading-relaxed">
                Today, Anmool Dairy serves thousands of families across Gujarat and beyond, delivering farm-fresh milk, paneer, ghee, curd, and more — the way nature intended. No shortcuts, no compromises, no artificial anything.
              </p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }} className="relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-navy/10">
                <Image src="/images/cheese-board.jpeg" alt="Anmool Cheese & Paneer Board" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
              </div>
              <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl shadow-navy/5 border border-gray-100">
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Storytelling */}
      <section className="py-20 sm:py-28 bg-gray-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20">
            <span className="text-green font-semibold text-sm tracking-widest uppercase">Our Journey</span>
            <h2 className="font-[Poppins] text-3xl sm:text-4xl font-extrabold text-navy mt-3 tracking-tight">Growing with trust, one drop at a time</h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky/20 via-sky to-sky/20 hidden md:block" />

            {[
              {
                year: "1965",
                title: "The Beginning",
                desc: "A small family in Anand, Gujarat started milking a few cows and delivering fresh milk to their neighbours. Pure, honest dairy — the way nature intended.",
                image: "/images/farm.jpg",
                side: "left",
              },
              {
                year: "1980",
                title: "Expanding Our Herd",
                desc: "With growing trust from the community, we expanded to 50 cows and introduced traditional curd and butter production using earthen pots.",
                image: "/images/dairy-products-collage.jpeg",
                side: "right",
              },
              {
                year: "1995",
                title: "Going Organic",
                desc: "We made a bold decision — zero hormones, zero antibiotics, zero artificial feed. 100% organic, the way dairy was meant to be.",
                image: "/images/cheese-board.jpeg",
                side: "left",
              },
              {
                year: "2010",
                title: "Farm to Doorstep",
                desc: "We launched our direct delivery model — temperature-controlled vehicles bringing farm-fresh products to your doorstep within hours of milking.",
                image: "/images/milk-pour.jpeg",
                side: "right",
              },
              {
                year: "2020",
                title: "Anmool Goes Digital",
                desc: "We brought our farm-fresh dairy to your fingertips. Online ordering, subscription plans, and same-day delivery across Gujarat.",
                image: "/images/butter-splash.jpeg",
                side: "left",
              },
              {
                year: "Today",
                title: "10,000+ Families Strong",
                desc: "300+ happy cows, 200 acres of lush pasture, and thousands of families who trust Anmool daily. The journey continues — pure, honest, and full of love.",
                image: "/images/dairy-products-collage.jpeg",
                side: "right",
              },
            ].map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`relative flex items-center gap-5 md:gap-16 mb-12 md:mb-20 last:mb-0 ${item.side === "right" ? "md:flex-row-reverse" : ""}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-sky border-4 border-white shadow-lg z-10 hidden md:block" />

                {/* Image */}
                <div className={`w-full md:w-1/2 ${item.side === "right" ? "md:text-right" : ""}`}>
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl group">
                    <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-navy/10 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="inline-block bg-sky text-white text-sm font-bold px-4 py-1.5 rounded-full mb-3">{item.year}</span>
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2">
                  <div className={`${item.side === "right" ? "md:text-right" : ""}`}>
                    <span className="text-sky font-bold text-sm tracking-widest uppercase">{item.year}</span>
                    <h3 className="font-[Poppins] text-2xl sm:text-3xl font-extrabold text-navy mt-2 tracking-tight">{item.title}</h3>
                    <p className="text-gray-500 mt-4 text-base leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-green font-semibold text-sm tracking-widest uppercase">Our Values</span>
            <h2 className="font-[Poppins] text-3xl sm:text-4xl font-extrabold text-navy mt-3 tracking-tight">What we stand for</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Milk, title: "300+ Happy Cows", desc: "Our cows are family. They graze freely and are cared for with love." },
              { icon: Leaf, title: "200 Acres Farm", desc: "Lush pastures in Anand, Gujarat — the heart of India's dairy country." },
              { icon: Shield, title: "Lab Tested", desc: "Every batch is quality certified for your safety and trust." },
              { icon: Truck, title: "Farm to Doorstep", desc: "No middlemen. Direct from our farm to your family." },
            ].map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg hover:border-sky/20 transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                    <item.icon size={22} className="text-sky" />
                  </div>
                  <div>
                    <h3 className="font-[Poppins] font-bold text-navy">{item.title}</h3>
                    <p className="text-sm text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-navy to-navy-dark">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[Poppins] text-3xl font-extrabold text-white mb-4">Visit Our Farm</h2>
          <p className="text-white/50 mb-8">See our cows, pastures, and production facility firsthand.</p>
          <Link href="/our-farm" className="inline-flex items-center gap-2 bg-sky text-white px-7 py-3.5 rounded-2xl font-semibold hover:bg-sky-dark transition-all shadow-xl shadow-sky/30">
            Explore the Farm <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
