"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { DeliveryPartner } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, StaggerChildren, StaggerItem } from "@/components/motion/Animations";
import {
  Users, Plus, Mail, Phone, Clock, Sun, Moon, ToggleLeft, ToggleRight,
  Trash2, Edit3, X, Loader2, Truck, AlertCircle, CheckCircle2, Search,
} from "lucide-react";

export default function AdminDeliveryPartnersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [partners, setPartners] = useState<DeliveryPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", timeSlots: [] as string[] });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [assignDate, setAssignDate] = useState(new Date().toISOString().split("T")[0]);
  const [assigning, setAssigning] = useState(false);
  const [assignResult, setAssignResult] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") { router.push("/"); return; }
    fetchPartners();
  }, [user, router]);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const data = await api.getDeliveryPartners();
      setPartners(data.partners);
    } catch {}
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      if (editingId) {
        const { password, ...rest } = form;
        await api.updateDeliveryPartner(editingId, rest);
      } else {
        await api.createDeliveryPartner(form);
      }
      setShowForm(false);
      setEditingId(null);
      resetForm();
      fetchPartners();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save partner");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this delivery partner?")) return;
    try {
      await api.deleteDeliveryPartner(id);
      fetchPartners();
    } catch {}
  };

  const handleToggleActive = async (partner: DeliveryPartner) => {
    try {
      await api.updateDeliveryPartner(partner._id, { active: !partner.active });
      fetchPartners();
    } catch {}
  };

  const handleEdit = (partner: DeliveryPartner) => {
    setEditingId(partner._id);
    setForm({ name: partner.name, email: partner.email, password: "", phone: partner.phone, timeSlots: partner.timeSlots });
    setShowForm(true);
  };

  const handleAssign = async () => {
    setAssigning(true);
    setAssignResult("");
    try {
      const data = await api.assignOrders(assignDate);
      setAssignResult(data.message);
      fetchPartners();
    } catch (err: unknown) {
      setAssignResult(err instanceof Error ? err.message : "Failed to assign orders");
    } finally {
      setAssigning(false);
    }
  };

  const resetForm = () => {
    setForm({ name: "", email: "", password: "", phone: "", timeSlots: [] });
    setEditingId(null);
    setError("");
  };

  const toggleTimeSlot = (slot: string) => {
    setForm((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.includes(slot)
        ? prev.timeSlots.filter((s) => s !== slot)
        : [...prev.timeSlots, slot],
    }));
  };

  const filtered = partners.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search)
  );

  const activeCount = partners.filter((p) => p.active).length;

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
                <Truck size={14} />
                <span>Delivery Management</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-[Poppins] font-bold text-white">Delivery Partners</h1>
              <p className="text-white/60 mt-2">{partners.length} partners · {activeCount} active</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleAssign}
                disabled={assigning}
                className="flex items-center gap-2 bg-green text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-green-dark transition-colors shadow-lg shadow-green/30 disabled:opacity-50"
              >
                {assigning ? <Loader2 size={14} className="animate-spin" /> : <Truck size={14} />}
                Assign Orders
              </button>
              <button
                onClick={() => { resetForm(); setShowForm(true); }}
                className="flex items-center gap-2 bg-sky text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-sky-dark transition-colors shadow-lg shadow-sky/30"
              >
                <Plus size={14} />
                Add Partner
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Assign Orders Panel */}
        <FadeUp>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <Truck size={18} className="text-green" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 block mb-1">Assign Date</label>
                  <input
                    type="date"
                    value={assignDate}
                    onChange={(e) => setAssignDate(e.target.value)}
                    className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-sky/30 focus:border-sky outline-none transition-all"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-400 sm:ml-auto">
                Distributes unassigned orders to active partners based on time slots (round-robin).
              </p>
            </div>
            {assignResult && (
              <div className="mt-3 p-3 rounded-xl bg-green-50 border border-green-100 text-green text-sm font-medium">
                {assignResult}
              </div>
            )}
          </div>
        </FadeUp>

        {/* Search */}
        <FadeUp delay={0.05}>
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

        {/* Partners List */}
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-28 bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <Users size={48} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">No delivery partners found</p>
          </div>
        ) : (
          <StaggerChildren stagger={0.05} className="space-y-4">
            {filtered.map((partner) => (
              <StaggerItem key={partner._id}>
                <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Avatar + Info */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 ${partner.active ? "bg-navy" : "bg-gray-300"}`}>
                        {partner.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-navy text-sm truncate">{partner.name}</p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${partner.active ? "bg-green-50 text-green" : "bg-gray-100 text-gray-400"}`}>
                            {partner.active ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Mail size={11} /> {partner.email}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Phone size={11} /> {partner.phone}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div className="flex items-center gap-2">
                      {partner.timeSlots.includes("morning") && (
                        <span className="flex items-center gap-1 text-xs font-semibold bg-amber-50 text-amber-600 px-3 py-1.5 rounded-lg">
                          <Sun size={12} /> Morning
                        </span>
                      )}
                      {partner.timeSlots.includes("evening") && (
                        <span className="flex items-center gap-1 text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg">
                          <Moon size={12} /> Evening
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleActive(partner)}
                        className={`p-2 rounded-xl transition-colors ${partner.active ? "bg-green-50 text-green hover:bg-green-100" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}`}
                        title={partner.active ? "Deactivate" : "Activate"}
                      >
                        {partner.active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                      </button>
                      <button
                        onClick={() => handleEdit(partner)}
                        className="p-2 rounded-xl bg-sky-50 text-sky hover:bg-sky-100 transition-colors"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(partner._id)}
                        className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        )}
      </div>

      {/* Add/Edit Partner Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-5"
            onClick={() => { setShowForm(false); resetForm(); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-[Poppins] font-bold text-navy text-lg">
                  {editingId ? "Edit Partner" : "Add Delivery Partner"}
                </h3>
                <button onClick={() => { setShowForm(false); resetForm(); }} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                  <X size={18} className="text-gray-400" />
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-2">
                  <AlertCircle size={14} /> {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-navy block mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Raj Kumar"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 focus:bg-white transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-navy block mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="partner@example.com"
                    disabled={!!editingId}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 focus:bg-white transition-all text-sm disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-navy block mb-1.5">
                    Password {editingId && <span className="text-gray-400 font-normal">(leave blank to keep)</span>}
                  </label>
                  <input
                    type="password"
                    required={!editingId}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 focus:bg-white transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-navy block mb-1.5">Phone</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 focus:bg-white transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-navy block mb-2">Time Slots</label>
                  <div className="flex gap-3">
                    {[
                      { key: "morning", label: "Morning (6-10 AM)", icon: Sun, color: "amber" },
                      { key: "evening", label: "Evening (4-8 PM)", icon: Moon, color: "blue" },
                    ].map((slot) => (
                      <button
                        key={slot.key}
                        type="button"
                        onClick={() => toggleTimeSlot(slot.key)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                          form.timeSlots.includes(slot.key)
                            ? slot.color === "amber"
                              ? "border-amber-400 bg-amber-50 text-amber-700"
                              : "border-blue-400 bg-blue-50 text-blue-700"
                            : "border-gray-200 bg-white text-gray-400 hover:border-gray-300"
                        }`}
                      >
                        <slot.icon size={16} />
                        {slot.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); resetForm(); }}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving || form.timeSlots.length === 0}
                    className="flex-1 px-4 py-3 rounded-xl bg-navy text-white font-semibold text-sm hover:bg-navy-dark transition-colors shadow-lg shadow-navy/20 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
                    {editingId ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
