"use client";
import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesMaskBG() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Particles
        id="maskParticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          particles: {
            number: { value: 40, density: { enable: true, area: 800 } },
            color: { 
              value: ["#DC2626", "#2563EB", "#EF4444", "#3B82F6"], 
            },
            size: { value: 8, random: { enable: true, minimumValue: 4 } },
            opacity: { value: 0.5, random: { enable: true, minimumValue: 0.2 } },
            move: {
              enable: true,
              speed: 0.8,
              direction: "none",
              outModes: { default: "out" },
            },
            links: { enable: false },
            shape: {
              type: ["polygon", "circle", "star", "edge"],
              options: {
                polygon: {
                  type: "inline", 
                  scale: 0.5,
                  url: "/path-to-your-svg-mask.svg",  // إذا عندك ملف SVG mask
                },
              },
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "bubble" },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 100,
                size: 10,
                duration: 2,
                opacity: 0.8,
                color: {
                  value: "#DC2626"
                }
              },
            },
          },
          detectRetina: true,
        }}
        className="w-full h-full"
      />
    </div>
  );
}