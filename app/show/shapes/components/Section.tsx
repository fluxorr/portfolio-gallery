'use client';

import React from 'react';

export const Section: React.FC<{
  id?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id, className = '', children }) => (
  <section id={id} className={`relative w-full max-w-6xl mx-auto px-6 md:px-10 ${className}`}>
    {children}
  </section>
);
