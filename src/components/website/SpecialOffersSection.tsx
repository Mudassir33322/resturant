import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tag, Sparkles, Clock, Check, ArrowRight, Copy } from 'lucide-react';

export const SpecialOffersSection: React.FC = () => {
  const { coupons, applyCoupon, setActiveView } = useApp();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const curatedDeals = [
    {
      id: 'deal_1',
      title: 'Grand Dining Privilege',
      subtitle: '20% OFF Entire Order',
      description: 'Experience haute gastronomy with 20% discount on gourmet meals above PKR 2,500.',
      code: 'SAVORE20',
      badge: 'Patron Favorite',
      validity: 'Valid Daily after 12:00 PM',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'deal_2',
      title: 'Weekend Royal Family Feast',
      subtitle: 'Flat PKR 500 Discount',
      description: 'Host your closest circle with our grand platters and dessert spreads. Applicable on cart above PKR 4,000.',
      code: 'FEAST500',
      badge: 'Weekend Special',
      validity: 'Friday – Sunday',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'deal_3',
      title: 'White Glove Concierge Delivery',
      subtitle: '100% Free Thermal Delivery',
      description: 'Zero delivery fee directly to your residence across Clifton, DHA, Gulberg, and F-7 on orders above PKR 1,800.',
      code: 'FREEDEL',
      badge: 'Delivery Privilege',
      validity: 'All Week Long',
      image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'deal_4',
      title: 'First Encounter Privilege',
      subtitle: '10% Welcome Appreciation',
      description: 'Delight in SAVORÉ with 10% courtesy on your inaugural order. Discover our signature burger or artisanal pasta.',
      code: 'WELCOME10',
      badge: 'New Connoisseurs',
      validity: 'First Order Privilege',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    applyCoupon(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <section className="py-16 bg-[#0f0e0d] border-y border-[#221f1c]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
            Exclusive Privileges
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
            Special Dining Deals & Offers
          </h2>
          <p className="text-neutral-400 text-xs">
            Indulge in seasonal tasting deals, family banquets, and complimentary delivery privileges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {curatedDeals.map((deal) => {
            const isCopied = copiedCode === deal.code;
            return (
              <div
                key={deal.id}
                className="bg-[#141210] border border-[#2b2723] hover:border-amber-700/50 rounded-2xl overflow-hidden transition-all flex flex-col justify-between shadow-xl"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] uppercase font-bold text-amber-400 border border-neutral-800">
                    {deal.badge}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif-luxury text-lg font-bold text-white">
                      {deal.title}
                    </h3>
                    <div className="text-sm font-semibold text-amber-400 mt-0.5">
                      {deal.subtitle}
                    </div>
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                      {deal.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-neutral-900">
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{deal.validity}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2 bg-[#1b1815] border border-neutral-800 p-2 rounded-lg">
                      <div className="font-mono text-xs font-bold text-white tracking-widest pl-1">
                        {deal.code}
                      </div>
                      <button
                        onClick={() => handleCopy(deal.code)}
                        className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-600 hover:bg-amber-500 text-white'
                        }`}
                      >
                        {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{isCopied ? 'Applied!' : 'Copy Code'}</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setActiveView('menu')}
                      className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 py-1 transition-colors cursor-pointer"
                    >
                      <span>Order With This Deal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
