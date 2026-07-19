import HeroBackground from "@/components/landing/HeroBackground";
import FloatingEquations from "@/components/landing/FloatingEquations";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PipelineSection from "@/components/landing/PipelineSection";
import ResearchFocusSection from "@/components/landing/ResearchFocusSection";
import OpenSourceSection from "@/components/landing/OpenSourceSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen">
      {/* Background animation */}
      <HeroBackground />
      <FloatingEquations />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <PipelineSection />
        <ResearchFocusSection />
        <OpenSourceSection />
        <FAQSection />
        <Footer />
      </div>
    </main>
  );
}
