import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MenuItem } from '../../types';
import {
  QrCode,
  Bell,
  Receipt,
  Droplet,
  HelpCircle,
  Plus,
  UtensilsCrossed,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

interface QRTableExperienceProps {
  onSelectFood: (item: MenuItem) => void;
  onOpenCart: () => void;
}

export const QRTableExperience: React.FC<QRTableExperienceProps> = ({ onSelectFood, onOpenCart }) => {
  const { qrTableNumber, setQrTableNumber, currentBranch, menuItems, cart, setActiveView } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = ['All', 'Burgers', 'Pizza', 'Pasta', 'BBQ', 'Pakistani', 'Desserts', 'Beverages'];

  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter((m) => m.category.toLowerCase() === activeCategory.toLowerCase());

  const handleWaiterAction = (action: string) => {
    setToastMessage(`Request dispatched: ${action} for Table ${qrTableNumber}`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-in fade-in duration-300">
      {/* Table Banner Header */}
      <div className="bg-[#141210] border border-amber-900/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
              <QrCode className="w-4 h-4 text-amber-400" />
              <span>Contactless Dine-In Session</span>
            </span>
            <span className="text-xs text-neutral-400">Karachi Flagship Clifton</span>
          </div>

          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
            Table {qrTableNumber} · Main Dining Hall
          </h1>
          <p className="text-xs text-neutral-400 max-w-lg">
            Scan complete. No application installation required. Select delicacies below to transmit directly to the kitchen brigade.
          </p>
        </div>

        {/* Change table selector for demo */}
        <div className="flex items-center gap-3 bg-[#1c1916] p-3 rounded-xl border border-neutral-800">
          <span className="text-xs text-neutral-400">Switch Table:</span>
          <select
            value={qrTableNumber}
            onChange={(e) => setQrTableNumber(e.target.value)}
            className="bg-[#12100e] text-amber-300 border border-neutral-700 rounded px-2.5 py-1 text-xs font-semibold outline-none"
          >
            <option value="T-01">T-01 (2 Seats)</option>
            <option value="T-02">T-02 (2 Seats)</option>
            <option value="T-03">T-03 (4 Seats)</option>
            <option value="T-04">T-04 (4 Seats)</option>
            <option value="T-06">T-06 (Family Hall)</option>
            <option value="OD-01">OD-01 (Terrace)</option>
            <option value="VIP-01">VIP-01 (VIP)</option>
          </select>
        </div>
      </div>

      {/* Guest Fast Assist Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => handleWaiterAction('Call Assigned Waiter')}
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#191613] hover:bg-[#221e1a] border border-neutral-800 text-neutral-200 text-xs font-medium transition-all cursor-pointer shadow-sm"
        >
          <Bell className="w-4 h-4 text-amber-400" />
          <span>Call Waiter</span>
        </button>
        <button
          onClick={() => handleWaiterAction('Request Cold Water & Glasses')}
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#191613] hover:bg-[#221e1a] border border-neutral-800 text-neutral-200 text-xs font-medium transition-all cursor-pointer shadow-sm"
        >
          <Droplet className="w-4 h-4 text-blue-400" />
          <span>Request Water</span>
        </button>
        <button
          onClick={() => handleWaiterAction('Request Final Bill & Receipt')}
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#191613] hover:bg-[#221e1a] border border-neutral-800 text-neutral-200 text-xs font-medium transition-all cursor-pointer shadow-sm"
        >
          <Receipt className="w-4 h-4 text-emerald-400" />
          <span>Request Bill</span>
        </button>
        <button
          onClick={() => handleWaiterAction('Assistance from Floor Manager')}
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#191613] hover:bg-[#221e1a] border border-neutral-800 text-neutral-200 text-xs font-medium transition-all cursor-pointer shadow-sm"
        >
          <HelpCircle className="w-4 h-4 text-purple-400" />
          <span>Need Help</span>
        </button>
      </div>

      {/* Feedback Toast */}
      {toastMessage && (
        <div className="p-3 bg-amber-950/80 border border-amber-500/60 rounded-xl text-xs text-amber-200 flex items-center justify-between shadow-lg animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>{toastMessage}</span>
          </div>
          <span className="text-[10px] text-amber-400 uppercase font-semibold">Chime Sent to POS</span>
        </div>
      )}

      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === cat
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-[#181512] text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Dish Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group bg-[#141210] border border-[#26221e] hover:border-amber-700/50 rounded-xl overflow-hidden transition-all flex flex-col justify-between"
          >
            <div className="relative h-44 overflow-hidden bg-neutral-900 cursor-pointer" onClick={() => onSelectFood(item)}>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 flex gap-1.5">
                <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[10px] uppercase font-bold text-amber-300 border border-neutral-800">
                  {item.category}
                </span>
                {item.isBestseller && (
                  <span className="px-2 py-0.5 rounded bg-amber-600/90 text-[10px] uppercase font-bold text-white">
                    Popular
                  </span>
                )}
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3
                  onClick={() => onSelectFood(item)}
                  className="font-serif-luxury font-bold text-base text-white hover:text-amber-400 transition-colors cursor-pointer line-clamp-1"
                >
                  {item.name}
                </h3>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-900 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase">Dine-in Price</span>
                  <div className="text-sm font-bold text-amber-400">
                    PKR {item.basePrice.toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={() => onSelectFood(item)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Customize & Order</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Bottom Cart Bar if items exist */}
      {cart.length > 0 && (
        <div className="sticky bottom-6 z-30">
          <div className="max-w-md mx-auto bg-amber-600 text-white rounded-xl shadow-2xl p-4 flex items-center justify-between ring-2 ring-amber-400/50">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5" />
              <div>
                <div className="text-xs font-semibold">
                  Table {qrTableNumber} Order ({cart.reduce((a, b) => a + b.quantity, 0)} items)
                </div>
                <div className="text-sm font-bold">
                  Total: PKR {cart.reduce((a, b) => a + b.itemTotal, 0).toLocaleString()}
                </div>
              </div>
            </div>
            <button
              onClick={onOpenCart}
              className="px-4 py-2 rounded-lg bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              Review Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
