"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/motion/Animations";
import { Coins, Banknote, MapPin, Phone, User, CreditCard, CheckCircle2, ArrowRight, Shield, Truck, Calendar, Clock, Sun, Moon } from "lucide-react";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"coins" | "cod">("cod");
  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState<"morning" | "evening">("morning");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!user) { router.push("/login"); return null; }
  if (user.role === "admin") { router.push("/"); return null; }
  if (items.length === 0 && !success) { router.push("/cart"); return null; }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!address || !phone) { setError("Address and phone are required"); return; }
    if (!deliveryDate) { setError("Please select a delivery date"); return; }
    if (paymentMethod === "coins" && user.coins < totalPrice) {
      setError("Insufficient coins. Please add more coins or use COD.");
      return;
    }
    setLoading(true);
    try {
      const orderItems = items.map((i) => ({ product: i.product._id, quantity: i.quantity }));
      await api.createOrder({ items: orderItems, total: totalPrice, paymentMethod, shippingAddress: address, phone, deliveryDate, deliveryTime });
      clearCart();
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Order failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-10 sm:p-14 text-center max-w-md w-full shadow-xl">
          <div className="w-20 h-20 rounded-full bg-green-50 mx-auto flex items-center justify-center mb-6">
            <CheckCircle2 size={40} className="text-green" />
          </div>
          <h1 className="text-2xl font-[Poppins] font-bold text-navy mb-2">Order Placed!</h1>
          <p className="text-gray-500 mb-8">Your order has been placed successfully. We will deliver it soon.</p>
          <button onClick={() => router.push("/profile?tab=orders")} className="w-full flex items-center justify-center gap-2 bg-navy text-white py-3.5 rounded-xl font-semibold hover:bg-navy-dark transition-all shadow-lg shadow-navy/20 group">
            View My Orders <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-navy via-navy-dark to-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"><div className="absolute top-10 right-20 w-60 h-60 bg-sky rounded-full blur-3xl" /></div>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-2"><CreditCard size={14} /><span>Secure Checkout</span></div>
          <h1 className="text-3xl sm:text-4xl font-[Poppins] font-bold text-white">Checkout</h1>
          <p className="text-white/60 mt-2">Review your items and complete your order</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-10">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {error && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">{error}</motion.div>}

              <FadeUp>
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center"><MapPin size={18} className="text-sky" /></div>
                    <div><h2 className="text-lg font-[Poppins] font-bold text-navy">Delivery Details</h2><p className="text-xs text-gray-400">Where should we deliver?</p></div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-navy block mb-2">Full Name</label>
                      <div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input value={user.name} disabled className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-navy block mb-2">Delivery Address *</label>
                      <div className="relative"><MapPin size={16} className="absolute left-4 top-4 text-gray-400" />
                        <textarea required value={address} onChange={(e) => setAddress(e.target.value)} rows={3} placeholder="House number, street, city, pincode..."
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 focus:bg-white transition-all text-sm resize-none" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-navy block mb-2">Phone Number *</label>
                      <div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="90342-39674"
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 focus:bg-white transition-all text-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-sky/10 flex items-center justify-center">
                      <Calendar size={18} className="text-sky" />
                    </div>
                    <h2 className="text-lg font-[Poppins] font-bold text-navy">Delivery Schedule</h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Delivery Date *</label>
                      <input
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-sky/30 focus:border-sky outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Time *</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setDeliveryTime("morning")}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                            deliveryTime === "morning"
                              ? "border-sky bg-sky/5"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            deliveryTime === "morning" ? "bg-sky/20" : "bg-orange/10"
                          }`}>
                            <Sun size={18} className={deliveryTime === "morning" ? "text-sky" : "text-orange"} />
                          </div>
                          <div>
                            <div className="font-semibold text-navy text-sm">Morning</div>
                            <div className="text-xs text-gray-400">6 AM - 10 AM</div>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliveryTime("evening")}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                            deliveryTime === "evening"
                              ? "border-sky bg-sky/5"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            deliveryTime === "evening" ? "bg-sky/20" : "bg-green/10"
                          }`}>
                            <Moon size={18} className={deliveryTime === "evening" ? "text-sky" : "text-green"} />
                          </div>
                          <div>
                            <div className="font-semibold text-navy text-sm">Evening</div>
                            <div className="text-xs text-gray-400">4 PM - 8 PM</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>

              <FadeUp>
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center"><CreditCard size={18} className="text-green" /></div>
                    <div><h2 className="text-lg font-[Poppins] font-bold text-navy">Payment Method</h2><p className="text-xs text-gray-400">How would you like to pay?</p></div>
                  </div>
                  <div className="space-y-3">
                    <button type="button" onClick={() => setPaymentMethod("cod")}
                      className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all ${paymentMethod === "cod" ? "border-sky bg-sky/5 shadow-md shadow-sky/10" : "border-gray-200 hover:border-gray-300"}`}>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === "cod" ? "bg-sky text-white" : "bg-gray-100 text-gray-400"}`}><Banknote size={22} /></div>
                      <div className="text-left flex-1"><p className="font-bold text-navy">Cash on Delivery</p><p className="text-sm text-gray-400">Pay when your order arrives</p></div>
                      {paymentMethod === "cod" && <div className="w-6 h-6 rounded-full bg-sky flex items-center justify-center"><CheckCircle2 size={16} className="text-white" /></div>}
                    </button>
                    <button type="button" onClick={() => setPaymentMethod("coins")}
                      className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all ${paymentMethod === "coins" ? "border-sky bg-sky/5 shadow-md shadow-sky/10" : "border-gray-200 hover:border-gray-300"}`}>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === "coins" ? "bg-amber-400 text-white" : "bg-gray-100 text-gray-400"}`}><Coins size={22} /></div>
                      <div className="text-left flex-1"><p className="font-bold text-navy">Anmool Coins</p><p className="text-sm text-gray-400">Balance: {user.coins.toLocaleString()} coins</p></div>
                      {paymentMethod === "coins" && user.coins < totalPrice && <span className="text-xs text-red-500 font-semibold bg-red-50 px-2 py-1 rounded-lg">Insufficient</span>}
                      {paymentMethod === "coins" && user.coins >= totalPrice && <div className="w-6 h-6 rounded-full bg-sky flex items-center justify-center"><CheckCircle2 size={16} className="text-white" /></div>}
                    </button>
                  </div>
                </div>
              </FadeUp>
            </div>

            <div className="lg:col-span-1">
              <FadeUp delay={0.15}>
                <div className="sticky top-24">
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <h3 className="text-lg font-[Poppins] font-bold text-navy mb-5">Order Summary</h3>
                    <div className="space-y-3 mb-5 max-h-60 overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.product._id} className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 relative">
                            <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-navy truncate">{item.product.name}</p>
                            <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                          </div>
                          <span className="text-sm font-bold text-navy">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3 mb-5 pt-4 border-t border-gray-100">
                      <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span className="font-semibold text-navy">₹{totalPrice.toLocaleString()}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-gray-500">Delivery</span><span className="font-semibold text-green">Free</span></div>
                      <div className="h-px bg-gray-100" />
                      <div className="flex justify-between"><span className="font-bold text-navy">Total</span><span className="text-2xl font-bold text-navy">₹{totalPrice.toLocaleString()}</span></div>
                    </div>

                    <div className="flex items-center gap-3 mb-5 p-3 bg-sky-50 rounded-xl">
                      <Shield size={16} className="text-sky shrink-0" />
                      <span className="text-xs text-gray-600">Secure checkout with quality guarantee</span>
                    </div>

                    <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                      className="w-full flex items-center justify-center gap-2 bg-navy text-white py-4 rounded-xl font-bold text-sm hover:bg-navy-dark transition-all shadow-lg shadow-navy/20 disabled:opacity-50">
                      {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (
                        <><Truck size={16} /> Place Order — ₹{totalPrice.toLocaleString()}</>
                      )}
                    </motion.button>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
