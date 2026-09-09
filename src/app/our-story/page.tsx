"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function OurStoryPage() {
  return (
    <div className="bg-[#FFFBF5] text-[#1d2a39]">
      <section className="relative bg-[#0f1f3a] py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/ourstory.png" alt="" fill className="object-cover opacity-50" />
          <div className="absolute inset-0 bg-[#0f1f3a]/70" />
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <p className="text-white/60 text-[11px] tracking-[0.2em] uppercase">Village Budhanpur, Karnal — Jan 2024</p>
          <h1 className="font-[Poppins] font-bold text-white text-3xl sm:text-4xl mt-3">Our Story</h1>
          <p className="text-white/70 mt-3 text-[15px] leading-relaxed">Not decades. Just a little over a year — and a lot of early mornings.</p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-[Poppins] text-[26px] font-bold text-[#1a3566] leading-tight">
            We started because we couldn’t find what we wanted to buy.
          </h2>
          <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-[#3d4f63]">
            <p>
              About 1.5 years ago, we were just buying milk like everyone else in Karnal — and wondering: is it fresh? Is it mixed? We thought, let’s try to fix it for our own lane first.
            </p>
            <p>
              So we started carrying milk in Budhanpur and nearby areas. No shop, no big name — just two cans and people who told their neighbours. We still supply milk locally, same route, before 7am.
            </p>
            <p>
              Then the same families said, “If your milk is good, can you get us real ghee?” We didn’t have a factory, so we looked for a small maker we could actually visit. We did. We tasted, we asked questions, we packed it carefully and sent it across India. The first time someone from outside Haryana called to say “it smells like my nani’s ghee” — we knew we were on the right track.
            </p>
            <p>
              After that came Cow Dung Ash (500g / 1kg) and Cow Dung Cakes — not because it’s trendy, but because people asked for clean, properly dried ones for havan/pooja and couldn’t find them easily.
            </p>
          </div>

          <div className="mt-8 border-l-2 border-[#00AEEF]/30 pl-5">
            <p className="font-serif italic text-[17px] text-[#1a3566] leading-relaxed">
              “If we wouldn’t keep it in our own kitchen, we won’t put it on our website.”
            </p>
          </div>

          <div className="mt-8 bg-white border border-black/5 rounded-2xl p-1 rotate-[0.3deg] shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="relative aspect-[4/2.8] overflow-hidden rounded-xl bg-[#f3e9d8]">
              <Image src="/images/cheese-board.jpeg" alt="First products at home" fill className="object-cover" />
            </div>
            <p className="text-center text-xs text-[#8a7a5a] italic mt-3 px-4">Early days — our kitchen table, not a warehouse. Budhanpur, 2024.</p>
          </div>
        </div>
      </section>

      <section id="journey" className="py-14 bg-white border-y border-black/5">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-[Poppins] text-[22px] font-bold text-[#1a3566]">How it unfolded</h2>
          <p className="text-sm text-[#6b7a90] mt-1">Five small steps. No overnight success.</p>

          <div className="mt-8 space-y-7">
            {[
              { n: "01 — Milk", t: "Jan 2024, Karnal lanes", d: "Carrying cans, learning which house wants extra malai, which one wants it early. No ads, just trust." },
              { n: "02 — Trust", t: "Mid 2024", d: "Feedback became our to-do list. Better bottles, better timing, clearer price. One fix at a time." },
              { n: "03 — Desi Ghee", t: "Late 2024", d: "Started sending pure ghee pan-India through a small trusted source. We still check every batch ourselves." },
              { n: "04 — Ash & Cakes", t: "2025", d: "Cow Dung Ash (500g/1kg) and Cakes for havan/pooja — dried fully, packed so they don’t crumble." },
              { n: "05 — DhenuVera", t: "Now", d: "Cone Dhoop, Stick Dhoop, Sambrani Cups in 6 fragrances. Coming soon — we’re still testing at home." },
            ].map((s) => (
              <div key={s.n} className="pl-4 border-l border-black/10">
                <p className="text-xs tracking-widest uppercase text-[#8a9ab5]">{s.t}</p>
                <h3 className="font-semibold text-[#1a3566] text-sm mt-1">{s.n}</h3>
                <p className="text-sm leading-relaxed text-[#4a5a73] mt-1">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-[Poppins] text-[22px] font-bold text-[#1a3566]">What we’re trying to do</h2>
          <p className="text-[15px] leading-relaxed text-[#3d4f63] mt-3">
            Make genuine products a little easier to find — without big claims. We focus on five simple things: pick carefully, tell the truth on the label, pack it cleanly, deliver honestly, and keep improving when you tell us what’s wrong.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm text-[#3d4f63]">
            <div className="bg-[#f8f9fb] border border-black/5 rounded-xl p-4">Quality over quantity — small sources, not cheapest market.</div>
            <div className="bg-[#f8f9fb] border border-black/5 rounded-xl p-4">Transparency — clear ingredients, no fine print.</div>
            <div className="bg-[#f8f9fb] border border-black/5 rounded-xl p-4">Customer trust — you’re the reason we grew from 1 lane to more.</div>
            <div className="bg-[#f8f9fb] border border-black/5 rounded-xl p-4">Keep learning — every WhatsApp complaint goes into our next fix.</div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white border-t border-black/5">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-[Poppins] text-[22px] font-bold text-[#1a3566]">Why people come back</h2>
          <div className="mt-4 space-y-2.5 text-sm leading-relaxed text-[#3d4f63]">
            <p>— We started on the ground, still deliver milk ourselves.</p>
            <p>— We add products only when someone asks for them.</p>
            <p>— Traditional things, made the old way, not trendy copies.</p>
            <p>— We say “not ready yet” instead of selling half-done products.</p>
            <p>— Customers are neighbours first, buyers second.</p>
          </div>

          <div className="mt-8 bg-[#FFFBF5] border border-black/5 rounded-2xl p-6">
            <p className="font-semibold text-[#1a3566]">From Karnal to every Indian home</p>
            <p className="text-sm leading-relaxed text-[#5a6b83] mt-1">That’s the vision — same honesty, more pin codes. Local roots, growing reach.</p>
          </div>

          <div className="mt-8 bg-white border border-black/5 rounded-2xl p-6 shadow-sm">
            <p className="text-xs tracking-widest uppercase text-[#8a9ab5] font-semibold">A quick note</p>
            <p className="text-sm leading-relaxed text-[#3d4f63] mt-2">
              We’re still young — 1.5 years. We don’t have decades of story, but we have one real one: trust has to be earned. We started with milk, then ghee, then Ash & Cakes, now DhenuVera. Same test: would we use it at home? If yes, we list it. Thank you for letting us learn.
            </p>
            <p className="font-serif italic text-[#1a3566] mt-3">— Team Anmool Dairy</p>
          </div>

          <div className="flex gap-3 mt-8">
            <Link href="/products" className="bg-[#1a3566] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-black">See products</Link>
            <Link href="/dhenuvera" className="bg-white border border-black/10 px-6 py-3 rounded-full text-sm font-semibold hover:bg-black hover:text-white">DhenuVera — coming soon</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
