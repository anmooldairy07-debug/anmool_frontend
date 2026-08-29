"use client";

import Link from "next/link";
import Image from "next/image";
import Banner from "@/components/Banner";
import { ArrowRight, Trees, Droplets, Sun, Beef } from "lucide-react";

export default function OurFarmPage() {
  return (
    <div className="page-enter">
      <Banner title="Our Farm" tag="Anand, Gujarat" subtitle="200 acres of lush pasture where happy cows graze freely." image="/images/ourfarm.png" />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">Where nature does the work</h2>
              <p className="text-body/60 text-lg leading-relaxed">
                Our 200-acre farm in Anand, Gujarat is where the magic happens. Here, 300+ cows roam freely across lush green pastures, drinking natural spring water and feeding on organic grass and fodder.
              </p>
              <p className="text-body/50 text-lg leading-relaxed">
                We follow a strict no-compromise approach: no growth hormones, no antibiotics, no artificial feed. Every cow is monitored by our dedicated veterinary team, ensuring they are healthy, happy, and stress-free.
              </p>
              <p className="text-body/50 text-lg leading-relaxed">
                From milking to processing to delivery — every step is handled with care to bring you the purest dairy products possible.
              </p>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-sky-50 shadow-lg">
              <Image src="/images/farm.jpg" alt="Anmool Fresh Butter" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-bold text-2xl drop-shadow-lg">Fresh from the Farm</p>
                <p className=" text-lg mt-1 drop-shadow">Pure butter churned daily</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Farm Highlights</h2>
            <div className="icon-divider"><span className="text-primary text-lg">🐄</span></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Beef, title: "300+ Cows", desc: "Indigenous breeds, free-grazing" },
              { icon: Trees, title: "200 Acres", desc: "Lush green pastures" },
              { icon: Droplets, title: "Spring Water", desc: "Natural water sources" },
              { icon: Sun, title: "Open Air", desc: "Free-range environment" },
            ].map((h) => (
              <div key={h.title} className="text-center p-6 rounded-xl bg-white border border-primary-50 hover:shadow-md transition-shadow">
                <h.icon size={32} className="text-sky mx-auto mb-3" />
                <h3 className="font-bold text-primary">{h.title}</h3>
                <p className="text-sm text-body/50 mt-1">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Come Visit Us</h2>
          <p className="text-body/50 mb-8">We welcome visitors to see our farm, meet our cows, and taste the difference firsthand.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-sky text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-sky-light transition-colors">
            Schedule a Visit <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
