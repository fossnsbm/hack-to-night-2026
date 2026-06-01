"use client";

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/section-heading';
import { eventFeatures } from '@/lib/site-content';

export function EventSection() {
  return (
    <section id="event" className="relative px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="About The Event"
          title="About Hack To Night"
          description="Six futuristic feature zones define the hackathon flow, combining collaboration, competition, and premium event energy."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {eventFeatures.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              whileHover={{ y: -8 }}
              className="glass-panel neon-border group relative overflow-hidden rounded-[1.75rem] p-6"
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,229,255,0.14),transparent_34%),radial-gradient(circle_at_top_right,rgba(0,170,255,0.14),transparent_26%)] opacity-70 transition duration-300 group-hover:opacity-100" />
              <div className="relative flex h-full flex-col">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-neon/30 bg-neon/10 text-neon shadow-glow">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-2xl text-white text-glow">{feature.title}</h3>
                <p className="mt-4 flex-1 text-base leading-8 text-slate-300">{feature.description}</p>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-neon via-electric to-transparent opacity-60" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
