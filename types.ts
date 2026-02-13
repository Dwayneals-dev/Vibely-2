export interface PricingTier {
  name: string;
  description: string;
  month1: number;
  monthlyOngoing: number;
  annual: number;
  prepaid: number;
  isPlus?: boolean;
  features: string[];
  highlight?: boolean;
}

export interface ComparisonRow {
  feature: string;
  vibely: string;
  diy: string;
  agency: string;
}

export interface FormData {
  // Step 1: Identity
  businessName: string;
  contactName: string;
  industry: string;
  otherIndustry: string;
  city: string;
  // Step 2: Contact
  email: string;
  phone: string;
  // Step 3: Business Details (optional)
  services: string;
  websiteStatus: 'no' | 'yes-update' | 'yes-expensive' | null;
  existingUrl: string;
  differentiators: string;
  websiteGoals: string[];
  // Step 4: Uploads + Final (optional)
  logo: File | null;
  brandGuide: File | null;
  galleryPhotos: File[];
  teamPhotos: File[];
  documents: File[];
  additionalNotes: string;
  hearAboutUs: string;
}

export enum FormStep {
  IDENTITY = 1,
  CONTACT = 2,
  DETAILS = 3,
  UPLOADS = 4,
  SUCCESS = 5,
}

export const GOAL_OPTIONS = [
  { id: 'phone-calls', label: 'Get phone calls' },
  { id: 'quote-requests', label: 'Get quote requests' },
  { id: 'book-online', label: 'Book appointments online' },
  { id: 'google-seo', label: 'Show up on Google' },
  { id: 'look-professional', label: 'Look professional' },
  { id: 'sell-online', label: 'Sell products online' },
] as const;

export const REFERRAL_OPTIONS = [
  'Google Search',
  'Facebook / Instagram',
  'Referral / Word of Mouth',
  'Saw a Vibely site',
  'Flyer / Print',
  'Other',
] as const;
