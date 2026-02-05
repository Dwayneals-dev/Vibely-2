import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollToForm = () => {
    document.getElementById('instant-preview')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Background decoration for the whole section since we removed the specific image blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-orange-600 mr-2"></span>
              Stop losing money on DIY builders
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:leading-tight">
              Get a Premium Website for Your Business in <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-500">48 Hours</span>
            </h1>
            
            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Without the agency price tag. We build, host, and manage a stunning site for you—starting at just <span className="font-bold text-gray-900">$45/mo</span>.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" onClick={scrollToForm} className="w-full sm:w-auto">
                See My Instant Preview
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-2 sm:mt-0 px-4">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                No credit card required
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};