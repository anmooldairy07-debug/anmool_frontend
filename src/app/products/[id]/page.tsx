"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/motion/Animations";
import {
  ShoppingCart, ArrowLeft, Star, Shield, Truck, Leaf, Check,
  Plus, Minus, Heart, Share2, Package, Clock, Award,
} from "lucide-react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    api.getProduct(id)
      .then((d) => setProduct(d.product))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!user) { router.push("/login"); return; }
    if (product) {
      addItem(product, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-20">
          <div className="animate-pulse grid lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-gray-200 rounded-3xl" />
            <div className="space-y-4">
              <div className="h-3 bg-gray-200 rounded w-1/4" />
              <div className="h-8 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package size={48} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 font-medium text-lg">Product not found</p>
          <Link href="/products" className="inline-flex items-center gap-2 text-sky font-semibold mt-4 hover:text-sky-dark transition-colors">
            <ArrowLeft size={16} /> Back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <FadeUp>
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-navy transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-navy transition-colors">Products</Link>
            <span>/</span>
            <span className="text-navy font-medium">{product.name}</span>
          </div>
        </FadeUp>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <FadeUp>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm group">
              <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              {product.badge && (
                <span className="absolute top-5 left-5 text-xs font-bold px-4 py-2 rounded-xl bg-navy text-white uppercase tracking-wider shadow-lg">
                  {product.badge}
                </span>
              )}
              <div className="absolute top-5 right-5 flex gap-2">
                <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm">
                  <Heart size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-sky hover:bg-white transition-all shadow-sm">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </FadeUp>

          {/* Details */}
          <FadeUp delay={0.1}>
            <div className="lg:py-4">
              {/* Category & Rating */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold text-sky uppercase tracking-widest bg-sky/10 px-3 py-1 rounded-lg">{product.category}</span>
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className={i < Math.round(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200"} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 font-medium">{product.rating}</span>
                  <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-[Poppins] font-bold text-navy mb-2">{product.name}</h1>

              <p className="text-gray-500 text-base leading-relaxed mb-6">{product.longDescription || product.description}</p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-[Poppins] font-bold text-navy">₹{product.price}</span>
                <span className="text-sm text-gray-400">/ {product.weight}</span>
              </div>

              {/* Features */}
              {product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-3">Key Features</h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {product.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg border border-gray-100">
                        <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                          <Check size={10} className="text-green" />
                        </div>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm transition-all"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center text-base font-bold text-navy">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm transition-all"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleAddToCart}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg ${
                      added
                        ? "bg-green text-white shadow-green/20"
                        : "bg-navy text-white hover:bg-navy-dark shadow-navy/20"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check size={18} />
                        Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} />
                        Add to Cart — ₹{(product.price * quantity).toLocaleString()}
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { icon: Truck, label: "Same Day Delivery", color: "bg-sky-50 text-sky" },
                  { icon: Shield, label: "Lab Tested", color: "bg-green-50 text-green" },
                  { icon: Leaf, label: "100% Natural", color: "bg-amber-50 text-amber-600" },
                ].map((b) => (
                  <div key={b.label} className={`text-center p-3 rounded-xl ${b.color}`}>
                    <b.icon size={20} className="mx-auto mb-1.5" />
                    <span className="text-[11px] font-semibold">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
