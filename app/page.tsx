import { BackgroundEffects } from '@/components/background-effects';
import { Hero } from '@/components/hero';
import { AboutSection } from '@/components/about';
import { EventSection } from '@/components/event-section';
import { RegistrationForm } from '@/components/registration-form';
import { FAQSection } from '@/components/faq';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { ConvexClientProvider } from './ConvexClientProvider';

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
          <ConvexClientProvider>
            <RegistrationForm />
          </ConvexClientProvider>
          <FAQSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
