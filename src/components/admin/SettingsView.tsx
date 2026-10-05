import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Shield, Printer, DollarSign, Store, Clock, CheckCircle2 } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [toast, setToast] = useState<string | null>(null);

  const handleSave = () => {
    setToast('Configuration profiles updated successfully!');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#25221e] pb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
            Platform Configuration
          </span>
          <h1 className="font-serif-luxury text-3xl font-bold text-white mt-1">
            Global Settings & Preferences
          </h1>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
        >
          Save All Settings
        </button>
      </div>

      {toast && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-600/50 text-xs text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Restaurant Identity */}
        <div className="p-6 rounded-2xl bg-[#141210] border border-[#25221e] space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
            <Store className="w-4 h-4" />
            <span>Brand Identity</span>
          </div>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-neutral-400 mb-1">Brand Name</label>
              <input
                type="text"
                defaultValue="SAVORÉ"
                className="w-full p-2 bg-[#181512] border border-neutral-800 rounded text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Tagline</label>
              <input
                type="text"
                defaultValue="Good Food. Great Moments."
                className="w-full p-2 bg-[#181512] border border-neutral-800 rounded text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Official Country & Currency</label>
              <input
                type="text"
                disabled
                value="Pakistan (PKR / Pakistani Rupee)"
                className="w-full p-2 bg-[#181512] border border-neutral-800 rounded text-neutral-500"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Taxes & Financials */}
        <div className="p-6 rounded-2xl bg-[#141210] border border-[#25221e] space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
            <DollarSign className="w-4 h-4" />
            <span>Fiscal & Sales Tax</span>
          </div>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-neutral-400 mb-1">Sindh / Provincial Sales Tax (GST %)</label>
              <input
                type="number"
                defaultValue={16}
                className="w-full p-2 bg-[#181512] border border-neutral-800 rounded text-white outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Restaurant NTN / Tax ID</label>
              <input
                type="text"
                defaultValue="9482019-4"
                className="w-full p-2 bg-[#181512] border border-neutral-800 rounded text-white outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Service Surcharge (%)</label>
              <input
                type="number"
                defaultValue={0}
                className="w-full p-2 bg-[#181512] border border-neutral-800 rounded text-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* Card 3: POS & Hardware */}
        <div className="p-6 rounded-2xl bg-[#141210] border border-[#25221e] space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
            <Printer className="w-4 h-4" />
            <span>Thermal Receipt Printer</span>
          </div>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-neutral-400 mb-1">Paper Roll Width</label>
              <select className="w-full p-2 bg-[#181512] border border-neutral-800 rounded text-white outline-none">
                <option>80mm Standard Thermal</option>
                <option>58mm Compact Receipt</option>
              </select>
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Auto-Print KOT on Order Send</label>
              <select className="w-full p-2 bg-[#181512] border border-neutral-800 rounded text-white outline-none">
                <option>Enabled (Immediate Chime & Print)</option>
                <option>Manual Click Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Card 4: Security */}
        <div className="p-6 rounded-2xl bg-[#141210] border border-[#25221e] space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
            <Shield className="w-4 h-4" />
            <span>Security & Sessions</span>
          </div>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-neutral-400 mb-1">Two-Factor Authentication (2FA)</label>
              <span className="text-[11px] text-emerald-400 font-semibold block">
                Enterprise SSO / 2FA Ready Architecture
              </span>
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">POS Shift Auto-Lockout</label>
              <select className="w-full p-2 bg-[#181512] border border-neutral-800 rounded text-white outline-none">
                <option>After 15 minutes of inactivity</option>
                <option>After 30 minutes of inactivity</option>
                <option>Never during service hours</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
