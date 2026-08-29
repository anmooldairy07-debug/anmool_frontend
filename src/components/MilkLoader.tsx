"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MilkLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLoading(true);
    setProgress(0);
  }, [pathname]);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return prev + 3;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [loading]);

  if (!loading && progress === 0) return null;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const fillHeight = (progress / 100) * 176;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-gray-300/95 backdrop-blur-sm transition-opacity duration-300"
      style={{ opacity: loading ? 1 : 0, pointerEvents: loading ? "auto" : "none" }}
    >
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative w-44 h-44 flex items-center justify-center">
          {/* Circular progress ring */}
          <svg
            className="absolute inset-0 -rotate-90"
            width="176"
            height="176"
            viewBox="0 0 176 176"
          >
            <circle cx="88" cy="88" r={radius} fill="none" stroke="#f0ebe3" strokeWidth="5" />
            <circle
              cx="88"
              cy="88"
              r={radius}
              fill="none"
              stroke="url(#milkGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: "stroke-dashoffset 0.025s linear" }}
            />
            <defs>
              <linearGradient id="milkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f5e6c8" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e8dcc8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Liquid fill inside circle */}
          <svg
            className="absolute inset-0"
            width="176"
            height="176"
            viewBox="0 0 176 176"
          >
            <defs>
              <clipPath id="loaderClip">
                <circle cx="88" cy="88" r="82" />
              </clipPath>
            </defs>
            <g clipPath="url(#loaderClip)">
              <rect
                x="0"
                y={176 - fillHeight}
                width="176"
                height={fillHeight}
                fill="rgba(255,255,255,0.95)"
              />
            </g>
          </svg>

          {/* Wave overlay */}
          <div
            className="absolute bottom-0 left-0 w-full rounded-full overflow-hidden pointer-events-none"
            style={{ height: `${(progress / 100) * 100}%`, transition: "height 0.025s linear" }}
          >
            <svg
              className="absolute top-0 left-0 w-full"
              style={{ transform: "translateY(-50%)" }}
              viewBox="0 0 176 20"
              preserveAspectRatio="none"
            >
              <path
                d="M0,10 C30,0 50,20 88,10 C126,0 146,20 176,10 L176,20 L0,20 Z"
                fill="rgba(255,255,255,0.9)"
                className="animate-wave"
              />
              <path
                d="M0,12 C40,2 60,20 88,12 C116,4 136,20 176,12 L176,20 L0,20 Z"
                fill="rgba(245,230,200,0.6)"
                className="animate-wave-slow"
              />
            </svg>
          </div>

          {/* Loader bottle image */}
          <img
            src="/loader.png"
            alt="Loading..."
            className="relative z-10 w-28 h-28 object-contain drop-shadow-lg"
          />
        </div>

        <p className="text-sm font-medium tracking-widest text-[#8B7355] animate-pulse">
          Pouring Milk...
        </p>
      </div>
    </div>
  );
}
