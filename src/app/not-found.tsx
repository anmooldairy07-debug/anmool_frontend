"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12">
      <div className="text-center px-5">
        <p className="text-8xl font-bold text-primary/10">404</p>
        <h1 className="text-3xl font-bold text-primary mt-4">Page not found</h1>
        <p className="text-body/50 mt-2">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-light transition-colors mt-6">
          <ArrowRight size={16} /> Back to Home
        </Link>
      </div>
    </div>
  );
}
