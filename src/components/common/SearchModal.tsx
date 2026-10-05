import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MenuItem } from '../../types';
import { Search, X, Star, Plus, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFood: (item: MenuItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectFood }) => {
  const { menuItems, addToCart } = useApp();
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? menuItems.filter(
        (m) =>
          m.name.toLowerCase().includes(query.toLowerCase()) ||
          m.category.toLowerCase().includes(query.toLowerCase()) ||
          m.description.toLowerCase().includes(query.toLowerCase())
      )
    : menuItems.slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#141210] border border-[#2b2723] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#24201c] flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-500" />
          <input
            type="text"
            placeholder="Search dishes, burgers, desserts, biryani, pizzas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          <div className="text-[11px] uppercase font-bold tracking-wider text-neutral-500 px-2 mb-2">
            {query.trim() ? `Search Results (${results.length})` : 'Popular Recommendations'}
          </div>

          {results.length === 0 ? (
            <div className="text-center py-8 text-neutral-500 text-xs">
              No matching delicacies found for "{query}".
            </div>
          ) : (
            results.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onClose();
                  onSelectFood(item);
                }}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#1c1916] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover bg-neutral-900 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-neutral-400 truncate max-w-md">
                      {item.description}
                    </p>
                    <span className="text-[10px] text-amber-500/80 font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-2">
                  <span className="text-xs font-bold text-amber-400">
                    PKR {item.basePrice.toLocaleString()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        cartItemId: `${item.id}_search_${Date.now()}`,
                        menuItem: item,
                        selectedModifiers: [],
                        quantity: 1,
                        itemTotal: item.basePrice,
                      });
                    }}
                    className="p-1.5 rounded-md bg-amber-600 hover:bg-amber-500 text-white transition-colors cursor-pointer"
                    title="Quick Add"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
