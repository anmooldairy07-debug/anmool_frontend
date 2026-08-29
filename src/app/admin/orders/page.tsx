"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Order } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, StaggerChildren, StaggerItem } from "@/components/motion/Animations";
import {
  ShoppingCart, Search, Clock, CheckCircle2, AlertCircle,
  Truck, XCircle, ChevronDown, MapPin, CreditCard, Calendar, User,
  Sun, Moon, Package, ArrowRight, Filter, Loader2, PackageCheck, Phone, UserCheck,
} from "lucide-react";

const statusOptions = ["pending", "confirmed", "out_for_delivery", "delivered", "cancelled"];
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
const statusBg = (s: string) => {
  switch (s) {
    case "pending": return "from-amber-400 to-amber-500";
    case "confirmed": return "from-sky to-sky-dark";
    case "out_for_delivery": return "from-blue-500 to-blue-600";
    case "delivered": return "from-green to-green-dark";
    case "cancelled": return "from-red-400 to-red-500";
    default: return "from-gray-400 to-gray-500";
  }
};

interface ProductSummaryItem {
  productId: string;
  name: string;
  totalQuantity: number;
  totalAmount: number;
  orderCount: number;
}

export default function AdminOrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [timeSlot, setTimeSlot] = useState<"all" | "morning" | "evening">("all");
  const [showProductSummary, setShowProductSummary] = useState(false);
  const [productSummary, setProductSummary] = useState<ProductSummaryItem[]>([]);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.role !== "admin") { router.push("/"); return; }
    fetchOrders();
  }, [user, router, selectedDate, timeSlot]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminOrdersFiltered(selectedDate, timeSlot === "all" ? undefined : timeSlot);
      setOrders(data.orders);
    } catch {}
    setLoading(false);
  };

  const fetchProductSummary = async () => {
    setSummaryLoading(true);
    try {
      const data = await api.getProductSummary(selectedDate, timeSlot === "all" ? undefined : timeSlot);
      setProductSummary(data.summary);
      setShowProductSummary(true);
    } catch {}
    setSummaryLoading(false);
  };

  const handleStatus = async (orderId: string, status: string) => {
    if (status === "cancelled") {
      setCancelOrderId(orderId);
      return;
    }
    try {
      const data = await api.updateOrderStatus(orderId, status);
      setOrders((prev) => prev.map((o) => (o._id === orderId ? data.order : o)));
    } catch {}
  };

  const handleCancelConfirm = async () => {
    if (!cancelOrderId) return;
    try {
      const data = await api.updateOrderStatus(cancelOrderId, "cancelled", cancelReason || undefined);
      setOrders((prev) => prev.map((o) => (o._id === cancelOrderId ? data.order : o)));
    } catch {}
    setCancelOrderId(null);
    setCancelReason("");
  };

  const filtered = orders.filter((o) => {
    const matchFilter = filter === "all" || o.status === filter;
    const matchSearch = o.user.name.toLowerCase().includes(search.toLowerCase()) || o.user.email.toLowerCase().includes(search.toLowerCase()) || (o.phone && o.phone.includes(search));
    return matchFilter && matchSearch;
  });

  const morningOrders = filtered.filter((o) => o.deliveryTime === "morning");
  const eveningOrders = filtered.filter((o) => o.deliveryTime === "evening");
  const unscheduledOrders = filtered.filter((o) => o.deliveryTime !== "morning" && o.deliveryTime !== "evening");

  const statusCounts = {
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    out_for_delivery: orders.filter((o) => o.status === "out_for_delivery").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  const isToday = selectedDate === new Date().toISOString().split("T")[0];

  const renderOrderCard = (order: Order) => (
    <div key={order._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div
        className="p-5 cursor-pointer"
        onClick={() => setExpandedId(expandedId === order._id ? null : order._id)}
      >
        {/* Top row: Customer + Status */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold shrink-0">
              {order.user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-navy text-sm">{order.user.name}</p>
              <p className="text-xs text-gray-400">{order.user.email}</p>
              {order.phone && <p className="text-xs text-gray-400">{order.phone}</p>}
            </div>
          </div>
          <span className={`inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl capitalize ${statusColor(order.status)}`}>
            {statusIcon(order.status)}
            {order.status.replace("_", " ")}
          </span>
        </div>

        {/* Dates Row */}
        <div className="flex flex-wrap gap-3 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-2.5 py-1.5 rounded-lg">
            <Calendar size={12} className="text-gray-400" />
            <span className="font-semibold">Ordered:</span>
            {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </div>
          {order.deliveryDate && (
            <div className="flex items-center gap-1.5 text-xs text-sky bg-sky-50 px-2.5 py-1.5 rounded-lg font-semibold">
              <Truck size={12} />
              <span>Delivery:</span>
              {new Date(order.deliveryDate + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </div>
          )}
          {order.deliveryTime && (
            <div className="flex items-center gap-1.5 text-xs text-navy bg-gray-50 px-2.5 py-1.5 rounded-lg font-semibold">
              {order.deliveryTime === "morning" ? <Sun size={12} className="text-amber-500" /> : <Moon size={12} className="text-blue-500" />}
              {order.deliveryTime === "morning" ? "6-10 AM" : "4-8 PM"}
            </div>
          )}
          {order.assignedTo && typeof order.assignedTo === "object" && (
            <div className="flex items-center gap-1.5 text-xs text-purple-600 bg-purple-50 px-2.5 py-1.5 rounded-lg font-semibold">
              <UserCheck size={12} />
              {order.assignedTo.name}
            </div>
          )}
        </div>

        {/* Bottom row: Items + Total */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">
            {order.items.length} item{order.items.length > 1 ? "s" : ""} · {order.paymentMethod === "cod" ? "COD" : "Coins"}
          </p>
          <p className="font-bold text-navy text-lg">₹{order.total.toLocaleString()}</p>
        </div>
        <div className="flex justify-end mt-1">
          <ChevronDown size={16} className={`text-gray-400 transition-transform ${expandedId === order._id ? "rotate-180" : ""}`} />
        </div>
      </div>

      <AnimatePresence>
        {expandedId === order._id && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-100 overflow-hidden"
          >
            <div className="p-5 space-y-5">
              <div className="grid sm:grid-cols-4 gap-4">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                  <User size={16} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Customer</p>
                    <p className="text-sm font-semibold text-navy">{order.user.name}</p>
                    <p className="text-xs text-gray-500">{order.user.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                  <Phone size={16} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Phone</p>
                    <p className="text-sm font-semibold text-navy">{order.phone || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                  <MapPin size={16} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Delivery Address</p>
                    <p className="text-sm text-navy">{order.shippingAddress}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                  <CreditCard size={16} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Payment</p>
                    <p className="text-sm font-semibold text-navy capitalize">{order.paymentMethod}</p>
                  </div>
                </div>
              </div>

              {order.status === "cancelled" && order.cancelReason && (
                <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                  <p className="text-xs font-semibold text-red-600 mb-1">Cancellation Reason</p>
                  <p className="text-sm text-red-700">{order.cancelReason}</p>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Items Ordered</p>
                <div className="space-y-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky text-xs font-bold">
                          {item.quantity}x
                        </div>
                        <span className="text-sm text-navy font-medium">{item.name}</span>
                      </div>
                      <span className="text-sm font-bold text-navy">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                  <span className="text-sm font-semibold text-gray-500">Total</span>
                  <span className="text-lg font-bold text-navy">₹{order.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-sm font-semibold text-navy whitespace-nowrap">Update Status:</span>
                <div className="flex flex-wrap gap-2 flex-1">
                  {statusOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatus(order._id, s)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all ${
                        order.status === s
                          ? `bg-gradient-to-r ${statusBg(s)} text-white shadow-md`
                          : "bg-white text-gray-600 border border-gray-200 hover:border-sky hover:text-sky"
                      }`}
                    >
                      {s.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="page-enter min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-navy-dark to-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-60 h-60 bg-sky rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-green rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-white/50 text-sm mb-2">
                <ShoppingCart size={14} />
                <span>Orders Management</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-[Poppins] font-bold text-white">Track Orders</h1>
              <p className="text-white/60 mt-2">
                {orders.length} orders for {isToday ? "today" : new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                {timeSlot !== "all" && ` · ${timeSlot}`} · {statusCounts.pending} pending
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Date Picker + Time Slot Tabs */}
        <FadeUp>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Date Picker */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                  <Calendar size={18} className="text-sky" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 block mb-1">Delivery Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-sky/30 focus:border-sky outline-none transition-all"
                  />
                </div>
              </div>

              {/* Today Button */}
              {!isToday && (
                <button
                  onClick={() => setSelectedDate(new Date().toISOString().split("T")[0])}
                  className="flex items-center gap-2 bg-sky/10 text-sky px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-sky/20 transition-colors"
                >
                  <Clock size={14} />
                  Jump to Today
                </button>
              )}

              {/* Time Slot Tabs */}
              <div className="flex flex-wrap items-center gap-2 ml-auto">
                <span className="text-xs font-semibold text-gray-400 mr-1 hidden sm:block">Time Slot:</span>
                {[
                  { key: "all", label: "All", icon: Filter },
                  { key: "morning", label: "Morning", sub: "6-10 AM", icon: Sun },
                  { key: "evening", label: "Evening", sub: "4-8 PM", icon: Moon },
                ].map((slot) => (
                  <button
                    key={slot.key}
                    onClick={() => setTimeSlot(slot.key as "all" | "morning" | "evening")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      timeSlot === slot.key
                        ? "bg-navy text-white shadow-md"
                        : "bg-gray-50 text-gray-600 border border-gray-200 hover:border-sky hover:text-sky"
                    }`}
                  >
                    <slot.icon size={14} />
                    <span>{slot.label}</span>
                    {slot.sub && <span className="text-[10px] opacity-60 hidden sm:inline">{slot.sub}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Summary Toggle */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={fetchProductSummary}
                disabled={summaryLoading}
                className="flex items-center gap-2 bg-green-50 text-green px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-100 transition-colors disabled:opacity-50"
              >
                {summaryLoading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <PackageCheck size={14} />
                )}
                {showProductSummary ? "Refresh" : "View"} Product Loading Summary
              </button>
              {showProductSummary && (
                <button
                  onClick={() => setShowProductSummary(false)}
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Hide Summary
                </button>
              )}
            </div>
          </div>
        </FadeUp>

        {/* Product Loading Summary Panel */}
        <AnimatePresence>
          {showProductSummary && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                    <Package size={18} className="text-green" />
                  </div>
                  <div>
                    <h3 className="font-[Poppins] font-bold text-navy">Product Loading Summary</h3>
                    <p className="text-xs text-gray-400">
                      {productSummary.length} products to load · {isToday ? "Today" : selectedDate}
                      {timeSlot !== "all" && ` · ${timeSlot}`}
                    </p>
                  </div>
                </div>
                {productSummary.length === 0 ? (
                  <div className="text-center py-8">
                    <Package size={32} className="text-gray-200 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">No products to load for this date/slot</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider py-3 px-4">Product</th>
                          <th className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider py-3 px-4">Qty Needed</th>
                          <th className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider py-3 px-4"># Orders</th>
                          <th className="text-right text-xs font-semibold text-gray-400 uppercase tracking-wider py-3 px-4">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productSummary.map((item) => (
                          <tr key={item.productId} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-4">
                              <span className="text-sm font-semibold text-navy">{item.name}</span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="inline-flex items-center justify-center bg-sky/10 text-sky font-bold text-sm px-3 py-1 rounded-full">
                                {item.totalQuantity}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="text-sm text-gray-500">{item.orderCount}</span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <span className="text-sm font-bold text-navy">₹{item.totalAmount.toLocaleString()}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Tabs */}
        <FadeUp delay={0.05}>
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setFilter("all")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                filter === "all"
                  ? "bg-navy text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-sky hover:text-sky"
              }`}
            >
              <span>All</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${filter === "all" ? "bg-white/20" : "bg-gray-100"}`}>
                {orders.length}
              </span>
            </button>
            {statusOptions.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  filter === s
                    ? "bg-navy text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-sky hover:text-sky"
                }`}
              >
                {statusIcon(s)}
                <span className="capitalize">{s.replace("_", " ")}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${filter === s ? "bg-white/20" : "bg-gray-100"}`}>
                  {statusCounts[s as keyof typeof statusCounts] || 0}
                </span>
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Search */}
        <FadeUp delay={0.1}>
          <div className="relative mb-6">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or phone..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 transition-all text-sm"
            />
          </div>
        </FadeUp>

        {/* Orders List */}
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-28 bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <ShoppingCart size={48} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">No orders found for this date/slot</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Morning Section */}
            {morningOrders.length > 0 && (
              <FadeUp delay={0.15}>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                      <Sun size={16} className="text-amber-500" />
                    </div>
                    <h3 className="font-[Poppins] font-bold text-navy">Morning Slot</h3>
                    <span className="text-xs text-gray-400">6 AM – 10 AM</span>
                    <span className="text-xs bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full">
                      {morningOrders.length} orders
                    </span>
                  </div>
                  <StaggerChildren stagger={0.05} className="space-y-4">
                    {morningOrders.map((order) => (
                      <StaggerItem key={order._id}>{renderOrderCard(order)}</StaggerItem>
                    ))}
                  </StaggerChildren>
                </div>
              </FadeUp>
            )}

            {/* Evening Section */}
            {eveningOrders.length > 0 && (
              <FadeUp delay={0.2}>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Moon size={16} className="text-blue-500" />
                    </div>
                    <h3 className="font-[Poppins] font-bold text-navy">Evening Slot</h3>
                    <span className="text-xs text-gray-400">4 PM – 8 PM</span>
                    <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                      {eveningOrders.length} orders
                    </span>
                  </div>
                  <StaggerChildren stagger={0.05} className="space-y-4">
                    {eveningOrders.map((order) => (
                      <StaggerItem key={order._id}>{renderOrderCard(order)}</StaggerItem>
                    ))}
                  </StaggerChildren>
                </div>
              </FadeUp>
            )}

            {/* Unscheduled Section */}
            {unscheduledOrders.length > 0 && (
              <FadeUp delay={0.25}>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <AlertCircle size={16} className="text-gray-400" />
                    </div>
                    <h3 className="font-[Poppins] font-bold text-navy">No Time Slot</h3>
                    <span className="text-xs bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded-full">
                      {unscheduledOrders.length} orders
                    </span>
                  </div>
                  <StaggerChildren stagger={0.05} className="space-y-4">
                    {unscheduledOrders.map((order) => (
                      <StaggerItem key={order._id}>{renderOrderCard(order)}</StaggerItem>
                    ))}
                  </StaggerChildren>
                </div>
              </FadeUp>
            )}
          </div>
        )}
      </div>

      {/* Cancel Reason Modal */}
      <AnimatePresence>
        {cancelOrderId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-5"
            onClick={() => { setCancelOrderId(null); setCancelReason(""); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <AlertCircle size={20} className="text-red-500" />
                </div>
                <div>
                  <h3 className="font-bold text-navy">Cancel Order</h3>
                  <p className="text-xs text-gray-400">This will send an email to the customer</p>
                </div>
              </div>
              <div className="mb-4">
                <label className="text-sm font-semibold text-navy block mb-2">Reason for cancellation</label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="e.g., Item out of stock, delivery area not serviceable..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 focus:bg-white transition-all text-sm resize-none"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { setCancelOrderId(null); setCancelReason(""); }}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                  Go Back
                </button>
                <button
                  onClick={handleCancelConfirm}
                  className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                >
                  Cancel Order
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
