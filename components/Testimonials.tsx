import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  business: string;
  city: string;
  quote: string;
  rating: number;
  image: string;
}

export const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Mathew",
      business: "Ground Pro Ltd",
      city: "Auckland",
      quote: "They're quick! Thanks for the tidy website, team. Ticks all the boxes and such an easy business to work with.",
      rating: 5,
      image: "/images/groundpro.jpg"
    },
    {
      name: "Simon",
      business: "Mowing West",
      city: "Auckland",
      quote: "We used to get about 10 leads per month. We're up to an average of 45 now. The lead form the guys made for us is super helpful on a data level too. Plus the website sets us apart from other contractors around us. Thanks for looking after us!",
      rating: 5,
      image: "/images/mowingwest.jpg"
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

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              {/* Website screenshot — separate card behind */}
              <div className="relative rounded-xl overflow-hidden border border-white/[0.06] shadow-2xl">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.business} website`}
                  className="w-full h-auto block opacity-40"
                />
                {/* Fade overlay to blend into dark bg */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
              </div>

              {/* Review card — overlapping on top */}
              <div className="relative -mt-32 mx-4 sm:mx-6 z-10">
                {/* Glow on hover */}
                <div className="absolute -inset-1 bg-gradient-to-b from-accent-pink/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                <div className="relative glass-card rounded-2xl p-7 hover:border-white/10 transition-all duration-300 flex flex-col">
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
