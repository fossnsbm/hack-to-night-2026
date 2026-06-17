import { AboutSection } from '@/components/about'
import { BackgroundEffects } from '@/components/background-effects'
import { EventSection } from '@/components/event-section'
import { FAQSection } from '@/components/faq'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { Navbar } from '@/components/navbar'
import { RegistrationForm } from '@/components/registration-form'

export default function Page() {
  return (
    <div className="app-shell">
      <BackgroundEffects />
      <div className="page-backdrop" aria-hidden="true">
        <div className="page-grid" />
        <div className="page-radial-one" />
        <div className="page-radial-two" />
      </div>

      <div className="relative z-20">
        <Navbar />
        <main>
          <Hero />
          <AboutSection />
          <EventSection />
          <RegistrationForm />
          <FAQSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
