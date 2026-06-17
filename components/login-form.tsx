'use client'

import { useAuthActions } from '@convex-dev/auth/react'
import { ConvexError } from 'convex/values'
import { motion } from 'framer-motion'
import { LoaderCircle, Send, ShieldCheck } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import * as z from 'zod'
import { SectionHeading } from '@/components/section-heading'
import { loginFields } from '@/lib/site-content'

export function LoginForm() {
  const loginSection = useRef<HTMLDivElement | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)
  const hasStarted = true
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [_success, setSuccess] = useState(false)
  const { signIn } = useAuthActions()

  const loginSchema = z.object({
    email: z
      .email('Invalid email')
      .regex(/@students\.nsbm\.ac\.lk$/, 'Must be an NSBM student email'),
    password: z.string().min(8, 'Password must be at least 8 characters')
  })

  useEffect(() => {
    if (errors.length > 0 && loginSection.current) {
      loginSection.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [errors])

  const handleSubmit = async (formData: FormData) => {
    setErrors([])
    setLoading(true)

    const data = {
      email: formData.get('email')?.toString() || '',
      password: formData.get('password')?.toString() || ''
    }

    const registration = loginSchema.safeParse(data)

    if (!registration.success) {
      const errorMessages = registration.error.issues.map(
        (err) => `${err.path.join('.')}: ${err.message}`
      )
      setErrors(errorMessages)
      setLoading(false)
      return
    }

    try {
      const result = await signIn('password', formData)

      if (!result?.signingIn && !result?.redirect) {
        setErrors(['Login failed'])
        setLoading(false)
        return
      }

      if (!result?.signingIn) {
        setLoading(false)
        return
      }

      formRef.current?.reset()
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

      console.log('Login error:', error)
      setErrors(['Login failed. Please try again.'])
      setLoading(false)
    }
  }

  return (
    <section
      id="register"
      ref={loginSection}
      className="relative px-4 py-6 sm:px-6 lg:px-8 lg:py-12"
    >
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          eyebrow="Login"
          title="Enter the grid"
          description="Greetings programs!"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="section-card relative mt-16 overflow-hidden p-5 shadow-strong sm:p-8 lg:p-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,229,255,0.12),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent_45%)]" />
          <div className="relative grid gap-10">
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
                  Secure Login
                </span>
              </div>

              <fieldset disabled={!hasStarted}>
                <div className="grid gap-5 sm:grid-rows-2">
                  {loginFields.map((field, index) => (
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
                </div>
              </fieldset>

              <input type="hidden" name="flow" value="signUp" />

              <button
                type="submit"
                disabled={loading || !hasStarted}
                className="neon-button disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Login
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
