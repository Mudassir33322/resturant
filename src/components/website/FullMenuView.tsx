import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MenuItem } from '../../types';
import {
  Search,
  Filter,
  Flame,
  Leaf,
  Star,
  Plus,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Sparkles,
} from 'lucide-react';

interface FullMenuViewProps {
  onSelectFood: (item: MenuItem) => void;
}

export const FullMenuView: React.FC<FullMenuViewProps> = ({ onSelectFood }) => {
  const { menuItems, addToCart } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterVegetarian, setFilterVegetarian] = useState(false);
  const [filterSpicy, setFilterSpicy] = useState(false);
  const [filterBestseller, setFilterBestseller] = useState(false);
  const [layoutMode, setLayoutMode] = useState<'grid' | 'compact'>('grid');
  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high'>('popular');

  const categories = [
    'All',
    'Burgers',
    'Pizza',
    'Pasta',
    'BBQ',
    'Pakistani',
    'Desi',
    'Chinese',
    'Seafood',
    'Desserts',
    'Beverages',
  ];

  const filteredItems = menuItems
    .filter((item) => {
      const matchCat =
        selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchVeg = !filterVegetarian || item.isVegetarian;
      const matchSpicy = !filterSpicy || item.isSpicy;
      const matchBest = !filterBestseller || item.isBestseller;
      return matchCat && matchSearch && matchVeg && matchSpicy && matchBest;
    })
    .sort((a, b) => {
      if (sortBy === 'price_low') return a.basePrice - b.basePrice;
      if (sortBy === 'price_high') return b.basePrice - a.basePrice;
      return b.rating - a.rating;
    });

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      cartItemId: `${item.id}_quick_${Date.now()}`,
      menuItem: item,
      selectedModifiers: [],
      quantity: 1,
      itemTotal: item.basePrice,
    });
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#24201c] pb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
            Artisanal Dining
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white mt-1">
            The SAVORÉ Repertoire
          </h1>
          <p className="text-neutral-400 text-xs mt-1.5 max-w-xl leading-relaxed">
            Every dish is an orchestrated balance of prime cuts, hand-milled spices, organic dairy, and slow-fermented grains.
          </p>
        </div>

        {/* Layout & Sort */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#161311] border border-neutral-800 rounded-lg p-1">
            <button
              onClick={() => setLayoutMode('grid')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                layoutMode === 'grid' ? 'bg-amber-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayoutMode('compact')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                layoutMode === 'compact' ? 'bg-amber-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
              title="Compact View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="p-2 bg-[#161311] border border-neutral-800 rounded-lg text-xs text-neutral-200 outline-none cursor-pointer"
          >
            <option value="popular">Sort by: Top Rated</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search burgers, steaks, biryani, pizzas, karahi, desserts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#161311] border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:border-amber-500 outline-none"
            />
          </div>

          {/* Quick Dietary Toggles */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFilterBestseller(!filterBestseller)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                filterBestseller
                  ? 'border-amber-500 bg-amber-950/40 text-amber-300'
                  : 'border-neutral-800 bg-[#161311] text-neutral-400 hover:text-white'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Bestsellers</span>
            </button>
            <button
              onClick={() => setFilterVegetarian(!filterVegetarian)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                filterVegetarian
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                  : 'border-neutral-800 bg-[#161311] text-neutral-400 hover:text-white'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Vegetarian</span>
            </button>
            <button
              onClick={() => setFilterSpicy(!filterSpicy)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                filterSpicy
                  ? 'border-red-500 bg-red-950/40 text-red-300'
                  : 'border-neutral-800 bg-[#161311] text-neutral-400 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-red-400" />
              <span>Spicy</span>
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-[#161311] text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-20 bg-[#141210] rounded-2xl border border-neutral-800 space-y-3">
          <p className="font-serif-luxury text-lg text-white">No culinary items match your filter.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setFilterVegetarian(false);
              setFilterSpicy(false);
              setFilterBestseller(false);
            }}
            className="text-xs text-amber-400 hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Grid Mode */}
      {layoutMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectFood(item)}
              className="group bg-[#141210] border border-[#24201c] hover:border-amber-700/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-black cursor-pointer"
            >
              {/* Image Frame */}
              <div className="relative h-52 overflow-hidden bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-transparent opacity-60" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[10px] uppercase font-bold text-amber-300 border border-neutral-800">
                    {item.category}
                  </span>
                  {item.isBestseller && (
                    <span className="px-2 py-0.5 rounded bg-amber-600 text-[10px] uppercase font-bold text-white">
                      Bestseller
                    </span>
                  )}
                  {item.isSpicy && (
                    <span className="px-1.5 py-0.5 rounded bg-red-950/80 border border-red-800 text-[10px] text-red-300">
                      🌶️ Hot
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2 right-3 text-[11px] font-semibold text-neutral-300 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{item.rating}</span>
                </div>
              </div>

              {/* Body */}
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
                      Base Price
                    </span>
                    <div className="font-serif-luxury text-lg font-bold text-amber-400">
                      PKR {item.basePrice.toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleQuickAdd(item, e)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors cursor-pointer shadow-md shadow-amber-950/40"
                    title="Quick Add to Bag"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Compact List Mode */
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectFood(item)}
              className="group bg-[#141210] border border-[#24201c] hover:border-amber-700/50 rounded-xl p-4 flex items-center justify-between gap-4 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover bg-neutral-900 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif-luxury font-bold text-base text-white group-hover:text-amber-400 transition-colors truncate">
                      {item.name}
                    </h3>
                    {item.isBestseller && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 truncate max-w-xl mt-0.5">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-neutral-500 mt-1">
                    <span>{item.category}</span>
                    <span>·</span>
                    <span>{item.prepTimeMinutes} mins</span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {item.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <div className="text-sm font-bold text-amber-400">
                    PKR {item.basePrice.toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={(e) => handleQuickAdd(item, e)}
                  className="p-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white transition-colors cursor-pointer"
                  title="Quick Add"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
