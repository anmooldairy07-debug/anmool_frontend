"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { User } from "@/lib/types";
import { motion } from "framer-motion";
import { FadeUp, StaggerChildren, StaggerItem } from "@/components/motion/Animations";
import {
  Users, Mail, Phone, MapPin, Coins, Search, Calendar, Shield, UserCheck,
} from "lucide-react";

export default function AdminUsersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") { router.push("/"); return; }
    api.getAdminUsers()
      .then((d) => setUsers(d.users))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user, router]);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalCoins = users.reduce((sum, u) => sum + u.coins, 0);
  const adminCount = users.filter((u) => u.role === "admin").length;

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
                <Users size={14} />
                <span>Users Management</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-[Poppins] font-bold text-white">All Users</h1>
              <p className="text-white/60 mt-2">{users.length} registered users · {adminCount} admin{adminCount !== 1 ? "s" : ""} · {totalCoins.toLocaleString()} total coins</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Search */}
        <FadeUp>
          <div className="relative mb-8">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users by name or email..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 transition-all text-sm"
            />
          </div>
        </FadeUp>

        {/* Users Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-56 bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <Users size={48} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">No users found</p>
          </div>
        ) : (
          <StaggerChildren stagger={0.05} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((u) => (
              <StaggerItem key={u._id}>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-all duration-500 group h-full">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-navy to-navy-dark text-white flex items-center justify-center text-lg font-bold shadow-lg shadow-navy/20 group-hover:scale-105 transition-transform">
                        {u.avatar}
                      </div>
                      {u.role === "admin" && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-sky flex items-center justify-center">
                          <Shield size={10} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-navy text-base truncate">{u.name}</h3>
                        {u.role === "admin" && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky/10 text-sky uppercase tracking-wider">Admin</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <Calendar size={10} />
                        Joined {new Date(u.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center shrink-0">
                        <Mail size={14} className="text-sky" />
                      </div>
                      <span className="text-gray-600 truncate">{u.email}</span>
                    </div>
                    {u.phone && (
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                          <Phone size={14} className="text-green" />
                        </div>
                        <span className="text-gray-600">{u.phone}</span>
                      </div>
                    )}
                    {u.address && (
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                          <MapPin size={14} className="text-orange" />
                        </div>
                        <span className="text-gray-600 truncate">{u.address}</span>
                      </div>
                    )}
                  </div>

                  {/* Coins Badge */}
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                          <Coins size={14} className="text-amber-500" />
                        </div>
                        <span className="text-sm font-semibold text-navy">{u.coins.toLocaleString()} coins</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <UserCheck size={12} />
                        <span>{u.role === "admin" ? "Admin" : "Customer"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        )}
      </div>
    </div>
  );
}
