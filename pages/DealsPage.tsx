import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Flame, Clock, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { PRICING_TIERS } from '../constants';

interface Deal {
  tierName: string;
  dealName: string;
  spots: number;
  discountPct: number;
  month1Original: number;
  month1Discounted: number;
  monthlyOngoing: number;
  annual12OptionA: number;
  prepaidOriginal: number;
  prepaidDiscounted: number;
  icon: React.ReactNode;
  accentClass: string;
  glowColor: string;
}

const DEALS: Deal[] = [
  {
    tierName: 'Landing',
    dealName: '50/50',
    spots: 50,
    discountPct: 50,
    month1Original: 200,
    month1Discounted: 100,
    monthlyOngoing: 40,
    annual12OptionA: 540,
    prepaidOriginal: 640,
    prepaidDiscounted: 320,
    icon: <Zap className="w-5 h-5" />,
    accentClass: 'text-accent-pink',
    glowColor: 'rgba(232, 85, 160, 0.2)',
  },
  {
    tierName: 'Launching',
    dealName: '40/40',
    spots: 40,
    discountPct: 40,
    month1Original: 600,
    month1Discounted: 360,
    monthlyOngoing: 60,
    annual12OptionA: 1020,
    prepaidOriginal: 1260,
    prepaidDiscounted: 756,
    icon: <Flame className="w-5 h-5" />,
    accentClass: 'text-accent-orange',
    glowColor: 'rgba(251, 146, 60, 0.2)',
  },
  {
    tierName: 'Orbit',
    dealName: '30/30',
    spots: 30,
    discountPct: 30,
    month1Original: 3000,
    month1Discounted: 2100,
    monthlyOngoing: 150,
    annual12OptionA: 3750,
    prepaidOriginal: 4650,
    prepaidDiscounted: 3255,
    icon: <Clock className="w-5 h-5" />,
    accentClass: 'text-accent-violet',
    glowColor: 'rgba(139, 92, 246, 0.2)',
  },
];

const DealCard: React.FC<{ deal: Deal; index: number }> = ({ deal, index }) => {
  const [activeOption, setActiveOption] = useState<'A' | 'B'>('A');
  const isOrbit = deal.tierName === 'Orbit';
  const plus = isOrbit ? '+' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="relative group"
    >
      {/* Hover glow */}
      <div
        className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
        style={{ background: `radial-gradient(circle, ${deal.glowColor}, transparent 70%)` }}
      />

      <div className="relative glass-card rounded-2xl overflow-hidden h-full flex flex-col">
        {/* Deal header */}
        <div className="p-6 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className={deal.accentClass}>{deal.icon}</span>
              <span className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">{deal.tierName}</span>
            </div>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-1.5 bg-accent-pink/10 border border-accent-pink/20 rounded-full px-3 py-1"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent-pink animate-pulse" />
              <span className="text-xs font-bold text-accent-pink">{deal.spots} spots</span>
            </motion.div>
          </div>

          <h3 className="text-3xl font-extrabold font-heading text-white">{deal.dealName}</h3>
          <p className="text-sm text-zinc-500 mt-1">{deal.discountPct}% off &mdash; choose how you save</p>
        </div>

        {/* Option toggle */}
        <div className="px-6 pt-4">
          <div className="flex rounded-lg bg-dark-800 border border-white/[0.06] p-0.5">
            <button
              onClick={() => setActiveOption('A')}
              className={`flex-1 py-2 px-3 text-xs font-semibold rounded-md transition-all duration-200 cursor-pointer ${
                activeOption === 'A'
                  ? 'bg-gradient-to-r from-accent-pink to-accent-orange text-white shadow-md'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Month 1 Discount
            </button>
            <button
              onClick={() => setActiveOption('B')}
              className={`flex-1 py-2 px-3 text-xs font-semibold rounded-md transition-all duration-200 cursor-pointer ${
                activeOption === 'B'
                  ? 'bg-gradient-to-r from-accent-pink to-accent-orange text-white shadow-md'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Prepaid Discount
            </button>
          </div>
        </div>

        {/* Pricing content */}
        <div className="p-6 flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {activeOption === 'A' ? (
              <motion.div
                key="optionA"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Month 1</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white font-heading">${deal.month1Discounted.toLocaleString()}{plus}</span>
                  <span className="text-lg text-zinc-600 line-through">${deal.month1Original.toLocaleString()}{plus}</span>
                </div>
                <p className="text-sm text-zinc-400 mt-2">then ${deal.monthlyOngoing}{plus}/mo</p>
                <div className="mt-3 inline-flex items-center bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
                  <span className="text-xs font-bold text-green-400">12-month total: ${deal.annual12OptionA.toLocaleString()}{plus}</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="optionB"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Prepaid 12 Months</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white font-heading">${deal.prepaidDiscounted.toLocaleString()}{plus}</span>
                  <span className="text-lg text-zinc-600 line-through">${deal.prepaidOriginal.toLocaleString()}{plus}</span>
                </div>
                <p className="text-sm text-zinc-400 mt-2">one payment, everything included</p>
                <div className="mt-3 inline-flex items-center bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
                  <span className="text-xs font-bold text-green-400">Save ${(deal.prepaidOriginal - deal.prepaidDiscounted).toLocaleString()}{plus}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto pt-6">
            <Link to="/#instant-preview">
              <Button variant="primary" fullWidth>
                Claim This Deal
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const DealsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-950 font-sans text-zinc-100 selection:bg-accent-pink/20 selection:text-white grain">
      {/* Background glows */}
      <div className="absolute top-[10%] left-1/4 w-[600px] h-[400px] bg-accent-pink/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-1/4 w-[500px] h-[400px] bg-accent-orange/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-1/3 w-[400px] h-[300px] bg-accent-violet/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-6"
        >
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center gap-2 bg-accent-orange/10 border border-accent-orange/20 rounded-full px-4 py-1.5 text-sm font-bold text-accent-orange mb-6"
          >
            <Flame className="w-4 h-4" />
            February 2026 only
          </motion.div>

          <h1 className="text-4xl font-extrabold font-heading text-white sm:text-5xl lg:text-6xl">
            February Founders{' '}
            <span className="text-gradient">Deals.</span>
          </h1>
          <p className="mt-4 text-xl text-zinc-400 max-w-2xl mx-auto">
            Lock in founding member pricing. Limited spots per tier. Choose your discount: save on Month 1 or save on 12 months prepaid.
          </p>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-16"
        >
          <div className="glass-card rounded-xl p-5 text-center">
            <div className="text-xs font-bold text-accent-pink uppercase tracking-wider mb-2">Option A</div>
            <p className="text-sm text-zinc-300 font-medium">Month 1 Discount</p>
            <p className="text-xs text-zinc-500 mt-1">Save on your build fee. Monthly stays the same.</p>
          </div>
          <div className="glass-card rounded-xl p-5 text-center">
            <div className="text-xs font-bold text-accent-orange uppercase tracking-wider mb-2">Option B</div>
            <p className="text-sm text-zinc-300 font-medium">Prepaid Discount</p>
            <p className="text-xs text-zinc-500 mt-1">Pay 12 months upfront at the deal rate.</p>
          </div>
        </motion.div>

        {/* Deal cards */}
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8 max-w-6xl mx-auto mb-16">
          {DEALS.map((deal, index) => (
            <DealCard key={deal.dealName} deal={deal} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto"
        >
          <p className="text-zinc-400 mb-2">Not sure which plan?</p>
          <p className="text-sm text-zinc-500 mb-6">
            Get your free preview first — no commitment. Pick your deal after you've seen your site.
          </p>
          <Link to="/#instant-preview">
            <Button size="lg">
              See Your Site Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
