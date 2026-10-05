import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  ShoppingBag,
  CalendarDays,
  MapPin,
  Clock,
  Sparkles,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Gift,
} from 'lucide-react';

export const CustomerAccountView: React.FC = () => {
  const { customers, orders, reservations, setActiveView, setTrackingOrderId, addToCart } = useApp();
  const [activeTab, setActiveTab] = useState<'orders' | 'reservations' | 'addresses' | 'loyalty'>('orders');

  const customer = customers[0]; // Daniyal Qureshi
  const myOrders = orders.filter((o) => o.customerName === customer.name || o.customerId === customer.id || true).slice(0, 8);
  const myReservations = reservations.slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      {/* Profile Header */}
      <div className="bg-[#141210] border border-[#2c2824] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-800 text-white font-serif-luxury font-bold text-2xl flex items-center justify-center ring-4 ring-amber-500/20 shadow-lg">
            DQ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif-luxury text-2xl font-bold text-white">
                {customer.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
                {customer.tier} Tier
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              {customer.email} · {customer.phone}
            </p>
          </div>
        </div>

        {/* Loyalty Quick Card */}
        <div className="flex items-center gap-4 bg-[#1b1815] border border-neutral-800 p-4 rounded-xl">
          <div className="p-3 rounded-lg bg-amber-500/20 text-amber-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
              SAVORÉ Rewards
            </div>
            <div className="text-xl font-bold font-brand text-amber-400">
              {customer.loyaltyPoints} Points
            </div>
            <div className="text-[10px] text-neutral-400">
              Worth PKR {customer.loyaltyPoints} discount
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#141210] border border-neutral-800">
          <div className="text-[10px] uppercase text-neutral-400 font-semibold">Total Orders</div>
          <div className="text-xl font-bold text-white mt-1">{customer.totalOrders}</div>
        </div>
        <div className="p-4 rounded-xl bg-[#141210] border border-neutral-800">
          <div className="text-[10px] uppercase text-neutral-400 font-semibold">Lifetime Spend</div>
          <div className="text-xl font-bold text-amber-400 mt-1">
            PKR {customer.totalSpentPKR.toLocaleString()}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-[#141210] border border-neutral-800">
          <div className="text-[10px] uppercase text-neutral-400 font-semibold">Average Ticket</div>
          <div className="text-xl font-bold text-white mt-1">
            PKR {customer.averageOrderValue.toLocaleString()}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-[#141210] border border-neutral-800">
          <div className="text-[10px] uppercase text-neutral-400 font-semibold">Patron Status</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">{customer.segment}</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-neutral-800 gap-6 text-xs uppercase tracking-wider font-semibold">
        {(['orders', 'loyalty', 'reservations', 'addresses'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 transition-colors cursor-pointer ${
              activeTab === tab
                ? 'text-amber-400 border-b-2 border-amber-500 font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {tab === 'orders' && 'My Orders'}
            {tab === 'loyalty' && 'SAVORÉ Rewards'}
            {tab === 'reservations' && 'My Reservations'}
            {tab === 'addresses' && 'Saved Addresses'}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}

      {/* 1. Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {myOrders.map((ord) => (
            <div
              key={ord.id}
              className="p-5 rounded-xl bg-[#141210] border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">#{ord.orderNumber}</span>
                  <span className="px-2 py-0.5 rounded bg-neutral-800 text-[10px] font-semibold text-neutral-300 uppercase">
                    {ord.orderType}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      ord.status === 'delivered' || ord.status === 'completed'
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                        : 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                    }`}
                  >
                    {ord.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="text-xs text-neutral-400">
                  {new Date(ord.createdAt).toLocaleDateString()} · {ord.items.length} items (
                  {ord.items.map((i) => i.name).join(', ')})
                </div>
              </div>

              <div className="flex items-center gap-4 justify-between md:justify-end">
                <div className="text-right">
                  <div className="text-xs text-neutral-500 uppercase">Amount</div>
                  <div className="text-sm font-bold text-amber-400">
                    PKR {ord.total.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setTrackingOrderId(ord.orderNumber);
                      setActiveView('order_tracking');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-white font-medium transition-colors cursor-pointer"
                  >
                    Track Status
                  </button>
                  <button
                    onClick={() => {
                      ord.items.forEach((item) => {
                        addToCart({
                          cartItemId: `${item.menuItemId}_reorder_${Date.now()}`,
                          menuItem: {
                            id: item.menuItemId,
                            name: item.name,
                            slug: item.name.toLowerCase().replace(/ /g, '-'),
                            category: 'Burgers',
                            description: '',
                            basePrice: item.unitPrice,
                            costPrice: 0,
                            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
                            rating: 4.9,
                            reviewsCount: 100,
                            prepTimeMinutes: 12,
                            calories: 600,
                            available: true,
                            kitchenStation: item.kitchenStation,
                            recipe: [],
                          },
                          quantity: item.quantity,
                          selectedModifiers: [],
                          itemTotal: item.totalPrice,
                        });
                      });
                      setActiveView('menu');
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-xs text-white font-semibold transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reorder</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Loyalty Rewards Tab */}
      {activeTab === 'loyalty' && (
        <div className="space-y-6">
          <div className="bg-[#141210] border border-amber-900/40 rounded-2xl p-6 space-y-4">
            <h2 className="font-serif-luxury text-xl font-bold text-white flex items-center gap-2">
              <Gift className="w-5 h-5 text-amber-400" />
              <span>SAVORÉ Rewards Tier Benefits</span>
            </h2>
            <p className="text-xs text-neutral-300 leading-relaxed max-w-2xl">
              Earn 1 Reward Point for every PKR 100 spent across all branches, dine-in, takeaway, and delivery orders. Redeem directly during checkout or claim artisanal rewards.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#1b1815] border border-neutral-800 space-y-2">
                <div className="text-xs font-bold text-amber-400">500 Points</div>
                <div className="text-sm font-bold text-white">PKR 500 Order Credit</div>
                <p className="text-[11px] text-neutral-400">Deduct instantly from your next dining bill.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#1b1815] border border-neutral-800 space-y-2">
                <div className="text-xs font-bold text-amber-400">800 Points</div>
                <div className="text-sm font-bold text-white">Complimentary Lava Cake</div>
                <p className="text-[11px] text-neutral-400">Belgian molten chocolate fondant with gelato.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#1b1815] border border-neutral-800 space-y-2">
                <div className="text-xs font-bold text-amber-400">1,500 Points</div>
                <div className="text-sm font-bold text-white">VIP Chef's Tasting Flight</div>
                <p className="text-[11px] text-neutral-400">Private tasting session with Executive Chef Tariq.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Reservations Tab */}
      {activeTab === 'reservations' && (
        <div className="space-y-4">
          {myReservations.map((res) => (
            <div
              key={res.id}
              className="p-5 rounded-xl bg-[#141210] border border-neutral-800 flex items-center justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">#{res.reservationNumber}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400">
                    {res.status}
                  </span>
                </div>
                <div className="text-xs text-neutral-300">
                  {res.date} at {res.time} · {res.guestsCount} Guests ({res.seatingPreference})
                </div>
              </div>
              <button
                onClick={() => setActiveView('reservation')}
                className="text-xs text-amber-400 hover:underline cursor-pointer"
              >
                Modify Reservation
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 4. Saved Addresses */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {customer.addresses.map((addr) => (
            <div
              key={addr.id}
              className="p-5 rounded-xl bg-[#141210] border border-neutral-800 space-y-2 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-amber-400">{addr.label}</span>
                {addr.isDefault && (
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">
                    Default
                  </span>
                )}
              </div>
              <p className="text-xs text-white">{addr.address}</p>
              <p className="text-[11px] text-neutral-400">{addr.area}, Karachi</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
