import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { LogoTicker } from './components/LogoTicker';
import { ProcessSteps } from './components/ProcessSteps';
import { ComparisonTable } from './components/ComparisonTable';
import { PricingGrid } from './components/PricingGrid';
import { PreviewFormWizard } from './components/PreviewFormWizard';
import { Button } from './components/ui/Button';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById('instant-preview')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-pink-100 selection:text-pink-900">
      
      {/* Navbar */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Logo */}
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-orange-400 rounded-lg transform rotate-3 flex items-center justify-center text-white font-bold text-xl">
                V
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">Vibely</span>
          </div>
          
          <div className="flex items-center gap-4">
             <a href="#pricing" className="hidden md:block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
             <Button size="sm" onClick={scrollToForm}>
                Get My Preview
             </Button>
          </div>
        </div>
      </header>

      <main>
        <HeroSection />
        <LogoTicker />
        <ProcessSteps />
        <ComparisonTable />
        <PricingGrid />
        <PreviewFormWizard />
      </main>

      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-pink-500 to-orange-400 rounded-md flex items-center justify-center text-white font-bold text-sm">
                    V
                </div>
                <span className="text-lg font-bold text-white">Vibely</span>
            </div>
          <p className="text-sm">© {new Date().getFullYear()} Vibely. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA (Bottom) */}
      <div className={`fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg md:hidden transition-transform duration-300 z-40 ${isScrolled ? 'translate-y-0' : 'translate-y-full'}`}>
          <Button fullWidth onClick={scrollToForm} className="shadow-orange-500/20">
              Get My Instant Preview
          </Button>
      </div>

    </div>
  );
}