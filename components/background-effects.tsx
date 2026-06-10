'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

export function BackgroundEffects() {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.2,
  })
  const [cursor, setCursor] = useState({ x: -200, y: -200 })

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      setCursor({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  return !isTabletOrMobile ? (
    <>
      <motion.div
        className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-neon via-electric to-transparent"
        style={{ scaleX: progress }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-0 h-[42rem] w-[42rem] rounded-full bg-neon/10 blur-3xl"
        animate={{ x: [0, 80, -30, 0], y: [0, -30, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed right-0 top-1/3 z-0 h-[28rem] w-[28rem] rounded-full bg-electric/10 blur-3xl"
        animate={{ x: [0, -90, 40, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.24)_0%,rgba(0,229,255,0.1)_24%,transparent_72%)] blur-2xl"
        animate={{ x: cursor.x, y: cursor.y }}
        transition={{ type: 'spring', stiffness: 90, damping: 20, mass: 0.2 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] opacity-20 mix-blend-screen [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:36px_36px]"
      />
    </>
  ) : null
}
