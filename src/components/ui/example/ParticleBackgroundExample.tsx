"use client";

import React from "react";
import { ParticleBackground } from "@/components/animated/ParticleBackground";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export const DefaultParticleBackgroundExample = () => {
  const defaultParticleBackgroundCode = `
import { ParticleBackground } from "@/components/ui/ParticleBackground";

export const DefaultParticleBackgroundExample = () => {
  return (
    <div className="relative h-96 w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <ParticleBackground particleCount={25} />

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center p-8">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Beautiful Particle Animation
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-md">
            Animated background particles that create a dynamic and engaging
            visual experience
          </p>
        </div>
      </div>
    </div>
  );
};
`;

  return (
    <SnippetPreview
      title="Particle Background"
      code={defaultParticleBackgroundCode}
    >
      <div className="relative h-96 w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <ParticleBackground particleCount={25} />

        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center p-8">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Beautiful Particle Animation
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-md">
              Animated background particles that create a dynamic and engaging
              visual experience
            </p>
          </div>
        </div>
      </div>
    </SnippetPreview>
  );
};

export const CustomColorsExample = () => {
  const customColorsCode = `
import { ParticleBackground } from "@/components/ui/ParticleBackground";

export const CustomColorsExample = () => {
  return (
    <div className="relative h-80 w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <ParticleBackground
        particleCount={30}
        colors={["#f59e0b", "#ef4444", "#10b981"]}
        speed="fast"
        size="lg"
        blur={false}
      />

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center p-6">
          <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Customized Particles
          </h4>
          <p className="text-gray-600 dark:text-gray-300">
            Warm colors, fast movement, larger size, no blur
          </p>
        </div>
      </div>
    </div>
  );
};
`;

  return (
    <SnippetPreview title="Custom Colors & Speed" code={customColorsCode}>
      <div className="relative h-80 w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <ParticleBackground
          particleCount={30}
          colors={["#f59e0b", "#ef4444", "#10b981"]}
          speed="fast"
          size="lg"
          blur={false}
        />

        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center p-6">
            <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Customized Particles
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Warm colors, fast movement, larger size, no blur
            </p>
          </div>
        </div>
      </div>
    </SnippetPreview>
  );
};
