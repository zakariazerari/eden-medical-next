// FloatingBubblesBg.jsx
"use client";
import React from "react";

export default function FloatingBubblesBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 8 }).map((_, i) => {
        const size = Math.random() * 60 + 30; // 30-90px
        const left = Math.random() * 100;
        const duration = Math.random() * 8 + 8; // 8-16s
        const delay = Math.random() * 5;
        const bgColors = [
          "bg-violet-200",
          "bg-indigo-200",
          "bg-blue-200",
          "bg-violet-100",
        ];
        const bg = bgColors[Math.floor(Math.random() * bgColors.length)];

        return (
          <div
            key={i}
            className={`absolute rounded-full opacity-40 ${bg}`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              bottom: `-30%`,
              animation: `floatUp ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          30% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-120vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
