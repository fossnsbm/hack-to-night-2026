"use client";

import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export function BackgroundEffects() {
  const progressRef = useRef<HTMLDivElement | null>(null);
  const orbLeftRef = useRef<HTMLDivElement | null>(null);
  const orbRightRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      if (!progressRef.current) {
        return;
      }

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

      gsap.to(progressRef.current, {
        scaleX: ratio,
        duration: 0.18,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMove = (event: PointerEvent) => {
      if (!cursorRef.current) {
        return;
      }

      gsap.to(cursorRef.current, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.3,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    updateProgress();
    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('scroll', updateProgress, { passive: true });

    const leftTween = orbLeftRef.current
      ? gsap.to(orbLeftRef.current, {
          keyframes: [
            { x: 0, y: 0 },
            { x: 80, y: -30 },
            { x: -30, y: 40 },
            { x: 0, y: 0 }
          ],
          duration: 18,
          repeat: -1,
          ease: 'sine.inOut'
        })
      : null;

    const rightTween = orbRightRef.current
      ? gsap.to(orbRightRef.current, {
          keyframes: [
            { x: 0, y: 0 },
            { x: -90, y: 40 },
            { x: 40, y: -20 },
            { x: 0, y: 0 }
          ],
          duration: 24,
          repeat: -1,
          ease: 'sine.inOut'
        })
      : null;

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('scroll', updateProgress);
      leftTween?.kill();
      rightTween?.kill();
    };
  }, []);

  return (
    <>
      <div
        ref={progressRef}
        className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-neon via-electric to-transparent"
      />
      <div
        ref={orbLeftRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-0 h-[42rem] w-[42rem] rounded-full bg-neon/10 blur-3xl"
      />
      <div
        ref={orbRightRef}
        aria-hidden="true"
        className="pointer-events-none fixed right-0 top-1/3 z-0 h-[28rem] w-[28rem] rounded-full bg-electric/10 blur-3xl"
      />
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.24)_0%,rgba(0,229,255,0.1)_24%,transparent_72%)] blur-2xl"
      />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] opacity-20 mix-blend-screen [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:36px_36px]" />
    </>
  );
}
