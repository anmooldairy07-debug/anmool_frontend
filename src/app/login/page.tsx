"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Droplets, Shield, Leaf, Truck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding visual */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-navy overflow-hidden items-center justify-center">
        {/* Background gradient orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-sky/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-sky/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green/10 rounded-full blur-3xl" />

        {/* Milk splash SVG decorations */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 600 160" fill="none" preserveAspectRatio="none">
          <path d="M0 100C80 70 160 130 240 100C320 70 400 130 480 100C560 70 600 100 600 100V160H0V100Z" fill="white" fillOpacity="0.06" />
          <path d="M0 120C100 90 200 140 300 110C400 80 500 140 600 110V160H0V120Z" fill="white" fillOpacity="0.04" />
        </svg>

        <div className="relative z-10 text-center px-12 max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-70 h-25 p-6 rounded-2xl bg-white backdrop-blur-sm border border-white/10 mx-auto flex items-center justify-center mb-8">
              <img src="/logo1.png" alt="Anmool" className="w-180 h-150 object-contain rounded-xl" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-[Poppins] font-bold text-white leading-tight mb-4"
          >
            Farm Fresh
            <br />
            <span className="text-sky-light">Dairy Products</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/50 text-base leading-relaxed mb-10"
          >
            Premium quality milk, paneer, ghee and more — delivered fresh from our farms to your doorstep.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-8 text-white/40 text-sm"
          >
            <div className="flex items-center gap-2">
              <Droplets size={16} className="text-sky-light" />
              <span>Pure & Fresh</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-green-light" />
              <span>Trusted Since 1965</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2">
              <Leaf size={16} className="text-green-light" />
              <span>100% Natural</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 bg-gray-300/95">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-60 h-20 rounded-2xl bg-white mx-auto flex items-center justify-center mb-4 shadow-lg shadow-navy/20">
              <img src="/logo1.png" alt="Anmool" className="w-45 h-20 object-contain rounded-lg" />
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-[Poppins] font-bold text-navy mb-2">
              Welcome back
            </h1>
            <p className="text-gray-500 text-sm">
              Sign in to your Anmool Dairy account
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-navy block mb-2">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-navy block mb-2">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 bg-white text-navy placeholder:text-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/10 transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy transition-colors"
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 mb-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-sky focus:ring-sky/20" />
                <span className="text-sm text-gray-500">Remember me</span>
              </label>
              <Link href="#" className="text-sm font-medium text-sky hover:text-sky-dark transition-colors">
                Forgot password?
              </Link>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-navy text-white py-4 rounded-xl font-semibold text-sm hover:bg-navy-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-navy/20 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-sky font-semibold hover:text-sky-dark transition-colors">
                Create one
              </Link>
            </p>

            <div className="mt-4 pt-4 border-t border-gray-200/60">
              <Link
                href="/delivery/login"
                className="flex items-center justify-center gap-2 w-full bg-green text-white py-3 rounded-xl text-sm font-semibold hover:bg-green-dark transition-all shadow-md shadow-green/20"
              >
                <Truck size={16} />
                Delivery Partner Login
              </Link>
            </div>
          </form>

         
        </motion.div>
      </div>
    </div>
  );
}
