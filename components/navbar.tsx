'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Menu, Sparkles, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { navItems } from '@/lib/site-content'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const logoRef = useRef<SVGSVGElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuTween = {
    duration: 0.25,
    ease: 'power2.out',
  }

  useGSAP(() => {
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -24,
      duration: 0.6,
    })

    gsap.to(logoRef.current, {
      rotation: '180',
      yoyo: true,
      repeat: 1,
      duration: 0.8,
      repeatDelay: 0.4,
    })
  }, [])

  useGSAP(
    () => {
      if (!open || !mobileMenuRef.current) {
        return
      }

      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, ...menuTween },
      )
    },
    { dependencies: [open] },
  )

  const openMenu = () => {
    setMounted(true)
    setOpen(true)
  }

  const closeMenu = () => {
    const menu = mobileMenuRef.current

    if (!menu) {
      setOpen(false)
      setMounted(false)
      return
    }

    gsap.to(menu, {
      height: 0,
      opacity: 0,
      ...menuTween,
      onComplete: () => {
        setOpen(false)
        setMounted(false)
      },
    })
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-white/5 bg-black/35 backdrop-blur-2xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="group flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-neon/40 bg-neon/10 shadow-glow transition duration-300 group-hover:scale-105">
            <Sparkles ref={logoRef} className="h-5 w-5 text-neon" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg tracking-[0.32em] text-white text-glow">
              HACK TO NIGHT
            </span>
            <span className="text-[0.68rem] uppercase tracking-[0.34em] text-cyan-100/55">
              NSBM FOSS Community
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-md font-medium uppercase tracking-[0.3em] text-cyan-50/75 transition-all duration-500 hover:tracking-[0.5em] hover:text-neon hover:text-glow"
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
          onClick={() => (open ? closeMenu() : openMenu())}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neon/25 bg-white/5 text-neon shadow-glow transition hover:bg-white/10 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mounted ? (
        <div
          ref={mobileMenuRef}
          className="overflow-hidden border-t border-white/5 bg-black/65 lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="rounded-2xl border border-neon/10 bg-white/5 px-4 py-3 text-sm uppercase tracking-[0.24em] text-cyan-50/80 transition hover:border-neon/40 hover:bg-neon/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
