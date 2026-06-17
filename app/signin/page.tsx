import { LoginForm } from '@/components/login-form'
import { Navbar } from '@/components/navbar'

export default function Page() {
  return (
    <div className="app-shell">
      <div className="page-backdrop" aria-hidden="true">
        <div className="page-grid" />
        <div className="page-radial-one" />
        <div className="page-radial-two" />
      </div>

      <div className="relative z-20">
        <Navbar />
        <main>
          <LoginForm />
        </main>
      </div>
    </div>
  )
}
