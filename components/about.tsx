"use client";

import { BookOpen, Landmark, Sparkles, Workflow } from 'lucide-react';
import { useRef } from 'react';
import { highlights } from '@/lib/site-content';
import { SectionHeading } from '@/components/section-heading';
import { useGsapReveal } from '@/lib/use-gsap-reveal';

const storyCards = [
  {
    icon: BookOpen,
    title: 'Who We Are',
    body: 'NSBM FOSS Community is a student-driven open-source community focused on innovation, collaboration, and technology empowerment.'
  },
  {
    icon: Sparkles,
    title: 'Our Mission',
    body: 'To inspire students to create impactful solutions through open-source technologies and collaborative learning.'
  }
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGsapReveal(sectionRef, { selector: '[data-gsap-reveal]', y: 18, duration: 0.65, stagger: 0.08, threshold: 0.18 });

  return (
    <section ref={sectionRef} id="about" className="relative px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="About Us"
          title="A community built for bold execution"
          description="NSBM FOSS Community brings builders together around shared knowledge, open tooling, and a culture of shipping meaningful work."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {storyCards.map((card, index) => (
            <article
              key={card.title}
              data-gsap-reveal
              className="glass-panel neon-border relative overflow-hidden rounded-[2rem] p-7 sm:p-8"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,229,255,0.18),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent)] opacity-80" />
              <div className="relative flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-neon/30 bg-neon/10 text-neon shadow-glow">
                  <card.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-white text-glow">{card.title}</h3>
                  <p className="mt-4 max-w-xl text-base leading-8 text-slate-300">{card.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {highlights.map((item, index) => (
            <div
              key={item}
              data-gsap-reveal
              className="glass-panel rounded-2xl px-5 py-4 text-sm font-medium text-slate-100"
            >
              <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-neon/10 text-neon shadow-glow">
                <Workflow className="h-4 w-4" />
              </span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
