"use client";
import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ContactSnowTwinkleBG() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Particles
        id="contactParticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          particles: {
            number: { value: 60, density: { enable: true, area: 800 } },
            color: { value: "#8b5cf6" }, // بنفسجي
            size: { value: 4, random: { enable: true, minimumValue: 1 } },
            opacity: { value: 0.6, random: true },
            move: {
              enable: true,
              speed: 0.6,
              direction: "bottom",
              outModes: { default: "out" },
            },
            shape: { type: "circle" },
          },
          interactivity: {
            events: {
              onHover: { enable: false },
              resize: true,
            },
          },
          detectRetina: true,
        }}
        className="w-full h-full"
      />
    </div>
  );
}