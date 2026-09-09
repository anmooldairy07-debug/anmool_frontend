"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import Banner from "@/components/Banner";
import { FadeUp, StaggerChildren, StaggerItem } from "@/components/motion/Animations";
import { Search, Package } from "lucide-react";

const categories = ["All", "Milk", "Ghee", "Cow Dung Ash", "Cow Dung Cakes", "DhenuVera"];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (category !== "All") params.category = category;
    if (search) params.search = search;
    api.getProducts(params)
      .then((d) => setProducts(d.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [category, search]);

  const sorted = [...products].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  // Show static info if no products from backend for that honest category
  const showStaticHint = !loading && sorted.length === 0;

  return (
    <div className="page-enter">
      <Banner title="Our Products" tag="Products Made With Purpose" subtitle="Milk (Karnal local) • Pure Desi Ghee (Pan-India) • Cow Dung Ash & Cakes • DhenuVera — Coming Soon" image="/images/product.png" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Static category cards for context */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { title: "Milk", desc: "Local Karnal supply — freshness & trust. Continue serving local customers." },
            { title: "Pure Desi Ghee", desc: "Trusted sourcing — supplied across India. Authentic taste." },
            { title: "Cow Dung Ash", desc: "500g | 1kg — traditional, religious & household uses." },
            { title: "Cow Dung Cakes", desc: "For Havan & Pooja — convenient packs." },
          ].map((c) => (
            <div key={c.title} className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <p className="font-semibold text-navy text-sm">{c.title}</p>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100 mb-10">
          <p className="text-sm text-orange-800"><span className="font-bold">Coming Soon:</span> DhenuVera — Cone Dhoop, Stick Dhoop & Sambrani Cups in 6 fragrances. <a href="/dhenuvera" className="underline font-semibold">Explore DhenuVera →</a></p>
        </div>

        {/* Search & Sort */}
        <FadeUp>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 transition-all text-sm"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-navy text-sm focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 transition-all cursor-pointer"
            >
              <option value="default">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </FadeUp>

        {/* Categories */}
        <FadeUp delay={0.05}>
          <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  category === c
                    ? "bg-navy text-white shadow-md shadow-navy/20"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-sky hover:text-sky"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Results Count */}
        {!loading && (
          <FadeUp delay={0.1}>
            <p className="text-sm text-gray-500 mb-6">
              Showing <span className="font-semibold text-navy">{sorted.length}</span> product{sorted.length !== 1 ? "s" : ""}
              {category !== "All" && <> in <span className="font-semibold text-sky">{category}</span></>}
            </p>
          </FadeUp>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 bg-white overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-2 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                  <div className="h-2 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <Package size={48} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">No products found in this category yet</p>
            <p className="text-gray-400 text-sm mt-1">
              {category === "Milk" ? "Milk is currently supplied locally in Karnal. Contact us to order: 90342-39674." :
               category === "DhenuVera" ? "DhenuVera is coming soon — 6 fragrances in Cone, Stick & Sambrani Cups." :
               "Try All or contact us at anmooldairy@gmail.com"}
            </p>
            {category !== "All" && (
              <button onClick={() => setCategory("All")} className="mt-4 px-6 py-2.5 rounded-xl bg-sky text-white text-sm font-semibold hover:bg-sky-dark">View All Products</button>
            )}
          </div>
        ) : (
          <StaggerChildren stagger={0.04} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sorted.map((p) => (
              <StaggerItem key={p._id}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        )}
      </div>
    </div>
  );
}
