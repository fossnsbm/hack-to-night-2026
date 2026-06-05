"use client";

import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';
import { faqs } from '@/lib/site-content';
import { SectionHeading } from '@/components/section-heading';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const iconRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useLayoutEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    const panels = panelRefs.current.filter(Boolean);
    const activePanel = panelRefs.current[openIndex];
    const activeIcon = iconRefs.current[openIndex];

    gsap.set(cards, { opacity: 0, y: 22 });
    gsap.set(panels, { height: 0, opacity: 0 });
    if (activePanel) {
      gsap.set(activePanel, { height: activePanel.scrollHeight, opacity: 1 });
    }
    gsap.set(iconRefs.current.filter(Boolean), { rotate: 0 });
    if (activeIcon) {
      gsap.set(activeIcon, { rotate: 180 });
    }

    const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });

    timeline.to(cards, { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 }, 0);

    if (activePanel) {
      timeline.to(activePanel, { height: activePanel.scrollHeight, opacity: 1, duration: 0.35 }, 0.15);
    }

    if (activeIcon) {
      timeline.to(activeIcon, { rotate: 180, duration: 0.25 }, 0.15);
    }

    return () => {
      timeline.kill();
    };
  }, []);

  useLayoutEffect(() => {
    panelRefs.current.forEach((panel, index) => {
      if (!panel) {
        return;
      }

      const open = index === openIndex;
      const icon = iconRefs.current[index];

      gsap.to(panel, {
        height: open ? panel.scrollHeight : 0,
        opacity: open ? 1 : 0,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      if (icon) {
        gsap.to(icon, {
          rotate: open ? 180 : 0,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    });
  }, [openIndex]);

  return (
    <section ref={sectionRef} id="faq" className="relative px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions"
          description=" Answers to common questions about the hackathon, registration, and event details. If you have more questions, feel free to reach out to us!"
        />

        <div className="mt-16 space-y-4">
          {faqs.map((item, index) => {
            const open = openIndex === index;

            return (
              <div
                key={item.question}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className="glass-panel neon-border overflow-hidden rounded-[1.5rem]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  aria-expanded={open}
                  className={`flex w-full items-center justify-between gap-5 px-6 py-5 text-left transition hover:bg-white/5 ${open ? 'bg-white/5' : ''}`}
                >
                  <span className="font-semibold text-white sm:text-lg">{item.question}</span>
                  <span
                    ref={(element) => {
                      iconRefs.current[index] = element;
                    }}
                    className="text-neon"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </span>
                </button>

                <div
                  ref={(element) => {
                    panelRefs.current[index] = element;
                  }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-white/8 px-6 py-5 text-sm leading-8 text-slate-300 sm:text-base">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
