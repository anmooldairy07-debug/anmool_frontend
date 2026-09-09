"use client";

import Link from "next/link";
import Image from "next/image";
import Banner from "@/components/Banner";
import { ArrowRight } from "lucide-react";

export default function OurFarmPage() {
  return (
    <div className="bg-[#FFFBF5] text-[#1d2a39]">
      <Banner title="Our Roots in Karnal" tag="Village Budhanpur, Karnal, Haryana" subtitle="No big farm claim — just a small start, 1.5 years ago, carrying milk in our own lanes." image="/images/ourfarm.png" />

      <section className="py-14">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-[Poppins] text-[26px] font-bold text-[#1a3566]">Where we actually started</h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4f63]">
            <p>
              In early 2024, in Village Budhanpur, Karnal — we started with milk. Not a 200-acre farm, not 300 cows. Just a simple plan: give fresh milk to our neighbours and see if they come back.
            </p>
            <p>They did. And they told others. That’s how it grew.</p>
            <p>
              We still supply milk locally — same mornings, same route. For everything else (ghee, Ash, Cakes, soon DhenuVera) we work with small trusted makers we’ve met and checked ourselves. We don’t pretend it’s all from our own farm. We tell you where it’s from, how it’s packed, and what’s inside.
            </p>
          </div>

          <div className="mt-6 bg-white border border-black/5 rounded-2xl p-5">
            <p className="text-sm font-semibold text-[#1a3566]">If we wouldn’t want it for our own family, we won’t offer it to yours.</p>
            <p className="text-sm text-[#6b7a90] mt-1">That’s the only “certification” we claim every time.</p>
          </div>

          <div className="mt-8 bg-white p-2 rounded-xl border border-black/5 shadow-sm rotate-[0.4deg]">
            <div className="relative aspect-[4/2.9] overflow-hidden rounded-lg bg-[#f3e9d8]">
              <Image src="/images/farm.jpg" alt="Karnal" fill className="object-cover" />
            </div>
            <p className="text-center text-xs italic text-[#8a7a5a] mt-2">Our lane in Karnal — where the first deliveries happened.</p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white border border-black/5 rounded-xl p-4">
              <p className="font-semibold text-[#1a3566]">Milk</p>
              <p className="text-[#6b7a90] mt-1">Local, fresh, morning delivery in Karnal.</p>
            </div>
            <div className="bg-white border border-black/5 rounded-xl p-4">
              <p className="font-semibold text-[#1a3566]">Ghee, Ash, Cakes</p>
              <p className="text-[#6b7a90] mt-1">Carefully sourced, hygienically packed, shipped across India.</p>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <Link href="/our-story" className="inline-flex items-center gap-2 bg-[#1a3566] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-black">Our story <ArrowRight size={14} /></Link>
            <Link href="/dhenuvera" className="inline-flex items-center gap-2 bg-white border border-black/10 px-6 py-3 rounded-full text-sm font-semibold">DhenuVera — soon</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
