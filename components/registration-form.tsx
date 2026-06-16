'use client'

import { useAuthActions } from '@convex-dev/auth/react'
import { ConvexError } from 'convex/values'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, LoaderCircle, Send, ShieldCheck } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import * as z from 'zod'
import { SectionHeading } from '@/components/section-heading'
import { registrationFields } from '@/lib/site-content'

export function RegistrationForm() {
  const getMemberLabel = (index: number): string => {
    if (index === 0) return 'TEAM LEADER'
    return `MEMBER ${index + 1}`
  }

  const registrationSection = useRef<HTMLDivElement | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)
  const isRegistrationClosed = JSON.parse(
    process.env.NEXT_PUBLIC_REGISTRAION_CLOSED!
  )
  const [memberCount, setMemberCount] = useState(2)
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0)
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { signIn } = useAuthActions()

  const teamMemberSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    studentId: z.string().regex(/[0-9]{5}/, 'Invalid Student Id')
  })

  const registrationSchema = z
    .object({
      teamName: z.string().min(1, 'Team name is required'),
      email: z
        .email('Invalid email')
        .regex(/@students\.nsbm\.ac\.lk$/, 'Must be an NSBM student email'),
      phone: z
        .string()
        .regex(/^07\d{8}$/, 'Contact must be in format 07XXXXXXXX'),
      password: z.string().min(8, 'Password must be at least 8 characters'),
      confpassword: z.string(),
      teamMembers: z
        .array(teamMemberSchema)
        .min(2, 'At least 2 members required')
        .max(5, 'Maximum 5 members allowed')
    })
    .refine((data) => data.password === data.confpassword, {
      message: "Passwords don't match",
      path: ['confpassword']
    })

  useEffect(() => {
    if (errors.length > 0 && registrationSection.current) {
      registrationSection.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [errors])

  const addMember = () => {
    if (memberCount < 5) {
      setMemberCount((prev) => prev + 1)
      setCurrentMemberIndex(memberCount)
    }
  }

  const removeMember = () => {
    if (memberCount > 2 && currentMemberIndex >= 2) {
      setMemberCount((prev) => prev - 1)

      if (currentMemberIndex >= memberCount - 1) {
        setCurrentMemberIndex(memberCount - 2)
      }
    }
  }

  const goToPrevMember = () => {
    if (currentMemberIndex > 0) {
      setCurrentMemberIndex(currentMemberIndex - 1)
    }
  }

  const goToNextMember = () => {
    if (currentMemberIndex < memberCount - 1) {
      setCurrentMemberIndex(currentMemberIndex + 1)
    }
  }

  const handleSubmit = async (formData: FormData) => {
    setErrors([])
    setLoading(true)

    const teamMembers = []

    for (let i = 0; i < memberCount; i++) {
      const name = formData.get(`teamMembers[${i}].name`)
      const studentId = formData.get(`teamMembers[${i}].studentId`)
      if (name && studentId) {
        teamMembers.push({
          name: name.toString(),
          studentId: studentId.toString()
        })
      }
    }

    const data = {
      teamName: formData.get('teamName')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      password: formData.get('password')?.toString() || '',
      confpassword: formData.get('confpassword')?.toString() || '',
      teamMembers
    }

    const registration = registrationSchema.safeParse(data)

    if (!registration.success) {
      const errorMessages = registration.error.issues.map(
        (err) => `${err.path.join('.')}: ${err.message}`
      )
      setErrors(errorMessages)
      setLoading(false)
      return
    }

    formData.set('teamName', registration.data.teamName)
    formData.set('teamMembers', JSON.stringify(registration.data.teamMembers))

    const teamLeaderName = registration.data.teamMembers[0]?.name
    if (teamLeaderName) {
      formData.set('teamLeaderName', teamLeaderName)
    }

    try {
      const result = await signIn('password', formData)

      if (!result?.signingIn && !result?.redirect) {
        setErrors(['Registration failed. Please try again.'])
        setLoading(false)
        return
      }

      if (!result?.signingIn) {
        setLoading(false)
        return
      }

      formRef.current?.reset()
      setMemberCount(2)
      setCurrentMemberIndex(0)
      setErrors([])
      setLoading(false)
      setSuccess(true)

      window.setTimeout(() => setSuccess(false), 3200)
    } catch (error) {
      if (error instanceof ConvexError) {
        setErrors([error.data.message])
        setLoading(false)
        return
      }

      console.log('Registration error:', error)
      setErrors(['Registration failed. Please try again.'])
      setLoading(false)
    }
  }

  return (
    <section
      id="register"
      ref={registrationSection}
      className="relative px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Registration"
          title={
            isRegistrationClosed ? 'Grid has been closed' : 'Join the grid'
          }
          description="A futuristic registration experience with responsive validation, neon inputs, and a celebratory success state."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="section-card relative mt-16 overflow-hidden p-5 shadow-strong sm:p-8 lg:p-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,229,255,0.12),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent_45%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <form
              ref={formRef}
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(new FormData(e.currentTarget))
              }}
              className="space-y-5"
            >
              {errors.length > 0 && (
                <div className="rounded-xl border border-red-500/30 bg-red-900/20 p-4">
                  <p className="mb-2 text-sm font-semibold text-red-300">
                    Please fix the following errors:
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-xs text-red-200">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex items-center gap-3 text-neon">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-[0.35em]">
                  Secure Registration
                </span>
              </div>

              <fieldset disabled={isRegistrationClosed}>
                <div className="grid gap-5 sm:grid-cols-2">
                  {registrationFields.map((field, index) => (
                    <motion.label
                      key={field.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <span className="mb-2 block text-sm font-medium text-slate-200">
                        {field.label}
                      </span>
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        className="neon-input"
                      />
                    </motion.label>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 5 * 0.05 }}
                    className="sm:col-span-2"
                  >
                    <span className="mb-2 block text-sm font-medium text-slate-200">
                      Team Members
                    </span>
                    <div className="glass-panel rounded-[1.6rem] p-6">
                      <div className="flex justify-between items-center">
                        <p className="text-sm mb-2">
                          Minimum of 2, maximum of 5 members allowed
                        </p>
                        <button
                          type="button"
                          className="rounded px-4 py-2 text-xs font-semibold neon-button disabled:cursor-not-allowed disabled:opacity-70"
                          onClick={addMember}
                          disabled={memberCount >= 5}
                        >
                          ADD MEMBER
                        </button>
                      </div>
                      <div className="p-4 mt-4">
                        {memberCount > 0 && (
                          <div className="rounded  p-5">
                            <div className="mb-5 flex items-center justify-center gap-5">
                              <button
                                type="button"
                                className="flex h-12 w-12 items-center justify-center rounded-lg neon-border text-4xl leading-none transition-all disabled:cursor-not-allowed disabled:hover:bg-transparent"
                                onClick={goToPrevMember}
                                disabled={currentMemberIndex === 0}
                              >
                                ‹
                              </button>
                              <span className="min-w-12 text-center text-sm">
                                {currentMemberIndex + 1} / {memberCount}
                              </span>
                              <button
                                type="button"
                                className="flex h-12 w-12 items-center justify-center rounded-lg neon-border text-4xl leading-none transition-all disabled:cursor-not-allowed disabled:hover:bg-transparent"
                                onClick={goToNextMember}
                                disabled={
                                  currentMemberIndex === memberCount - 1
                                }
                              >
                                ›
                              </button>

                              {currentMemberIndex >= 2 && (
                                <button
                                  type="button"
                                  className="ml-2 flex h-12 w-12 items-center justify-center rounded-lg border border-red-400/30 text-3xl leading-none text-red-400 transition-all hover:border-red-400 hover:bg-red-400/10 hover:text-red-300"
                                  onClick={removeMember}
                                  aria-label="Remove member"
                                >
                                  ✕
                                </button>
                              )}
                            </div>

                            {/* Render all member inputs but only show current one */}
                            {Array.from({ length: memberCount }).map(
                              (_, index) => (
                                <div
                                  key={index}
                                  className={`${index === currentMemberIndex ? '' : 'hidden'}`}
                                >
                                  {/* Member Label */}
                                  <div className="mb-3 text-sm font-semibold tracking-[0.08em]">
                                    {getMemberLabel(index)}
                                  </div>

                                  <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                      <label className="mb-1.5 block text-[11px] font-semibold tracking-[0.05em]">
                                        NAME
                                      </label>
                                      <input
                                        type="text"
                                        name={`teamMembers[${index}].name`}
                                        placeholder="FULL NAME"
                                        required
                                        className="neon-input"
                                      />
                                    </div>
                                    <div>
                                      <label className="mb-1.5 block text-[11px] font-semibold tracking-[0.05em]">
                                        STUDENT ID
                                      </label>
                                      <input
                                        type="text"
                                        name={`teamMembers[${index}].studentId`}
                                        placeholder="STUDENT ID NUMBER"
                                        required
                                        className="neon-input"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </fieldset>

              <input type="hidden" name="flow" value="signUp" />

              <button
                type="submit"
                disabled={loading || isRegistrationClosed}
                className="neon-button disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Register
              </button>
            </form>

            <div className="relative flex min-h-[24rem] items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/40 p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.16),transparent_50%)]" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent opacity-70" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent opacity-70" />

              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.86, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.45 }}
                    className="relative text-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-neon/40 bg-neon/10 text-neon shadow-strong"
                    >
                      <CheckCircle2 className="h-12 w-12" />
                    </motion.div>
                    <h3 className="mt-6 font-display text-3xl text-white text-glow">
                      Registration Complete
                    </h3>
                    <p className="mt-3 max-w-sm text-base leading-8 text-slate-300">
                      Your team has been synced into the grid. Our organizers
                      will follow up with the next steps.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative flex w-full max-w-md flex-col gap-8"
                  >
                    <div className="glass-panel rounded-[1.6rem] p-6">
                      <p className="text-xs uppercase tracking-[0.5em] text-slate-400">
                        Submission Protocol
                      </p>
                      <h3 className="mt-3 font-display text-2xl text-white text-glow">
                        Ready for the portal
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-slate-300">
                        Get ready to dive into the ultimate event. <br />
                        Get ready to Compete
                      </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
