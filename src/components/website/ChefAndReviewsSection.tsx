import React from 'react';
import { Star, Quote, Award, Sparkles, ChefHat } from 'lucide-react';

export const ChefAndReviewsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Dr. Sarah Hashmi',
      role: 'Consultant Surgeon · Aga Khan University',
      city: 'Karachi',
      comment: 'The Truffle Beef Burger and Shinwari Desi Ghee Mutton Karahi are unmatched across Pakistan. The level of consistency and attention to premium cuts is remarkable.',
      rating: 5,
      date: 'Visited 2 days ago',
    },
    {
      name: 'Adnan Siddiqui',
      role: 'Partner · Indus Capital',
      city: 'Lahore',
      comment: 'SAVORÉ on M.M. Alam Road has redefined business dinners for our firm. The private dining room, attentive service, and the Charcoal BBQ Platter make every occasion unforgettable.',
      rating: 5,
      date: 'Visited last week',
    },
    {
      name: 'Zainab Ali',
      role: 'Creative Director · Aura Studios',
      city: 'Islamabad',
      comment: 'The Neapolitan sourdough pizza crust is truly authentic. Crust with airy charred cornicione and Fior di Latte that melts like silk. Best Italian in F-7.',
      rating: 5,
      date: 'Visited 3 days ago',
    },
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
  ];

  return (
    <section className="py-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Chef & Philosophy Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="relative h-[480px] rounded-2xl overflow-hidden border border-[#2b2723] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=80"
              alt="Executive Chef Tariq & Culinary Brigade"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                Culinary Director
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-white mt-1">
                Executive Chef Tariq & The Brigade
              </h3>
              <p className="text-xs text-neutral-300 mt-1">
                Trained in Florence & Lahore · 18 Years of Gastronomic Mastery
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
              The Culinary Manifesto
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white leading-tight">
              Honoring Heritage. <br />
              Mastering Modern Gastronomy.
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            At SAVORÉ, cooking is an unwavering craft. Our pizza dough undergoes a rigorous 72-hour cold fermentation to yield an airy, digestible cornicione. Our beef patties are ground in-house daily from certified Angus cuts, seared on seasoned cast iron to lock in natural jus.
          </p>

          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            In our charcoal pit, ancient Shinwari traditions converge with modern culinary precision. Pure organic desi ghee, hand-crushed peppercorns, and highland mutton simmer over white embers without compromise.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-900">
            <div>
              <div className="font-brand text-2xl font-bold text-amber-400">72-Hour</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">Sourdough Fermentation</div>
            </div>
            <div>
              <div className="font-brand text-2xl font-bold text-amber-400">100%</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">Prime Angus & Desi Ghee</div>
            </div>
            <div>
              <div className="font-brand text-2xl font-bold text-amber-400">3 Flagships</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">Pakistan's Top Metros</div>
            </div>
          </div>
        </div>
      </div>

      {/* Ambience Gallery Snippet */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
            Sensory Atmosphere
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
            Designed for Memorable Evenings
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((src, i) => (
            <div
              key={i}
              className="h-52 rounded-xl overflow-hidden border border-[#2b2723] hover:border-amber-600/50 transition-all duration-300 group"
            >
              <img
                src={src}
                alt="Ambience"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-85 group-hover:brightness-100"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews Carousel */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
            Patron Acclaim
          </span>
          <h2 className="font-serif-luxury text-3xl font-bold text-white">
            Words from Discerning Diners
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#141210] border border-[#26221e] space-y-4 relative flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "{r.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-white">{r.name}</h4>
                  <p className="text-[10px] text-neutral-400">{r.role}</p>
                </div>
                <span className="text-[10px] uppercase font-semibold text-amber-500/80">
                  {r.city}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
