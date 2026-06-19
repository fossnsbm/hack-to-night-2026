'use client'

import { useAuthActions } from '@convex-dev/auth/react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { File, LayoutGrid, LogOut, Menu, User, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

const sidebarItems = [
  {
    label: 'Overview',
    icon: <LayoutGrid className="h-5 w-5" />,
    href: '/dashboard'
  },
  {
    label: 'Tasks',
    icon: <File className="h-5 w-5" />,
    href: '/dashboard/tasks'
  },
  {
    label: 'Profile',
    icon: <User className="h-5 w-5" />,
    href: '/dashboard/profile'
  }
]

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const toggleBtnRef = useRef<HTMLButtonElement>(null)
  const { signOut } = useAuthActions()
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.replace('/signin')
  }

  useGSAP(
    () => {
      if (!isOpen || !sidebarRef.current) return

      gsap.fromTo(
        sidebarRef.current,
        { x: '-100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
    },
    { dependencies: [isOpen] }
  )

  const openSidebar = () => {
    setIsMounted(true)
    setIsOpen(true)
  }

  const closeSidebar = () => {
    const sidebar = sidebarRef.current
    if (!sidebar) {
      setIsOpen(false)
      setIsMounted(false)
      return
    }

    gsap.to(sidebar, {
      x: '-100%',
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        setIsOpen(false)
        setIsMounted(false)
      }
    })
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden border-r border-border bg-panel/50 backdrop-blur-xl md:fixed md:inset-y-0 md:left-0 md:z-40 md:block md:w-64">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b border-border px-6 py-6">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-neon/40 bg-neon/10 shadow-glow">
                <span className="text-lg font-display text-neon">H</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-display tracking-[0.2em] text-neon text-glow">
                  HTN
                </span>
                <span className="text-xs uppercase tracking-[0.12em] text-cyan-100/50">
                  Dashboard
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 px-4 py-6">
            {sidebarItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition-all duration-300 
                  ${
                    pathname === item.href
                      ? 'border border-neon/30 bg-neon/15 text-neon shadow-glow'
                      : 'border border-transparent text-cyan-100/70 hover:border-neon/20 hover:bg-white/5'
                  }`}
              >
                <span
                  className={
                    pathname === item.href
                      ? 'text-neon'
                      : 'text-cyan-100/60 group-hover:text-neon'
                  }
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-border space-y-2 px-4 py-4">
            <button
              onClick={handleSignOut}
              className="group flex w-full items-center gap-3 rounded-xl border border-transparent px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-cyan-100/70 transition-all duration-300 hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut className="h-5 w-5 group-hover:text-red-400" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        ref={toggleBtnRef}
        onClick={openSidebar}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-neon/40 bg-neon/10 text-neon shadow-glow transition hover:bg-neon/20 md:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Sidebar */}
      {isMounted && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={closeSidebar}
          />

          {/* Sidebar */}
          <aside
            ref={sidebarRef}
            className="fixed inset-y-0 left-0 z-50 w-64 overflow-hidden border-r border-border bg-panel/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col">
              {/* Header with Close Button */}
              <div className="flex items-center justify-between border-b border-border px-6 py-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-neon/40 bg-neon/10 shadow-glow">
                    <span className="text-lg font-display text-neon">H</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-display tracking-[0.2em] text-neon text-glow">
                      HTN
                    </span>
                    <span className="text-xs uppercase tracking-[0.12em] text-cyan-100/50">
                      Dashboard
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeSidebar}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-neon/20 bg-white/5 text-neon hover:border-neon/40 hover:bg-white/10"
                  aria-label="Close sidebar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 space-y-2 px-4 py-6">
                {sidebarItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={closeSidebar}
                    className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition-all duration-300 
                      ${
                        pathname == item.href
                          ? 'border border-neon/30 bg-neon/15 text-neon shadow-glow'
                          : 'border border-transparent text-cyan-100/70 hover:border-neon/20 hover:bg-white/5'
                      }`}
                  >
                    <span
                      className={
                        pathname === item.href
                          ? 'text-neon'
                          : 'text-cyan-100/60 group-hover:text-neon'
                      }
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Footer */}
              <div className="border-t border-border space-y-2 px-4 py-4">
                <button
                  onClick={handleSignOut}
                  className="group flex w-full items-center gap-3 rounded-xl border border-transparent px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-cyan-100/70 transition-all duration-300 hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
                >
                  <LogOut className="h-5 w-5 group-hover:text-red-400" />
                  Sign Out
                </button>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  )
}
