export interface PricingTier {
  name: string;
  setupCost: number;
  monthlyCost: number;
  description: string;
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
  industry: string;
  city: string;
  phone: string;
  email: string;
  hasWebsite: string | null; // 'yes' | 'no'
}

export enum FormStep {
  HOOK = 1,
  CONTACT = 2,
  QUALIFICATION = 3,
  SUCCESS = 4
}