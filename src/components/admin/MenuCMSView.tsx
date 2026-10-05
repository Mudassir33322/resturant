import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MenuItem, KitchenStation } from '../../types';
import {
  UtensilsCrossed,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  X,
  Flame,
  Star,
  Check,
} from 'lucide-react';

export const MenuCMSView: React.FC = () => {
  const { menuItems, setMenuItems, recordAuditLog } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const categories = ['All', 'Burgers', 'Pizza', 'Pasta', 'BBQ', 'Pakistani', 'Chinese', 'Seafood', 'Desserts', 'Beverages'];

  const filtered = menuItems.filter((m) => {
    const matchCat = selectedCat === 'All' || m.category.toLowerCase() === selectedCat.toLowerCase();
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleAvailability = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, available: !item.available };
          recordAuditLog('Item Availability Toggled', `${item.name} is now ${updated.available ? 'Available' : 'Out of Stock'}`);
          return updated;
        }
        return item;
      })
    );
    setToast('Item status updated live!');
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setMenuItems((prev) =>
      prev.map((m) => (m.id === editingItem.id ? editingItem : m))
    );
    recordAuditLog('Menu Item Edited', `Updated ${editingItem.name} (PKR ${editingItem.basePrice.toLocaleString()})`);
    setToast(`Saved changes for ${editingItem.name}!`);
    setTimeout(() => setToast(null), 3000);
    setEditingItem(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#25221e] pb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
            Culinary Catalog
          </span>
          <h1 className="font-serif-luxury text-3xl font-bold text-white mt-1">
            Menu CMS & Pricing Administration
          </h1>
        </div>

        <div className="text-xs text-neutral-400">
          Showing <strong>{filtered.length}</strong> delicacies
        </div>
      </div>

      {toast && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-600/50 rounded-xl text-xs text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search catalog dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#141210] border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCat === c
                  ? 'bg-amber-600 text-white'
                  : 'bg-[#141210] text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Menu CMS Table */}
      <div className="bg-[#141210] border border-[#25221e] rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#181512] text-neutral-400 uppercase text-[10px] font-bold tracking-wider border-b border-neutral-800">
            <tr>
              <th className="py-3 px-4">Dish</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Base Price</th>
              <th className="py-3 px-4">Prep Station</th>
              <th className="py-3 px-4">Rating</th>
              <th className="py-3 px-4">Live Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900 text-neutral-300">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-[#181512]/50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover bg-neutral-900 shrink-0"
                    />
                    <div>
                      <div className="font-bold text-white text-xs">{item.name}</div>
                      <div className="text-[10px] text-neutral-500 font-mono">{item.prepTimeMinutes} mins prep</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-neutral-400">{item.category}</td>
                <td className="py-3 px-4 font-mono font-bold text-amber-400">
                  PKR {item.basePrice.toLocaleString()}
                </td>
                <td className="py-3 px-4 font-mono uppercase text-[10px] text-neutral-300">
                  {item.kitchenStation}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => toggleAvailability(item.id)}
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                      item.available
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                        : 'bg-red-950/60 text-red-400 border border-red-800/40'
                    }`}
                  >
                    {item.available ? 'In Stock' : 'Out of Stock'}
                  </button>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => setEditingItem({ ...item })}
                    className="px-2.5 py-1 rounded bg-[#1e1b18] hover:bg-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white cursor-pointer"
                  >
                    Edit Item
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <form
            onSubmit={handleSaveEdit}
            className="w-full max-w-lg bg-[#141210] border border-[#2c2824] rounded-2xl p-6 space-y-4 shadow-2xl text-neutral-200"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h2 className="font-serif-luxury text-xl font-bold text-white">
                Edit Dish: {editingItem.name}
              </h2>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-1 rounded-full text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Dish Name</label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded text-xs text-white outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Price (PKR)</label>
                  <input
                    type="number"
                    value={editingItem.basePrice}
                    onChange={(e) => setEditingItem({ ...editingItem, basePrice: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded text-xs text-white outline-none font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Kitchen Station</label>
                  <select
                    value={editingItem.kitchenStation}
                    onChange={(e) => setEditingItem({ ...editingItem, kitchenStation: e.target.value as KitchenStation })}
                    className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded text-xs text-white outline-none"
                  >
                    <option value="grill">Grill</option>
                    <option value="fryer">Fryer</option>
                    <option value="pizza">Pizza</option>
                    <option value="pasta">Pasta</option>
                    <option value="main">Main Wok</option>
                    <option value="dessert">Dessert</option>
                    <option value="beverage">Beverage</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Description</label>
                <textarea
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  rows={2}
                  className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded text-xs text-white outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded bg-neutral-800 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold cursor-pointer"
              >
                Save Changes Live
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
