import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  UtensilsCrossed,
  CalendarDays,
  Sparkles,
  ShieldCheck,
  Clock,
  MapPin,
  Flame,
  ArrowRight,
  QrCode,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenReservation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenReservation }) => {
  const { setActiveView, setQrTableNumber } = useApp();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-[#24201c]">
      {/* Background imagery with luxury overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=85"
          alt="SAVORÉ Culinary Showcase"
          className="w-full h-full object-cover object-center brightness-[0.32] contrast-110 scale-105 animate-pulse duration-[8000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0d] via-[#0f0e0d]/50 to-[#0f0e0d]/80" />
      </div>

      {/* Atmospheric lighting accents */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-600/10 blur-[140px] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8 animate-in fade-in duration-500">
        {/* Prestige Kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-[0.2em]">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Haute Cuisine & Modern Dining</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4">
          <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#fbf8f3] leading-[1.1]">
            Taste Something <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 italic">
              Extraordinary.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
            SAVORÉ harmonizes aged Prime Angus beef, fire-roasted Neapolitan sourdough, and aromatic Pakistani Shinwari heritage in an exquisite ambiance.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setActiveView('menu')}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl shadow-amber-950/60 cursor-pointer group"
          >
            <span>Order Online</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenReservation}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#1a1714]/80 hover:bg-[#25211c] text-[#f2ede4] border border-[#3b3630] font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer"
          >
            <CalendarDays className="w-4 h-4 text-amber-400" />
            <span>Reserve a Table</span>
          </button>

          <button
            onClick={() => {
              setQrTableNumber('T-04');
              setActiveView('qr_dining');
            }}
            className="flex items-center gap-2 px-5 py-3.5 rounded-lg bg-black/40 hover:bg-black/70 text-amber-300 border border-amber-900/50 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-amber-400" />
            <span>Table QR Order</span>
          </button>
        </div>

        {/* Trust Badges Bar */}
        <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#141210]/70 border border-neutral-800/80 backdrop-blur-sm">
            <Flame className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Live Open Flame</div>
              <div className="text-[10px] text-neutral-400">Charcoal & Iron Wok</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#141210]/70 border border-neutral-800/80 backdrop-blur-sm">
            <Clock className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Rapid White Glove</div>
              <div className="text-[10px] text-neutral-400">Thermal sealed delivery</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#141210]/70 border border-neutral-800/80 backdrop-blur-sm">
            <UtensilsCrossed className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Dine-In Elegance</div>
              <div className="text-[10px] text-neutral-400">Terraces & VIP lounges</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#141210]/70 border border-neutral-800/80 backdrop-blur-sm">
            <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">3 Flagship Branches</div>
              <div className="text-[10px] text-neutral-400">Karachi, Lahore & ISB</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
