import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Smartphone, Rocket } from 'lucide-react';

export const ProcessSteps: React.FC = () => {
  const steps = [
    {
      icon: <Zap className="h-7 w-7 text-accent-pink" />,
      number: "01",
      title: "The Spark",
      description: "Tell us your industry and city. We use our data to identify what works best in your market.",
      glow: "from-accent-pink/10",
      glowColor: "rgba(232, 85, 160, 0.25)",
      borderColor: "rgba(232, 85, 160, 0.3)",
    },
    {
      icon: <Smartphone className="h-7 w-7 text-accent-orange" />,
      number: "02",
      title: "The Preview",
      description: "We text you a private, live link to your custom site design in minutes. No imagining required.",
      glow: "from-accent-orange/10",
      glowColor: "rgba(251, 146, 60, 0.25)",
      borderColor: "rgba(251, 146, 60, 0.3)",
    },
    {
      icon: <Rocket className="h-7 w-7 text-accent-violet" />,
      number: "03",
      title: "The Launch",
      description: "Love it? We connect your domain and you go live. Hate it? You pay $0. Zero risk.",
      glow: "from-accent-violet/10",
      glowColor: "rgba(139, 92, 246, 0.25)",
      borderColor: "rgba(139, 92, 246, 0.3)",
    }
  ];

  return (
    <section className="py-24 bg-dark-950 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent-pink/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold font-heading text-white sm:text-4xl">
            It's not magic, it's a{' '}
            <span className="text-gradient">system.</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            We've turned website building into a factory line. You get the quality of a boutique agency with the speed of software.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-14 left-[16%] right-[16%] h-px bg-gradient-to-r from-accent-pink/20 via-accent-orange/20 to-accent-violet/20" />

            {steps.map((step, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="relative group step-card"
                >
                    {/* Background glow on hover */}
                    <div
                      className={`absolute -inset-2 bg-gradient-to-b ${step.glow} to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl`}
                    />

                    <div
                      className="relative glass-card p-7 rounded-2xl text-center flex flex-col items-center transition-all duration-400 step-card-inner"
                      style={{
                        '--glow-color': step.glowColor,
                        '--border-color': step.borderColor,
                      } as React.CSSProperties}
                    >
                        {/* Step number with hover rotation */}
                        <div className="text-xs font-mono text-zinc-600 mb-4 tracking-widest transition-all duration-300 group-hover:text-zinc-400 group-hover:tracking-[0.3em] step-number">
                          {step.number}
                        </div>

                        {/* Icon container with hover lift */}
                        <div className="h-14 w-14 bg-white/[0.04] border border-white/[0.08] rounded-2xl flex items-center justify-center mb-5 transition-all duration-400 group-hover:bg-white/[0.08] group-hover:border-white/[0.15] step-icon group-hover:shadow-lg"
                          style={{ '--glow-color': step.glowColor } as React.CSSProperties}
                        >
                            {step.icon}
                        </div>

                        <h3 className="text-xl font-bold font-heading text-white mb-3">{step.title}</h3>
                        <p className="text-zinc-400 leading-relaxed text-sm">{step.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>

      <style>{`
        .step-card-inner {
          transform: translateY(0);
          box-shadow: 0 0 0 rgba(0,0,0,0);
        }
        .step-card:hover .step-card-inner {
          transform: translateY(-6px) scale(1.02);
          border-color: var(--border-color);
          box-shadow: 0 20px 40px -12px var(--glow-color), 0 0 20px var(--glow-color);
        }
        .step-icon {
          transform: translateY(0);
        }
        .step-card:hover .step-icon {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px -4px var(--glow-color);
        }
        .step-number {
          transform: rotate(0deg);
        }
        .step-card:hover .step-number {
          transform: rotate(-3deg) scale(1.1);
        }
        @media (prefers-reduced-motion: reduce) {
          .step-card-inner,
          .step-icon,
          .step-number {
            transition: none !important;
            transform: none !important;
          }
          .step-card:hover .step-card-inner {
            transform: none;
            border-color: var(--border-color);
            box-shadow: 0 0 20px var(--glow-color);
          }
        }
      `}</style>
    </section>
  );
};
