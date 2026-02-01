"use client"
import { useEffect, useState } from "react";

/**
 * Next.js-style ambient glow background with:
 * - Slowly drifting radial glow blobs
 * - Subtle grain/noise overlay
 * - Occasional diagonal light sweep
 * - prefers-reduced-motion support
 */
export const AmbientBackground = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (prefersReducedMotion) {
    // Static fallback for reduced motion
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-purple-500/[0.03]" />
        <div className="absolute inset-0 noise-overlay" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Primary glow blob - top right, slowly drifts */}
      <div 
        className="absolute -top-[10%] -right-[5%] w-[50%] h-[50%] rounded-full blur-[100px] opacity-30 animate-drift-slow"
        style={{
          background: "radial-gradient(circle, hsl(207 100% 50%) 0%, transparent 70%)"
        }}
      />
      
      {/* Purple glow blob - center left, offset drift */}
      <div 
        className="absolute top-[40%] -left-[10%] w-[45%] h-[45%] rounded-full blur-[90px] opacity-25 animate-drift-slow-reverse"
        style={{
          background: "radial-gradient(circle, hsl(270 80% 60%) 0%, transparent 70%)"
        }}
      />
      
      {/* Cyan glow blob - bottom right */}
      <div 
        className="absolute -bottom-[5%] right-[15%] w-[35%] h-[35%] rounded-full blur-[80px] opacity-20 animate-drift-slow-delayed"
        style={{
          background: "radial-gradient(circle, hsl(180 80% 50%) 0%, transparent 70%)"
        }}
      />

      {/* Diagonal light sweep - subtle, occasional */}
      <div className="absolute inset-0 animate-sweep-diagonal">
        <div 
          className="absolute inset-0 opacity-[0.06]"
          style={{
            background: "linear-gradient(135deg, transparent 0%, transparent 40%, hsl(0 0% 100% / 0.6) 50%, transparent 60%, transparent 100%)",
            backgroundSize: "200% 200%"
          }}
        />
      </div>

      {/* Grain/noise overlay */}
      <div className="absolute inset-0 noise-overlay opacity-30" />
    </div>
  );
};
