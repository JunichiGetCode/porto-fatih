"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Disable scroll during loading
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              setLoading(false);
              document.body.style.overflow = "unset";
            }, 800); // Wait for transition to complete
          }, 400); // Short pause at 100%
          return 100;
        }
        // Custom increment to make it feel natural
        const increment = Math.floor(Math.random() * 15) + 5;
        return Math.min(100, prev + increment);
      });
    }, 80);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-surface-950 transition-all duration-700 ease-in-out ${
        fadeOut ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_60%)] pointer-events-none" />

      {/* Main Logo Container */}
      <div className="relative mb-8 text-center animate-pulse">
        <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-wider">
          <span className="text-primary-400">&lt;</span>
          <span className="text-white">Fatih</span>
          <span className="text-accent-400">/</span>
          <span className="text-primary-400">&gt;</span>
        </h2>
        <p className="text-surface-200/40 text-xs tracking-widest uppercase mt-2 font-light">
          Initializing Portfolio
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="w-64 max-w-[80vw] h-[2px] bg-white/5 rounded-full overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-primary-500 via-accent-400 to-primary-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage Text */}
      <div className="mt-4 text-sm font-mono font-semibold text-primary-300">
        {progress}%
      </div>
    </div>
  );
}
