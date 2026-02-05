import React from 'react';

export const LogoTicker: React.FC = () => {
  // Using generic names as per PRD if no real logos available
  const partners = [
    "Apex Roofing", "Elite Detailers", "Pure Salons", "Metro HVAC", "City Plumbers", 
    "Urban Landscaping", "Prime Painters", "Modern Electric"
  ];

  return (
    <section className="bg-gray-50 border-y border-gray-100 py-10 overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-6">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">
          Trusted by 500+ Local Businesses
        </p>
      </div>
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex space-x-12 px-4">
          {partners.map((partner, index) => (
            <span key={index} className="text-xl font-bold text-gray-400 mx-4 flex items-center">
              <span className="w-8 h-8 bg-gray-200 rounded-full mr-3 inline-block"></span>
              {partner}
            </span>
          ))}
          {partners.map((partner, index) => (
            <span key={`dup-${index}`} className="text-xl font-bold text-gray-400 mx-4 flex items-center">
              <span className="w-8 h-8 bg-gray-200 rounded-full mr-3 inline-block"></span>
              {partner}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};