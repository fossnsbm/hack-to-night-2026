'use client'

import { Zap } from 'lucide-react'
import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function SubmissionCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isWarning, setIsWarning] = useState(false)

  // Fixed submission deadline: June 20, 2026 at 4:00 AM UTC
  const SUBMISSION_DEADLINE = new Date('2026-06-20T04:00:00Z')

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = SUBMISSION_DEADLINE.getTime() - now.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)

        setTimeLeft({ days, hours, minutes, seconds })
        // Show warning if less than 3 hours left
        setIsWarning(hours < 3 && days === 0)
      } else {
        // Deadline has passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setIsWarning(true)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (num: number) => String(num).padStart(2, '0')

  return (
    <div
      className={`rounded-2xl border p-8 backdrop-blur-xl transition-all duration-300 ${
        isWarning
          ? 'border-red-500/40 bg-red-500/10'
          : 'border-neon/30 bg-neon/10'
      }`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-300 ${
            isWarning
              ? 'border-red-500/50 bg-red-500/20 text-red-400'
              : 'border-neon/50 bg-neon/20 text-neon'
          }`}
        >
          <Zap className="h-5 w-5" />
        </div>
        <div>
          <p
            className={`text-xs uppercase tracking-[0.12em] font-semibold ${isWarning ? 'text-red-400' : 'text-neon'}`}
          >
            {isWarning ? 'HURRY UP' : 'SUBMISSION DEADLINE'}
          </p>
          <p
            className={`text-xs uppercase tracking-[0.08em] mt-1 ${isWarning ? 'text-red-300/70' : 'text-neon/70'}`}
          >
            Time Left to Submit
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { value: formatTime(timeLeft.days), label: 'Days' },
          { value: formatTime(timeLeft.hours), label: 'Hours' },
          { value: formatTime(timeLeft.minutes), label: 'Mins' },
          { value: formatTime(timeLeft.seconds), label: 'Secs' }
        ].map((item, index) => (
          <div key={index} className="text-center">
            <div
              className={`rounded-lg border p-3 mb-2 transition-all duration-300 ${
                isWarning
                  ? 'border-red-500/30 bg-red-500/5'
                  : 'border-neon/20 bg-neon/5'
              }`}
            >
              <p
                className={`text-2xl font-display tracking-[0.08em] text-glow font-bold ${
                  isWarning ? 'text-red-400' : 'text-neon'
                }`}
              >
                {item.value}
              </p>
            </div>
            <p className="text-xs uppercase tracking-[0.1em] text-cyan-100/50">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {isWarning && (
        <div className="mt-4 p-3 rounded-lg border border-red-500/30 bg-red-500/5">
          <p className="text-xs uppercase tracking-[0.1em] text-red-300 font-semibold">
            Less than 3 hours remaining - Complete your submission now!
          </p>
        </div>
      )}
    </div>
  )
}
