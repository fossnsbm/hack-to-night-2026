import { DashboardHeader } from './components/header'
import { DashboardSidebar } from './components/sidebar'

export default function DashboardLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="app-shell">
      <div className="page-backdrop" aria-hidden="true">
        <div className="page-grid" />
        <div className="page-radial-one" />
        <div className="page-radial-two" />
      </div>

      <div className="relative z-20 flex">
        <DashboardSidebar />
        <main className="w-full md:ml-64">
          <DashboardHeader />
          {children}
        </main>
      </div>
    </div>
  )
}
