"use client";

import gsap from 'gsap';
import { RefObject, useEffect } from 'react';

type RevealOptions = {
  selector?: string;
  y?: number;
  duration?: number;
  stagger?: number;
  threshold?: number;
  delay?: number;
  includeRoot?: boolean;
};

export function useGsapReveal<T extends HTMLElement>(ref: RefObject<T | null>, options: RevealOptions = {}) {
  useEffect(() => {
    const root = ref.current;

    if (!root) {
      return;
    }

    const selector = options.selector ?? '[data-gsap-reveal]';
    const targets = Array.from(root.querySelectorAll<HTMLElement>(selector));

    if (options.includeRoot) {
      targets.unshift(root);
    }

    if (targets.length === 0) {
      return;
    }

    const y = options.y ?? 24;

    gsap.set(targets, { opacity: 0, y });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: options.duration ?? 0.7,
          ease: 'power2.out',
          stagger: options.stagger ?? 0.08,
          delay: options.delay ?? 0,
        });
        observer.disconnect();
      },
      { threshold: options.threshold ?? 0.2 }
    );

    observer.observe(root);

    return () => {
      observer.disconnect();
    };
  }, [options.delay, options.duration, options.includeRoot, options.selector, options.stagger, options.threshold, options.y, ref]);
}