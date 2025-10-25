"use client";
import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBg() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: {
            enable: false,
          },
          background: {
            color: { value: "transparent" },
          },
          particles: {
            number: { value: 45, density: { enable: true, area: 800 } },
            color: { value: ["#DC2626", "#2563EB"] }, // red and blue
            shape: { type: "circle" },
            opacity: {
              value: 0.6,
              random: { enable: true, minimumValue: 0.3 },
            },
            size: {
              value: 5, // حجم أكبر
              random: { enable: true, minimumValue: 3 },
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              outModes: { default: "out" },
            },
            links: {
              enable: true,
              distance: 150,
              color: "#DC2626", // red links
              opacity: 0.4,
              width: 2, // عرض الخط أكبر
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "grab" },
              onClick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              grab: { 
                distance: 140, 
                links: { 
                  opacity: 0.8,
                  color: "#2563EB" // blue on hover
                } 
              },
              push: { quantity: 4 },
            },
          },
          detectRetina: true,
        }}
        className="w-full h-full"
      />
    </div>
  );
}