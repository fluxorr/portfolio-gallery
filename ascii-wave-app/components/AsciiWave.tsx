'use client';

import { useEffect, useRef, useState } from 'react';


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
  const pointerRef = useRef({ x: -1000, y: -1000, active: false });

  const clamp = (value: number, min: number, max: number) => {
    return Math.min(max, Math.max(min, value));
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const styles = window.getComputedStyle(canvasRef.current);
        const fontSize = parseFloat(styles.fontSize) || 12;
        const letterSpacing = parseFloat(styles.letterSpacing) || 0;
        const lineHeight = parseFloat(styles.lineHeight) || fontSize * 1.4;

        // Use rendered text metrics so pointer mapping aligns with visible glyphs.
        const charWidth = Math.max(1, fontSize * 0.62 + letterSpacing);
        const charHeight = Math.max(1, lineHeight);
        const width = Math.floor(window.innerWidth / charWidth);
        const height = Math.floor(window.innerHeight / charHeight);
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    const updatePointer = (clientX: number, clientY: number) => {
      const element = canvasRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const relativeX = clientX - rect.left;
      const relativeY = clientY - rect.top;
      const x = (relativeX / rect.width) * (dimensions.width - 1);
      const y = (relativeY / rect.height) * (dimensions.height - 1);

      pointerRef.current = { x, y, active: true };
    };

    const handlePointerMove = (event: PointerEvent) => {
      updatePointer(event.clientX, event.clientY);
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };

    const handlePointerCancel = () => {
      pointerRef.current.active = false;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('pointercancel', handlePointerCancel);

    // Keep a stable hover point when dimensions change.
    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      updatePointer(touch.clientX, touch.clientY);
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('pointercancel', handlePointerCancel);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [dimensions.height, dimensions.width]);

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


    const noise = (x: number) => {
      const noiseMap = noiseMapRef.current;
      const scale = 0.05;
      const scaledX = x * scale;
      const index = Math.floor(scaledX) % noiseMap.length;
      const nextIndex = (index + 1) % noiseMap.length;
      const t = scaledX - Math.floor(scaledX);


      const smoothT = t * t * (3 - 2 * t);
      return noiseMap[index] * (1 - smoothT) + noiseMap[nextIndex] * smoothT;
    };

    const animate = () => {
      if (!canvasRef.current) return;

      const { width, height } = dimensions;
      let output = '';
      const pointer = pointerRef.current;

      for (let y = 0; y < height; y++) {

        for (let x = 0; x < width; x++) {

          const wave1 = Math.sin((x * 0.08) + (frame * 0.03)) * 4;
          const wave2 = Math.sin((x * 0.12) + (frame * 0.05) + 2) * 3;

          const wave3 = Math.cos((x * 0.06) + (frame * 0.04) + 4) * 3.5;


          const noise1 = noise(x + frame * 0.5) * 5;
          const noise2 = noise(x * 2 + frame * 0.3 + 100) * 3;
          const noise3 = noise(x * 0.5 + frame * 0.7 + 200) * 4;


          const ampMod = 1 + noise(x * 0.1 + frame * 0.2 + 300) * 0.5;


          let combinedWave = (wave1 + wave2 + wave3) * ampMod + noise1 + noise2 + noise3;
          let hoverDistance = Number.POSITIVE_INFINITY;

          if (pointer.active) {
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            hoverDistance = Math.sqrt(dx * dx + dy * dy);

            const hoverRadius = 14;
            if (hoverDistance < hoverRadius) {
              const hoverFalloff = 1 - hoverDistance / hoverRadius;
              const hoverDistortion = Math.sin(hoverDistance * 1.15 - frame * 0.28) * hoverFalloff;
              combinedWave += hoverDistortion * 8;
            }
          }

          const waveY = (height / 2) + combinedWave;


          const distance = Math.abs(y - waveY);


          let turbulence = noise(x * 0.3 + y * 0.2 + frame * 0.15) * 2;

          if (pointer.active && Number.isFinite(hoverDistance) && hoverDistance < 5) {
            const nearPointerBoost = 1 - hoverDistance / 5;
            turbulence += nearPointerBoost * 3.2;
          }

          const adjustedDistance = distance + turbulence;


          const particleNoise = noise(x * 0.5 + y * 0.4 + frame * 0.2 + 400);
          const shouldShowParticle = particleNoise > 0.7 && adjustedDistance < 8;


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
