"use client"
import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Next.js-style animated multicolor gradient border card.
 * Creates a rotating conic gradient border effect.
 */
export const GlowCard = ({ children, className = "" }: GlowCardProps) => {
  return (
    <div className={`relative group ${className}`}>
      {/* Animated gradient border */}
      <div 
        className="absolute -inset-[1px] rounded-xl opacity-40 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "conic-gradient(from var(--gradient-angle, 0deg), hsl(207 100% 50%), hsl(270 80% 60%), hsl(330 80% 60%), hsl(30 90% 55%), hsl(50 90% 55%), hsl(180 80% 50%), hsl(207 100% 50%))",
          animation: "rotate-gradient 4s linear infinite"
        }}
      />
      
      {/* Inner card content */}
      <div className="relative bg-card rounded-xl h-full">
        {children}
      </div>
    </div>
  );
};
