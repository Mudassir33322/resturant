import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IngredientInventoryItem, MenuItem } from '../../types';
import {
  Boxes,
  ChefHat,
  AlertTriangle,
  Plus,
  Minus,
  Trash2,
  TrendingDown,
  TrendingUp,
  History,
  DollarSign,
  Search,
  CheckCircle2,
  PackagePlus,
  Filter,
} from 'lucide-react';

export const InventoryAndRecipesView: React.FC = () => {
  const {
    ingredients,
    stockMovements,
    adjustInventoryStock,
    menuItems,
    suppliers,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'stock' | 'recipes' | 'movements' | 'wastage'>('stock');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Adjustment Modal state
  const [adjustingItem, setAdjustingItem] = useState<IngredientInventoryItem | null>(null);
  const [adjustQty, setAdjustQty] = useState<number>(5);
  const [adjustReason, setAdjustReason] = useState<string>('Supplier Delivery / Stock In');

  const categories = [
    'All',
    'Meat & Poultry',
    'Dairy & Cheese',
    'Produce & Veggies',
    'Baking & Grains',
    'Oils & Sauces',
    'Spices',
    'Beverages',
    'Packaging',
  ];

  const filteredIngredients = ingredients.filter((ing) => {
    const matchCat = selectedCategory === 'All' || ing.category === selectedCategory;
    const matchSearch = ing.name.toLowerCase().includes(searchQuery.toLowerCase()) || ing.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const lowStockCount = ingredients.filter((i) => i.currentStock <= i.minimumStock).length;
  const totalStockValue = ingredients.reduce((sum, i) => sum + i.currentStock * i.unitCostPKR, 0);

  const handleApplyAdjustment = (isDeduction = false) => {
    if (!adjustingItem) return;
    const finalQty = isDeduction ? -Math.abs(adjustQty) : Math.abs(adjustQty);
    adjustInventoryStock(adjustingItem.id, finalQty, adjustReason);
    setAdjustingItem(null);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#25221e] pb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
            Supply Chain & Cost Engineering
          </span>
          <h1 className="font-serif-luxury text-3xl font-bold text-white mt-1">
            Ingredients, Recipes & Food Costing
          </h1>
        </div>

        {/* Global Summary Cards */}
        <div className="flex items-center gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#141210] border border-neutral-800">
            <span className="text-neutral-400">Total Stock Value</span>
            <div className="text-base font-bold text-amber-400 font-serif-luxury">
              PKR {totalStockValue.toLocaleString()}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-[#141210] border border-neutral-800">
            <span className="text-neutral-400">Low Stock Alerts</span>
            <div className="text-base font-bold text-red-400 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              <span>{lowStockCount} Items</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-800 gap-6 text-xs uppercase tracking-wider font-semibold">
        <button
          onClick={() => setActiveTab('stock')}
          className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'stock'
              ? 'text-amber-400 border-b-2 border-amber-500 font-bold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Boxes className="w-4 h-4" />
          <span>Ingredient Stock ({ingredients.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('recipes')}
          className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'recipes'
              ? 'text-amber-400 border-b-2 border-amber-500 font-bold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <ChefHat className="w-4 h-4" />
          <span>Recipe Formulation & Food Cost %</span>
        </button>

        <button
          onClick={() => setActiveTab('movements')}
          className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'movements'
              ? 'text-amber-400 border-b-2 border-amber-500 font-bold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Stock Movement Ledger</span>
        </button>
      </div>

      {/* 1. STOCK INVENTORY TAB */}
      {activeTab === 'stock' && (
        <div className="space-y-6">
          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by ingredient name, SKU (e.g. MEA-001, Angus, Mozzarella)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#141210] border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === c
                      ? 'bg-amber-600 text-white'
                      : 'bg-[#141210] text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-[#141210] border border-[#25221e] rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#181512] text-neutral-400 uppercase text-[10px] font-bold tracking-wider border-b border-neutral-800">
                  <tr>
                    <th className="py-3 px-4">Ingredient & SKU</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Current Stock</th>
                    <th className="py-3 px-4">Thresholds</th>
                    <th className="py-3 px-4">Unit Cost</th>
                    <th className="py-3 px-4">Supplier</th>
                    <th className="py-3 px-4 text-right">Quick Stock Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 text-neutral-300">
                  {filteredIngredients.map((item) => {
                    const isLow = item.currentStock <= item.minimumStock;
                    return (
                      <tr key={item.id} className="hover:bg-[#181512]/50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-white text-xs">{item.name}</div>
                          <div className="text-[10px] text-neutral-500 font-mono">{item.sku} · Batch {item.batchNumber}</div>
                        </td>
                        <td className="py-3 px-4 text-neutral-400">{item.category}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold font-mono text-sm text-white">
                              {item.currentStock} {item.unit}
                            </span>
                            {isLow && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-950/60 border border-red-800/40 text-red-300 animate-pulse">
                                Low Stock
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[11px] text-neutral-400">
                          Min: {item.minimumStock} {item.unit} · Reorder: {item.reorderLevel} {item.unit}
                        </td>
                        <td className="py-3 px-4 font-mono font-semibold text-amber-400">
                          PKR {item.unitCostPKR.toLocaleString()} / {item.unit}
                        </td>
                        <td className="py-3 px-4 text-[11px] text-neutral-400">
                          {item.supplierName}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setAdjustingItem(item)}
                            className="px-3 py-1.5 rounded-lg bg-[#1e1b18] hover:bg-neutral-800 border border-neutral-700 text-amber-300 hover:text-white text-xs font-semibold cursor-pointer"
                          >
                            Adjust Stock
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. RECIPE FORMULATION & FOOD COSTING */}
      {activeTab === 'recipes' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-[#141210] border border-amber-900/40 text-xs text-neutral-300 space-y-1">
            <span className="font-bold text-amber-400 uppercase tracking-wide">
              Automated Recipe Consumption Engine:
            </span>
            <p className="text-neutral-400 leading-relaxed">
              When an order is created or reaches the kitchen KDS, the recipe calculates exact ingredient deductions in real-time. This guarantees precise food cost margins, gross profit calculation, and immediate reorder triggers without manual counting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.slice(0, 8).map((dish) => {
              const recipeIngredients = dish.recipe.map((ref) => {
                const ing = ingredients.find((i) => i.id === ref.ingredientId);
                const cost = ing ? ing.unitCostPKR * ref.quantity : 0;
                return { ref, ing, cost };
              });

              const calculatedCost = recipeIngredients.reduce((sum, ri) => sum + ri.cost, 0);
              const grossProfit = Math.max(0, dish.basePrice - calculatedCost);
              const foodCostPercent = dish.basePrice > 0 ? Math.round((calculatedCost / dish.basePrice) * 100) : 0;

              return (
                <div
                  key={dish.id}
                  className="p-5 rounded-2xl bg-[#141210] border border-[#25221e] space-y-4 shadow-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-14 h-14 rounded-lg object-cover bg-neutral-900 shrink-0"
                      />
                      <div>
                        <h3 className="font-serif-luxury font-bold text-white text-base">
                          {dish.name}
                        </h3>
                        <span className="text-[10px] text-amber-500 uppercase font-semibold">
                          {dish.category} · Station: {dish.kitchenStation}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Financial Barometer */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#181512] border border-neutral-800 text-center">
                    <div>
                      <div className="text-[10px] uppercase text-neutral-500 font-semibold">Selling Price</div>
                      <div className="text-xs font-bold text-white mt-0.5">
                        PKR {dish.basePrice.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-neutral-500 font-semibold">Food Cost</div>
                      <div className="text-xs font-bold text-amber-400 mt-0.5">
                        PKR {Math.round(calculatedCost).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-neutral-500 font-semibold">Food Cost %</div>
                      <div className="text-xs font-bold text-emerald-400 mt-0.5">
                        {foodCostPercent}% ({grossProfit > 0 ? 'High Margin' : 'Normal'})
                      </div>
                    </div>
                  </div>

                  {/* Bill of Materials (Ingredients in Recipe) */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                      Recipe Consumption Components:
                    </div>
                    <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                      {recipeIngredients.map((ri, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center text-xs py-1 border-b border-neutral-900"
                        >
                          <span className="text-neutral-300">
                            {ri.ing?.name || 'Ingredient'}
                          </span>
                          <span className="font-mono text-neutral-400 text-[11px]">
                            {ri.ref.quantity} {ri.ing?.unit || 'unit'} (~PKR {Math.round(ri.cost)})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. STOCK MOVEMENTS LEDGER */}
      {activeTab === 'movements' && (
        <div className="space-y-4">
          <div className="bg-[#141210] border border-[#25221e] rounded-2xl overflow-hidden shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#181512] text-neutral-400 uppercase text-[10px] font-bold tracking-wider border-b border-neutral-800">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Ingredient</th>
                  <th className="py-3 px-4">Movement Type</th>
                  <th className="py-3 px-4">Qty Change</th>
                  <th className="py-3 px-4">Reason / Reference</th>
                  <th className="py-3 px-4">Actor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-neutral-300">
                {stockMovements.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-neutral-500">
                      No stock movement history logged yet. Place an order or adjust stock to see entries.
                    </td>
                  </tr>
                ) : (
                  stockMovements.map((mov) => (
                    <tr key={mov.id} className="hover:bg-[#181512]/40">
                      <td className="py-3 px-4 font-mono text-[11px] text-neutral-400">
                        {new Date(mov.date).toLocaleTimeString()} · {new Date(mov.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 font-bold text-white">{mov.ingredientName}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            mov.quantityChange > 0
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                              : 'bg-red-950/60 text-red-400 border border-red-800/40'
                          }`}
                        >
                          {mov.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold">
                        <span className={mov.quantityChange > 0 ? 'text-emerald-400' : 'text-red-400'}>
                          {mov.quantityChange > 0 ? `+${mov.quantityChange}` : mov.quantityChange} {mov.unit}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-neutral-300">{mov.reason}</td>
                      <td className="py-3 px-4 text-neutral-400">{mov.performedBy}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stock Adjustment Modal */}
      {adjustingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-md bg-[#141210] border border-[#2c2824] rounded-2xl p-6 space-y-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-500">
                Inventory Adjustment
              </span>
              <h2 className="font-serif-luxury text-xl font-bold text-white mt-0.5">
                {adjustingItem.name}
              </h2>
              <p className="text-xs text-neutral-400">
                Current Stock: {adjustingItem.currentStock} {adjustingItem.unit}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs uppercase font-semibold text-neutral-300 mb-1">
                  Quantity ({adjustingItem.unit})
                </label>
                <input
                  type="number"
                  value={adjustQty}
                  onChange={(e) => setAdjustQty(Number(e.target.value))}
                  className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white outline-none focus:border-amber-500 font-mono text-base"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-neutral-300 mb-1">
                  Reason / Source
                </label>
                <select
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded-lg text-xs text-white outline-none focus:border-amber-500"
                >
                  <option value="Supplier Purchase / Delivery In">Supplier Purchase / Stock In</option>
                  <option value="Kitchen Wastage / Spoilage">Kitchen Wastage / Spoilage</option>
                  <option value="Manual Inventory Audit Count Correction">Audit Count Correction</option>
                  <option value="Inter-Branch Transfer In">Inter-Branch Transfer In</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleApplyAdjustment(true)}
                className="flex-1 py-2.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-200 text-xs font-semibold cursor-pointer"
              >
                Deduct (-) Wastage / Out
              </button>
              <button
                type="button"
                onClick={() => handleApplyAdjustment(false)}
                className="flex-1 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold cursor-pointer"
              >
                Add (+) Stock In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
