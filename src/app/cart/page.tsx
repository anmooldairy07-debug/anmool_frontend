"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/components/motion/Animations";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, ShoppingBag, Truck, Shield, Tag } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const { user } = useAuth();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-12 bg-gray-50">
        <FadeUp>
          <div className="text-center px-5">
            <div className="w-28 h-28 rounded-full bg-gray-100 mx-auto flex items-center justify-center mb-6">
              <ShoppingCart size={48} className="text-gray-300" />
            </div>
            <h1 className="text-3xl font-[Poppins] font-bold text-navy mb-2">Your cart is empty</h1>
            <p className="text-gray-400 mb-8 max-w-sm mx-auto">Looks like you haven&apos;t added any fresh dairy products yet.</p>
            <Link href="/products" className="inline-flex items-center gap-2 bg-navy text-white px-8 py-4 rounded-xl font-semibold hover:bg-navy-dark transition-all shadow-lg shadow-navy/20 group">
              <ShoppingBag size={18} />
              Browse Products
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeUp>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-navy via-navy-dark to-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-60 h-60 bg-sky rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">
          <div className="flex items-center gap-3 text-white/50 text-sm mb-2">
            <ShoppingCart size={14} />
            <span>Shopping Cart</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-[Poppins] font-bold text-white">Your Cart</h1>
          <p className="text-white/60 mt-2">{totalItems} item{totalItems !== 1 ? "s" : ""} ready for checkout</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <FadeUp>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-[Poppins] font-bold text-navy">Cart Items</h2>
                <button onClick={clearCart} className="text-sm text-red-500 font-medium hover:text-red-600 transition-colors">
                  Clear All
                </button>
              </div>
            </FadeUp>

            <div className="space-y-4">
              <AnimatePresence>
                {items.map((item, i) => (
                  <motion.div
                    key={item.product._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100, height: 0, marginBottom: 0, padding: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex gap-5 items-center">
                      {/* Image */}
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-bold text-navy text-base">{item.product.name}</h3>
                            <p className="text-sm text-gray-400 mt-0.5">{item.product.weight} · {item.product.category}</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.product._id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors shrink-0"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity */}
                          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                            <button
                              onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                              className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm transition-all"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-10 text-center text-sm font-bold text-navy">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                              className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm transition-all"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          {/* Price */}
                          <p className="text-lg font-bold text-navy">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <FadeUp delay={0.1}>
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h3 className="text-lg font-[Poppins] font-bold text-navy mb-6">Order Summary</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal ({totalItems} items)</span>
                      <span className="font-semibold text-navy">₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Delivery</span>
                      <span className="font-semibold text-green">Free</span>
                    </div>
                    <div className="h-px bg-gray-100" />
                    <div className="flex justify-between">
                      <span className="font-bold text-navy">Total</span>
                      <span className="text-2xl font-bold text-navy">₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3 mb-6 p-4 bg-sky-50 rounded-xl">
                    {[
                      { icon: Truck, text: "Free delivery on all orders" },
                      { icon: Shield, text: "100% fresh & quality guarantee" },
                      { icon: Tag, text: "Use coins for extra savings" },
                    ].map((b) => (
                      <div key={b.text} className="flex items-center gap-2.5 text-sm">
                        <b.icon size={14} className="text-sky shrink-0" />
                        <span className="text-gray-600">{b.text}</span>
                      </div>
                    ))}
                  </div>

                  {!user ? (
                    <div className="text-center">
                      <p className="text-gray-400 text-sm mb-3">Sign in to proceed with checkout</p>
                      <Link href="/login" className="flex items-center justify-center gap-2 bg-navy text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-navy-dark transition-all shadow-lg shadow-navy/20 group w-full">
                        Sign In
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  ) : (
                    <Link href="/checkout" className="flex items-center justify-center gap-2 bg-navy text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-navy-dark transition-all shadow-lg shadow-navy/20 group w-full">
                      Proceed to Checkout
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </div>
  );
}
