"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Order } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, StaggerChildren, StaggerItem } from "@/components/motion/Animations";
import {
  Package, LogOut, Clock, CheckCircle2, Truck, XCircle, ChevronDown,
  MapPin, CreditCard, Calendar, User, Phone, Sun, Moon, PackageCheck,
  Loader2, RefreshCw, Navigation, ExternalLink, CheckCircle, AlertCircle,
  Filter, RotateCw,
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

interface ProductSummaryItem {
  productId: string;
  name: string;
  totalQuantity: number;
  totalAmount: number;
  orderCount: number;
}

export default function DeliveryPortalPage() {
  const router = useRouter();
  const [partner, setPartner] = useState<{ name: string; email: string; phone: string; timeSlots: string[] } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [summary, setSummary] = useState<ProductSummaryItem[]>([]);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadPartner = useCallback(async () => {
    try {
      const data = await api.dpGetMe();
      setPartner(data.partner);
    } catch {
      localStorage.removeItem("dp_token");
      router.push("/delivery/login");
    }
  }, [router]);

  const fetchOrders = useCallback(async () => {
    try {
      const data = await api.dpGetMyOrders(selectedDate);
      setOrders(data.orders);
    } catch {}
    setLoading(false);
  }, [selectedDate]);

  useEffect(() => {
    const token = localStorage.getItem("dp_token");
    if (!token) { router.push("/delivery/login"); return; }
    loadPartner();
  }, [router, loadPartner]);

  useEffect(() => {
    if (partner) {
      setLoading(true);
      fetchOrders();
    }
  }, [partner, fetchOrders]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!partner) return;
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [partner, fetchOrders]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
    showToast("Orders refreshed");
  };

  const fetchSummary = async () => {
    setSummaryLoading(true);
    try {
      const data = await api.dpGetMySummary(selectedDate);
      setSummary(data.summary);
      setShowSummary(true);
    } catch {}
    setSummaryLoading(false);
  };

  const handleStatusUpdate = async (orderId: string, status: string) => {
    setUpdatingId(orderId);
    try {
      const data = await api.dpUpdateOrderStatus(orderId, status);
      setOrders((prev) => prev.map((o) => (o._id === orderId ? data.order : o)));
      showToast(status === "out_for_delivery" ? "Order picked up for delivery" : "Order marked as delivered");
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Failed to update", "error");
    }
    setUpdatingId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("dp_token");
    router.push("/delivery/login");
  };

  if (!partner) return null;

  const confirmedOrders = orders.filter((o) => o.status === "confirmed");
  const outOrders = orders.filter((o) => o.status === "out_for_delivery");
  const deliveredOrders = orders.filter((o) => o.status === "delivered");
  const totalCount = orders.length;
  const completionPct = totalCount > 0 ? Math.round((deliveredOrders.length / totalCount) * 100) : 0;

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const isToday = selectedDate === new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className={`fixed top-4 left-1/2 z-[100] px-5 py-3 rounded-xl shadow-xl text-sm font-semibold flex items-center gap-2 ${
              toast.type === "success" ? "bg-green text-white" : "bg-red-500 text-white"
            }`}
          >
            {toast.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-navy sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo1.png" alt="Anmool" className="w-10 h-10 rounded-xl bg-white p-0.5" />
            <div>
              <p className="font-[Poppins] font-bold text-white text-sm">Delivery Portal</p>
              <p className="text-xs text-white/50">{partner.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {totalCount > 0 && (
              <div className="hidden sm:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                <div className="w-16 h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-green rounded-full transition-all duration-500" style={{ width: `${completionPct}%` }} />
                </div>
                <span className="text-xs text-white/70 font-medium">{completionPct}%</span>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-5 py-6">
        {/* Welcome + Stats */}
        <FadeUp>
          <div className="mb-6">
            <h1 className="text-xl font-[Poppins] font-bold text-navy mb-1">
              {isToday ? "Today" : new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}&apos;s Deliveries
            </h1>
            <p className="text-sm text-gray-400">
              {totalCount} order{totalCount !== 1 ? "s" : ""} assigned · {deliveredOrders.length} completed
            </p>
          </div>
        </FadeUp>

        {/* Stats */}
        <FadeUp delay={0.05}>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button
              onClick={() => setFilter(filter === "confirmed" ? "all" : "confirmed")}
              className={`bg-white rounded-2xl border-2 p-4 text-center transition-all ${
                filter === "confirmed" ? "border-sky shadow-md" : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center mx-auto mb-2">
                <Package size={16} className="text-sky" />
              </div>
              <p className="text-2xl font-bold text-navy">{confirmedOrders.length}</p>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Ready</p>
            </button>
            <button
              onClick={() => setFilter(filter === "out_for_delivery" ? "all" : "out_for_delivery")}
              className={`bg-white rounded-2xl border-2 p-4 text-center transition-all ${
                filter === "out_for_delivery" ? "border-blue-400 shadow-md" : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-2">
                <Truck size={16} className="text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-navy">{outOrders.length}</p>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">In Transit</p>
            </button>
            <button
              onClick={() => setFilter(filter === "delivered" ? "all" : "delivered")}
              className={`bg-white rounded-2xl border-2 p-4 text-center transition-all ${
                filter === "delivered" ? "border-green shadow-md" : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 size={16} className="text-green" />
              </div>
              <p className="text-2xl font-bold text-navy">{deliveredOrders.length}</p>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Done</p>
            </button>
          </div>
        </FadeUp>

        {/* Date + Actions */}
        <FadeUp delay={0.1}>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                  <Calendar size={16} className="text-sky" />
                </div>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-sky/30 focus:border-sky outline-none transition-all"
                />
                {isToday && (
                  <span className="text-[10px] font-bold bg-sky/10 text-sky px-2 py-0.5 rounded-full uppercase">Today</span>
                )}
              </div>
              <div className="flex items-center gap-2 sm:ml-auto">
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-3 py-2 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  <RotateCw size={13} className={refreshing ? "animate-spin" : ""} />
                </button>
                <button
                  onClick={fetchSummary}
                  disabled={summaryLoading}
                  className="flex items-center gap-1.5 bg-green-50 text-green px-3 py-2 rounded-xl text-sm font-semibold hover:bg-green-100 transition-colors disabled:opacity-50"
                >
                  {summaryLoading ? <Loader2 size={13} className="animate-spin" /> : <PackageCheck size={13} />}
                  Summary
                </button>
              </div>
            </div>

            {/* Filter chips */}
            {filter !== "all" && (
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <Filter size={12} className="text-gray-400" />
                <span className="text-xs text-gray-400">Filtered:</span>
                <button
                  onClick={() => setFilter("all")}
                  className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusColor(filter)}`}
                >
                  {filter.replace("_", " ")}
                  <span className="ml-1 opacity-60">×</span>
                </button>
              </div>
            )}
          </div>
        </FadeUp>

        {/* Product Summary */}
        <AnimatePresence>
          {showSummary && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                      <Package size={18} className="text-green" />
                    </div>
                    <div>
                      <h3 className="font-[Poppins] font-bold text-navy">Loading Summary</h3>
                      <p className="text-xs text-gray-400">{summary.length} product{summary.length !== 1 ? "s" : ""} to load</p>
                    </div>
                  </div>
                  <button onClick={() => setShowSummary(false)} className="text-xs text-gray-400 hover:text-gray-600">Hide</button>
                </div>
                {summary.length === 0 ? (
                  <div className="text-center py-6">
                    <Package size={28} className="text-gray-200 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">No products for this date</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {summary.map((item) => (
                      <div key={item.productId} className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center text-sky text-xs font-bold">
                            {item.totalQuantity}x
                          </div>
                          <span className="text-sm font-semibold text-navy">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-400">{item.orderCount} order{item.orderCount !== 1 ? "s" : ""}</span>
                          <span className="text-sm font-bold text-navy">₹{item.totalAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                      <span className="text-sm font-semibold text-gray-500">Total</span>
                      <span className="text-lg font-bold text-navy">₹{summary.reduce((s, i) => s + i.totalAmount, 0).toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Orders */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <Package size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">
              {filter !== "all" ? `No ${filter.replace("_", " ")} orders` : "No orders assigned for this date"}
            </p>
          </div>
        ) : (
          <StaggerChildren stagger={0.04} className="space-y-3">
            {filtered.map((order) => (
              <StaggerItem key={order._id}>
                <div className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${
                  order.status === "out_for_delivery" ? "border-blue-200 shadow-md shadow-blue-100" : "border-gray-100 hover:shadow-lg"
                }`}>
                  <div
                    className="p-4 cursor-pointer"
                    onClick={() => setExpandedId(expandedId === order._id ? null : order._id)}
                  >
                    {/* Top row */}
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          order.status === "out_for_delivery" ? "bg-blue-500 text-white" : "bg-navy text-white"
                        }`}>
                          {order.user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-navy text-sm">{order.user.name}</p>
                          <p className="text-xs text-gray-400">#{order._id.slice(-6).toUpperCase()}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg capitalize ${statusColor(order.status)}`}>
                        {statusIcon(order.status)}
                        {order.status.replace("_", " ")}
                      </span>
                    </div>

                    {/* Info chips */}
                    <div className="flex flex-wrap gap-2 mb-2.5">
                      <a
                        href={`tel:${order.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-xs bg-gray-50 text-gray-600 px-2.5 py-1.5 rounded-lg hover:bg-sky-50 hover:text-sky transition-colors"
                      >
                        <Phone size={11} />
                        {order.phone}
                      </a>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-2.5 py-1.5 rounded-lg">
                        <MapPin size={11} className="text-gray-400 shrink-0" />
                        <span className="truncate max-w-[180px]">{order.shippingAddress}</span>
                      </div>
                      {order.deliveryTime && (
                        <div className="flex items-center gap-1 text-xs text-navy bg-gray-50 px-2.5 py-1.5 rounded-lg font-semibold">
                          {order.deliveryTime === "morning" ? <Sun size={11} className="text-amber-500" /> : <Moon size={11} className="text-blue-500" />}
                          {order.deliveryTime === "morning" ? "6-10 AM" : "4-8 PM"}
                        </div>
                      )}
                    </div>

                    {/* Bottom */}
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-400">
                        {order.items.length} item{order.items.length > 1 ? "s" : ""} · {order.paymentMethod === "cod" ? "COD" : "Coins"}
                      </p>
                      <div className="flex items-center gap-3">
                        <p className="font-bold text-navy">₹{order.total.toLocaleString()}</p>
                        <ChevronDown size={14} className={`text-gray-400 transition-transform ${expandedId === order._id ? "rotate-180" : ""}`} />
                      </div>
                    </div>
                  </div>

                  {/* Expanded */}
                  <AnimatePresence>
                    {expandedId === order._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-gray-100 overflow-hidden"
                      >
                        <div className="p-4 space-y-4">
                          {/* Customer Details */}
                          <div className="grid sm:grid-cols-3 gap-3">
                            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50">
                              <User size={14} className="text-gray-400 mt-0.5 shrink-0" />
                              <div>
                                <p className="text-[10px] text-gray-400 uppercase font-semibold mb-0.5">Customer</p>
                                <p className="text-sm font-semibold text-navy">{order.user.name}</p>
                                <p className="text-xs text-gray-500">{order.user.email}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50">
                              <Phone size={14} className="text-gray-400 mt-0.5 shrink-0" />
                              <div>
                                <p className="text-[10px] text-gray-400 uppercase font-semibold mb-0.5">Phone</p>
                                <a href={`tel:${order.phone}`} className="text-sm font-semibold text-sky hover:underline">{order.phone}</a>
                                {order.user.address && (
                                  <p className="text-xs text-gray-500 mt-1">{order.user.address}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50">
                              <MapPin size={14} className="text-gray-400 mt-0.5 shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-[10px] text-gray-400 uppercase font-semibold mb-0.5">Delivery Address</p>
                                <p className="text-sm text-navy">{order.shippingAddress}</p>
                                <a
                                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.shippingAddress)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs text-sky font-semibold mt-1 hover:underline"
                                >
                                  <Navigation size={10} /> Open in Maps
                                </a>
                              </div>
                            </div>
                          </div>

                          {/* Items */}
                          <div>
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Items Ordered</p>
                            <div className="space-y-1.5">
                              {order.items.map((item, i) => (
                                <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50">
                                  <div className="flex items-center gap-2.5">
                                    <div className="w-7 h-7 rounded-lg bg-sky/10 flex items-center justify-center text-sky text-[10px] font-bold">
                                      {item.quantity}x
                                    </div>
                                    <span className="text-sm text-navy font-medium">{item.name}</span>
                                  </div>
                                  <span className="text-sm font-bold text-navy">₹{(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                              <span className="text-xs font-semibold text-gray-400 uppercase">Total</span>
                              <span className="text-base font-bold text-navy">₹{order.total.toLocaleString()}</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          {order.status !== "delivered" && order.status !== "cancelled" && (
                            <div className="flex flex-col gap-2 pt-1">
                              {order.status === "confirmed" && (
                                <button
                                  onClick={() => handleStatusUpdate(order._id, "out_for_delivery")}
                                  disabled={updatingId === order._id}
                                  className="w-full py-3 rounded-xl text-sm font-bold bg-blue-500 text-white hover:bg-blue-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md shadow-blue-200"
                                >
                                  {updatingId === order._id ? <Loader2 size={16} className="animate-spin" /> : <Truck size={16} />}
                                  Pick Up for Delivery
                                </button>
                              )}
                              {order.status === "out_for_delivery" && (
                                <button
                                  onClick={() => handleStatusUpdate(order._id, "delivered")}
                                  disabled={updatingId === order._id}
                                  className="w-full py-3 rounded-xl text-sm font-bold bg-green text-white hover:bg-green-dark transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md shadow-green/20"
                                >
                                  {updatingId === order._id ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                                  Mark as Delivered
                                </button>
                              )}
                            </div>
                          )}

                          {/* Delivered badge */}
                          {order.status === "delivered" && (
                            <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-50 border border-green-100">
                              <CheckCircle size={16} className="text-green" />
                              <span className="text-sm font-semibold text-green">Delivered Successfully</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        )}
      </div>
    </div>
  );
}
