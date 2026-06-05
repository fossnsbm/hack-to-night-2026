"use client";

import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { stats } from '@/lib/site-content';

const targetDate = new Date('2026-06-19T18:00:00+05:30').getTime();

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
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className ?? ''}`}
      animate={{ opacity: [0.35, 0.8, 0.45], scale: [1, 1.16, 1] }}
      transition={{ duration: 7, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export function Hero() {
  const countdown = useCountdown();

  return (
    <section id="home" className="relative overflow-hidden pt-10 sm:pt-16">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.05)_1px,transparent_1px)] bg-[length:120px_120px] opacity-50 [mask-image:radial-gradient(circle_at_center,black_38%,transparent_100%)] motion-safe:animate-gridMove" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(0,229,255,0.18),transparent_22%),radial-gradient(circle_at_15%_35%,rgba(0,170,255,0.16),transparent_18%),radial-gradient(circle_at_85%_30%,rgba(0,229,255,0.14),transparent_16%)]" />
      <LightOrb className="left-10 top-20 h-72 w-72 bg-neon/18" />
      <LightOrb className="right-8 top-52 h-56 w-56 bg-electric/18" delay={1.2} />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-16 px-4 pb-24 pt-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7 }}
            className="neon-chip inline-flex items-center gap-2"
          >
            <span className="h-2 w-2 rounded-full bg-neon shadow-[0_0_14px_rgba(0,229,255,0.9)]" />
            NSBM FOSS Community Presents
          </motion.div>

          <h1 className="mt-8 font-display text-5xl font-medium uppercase tracking-[0.18em] text-white text-glow sm:text-6xl lg:text-7xl xl:text-8xl">
            <span className="block">Hack To Night</span>
            <motion.span
              animate={{ opacity: [1, 0.82, 1], textShadow: ['0 0 12px rgba(0,229,255,0.55)', '0 0 24px rgba(0,229,255,0.95)', '0 0 12px rgba(0,229,255,0.55)'] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              className="block text-neon"
            >
              2026
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.7 }}
            className="mt-6 max-w-2xl text-xl leading-8 text-cyan-50/80 sm:text-2xl"
          >
            Enter The Grid. Build The Future.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.7 }}
            className="mt-5 max-w-2xl text-lg leading-8 text-cyan-50/65"
          >
            An overnight hackathon where innovators, developers, designers, and creators collaborate to build groundbreaking solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.7 }}
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
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + index * 0.08, duration: 0.6 }}
                className="section-card-soft p-4"
              >
                <div className="font-display text-3xl uppercase tracking-[0.18em] text-neon text-glow">{stat.value}</div>
                <div className="mt-2 text-sm text-cyan-50/65">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.22, duration: 0.8, ease: 'easeOut' }}
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
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-neon via-electric to-cyan-100 shadow-[0_0_18px_rgba(0,229,255,0.65)]"
                    initial={{ width: '28%' }}
                    animate={{ width: ['28%', '72%', '44%', '86%', '28%'] }}
                    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
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
        </motion.div>
      </div>
    </section>
  );
}
