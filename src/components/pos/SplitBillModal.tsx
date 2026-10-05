import React, { useState } from 'react';
import { OrderItem } from '../../types';
import { X, Users, Divide, ListFilter, CheckCircle2 } from 'lucide-react';

interface SplitBillModalProps {
  totalAmount: number;
  items: OrderItem[];
  isOpen: boolean;
  onClose: () => void;
  onConfirmSplit: (summary: string) => void;
}

export const SplitBillModal: React.FC<SplitBillModalProps> = ({
  totalAmount,
  items,
  isOpen,
  onClose,
  onConfirmSplit,
}) => {
  const [splitMode, setSplitMode] = useState<'equal' | 'by_item' | 'custom'>('equal');
  const [splitCount, setSplitCount] = useState(2);
  const [customShares, setCustomShares] = useState<number[]>([
    Math.round(totalAmount / 2),
    totalAmount - Math.round(totalAmount / 2),
  ]);

  if (!isOpen) return null;

  const equalShare = Math.round(totalAmount / splitCount);

  const handleUpdateSplitCount = (count: number) => {
    setSplitCount(count);
    const perPerson = Math.floor(totalAmount / count);
    const shares = Array.from({ length: count }, (_, i) =>
      i === count - 1 ? totalAmount - perPerson * (count - 1) : perPerson
    );
    setCustomShares(shares);
  };

  const handleComplete = () => {
    let summary = '';
    if (splitMode === 'equal') {
      summary = `Split equally into ${splitCount} guests: PKR ${equalShare.toLocaleString()} each`;
    } else if (splitMode === 'custom') {
      summary = `Custom split into ${splitCount} shares: [${customShares.map((s) => `PKR ${s.toLocaleString()}`).join(', ')}]`;
    } else {
      summary = `Split by course items across dining parties`;
    }
    onConfirmSplit(summary);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-[#141210] border border-[#2c2824] rounded-2xl shadow-2xl overflow-hidden text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#24201c] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500">
              POS Terminal
            </span>
            <h2 className="font-serif-luxury text-xl font-bold text-white">
              Split Bill & Payments
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Total banner */}
          <div className="p-4 rounded-xl bg-[#1a1714] border border-neutral-800 flex justify-between items-center">
            <span className="text-xs text-neutral-400">Total Check Amount</span>
            <span className="font-serif-luxury text-xl font-bold text-amber-400">
              PKR {totalAmount.toLocaleString()}
            </span>
          </div>

          {/* Mode Selector */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'equal' as const, label: 'Equal Split', icon: <Divide className="w-4 h-4" /> },
              { id: 'by_item' as const, label: 'By Item', icon: <ListFilter className="w-4 h-4" /> },
              { id: 'custom' as const, label: 'Custom Amount', icon: <Users className="w-4 h-4" /> },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSplitMode(m.id)}
                className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  splitMode === m.id
                    ? 'border-amber-500 bg-amber-950/30 text-amber-300'
                    : 'border-neutral-800 bg-[#181512] text-neutral-400 hover:text-white'
                }`}
              >
                {m.icon}
                <span>{m.label}</span>
              </button>
            ))}
          </div>

          {/* Equal Split Options */}
          {splitMode === 'equal' && (
            <div className="space-y-4">
              <label className="block text-xs uppercase font-semibold text-neutral-300">
                Number of Guests / Shares
              </label>
              <div className="flex gap-2">
                {[2, 3, 4, 5, 6].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => handleUpdateSplitCount(count)}
                    className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-colors cursor-pointer ${
                      splitCount === count
                        ? 'bg-amber-600 border-amber-600 text-white'
                        : 'bg-[#181512] border-neutral-800 text-neutral-300'
                    }`}
                  >
                    {count} Guests
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-center space-y-1">
                <div className="text-xs text-neutral-400">Each Guest Pays</div>
                <div className="font-serif-luxury text-2xl font-bold text-amber-400">
                  PKR {equalShare.toLocaleString()}
                </div>
                <div className="text-[10px] text-neutral-500">
                  {splitCount} × PKR {equalShare.toLocaleString()} = PKR {totalAmount.toLocaleString()}
                </div>
              </div>
            </div>
          )}

          {/* By Item Split */}
          {splitMode === 'by_item' && (
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              <div className="text-xs text-neutral-400 mb-1">
                Select items to allocate to individual receipts:
              </div>
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-lg bg-[#181512] border border-neutral-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-semibold text-white">{item.quantity}× {item.name}</span>
                    <span className="text-neutral-500 text-[10px] ml-2">Guest { (idx % 2) + 1 }</span>
                  </div>
                  <span className="font-bold text-amber-400">PKR {item.totalPrice.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}

          {/* Custom Amount Split */}
          {splitMode === 'custom' && (
            <div className="space-y-3">
              <label className="block text-xs uppercase font-semibold text-neutral-300">
                Custom Guest Shares (PKR)
              </label>
              {customShares.map((val, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-xs text-neutral-400 w-16">Guest {idx + 1}:</span>
                  <input
                    type="number"
                    value={val}
                    onChange={(e) => {
                      const copy = [...customShares];
                      copy[idx] = Number(e.target.value);
                      setCustomShares(copy);
                    }}
                    className="flex-1 p-2 bg-[#181512] border border-neutral-800 rounded text-xs text-white outline-none focus:border-amber-500"
                  />
                  <span className="text-xs text-neutral-500">PKR</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#24201c] bg-[#100e0c] flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-neutral-800 text-xs font-semibold text-neutral-400 hover:text-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleComplete}
            className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold cursor-pointer"
          >
            Apply Split Check
          </button>
        </div>
      </div>
    </div>
  );
};
