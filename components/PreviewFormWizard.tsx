import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { FormData, FormStep } from '../types';
import { CheckCircle, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';

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

interface PreviewFormWizardProps {
  prefilledIndustry?: string;
}

export const PreviewFormWizard: React.FC<PreviewFormWizardProps> = ({ prefilledIndustry }) => {
  const [step, setStep] = useState<FormStep>(FormStep.HOOK);
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    contactName: '',
    industry: '',
    otherIndustry: '',
    city: '',
    phone: '',
    email: '',
    hasWebsite: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Apply pre-filled industry from carousel click
  useEffect(() => {
    if (prefilledIndustry) {
      const mappedIndustry = serviceToIndustryMap[prefilledIndustry] || prefilledIndustry;
      setFormData(prev => ({ ...prev, industry: mappedIndustry }));
    }
  }, [prefilledIndustry]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const nextStep = () => {
    if (step === FormStep.HOOK) {
      if (!formData.businessName.trim()) {
        setError("Please enter your business name.");
        return;
      }
      if (!formData.contactName.trim()) {
        setError("Please enter your name.");
        return;
      }
      if (!formData.industry) {
        setError("Please select your industry.");
        return;
      }
      if (formData.industry === 'Other' && !formData.otherIndustry.trim()) {
        setError("Please specify your industry.");
        return;
      }
      if (!formData.city.trim()) {
        setError("Please enter your city or town.");
        return;
      }
    }
    if (step === FormStep.CONTACT) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.match(emailRegex)) {
        setError("Please enter a valid email address so we can send you the preview.");
        return;
      }
      if (!formData.phone.trim()) {
        setError("Please enter your mobile number.");
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    setError(null);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(FormStep.SUCCESS);
    }, 1500);
  };

  const inputStyles = "w-full px-4 py-3 rounded-xl bg-dark-700 border border-white/[0.08] text-white placeholder-zinc-500 focus:ring-2 focus:ring-accent-pink/50 focus:border-transparent transition-all";
  const selectStyles = `${inputStyles} cursor-pointer appearance-none`;

  return (
    <section id="instant-preview" className="py-24 bg-dark-950 relative overflow-hidden">
      {/* Background aurora */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-pink/[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-accent-violet/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
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
            <span className="text-gradient">pay a cent.</span>
          </h2>
          <p className="mt-4 text-zinc-400">
            Tell us your trade and location — we'll build a custom preview just for you.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          {/* Glow behind form */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-gradient-to-b from-accent-pink/10 to-accent-violet/5 rounded-3xl blur-3xl pointer-events-none" />

          <div className="relative glass-card rounded-2xl overflow-hidden">
            {/* Progress Bar */}
            <div className="bg-dark-700 h-1 w-full">
              <div
                  className="h-full bg-gradient-to-r from-accent-pink to-accent-orange transition-all duration-500"
                  style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>

            <div className="p-8 sm:p-10">
              <AnimatePresence mode="wait">

                {/* STEP 1: HOOK */}
                {step === FormStep.HOOK && (
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
                        <input
                          type="text"
                          name="businessName"
                          placeholder="e.g. Smith Plumbing Ltd"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          className={inputStyles}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Your Name <span className="text-accent-pink">*</span></label>
                        <input
                          type="text"
                          name="contactName"
                          placeholder="e.g. John Smith"
                          value={formData.contactName}
                          onChange={handleInputChange}
                          className={inputStyles}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Industry <span className="text-accent-pink">*</span></label>
                        <select
                          name="industry"
                          value={formData.industry}
                          onChange={handleInputChange}
                          className={selectStyles}
                        >
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
                          <input
                            type="text"
                            name="otherIndustry"
                            placeholder="e.g. Dog Grooming"
                            value={formData.otherIndustry}
                            onChange={handleInputChange}
                            className={inputStyles}
                          />
                        </div>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">City / Town <span className="text-accent-pink">*</span></label>
                        <input
                          type="text"
                          name="city"
                          placeholder="e.g. Auckland"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={inputStyles}
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="mt-4 flex items-center text-red-400 text-sm bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                          <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                          {error}
                      </div>
                    )}

                    <Button onClick={nextStep} fullWidth className="mt-8">
                      Next Step <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>
                )}

                {/* STEP 2: CONTACT */}
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
                        <input
                          type="email"
                          name="email"
                          placeholder="you@company.co.nz"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={inputStyles}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Mobile <span className="text-accent-pink">*</span></label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="021 123 4567"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={inputStyles}
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="mt-4 flex items-center text-red-400 text-sm bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                          <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                          {error}
                      </div>
                    )}

                    <div className="flex gap-3 mt-8">
                      <Button variant="ghost" onClick={prevStep} className="w-1/3">Back</Button>
                      <Button onClick={nextStep} className="w-2/3">Continue</Button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: QUALIFICATION */}
                {step === FormStep.QUALIFICATION && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-2xl font-bold font-heading text-white mb-2">Almost done.</h3>
                    <p className="text-zinc-400 mb-6">Do you currently have a website?</p>

                    <div className="grid grid-cols-1 gap-4">
                      <button
                          onClick={() => { setFormData(p => ({...p, hasWebsite: 'yes-update'})); handleSubmit(); }}
                          className="group p-4 border border-white/[0.08] rounded-xl hover:border-accent-pink/30 hover:bg-accent-pink/5 transition-all duration-200 flex items-center justify-between cursor-pointer"
                      >
                          <span className="font-medium text-zinc-200">Yes but it needs an update</span>
                          <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-accent-pink transition-colors duration-200" />
                      </button>

                      <button
                          onClick={() => { setFormData(p => ({...p, hasWebsite: 'yes-expensive'})); handleSubmit(); }}
                          className="group p-4 border border-white/[0.08] rounded-xl hover:border-accent-pink/30 hover:bg-accent-pink/5 transition-all duration-200 flex items-center justify-between cursor-pointer"
                      >
                          <span className="font-medium text-zinc-200">Yes but it's expensive</span>
                          <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-accent-pink transition-colors duration-200" />
                      </button>

                      <button
                          onClick={() => { setFormData(p => ({...p, hasWebsite: 'no'})); handleSubmit(); }}
                          className="group p-4 border border-white/[0.08] rounded-xl hover:border-accent-pink/30 hover:bg-accent-pink/5 transition-all duration-200 flex items-center justify-between cursor-pointer"
                      >
                          <span className="font-medium text-zinc-200">No I rely on word of mouth</span>
                          <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-accent-pink transition-colors duration-200" />
                      </button>
                    </div>

                    {isSubmitting && (
                      <div className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
                          <div className="flex flex-col items-center">
                              <div className="w-8 h-8 border-3 border-accent-pink border-t-transparent rounded-full animate-spin mb-3"></div>
                              <span className="text-zinc-300 font-medium">Generating preview...</span>
                          </div>
                      </div>
                    )}

                    <div className="mt-8">
                       <Button variant="ghost" onClick={prevStep} fullWidth>Back</Button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: SUCCESS */}
                {step === FormStep.SUCCESS && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white mb-2">You're in the queue!</h3>
                    <p className="text-zinc-400 mb-6 max-w-sm mx-auto">
                      We've started building the preview for your <strong className="text-white">{formData.industry}</strong> business in <strong className="text-white">{formData.city}</strong>.
                    </p>
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-sm text-zinc-400">
                      Check your inbox at <strong className="text-white">{formData.email}</strong> — we'll have it ready shortly.
                    </div>
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
