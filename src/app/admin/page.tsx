"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import { FadeUp, StaggerChildren, StaggerItem } from "@/components/motion/Animations";
import {
  Package, Users, ShoppingCart, IndianRupee, ChevronRight, TrendingUp,
  Clock, CheckCircle2, AlertCircle, BarChart3, Settings, ArrowUpRight,
  RefreshCw, Eye, Sun, Moon, CalendarDays, Truck,
} from "lucide-react";

interface DashboardData {
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
  pendingOrders: number;
  deliveredOrders: number;
  totalRevenue: number;
  recentOrders: { _id: string; user: { name: string; avatar: string }; total: number; status: string; createdAt: string; deliveryDate: string; deliveryTime: string }[];
}

interface TodayData {
  today: string;
  morning: unknown[];
  evening: unknown[];
  unscheduled: unknown[];
  total: number;
}

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
    case "delivered": return <CheckCircle2 size={14} />;
    case "cancelled": return <AlertCircle size={14} />;
    default: return <Clock size={14} />;
  }
};

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [todayData, setTodayData] = useState<TodayData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") { router.push("/"); return; }
    api.getDashboard()
      .then(setData)
      .catch(() => {});
    api.getTodayOrders()
      .then(setTodayData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user, router]);

  if (!user || user.role !== "admin") return null;

  const stats = data ? [
    { icon: IndianRupee, label: "Total Revenue", value: `₹${data.totalRevenue.toLocaleString()}`, change: "+12%", color: "from-green to-green-dark", iconBg: "bg-white/20" },
    { icon: ShoppingCart, label: "Total Orders", value: data.totalOrders, change: "+8%", color: "from-sky to-sky-dark", iconBg: "bg-white/20" },
    { icon: Users, label: "Total Users", value: data.totalUsers, change: "+5%", color: "from-navy to-navy-dark", iconBg: "bg-white/20" },
    { icon: Package, label: "Products", value: data.totalProducts, change: "", color: "from-orange to-orange-dark", iconBg: "bg-white/20" },
  ] : [];

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
              <p className="text-white/50 text-sm font-medium mb-1">Welcome back,</p>
              <h1 className="text-3xl sm:text-4xl font-[Poppins] font-bold text-white">{user.name}</h1>
              <p className="text-white/60 mt-2">Here&apos;s what&apos;s happening with your dairy business today.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setLoading(true);
                  Promise.all([api.getDashboard().then(setData), api.getTodayOrders().then(setTodayData)]).finally(() => setLoading(false));
                }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-white/20 transition-colors border border-white/10"
              >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                Refresh
              </button>
              <Link
                href="/admin/orders"
                className="flex items-center gap-2 bg-sky text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-sky-dark transition-colors shadow-lg shadow-sky/30"
              >
                View Orders
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Stats Cards */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <StaggerChildren stagger={0.08} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className={`bg-gradient-to-br ${s.color} rounded-2xl p-6 text-white relative overflow-hidden group hover:scale-[1.02] transition-transform`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl ${s.iconBg} flex items-center justify-center`}>
                      <s.icon size={20} />
                    </div>
                    {s.change && (
                      <span className="flex items-center gap-1 text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">
                        <TrendingUp size={10} />
                        {s.change}
                      </span>
                    )}
                  </div>
                  <p className="text-3xl font-[Poppins] font-bold mb-1">{s.value}</p>
                  <p className="text-white/70 text-sm">{s.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        )}

        {/* Quick Actions + Recent Orders */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <FadeUp>
            <div className="lg:col-span-1">
              <h3 className="text-lg font-[Poppins] font-bold text-navy mb-5">Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { href: "/admin/products", label: "Manage Products", icon: Package, desc: "Add, edit, remove products", color: "bg-sky-50 text-sky group-hover:bg-sky group-hover:text-white" },
                  { href: "/admin/orders", label: "Track Orders", icon: ShoppingCart, desc: "View and update order status", color: "bg-green-50 text-green group-hover:bg-green group-hover:text-white" },
                  { href: "/admin/users", label: "View Users", icon: Users, desc: "See all registered users", color: "bg-orange-50 text-orange group-hover:bg-orange group-hover:text-white" },
                  { href: "/admin/delivery-partners", label: "Delivery Partners", icon: Truck, desc: "Manage delivery staff & assignments", color: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white" },
                ].map((l) => (
                  <Link key={l.href} href={l.href}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all group">
                    <div className={`w-12 h-12 rounded-xl ${l.color} flex items-center justify-center transition-colors`}>
                      <l.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-navy text-sm">{l.label}</p>
                      <p className="text-xs text-gray-400">{l.desc}</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-navy group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>

              {/* Order Status Summary */}
              {data && (
                <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-5">
                  <h4 className="font-semibold text-navy text-sm mb-4 flex items-center gap-2">
                    <BarChart3 size={16} className="text-sky" />
                    Order Status
                  </h4>
                  <div className="space-y-3">
                    {[
                      { label: "Pending", value: data.pendingOrders, color: "bg-amber-400" },
                      { label: "Delivered", value: data.deliveredOrders, color: "bg-green" },
                      { label: "Total", value: data.totalOrders, color: "bg-sky" },
                    ].map((s) => (
                      <div key={s.label}>
                        <div className="flex items-center justify-between text-sm mb-1.5">
                          <span className="text-gray-500">{s.label}</span>
                          <span className="font-bold text-navy">{s.value}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${s.color} rounded-full transition-all duration-700`}
                            style={{ width: `${data.totalOrders ? (s.value / data.totalOrders) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Today's Orders */}
              {todayData && (
                <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-navy text-sm flex items-center gap-2">
                      <CalendarDays size={16} className="text-green" />
                      Today&apos;s Orders
                    </h4>
                    <Link href="/admin/orders" className="text-xs text-sky font-semibold hover:text-sky-dark flex items-center gap-1">
                      View all <ArrowUpRight size={10} />
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 rounded-xl bg-amber-50">
                      <Sun size={18} className="text-amber-500 mx-auto mb-1" />
                      <p className="text-xl font-bold text-navy">{todayData.morning.length}</p>
                      <p className="text-[10px] text-gray-400 font-medium">Morning</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-blue-50">
                      <Moon size={18} className="text-blue-500 mx-auto mb-1" />
                      <p className="text-xl font-bold text-navy">{todayData.evening.length}</p>
                      <p className="text-[10px] text-gray-400 font-medium">Evening</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-sky-50">
                      <ShoppingCart size={18} className="text-sky mx-auto mb-1" />
                      <p className="text-xl font-bold text-navy">{todayData.total}</p>
                      <p className="text-[10px] text-gray-400 font-medium">Total</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </FadeUp>

          {/* Recent Orders */}
          <FadeUp delay={0.1}>
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-[Poppins] font-bold text-navy">Recent Orders</h3>
                <Link href="/admin/orders" className="text-sm text-sky font-semibold hover:text-sky-dark flex items-center gap-1 transition-colors">
                  View all <ArrowUpRight size={12} />
                </Link>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {loading ? (
                  <div className="p-5 space-y-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
                    ))}
                  </div>
                ) : data?.recentOrders.length === 0 ? (
                  <div className="text-center py-16">
                    <ShoppingCart size={40} className="text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">No orders yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {data?.recentOrders.map((order, i) => (
                      <motion.div
                        key={order._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="px-5 py-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                          <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold shrink-0">
                            {order.user.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-navy text-sm truncate">{order.user.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] text-gray-400">
                                Ordered: {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                              </span>
                              {order.deliveryDate && (
                                <>
                                  <span className="text-gray-300">·</span>
                                  <span className="text-[10px] text-sky font-semibold">
                                    Delivery: {new Date(order.deliveryDate + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl capitalize ${statusColor(order.status)}`}>
                            {statusIcon(order.status)}
                            {order.status.replace("_", " ")}
                          </span>
                          <span className="font-bold text-navy text-sm whitespace-nowrap">₹{order.total.toLocaleString()}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
