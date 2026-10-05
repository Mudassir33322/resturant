import React from 'react';
import { useApp } from '../../context/AppContext';
import { MenuItem } from '../../types';
import { Star, Plus, Flame, Sparkles, ArrowRight } from 'lucide-react';

interface FeaturedDishesSectionProps {
  onSelectFood: (item: MenuItem) => void;
}

export const FeaturedDishesSection: React.FC<FeaturedDishesSectionProps> = ({ onSelectFood }) => {
  const { menuItems, addToCart, setActiveView } = useApp();

  const featuredItems = menuItems.filter((m) => m.isFeatured || m.isBestseller).slice(0, 6);

  const categories = [
    { name: 'Burgers', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80', count: '12 items' },
    { name: 'Pizza', img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=400&q=80', count: '8 items' },
    { name: 'Pasta', img: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=400&q=80', count: '6 items' },
    { name: 'BBQ', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80', count: '10 items' },
    { name: 'Pakistani', img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=400&q=80', count: '9 items' },
    { name: 'Seafood', img: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=400&q=80', count: '5 items' },
  ];

  return (
    <section className="py-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Categories Bar */}
      <div className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
              Curated Collections
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
              Explore By Category
            </h2>
          </div>
          <button
            onClick={() => setActiveView('menu')}
            className="text-xs uppercase tracking-wider font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 cursor-pointer"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => setActiveView('menu')}
              className="group relative h-36 rounded-xl overflow-hidden cursor-pointer border border-[#2b2723] hover:border-amber-600/60 transition-all duration-300 shadow-md"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-75 group-hover:brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-2.5 left-3 text-left">
                <div className="font-serif-luxury font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                  {cat.name}
                </div>
                <div className="text-[10px] text-neutral-400">{cat.count}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Masterpieces Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
            Signatures & Specialties
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
            Most Celebrated Creations
          </h2>
          <p className="text-neutral-400 text-xs">
            Hand-curated favorites ordered by our most discerning patrons.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectFood(item)}
              className="group bg-[#141210] border border-[#26221e] hover:border-amber-700/60 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-black cursor-pointer"
            >
              <div className="relative h-60 overflow-hidden bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-transparent opacity-50" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] uppercase font-bold text-amber-300 border border-neutral-800">
                    {item.category}
                  </span>
                  {item.isBestseller && (
                    <span className="px-2.5 py-0.5 rounded bg-amber-600 text-[10px] uppercase font-bold text-white">
                      Bestseller
                    </span>
                  )}
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-xs text-white">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{item.rating}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif-luxury font-bold text-lg text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-900 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase font-semibold">
                      Price
                    </span>
                    <div className="font-serif-luxury text-lg font-bold text-amber-400">
                      PKR {item.basePrice.toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        cartItemId: `${item.id}_direct_${Date.now()}`,
                        menuItem: item,
                        selectedModifiers: [],
                        quantity: 1,
                        itemTotal: item.basePrice,
                      });
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
