import React from 'react';
import { ThumbsUp, Clock } from 'lucide-react';

interface LogoTickerProps {
  onServiceClick?: (service: string) => void;
}

export const LogoTicker: React.FC<LogoTickerProps> = ({ onServiceClick }) => {
  const services = [
    "Plumbers", "Electricians", "HVAC & Heat Pumps", "Builders", "Roofers",
    "Painters & Decorators", "Landscapers", "Lawn Mowing", "Arborists",
    "Fencing & Gates", "Concrete & Paving", "Carpenters & Joiners",
    "Handymen", "Cleaning Companies", "Pest Control", "Pool Maintenance",
    "Security Installers", "Moving Companies", "Auto Mechanics", "Panel Beaters",
    "Car Detailers", "Real Estate Agents", "Property Managers", "Mortgage Brokers",
    "Accountants", "Lawyers", "Dentists", "Physios & Chiros", "Gyms & PTs",
    "Restaurants & Cafes"
  ];

  const stats = [
    { icon: <ThumbsUp className="w-5 h-5 text-accent-pink" />, value: "98%", label: "Satisfaction" },
    { icon: <Clock className="w-5 h-5 text-accent-violet" />, value: "48hr", label: "Avg Delivery" },
  ];

  return (
    <section className="bg-dark-900 border-y border-white/[0.04] py-10 overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-6">
        <p className="text-sm font-medium text-zinc-600 uppercase tracking-widest mb-5">
          Websites built for every local trade & service
        </p>
        <div className="flex justify-center gap-8 sm:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-2">
              {stat.icon}
              <span className="text-xl font-bold font-heading text-white">{stat.value}</span>
              <span className="text-sm text-zinc-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="marquee-wrapper relative flex overflow-x-hidden mt-6">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark-900 to-transparent z-10 pointer-events-none" />

        <div className="marquee-track whitespace-nowrap flex items-center px-4">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => onServiceClick?.(service)}
              className="marquee-item text-base sm:text-lg font-extrabold uppercase text-white tracking-wide mx-4 sm:mx-6 cursor-pointer transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-accent-pink hover:to-accent-orange inline-block py-2 bg-transparent border-none"
            >
              {service}
            </button>
          ))}
          {services.map((service, index) => (
            <button
              key={`dup-${index}`}
              onClick={() => onServiceClick?.(service)}
              className="marquee-item text-base sm:text-lg font-extrabold uppercase text-white tracking-wide mx-4 sm:mx-6 cursor-pointer transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-accent-pink hover:to-accent-orange inline-block py-2 bg-transparent border-none"
              aria-hidden="true"
            >
              {service}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-track {
          animation: marquee 50s linear infinite;
        }
        .marquee-wrapper:hover .marquee-track {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-item:hover {
          transform: scale(1.15);
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation-duration: 300s;
          }
          .marquee-item {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};
