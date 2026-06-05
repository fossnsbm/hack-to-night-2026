"use client";

import gsap from 'gsap';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { stats } from '@/lib/site-content';

const targetDate = new Date('2026-12-12T18:00:00+05:30').getTime();

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(() => targetDate - Date.now());

  useEffect(() => {
    const update = () => setTimeLeft(targetDate - Date.now());
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return useMemo(() => {
    const safeValue = Math.max(0, timeLeft);
    const seconds = Math.floor((safeValue / 1000) % 60);
    const minutes = Math.floor((safeValue / (1000 * 60)) % 60);
    const hours = Math.floor((safeValue / (1000 * 60 * 60)) % 24);
    const days = Math.floor(safeValue / (1000 * 60 * 60 * 24));
    return [
      { label: 'Days', value: days.toString().padStart(2, '0') },
      { label: 'Hours', value: hours.toString().padStart(2, '0') },
      { label: 'Mins', value: minutes.toString().padStart(2, '0') },
      { label: 'Secs', value: seconds.toString().padStart(2, '0') }
    ];
  }, [timeLeft]);
}

function LightOrb({ className, delay = 0 }: { className?: string; delay?: number }) {
  const orbRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!orbRef.current) {
      return;
    }

    const tween = gsap.to(orbRef.current, {
      keyframes: [
        { opacity: 0.35, scale: 1 },
        { opacity: 0.8, scale: 1.16 },
        { opacity: 0.45, scale: 1 }
      ],
      duration: 7,
      delay,
      repeat: -1,
      ease: 'sine.inOut'
    });

    return () => {
      tween.kill();
    };
  }, [delay]);

  return (
    <div
      ref={orbRef}
      className={`absolute rounded-full blur-3xl ${className ?? ''}`}
    />
  );
}

export function Hero() {
  const countdown = useCountdown();
  const introRef = useRef<HTMLDivElement | null>(null);
  const chipRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const leadRef = useRef<HTMLParagraphElement | null>(null);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const yearRef = useRef<HTMLSpanElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const statRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });
    const statCards = statRefs.current.filter(Boolean);

    timeline.fromTo(introRef.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.8 }, 0);
    timeline.fromTo(chipRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.1);
    timeline.fromTo(titleRef.current, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.75 }, 0.2);
    timeline.fromTo(leadRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, 0.32);
    timeline.fromTo(bodyRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, 0.4);
    timeline.fromTo(actionsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.48);
    timeline.fromTo(statCards, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.56);
    timeline.fromTo(panelRef.current, { opacity: 0, y: 26, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.8 }, 0.22);

    const yearTween = gsap.to(yearRef.current, {
      keyframes: [
        { opacity: 1, textShadow: '0 0 12px rgba(0,229,255,0.55)' },
        { opacity: 0.82, textShadow: '0 0 24px rgba(0,229,255,0.95)' },
        { opacity: 1, textShadow: '0 0 12px rgba(0,229,255,0.55)' }
      ],
      duration: 4.8,
      repeat: -1,
      ease: 'sine.inOut'
    });

    const progressTween = gsap.to(progressFillRef.current, {
      keyframes: [
        { width: '28%' },
        { width: '72%' },
        { width: '44%' },
        { width: '86%' },
        { width: '28%' }
      ],
      duration: 9,
      repeat: -1,
      ease: 'sine.inOut'
    });

    return () => {
      timeline.kill();
      yearTween.kill();
      progressTween.kill();
    };
  }, []);

  return (
    <section id="home" className="relative overflow-hidden pt-10 sm:pt-16">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.05)_1px,transparent_1px)] bg-[length:120px_120px] opacity-50 [mask-image:radial-gradient(circle_at_center,black_38%,transparent_100%)] motion-safe:animate-gridMove" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(0,229,255,0.18),transparent_22%),radial-gradient(circle_at_15%_35%,rgba(0,170,255,0.16),transparent_18%),radial-gradient(circle_at_85%_30%,rgba(0,229,255,0.14),transparent_16%)]" />
      <LightOrb className="left-10 top-20 h-72 w-72 bg-neon/18" />
      <LightOrb className="right-8 top-52 h-56 w-56 bg-electric/18" delay={1.2} />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-16 px-4 pb-24 pt-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
        <div ref={introRef} className="max-w-3xl">
          <div ref={chipRef} className="neon-chip inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-neon shadow-[0_0_14px_rgba(0,229,255,0.9)]" />
            NSBM FOSS Community Presents
          </div>

          <h1 className="mt-8 font-display text-5xl font-medium uppercase tracking-[0.18em] text-white text-glow sm:text-6xl lg:text-7xl xl:text-8xl">
            <span className="block">Hack To Night</span>
            <span
              ref={yearRef}
              className="block text-neon"
            >
              2026
            </span>
          </h1>

          <p
            ref={leadRef}
            className="mt-6 max-w-2xl text-xl leading-8 text-cyan-50/80 sm:text-2xl"
          >
            Enter The Grid. Build The Future.
          </p>

          <p
            ref={bodyRef}
            className="mt-5 max-w-2xl text-lg leading-8 text-cyan-50/65"
          >
            An overnight hackathon where innovators, developers, designers, and creators collaborate to build groundbreaking solutions.
          </p>

          <div
            ref={actionsRef}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#register"
              className="neon-button"
            >
              Register Now
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#about"
              className="neon-button-secondary"
            >
              Learn More
              <PlayCircle className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                ref={(element) => {
                  statRefs.current[index] = element;
                }}
                className="section-card-soft p-4"
              >
                <div className="font-display text-3xl uppercase tracking-[0.18em] text-neon text-glow">{stat.value}</div>
                <div className="mt-2 text-sm text-cyan-50/65">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={panelRef}
          className="relative"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.18),transparent_55%)] blur-2xl" />
          <div className="section-card relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent opacity-70" />
            <div className="absolute left-8 top-8 h-24 w-24 rounded-full border border-neon/20" />
            <div className="absolute right-10 top-12 h-14 w-14 rounded-full border border-electric/30" />
            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)] opacity-20 motion-safe:animate-scan" />

            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-[0.36em] text-cyan-50/55">Countdown to ignition</p>
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {countdown.map((item) => (
                  <div key={item.label} className="section-card-soft px-4 py-6 text-center shadow-inner shadow-neon/10">
                    <div className="font-display text-4xl text-white text-glow sm:text-5xl">{item.value}</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.34em] text-cyan-100/50">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between text-sm uppercase tracking-[0.28em] text-cyan-50/60">
                  <span>Live Grid Status</span>
                  <span className="text-neon">Operational</span>
                </div>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/5">
                  <div
                    ref={progressFillRef}
                    className="h-full rounded-full bg-gradient-to-r from-neon via-electric to-cyan-100 shadow-[0_0_18px_rgba(0,229,255,0.65)]"
                  />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs uppercase tracking-[0.28em] text-cyan-50/55">
                  <div className="section-card-soft px-3 py-3">Design</div>
                  <div className="section-card-soft px-3 py-3">Build</div>
                  <div className="section-card-soft px-3 py-3">Deploy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
