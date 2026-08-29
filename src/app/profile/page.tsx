"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { api, getAssetUrl } from "@/lib/api";
import { Order } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, StaggerChildren, StaggerItem } from "@/components/motion/Animations";
import {
  User, Package, Coins, LogOut, Camera, Save, Mail, Phone, MapPin,
  Clock, CheckCircle2, Truck, AlertCircle, XCircle, ShoppingBag, Calendar,
  Sun, Moon, Trash2, UserCheck,
} from "lucide-react";

const statusColor = (s: string) => {
  switch (s) {
    case "pending": return "bg-amber-100 text-amber-700 border-2 border-amber-300";
    case "confirmed": return "bg-sky-100 text-sky border-2 border-sky-300";
    case "out_for_delivery": return "bg-blue-100 text-blue-700 border-2 border-blue-300";
    case "delivered": return "bg-green-100 text-green border-2 border-green-300";
    case "cancelled": return "bg-red-100 text-red-600 border-2 border-red-300";
    default: return "bg-gray-100 text-gray-600 border-2 border-gray-300";
  }
};

const statusIcon = (s: string) => {
  switch (s) {
    case "pending": return <Clock size={14} />;
    case "confirmed": return <CheckCircle2 size={14} />;
    case "out_for_delivery": return <Truck size={14} />;
    case "delivered": return <CheckCircle2 size={14} />;
    case "cancelled": return <XCircle size={14} />;
    default: return <Clock size={14} />;
  }
};

export default function ProfilePage() {
  const { user, logout, updateUser } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tab, setTab] = useState<"profile" | "orders">("profile");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleHideOrder = async (orderId: string) => {
    try {
      await api.hideOrder(orderId);
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
    } catch {}
  };

  useEffect(() => {
    if (!user) { router.push("/login"); return; }
    setName(user.name);
    setPhone(user.phone);
    setAddress(user.address);

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("tab") === "orders") setTab("orders");

    api.getOrders()
      .then((d) => setOrders(d.orders))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user, router]);

  if (!user) return null;

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    // Preview
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    try {
      const data = await api.uploadAvatar(file);
      updateUser(data.user);
    } catch {}
    setUploading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = await api.updateProfile({ name, phone, address });
      updateUser(data.user);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {}
    setSaving(false);
  };

  const avatarSrc = preview || (user.avatar?.startsWith("/uploads") ? getAssetUrl(user.avatar) : user.avatar || null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-navy-dark to-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-60 h-60 bg-sky rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
              {avatarSrc ? (
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/20">
                  <Image src={avatarSrc} alt={user.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center text-2xl font-bold text-white">
                  {user.avatar}
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                {uploading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Camera size={20} className="text-white" />
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-[Poppins] font-bold text-white">{user.name}</h1>
              <p className="text-white/60 mt-1 flex items-center gap-2">
                <Mail size={14} />
                {user.email}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="flex items-center gap-1.5 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-sm font-semibold">
                  <Coins size={14} />
                  {user.coins.toLocaleString()} coins
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 text-white/60 px-3 py-1 rounded-full text-sm">
                  <Calendar size={12} />
                  Member since {new Date(user.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Tabs */}
        <FadeUp>
          <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
            {[
              { id: "profile" as const, icon: User, label: "Profile" },
              { id: "orders" as const, icon: Package, label: "My Orders" },
            ].map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  tab === t.id
                    ? "bg-navy text-white shadow-md shadow-navy/20"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-sky hover:text-sky"
                }`}>
                <t.icon size={16} /> {t.label}
              </button>
            ))}
            <button onClick={() => { logout(); router.push("/"); }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-red-500 bg-white border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all ml-auto whitespace-nowrap">
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </FadeUp>

        {tab === "profile" ? (
          <FadeUp>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden mx-auto mb-4 border-4 border-gray-100 cursor-pointer group" onClick={handleAvatarClick}>
                    {avatarSrc ? (
                      <Image src={avatarSrc} alt={user.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-navy flex items-center justify-center text-3xl font-bold text-white">
                        {user.avatar}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                      <Camera size={24} className="text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-navy text-lg">{user.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{user.email}</p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <div className="flex items-center gap-1.5 bg-amber-50 text-amber-600 px-4 py-2 rounded-full">
                      <Coins size={14} />
                      <span className="font-bold text-sm">{user.coins.toLocaleString()}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-4">
                    Click avatar to upload photo
                  </p>
                </div>
              </div>

              {/* Edit Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
                  <h2 className="text-lg font-[Poppins] font-bold text-navy mb-6">Edit Profile</h2>
                  <form onSubmit={handleSave} className="space-y-5">
                    <div>
                      <label className="text-sm font-semibold text-navy block mb-2">Full Name</label>
                      <div className="relative">
                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input value={name} onChange={(e) => setName(e.target.value)} required
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 focus:bg-white transition-all text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-navy block mb-2">Email</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input value={user.email} disabled
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-navy block mb-2">Phone</label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210"
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 focus:bg-white transition-all text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-navy block mb-2">Address</label>
                      <div className="relative">
                        <MapPin size={16} className="absolute left-4 top-4 text-gray-400" />
                        <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3} placeholder="Your delivery address..."
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 focus:bg-white transition-all text-sm resize-none" />
                      </div>
                    </div>
                    <motion.button
                      type="submit"
                      disabled={saving}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg ${
                        saved
                          ? "bg-green text-white shadow-green/20"
                          : "bg-navy text-white hover:bg-navy-dark shadow-navy/20"
                      } disabled:opacity-50`}
                    >
                      {saved ? (
                        <>
                          <CheckCircle2 size={16} />
                          Saved!
                        </>
                      ) : saving ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Save size={16} />
                          Save Changes
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </div>
            </div>
          </FadeUp>
        ) : (
          <div>
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <ShoppingBag size={48} className="text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 font-medium">No orders yet</p>
                <p className="text-gray-300 text-sm mt-1">Start shopping to see your orders here</p>
              </div>
            ) : (
              <StaggerChildren stagger={0.05} className="space-y-4">
                {orders.map((order) => (
                  <StaggerItem key={order._id}>
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 hover:shadow-lg transition-all duration-300">
                      {/* Header: Order ID + Status */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center">
                            <Package size={18} className="text-navy" />
                          </div>
                          <div>
                            <span className="text-xs font-mono text-gray-400">#{order._id.slice(-8).toUpperCase()}</span>
                          </div>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl capitalize self-start ${statusColor(order.status)}`}>
                          {statusIcon(order.status)}
                          {order.status.replace("_", " ")}
                        </span>
                      </div>

                      {/* Dates Row */}
                      <div className="flex flex-wrap gap-4 mb-4 p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-gray-400" />
                          <div>
                            <p className="text-[10px] text-gray-400 font-semibold uppercase">Ordered</p>
                            <p className="text-sm font-semibold text-navy">
                              {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            </p>
                          </div>
                        </div>
                        {order.deliveryDate && (
                          <>
                            <div className="w-px bg-gray-200" />
                            <div className="flex items-center gap-2">
                              <Truck size={14} className="text-sky" />
                              <div>
                                <p className="text-[10px] text-gray-400 font-semibold uppercase">Delivery</p>
                                <p className="text-sm font-semibold text-navy">
                                  {new Date(order.deliveryDate + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                        {order.deliveryTime && (
                          <>
                            <div className="w-px bg-gray-200" />
                            <div className="flex items-center gap-2">
                              {order.deliveryTime === "morning" ? <Sun size={14} className="text-amber-500" /> : <Moon size={14} className="text-blue-500" />}
                              <div>
                                <p className="text-[10px] text-gray-400 font-semibold uppercase">Time Slot</p>
                                <p className="text-sm font-semibold text-navy capitalize">
                                  {order.deliveryTime === "morning" ? "Morning (6-10 AM)" : "Evening (4-8 PM)"}
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Delivery Partner */}
                      {order.assignedTo && typeof order.assignedTo === "object" && (
                        <div className="mb-4 flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100">
                          <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                            <UserCheck size={16} className="text-purple-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-purple-400 font-semibold uppercase">Delivery Partner</p>
                            <p className="text-sm font-semibold text-navy">{order.assignedTo.name}</p>
                          </div>
                          <a
                            href={`tel:${order.assignedTo.phone}`}
                            className="flex items-center gap-1.5 bg-white border border-purple-200 text-purple-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-purple-50 transition-colors shrink-0"
                          >
                            <Phone size={12} />
                            {order.assignedTo.phone}
                          </a>
                        </div>
                      )}

                      {/* Cancel Reason */}
                      {order.status === "cancelled" && order.cancelReason && (
                        <div className="mb-4 p-3 bg-red-50 rounded-xl border border-red-100">
                          <p className="text-xs font-semibold text-red-600 mb-1">Cancellation Reason</p>
                          <p className="text-sm text-red-700">{order.cancelReason}</p>
                        </div>
                      )}

                      {/* Items */}
                      <div className="space-y-2 mb-4">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Items Ordered</p>
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between items-center py-2 px-3 rounded-lg bg-gray-50">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-bold text-sky bg-sky-50 px-2 py-0.5 rounded">{item.quantity}x</span>
                              <span className="text-sm font-medium text-navy">{item.name}</span>
                            </div>
                            <span className="text-sm font-bold text-navy">₹{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-sm text-gray-400 capitalize flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-sky" />
                          {order.paymentMethod === "cod" ? "Cash on Delivery" : "Paid with Coins"}
                        </span>
                        <div className="flex items-center gap-3">
                          {(order.status === "delivered" || order.status === "cancelled") && (
                            <button
                              onClick={() => handleHideOrder(order._id)}
                              className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              <Trash2 size={12} />
                              Remove
                            </button>
                          )}
                          <span className="text-lg font-bold text-navy">₹{order.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
