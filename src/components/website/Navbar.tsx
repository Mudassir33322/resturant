import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Search,
  Menu as MenuIcon,
  X,
  CalendarDays,
  QrCode,
  User,
  MapPin,
  Clock,
  Sparkles,
  Phone,
} from 'lucide-react';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart, onOpenSearch }) => {
  const { activeView, setActiveView, cart, setQrTableNumber } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { label: 'Home', view: 'website' as const },
    { label: 'Full Menu', view: 'menu' as const },
    { label: 'Special Offers', view: 'offers' as const },
    { label: 'Table Reservation', view: 'reservation' as const },
    { label: 'Track Order', view: 'order_tracking' as const },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0f0e0d]/90 backdrop-blur-md border-b border-[#262320]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveView('website')}
            className="text-left group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="font-brand text-2xl sm:text-3xl font-bold tracking-widest text-[#f5efe6] group-hover:text-amber-400 transition-colors">
                SAVORÉ
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mb-1" />
            </div>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-medium">
              Good Food. Great Moments.
            </p>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 ml-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => setActiveView(link.view)}
                className={`text-xs uppercase tracking-widest font-medium transition-colors hover:text-amber-300 cursor-pointer ${
                  activeView === link.view ? 'text-amber-400 font-semibold' : 'text-neutral-300'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Action Icons & CTAs */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Table QR Ordering Mode */}
          <button
            onClick={() => {
              setQrTableNumber('T-04');
              setActiveView('qr_dining');
            }}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#1a1714] border border-amber-900/40 text-amber-300 hover:bg-amber-950/30 text-xs font-medium transition-colors cursor-pointer"
            title="Scan QR or Dine-In Mode"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-400" />
            <span>Table QR Order</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-neutral-300 hover:text-amber-400 rounded-md hover:bg-neutral-900 transition-colors cursor-pointer"
            aria-label="Search Dishes"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Customer Account */}
          <button
            onClick={() => setActiveView('customer_account')}
            className={`p-2 rounded-md transition-colors cursor-pointer ${
              activeView === 'customer_account'
                ? 'text-amber-400 bg-amber-950/40'
                : 'text-neutral-300 hover:text-amber-400 hover:bg-neutral-900'
            }`}
            aria-label="Customer Account"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-amber-950/40 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartItemsCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-neutral-950 font-bold text-xs">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-300 hover:text-amber-400 cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#13110f] border-b border-[#2b2723] px-5 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  setActiveView(link.view);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-sm uppercase tracking-wider py-2 transition-colors cursor-pointer ${
                  activeView === link.view ? 'text-amber-400 font-semibold' : 'text-neutral-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setQrTableNumber('T-04');
                setActiveView('qr_dining');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2.5 rounded bg-[#1e1b18] text-amber-300 border border-amber-900/40 text-xs font-medium cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-amber-400" />
              <span>Dine-In Table QR Ordering</span>
            </button>
            <button
              onClick={() => {
                setActiveView('reservation');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded bg-amber-600 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              <CalendarDays className="w-4 h-4" />
              <span>Reserve a Table</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
