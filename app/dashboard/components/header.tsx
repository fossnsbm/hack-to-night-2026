'use client'

import { User } from 'lucide-react'
import Link from 'next/link'
export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-panel/50 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-3">
        <div>
          <h1 className="text-3xl font-display tracking-[0.32em] text-white text-glow">
            DASHBOARD
          </h1>
          <p className="mt-1 text-sm uppercase tracking-[0.16em] text-cyan-100/50">
            Welcome back to the grid
          </p>
        </div>
        <div>
          <button>
            <Link href={'/dashboard/profile'}>
              <User className="h-6 w-6" />
            </Link>
          </button>
        </div>
      </div>
    </header>
  )
}
