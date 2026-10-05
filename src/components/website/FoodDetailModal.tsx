import React, { useState, useEffect } from 'react';
import { MenuItem, MenuItemVariant, CartItemModifier } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  X,
  Star,
  Clock,
  Flame,
  Check,
  Plus,
  Minus,
  AlertCircle,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';

interface FoodDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onOpenCart?: () => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({ item, onClose, onOpenCart }) => {
  const { addToCart } = useApp();

  const [selectedVariant, setSelectedVariant] = useState<MenuItemVariant | undefined>(undefined);
  const [selectedModifiers, setSelectedModifiers] = useState<CartItemModifier[]>([]);
  const [spiceLevel, setSpiceLevel] = useState<'Mild' | 'Medium' | 'Hot' | 'Extra Hot'>('Medium');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showAddedNotice, setShowAddedNotice] = useState(false);

  useEffect(() => {
    if (item) {
      setSelectedVariant(item.variants && item.variants.length > 0 ? item.variants[0] : undefined);
      setSelectedModifiers([]);
      setSpiceLevel('Medium');
      setSpecialInstructions('');
      setQuantity(1);
      setShowAddedNotice(false);
    }
  }, [item]);

  if (!item) return null;

  const basePrice = selectedVariant ? selectedVariant.price : item.basePrice;
  const modifiersTotal = selectedModifiers.reduce((sum, mod) => sum + mod.price, 0);
  const unitPrice = basePrice + modifiersTotal;
  const totalPrice = unitPrice * quantity;

  const toggleModifier = (groupId: string, groupName: string, modifierId: string, name: string, price: number) => {
    setSelectedModifiers((prev) => {
      const exists = prev.some((m) => m.modifierId === modifierId);
      if (exists) {
        return prev.filter((m) => m.modifierId !== modifierId);
      } else {
        return [...prev, { groupId, groupName, modifierId, name, price }];
      }
    });
  };

  const handleAddToCart = () => {
    addToCart({
      cartItemId: `${item.id}_${selectedVariant?.id || 'base'}_${Date.now()}`,
      menuItem: item,
      variant: selectedVariant,
      selectedModifiers,
      quantity,
      spiceLevel,
      specialInstructions: specialInstructions.trim() || undefined,
      itemTotal: totalPrice,
    });

    setShowAddedNotice(true);
    setTimeout(() => {
      setShowAddedNotice(false);
      onClose();
      if (onOpenCart) onOpenCart();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#141210] border border-[#2e2a25] rounded-xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/90 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image & Highlights */}
          <div className="relative h-64 md:h-full min-h-[300px] bg-neutral-900">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-transparent md:hidden" />
            
            <div className="absolute bottom-3 left-4 flex flex-wrap gap-2 text-[11px] text-amber-200">
              <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-amber-900/40 flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{item.rating} ({item.reviewsCount} reviews)</span>
              </span>
              <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-neutral-700 flex items-center gap-1">
                <Clock className="w-3 h-3 text-neutral-400" />
                <span>{item.prepTimeMinutes} mins prep</span>
              </span>
            </div>
          </div>

          {/* Details & Customizer */}
          <div className="p-6 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1">
                  <span>{item.category}</span>
                  {item.isBestseller && <span className="text-amber-300">· Chef's Choice</span>}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#f4efe8]">
                  {item.name}
                </h2>
                <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Sizes / Variants */}
              {item.variants && item.variants.length > 0 && (
                <div className="pt-2 border-t border-[#262320]">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                    Select Size / Portion
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {item.variants.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                          selectedVariant?.id === v.id
                            ? 'border-amber-500 bg-amber-950/20 text-white shadow-sm'
                            : 'border-neutral-800 bg-[#1c1916] text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        <div className="text-xs font-semibold">{v.name}</div>
                        <div className="text-sm font-bold text-amber-400 mt-0.5">
                          PKR {v.price.toLocaleString()}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Spice Level */}
              <div className="pt-2 border-t border-[#262320]">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-neutral-300 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    <span>Spice Intensity</span>
                  </label>
                  <span className="text-xs text-amber-400 font-medium">{spiceLevel}</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['Mild', 'Medium', 'Hot', 'Extra Hot'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSpiceLevel(level)}
                      className={`py-1.5 px-2 text-xs font-medium rounded border transition-colors cursor-pointer ${
                        spiceLevel === level
                          ? 'border-orange-500 bg-orange-950/30 text-orange-200'
                          : 'border-neutral-800 bg-[#1a1715] text-neutral-400 hover:text-white'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Modifiers & Add-ons */}
              {item.modifierGroups && item.modifierGroups.length > 0 && (
                <div className="space-y-4 pt-2 border-t border-[#262320]">
                  {item.modifierGroups.map((group) => (
                    <div key={group.id}>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs uppercase tracking-wider font-semibold text-neutral-300">
                          {group.name}
                        </label>
                        <span className="text-[11px] text-neutral-400">
                          {group.required ? 'Required' : 'Optional'}
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {group.options.map((opt) => {
                          const isSelected = selectedModifiers.some((m) => m.modifierId === opt.id);
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => toggleModifier(group.id, group.name, opt.id, opt.name, opt.price)}
                              className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                                isSelected
                                  ? 'border-amber-500/70 bg-amber-950/20 text-white'
                                  : 'border-neutral-800 bg-[#191614] text-neutral-300 hover:border-neutral-700'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-4 h-4 rounded flex items-center justify-center border ${
                                    isSelected
                                      ? 'bg-amber-500 border-amber-500 text-black'
                                      : 'border-neutral-700 bg-neutral-900'
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                                <span>{opt.name}</span>
                              </div>
                              <span className="font-semibold text-amber-400">
                                + PKR {opt.price.toLocaleString()}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Special Instructions */}
              <div className="pt-2 border-t border-[#262320]">
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-1.5">
                  Chef Preparation Notes
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Less salt, dressing on the side, well done patty..."
                  rows={2}
                  className="w-full p-2.5 bg-[#181513] border border-neutral-800 rounded-lg text-xs text-neutral-200 placeholder-neutral-600 focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Allergens Notice */}
              {item.allergens && item.allergens.length > 0 && (
                <div className="flex items-center gap-2 text-[11px] text-neutral-400 bg-[#181513] p-2.5 rounded-lg border border-neutral-800/80">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Allergens: {item.allergens.join(', ')}</span>
                </div>
              )}
            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="pt-5 mt-6 border-t border-[#2c2824] flex items-center justify-between gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-neutral-800 rounded-lg bg-[#181513] p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-between px-5 py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-all shadow-lg shadow-amber-950/50 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span>{showAddedNotice ? 'Added to Cart!' : 'Add to Cart'}</span>
                </div>
                <span className="font-bold tracking-wide">
                  PKR {totalPrice.toLocaleString()}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
