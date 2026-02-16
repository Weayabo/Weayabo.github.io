import { Navigation } from '@/app/components/navigation';
import { HeroSection } from '@/app/components/hero-section';
import { AboutSection } from '@/app/components/about-section';
import { SkillsSection } from '@/app/components/skills-section';
import { ProjectsSection } from '@/app/components/projects-section';
import { ContactSection } from '@/app/components/contact-section';
import { Footer } from '@/app/components/footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0A0E27] overflow-x-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,217,255,0.03),transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(167,139,250,0.05),transparent_70%)]" />
      </div>
    </div>
  );
}
