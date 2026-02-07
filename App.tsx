import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { HeroSection } from './components/HeroSection';
import { LogoTicker } from './components/LogoTicker';
import { ProcessSteps } from './components/ProcessSteps';
import { ComparisonTable } from './components/ComparisonTable';
import { Testimonials } from './components/Testimonials';
import { PricingGrid } from './components/PricingGrid';
import { PreviewFormWizard } from './components/PreviewFormWizard';
import { LegalModal } from './components/LegalModal';
import { PricingPage } from './pages/PricingPage';
import { FAQPage } from './pages/FAQPage';
import { Button } from './components/ui/Button';
import { Mail } from 'lucide-react';

// Home page content component
function HomePage({ selectedIndustry, onServiceClick }: { selectedIndustry?: string; onServiceClick: (service: string) => void }) {
  return (
    <>
      <HeroSection />
      <LogoTicker onServiceClick={onServiceClick} />
      <ProcessSteps />
      <ComparisonTable />
      <Testimonials />
      <PricingGrid />
      <PreviewFormWizard prefilledIndustry={selectedIndustry} />
    </>
  );
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState<string | undefined>();
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | null>(null);
  const lastScrollY = useRef(0);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Show header when scrolling up or at top, hide when scrolling down
      if (currentScrollY < 100) {
        setIsHeaderVisible(true);
      } else if (currentScrollY < lastScrollY.current) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY.current + 10) {
        setIsHeaderVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    if (location.pathname !== '/') {
      window.location.href = '/#instant-preview';
    } else {
      document.getElementById('instant-preview')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceClick = (service: string) => {
    setSelectedIndustry(service);
    document.getElementById('instant-preview')?.scrollIntoView({ behavior: 'smooth' });
  };

  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-dark-950 font-sans text-zinc-100 selection:bg-accent-pink/20 selection:text-white grain">

      {/* Navbar */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-950/80 backdrop-blur-xl py-3' : 'bg-transparent py-5'} ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/images/vibelyheader.png"
              alt="Vibely"
              className="h-9 object-contain rounded-lg"
            />
            <span className="text-xl font-bold font-heading tracking-tight text-white">Vibely</span>
          </Link>

          <div className="flex items-center gap-5">
             <Link to="/pricing" className="hidden md:block text-sm font-medium text-zinc-400 hover:text-white transition-colors">Pricing</Link>
             <Link to="/faq" className="hidden md:block text-sm font-medium text-zinc-400 hover:text-white transition-colors">FAQ</Link>
             <Button size="sm" onClick={scrollToForm}>
                Get My Preview
             </Button>
          </div>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage selectedIndustry={selectedIndustry} onServiceClick={handleServiceClick} />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </main>

      {/* Footer - only show on home page */}
      {isHomePage && (
        <footer className="bg-dark-950 border-t border-white/[0.06] text-zinc-400 py-12">
          <div className="container mx-auto px-4 text-center">
              <div className="flex items-center justify-center gap-2.5 mb-4">
                  <img
                    src="/images/vibelyheader.png"
                    alt="Vibely"
                    className="h-7 object-contain rounded-md"
                  />
                  <span className="text-lg font-bold font-heading text-white">Vibely</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4 text-sm">
                <a href="mailto:hello@vibely.co.nz" className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                  <Mail className="w-4 h-4" />
                  hello@vibely.co.nz
                </a>
              </div>
            <p className="text-sm text-zinc-600">&copy; {new Date().getFullYear()} Vibely. All rights reserved.</p>
            <div className="mt-4 flex justify-center gap-6 text-sm">
              <button onClick={() => setLegalModal('privacy')} className="text-zinc-500 hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
              <button onClick={() => setLegalModal('terms')} className="text-zinc-500 hover:text-white transition-colors cursor-pointer">Terms of Service</button>
            </div>
          </div>
        </footer>
      )}

      {/* Sticky Mobile CTA (Bottom) - only on home page */}
      {isHomePage && (
        <div className={`fixed bottom-0 left-0 right-0 p-4 bg-dark-950/90 backdrop-blur-xl border-t border-white/[0.06] md:hidden transition-transform duration-300 z-40 ${isScrolled ? 'translate-y-0' : 'translate-y-full'}`}>
            <Button fullWidth onClick={scrollToForm}>
                Get My Instant Preview
            </Button>
        </div>
      )}

      {/* Legal Modals */}
      <LegalModal
        isOpen={legalModal !== null}
        onClose={() => setLegalModal(null)}
        type={legalModal || 'terms'}
      />

    </div>
  );
}
