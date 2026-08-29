"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ShoppingCart, Heart, Star, Plus } from "lucide-react";

const badgeColor = (b?: string | null) => {
  switch (b) {
    case "bestseller": return "bg-gradient-to-r from-orange to-orange-dark";
    case "new": return "bg-gradient-to-r from-sky to-sky-dark";
    case "organic": return "bg-gradient-to-r from-green to-green-dark";
    case "premium": return "bg-gradient-to-r from-navy to-navy-dark";
    default: return "";
  }
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { router.push("/login"); return; }
    addItem(product);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={`/products/${product._id}`} className="block rounded-2xl border border-gray-100 overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500">
        {/* Image */}
        <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Badge */}
          {product.badge && (
            <span className={`absolute top-3 left-3 text-[10px] font-bold px-3 py-1.5 rounded-lg capitalize text-white tracking-wider ${badgeColor(product.badge)}`}>
              {product.badge}
            </span>
          )}
          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-red-50 hover:text-red-500 text-gray-400 shadow-sm"
          >
            <Heart size={15} />
          </button>
          {/* Quick Add */}
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAdd}
              className="w-full flex items-center justify-center gap-2 bg-navy text-white py-2.5 rounded-xl font-bold text-sm hover:bg-navy-dark transition-colors shadow-lg shadow-navy/20"
            >
              <Plus size={15} /> Add to Cart
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] text-sky font-bold uppercase tracking-widest">{product.category}</p>
            <div className="flex items-center gap-1">
              <Star size={11} className="text-amber-400 fill-amber-400" />
              <span className="text-[11px] text-gray-500 font-medium">{product.rating}</span>
            </div>
          </div>
          <h3 className="font-[Poppins] font-semibold text-navy text-sm group-hover:text-sky transition-colors line-clamp-1">{product.name}</h3>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">{product.description}</p>

          {/* Price & Action */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
            <div>
              <span className="text-lg font-[Poppins] font-bold text-navy">₹{product.price}</span>
              <span className="text-[10px] text-gray-400 ml-1">/ {product.weight}</span>
            </div>
            <button
              onClick={handleAdd}
              className="w-9 h-9 rounded-xl bg-sky/10 flex items-center justify-center text-sky hover:bg-sky hover:text-white transition-all"
            >
              <ShoppingCart size={14} />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
