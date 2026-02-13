import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { FileUploadZone } from './FileUploadZone';
import { FormData, FormStep, GOAL_OPTIONS, REFERRAL_OPTIONS } from '../types';
import { CheckCircle, AlertCircle, ArrowRight, Sparkles, Globe, SkipForward } from 'lucide-react';

// Map carousel service names to form dropdown values
const serviceToIndustryMap: Record<string, string> = {
  "Plumbers": "Plumber",
  "Electricians": "Electrician",
  "HVAC & Heat Pumps": "HVAC / Heat Pumps",
  "Builders": "Builder / Construction",
  "Roofers": "Roofer",
  "Painters & Decorators": "Painter & Decorator",
  "Landscapers": "Landscaper",
  "Lawn Mowing": "Lawn Mowing",
  "Arborists": "Arborist / Tree Services",
  "Fencing & Gates": "Fencing & Gates",
  "Concrete & Paving": "Concrete / Paving",
  "Carpenters & Joiners": "Carpenter / Joiner",
  "Handymen": "Handyman",
  "Cleaning Companies": "Cleaning Company",
  "Pest Control": "Pest Control",
  "Pool Maintenance": "Pool Maintenance",
  "Security Installers": "Security Installer",
  "Moving Companies": "Moving Company",
  "Auto Mechanics": "Auto Mechanic",
  "Panel Beaters": "Panel Beater",
  "Car Detailers": "Car Detailer",
  "Real Estate Agents": "Real Estate Agent",
  "Property Managers": "Property Manager",
  "Mortgage Brokers": "Mortgage Broker",
  "Accountants": "Accountant / Bookkeeper",
  "Lawyers": "Lawyer",
  "Dentists": "Dentist",
  "Physios & Chiros": "Physio / Chiropractor",
  "Gyms & PTs": "Gym / Personal Trainer",
  "Restaurants & Cafes": "Restaurant / Cafe",
};

const TOTAL_STEPS = 4;
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8 MB

interface PreviewFormWizardProps {
  prefilledIndustry?: string;
}

export const PreviewFormWizard: React.FC<PreviewFormWizardProps> = ({ prefilledIndustry }) => {
  const [step, setStep] = useState<FormStep>(FormStep.IDENTITY);
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    contactName: '',
    industry: '',
    otherIndustry: '',
    city: '',
    email: '',
    phone: '',
    services: '',
    websiteStatus: null,
    existingUrl: '',
    differentiators: '',
    websiteGoals: [],
    logo: null,
    brandGuide: null,
    galleryPhotos: [],
    teamPhotos: [],
    documents: [],
    additionalNotes: '',
    hearAboutUs: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (prefilledIndustry) {
      const mapped = serviceToIndustryMap[prefilledIndustry] || prefilledIndustry;
      setFormData(prev => ({ ...prev, industry: mapped }));
    }
  }, [prefilledIndustry]);

  const totalUploadSize = useMemo(() => {
    const all = [
      ...(formData.logo ? [formData.logo] : []),
      ...(formData.brandGuide ? [formData.brandGuide] : []),
      ...formData.galleryPhotos,
      ...formData.teamPhotos,
      ...formData.documents,
    ];
    return all.reduce((sum, f) => sum + f.size, 0);
  }, [formData.logo, formData.brandGuide, formData.galleryPhotos, formData.teamPhotos, formData.documents]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const toggleGoal = (goalId: string) => {
    setFormData(prev => ({
      ...prev,
      websiteGoals: prev.websiteGoals.includes(goalId)
        ? prev.websiteGoals.filter(g => g !== goalId)
        : [...prev.websiteGoals, goalId],
    }));
  };

  const nextStep = () => {
    if (step === FormStep.IDENTITY) {
      if (!formData.businessName.trim()) { setError("Please enter your business name."); return; }
      if (!formData.contactName.trim()) { setError("Please enter your name."); return; }
      if (!formData.industry) { setError("Please select your industry."); return; }
      if (formData.industry === 'Other' && !formData.otherIndustry.trim()) { setError("Please specify your industry."); return; }
      if (!formData.city.trim()) { setError("Please enter your city or town."); return; }
    }
    if (step === FormStep.CONTACT) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.match(emailRegex)) { setError("Please enter a valid email address."); return; }
      if (!formData.phone.trim()) { setError("Please enter your mobile number."); return; }
    }
    setError(null);
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    setError(null);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const data = new window.FormData();
      data.append('form-name', 'preview-request');
      data.append('businessName', formData.businessName);
      data.append('contactName', formData.contactName);
      data.append('industry', formData.industry === 'Other' ? formData.otherIndustry : formData.industry);
      data.append('otherIndustry', formData.otherIndustry);
      data.append('city', formData.city);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('services', formData.services);
      data.append('websiteStatus', formData.websiteStatus || '');
      data.append('existingUrl', formData.existingUrl);
      data.append('differentiators', formData.differentiators);
      data.append('websiteGoals', formData.websiteGoals.join(', '));
      data.append('additionalNotes', formData.additionalNotes);
      data.append('hearAboutUs', formData.hearAboutUs);

      // Append files if present and within limit
      if (totalUploadSize <= MAX_UPLOAD_BYTES) {
        if (formData.logo) data.append('logo', formData.logo);
        if (formData.brandGuide) data.append('brandGuide', formData.brandGuide);
        formData.galleryPhotos.forEach(f => data.append('galleryPhotos', f));
        formData.teamPhotos.forEach(f => data.append('teamPhotos', f));
        formData.documents.forEach(f => data.append('documents', f));
      }

      const response = await fetch('/', { method: 'POST', body: data });

      if (!response.ok) throw new Error('Form submission failed');

      setIsSubmitting(false);
      setStep(FormStep.SUCCESS);
    } catch {
      setIsSubmitting(false);
      setError('Something went wrong. Please try again.');
    }
  };

  const inputStyles = "w-full px-4 py-3 rounded-xl bg-dark-700 border border-white/[0.08] text-white placeholder-zinc-500 focus:ring-2 focus:ring-accent-pink/50 focus:border-transparent transition-all";
  const selectStyles = `${inputStyles} cursor-pointer appearance-none`;
  const textareaStyles = `${inputStyles} resize-none`;

  const progressWidth = `${(Math.min(step, TOTAL_STEPS) / TOTAL_STEPS) * 100}%`;

  const ErrorBanner = () => error ? (
    <div className="mt-4 flex items-center text-red-400 text-sm bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
      <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
      {error}
    </div>
  ) : null;

  return (
    <section id="instant-preview" className="py-24 bg-dark-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-pink/[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-accent-violet/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 text-accent-pink text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Free, no obligation
          </div>
          <h2 className="text-3xl font-extrabold font-heading text-white sm:text-4xl">
            See your site before you{' '}
            <span className="text-gradient">spend a cent.</span>
          </h2>
          <p className="mt-4 text-zinc-400">
            Tell us your trade and your town. We'll build your site and send you the link.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <div className="absolute left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-gradient-to-b from-accent-pink/10 to-accent-violet/5 rounded-3xl blur-3xl pointer-events-none" />

          <div className="relative glass-card rounded-2xl overflow-hidden">
            {/* Progress Bar */}
            <div className="bg-dark-700 h-1 w-full">
              <div
                className="h-full bg-gradient-to-r from-accent-pink to-accent-orange transition-all duration-500"
                style={{ width: progressWidth }}
              />
            </div>

            {/* Step indicator */}
            {step <= TOTAL_STEPS && (
              <div className="px-8 pt-6 sm:px-10 flex items-center justify-between">
                <span className="text-xs text-zinc-500">Step {step} of {TOTAL_STEPS}</span>
                {step >= FormStep.DETAILS && (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-accent-pink transition-colors cursor-pointer"
                  >
                    <SkipForward className="w-3.5 h-3.5" />
                    Skip &amp; Submit
                  </button>
                )}
              </div>
            )}

            <div className="p-8 sm:p-10 pt-4">
              <AnimatePresence mode="wait">

                {/* ─── STEP 1: IDENTITY ─── */}
                {step === FormStep.IDENTITY && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-2xl font-bold font-heading text-white mb-2">Let's build your preview.</h3>
                    <p className="text-zinc-400 mb-6">First, tell us about your business.</p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Business Name <span className="text-accent-pink">*</span></label>
                        <input type="text" name="businessName" placeholder="e.g. Smith Plumbing Ltd" value={formData.businessName} onChange={handleInputChange} className={inputStyles} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Your Name <span className="text-accent-pink">*</span></label>
                        <input type="text" name="contactName" placeholder="e.g. John Smith" value={formData.contactName} onChange={handleInputChange} className={inputStyles} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Industry <span className="text-accent-pink">*</span></label>
                        <select name="industry" value={formData.industry} onChange={handleInputChange} className={selectStyles}>
                          <option value="" disabled>Please select</option>
                          <option value="Plumber">Plumber</option>
                          <option value="Electrician">Electrician</option>
                          <option value="HVAC / Heat Pumps">HVAC / Heat Pumps</option>
                          <option value="Builder / Construction">Builder / Construction</option>
                          <option value="Roofer">Roofer</option>
                          <option value="Painter & Decorator">Painter & Decorator</option>
                          <option value="Landscaper">Landscaper</option>
                          <option value="Lawn Mowing">Lawn Mowing</option>
                          <option value="Arborist / Tree Services">Arborist / Tree Services</option>
                          <option value="Fencing & Gates">Fencing & Gates</option>
                          <option value="Concrete / Paving">Concrete / Paving</option>
                          <option value="Carpenter / Joiner">Carpenter / Joiner</option>
                          <option value="Handyman">Handyman</option>
                          <option value="Cleaning Company">Cleaning Company</option>
                          <option value="Pest Control">Pest Control</option>
                          <option value="Pool Maintenance">Pool Maintenance</option>
                          <option value="Security Installer">Security Installer</option>
                          <option value="Moving Company">Moving Company</option>
                          <option value="Auto Mechanic">Auto Mechanic</option>
                          <option value="Panel Beater">Panel Beater</option>
                          <option value="Car Detailer">Car Detailer</option>
                          <option value="Real Estate Agent">Real Estate Agent</option>
                          <option value="Property Manager">Property Manager</option>
                          <option value="Mortgage Broker">Mortgage Broker</option>
                          <option value="Accountant / Bookkeeper">Accountant / Bookkeeper</option>
                          <option value="Lawyer">Lawyer</option>
                          <option value="Dentist">Dentist</option>
                          <option value="Physio / Chiropractor">Physio / Chiropractor</option>
                          <option value="Gym / Personal Trainer">Gym / Personal Trainer</option>
                          <option value="Restaurant / Cafe">Restaurant / Cafe</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      {formData.industry === 'Other' && (
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-1.5">Please specify <span className="text-accent-pink">*</span></label>
                          <input type="text" name="otherIndustry" placeholder="e.g. Dog Grooming" value={formData.otherIndustry} onChange={handleInputChange} className={inputStyles} />
                        </div>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">City / Town <span className="text-accent-pink">*</span></label>
                        <input type="text" name="city" placeholder="e.g. Auckland" value={formData.city} onChange={handleInputChange} className={inputStyles} />
                      </div>
                    </div>

                    <ErrorBanner />

                    <Button onClick={nextStep} fullWidth className="mt-8">
                      Next Step <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>
                )}

                {/* ─── STEP 2: CONTACT ─── */}
                {step === FormStep.CONTACT && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-2xl font-bold font-heading text-white mb-2">Where should we send it?</h3>
                    <p className="text-zinc-400 mb-6">We'll email you a private link to your custom design.</p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Email Address <span className="text-accent-pink">*</span></label>
                        <input type="email" name="email" placeholder="you@company.co.nz" value={formData.email} onChange={handleInputChange} className={inputStyles} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Mobile <span className="text-accent-pink">*</span></label>
                        <input type="tel" name="phone" placeholder="021 123 4567" value={formData.phone} onChange={handleInputChange} className={inputStyles} />
                      </div>
                    </div>

                    <ErrorBanner />

                    <div className="flex gap-3 mt-8">
                      <Button variant="ghost" onClick={prevStep} className="w-1/3">Back</Button>
                      <Button onClick={nextStep} className="w-2/3">Continue</Button>
                    </div>
                  </motion.div>
                )}

                {/* ─── STEP 3: BUSINESS DETAILS ─── */}
                {step === FormStep.DETAILS && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-2xl font-bold font-heading text-white mb-2">Tell us more.</h3>
                    <p className="text-zinc-400 mb-6">The more we know, the better your preview. Everything here is optional.</p>

                    <div className="space-y-5">
                      {/* Services */}
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">What services do you offer?</label>
                        <textarea
                          name="services"
                          rows={2}
                          placeholder="e.g. Residential plumbing, hot water installs, drain unblocking, bathroom renovations"
                          value={formData.services}
                          onChange={handleInputChange}
                          className={textareaStyles}
                        />
                      </div>

                      {/* Existing website */}
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">Do you have an existing website?</label>
                        <div className="grid grid-cols-1 gap-2">
                          {([
                            { value: 'no' as const, label: 'No, I need a new one' },
                            { value: 'yes-update' as const, label: 'Yes, but it needs an update' },
                            { value: 'yes-expensive' as const, label: "Yes, but it's too expensive" },
                          ]).map(opt => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => setFormData(p => ({ ...p, websiteStatus: p.websiteStatus === opt.value ? null : opt.value }))}
                              className={`p-3 rounded-xl border text-left text-sm font-medium transition-all duration-200 cursor-pointer ${
                                formData.websiteStatus === opt.value
                                  ? 'border-accent-pink/40 bg-accent-pink/10 text-white'
                                  : 'border-white/[0.08] text-zinc-400 hover:border-white/[0.15] hover:text-zinc-200'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* URL field if they have a site */}
                      {(formData.websiteStatus === 'yes-update' || formData.websiteStatus === 'yes-expensive') && (
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                            <Globe className="w-3.5 h-3.5 inline mr-1.5" />
                            Current website URL
                          </label>
                          <input type="url" name="existingUrl" placeholder="https://www.yourbusiness.co.nz" value={formData.existingUrl} onChange={handleInputChange} className={inputStyles} />
                        </div>
                      )}

                      {/* Differentiators */}
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">What makes you different from competitors?</label>
                        <textarea
                          name="differentiators"
                          rows={2}
                          placeholder="e.g. 20 years experience, same-day service, family-owned, free quotes"
                          value={formData.differentiators}
                          onChange={handleInputChange}
                          className={textareaStyles}
                        />
                      </div>

                      {/* Website goals - multi-select chips */}
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">What should your website help you do?</label>
                        <div className="flex flex-wrap gap-2">
                          {GOAL_OPTIONS.map(goal => (
                            <button
                              key={goal.id}
                              type="button"
                              onClick={() => toggleGoal(goal.id)}
                              className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                                formData.websiteGoals.includes(goal.id)
                                  ? 'bg-accent-pink/20 text-accent-pink border border-accent-pink/30'
                                  : 'bg-dark-700 text-zinc-400 border border-white/[0.08] hover:text-zinc-200 hover:border-white/[0.15]'
                              }`}
                            >
                              {goal.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <ErrorBanner />

                    <div className="flex gap-3 mt-8">
                      <Button variant="ghost" onClick={prevStep} className="w-1/3">Back</Button>
                      <Button onClick={nextStep} className="w-2/3">
                        Continue <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* ─── STEP 4: UPLOADS + FINAL ─── */}
                {step === FormStep.UPLOADS && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-2xl font-bold font-heading text-white mb-2">Make it yours.</h3>
                    <p className="text-zinc-400 mb-6">Upload your assets to personalise your site. Everything here is optional.</p>

                    <div className="space-y-6">
                      {/* Logo */}
                      <FileUploadZone
                        label="Logo"
                        helpText="Your business logo in the highest quality you have"
                        accept=".png,.jpg,.jpeg,.svg,.webp,.pdf"
                        files={formData.logo ? [formData.logo] : []}
                        onChange={(files) => setFormData(p => ({ ...p, logo: files[0] || null }))}
                      />

                      {/* Gallery Photos */}
                      <FileUploadZone
                        label="Gallery / Work Photos"
                        helpText="Photos of your work, products, or premises — these build trust with visitors"
                        accept=".png,.jpg,.jpeg,.webp"
                        multiple
                        maxFiles={20}
                        files={formData.galleryPhotos}
                        onChange={(files) => setFormData(p => ({ ...p, galleryPhotos: files }))}
                      />

                      {/* Team Photos */}
                      <FileUploadZone
                        label="Team / Owner Photos"
                        helpText="Photos of you and your team — people connect with faces"
                        accept=".png,.jpg,.jpeg,.webp"
                        multiple
                        maxFiles={5}
                        files={formData.teamPhotos}
                        onChange={(files) => setFormData(p => ({ ...p, teamPhotos: files }))}
                      />

                      {/* Documents */}
                      <FileUploadZone
                        label="Documents"
                        helpText="Terms of trade, policies, menus, price lists, service catalogues — anything for your site"
                        accept=".pdf,.doc,.docx,.txt,.csv,.xls,.xlsx"
                        multiple
                        maxFiles={10}
                        files={formData.documents}
                        onChange={(files) => setFormData(p => ({ ...p, documents: files }))}
                      />

                      {/* Brand Guide */}
                      <FileUploadZone
                        label="Brand Guidelines / Style Guide"
                        helpText="If you have a style guide or brand document with colours and fonts"
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                        files={formData.brandGuide ? [formData.brandGuide] : []}
                        onChange={(files) => setFormData(p => ({ ...p, brandGuide: files[0] || null }))}
                      />

                      {/* Upload size indicator */}
                      {totalUploadSize > 0 && (
                        <div className={`text-xs px-3 py-2 rounded-lg ${
                          totalUploadSize > MAX_UPLOAD_BYTES
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : 'bg-white/[0.03] text-zinc-500 border border-white/[0.06]'
                        }`}>
                          {totalUploadSize > MAX_UPLOAD_BYTES
                            ? `Total uploads exceed 8 MB (${(totalUploadSize / (1024 * 1024)).toFixed(1)} MB). Large files can be emailed to hello@vibely.co.nz after submitting.`
                            : `${(totalUploadSize / (1024 * 1024)).toFixed(1)} MB / 8 MB used`
                          }
                        </div>
                      )}

                      <hr className="border-white/[0.06]" />

                      {/* Additional notes */}
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Anything else we should know?</label>
                        <textarea
                          name="additionalNotes"
                          rows={2}
                          placeholder="Special requests, integrations, features, design preferences..."
                          value={formData.additionalNotes}
                          onChange={handleInputChange}
                          className={textareaStyles}
                        />
                      </div>

                      {/* How did you hear */}
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">How did you hear about us?</label>
                        <select name="hearAboutUs" value={formData.hearAboutUs} onChange={handleInputChange} className={selectStyles}>
                          <option value="">Select (optional)</option>
                          {REFERRAL_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <ErrorBanner />

                    {/* Submit overlay */}
                    {isSubmitting && (
                      <div className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 border-3 border-accent-pink border-t-transparent rounded-full animate-spin mb-3" />
                          <span className="text-zinc-300 font-medium">Sending your details...</span>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 mt-8">
                      <Button variant="ghost" onClick={prevStep} className="w-1/3">Back</Button>
                      <Button onClick={handleSubmit} isLoading={isSubmitting} className="w-2/3">
                        Submit
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* ─── STEP 5: SUCCESS ─── */}
                {step === FormStep.SUCCESS && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white mb-2">Your site is being built.</h3>
                    <p className="text-zinc-400 mb-6 max-w-sm mx-auto">
                      We're building your <strong className="text-white">{formData.industry === 'Other' ? formData.otherIndustry : formData.industry}</strong> site for <strong className="text-white">{formData.city}</strong> right now.
                    </p>
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-sm text-zinc-400">
                      Check your inbox at <strong className="text-white">{formData.email}</strong> — we'll have it ready shortly.
                    </div>

                    {totalUploadSize > MAX_UPLOAD_BYTES && (
                      <div className="mt-4 bg-accent-orange/10 border border-accent-orange/20 rounded-xl p-4 text-sm text-zinc-400">
                        Some files were too large to upload. Please email them to <strong className="text-white">hello@vibely.co.nz</strong>.
                      </div>
                    )}

                    <Button onClick={() => window.location.reload()} variant="outline" className="mt-8">
                      Start Over
                    </Button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
