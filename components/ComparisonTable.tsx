import React from 'react';
import { Check, X, Minus } from 'lucide-react';
import { ComparisonRow } from '../types';

export const ComparisonTable: React.FC = () => {
  const data: ComparisonRow[] = [
    { feature: "Your Effort", vibely: "Zero (We do it)", diy: "High (You build it)", agency: "Medium (Meetings)" },
    { feature: "Upfront Cost", vibely: "$90 - $299", diy: "$0 (Time is money)", agency: "$5,000+" },
    { feature: "Speed to Live", vibely: "48 Hours", diy: "Weeks of weekends", agency: "6-12 Weeks" },
    { feature: "Performance", vibely: "100/100 (React)", diy: "Bloated / Slow", agency: "Varies" },
    { feature: "Ongoing Support", vibely: "Included", diy: "Forums / Chatbots", agency: "$150/hr Retainer" },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">Why businesses choose Vibely</h2>
          <p className="mt-4 text-gray-600">The sweet spot between breaking the bank and breaking your back.</p>
        </div>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="border rounded-2xl overflow-hidden shadow-sm bg-white">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-5 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Feature</th>
                    <th scope="col" className="px-6 py-5 text-center text-lg font-bold text-pink-600 bg-pink-50/50 w-1/3">Vibely</th>
                    <th scope="col" className="px-6 py-5 text-center text-sm font-semibold text-gray-500 w-1/4">DIY (Wix/Squarespace)</th>
                    <th scope="col" className="px-6 py-5 text-center text-sm font-semibold text-gray-500 w-1/4">Traditional Agency</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.feature}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-gray-900 bg-pink-50/30 shadow-inner">
                        {row.vibely}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{row.diy}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{row.agency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};