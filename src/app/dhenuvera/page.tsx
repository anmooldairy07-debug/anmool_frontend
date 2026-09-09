"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Banner from "@/components/Banner";

export default function DhenuVeraPage() {
  return (
    <div className="bg-[#FFFBF5] text-[#1d2a39]">
      <Banner
        title="DhenuVera"
        tag="Coming Soon"
        subtitle="Cone Dhoop · Stick Dhoop · Sambrani Cups — inspired by India’s own fragrance traditions. Not yet for sale, we’re still getting it right."
        image="/images/dairy-products-collage.jpeg"
      />

      <section className="py-14">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs tracking-[0.18em] uppercase font-semibold text-[#8a7a5a]">Anmool Dairy — parent brand</p>
          <h2 className="font-[Poppins] text-[28px] font-bold text-[#1a3566] mt-2 leading-tight">DhenuVera — Tradition. Fragrance. Purity.</h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4f63]">
            <p>
              DhenuVera is our upcoming incense range. We wanted to try something beyond dairy but keep the same habit: small, honest sourcing, traditional way, no rush to launch.
            </p>
            <p>
              Think of Anmool Dairy as the parent, DhenuVera as its fragrance child. Keeping the names separate helps us be clear — dairy stays dairy, fragrance stays fragrance — and we don’t mix promises.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white border-y border-black/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-5">
            <div id="cone" className="bg-[#FFFBF5] border border-black/5 rounded-2xl p-6">
              <h3 className="font-semibold text-[#1a3566]">Cone Dhoop</h3>
              <p className="text-sm text-[#5a6b83] mt-2 leading-relaxed">Small cones, rich and steady fragrance. Light one, it does the work — good for a quick calm in your room or pooja corner.</p>
              <span className="inline-block mt-4 text-xs font-semibold border border-black/10 px-2.5 py-1 rounded-full text-[#6b7a90]">Coming soon</span>
            </div>
            <div id="stick" className="bg-[#FFFBF5] border border-black/5 rounded-2xl p-6">
              <h3 className="font-semibold text-[#1a3566]">Stick Dhoop</h3>
              <p className="text-sm text-[#5a6b83] mt-2 leading-relaxed">The everyday one — light, let it smoulder slowly. For mornings and evenings when you want the house to smell like a temple, gently.</p>
              <span className="inline-block mt-4 text-xs font-semibold border border-black/10 px-2.5 py-1 rounded-full text-[#6b7a90]">Coming soon</span>
            </div>
            <div id="sambrani" className="bg-[#FFFBF5] border border-black/5 rounded-2xl p-6">
              <h3 className="font-semibold text-[#1a3566]">Sambrani Cups</h3>
              <p className="text-sm text-[#5a6b83] mt-2 leading-relaxed">Ready-to-use cups. Put it on a small stand, light the edge — clean burn, pleasant smoke that settles nicely.</p>
              <span className="inline-block mt-4 text-xs font-semibold border border-black/10 px-2.5 py-1 rounded-full text-[#6b7a90]">Coming soon</span>
            </div>
          </div>

          <div className="mt-6 bg-white border border-black/5 rounded-2xl p-5 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-[#fff3c4] border border-[#e8d5a0] flex items-center justify-center shrink-0 text-xs font-bold text-[#7a5c00]">6</div>
            <div>
              <p className="font-semibold text-[#1a3566] text-sm">Six fragrances — not 60</p>
              <p className="text-sm text-[#5a6b83] mt-1 leading-relaxed">We picked 6 we actually like at home — some woody, some floral, some a bit smoky. Different moods, same calm. We’re still burning through samples to make sure they don’t irritate or fade too fast.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white border border-black/5 rounded-2xl p-6">
            <h3 className="font-semibold text-[#1a3566]">Want to know when it’s ready?</h3>
            <p className="text-sm text-[#5a6b83] mt-2 leading-relaxed">
              We don’t have a launch date to shout yet. If you leave us a WhatsApp, we’ll message you first — one message, no spam. Or just check back here.
            </p>
            <div className="flex flex-wrap gap-3 mt-5">
              <a href="https://wa.me/919034239674" target="_blank" rel="noopener noreferrer" className="bg-[#1a3566] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-black">WhatsApp 90342-39674</a>
              <Link href="/contact" className="bg-white border border-black/10 px-6 py-3 rounded-full text-sm font-semibold hover:bg-black hover:text-white">Contact us</Link>
            </div>
            <p className="text-xs text-[#8a9ab5] mt-3">Also: 70784-20222 · anmooldairy@gmail.com · Village Budhanpur, Karnal – 132001</p>
          </div>
          <div className="text-center mt-8">
            <Link href="/products" className="text-sm font-semibold text-[#1a3566] underline underline-offset-4">See what we sell today →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
