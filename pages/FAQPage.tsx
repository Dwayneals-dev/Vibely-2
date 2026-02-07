import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How fast can you launch my website?",
    answer: "Most sites go live in around 48 hours once we've got everything we need from you."
  },
  {
    question: "What does \"48 hours\" mean exactly?",
    answer: "It's an estimate based on quick replies, standard scope, and no surprise delays (like domains, plugins, or other third-party tools)."
  },
  {
    question: "What do I get with a Vibely site?",
    answer: "A clean, mobile-optimised site built to help customers find you and get in touch."
  },
  {
    question: "What do you need from me to start?",
    answer: "Your contact details, services, service area, and any logo/photos/copy you've got."
  },
  {
    question: "Can you help with my domain and email?",
    answer: "Yes — we can help connect your domain and point email the right way (including Google Workspace)."
  },
  {
    question: "How do website updates work after launch?",
    answer: "Submit update requests through the client portal. Small approved updates are usually done within 48 hours, depending on workload and complexity."
  },
  {
    question: "What if something is urgent?",
    answer: "Call us — if it's urgent, phone is the fastest way."
  },
  {
    question: "Are updates included in my plan?",
    answer: "Only if your order/subscription includes maintenance. Otherwise, updates may be billed as a change request."
  },
  {
    question: "Do you guarantee leads, rankings, or sales?",
    answer: "No — we build the site, but we can't guarantee business results."
  },
  {
    question: "Do I own my content and domain?",
    answer: "You keep ownership of your content and domain. Once everything's paid, you have full practical use of your site."
  }
];

const FAQAccordion: React.FC<{ item: FAQItem; isOpen: boolean; onToggle: () => void; index: number }> = ({
  item,
  isOpen,
  onToggle,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card rounded-xl overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-base font-medium text-white pr-4">{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-accent-pink" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-zinc-400 leading-relaxed border-t border-white/[0.06] pt-4">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-dark-950 font-sans text-zinc-100 selection:bg-accent-pink/20 selection:text-white grain">
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-accent-pink/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-accent-violet/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10">
        {/* Back link */}
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
            Frequently Asked{' '}
            <span className="text-gradient">Questions</span>
          </h1>
          <p className="mt-4 text-xl text-zinc-400">
            Everything you need to know about working with Vibely.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <FAQAccordion
              key={faq.question}
              item={faq}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              index={index}
            />
          ))}
        </div>

        {/* CTA at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-zinc-400 mb-4">Still have questions?</p>
          <a
            href="mailto:hello@vibely.co.nz"
            className="inline-flex items-center gap-2 text-accent-pink hover:text-accent-orange transition-colors font-medium"
          >
            Get in touch with us
          </a>
        </motion.div>
      </div>
    </div>
  );
};
