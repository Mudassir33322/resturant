import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  CalendarDays,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface LocationsAndFooterProps {
  onOpenReservation: () => void;
}

export const LocationsAndFooter: React.FC<LocationsAndFooterProps> = ({ onOpenReservation }) => {
  const { setActiveView } = useApp();

  const locations = [
    {
      city: 'Karachi',
      name: 'Flagship Clifton & Sea View',
      address: 'Block 4, Marine Promenade, Clifton, Karachi',
      phone: '+92 21 3587 9901',
      timings: '12:00 PM – 02:00 AM (Mon - Sun)',
      features: 'Open-Air Sea View Terrace · Private VIP Lounge · Valet Parking',
    },
    {
      city: 'Lahore',
      name: 'Gulberg Sanctuary',
      address: 'Plot 18-C, M.M. Alam Road, Gulberg III, Lahore',
      phone: '+92 42 3578 4410',
      timings: '12:30 PM – 01:30 AM (Mon - Sun)',
      features: 'Courtyard Charcoal Kitchen · Rooftop Atrium · Private Rooms',
    },
    {
      city: 'Islamabad',
      name: 'Margalla Foothills',
      address: 'Executive Heights, F-7 Markaz, Islamabad',
      phone: '+92 51 2654 321',
      timings: '12:00 PM – 01:00 AM (Mon - Sun)',
      features: 'Panoramic Hill View · Artisanal Espresso Bar · Executive Suites',
    },
  ];

  return (
    <div className="space-y-20 pt-10">
      {/* Locations Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
            Grand Destinations
          </span>
          <h2 className="font-serif-luxury text-3xl font-bold text-white">
            Find SAVORÉ Near You
          </h2>
          <p className="text-neutral-400 text-xs">
            Architecturally curated dining rooms in the heart of Pakistan's culinary capitals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((loc) => (
            <div
              key={loc.city}
              className="p-6 rounded-2xl bg-[#141210] border border-[#2b2723] space-y-4 hover:border-amber-700/50 transition-colors shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                  {loc.city}
                </span>
                <span className="text-[10px] bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 px-2 py-0.5 rounded font-semibold">
                  Open Now
                </span>
              </div>

              <div>
                <h3 className="font-serif-luxury text-lg font-bold text-white">
                  {loc.name}
                </h3>
                <p className="text-xs text-neutral-400 mt-1 flex items-start gap-1.5 leading-relaxed">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{loc.address}</span>
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-900 space-y-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{loc.timings}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-neutral-500" />
                  <a href={`tel:${loc.phone}`} className="hover:text-amber-400">
                    {loc.phone}
                  </a>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-neutral-500">
                {loc.features}
              </div>

              <button
                onClick={onOpenReservation}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[#1e1b18] hover:bg-amber-600 hover:text-white text-amber-300 border border-amber-900/30 text-xs font-semibold transition-all cursor-pointer"
              >
                <CalendarDays className="w-3.5 h-3.5" />
                <span>Reserve Table at {loc.city}</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Reservation CTA Banner */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#20150d] via-[#161310] to-[#0f0e0d] border border-amber-900/40 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="space-y-2 max-w-2xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
              Exceptional Dining
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
              An Evening Designed to Linger in Memory
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              Table reservations are recommended for evening service and weekend family dining. Let our concierge accommodate your every preference.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenReservation}
              className="px-8 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl shadow-amber-950/60 cursor-pointer"
            >
              Reserve Your Table
            </button>
            <button
              onClick={() => setActiveView('menu')}
              className="px-8 py-3.5 rounded-lg bg-[#181512] hover:bg-[#25211c] text-white border border-neutral-700 font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer"
            >
              Order Online For Delivery
            </button>
          </div>
        </div>
      </section>

      {/* Sophisticated Footer */}
      <footer className="bg-[#0b0a09] border-t border-[#1e1b18] text-neutral-400 text-xs py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-brand text-2xl font-bold tracking-widest text-white">
                  SAVORÉ
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mb-1" />
              </div>
              <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                Good Food. Great Moments. A connected restaurant platform bringing Michelin-level passion, fire-roasted mastery, and white-glove hospitality to life.
              </p>
              <div className="pt-2 text-neutral-500 text-[11px]">
                Currency: PKR · Timezone: Asia/Karachi · Licensed in Pakistan
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-3">
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider">
                Dining & Menu
              </h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setActiveView('menu')} className="hover:text-amber-400">
                    Artisanal Menu
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('offers')} className="hover:text-amber-400">
                    Offers & Privilege
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('reservation')} className="hover:text-amber-400">
                    Table Reservation
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('order_tracking')} className="hover:text-amber-400">
                    Live Order Tracker
                  </button>
                </li>
              </ul>
            </div>

            {/* Management & Systems */}
            <div className="space-y-3">
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider">
                Ecosystem Portals
              </h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setActiveView('pos')} className="hover:text-amber-400">
                    POS Terminal
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('kitchen')} className="hover:text-amber-400">
                    Kitchen Display (KDS)
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('tables')} className="hover:text-amber-400">
                    Floor & Tables
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('inventory')} className="hover:text-amber-400">
                    Inventory & Recipes
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('admin_dashboard')} className="hover:text-amber-400">
                    Admin Command Center
                  </button>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider">
                The Connoisseur Journal
              </h4>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Receive secret weekend tasting menus and exclusive invitations.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email address..."
                  className="w-full p-2 bg-[#141210] border border-neutral-800 rounded text-xs text-white placeholder-neutral-600 focus:border-amber-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => alert('Thank you for joining the SAVORÉ Connoisseur Circle.')}
                  className="px-3 py-2 rounded bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs cursor-pointer"
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <div>
              © 2026 SAVORÉ Restaurant & Hospitality Group. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Food Safety & Halal Compliance</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
