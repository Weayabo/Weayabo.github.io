import { Navigation } from "@/app/components/navigation";
import { HeroSection } from "@/app/components/hero-section";
import { AboutSection } from "@/app/components/about-section";
// import { SkillsSection } from "@/app/components/skills-section";
import { BeyondCodingSection } from "./components/BeyondCodingSection";
import { ProjectsSection } from "@/app/components/projects-section";
import { ContactSection } from "@/app/components/contact-section";
import { Footer } from "@/app/components/footer";
import { TriCursor } from "@/app/components/cursor";
import { ChatBubble } from "@/app/components/ui/chat-bubble";
import { IntroLoader } from "./components/IntroLoader";
import { TrailMapPanel } from "./components/trail-map-panel";
import { MountainAmbient } from "./components/MountainAmbient";

export default function App() {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden ">
      {/*add if kailangan md:cursor-none */}
      <IntroLoader />
      <TrailMapPanel/>
      <MountainAmbient />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        {/* <SkillsSection /> */}
        <BeyondCodingSection />
        <ContactSection />
      </main>
      <Footer />
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(79,138,95,0.04),transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(111,191,122,0.05),transparent_70%)]" />
      </div>
      <ChatBubble />

      {/* Only render custom cursor on desktop */}
      <div className="hidden md:block">{/* <TriCursor /> */}</div>
    </div>
  );
}
