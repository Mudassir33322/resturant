import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BranchId } from '../../types';
import {
  Building2,
  TrendingUp,
  ArrowRightLeft,
  Boxes,
  CheckCircle2,
  Users,
  DollarSign,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';

export const MultiBranchView: React.FC = () => {
  const { currentBranch, setCurrentBranch, ingredients, staff, orders } = useApp();

  const [transferOrigin, setTransferOrigin] = useState<BranchId>('karachi_clifton');
  const [transferDest, setTransferDest] = useState<BranchId>('lahore_gulberg');
  const [transferItem, setTransferItem] = useState('ing_bun');
  const [transferQty, setTransferQty] = useState(25);
  const [transferNotice, setTransferNotice] = useState<string | null>(null);

  const branchesData = [
    {
      id: 'karachi_clifton' as BranchId,
      name: 'SAVORÉ Karachi',
      sub: 'Flagship Marine Promenade, Clifton',
      revenue: 'PKR 1,840,000',
      orders: 284,
      staffCount: 18,
      leadItem: 'SAVORÉ Truffle Beef Burger',
      rating: 4.9,
    },
    {
      id: 'lahore_gulberg' as BranchId,
      name: 'SAVORÉ Lahore',
      sub: 'M.M. Alam Road, Gulberg III',
      revenue: 'PKR 1,420,000',
      orders: 215,
      staffCount: 14,
      leadItem: 'Shinwari Desi Ghee Mutton Karahi',
      rating: 4.8,
    },
    {
      id: 'islamabad_f7' as BranchId,
      name: 'SAVORÉ Islamabad',
      sub: 'Executive Heights, F-7 Markaz',
      revenue: 'PKR 1,110,000',
      orders: 172,
      staffCount: 12,
      leadItem: 'Fire-Roasted Margherita Di Bufala',
      rating: 4.9,
    },
  ];

  const handleInitiateTransfer = () => {
    const itemObj = ingredients.find((i) => i.id === transferItem);
    setTransferNotice(
      `Inter-Branch Transfer Approved: Transferred ${transferQty} ${itemObj?.unit || 'units'} of ${itemObj?.name || 'stock'} from ${transferOrigin.replace('_', ' ').toUpperCase()} to ${transferDest.replace('_', ' ').toUpperCase()}. Dispatch slip generated.`
    );
    setTimeout(() => setTransferNotice(null), 5000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#25221e] pb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
            Chain Architecture
          </span>
          <h1 className="font-serif-luxury text-3xl font-bold text-white mt-1">
            Head Office & Multi-Branch Enterprise
          </h1>
        </div>

        <div className="px-3.5 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold">
          Consolidated Chain Revenue: PKR 4,370,000
        </div>
      </div>

      {/* Notice Banner */}
      {transferNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-600/50 text-xs text-emerald-200 flex items-center gap-2 shadow-lg animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{transferNotice}</span>
        </div>
      )}

      {/* 3 Regional Flagship Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {branchesData.map((branch) => {
          const isSelected = currentBranch === branch.id;
          return (
            <div
              key={branch.id}
              className={`p-6 rounded-2xl border transition-all duration-300 space-y-4 shadow-xl relative ${
                isSelected
                  ? 'border-amber-500 bg-[#161311] ring-1 ring-amber-500/40'
                  : 'border-[#25221e] bg-[#141210] hover:border-neutral-700'
              }`}
            >
              {isSelected && (
                <span className="absolute top-4 right-4 px-2 py-0.5 rounded bg-amber-500 text-black text-[9px] font-bold uppercase tracking-wider">
                  Active Context
                </span>
              )}

              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-white">
                  {branch.name}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">{branch.sub}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-neutral-800">
                <div>
                  <span className="text-[10px] uppercase text-neutral-500 font-semibold">
                    Monthly Revenue
                  </span>
                  <div className="text-sm font-bold text-amber-400 font-serif-luxury mt-0.5">
                    {branch.revenue}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-500 font-semibold">
                    Orders Processed
                  </span>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {branch.orders} Orders
                  </div>
                </div>
              </div>

              <div className="text-xs text-neutral-400 space-y-1 pt-1">
                <div>Top Product: <strong className="text-neutral-200">{branch.leadItem}</strong></div>
                <div>Staff Brigade: <strong className="text-neutral-200">{branch.staffCount} Team Members</strong></div>
              </div>

              <button
                onClick={() => setCurrentBranch(branch.id)}
                className={`w-full py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-amber-600 text-white'
                    : 'bg-[#1e1b18] hover:bg-neutral-800 text-neutral-300'
                }`}
              >
                {isSelected ? 'Managing This Branch' : 'Switch Context to This Branch'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Inter-Branch Inventory Transfer Module */}
      <div className="p-6 rounded-2xl bg-[#141210] border border-[#2b2723] space-y-5 shadow-xl">
        <div>
          <span className="text-xs uppercase font-bold text-amber-500 tracking-wider flex items-center gap-1.5">
            <ArrowRightLeft className="w-4 h-4" />
            <span>Inter-Branch Stock Balancing & Re-allocation</span>
          </span>
          <h2 className="font-serif-luxury text-xl font-bold text-white mt-1">
            Transfer Raw Ingredients Between Locations
          </h2>
          <p className="text-neutral-400 text-xs mt-0.5">
            Prevent stockouts by transferring ingredients directly between warehouse vaults.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] text-neutral-400 mb-1">Source Branch</label>
            <select
              value={transferOrigin}
              onChange={(e) => setTransferOrigin(e.target.value as BranchId)}
              className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white outline-none"
            >
              <option value="karachi_clifton">Karachi Flagship (Clifton)</option>
              <option value="lahore_gulberg">Lahore Flagship (Gulberg)</option>
              <option value="islamabad_f7">Islamabad Flagship (F-7)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] text-neutral-400 mb-1">Destination Branch</label>
            <select
              value={transferDest}
              onChange={(e) => setTransferDest(e.target.value as BranchId)}
              className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white outline-none"
            >
              <option value="lahore_gulberg">Lahore Flagship (Gulberg)</option>
              <option value="karachi_clifton">Karachi Flagship (Clifton)</option>
              <option value="islamabad_f7">Islamabad Flagship (F-7)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] text-neutral-400 mb-1">Select Ingredient</label>
            <select
              value={transferItem}
              onChange={(e) => setTransferItem(e.target.value)}
              className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white outline-none"
            >
              {ingredients.map((ing) => (
                <option key={ing.id} value={ing.id}>
                  {ing.name} ({ing.currentStock} {ing.unit} in vault)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] text-neutral-400 mb-1">Transfer Qty</label>
            <input
              type="number"
              value={transferQty}
              onChange={(e) => setTransferQty(Number(e.target.value))}
              className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white outline-none font-mono"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleInitiateTransfer}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-md"
          >
            <span>Approve & Dispatch Logistics</span>
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
