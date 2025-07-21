import ClientLogosSection from './LandingPage/ClientLogosSection';
import CTASection from './LandingPage/CTASection';
import FeaturesSection from './LandingPage/FeaturesSection';
import Footer from './LandingPage/Footer';
import HeaderSection from './LandingPage/Header';
import HeroSection from './LandingPage/Hero';
import LiveDemoSection from './LandingPage/LiveDemoSection';
import PricingSection from './LandingPage/PricingSection';
import ProblemSection from './LandingPage/ProblemSection';
import TestimonialSection from './LandingPage/TestimonialSection';
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a23] to-[#1f1f3a] text-white">
      <HeaderSection />
      <HeroSection />
      <ProblemSection />
      <LiveDemoSection/>
      <FeaturesSection />
      <TestimonialSection/>
      <ClientLogosSection/>
      <PricingSection/>
      <CTASection />
      <Footer/>
    </main>
  );
}