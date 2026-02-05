import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Smartphone, Rocket } from 'lucide-react';

export const ProcessSteps: React.FC = () => {
  const steps = [
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "The Spark",
      description: "Tell us your industry and city. We use our data to identify what works best in your market."
    },
    {
      icon: <Smartphone className="h-8 w-8 text-blue-500" />,
      title: "The Preview",
      description: "We text you a private, live link to your custom site design in minutes. No imagining required."
    },
    {
      icon: <Rocket className="h-8 w-8 text-pink-500" />,
      title: "The Launch",
      description: "Love it? We connect your domain and you go live. Hate it? You pay $0. Zero risk."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            It’s not magic, it’s a system.
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We've turned website building into a factory line. You get the quality of a boutique agency with the speed of software.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-100 -z-10"></div>

            {steps.map((step, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center"
                >
                    <div className="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                        {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};