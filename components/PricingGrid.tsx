import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from './ui/Button';
import { PricingTier } from '../types';

export const PricingGrid: React.FC = () => {
  const [addAI, setAddAI] = useState(false);
  const [addDomain, setAddDomain] = useState(false);

  const tiers: PricingTier[] = [
    {
      name: "LANDING",
      setupCost: 90,
      monthlyCost: 45,
      description: "The No-Brainer. Perfect for simple lead capture.",
      features: ["1-Page High-Conversion Design", "Lead Capture Form", "Hosting & SSL Included", "Mobile Optimized"],
      highlight: false
    },
    {
      name: "MOMENTUM",
      setupCost: 299,
      monthlyCost: 199,
      description: "The Growth Engine. Our most popular plan.",
      features: ["5-Page Complete Site", "Integrated CRM", "Online Booking System", "Automated Chatbot", "Google Business Profile Sync"],
      highlight: true
    },
    {
      name: "TAKE OFF",
      setupCost: 3000,
      monthlyCost: 400, // Just a placeholder for "Custom"
      description: "For when you need the moon.",
      features: ["Fully Custom Design", "E-commerce Integration", "Advanced SEO Package", "Dedicated Account Manager", "Priority Support"],
      highlight: false
    }
  ];

  const scrollToForm = () => {
    document.getElementById('instant-preview')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-white" id="pricing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, flat-rate pricing.
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Feature Toggles */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12 bg-gray-50 p-6 rounded-2xl max-w-2xl mx-auto border border-gray-100">
          <div className="flex items-center space-x-3">
             <div 
                onClick={() => setAddAI(!addAI)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${addAI ? 'bg-pink-600' : 'bg-gray-200'}`}
             >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${addAI ? 'translate-x-5' : 'translate-x-0'}`} />
             </div>
             <span className="text-sm font-medium text-gray-900">Add AI Receptionist (+$65/mo)</span>
          </div>
          
          <div className="flex items-center space-x-3">
             <div 
                onClick={() => setAddDomain(!addDomain)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${addDomain ? 'bg-pink-600' : 'bg-gray-200'}`}
             >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${addDomain ? 'translate-x-5' : 'translate-x-0'}`} />
             </div>
             <span className="text-sm font-medium text-gray-900">Custom Domain (+$50/yr)</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-8">
          {tiers.map((tier) => {
             let monthly = tier.monthlyCost;
             if (addAI) monthly += 65;
             // Domain is yearly, usually separate, but for simplicity of visual logic we won't add to monthly here, 
             // just acknowledging the user toggled it.
             
             return (
              <div 
                key={tier.name} 
                className={`relative flex flex-col rounded-2xl border ${tier.highlight ? 'border-orange-500 shadow-xl scale-105 z-10' : 'border-gray-200 shadow-sm'} bg-white p-8`}
              >
                {tier.highlight && (
                  <div className="absolute top-0 right-0 -mt-4 mr-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Best Value
                  </div>
                )}
                
                <h3 className="text-lg font-semibold leading-5 text-gray-900">{tier.name}</h3>
                <p className="mt-4 text-sm text-gray-500 leading-6">{tier.description}</p>
                
                <div className="mt-4 flex items-baseline gap-x-1">
                  {tier.name === 'TAKE OFF' ? (
                     <span className="text-4xl font-bold tracking-tight text-gray-900">$3k+</span>
                  ) : (
                    <>
                        <span className="text-4xl font-bold tracking-tight text-gray-900">${monthly}</span>
                        <span className="text-sm font-semibold leading-6 text-gray-600">/mo</span>
                    </>
                  )}
                </div>
                {tier.name !== 'TAKE OFF' && (
                    <p className="text-sm text-gray-500 mt-1">+ ${tier.setupCost} one-time setup</p>
                )}
                {addDomain && tier.name !== 'TAKE OFF' && (
                     <p className="text-xs text-green-600 font-medium mt-1">+ Custom Domain included</p>
                )}

                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-6 w-5 flex-none text-pink-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                    className="mt-8" 
                    variant={tier.highlight ? 'primary' : 'outline'} 
                    fullWidth
                    onClick={scrollToForm}
                >
                  {tier.name === 'TAKE OFF' ? 'Contact Us' : 'Choose Plan'}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};