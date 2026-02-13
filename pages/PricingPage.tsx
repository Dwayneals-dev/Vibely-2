import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { PRICING_TIERS } from '../constants';

export const PricingPage: React.FC = () => {
  const [isPrepaid, setIsPrepaid] = useState(false);

  const formatPrice = (amount: number, isPlus?: boolean) => {
    const formatted = amount % 1 === 0
      ? `$${amount.toLocaleString()}`
      : `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return isPlus ? `${formatted}+` : formatted;
  };

  return (
    <div className="min-h-screen bg-dark-950 font-sans text-zinc-100 selection:bg-accent-pink/20 selection:text-white grain">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent-pink/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-accent-violet/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-4xl font-extrabold font-heading text-white sm:text-5xl">
            Simple, transparent{' '}
            <span className="text-gradient">pricing.</span>
          </h1>
          <p className="mt-4 text-xl text-zinc-400">
            Build fee + monthly. No contracts. Cancel anytime.
          </p>
        </motion.div>

        {/* Monthly / Prepaid Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center rounded-full bg-dark-800 border border-white/[0.08] p-1">
            <button
              onClick={() => setIsPrepaid(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                !isPrepaid
                  ? 'bg-gradient-to-r from-accent-pink to-accent-orange text-white shadow-lg'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsPrepaid(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                isPrepaid
                  ? 'bg-gradient-to-r from-accent-pink to-accent-orange text-white shadow-lg'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Prepaid 12 Months
              <span className="ml-1.5 text-xs font-bold text-green-400">Save 25%</span>
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8 max-w-6xl mx-auto">
          {PRICING_TIERS.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative group pricing-card ${tier.highlight ? 'lg:scale-105 z-10' : ''}`}
            >
              {tier.highlight && (
                <div className="absolute -inset-1 bg-gradient-to-b from-accent-pink/20 via-accent-orange/10 to-transparent rounded-2xl blur-xl opacity-60" />
              )}

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

                <h3 className="text-lg font-semibold font-heading leading-5 text-white uppercase tracking-wide">{tier.name}</h3>
                <p className="mt-2 text-sm text-zinc-500">{tier.description}</p>

                <AnimatePresence mode="wait">
                  {isPrepaid ? (
                    <motion.div
                      key="prepaid"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="mt-5"
                    >
                      <div className="flex items-baseline gap-x-1">
                        <span className="text-4xl font-bold tracking-tight text-white">
                          {formatPrice(tier.prepaid, tier.isPlus)}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-500 mt-1">
                        <span className="line-through text-zinc-600">{formatPrice(tier.annual, tier.isPlus)}</span>
                        {' '}prepaid 12 months
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="monthly"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="mt-5"
                    >
                      <div className="flex items-baseline gap-x-1">
                        <span className="text-4xl font-bold tracking-tight text-white">
                          {formatPrice(tier.month1, tier.isPlus)}
                        </span>
                        <span className="text-sm font-semibold leading-6 text-zinc-500">Month 1</span>
                      </div>
                      <p className="text-sm text-zinc-500 mt-1">
                        then {formatPrice(tier.monthlyOngoing, tier.isPlus)}/mo
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <ul className="mt-8 space-y-3 text-sm leading-6 text-zinc-400 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-5 w-5 flex-none text-accent-pink" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to="/#instant-preview">
                  <Button
                    className="mt-8"
                    variant={tier.highlight ? 'primary' : 'outline'}
                    fullWidth
                  >
                    {tier.isPlus ? 'Contact Us' : 'Choose Plan'}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .pricing-card-gradient {
          background: linear-gradient(135deg, rgba(232,85,160,0.08) 0%, rgba(251,146,60,0.06) 50%, rgba(139,92,246,0.08) 100%);
        }
        .pricing-card:hover .pricing-card-inner {
          border-color: rgba(232,85,160,0.2);
          box-shadow: 0 0 30px rgba(232,85,160,0.08), 0 0 60px rgba(251,146,60,0.04), inset 0 1px 0 rgba(255,255,255,0.06);
        }
        @media (prefers-reduced-motion: reduce) {
          .pricing-card-gradient, .pricing-card-inner { transition: none !important; }
        }
      `}</style>
    </div>
  );
};
