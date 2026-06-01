"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import { navItems } from '@/lib/site-content';

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-white/5 bg-black/35 backdrop-blur-2xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="group flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-neon/40 bg-neon/10 shadow-glow transition duration-300 group-hover:scale-105">
            <Sparkles className="h-5 w-5 text-neon" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg tracking-[0.32em] text-white text-glow">HACK TO NIGHT</span>
            <span className="text-[0.68rem] uppercase tracking-[0.34em] text-cyan-100/55">NSBM FOSS Community</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm uppercase tracking-[0.3em] text-cyan-50/75 transition duration-300 hover:text-neon hover:text-glow"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#register"
            className="rounded-full border border-neon/50 bg-neon/10 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.24em] text-white shadow-glow transition duration-300 hover:-translate-y-0.5 hover:bg-neon/20"
          >
            Register
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neon/25 bg-white/5 text-neon shadow-glow transition hover:bg-white/10 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="overflow-hidden border-t border-white/5 bg-black/65 lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-neon/10 bg-white/5 px-4 py-3 text-sm uppercase tracking-[0.24em] text-cyan-50/80 transition hover:border-neon/40 hover:bg-neon/10 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
