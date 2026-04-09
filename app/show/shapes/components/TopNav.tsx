'use client';

import React from 'react';
import { Bookmark, Heart } from 'lucide-react';
import type { ThemeMode } from '../types';

export const TopNav = ({ theme, onToggleTheme }: { theme: ThemeMode; onToggleTheme: () => void }) => (
  <header className="sticky top-0 z-20 border-b border-white/10 bg-black/80 backdrop-blur-xl">
    <div className="flex items-center justify-between px-6 md:px-10 py-4 max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="h-7 w-7 rounded-sm border border-white/15 bg-gradient-to-br from-white/70 via-white/10 to-transparent shadow-[0_0_40px_rgba(255,255,255,0.25)]" />
        <div className="flex flex-col leading-tight">
          <span className="text-xs uppercase tracking-[0.22em] text-[#888888]">
            Spatial Workshop Platform
          </span>
          <span className="text-sm font-semibold tracking-[0.16em] text-[#F5F5F5]">
            SHAPES
          </span>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-[0.22em] text-[#888888]">
        {['Platform', 'Workflow', 'Enterprise', 'Sign in'].map((item) => (
          <button
            key={item}
            className="relative overflow-hidden pb-1 transition-colors hover:text-[#F5F5F5]"
          >
            <span>{item}</span>
            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-linear-to-r from-white via-white/40 to-transparent transition-transform group-hover/nav:scale-x-100" />
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-4 text-xs font-mono text-[#888888]">
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <Heart className="h-3 w-3 fill-[#F5F5F5] text-[#F5F5F5]" />
          <span className="text-[10px] tracking-[0.18em] uppercase text-[#F5F5F5]">143</span>
        </div>


      </div>
    </div>
  </header>
);
