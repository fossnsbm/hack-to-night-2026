import { Facebook, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { footerLinks } from '@/lib/site-content';

const socialIcons = [Github, Instagram, Linkedin, Mail, Facebook];

export function Footer() {
  return (
    <footer className="relative px-4 pb-10 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-neon to-transparent opacity-80" />
        <div className="glass-panel rounded-[2rem] px-6 py-8 sm:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-display text-2xl text-white text-glow">Hack To Night 2026</p>
              <p className="mt-2 text-sm uppercase tracking-[0.4em] text-slate-400">NSBM FOSS Community</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {footerLinks.map((link, index) => {
                const Icon = socialIcons[index] ?? Mail;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-100 transition hover:-translate-y-0.5 hover:border-neon/30 hover:bg-neon/10 hover:text-white hover:shadow-glow"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-white/8 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>Copyright © 2026 Hack To Night. All rights reserved.</p>
            <div className="flex flex-wrap gap-4">
              <span>Built for an immersive conference experience.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
