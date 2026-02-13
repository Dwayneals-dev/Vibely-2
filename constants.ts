import { PricingTier } from './types';

export const COMPANY_NAME = "Vibely";
export const SUPPORT_EMAIL = "hello@vibely.co.nz";

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Land',
    description: '1-page lead gen landing page',
    month1: 200,
    monthlyOngoing: 40,
    annual: 640,
    prepaid: 480,
    isPlus: false,
    features: [
      '1-Page High-Conversion Design',
      'Lead Capture Form',
      'Hosting & SSL Included',
      'Mobile Optimised',
    ],
    highlight: false,
  },
  {
    name: 'Launch',
    description: '2\u20138 page website',
    month1: 600,
    monthlyOngoing: 60,
    annual: 1260,
    prepaid: 945,
    isPlus: false,
    features: [
      'Multi-Page Site (Up to 8)',
      'Online Booking System',
      'Google Business Profile Setup',
      'Basic SEO Optimisation',
      'Monthly Performance Report',
    ],
    highlight: true,
  },
  {
    name: 'Orbit',
    description: 'Custom build + automations + AI',
    month1: 3000,
    monthlyOngoing: 150,
    annual: 4650,
    prepaid: 3487.50,
    isPlus: true,
    features: [
      'Fully Custom Design',
      'E-Commerce Integration',
      'Advanced SEO Package',
      'Dedicated Account Manager',
      'Priority Support',
    ],
    highlight: false,
  },
];
