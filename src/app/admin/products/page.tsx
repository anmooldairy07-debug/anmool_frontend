"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Product } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, StaggerChildren, StaggerItem } from "@/components/motion/Animations";
import {
  Plus, Pencil, Trash2, X, Save, Search, Package, Filter,
  ChevronLeft, Image as ImageIcon, Tag, BoxSelect,
} from "lucide-react";

const categories = ["All", "Ghee", "Milk", "Paneer", "Curd", "Butter", "Beverages", "Eco Products"];
const emptyProduct = { name: "", description: "", longDescription: "", price: 0, image: "", category: "Milk", weight: "", badge: "", features: "", inStock: true };

export default function AdminProductsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>(emptyProduct);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.role !== "admin") { router.push("/"); return; }
    loadProducts();
  }, [user, router]);

  const loadProducts = () => {
    setLoading(true);
    api.getProducts().then((d) => { setProducts(d.products); setLoading(false); }).catch(() => setLoading(false));
  };

  const openNew = () => { setForm({ ...emptyProduct, features: "" }); setEditingId(null); setShowForm(true); };
  const openEdit = (p: Product) => {
    setForm({ ...p, features: p.features.join(", ") });
    setEditingId(p._id);
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = { ...form, features: (form.features as string).split(",").map((f: string) => f.trim()).filter(Boolean) };
      if (editingId) {
        await api.updateProduct(editingId, body);
      } else {
        await api.createProduct(body);
      }
      setShowForm(false);
      loadProducts();
    } catch {}
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = async (id: string) => {
    await api.deleteProduct(id);
    setDeletingId(null);
    loadProducts();
  };

  const update = (field: string, value: unknown) => setForm((prev) => ({ ...prev, [field]: value }));

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "All" || p.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const inStockCount = products.filter((p) => p.inStock).length;
  const outOfStockCount = products.filter((p) => !p.inStock).length;

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
                <Package size={14} />
                <span>Products Management</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-[Poppins] font-bold text-white">Manage Products</h1>
              <p className="text-white/60 mt-2">{products.length} total products · {inStockCount} in stock · {outOfStockCount} out of stock</p>
            </div>
            <button onClick={openNew} className="flex items-center gap-2 bg-sky text-white px-6 py-3 rounded-xl font-bold hover:bg-sky-dark transition-colors shadow-lg shadow-sky/30 group">
              <Plus size={18} className="group-hover:rotate-90 transition-transform" />
              Add Product
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Filters */}
        <FadeUp>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 transition-all text-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategoryFilter(c)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    categoryFilter === c
                      ? "bg-navy text-white shadow-md"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-sky hover:text-sky"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Products Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <Package size={48} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">No products found</p>
            <p className="text-gray-300 text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <StaggerChildren stagger={0.05} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <StaggerItem key={p._id}>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 group">
                  {/* Image */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon size={32} className="text-gray-300" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {p.badge && (
                        <span className="bg-navy text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className={`text-[10px font-bold px-2.5 py-1 rounded-full ${p.inStock ? "bg-green text-white" : "bg-red-500 text-white"}`}>
                        {p.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-navy text-base">{p.name}</h3>
                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                          <Tag size={10} />
                          {p.category} · {p.weight}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-navy">₹{p.price}</p>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">{p.description}</p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-sky hover:text-sky hover:bg-sky-50 transition-all"
                      >
                        <Pencil size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-200 text-sm font-medium text-red-500 hover:border-red-300 hover:bg-red-50 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deletingId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setDeletingId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-sm p-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-14 h-14 rounded-full bg-red-50 mx-auto flex items-center justify-center mb-4">
                <Trash2 size={24} className="text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">Delete Product?</h3>
              <p className="text-gray-500 text-sm mb-6">This action cannot be undone. The product will be permanently removed.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeletingId(null)}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => confirmDelete(deletingId)}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div>
                  <h2 className="text-lg font-[Poppins] font-bold text-navy">{editingId ? "Edit Product" : "Add New Product"}</h2>
                  <p className="text-sm text-gray-400 mt-0.5">{editingId ? "Update product details" : "Fill in the product information"}</p>
                </div>
                <button onClick={() => setShowForm(false)} className="p-2 text-gray-400 hover:text-navy rounded-xl hover:bg-gray-100 transition-colors">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-semibold text-navy block mb-2">Product Name *</label>
                  <input required value={form.name as string} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Fresh Whole Milk"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 focus:bg-white transition-all text-sm" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-navy block mb-2">Short Description *</label>
                  <input required value={form.description as string} onChange={(e) => update("description", e.target.value)} placeholder="Brief description for product cards"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 focus:bg-white transition-all text-sm" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-navy block mb-2">Long Description</label>
                  <textarea value={form.longDescription as string} onChange={(e) => update("longDescription", e.target.value)} rows={3} placeholder="Detailed product description..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 focus:bg-white transition-all text-sm resize-none" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-navy block mb-2">Price (₹) *</label>
                    <input required type="number" min="0" value={form.price as number} onChange={(e) => update("price", Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-navy focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 focus:bg-white transition-all text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-navy block mb-2">Weight *</label>
                    <input required value={form.weight as string} onChange={(e) => update("weight", e.target.value)} placeholder="e.g. 500ml, 1kg"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 focus:bg-white transition-all text-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-navy block mb-2">Category *</label>
                    <select value={form.category as string} onChange={(e) => update("category", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-navy focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 focus:bg-white transition-all text-sm">
                      {categories.filter((c) => c !== "All").map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-navy block mb-2">Badge</label>
                    <select value={form.badge as string} onChange={(e) => update("badge", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-navy focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 focus:bg-white transition-all text-sm">
                      <option value="">None</option>
                      <option value="bestseller">Bestseller</option>
                      <option value="new">New</option>
                      <option value="organic">Organic</option>
                      <option value="premium">Premium</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-navy block mb-2">Image URL</label>
                  <input value={form.image as string} onChange={(e) => update("image", e.target.value)} placeholder="/images/products/..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 focus:bg-white transition-all text-sm" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-navy block mb-2">Features (comma-separated)</label>
                  <input value={form.features as string} onChange={(e) => update("features", e.target.value)} placeholder="100% Natural, Farm Fresh, ..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 focus:bg-white transition-all text-sm" />
                </div>
                <div className="flex gap-3 pt-3">
                  <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
                  <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 bg-navy text-white py-3 rounded-xl font-semibold hover:bg-navy-dark transition-colors disabled:opacity-50 shadow-lg shadow-navy/20">
                    <Save size={16} /> {saving ? "Saving..." : editingId ? "Update Product" : "Create Product"}
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
