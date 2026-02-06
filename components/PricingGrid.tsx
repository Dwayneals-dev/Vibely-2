import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from './ui/Button';
import { PricingTier } from '../types';

interface Tier extends PricingTier {
  tier: string;
}

export const PricingGrid: React.FC = () => {
  const tiers: Tier[] = [
    {
      tier: "One",
      name: "LANDING",
      setupCost: 90,
      monthlyCost: 45,
      description: "A sharp, professional site that gets you found and captures leads — live in 48 hours.",
      features: ["1-Page High-Conversion Design", "Lead Capture Form", "Hosting & SSL Included", "Mobile Optimised"],
      highlight: true
    },
    {
      tier: "Plus",
      name: "LAUNCHING",
      setupCost: 675,
      monthlyCost: 135,
      description: "Everything in Landing, plus bookings, automations, and the tools to turn traffic into revenue.",
      features: ["Multi-Page Site (Up to 5)", "Online Booking System", "Google Business Profile Setup", "Basic SEO Optimisation", "Monthly Performance Report"],
      highlight: false
    },
    {
      tier: "Pro",
      name: "ORBIT",
      setupCost: 3000,
      monthlyCost: 270,
      description: "Fully custom and built to dominate — e-commerce, advanced SEO, and priority support.",
      features: ["Fully Custom Design", "E-Commerce Integration", "Advanced SEO Package", "Dedicated Account Manager", "Priority Support"],
      highlight: false
    }
  ];

  const scrollToForm = () => {
    document.getElementById('instant-preview')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-dark-900 relative overflow-hidden" id="pricing">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent-pink/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-extrabold font-heading text-white sm:text-4xl">
            Simple, flat-rate{' '}
            <span className="text-gradient">pricing.</span>
          </h2>
          <p className="mt-4 text-xl text-zinc-400">
            No hidden fees. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {tiers.map((tier, index) => {
             const isOrbit = tier.name === 'ORBIT';

             return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative group pricing-card ${tier.highlight ? 'lg:scale-105 z-10' : ''}`}
              >
                {/* Glow for highlighted */}
                {tier.highlight && (
                  <div className="absolute -inset-1 bg-gradient-to-b from-accent-pink/20 via-accent-orange/10 to-transparent rounded-2xl blur-xl opacity-60" />
                )}

                {/* Hover gradient background */}
                <div className="pricing-card-gradient absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className={`relative flex flex-col rounded-2xl p-8 h-full pricing-card-inner transition-all duration-400 ${
                  tier.highlight
                    ? 'bg-dark-800/80 border border-accent-pink/20 backdrop-blur-sm'
                    : 'glass-card'
                }`}>
                  {tier.highlight && (
                    <div className="absolute top-0 right-0 -mt-3 mr-4 bg-gradient-to-r from-accent-pink to-accent-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      Most Popular
                    </div>
                  )}

                  <p className="text-xs font-semibold uppercase tracking-widest text-accent-pink mb-1">{tier.tier}</p>
                  <h3 className="text-lg font-semibold font-heading leading-5 text-white">{tier.name}</h3>
                  <p className="mt-4 text-sm text-zinc-400 leading-6">{tier.description}</p>

                  <div className="mt-4 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-white">${tier.monthlyCost}{isOrbit ? '+' : ''}</span>
                    <span className="text-sm font-semibold leading-6 text-zinc-500">/mo</span>
                  </div>
                  <p className="text-sm text-zinc-500 mt-1">+ ${tier.setupCost.toLocaleString()}{isOrbit ? '+' : ''} one-time setup</p>

                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-zinc-400 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <Check className="h-5 w-5 flex-none text-accent-pink" aria-hidden="true" />
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
                    {isOrbit ? 'Contact Us' : 'Choose Plan'}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .pricing-card-gradient {
          background: linear-gradient(
            135deg,
            rgba(232, 85, 160, 0.08) 0%,
            rgba(251, 146, 60, 0.06) 50%,
            rgba(139, 92, 246, 0.08) 100%
          );
        }
        .pricing-card:hover .pricing-card-inner {
          border-color: rgba(232, 85, 160, 0.2);
          box-shadow:
            0 0 30px rgba(232, 85, 160, 0.08),
            0 0 60px rgba(251, 146, 60, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }
        @media (prefers-reduced-motion: reduce) {
          .pricing-card-gradient,
          .pricing-card-inner {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};
