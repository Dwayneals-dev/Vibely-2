import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { FormData, FormStep } from '../types';
import { CheckCircle, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export const PreviewFormWizard: React.FC = () => {
  const [step, setStep] = useState<FormStep>(FormStep.HOOK);
  const [formData, setFormData] = useState<FormData>({
    industry: 'Roofer',
    city: '',
    phone: '',
    email: '',
    hasWebsite: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null); // Clear errors on type
  };

  const nextStep = () => {
    // Validation Logic
    if (step === FormStep.HOOK) {
      if (!formData.city.trim()) {
        setError("Please enter your city.");
        return;
      }
    }
    if (step === FormStep.CONTACT) {
        // Basic phone regex validation
      const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
      if (!formData.phone.match(phoneRegex)) {
        setError("Please enter a valid phone number so we can text you the preview.");
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
    // Simulate API Call / Webhook
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(FormStep.SUCCESS);
    }, 1500);
  };

  return (
    <section id="instant-preview" className="py-24 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          
          {/* Progress Bar */}
          <div className="bg-gray-50 h-2 w-full">
            <div 
                className="h-full bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-500"
                style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>

          <div className="p-8 sm:p-12">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: HOOK */}
              {step === FormStep.HOOK && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Let's build your preview.</h3>
                  <p className="text-gray-600 mb-6">First, tell us about your business.</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                      <select 
                        name="industry" 
                        value={formData.industry} 
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
                      >
                        <option value="Roofer">Roofer</option>
                        <option value="Detailer">Auto Detailer</option>
                        <option value="Salon">Salon / Spa</option>
                        <option value="Landscaper">Landscaper</option>
                        <option value="Plumber">Plumber</option>
                        <option value="HVAC">HVAC</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input 
                        type="text" 
                        name="city" 
                        placeholder="e.g. Austin, TX"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  {error && (
                    <div className="mt-4 flex items-center text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                        <AlertCircle className="w-4 h-4 mr-2" />
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Where should we send it?</h3>
                  <p className="text-gray-600 mb-6">We'll text you a private link to your design.</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number <span className="text-red-500">*</span></label>
                      <input 
                        type="tel" 
                        name="phone" 
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address (Optional)</label>
                      <input 
                        type="email" 
                        name="email" 
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="mt-4 flex items-center text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                        <AlertCircle className="w-4 h-4 mr-2" />
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Almost done.</h3>
                  <p className="text-gray-600 mb-6">Do you currently have a website?</p>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <button 
                        onClick={() => { setFormData(p => ({...p, hasWebsite: 'yes'})); handleSubmit(); }}
                        className="group p-4 border border-gray-200 rounded-xl hover:border-pink-500 hover:bg-pink-50 transition-all flex items-center justify-between"
                    >
                        <span className="font-medium text-gray-900">Yes, but I hate it / it's old</span>
                        <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-pink-500" />
                    </button>
                    
                    <button 
                        onClick={() => { setFormData(p => ({...p, hasWebsite: 'no'})); handleSubmit(); }}
                        className="group p-4 border border-gray-200 rounded-xl hover:border-pink-500 hover:bg-pink-50 transition-all flex items-center justify-between"
                    >
                        <span className="font-medium text-gray-900">No, I rely on word of mouth</span>
                        <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-pink-500" />
                    </button>
                  </div>

                  {isSubmitting && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-3xl">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                            <span className="text-gray-600 font-medium">Generating preview...</span>
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
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">You're in the queue!</h3>
                  <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                    We've started building the preview for your <strong>{formData.industry}</strong> business in <strong>{formData.city}</strong>.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-500">
                    Check your text messages at <strong>{formData.phone}</strong> in about 5-10 minutes.
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
    </section>
  );
};