"use client";

import { useRef } from 'react';
import { useGsapReveal } from '@/lib/use-gsap-reveal';

export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  const headingRef = useRef<HTMLDivElement | null>(null);

  useGsapReveal(headingRef, { includeRoot: true, y: 22, duration: 0.7, threshold: 0.3 });

  return (
    <div
      ref={headingRef}
      className="mx-auto max-w-3xl text-center"
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.5em] text-neon/80">{eyebrow}</p>
      <h2 className="font-display text-3xl text-white text-glow sm:text-4xl lg:text-5xl">{title}</h2>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{description}</p>
    </div>
  );
}
