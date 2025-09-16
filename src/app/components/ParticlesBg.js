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
            color: { value: "#8b5cf6" }, // violet
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
              color: "#8b5cf6",
              opacity: 0.6,
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
              grab: { distance: 140, links: { opacity: 0.8 } },
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