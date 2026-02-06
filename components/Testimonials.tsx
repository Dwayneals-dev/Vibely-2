import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  business: string;
  city: string;
  quote: string;
  rating: number;
}

export const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Marcus T.",
      business: "Apex Roofing Co.",
      city: "Dallas, TX",
      quote: "We went from zero online presence to getting 15 leads a week. Vibely paid for itself in the first month.",
      rating: 5
    },
    {
      name: "Sarah L.",
      business: "Pure Glow Salon",
      city: "Austin, TX",
      quote: "I tried Wix for 6 months and hated every minute. Vibely built something better in 2 days. My clients love it.",
      rating: 5
    },
    {
      name: "James R.",
      business: "Metro HVAC Solutions",
      city: "Phoenix, AZ",
      quote: "The booking system alone saves me 3 hours a day. No more phone tag with customers. Worth every penny.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-dark-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-accent-orange/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-extrabold font-heading text-white sm:text-4xl">
            Don't take our word for it.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Here's what local business owners are saying after switching to Vibely.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              {/* Glow on hover */}
              <div className="absolute -inset-1 bg-gradient-to-b from-accent-pink/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

              <div className="relative glass-card rounded-2xl p-7 hover:border-white/10 transition-all duration-300 h-full flex flex-col">
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-accent-pink/20 mb-4" />

                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent-orange text-accent-orange" />
                  ))}
                </div>

                <blockquote className="text-zinc-300 leading-relaxed mb-6 flex-1 text-sm">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-pink to-accent-orange flex items-center justify-center text-white font-bold font-heading text-sm flex-shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{testimonial.name}</p>
                    <p className="text-zinc-500 text-xs">{testimonial.business} &middot; {testimonial.city}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
