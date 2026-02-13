import React from 'react';
import { motion } from 'framer-motion';
import { ComparisonRow } from '../types';

export const ComparisonTable: React.FC = () => {
  const data: ComparisonRow[] = [
    { feature: "Your Effort", vibely: "Zero (We do it)", diy: "High (You build it)", agency: "Medium (Meetings)" },
    { feature: "Upfront Cost", vibely: "$200 – $3k", diy: "$0 (Time is money)", agency: "$5,000+" },
    { feature: "Speed to Live", vibely: "48 Hours", diy: "Weeks of weekends", agency: "6–12 Weeks" },
    { feature: "Performance", vibely: "100/100 (React)", diy: "Bloated / Slow", agency: "Varies" },
    { feature: "Ongoing Support", vibely: "Included", diy: "Forums / Chatbots", agency: "$150/hr Retainer" },
  ];

  return (
    <section className="py-24 bg-dark-900 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent-violet/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold font-heading text-white sm:text-4xl">
            The honest{' '}
            <span className="text-gradient">comparison.</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400">Three ways to get a website. Only one that doesn't cost you time or a fortune.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="overflow-x-auto"
        >
          <div className="inline-block min-w-full align-middle">
            <div className="glass-card rounded-2xl overflow-hidden border border-white/[0.08]">
              <table className="min-w-full divide-y divide-white/[0.08]" role="table">
                <thead>
                  <tr className="bg-white/[0.04]">
                    <th scope="col" className="px-6 py-5 text-left text-sm font-bold text-zinc-300 uppercase tracking-wider">
                      Feature
                    </th>
                    <th scope="col" className="px-6 py-5 text-center text-sm font-bold text-accent-pink uppercase tracking-wider">
                      Vibely
                    </th>
                    <th scope="col" className="px-6 py-5 text-center text-sm font-bold text-zinc-300 uppercase tracking-wider">
                      DIY (Wix/Squarespace)
                    </th>
                    <th scope="col" className="px-6 py-5 text-center text-sm font-bold text-zinc-300 uppercase tracking-wider">
                      Traditional Agency
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.08]">
                  {data.map((row, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + idx * 0.08 }}
                      className="hover:bg-white/[0.03] transition-colors focus-within:bg-white/[0.03]"
                    >
                      <td className="px-6 py-5 whitespace-nowrap text-[15px] font-semibold text-zinc-100">
                        {row.feature}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-center text-[15px] font-bold text-white bg-accent-pink/[0.06]">
                        {row.vibely}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-center text-[15px] text-zinc-400">
                        {row.diy}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-center text-[15px] text-zinc-400">
                        {row.agency}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
