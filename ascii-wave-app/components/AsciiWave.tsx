'use client';

import { useEffect, useRef, useState } from 'react';

// Seeded random number generator for consistent randomness
class Random {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

export default function AsciiWave() {
  const canvasRef = useRef<HTMLPreElement>(null);
  const [dimensions, setDimensions] = useState({ width: 80, height: 20 });
  const noiseMapRef = useRef<number[]>([]);

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const charWidth = 4.5; // Smaller characters
        const charHeight = 9; // Smaller characters
        const width = Math.floor(window.innerWidth / charWidth);
        const height = Math.floor(window.innerHeight / charHeight);
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const chars = [' ', '.', ':', '-', '=', '+', '*', '#', 'd', 'p'];
    let frame = 0;

    // Generate noise map for randomness
    const random = new Random(12345);
    const noiseSize = 500;
    const noiseMap: number[] = [];
    for (let i = 0; i < noiseSize; i++) {
      noiseMap.push(random.next() * 2 - 1); // -1 to 1
    }
    noiseMapRef.current = noiseMap;

    // Perlin-like noise function
    const noise = (x: number) => {
      const noiseMap = noiseMapRef.current;
      const scale = 0.05;
      const scaledX = x * scale;
      const index = Math.floor(scaledX) % noiseMap.length;
      const nextIndex = (index + 1) % noiseMap.length;
      const t = scaledX - Math.floor(scaledX);

      // Smooth interpolation
      const smoothT = t * t * (3 - 2 * t);
      return noiseMap[index] * (1 - smoothT) + noiseMap[nextIndex] * smoothT;
    };

    const animate = () => {
      if (!canvasRef.current) return;

      const { width, height } = dimensions;
      let output = '';

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          // Base sine waves with different frequencies
          const wave1 = Math.sin((x * 0.08) + (frame * 0.03)) * 4;
          const wave2 = Math.sin((x * 0.12) + (frame * 0.05) + 2) * 3;
          const wave3 = Math.cos((x * 0.06) + (frame * 0.04) + 4) * 3.5;

          // Add chaotic randomness using multiple noise layers
          const noise1 = noise(x + frame * 0.5) * 5;
          const noise2 = noise(x * 2 + frame * 0.3 + 100) * 3;
          const noise3 = noise(x * 0.5 + frame * 0.7 + 200) * 4;

          // Random amplitude modulation
          const ampMod = 1 + noise(x * 0.1 + frame * 0.2 + 300) * 0.5;

          // Combine everything for chaotic but wave-like motion
          const combinedWave = (wave1 + wave2 + wave3) * ampMod + noise1 + noise2 + noise3;
          const waveY = (height / 2) + combinedWave;

          // Calculate distance from wave
          const distance = Math.abs(y - waveY);

          // Random turbulence
          const turbulence = noise(x * 0.3 + y * 0.2 + frame * 0.15) * 2;
          const adjustedDistance = distance + turbulence;

          // Add random particles and splashes
          const particleNoise = noise(x * 0.5 + y * 0.4 + frame * 0.2 + 400);
          const shouldShowParticle = particleNoise > 0.7 && adjustedDistance < 8;

          // Determine character based on distance with more variation
          let charIndex;
          if (adjustedDistance < 0.8) {
            charIndex = chars.length - 1;
          } else if (adjustedDistance < 2) {
            charIndex = chars.length - 2;
          } else if (adjustedDistance < 3.5) {
            charIndex = chars.length - 3;
          } else if (adjustedDistance < 5) {
            charIndex = chars.length - 4;
          } else if (adjustedDistance < 7) {
            charIndex = chars.length - 5;
          } else if (shouldShowParticle) {
            charIndex = Math.floor(chars.length / 2) + Math.floor(particleNoise * 3);
          } else {
            charIndex = 0;
          }

          output += chars[charIndex];
        }
        output += '\n';
      }

      canvasRef.current.textContent = output;
      frame++;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [dimensions]);

  return (
    <pre
      ref={canvasRef}
      className="fixed flex items-center justify-center inset-0 m-0 p-0 w-screen h-screen overflow-hidden font-mono text-xs text-neutral-500 select-none pointer-events-none"
      style={{
        fontFamily: 'monospace',
        letterSpacing: '0.2em',
        lineHeight: '1.5',
      }}
    />
  );
}
