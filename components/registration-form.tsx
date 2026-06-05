"use client";

import gsap from 'gsap';
import { CheckCircle2, LoaderCircle, Send, ShieldCheck } from 'lucide-react';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { registrationFields } from '@/lib/site-content';
import { SectionHeading } from '@/components/section-heading';
import { useGsapReveal } from '@/lib/use-gsap-reveal';

type FormState = Record<string, string>;

type ErrorState = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  fullName: '',
  email: '',
  university: '',
  teamName: '',
  contactNumber: ''
};

export function RegistrationForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<ErrorState>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const validationRules = useMemo(
    () => ({
      fullName: (value: string) => (value.trim() ? '' : 'Please enter your full name.'),
      email: (value: string) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Enter a valid email address.'),
      university: (value: string) => (value.trim() ? '' : 'Please add your university.'),
      teamName: (value: string) => (value.trim() ? '' : 'Please enter a team name.'),
      contactNumber: (value: string) => (value.trim().length >= 8 ? '' : 'Please enter a valid contact number.')
    }),
    []
  );

  useGsapReveal(sectionRef, { selector: '[data-gsap-reveal]', y: 18, duration: 0.6, stagger: 0.06, threshold: 0.18 });

  useEffect(() => {
    if (!panelRef.current) {
      return;
    }

    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 12, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out', overwrite: 'auto' }
    );
  }, [success]);

  const handleChange = (name: keyof FormState, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = Object.entries(validationRules).reduce((result, [key, rule]) => {
      const message = rule(values[key as keyof FormState]);
      if (message) {
        result[key as keyof FormState] = message;
      }
      return result;
    }, {} as ErrorState);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 1200));
    setLoading(false);
    setSuccess(true);
    setValues(initialState);

    window.setTimeout(() => setSuccess(false), 3200);
  };

  return (
    <section ref={sectionRef} id="register" className="relative px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Registration"
          title="Join the grid"
          description="A futuristic registration experience with responsive validation, neon inputs, and a celebratory success state."
        />

        <div
          data-gsap-reveal
          className="section-card relative mt-16 overflow-hidden p-5 shadow-strong sm:p-8 lg:p-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,229,255,0.12),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent_45%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center gap-3 text-neon">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-[0.35em]">Secure Registration</span>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {registrationFields.map((field, index) => (
                  <label
                    key={field.name}
                    data-gsap-reveal
                    className={field.name === 'university' ? 'sm:col-span-2' : ''}
                  >
                    <span className="mb-2 block text-sm font-medium text-slate-200">{field.label}</span>
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={values[field.name]}
                      onChange={(event) => handleChange(field.name as keyof FormState, event.target.value)}
                      className="neon-input"
                    />
                    {errors[field.name as keyof FormState] ? (
                      <span className="mt-2 block text-sm text-red-300">{errors[field.name as keyof FormState]}</span>
                    ) : null}
                  </label>
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="neon-button disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Register
              </button>
            </form>

            <div ref={panelRef} className="relative flex min-h-[24rem] items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/40 p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.16),transparent_50%)]" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent opacity-70" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent opacity-70" />

              {success ? (
                <div key="success" className="relative text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-neon/40 bg-neon/10 text-neon shadow-strong">
                    <CheckCircle2 className="h-12 w-12" />
                  </div>
                  <h3 className="mt-6 font-display text-3xl text-white text-glow">Registration Complete</h3>
                  <p className="mt-3 max-w-sm text-base leading-8 text-slate-300">
                    Your team has been synced into the grid. Our organizers will follow up with the next steps.
                  </p>
                </div>
              ) : (
                <div key="preview" className="relative flex w-full max-w-md flex-col gap-6">
                  <div className="glass-panel rounded-[1.6rem] p-6">
                    <p className="text-xs uppercase tracking-[0.5em] text-slate-400">Submission Protocol</p>
                    <h3 className="mt-3 font-display text-2xl text-white text-glow">Ready for the portal</h3>
                    <p className="mt-4 text-sm leading-7 text-slate-300">
                      The form supports instant validation and a success state tailored for a premium cyberpunk event.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="glass-panel rounded-2xl p-4">
                      <div className="text-sm uppercase tracking-[0.35em] text-neon">Neon Fields</div>
                      <div className="mt-2 text-sm text-slate-300">Clean focus states and high-contrast readability.</div>
                    </div>
                    <div className="glass-panel rounded-2xl p-4">
                      <div className="text-sm uppercase tracking-[0.35em] text-electric">Instant Feedback</div>
                      <div className="mt-2 text-sm text-slate-300">Validation that helps teams submit quickly and correctly.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
